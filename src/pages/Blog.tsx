import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog')}</h1>
            <p className="text-lg text-cargo-gray-700 max-w-3xl mx-auto">
              Актуальные статьи о логистике, импорте из Китая и ведении бизнеса 
              с китайскими партнерами.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  index === 0
                    ? "bg-cargo-red text-white"
                    : "bg-cargo-gray-100 text-cargo-gray-700 hover:bg-cargo-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border border-cargo-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-cargo-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-cargo-red font-medium">
                      {article.category}
                    </span>
                    <span className="text-sm text-cargo-gray-500">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                  <p className="text-cargo-gray-600 mb-4">{article.excerpt}</p>
                  <Button
                    variant="outline"
                    className="border-cargo-red text-cargo-red hover:bg-cargo-red hover:text-white"
                  >
                    Читать далее <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              Загрузить еще статьи
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
