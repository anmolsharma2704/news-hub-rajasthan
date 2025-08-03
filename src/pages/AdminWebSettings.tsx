
import React, { useState } from 'react';
import WebSettingsForm from '@/components/admin/WebSettingsForm';
import { useToast } from '@/hooks/use-toast';

const AdminWebSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();


  const handleSettingsSave = (settings) => {
    // In a real app, this would call an API to save the settings
    toast({
      title: "सेटिंग्स अपडेट की गईं",
      description: "वेबसाइट सेटिंग्स सफलतापूर्वक अपडेट की गईं",
      variant: "default",
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">वेबसाइट सेटिंग्स</h1>
          <p className="text-sm md:text-base text-news-gray-dark">वेबसाइट के प्रमुख विवरण अपडेट करें</p>
        </div>
      </div>

      <WebSettingsForm onSave={handleSettingsSave} />
    </main>
  );
};

export default AdminWebSettings;
