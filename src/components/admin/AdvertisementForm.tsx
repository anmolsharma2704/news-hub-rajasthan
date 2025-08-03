import React, { useState, useEffect } from 'react';
import { apiService } from '@/utils/apiService';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';

interface AdvertisementFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isEditing?: boolean;
  adId?: string;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ 
  onClose, 
  onSubmit, 
  isEditing = false,
  adId
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'banner',
    link: '',
    startDate: '',
    expiresAt: '',
    status: 'active',
    priority: 0,
    views: 0,
    clicks: 0,
    position: 0
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Fetch ad data in edit mode
  useEffect(() => {
    if (isEditing && adId) {
      setLoading(true);
      apiService.getAdById(adId)
        .then(({ ad }) => {
          setFormData({
            title: ad.title || '',
            description: ad.description || '',
            type: ad.type || 'banner',
            link: ad.link || '',
            startDate: ad.startDate ? ad.startDate.split('T')[0] : '',
            expiresAt: ad.expiresAt ? ad.expiresAt.split('T')[0] : '',
            status: ad.status || 'active',
            priority: ad.priority ?? 0,
            views: ad.views ?? 0,
            clicks: ad.clicks ?? 0,
            position: ad.position ?? 0
          });
          if (ad.images?.length) setPreviewUrl(ad.images[0]);
        })
        .catch((err) => console.error("Error fetching ad:", err))
        .finally(() => setLoading(false));
    }
  }, [isEditing, adId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'शीर्षक आवश्यक है';
    if (!isEditing && !selectedImage && !previewUrl) newErrors.image = 'छवि आवश्यक है';
    if (!formData.link.trim()) {
      newErrors.link = 'लिंक आवश्यक है';
    } else if (!/^https?:\/\/\S+/.test(formData.link)) {
      newErrors.link = 'अमान्य URL (http:// या https:// से शुरू होना चाहिए)';
    }
    if (!formData.startDate) newErrors.startDate = 'प्रारंभ तिथि आवश्यक है';
    if (!formData.expiresAt) newErrors.expiresAt = 'समाप्ति तिथि आवश्यक है';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, String(value));
    });
    if (selectedImage) submissionData.append('images', selectedImage);

    onSubmit(submissionData);
  };

  if (loading) return <p className="p-4">Loading ad data...</p>;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold text-news-blue-dark font-hindi">
          {isEditing ? 'विज्ञापन संपादित करें' : 'नया विज्ञापन जोड़ें'}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">विज्ञापन शीर्षक</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">विवरण</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm mb-1">विज्ञापन प्रकार</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="banner">बैनर</option>
            <option value="sidebar">साइडबार</option>
            <option value="inline">इनलाइन</option>
            <option value="popup">पॉपअप</option>
          </select>
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm mb-1">लिंक</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-sm ${errors.link ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.link && <p className="text-red-500 text-xs">{errors.link}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm mb-1">प्रारंभ तिथि</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-sm ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm mb-1">समाप्ति तिथि</label>
          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-sm ${errors.expiresAt ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.expiresAt && <p className="text-red-500 text-xs">{errors.expiresAt}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm mb-1">स्थिति</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="active">सक्रिय</option>
            <option value="paused">रुका हुआ</option>
            <option value="expired">समाप्त</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm mb-1">प्राथमिकता</label>
          <input
            type="number"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Views */}
        <div>
          <label className="block text-sm mb-1">दृश्य</label>
          <input
            type="number"
            name="views"
            value={formData.views}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Clicks */}
        <div>
          <label className="block text-sm mb-1">क्लिक</label>
          <input
            type="number"
            name="clicks"
            value={formData.clicks}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm mb-1">स्थिति</label>
          <input
            type="number"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">छवि</label>
          <div className={`border-2 border-dashed rounded-lg p-4 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}>
            {previewUrl ? (
              <div className="relative w-fit mx-auto">
                <img src={previewUrl} alt="Preview" className="max-h-40" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  onClick={() => { setSelectedImage(null); setPreviewUrl(''); }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Upload className="text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-500">छवि अपलोड करने के लिए क्लिक करें</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </div>
          {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={onClose}>रद्द करें</Button>
          <Button type="submit" className="bg-news-blue hover:bg-news-blue-dark text-white">
            {isEditing ? 'अपडेट करें' : 'जोड़ें'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
