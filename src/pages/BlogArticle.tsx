
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SharingButtons from "@/components/SharingButtons";
import { calculateReadingTime, generateHashtags } from "@/utils/blogUtils";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  published_at: string | null;
  updated_at: string;
  slug: string | null;
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
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [readingTime, setReadingTime] = useState<number>(0);
  const [articleUrl, setArticleUrl] = useState("");

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
    
    // Set current article URL for sharing
    setArticleUrl(window.location.href);
  }, [slug]);

  const fetchArticle = async (articleSlugOrId: string) => {
    setLoading(true);
    try {
      // First try by slug
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', articleSlugOrId)
        .single();

      if (error) {
        // If not found by slug, try to find by id (for backward compatibility)
        const { data: dataById, error: errorById } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('id', articleSlugOrId)
          .single();
          
        if (errorById) {
          throw new Error("Статья не найдена");
        }
        
        setArticle(dataById);
        
        // Redirect to the slug URL if found by ID and has a slug
        if (dataById && dataById.slug) {
          navigate(`/blog/${dataById.slug}`, { replace: true });
          return;
        }
      } else {
        setArticle(data);
      }
      
      if (!data && !article) {
        toast({
          title: "Статья не найдена",
          description: "Запрашиваемая статья не существует",
          variant: "destructive",
        });
        navigate('/blog');
        return;
      }
      
      const articleData = data || article;
      
      // Calculate reading time
      const time = calculateReadingTime(articleData.content);
      setReadingTime(time);
      
      // Generate hashtags
      const tags = generateHashtags(articleData.title, articleData.content, articleData.category);
      setHashtags(tags);
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
    if (article) {
      navigate(`/blog/edit/${article.id}`);
    }
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
              
              <div className="flex flex-wrap items-center text-cargo-gray-500 mb-6 gap-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                </div>
                
                <span className="hidden sm:inline">•</span>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{readingTime} мин. чтения</span>
                </div>
                
                <span className="hidden sm:inline">•</span>
                
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
              
              {/* Hashtags section */}
              {hashtags.length > 0 && (
                <div className="mt-10 pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-cargo-gray-100 text-cargo-gray-700 rounded-full px-3 py-1 text-sm hover:bg-cargo-gray-200 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Share section */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Поделиться</h3>
                <SharingButtons 
                  url={articleUrl}
                  title={article.title}
                />
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
