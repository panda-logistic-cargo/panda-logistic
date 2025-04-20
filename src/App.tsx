import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About2";
import Services from "./pages/Services";
import Calculator from "./pages/Calculator";
import Blog from "./pages/Blog";
import Contacts from "./pages/Contacts";
import SupplierSearch from "./pages/services/SupplierSearch";
import MarketplacePurchase from "./pages/services/MarketplacePurchase";
import CargoConsolidation from "./pages/services/CargoConsolidation";
import Delivery from "./pages/services/Delivery";
import BusinessTours from "./pages/services/BusinessTours";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CustomsClearance from "./pages/services/CustomsClearance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacts" element={<Contacts />} />
              
              <Route path="/services/supplier-search" element={<SupplierSearch />} />
              <Route path="/services/marketplace-purchase" element={<MarketplacePurchase />} />
              <Route path="/services/cargo-consolidation" element={<CargoConsolidation />} />
              <Route path="/services/delivery" element={<Delivery />} />
              <Route path="/services/business-tours" element={<BusinessTours />} />
              <Route path="/services/customs-clearance" element={<CustomsClearance />} />
              
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
