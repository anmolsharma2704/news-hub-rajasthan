import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';




interface AdvertisementTableProps {
  ads: any[]; // fetched from backend
  onEdit: (ad: any) => void;
  onDelete: (adId: string) => void;
  onActiveToggle: (adId: string, isActive: boolean) => void;
}

const AdvertisementTable: React.FC<AdvertisementTableProps> = ({ ads, onEdit, onDelete, onActiveToggle }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const getPositionText = (position: string) => {
    switch (position) {
      case 'banner': return 'बैनर';
      case 'sidebar': return 'साइडबार';
      case 'inline': return 'इनलाइन';
      case 'popup': return 'पॉपअप';
      default: return position;
    }
  };

  const handleActiveToggle = (ad: any) => {
    onActiveToggle(ad._id, ad.status !== 'active'); // status from backend
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase">विज्ञापन</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase hidden sm:table-cell">स्थिति</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase hidden md:table-cell">प्रकार</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase hidden lg:table-cell">अवधि</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase hidden sm:table-cell">प्रदर्शन</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-news-gray-dark uppercase">कार्रवाई</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b border-gray-200">
                {/* Image & Title */}
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex-shrink-0 mr-3 overflow-hidden rounded">
                      <img src={ad.images?.[0] || '/placeholder.jpg'} alt={ad.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium font-hindi truncate max-w-[200px]">{ad.title}</p>
                      <div className="sm:hidden flex items-center mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${ad.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></span>
                        <span className="text-xs text-gray-500">{ad.status === 'active' ? 'सक्रिय' : 'निष्क्रिय'}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-1 text-xs rounded ${ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {ad.status === 'active' ? 'सक्रिय' : 'निष्क्रिय'}
                  </span>
                </td>

                {/* Type */}
                <td className="px-4 py-3 hidden md:table-cell">{getPositionText(ad.type)}</td>

                {/* Dates */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span>{new Date(ad.startDate).toLocaleDateString('hi-IN')} से</span>
                  <br />
                  <span>{new Date(ad.expiresAt).toLocaleDateString('hi-IN')} तक</span>
                </td>

                {/* Views & Clicks */}
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>दृश्य:</span>
                      <span className="font-medium">{ad.views || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>क्लिक:</span>
                      <span className="font-medium">{ad.clicks || 0}</span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-news-blue" onClick={() => navigate(`/admin/advertisements/${ad._id}?edit=true`)}>
                      <Pencil size={isMobile ? 14 : 16} className="mr-1" /> संपादित
                    </Button>
                    <Button variant="ghost" size="sm" className={ad.status === 'active' ? 'text-amber-600' : 'text-green-600'} onClick={() => handleActiveToggle(ad)}>
                      {ad.status === 'active' ? <EyeOff size={isMobile ? 14 : 16} className="mr-1" /> : <Eye size={isMobile ? 14 : 16} className="mr-1" />}
                      {ad.status === 'active' ? 'रोकें' : 'सक्रिय'}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDelete(ad._id)}>
                      <Trash2 size={isMobile ? 14 : 16} className="mr-1" /> हटाएं
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
