
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Bell, ArrowUp, ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: 'साइट रखरखाव',
    message: 'हमारी साइट कल 2 घंटे के लिए रखरखाव के लिए डाउन रहेगी।',
    type: 'system',
    audience: 'all',
    status: 'scheduled',
    scheduledFor: '2023-09-20T10:00:00',
    createdAt: '2023-09-15T08:30:00',
  },
  {
    id: 2,
    title: 'नया फीचर लॉन्च',
    message: 'हमने एक नया फीचर लॉन्च किया है! अपना प्रोफाइल अपडेट करें।',
    type: 'feature',
    audience: 'registered',
    status: 'sent',
    scheduledFor: null,
    createdAt: '2023-09-14T14:45:00',
  },
  {
    id: 3,
    title: 'महत्वपूर्ण अपडेट',
    message: 'हमारे एप्लिकेशन के नियम और शर्तें अपडेट की गई हैं।',
    type: 'important',
    audience: 'all',
    status: 'draft',
    scheduledFor: null,
    createdAt: '2023-09-16T11:20:00',
  }
];

interface NotificationTableProps {
  onEdit: (notification: any) => void;
  onDelete: (id: number) => void;
}

const NotificationTable = ({ onEdit, onDelete }: NotificationTableProps) => {
  const isMobile = useIsMobile();
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortedNotifications = () => {
    return [...mockNotifications].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hi-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  <span>शीर्षक</span>
                  {renderSortIcon('title')}
                </div>
              </th>
              {!isMobile && (
                <>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center">
                      <span>प्रकार</span>
                      {renderSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('audience')}
                  >
                    <div className="flex items-center">
                      <span>दर्शक</span>
                      {renderSortIcon('audience')}
                    </div>
                  </th>
                </>
              )}
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  <span>स्थिति</span>
                  {renderSortIcon('status')}
                </div>
              </th>
              {!isMobile && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    <span>बनाया गया</span>
                    {renderSortIcon('createdAt')}
                  </div>
                </th>
              )}
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                कार्रवाई
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSortedNotifications().map((notification) => (
              <tr key={notification.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Bell size={16} className="mr-2 text-news-blue" />
                    <div className="text-sm font-medium text-gray-900 font-hindi">{notification.title}</div>
                  </div>
                </td>
                {!isMobile && (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-700 capitalize font-hindi">{notification.type}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-700 capitalize font-hindi">
                        {notification.audience === 'all' ? 'सभी उपयोगकर्ता' : 'पंजीकृत उपयोगकर्ता'}
                      </div>
                    </td>
                  </>
                )}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(notification.status)} font-hindi`}>
                    {notification.status === 'sent' && 'भेजा गया'}
                    {notification.status === 'scheduled' && 'अनुसूचित'}
                    {notification.status === 'draft' && 'ड्राफ्ट'}
                  </span>
                </td>
                {!isMobile && (
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-hindi">
                    {formatDate(notification.createdAt)}
                  </td>
                )}
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-news-blue hover:text-news-blue-dark"
                      onClick={() => onEdit(notification)}
                      title="संपादित करें"
                    >
                      <Edit size={isMobile ? 16 : 18} />
                    </button>
                    <button
                      className="text-news-red hover:text-news-red-dark"
                      onClick={() => onDelete(notification.id)}
                      title="हटाएं"
                    >
                      <Trash2 size={isMobile ? 16 : 18} />
                    </button>
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

export default NotificationTable;
