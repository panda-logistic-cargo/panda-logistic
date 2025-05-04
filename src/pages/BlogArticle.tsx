
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  published_at: string;
  updated_at: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', articleId)
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

      setArticle(data);
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

  const handleEdit = () => {
    navigate(`/blog/edit/${id}`);
  };

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

  if (!article) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к списку статей
              </Button>
              
              {user && (
                <Button
                  variant="outline"
                  className="border-cargo-gray-300 text-cargo-gray-700 hover:bg-cargo-gray-100"
                  onClick={handleEdit}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Редактировать
                </Button>
              )}
            </div>
            
            <article className="prose prose-lg max-w-none">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex items-center text-cargo-gray-500 mb-6">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(article.published_at || article.created_at)}</span>
                <span className="mx-2">•</span>
                <span className="bg-cargo-red text-white text-sm px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <div className="mb-8">
                <img
                  src={article.image_url || '/placeholder.svg'}
                  alt={article.title}
                  className="w-full h-auto max-h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="text-lg text-cargo-gray-700 mb-6 font-semibold italic">
                {article.excerpt}
              </div>
              
              <div className="text-cargo-gray-800 whitespace-pre-line">
                {article.content}
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogArticle;
