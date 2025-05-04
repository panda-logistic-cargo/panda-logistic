
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-cargo-gray-50 py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-cargo-red mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Страница не найдена</h2>
            <p className="text-lg text-cargo-gray-600 mb-8 max-w-xl mx-auto">
              Кажется, вы пытаетесь получить доступ к странице, которая была перемещена или никогда не существовала.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-medium mb-3">
                Возможно, вы искали:
              </h3>
              <ul className="space-y-2 text-left mb-4 max-w-md mx-auto">
                <li className="hover:bg-cargo-gray-50 p-2 rounded transition-colors">
                  <Link to="/" className="flex items-center text-cargo-gray-700 hover:text-cargo-red">
                    <Home className="mr-2 h-4 w-4" /> Главная страница
                  </Link>
                </li>
                <li className="hover:bg-cargo-gray-50 p-2 rounded transition-colors">
                  <Link to="/services" className="flex items-center text-cargo-gray-700 hover:text-cargo-red">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Наши услуги
                  </Link>
                </li>
                <li className="hover:bg-cargo-gray-50 p-2 rounded transition-colors">
                  <Link to="/blog" className="flex items-center text-cargo-gray-700 hover:text-cargo-red">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Блог
                  </Link>
                </li>
                <li className="hover:bg-cargo-gray-50 p-2 rounded transition-colors">
                  <Link to="/contacts" className="flex items-center text-cargo-gray-700 hover:text-cargo-red">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="default"
                className="bg-cargo-red hover:bg-cargo-red/90"
                asChild
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" /> Вернуться на главную
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="border-cargo-gray-300"
                asChild
              >
                <Link to="/contacts">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
