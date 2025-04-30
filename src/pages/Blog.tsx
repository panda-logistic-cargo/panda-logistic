
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, FileText, Import, Truck, Shield, Users, ShoppingCart, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

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

const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
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

const Blog = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('blog_articles')
        .select('id, title, excerpt, category, image_url, created_at')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage - 1);
      
      if (selectedCategory !== "Все статьи") {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setArticles(data || []);
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
    setCurrentPage(1);
  };

  const getTotalPages = async () => {
    try {
      let query = supabase.from('blog_articles').select('id', { count: 'exact' });
      
      if (selectedCategory !== "Все статьи") {
        query = query.eq('category', selectedCategory);
      }
      
      const { count } = await query;
      return Math.ceil((count || 0) / articlesPerPage);
    } catch (error) {
      console.error('Error getting total pages:', error);
      return 1;
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
              Актуальные статьи о логистике, импорте из Китая и ведении бизнеса 
              с китайскими партнерами.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
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

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cargo-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-4 text-cargo-gray-600">Загрузка статей...</p>
            </div>
          ) : (
            <>
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-cargo-gray-600">По вашему запросу статей не найдено.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
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
                      <div className="p-6">
                        <div className="flex items-center justify-between text-sm text-cargo-gray-500 mb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.created_at)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {calculateReadingTime(article.excerpt)} мин
                            </div>
                          </div>
                        </div>
                        <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                        <p className="text-cargo-gray-600 mb-4">{article.excerpt}</p>
                        <Button
                          variant="outline"
                          className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
                        >
                          Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(prev => prev - 1);
                        }}
                      />
                    </PaginationItem>
                    
                    {/* Show page numbers here in a production app */}
                    <PaginationItem>
                      <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={async (e) => {
                          e.preventDefault();
                          const totalPages = await getTotalPages();
                          if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
