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
import AdvertisementForm from "@/components/admin/AdvertisementForm";
import AdminWebSettings from "./pages/AdminWebSettings";
import AdminNotificationManagement from "./pages/AdminNotificationManagement";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout"

const queryClient = new QueryClient();

const App = () => {
  return (
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
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/news"
              element={
                <AdminLayout>
                  <AdminNewsManagement />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/reporters"
              element={
                <AdminLayout>
                  <AdminReporterManagement />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/advertisements"
              element={
                <AdminLayout>
                  <AdminAdvertisementManagement />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/advertisements/:id"
              element={
                <AdminLayout>
                  <AdvertisementForm />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/websettings"
              element={
                <AdminLayout>
                  <AdminWebSettings />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <AdminLayout>
                  <AdminNotificationManagement />
                </AdminLayout>
              }
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
