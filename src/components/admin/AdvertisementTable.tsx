
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data - in a real app, this would come from an API
const advertisements = [
  {
    id: '1',
    title: 'जयपुर फर्नीचर मार्ट - गृह सजावट',
    position: 'banner',
    imageUrl: 'https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=जयपुर+फर्नीचर+मार्ट',
    link: 'https://example.com/ad1',
    startDate: '10 जून, 2023',
    endDate: '10 जुलाई, 2023',
    active: true,
    views: 1245,
    clicks: 67,
  },
  {
    id: '2',
    title: 'राजस्थान यात्रा - पर्यटन पैकेज',
    position: 'sidebar',
    imageUrl: 'https://via.placeholder.com/300x600/10B981/FFFFFF?text=राजस्थान+यात्रा',
    link: 'https://example.com/ad2',
    startDate: '15 जून, 2023',
    endDate: '15 जुलाई, 2023',
    active: true,
    views: 987,
    clicks: 42,
  },
  {
    id: '3',
    title: 'शिक्षा संस्थान - नामांकन खुला है',
    position: 'inline',
    imageUrl: 'https://via.placeholder.com/640x160/F59E0B/FFFFFF?text=शिक्षा+संस्थान',
    link: 'https://example.com/ad3',
    startDate: '1 जून, 2023',
    endDate: '30 जून, 2023',
    active: false,
    views: 756,
    clicks: 31,
  },
  {
    id: '4',
    title: 'स्वास्थ्य जागरूकता अभियान',
    position: 'popup',
    imageUrl: 'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=स्वास्थ्य+अभियान',
    link: 'https://example.com/ad4',
    startDate: '20 जून, 2023',
    endDate: '20 जुलाई, 2023',
    active: true,
    views: 632,
    clicks: 29,
  },
  {
    id: '5',
    title: 'मोबाइल स्टोर - नए मॉडल पर छूट',
    position: 'banner',
    imageUrl: 'https://via.placeholder.com/800x200/8B5CF6/FFFFFF?text=मोबाइल+स्टोर',
    link: 'https://example.com/ad5',
    startDate: '5 जून, 2023',
    endDate: '5 जुलाई, 2023',
    active: true,
    views: 854,
    clicks: 38,
  },
];

interface AdvertisementTableProps {
  onEdit: (ad: any) => void;
  onDelete: (adId: string) => void;
  onActiveToggle: (adId: string, isActive: boolean) => void;
}

const AdvertisementTable: React.FC<AdvertisementTableProps> = ({ onEdit, onDelete, onActiveToggle }) => {
  const isMobile = useIsMobile();
  
  const getPositionText = (position: string) => {
    switch (position) {
      case 'banner': return 'बैनर';
      case 'sidebar': return 'साइडबार';
      case 'inline': return 'इनलाइन';
      case 'popup': return 'पॉपअप';
      default: return position;
    }
  };
  
  const handleActiveToggle = (ad) => {
    onActiveToggle(ad.id, !ad.active);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">विज्ञापन</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden sm:table-cell">स्थिति</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden md:table-cell">प्रकार</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden lg:table-cell">अवधि</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden sm:table-cell">प्रदर्शन</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">कार्रवाई</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad) => (
              <tr key={ad.id} className="border-b border-gray-200">
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 mr-2 md:mr-3 overflow-hidden rounded">
                      <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium font-hindi truncate max-w-[120px] md:max-w-[200px]">{ad.title}</p>
                      <div className="sm:hidden flex items-center mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${ad.active ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></span>
                        <span className="text-2xs text-gray-500">{ad.active ? 'सक्रिय' : 'निष्क्रिय'}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                  <span className={`bg-${ad.active ? 'green' : 'gray'}-100 text-${ad.active ? 'green' : 'gray'}-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded`}>
                    {ad.active ? 'सक्रिय' : 'निष्क्रिय'}
                  </span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">{getPositionText(ad.position)}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden lg:table-cell">
                  <span>{ad.startDate} से</span>
                  <br />
                  <span>{ad.endDate} तक</span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>दृश्य:</span>
                      <span className="font-medium">{ad.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>क्लिक:</span>
                      <span className="font-medium">{ad.clicks}</span>
                    </div>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex space-x-1 md:space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-news-blue"
                      onClick={() => onEdit(ad)}
                    >
                      <Pencil size={isMobile ? 14 : 16} className="mr-1 md:mr-1.5" />
                      संपादित
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm ${ad.active ? 'text-amber-600' : 'text-green-600'}`}
                      onClick={() => handleActiveToggle(ad)}
                    >
                      {ad.active ? (
                        <EyeOff size={isMobile ? 14 : 16} className="mr-1 md:mr-1.5" />
                      ) : (
                        <Eye size={isMobile ? 14 : 16} className="mr-1 md:mr-1.5" />
                      )}
                      {ad.active ? 'रोकें' : 'सक्रिय'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-red-600"
                      onClick={() => onDelete(ad.id)}
                    >
                      <Trash2 size={isMobile ? 14 : 16} className="mr-1 md:mr-1.5" />
                      हटाएं
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertisementTable;
