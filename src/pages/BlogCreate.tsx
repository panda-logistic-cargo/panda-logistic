import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createSlug } from "@/utils/blogUtils";

const BlogCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "/placeholder.svg",
    published_at: new Date(),
  });

  // Redirect unauthenticated users
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
      toast({
        title: "Вход не выполнен",
        description: "Для создания статей необходимо войти в систему",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, published_at: date }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка загрузки",
        description: "Размер файла не должен превышать 10 МБ",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Ошибка загрузки",
        description: "Поддерживаются только изображения форматов JPG, PNG и WebP",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setImageFile(file);
    setImageDialogOpen(true);
  };
  
  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !user) return null;
    
    setUploadingImage(true);
    try {
      // Generate a unique filename
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from('blog_images')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
        
      return publicUrlData.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Ошибка загрузки изображения",
        description: error.message || "Пожалуйста, попробуйте снова",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields and content length
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        throw new Error("Все поля обязательны для заполнения");
      }
      
      // Validate text lengths
      if (formData.title.length > 100) {
        throw new Error("Заголовок не должен превышать 100 символов");
      }
      
      if (formData.excerpt.length > 300) {
        throw new Error("Краткое описание не должно превышать 300 символов");
      }
      
      // Upload image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        }
      }

      // Generate slug from title
      const slug = createSlug(formData.title);

      const { error } = await supabase
        .from('blog_articles')
        .insert([{
          ...formData,
          image_url: imageUrl,
          published_at: formData.published_at.toISOString(),
          slug: slug
        }]);

      if (error) throw error;

      toast({
        title: "Статья создана",
        description: "Ваша статья была успешно создана",
      });

      navigate('/blog');
    } catch (error: any) {
      console.error('Error creating article:', error);
      toast({
        title: "Ошибка при создании статьи",
        description: error.message || "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Импорт из Китая",
    "Логистика",
    "Таможня",
    "Поставщики",
    "Маркетплейсы",
    "Бизнес с Китаем"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Создать новую статью</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Заголовок</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="Введите заголовок статьи" 
                  required
                  maxLength={100}
                />
                <p className="text-xs text-gray-500">
                  {formData.title.length}/100 символов
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Краткое описание</Label>
                <Textarea 
                  id="excerpt" 
                  name="excerpt" 
                  value={formData.excerpt} 
                  onChange={handleChange}
                  placeholder="Введите краткое описание статьи (150-200 символов)" 
                  required
                  rows={3}
                  maxLength={300}
                />
                <p className="text-xs text-gray-500">
                  {formData.excerpt.length}/300 символов
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Содержание статьи</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange}
                  placeholder="Введите полный текст статьи" 
                  required
                  rows={10}
                  className="whitespace-pre-wrap"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="published_at">Дата публикации</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="published_at"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.published_at ? (
                        format(formData.published_at, "PPP")
                      ) : (
                        <span>Выберите дату</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.published_at}
                      onSelect={handleDateChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="mt-1 flex flex-col gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex justify-center">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Upload className="h-10 w-10 text-cargo-gray-400" />
                          <span className="text-sm font-medium text-cargo-gray-500">
                            Нажмите для загрузки или перетащите файл
                          </span>
                          <span className="text-xs text-cargo-gray-400">
                            JPG, PNG, WebP (max 10MB)
                          </span>
                          <Input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept=".jpg,.jpeg,.png,.webp"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm text-cargo-gray-500">Выбранное изображение:</p>
                      <div className="mt-1 relative h-32">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* Display current image URL if no preview */}
                  {!imagePreview && formData.image_url && (
                    <div className="mt-2">
                      <p className="text-sm text-cargo-gray-500">Текущее изображение:</p>
                      <p className="text-xs text-cargo-gray-400 truncate">{formData.image_url}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/blog')}
                >
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  className="bg-cargo-red hover:bg-cargo-red/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Создание...
                    </>
                  ) : (
                    "Создать статью"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Image preview dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Предпросмотр изображения</DialogTitle>
          </DialogHeader>
          {imagePreview && (
            <div className="w-full">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-auto rounded-md" 
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                setImageDialogOpen(false);
              }}
            >
              Удалить
            </Button>
            <Button 
              onClick={() => setImageDialogOpen(false)}
            >
              Подтвердить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default BlogCreate;
