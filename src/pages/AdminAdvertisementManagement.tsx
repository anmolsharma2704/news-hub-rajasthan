
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import AdvertisementTable from '@/components/admin/AdvertisementTable';
import AdvertisementForm from '@/components/admin/AdvertisementForm';
import { useToast } from '@/hooks/use-toast';

const AdminAdvertisementManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [isEditingAd, setIsEditingAd] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleAddAdClick = () => {
    setIsAddingAd(true);
    setIsEditingAd(false);
    setSelectedAd(null);
  };
  
  const handleEditAd = (ad) => {
    setSelectedAd(ad);
    setIsEditingAd(true);
    setIsAddingAd(false);
  };
  
  const handleActiveToggle = (adId, isActive) => {
    // In a real app, this would call an API to update the ad status
    toast({
      title: isActive ? "विज्ञापन सक्रिय किया गया" : "विज्ञापन निष्क्रिय किया गया",
      description: isActive 
        ? "विज्ञापन सफलतापूर्वक सक्रिय किया गया है" 
        : "विज्ञापन सफलतापूर्वक निष्क्रिय किया गया है",
      variant: "default",
    });
  };
  
  const handleDeleteAd = (adId) => {
    // In a real app, this would call an API to delete the ad
    toast({
      title: "विज्ञापन हटा दिया गया",
      description: "विज्ञापन सफलतापूर्वक हटा दिया गया है",
      variant: "default",
    });
  };
  
  const handleFormClose = () => {
    setIsAddingAd(false);
    setIsEditingAd(false);
    setSelectedAd(null);
  };
  
  const handleFormSubmit = (adData) => {
    // In a real app, this would call an API to save the ad
    toast({
      title: isEditingAd ? "विज्ञापन अपडेट किया गया" : "नया विज्ञापन जोड़ा गया",
      description: isEditingAd 
        ? "विज्ञापन सफलतापूर्वक अपडेट किया गया है" 
        : "नया विज्ञापन सफलतापूर्वक जोड़ा गया है",
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
          {(isAddingAd || isEditingAd) ? (
            <AdvertisementForm 
              onClose={handleFormClose} 
              onSubmit={handleFormSubmit} 
              isEditing={isEditingAd}
              adData={selectedAd}
            />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">विज्ञापन प्रबंधन</h1>
                  <p className="text-sm md:text-base text-news-gray-dark">विज्ञापनों को जोड़ें, संपादित करें और प्रबंधित करें</p>
                </div>
                <Button 
                  onClick={handleAddAdClick}
                  className="mt-3 sm:mt-0 w-full sm:w-auto bg-news-blue hover:bg-news-blue-dark text-white"
                >
                  <Plus size={18} className="mr-1" />
                  नया विज्ञापन जोड़ें
                </Button>
              </div>
              
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="विज्ञापन खोजें..." 
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-news-blue"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-sm">
                      <Filter size={16} className="mr-1" /> फ़िल्टर
                    </Button>
                    <Button variant="outline" className="text-sm">
                      स्थिति <ChevronDown size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <AdvertisementTable 
                onEdit={handleEditAd} 
                onDelete={handleDeleteAd}
                onActiveToggle={handleActiveToggle}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminAdvertisementManagement;
