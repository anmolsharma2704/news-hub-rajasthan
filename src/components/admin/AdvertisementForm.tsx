
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Calendar } from 'lucide-react';

interface AdvertisementFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
  adData?: any;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ 
  onClose, 
  onSubmit, 
  isEditing = false,
  adData = null 
}) => {
  const [formData, setFormData] = useState({
    title: adData?.title || '',
    position: adData?.position || 'banner',
    imageUrl: adData?.imageUrl || '',
    link: adData?.link || '',
    startDate: adData?.startDate || '',
    endDate: adData?.endDate || '',
    active: adData ? adData.active : true,
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(adData?.imageUrl || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'शीर्षक आवश्यक है';
    }
    
    if (!isEditing && !selectedImage && !previewUrl) {
      newErrors.image = 'छवि आवश्यक है';
    }
    
    if (!formData.link.trim()) {
      newErrors.link = 'लिंक आवश्यक है';
    } else if (!/^https?:\/\/\S+/.test(formData.link)) {
      newErrors.link = 'अमान्य URL (http:// या https:// से शुरू होना चाहिए)';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'प्रारंभ तिथि आवश्यक है';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'समाप्ति तिथि आवश्यक है';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear image error if it exists
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        ...formData,
        image: selectedImage
      };
      onSubmit(submissionData);
    }
  };
  
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-news-blue-dark font-hindi">
          {isEditing ? 'विज्ञापन संपादित करें' : 'नया विज्ञापन जोड़ें'}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-news-gray-dark mb-1">विज्ञापन शीर्षक</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">विज्ञापन प्रकार</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
            >
              <option value="banner">बैनर (Banner)</option>
              <option value="sidebar">साइडबार (Sidebar)</option>
              <option value="inline">इनलाइन (Inline)</option>
              <option value="popup">पॉपअप (Popup)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">विज्ञापन लिंक</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className={`w-full p-2 border rounded-md text-sm ${errors.link ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">प्रारंभ तिथि</label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                className={`w-full p-2 pl-8 border rounded-md text-sm ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">समाप्ति तिथि</label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                className={`w-full p-2 pl-8 border rounded-md text-sm ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-news-gray-dark mb-1">विज्ञापन छवि</label>
            <div className={`border-2 border-dashed rounded-lg p-4 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}>
              {previewUrl ? (
                <div className="mb-3">
                  <div className="relative">
                    <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto" />
                    <button 
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl('');
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">छवि अपलोड करने के लिए यहां क्लिक करें या खींचकर छोड़ें</p>
                </div>
              )}
              
              <input 
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`opacity-0 absolute inset-0 w-full cursor-pointer ${previewUrl ? 'hidden' : ''}`}
              />
            </div>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="form-checkbox h-4 w-4 text-news-blue rounded"
              />
              <span className="text-sm font-medium text-news-gray-dark">विज्ञापन सक्रिय करें</span>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            रद्द करें
          </Button>
          <Button 
            type="submit" 
            className="bg-news-blue hover:bg-news-blue-dark text-white"
          >
            {isEditing ? 'अपडेट करें' : 'जोड़ें'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
