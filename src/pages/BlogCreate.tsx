
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BlogCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "/placeholder.svg",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        throw new Error("Все поля обязательны для заполнения");
      }

      const { error } = await supabase
        .from('blog_articles')
        .insert([formData]);

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
                <Label htmlFor="image_url">URL изображения</Label>
                <Input 
                  id="image_url" 
                  name="image_url" 
                  value={formData.image_url} 
                  onChange={handleChange}
                  placeholder="Введите URL изображения (опционально)" 
                />
                <p className="text-xs text-cargo-gray-500">Если не указан, будет использован стандартный placeholder.</p>
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
      <Footer />
    </div>
  );
};

export default BlogCreate;
