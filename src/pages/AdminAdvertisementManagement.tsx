import React, { useState, useEffect } from 'react';
import { apiService } from '@/utils/apiService';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import AdvertisementTable from '@/components/admin/AdvertisementTable';
import AdvertisementForm from '@/components/admin/AdvertisementForm';
import { useToast } from '@/hooks/use-toast';

const AdminAdvertisementManagement = () => {
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [isEditingAd, setIsEditingAd] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchAds();
  }, []);

 const fetchAds = async () => {
  try {
    const res = await apiService.getAllAds();
    // if backend sends { ads: [...] }
    if (Array.isArray(res.ads)) {
      setAds(res.ads);
    } 
    // if backend sends just an array
    else if (Array.isArray(res)) {
      setAds(res);
    } 
    else {
      setAds([]); // fallback
    }
  } catch (error) {
    console.error("Error fetching ads:", error);
    toast({ title: "Error", description: "Failed to load ads", variant: "destructive" });
    setAds([]); // ensure ads is always an array
  }
};



  const handleAddAdClick = () => {
    setIsAddingAd(true);
    setIsEditingAd(false);
    setSelectedAd(null);
  };

const handleEditAd = (adId: string) => {
  setSelectedAd(adId); // store only ID
  setIsEditingAd(true);
  setIsAddingAd(false);
};

  const handleActiveToggle = async (adId, isActive) => {
    try {
      await apiService.updateAd(adId, { status: isActive ? "active" : "paused" });
      toast({
        title: isActive ? "विज्ञापन सक्रिय किया गया" : "विज्ञापन निष्क्रिय किया गया",
        description: isActive 
          ? "विज्ञापन सफलतापूर्वक सक्रिय किया गया है" 
          : "विज्ञापन सफलतापूर्वक निष्क्रिय किया गया है",
      });
      fetchAds();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteAd = async (adId) => {
    try {
      await apiService.deleteAd(adId);
      toast({
        title: "विज्ञापन हटा दिया गया",
        description: "विज्ञापन सफलतापूर्वक हटा दिया गया है",
      });
      fetchAds();
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleFormClose = () => {
    setIsAddingAd(false);
    setIsEditingAd(false);
    setSelectedAd(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditingAd) {
        await apiService.updateAd(selectedAd._id, formData);
        toast({ title: "विज्ञापन अपडेट किया गया", description: "विज्ञापन सफलतापूर्वक अपडेट किया गया है" });
      } else {
        await apiService.createAd(formData);
        toast({ title: "नया विज्ञापन जोड़ा गया", description: "नया विज्ञापन सफलतापूर्वक जोड़ा गया है" });
      }
      handleFormClose();
      fetchAds();
    } catch (error) {
      console.error("Error saving ad:", error);
    }
  };

  const filteredAds = ads.filter(ad =>
    ad.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ( 
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {(isAddingAd || isEditingAd) ? (
           <AdvertisementForm 
  onClose={handleFormClose} 
  onSubmit={handleFormSubmit} 
  isEditing={isEditingAd}
  adId={selectedAd} // now sending ID only
/>

          ) : (
            <>
              {/* Page Header */}
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
              
              {/* Search & Filter */}
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="विज्ञापन खोजें..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
              
              {/* Advertisement Table */}
              <AdvertisementTable 
                ads={filteredAds}
                onEdit={handleEditAd} 
                onDelete={handleDeleteAd}
                onActiveToggle={handleActiveToggle}
              />
            </>
          )}
        </main>
  );
};

export default AdminAdvertisementManagement;
