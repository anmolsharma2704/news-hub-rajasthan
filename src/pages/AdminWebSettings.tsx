
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import WebSettingsForm from '@/components/admin/WebSettingsForm';
import { useToast } from '@/hooks/use-toast';

const AdminWebSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSettingsSave = (settings) => {
    // In a real app, this would call an API to save the settings
    toast({
      title: "सेटिंग्स अपडेट की गईं",
      description: "वेबसाइट सेटिंग्स सफलतापूर्वक अपडेट की गईं",
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-news-blue-dark transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar />
      </div>
      
      <div className="flex-1 flex flex-col md:ml-64">
        <AdminTopbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">वेबसाइट सेटिंग्स</h1>
              <p className="text-sm md:text-base text-news-gray-dark">वेबसाइट के प्रमुख विवरण अपडेट करें</p>
            </div>
          </div>
          
          <WebSettingsForm onSave={handleSettingsSave} />
        </main>
      </div>
    </div>
  );
};

export default AdminWebSettings;
