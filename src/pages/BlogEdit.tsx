import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      toast({
        title: "Вход не выполнен",
        description: "Для редактирования статей необходимо войти в систему",
        variant: "destructive",
      });
    } else {
      // Load the article if user is authenticated
      fetchArticle();
    }
  }, [user, id, navigate, toast]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (!data) {
        toast({
          title: "Статья не найдена",
          description: "Запрашиваемая статья не существует",
          variant: "destructive",
        });
        navigate('/blog');
        return;
      }

      setFormData({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        image_url: data.image_url || "/placeholder.svg",
        published_at: data.published_at ? new Date(data.published_at) : new Date(),
      });
    } catch (error: any) {
      console.error('Error fetching article:', error);
      toast({
        title: "Ошибка при загрузке статьи",
        description: error.message || "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        throw new Error("Все поля обязательны для заполнения");
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
        .update({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          image_url: imageUrl,
          published_at: formData.published_at.toISOString(),
          updated_at: new Date().toISOString(),
          slug: slug
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Статья обновлена",
        description: "Изменения были успешно сохранены",
      });

      navigate(`/blog/${slug}`);
    } catch (error: any) {
      console.error('Error updating article:', error);
      toast({
        title: "Ошибка при обновлении статьи",
        description: error.message || "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 pb-16 flex justify-center items-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cargo-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-cargo-gray-600">Загрузка статьи...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Редактировать статью</h1>
            
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
                />
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
                />
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
                  {/* Image preview/thumbnail if available */}
                  {!imagePreview && formData.image_url && formData.image_url !== "/placeholder.svg" && (
                    <div className="relative h-32 w-full mb-4">
                      <img 
                        src={formData.image_url} 
                        alt="Current" 
                        className="h-full object-cover rounded-md"
                      />
                      <p className="mt-1 text-xs text-cargo-gray-500">Текущее изображение</p>
                    </div>
                  )}
                  
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
                      <p className="text-sm text-cargo-gray-500">Новое изображение:</p>
                      <div className="mt-1 relative h-32">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full object-cover rounded-md"
                        />
                      </div>
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
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить изменения"
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

export default BlogEdit;
