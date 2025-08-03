
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import ReporterTable from '@/components/admin/ReporterTable';
import ReporterForm from '@/components/admin/ReporterForm';
import { useToast } from '@/hooks/use-toast';

const AdminReporterManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddingReporter, setIsAddingReporter] = useState(false);
  const [isEditingReporter, setIsEditingReporter] = useState(false);
  const [selectedReporter, setSelectedReporter] = useState(null);
  const { toast } = useToast();

  const handleAddReporterClick = () => {
    setIsAddingReporter(true);
    setIsEditingReporter(false);
    setSelectedReporter(null);
  };

  const handleEditReporter = (reporter) => {
    setSelectedReporter(reporter);
    setIsEditingReporter(true);
    setIsAddingReporter(false);
  };

  const handleStatusChange = (reporterId, newStatus) => {
    // In a real app, this would call an API to update the reporter status
    toast({
      title: "रिपोर्टर स्थिति अपडेट की गई",
      description: `रिपोर्टर की स्थिति सफलतापूर्वक ${newStatus} में बदली गई है`,
      variant: "default",
    });
  };

  const handleFormClose = () => {
    setIsAddingReporter(false);
    setIsEditingReporter(false);
    setSelectedReporter(null);
  };

  const handleFormSubmit = (reporterData) => {
    // In a real app, this would call an API to save the reporter
    toast({
      title: isEditingReporter ? "रिपोर्टर अपडेट किया गया" : "नया रिपोर्टर जोड़ा गया",
      description: isEditingReporter
        ? "रिपोर्टर सफलतापूर्वक अपडेट किया गया है"
        : "नया रिपोर्टर सफलतापूर्वक जोड़ा गया है",
      variant: "default",
    });

    handleFormClose();
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      {(isAddingReporter || isEditingReporter) ? (
        <ReporterForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          isEditing={isEditingReporter}
          reporterData={selectedReporter}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">रिपोर्टर प्रबंधन</h1>
              <p className="text-sm md:text-base text-news-gray-dark">रिपोर्टरों को जोड़ें, संपादित करें और प्रबंधित करें</p>
            </div>
            <Button
              onClick={handleAddReporterClick}
              className="mt-3 sm:mt-0 w-full sm:w-auto bg-news-blue hover:bg-news-blue-dark text-white"
            >
              <Plus size={18} className="mr-1" />
              नया रिपोर्टर जोड़ें
            </Button>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="रिपोर्टर खोजें..."
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

          <ReporterTable
            onEdit={handleEditReporter}
            onStatusChange={handleStatusChange}
          />
        </>
      )}
    </main>
  );
};

export default AdminReporterManagement;
