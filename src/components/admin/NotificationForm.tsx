
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NotificationFormProps {
  notification: any | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const NotificationForm = ({ notification, onSave, onCancel }: NotificationFormProps) => {
  const isMobile = useIsMobile();
  const [isScheduled, setIsScheduled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'system',
    audience: 'all',
    status: 'draft',
    scheduledDate: null,
    scheduledTime: '12:00',
  });
  
  useEffect(() => {
    if (notification) {
      const scheduled = notification.status === 'scheduled';
      setIsScheduled(scheduled);
      
      let scheduledDate = null;
      let scheduledTime = '12:00';
      
      if (scheduled && notification.scheduledFor) {
        const date = new Date(notification.scheduledFor);
        scheduledDate = date;
        scheduledTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      }
      
      setFormData({
        title: notification.title || '',
        message: notification.message || '',
        type: notification.type || 'system',
        audience: notification.audience || 'all',
        status: notification.status || 'draft',
        scheduledDate,
        scheduledTime,
      });
    }
  }, [notification]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'status') {
      setIsScheduled(value === 'scheduled');
    }
  };
  
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      scheduledDate: date,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let scheduledFor = null;
    if (isScheduled && formData.scheduledDate) {
      const date = new Date(formData.scheduledDate);
      const [hours, minutes] = formData.scheduledTime.split(':').map(Number);
      date.setHours(hours, minutes);
      scheduledFor = date.toISOString();
    }
    
    const notificationData = {
      ...formData,
      scheduledFor,
      id: notification?.id || Date.now(),
      createdAt: notification?.createdAt || new Date().toISOString(),
    };
    
    onSave(notificationData);
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('hi-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-hindi">
            {notification ? 'नोटिफिकेशन संपादित करें' : 'नया नोटिफिकेशन बनाएं'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 font-hindi">शीर्षक</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="font-hindi"
                placeholder="नोटिफिकेशन का शीर्षक दर्ज करें"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 font-hindi">संदेश</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="min-h-[100px] font-hindi"
                placeholder="नोटिफिकेशन संदेश दर्ज करें"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 font-hindi">प्रकार</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type" className="font-hindi">
                    <SelectValue placeholder="प्रकार चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system" className="font-hindi">सिस्टम</SelectItem>
                    <SelectItem value="feature" className="font-hindi">फीचर</SelectItem>
                    <SelectItem value="important" className="font-hindi">महत्वपूर्ण</SelectItem>
                    <SelectItem value="promo" className="font-hindi">प्रोमोशन</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700 font-hindi">दर्शक</label>
                <Select
                  value={formData.audience}
                  onValueChange={(value) => handleSelectChange('audience', value)}
                >
                  <SelectTrigger id="audience" className="font-hindi">
                    <SelectValue placeholder="दर्शक चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-hindi">सभी उपयोगकर्ता</SelectItem>
                    <SelectItem value="registered" className="font-hindi">पंजीकृत उपयोगकर्ता</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 font-hindi">स्थिति</label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger id="status" className="font-hindi">
                  <SelectValue placeholder="स्थिति चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft" className="font-hindi">ड्राफ्ट</SelectItem>
                  <SelectItem value="scheduled" className="font-hindi">अनुसूचित</SelectItem>
                  <SelectItem value="sent" className="font-hindi">भेजा गया</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isScheduled && (
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50 space-y-4">
                <h4 className="font-medium text-gray-700 font-hindi">अनुसूचित समय</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 font-hindi">तारीख</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal font-hindi"
                          id="scheduledDate"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.scheduledDate ? formatDate(formData.scheduledDate) : <span>तारीख चुनें</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.scheduledDate}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 font-hindi">समय</label>
                    <Input
                      id="scheduledTime"
                      name="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
                      className="font-hindi"
                      required={isScheduled}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="mt-3 sm:mt-0 font-hindi"
              >
                रद्द करें
              </Button>
              
              <div className="flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="font-hindi"
                    >
                      प्रीव्यू
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-hindi">{formData.title || 'नोटिफिकेशन प्रीव्यू'}</AlertDialogTitle>
                      <AlertDialogDescription className="font-hindi">
                        {formData.message || 'कोई संदेश नहीं'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-hindi">बंद करें</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <Button 
                  type="submit"
                  className="font-hindi"
                >
                  {notification ? 'अपडेट करें' : 'सेव करें'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationForm;
