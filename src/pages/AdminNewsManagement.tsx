
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import NewsTable from '@/components/admin/NewsTable';
import NewsForm from '@/components/admin/NewsForm';
import { useToast } from '@/hooks/use-toast';

const AdminNewsManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleAddNewsClick = () => {
    setIsAddingNews(true);
    setIsEditingNews(false);
    setSelectedNews(null);
  };
  
  const handleEditNews = (news) => {
    setSelectedNews(news);
    setIsEditingNews(true);
    setIsAddingNews(false);
  };
  
  const handleDeleteNews = (newsId) => {
    // In a real app, this would call an API to delete the news
    toast({
      title: "समाचार हटा दिया गया",
      description: "समाचार सफलतापूर्वक हटा दिया गया है",
      variant: "default",
    });
  };
  
  const handleFormClose = () => {
    setIsAddingNews(false);
    setIsEditingNews(false);
    setSelectedNews(null);
  };
  
  const handleFormSubmit = (newsData) => {
    // In a real app, this would call an API to save the news
    toast({
      title: isEditingNews ? "समाचार अपडेट किया गया" : "नया समाचार जोड़ा गया",
      description: isEditingNews 
        ? "समाचार सफलतापूर्वक अपडेट किया गया है" 
        : "नया समाचार सफलतापूर्वक जोड़ा गया है",
      variant: "default",
    });
    
    handleFormClose();
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
          {(isAddingNews || isEditingNews) ? (
            <NewsForm 
              onClose={handleFormClose} 
              onSubmit={handleFormSubmit} 
              isEditing={isEditingNews}
              newsData={selectedNews}
            />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">समाचार प्रबंधन</h1>
                  <p className="text-sm md:text-base text-news-gray-dark">समाचारों को जोड़ें, संपादित करें और प्रबंधित करें</p>
                </div>
                <Button 
                  onClick={handleAddNewsClick}
                  className="mt-3 sm:mt-0 w-full sm:w-auto bg-news-blue hover:bg-news-blue-dark text-white"
                >
                  <Plus size={18} className="mr-1" />
                  नया समाचार जोड़ें
                </Button>
              </div>
              
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="समाचार खोजें..." 
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-news-blue"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-sm">
                      <Filter size={16} className="mr-1" /> फ़िल्टर
                    </Button>
                    <Button variant="outline" className="text-sm">
                      श्रेणी <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <NewsTable 
                onEdit={handleEditNews} 
                onDelete={handleDeleteNews} 
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminNewsManagement;
