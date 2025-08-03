
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import NewsTable from '@/components/admin/NewsTable';
import NewsForm from '@/components/admin/NewsForm';
import { useToast } from '@/hooks/use-toast';
import { useNews, usePendingNews, useDeleteNews, useApproveNews } from '@/hooks/useApi';
import { NewsItem } from '@/lib/api';

const AdminNewsManagement = () => {
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const { toast } = useToast();
  
  // API hooks
  const { data: newsData, isLoading: newsLoading } = useNews();
  const { data: pendingNewsData, isLoading: pendingLoading } = usePendingNews();
  const deleteNewsMutation = useDeleteNews();
  const approveNewsMutation = useApproveNews();

  
  const handleAddNewsClick = () => {
    setIsAddingNews(true);
    setIsEditingNews(false);
    setSelectedNews(null);
  };
  
  const handleEditNews = (news: NewsItem) => {
    setSelectedNews(news);
    setIsEditingNews(true);
    setIsAddingNews(false);
  };
  
  const handleDeleteNews = (newsId: string) => {
    deleteNewsMutation.mutate(newsId);
  };
  
  const handleApproveNews = (newsId: string) => {
    approveNewsMutation.mutate(newsId);
  };
  
  const handleFormClose = () => {
    setIsAddingNews(false);
    setIsEditingNews(false);
    setSelectedNews(null);
  };
  
  const handleFormSubmit = (newsData: Partial<NewsItem>) => {
    // This will be handled by the NewsForm component with proper API calls
    handleFormClose();
  };
  
  return (  
        
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
                news={newsData?.news || []}
                pendingNews={pendingNewsData?.news || []}
                isLoading={newsLoading || pendingLoading}
                onEdit={handleEditNews} 
                onDelete={handleDeleteNews}
                onApprove={handleApproveNews}
              />
            </>
          )}
        </main>
  );
};

export default AdminNewsManagement;
