
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "/placeholder.svg",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        throw new Error("Все поля обязательны для заполнения");
      }

      const { error } = await supabase
        .from('blog_articles')
        .update({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          image_url: formData.image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Статья обновлена",
        description: "Изменения были успешно сохранены",
      });

      navigate('/blog');
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
      <Footer />
    </div>
  );
};

export default BlogEdit;
