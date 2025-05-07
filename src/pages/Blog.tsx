
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { useNavigate } from "react-router-dom";
import { formatDate, calculateReadingTime } from "@/utils/blogUtils";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const Blog = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_articles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (slug: string | null, id: string) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    } else {
      navigate(`/blog/${id}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('blogSubtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div 
                  key={article.id}
                  className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
                  onClick={() => handleArticleClick(article.slug, article.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image_url || '/placeholder.svg'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center text-sm mb-2 text-cargo-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(article.published_at || article.created_at)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{calculateReadingTime(article.content)} мин.</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 break-words">{article.title}</h3>
                    <p className="text-cargo-gray-600 mb-4 line-clamp-2 break-words">{article.excerpt}</p>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full">
                        Читать статью
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-cargo-gray-600">Статьи пока не добавлены. Загляните позже!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
