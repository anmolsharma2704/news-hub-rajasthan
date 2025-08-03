
import React, { useState } from 'react';
import NotificationTable from '@/components/admin/NotificationTable';
import NotificationForm from '@/components/admin/NotificationForm';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

const AdminNotificationManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const { toast } = useToast();


  const handleAddNew = () => {
    setEditingNotification(null);
    setShowForm(true);
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);
    setShowForm(true);
  };

  const handleSave = (notificationData) => {
    // Here you would save to backend API
    const action = editingNotification ? 'updated' : 'created';

    toast({
      title: `नोटिफिकेशन ${action}`,
      description: `नोटिफिकेशन सफलतापूर्वक ${action} किया गया`,
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    // Here you would delete from backend API
    toast({
      title: "नोटिफिकेशन हटाया गया",
      description: "नोटिफिकेशन सफलतापूर्वक हटा दिया गया",
      variant: "destructive",
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">नोटिफिकेशन प्रबंधन</h1>
          <p className="text-sm md:text-base text-news-gray-dark">नोटिफिकेशन जोड़ें, संपादित करें और प्रबंधित करें</p>
        </div>

        <button
          onClick={handleAddNew}
          className="mt-3 sm:mt-0 px-3 py-2 bg-news-blue text-white rounded-md flex items-center text-sm hover:bg-blue-700 transition-colors font-hindi"
        >
          <PlusCircle size={16} className="mr-1" />
          नया नोटिफिकेशन
        </button>
      </div>

      {showForm ? (
        <NotificationForm
          notification={editingNotification}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <NotificationTable
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default AdminNotificationManagement;
