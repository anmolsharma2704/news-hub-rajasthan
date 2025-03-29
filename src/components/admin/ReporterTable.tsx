
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, UserCheck, UserMinus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data - in a real app, this would come from an API
const reporters = [
  {
    id: '1',
    name: 'विनोद शर्मा',
    email: 'vinod@example.com',
    mobile: '9876543210',
    location: 'जयपुर',
    articles: 24,
    status: 'active',
    joinedDate: '15 मार्च, 2023',
  },
  {
    id: '2',
    name: 'सुनीता राठौर',
    email: 'sunita@example.com',
    mobile: '9876543211',
    location: 'उदयपुर',
    articles: 18,
    status: 'active',
    joinedDate: '5 अप्रैल, 2023',
  },
  {
    id: '3',
    name: 'अमित सिंह',
    email: 'amit@example.com',
    mobile: '9876543212',
    location: 'बीकानेर',
    articles: 7,
    status: 'pending',
    joinedDate: '20 जून, 2023',
  },
  {
    id: '4',
    name: 'प्रिया शर्मा',
    email: 'priya@example.com',
    mobile: '9876543213',
    location: 'जोधपुर',
    articles: 12,
    status: 'inactive',
    joinedDate: '8 फ़रवरी, 2023',
  },
  {
    id: '5',
    name: 'संदीप जोशी',
    email: 'sandeep@example.com',
    mobile: '9876543214',
    location: 'अजमेर',
    articles: 32,
    status: 'active',
    joinedDate: '12 जनवरी, 2023',
  }
];

interface ReporterTableProps {
  onEdit: (reporter: any) => void;
  onStatusChange: (reporterId: string, newStatus: string) => void;
}

const ReporterTable: React.FC<ReporterTableProps> = ({ onEdit, onStatusChange }) => {
  const isMobile = useIsMobile();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">सक्रिय</span>;
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">अनुमोदन के लिए</span>;
      case 'inactive':
        return <span className="bg-gray-100 text-gray-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">निष्क्रिय</span>;
      default:
        return null;
    }
  };
  
  const handleStatusToggle = (reporter) => {
    const newStatus = reporter.status === 'active' ? 'inactive' : 'active';
    onStatusChange(reporter.id, newStatus);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">नाम</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden sm:table-cell">ईमेल</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden md:table-cell">स्थान</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">लेख</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">स्थिति</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">कार्रवाई</th>
            </tr>
          </thead>
          <tbody>
            {reporters.map((reporter) => (
              <tr key={reporter.id} className="border-b border-gray-200">
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm font-hindi">
                  <div className="flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-news-gray mr-2">
                      {reporter.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{reporter.name}</p>
                      <p className="text-2xs text-gray-500 sm:hidden">{reporter.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">{reporter.email}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">{reporter.location}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">{reporter.articles}</td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  {getStatusBadge(reporter.status)}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex space-x-1 md:space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-news-blue"
                      onClick={() => onEdit(reporter)}
                    >
                      <Pencil size={isMobile ? 14 : 16} className="mr-1" />
                      संपादित
                    </Button>
                    {reporter.status === 'active' ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-amber-600"
                        onClick={() => handleStatusToggle(reporter)}
                      >
                        <UserMinus size={isMobile ? 14 : 16} className="mr-1" />
                        निष्क्रिय
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-green-600"
                        onClick={() => handleStatusToggle(reporter)}
                      >
                        <UserCheck size={isMobile ? 14 : 16} className="mr-1" />
                        सक्रिय
                      </Button>
                    )}
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

export default ReporterTable;
