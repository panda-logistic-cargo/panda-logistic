import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, FileText, Import, Truck, Shield, Users, ShoppingCart, Briefcase, Edit, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { scrollToTop } from "@/hooks/use-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { calculateReadingTime, formatDate } from "@/utils/blogUtils";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";

interface BlogCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  created_at: string;
  published_at: string;
  slug: string | null;
}

const categories: BlogCategory[] = [
  { name: "Все статьи", icon: FileText },
  { name: "Импорт из Китая", icon: Import },
  { name: "Логистика", icon: Truck },
  { name: "Таможня", icon: Shield },
  { name: "Поставщики", icon: Users },
  { name: "Маркетплейсы", icon: ShoppingCart },
  { name: "Бизнес с Китаем", icon: Briefcase }
];

const Blog = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const topRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Calculate visible articles count based on device type
  const initialVisibleRows = 2;
  const articlesPerRow = isMobile ? 1 : 3;
  const initialVisibleCount = initialVisibleRows * articlesPerRow;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const hasMoreArticles = allArticles.length > visibleCount;
  const allArticlesShown = visibleCount >= allArticles.length;

  useEffect(() => {
    fetchArticles();
    return () => {
      if (loadingTimer) clearTimeout(loadingTimer);
    };
  }, [selectedCategory]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(initialVisibleCount);
    setShowMore(false);
  }, [selectedCategory, initialVisibleCount]);

  const fetchArticles = async () => {
    // Start loading state with minimum duration
    setLoading(true);
    if (loadingTimer) clearTimeout(loadingTimer);
    
    const timerPromise = new Promise<void>(resolve => {
      const timer = setTimeout(() => {
        resolve();
      }, 800); // Minimum loading time of 800ms
      setLoadingTimer(timer as unknown as NodeJS.Timeout);
    });
    
    try {
      let query = supabase
        .from('blog_articles')
        .select('id, title, excerpt, category, image_url, created_at, published_at, slug')
        .order('published_at', { ascending: false });
      
      if (selectedCategory !== "Все статьи") {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Wait for both the data and minimum timer
      await timerPromise;
      setAllArticles(data || []);
      setArticles((data || []).slice(0, visibleCount));
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Ошибка при загрузке статей",
        description: error.message || "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
  };

  const handleShowMore = () => {
    const newVisibleCount = visibleCount + (initialVisibleRows * articlesPerRow);
    setVisibleCount(newVisibleCount);
    setArticles(allArticles.slice(0, newVisibleCount));
    setShowMore(true);
  };

  const handleBackToTop = () => {
    scrollToTop();
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditArticle = (id: string) => {
    navigate(`/blog/edit/${id}`);
  };

  const handleDeleteArticle = async () => {
    if (!deleteArticleId) return;

    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', deleteArticleId);

      if (error) throw error;

      toast({
        title: "Статья удалена",
        description: "Статья была успешно удалена",
      });

      setDeleteArticleId(null);
      setIsDeleteDialogOpen(false);
      fetchArticles();
    } catch (error: any) {
      console.error('Error deleting article:', error);
      toast({
        title: "Ошибка при удалении статьи",
        description: error.message || "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteArticle = (id: string) => {
    setDeleteArticleId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const navigateToArticle = (article: BlogArticle) => {
    const path = article.slug ? `/blog/${article.slug}` : `/blog/${article.id}`;
    navigate(path);
  };

  // Create an array of skeleton cards for loading state
  const skeletonCards = Array(initialVisibleCount).fill(0).map((_, index) => (
    <BlogCardSkeleton key={`skeleton-${index}`} />
  ));

  // Update articles displayed when allArticles or visibleCount changes
  useEffect(() => {
    setArticles(allArticles.slice(0, visibleCount));
  }, [allArticles, visibleCount]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4" ref={topRef}>
          <div className="text-center mb-12 my-[25px] bg-cargo-gray-100 p-8 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              {t('blogSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                      selectedCategory === category.name
                        ? "bg-cargo-red text-white"
                        : "bg-cargo-gray-100 text-cargo-gray-700 hover:bg-cargo-gray-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
            
            {user && (
              <Button 
                onClick={() => navigate('/blog/create')}
                className="bg-cargo-red hover:bg-cargo-red/90"
              >
                <Plus className="mr-1 h-4 w-4" /> Создать статью
              </Button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {skeletonCards}
            </div>
          ) : (
            <>
              {allArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-cargo-gray-600">По вашему запросу статей не найдено.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
                      >
                        <div className="h-48 bg-cargo-gray-200 relative">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 right-3 z-10 bg-cargo-red text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                            {article.category}
                          </span>
                        </div>
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center justify-between text-sm text-cargo-gray-500 mb-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(article.published_at || article.created_at)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {calculateReadingTime(article.excerpt, 100)} мин
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-xl mb-2 line-clamp-2 break-words">{article.title}</h3>
                          <p className="text-cargo-gray-600 mb-4 line-clamp-2 break-words">{article.excerpt}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <Button
                              variant="outline"
                              className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
                              onClick={() => navigateToArticle(article)}
                            >
                              Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            
                            {user && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="border-cargo-gray-300 hover:bg-cargo-gray-100"
                                  onClick={() => handleEditArticle(article.id)}
                                >
                                  <Edit className="h-4 w-4 text-cargo-gray-700" />
                                </Button>
                                
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="border-cargo-gray-300 hover:bg-cargo-gray-100"
                                  onClick={() => confirmDeleteArticle(article.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-cargo-red" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8">
                    {hasMoreArticles ? (
                      <Button 
                        onClick={handleShowMore} 
                        className="bg-cargo-red hover:bg-cargo-red/90"
                      >
                        Показать еще
                      </Button>
                    ) : (
                      showMore && (
                        <Button 
                          onClick={handleBackToTop}
                          variant="outline" 
                          className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
                        >
                          Вернуться к новостям
                        </Button>
                      )
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Статья будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteArticle}
              className="bg-cargo-red hover:bg-cargo-red/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Blog;
