
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ReporterFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
  reporterData?: any;
}

const ReporterForm: React.FC<ReporterFormProps> = ({ 
  onClose, 
  onSubmit, 
  isEditing = false,
  reporterData = null 
}) => {
  const [formData, setFormData] = useState({
    name: reporterData?.name || '',
    email: reporterData?.email || '',
    mobile: reporterData?.mobile || '',
    location: reporterData?.location || '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'नाम आवश्यक है';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ईमेल आवश्यक है';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'अमान्य ईमेल प्रारूप';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'मोबाइल नंबर आवश्यक है';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'अमान्य मोबाइल नंबर (10 अंक होने चाहिए)';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'स्थान आवश्यक है';
    }
    
    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = 'पासवर्ड आवश्यक है';
      } else if (formData.password.length < 6) {
        newErrors.password = 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाते';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-news-blue-dark font-hindi">
          {isEditing ? 'रिपोर्टर संपादित करें' : 'नया रिपोर्टर जोड़ें'}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">नाम</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">ईमेल</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">मोबाइल नंबर</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md text-sm ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-news-gray-dark mb-1">स्थान</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md text-sm ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          
          {!isEditing && (
            <>
              <div>
                <label className="block text-sm font-medium text-news-gray-dark mb-1">पासवर्ड</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-news-gray-dark mb-1">पासवर्ड की पुष्टि करें</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}
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

export default ReporterForm;
