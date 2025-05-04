
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { calculateReadingTime, formatDate } from "@/utils/blogUtils";
import { Clock, Calendar } from "lucide-react";

interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
}

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

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, category }) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('category', category)
          .neq('id', currentArticleId)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentArticleId && category) {
      fetchRelatedArticles();
    }
  }, [currentArticleId, category]);

  const handleArticleClick = (slug: string | null, id: string) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    } else {
      navigate(`/blog/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-2xl font-semibold mb-5">Похожие статьи</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="text-2xl font-semibold mb-5">Похожие статьи</h3>
      
      {articles.length <= 3 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onClick={handleArticleClick} />
          ))}
        </div>
      ) : (
        <Carousel className="w-full relative">
          <CarouselContent>
            {articles.map((article) => (
              <CarouselItem key={article.id} className="md:basis-1/3 lg:basis-1/3">
                <div className="p-1">
                  <ArticleCard article={article} onClick={handleArticleClick} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12 bg-white border border-gray-200" />
          <CarouselNext className="right-0 lg:-right-12 bg-white border border-gray-200" />
        </Carousel>
      )}
    </div>
  );
};

interface ArticleCardProps {
  article: BlogArticle;
  onClick: (slug: string | null, id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const readingTime = calculateReadingTime(article.content);
  
  return (
    <div 
      className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      onClick={() => onClick(article.slug, article.id)}
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
            <span>{readingTime} мин.</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-cargo-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="mt-auto">
          <Button variant="outline" className="w-full">
            Читать статью
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
