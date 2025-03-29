
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewsDetail from "./pages/NewsDetail";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewsManagement from "./pages/AdminNewsManagement";
import AdminReporterManagement from "./pages/AdminReporterManagement";
import AdminAdvertisementManagement from "./pages/AdminAdvertisementManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNewsManagement />} />
          <Route path="/admin/reporters" element={<AdminReporterManagement />} />
          <Route path="/admin/advertisements" element={<AdminAdvertisementManagement />} />
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
