
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut, 
  Settings,
  ImageIcon,
  Bell
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const sidebarItems = [
  { path: '/admin', label: 'डैशबोर्ड', icon: LayoutDashboard },
  { path: '/admin/news', label: 'समाचार प्रबंधन', icon: FileText },
  { path: '/admin/reporters', label: 'रिपोर्टर्स', icon: Users },
  { path: '/admin/advertisements', label: 'विज्ञापन', icon: ImageIcon },
  { path: '/admin/notifications', label: 'नोटिफिकेशन', icon: Bell },
  { path: '/admin/settings', label: 'सेटिंग्स', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <aside className="bg-news-blue-dark text-white w-64 min-h-screen flex-shrink-0">
      <div className="p-3 md:p-4 border-b border-blue-800">
        <Link to="/" className="flex items-center justify-center">
          <span className="text-xl md:text-2xl font-bold">
            News<span className="text-news-saffron">Day</span>
          </span>
          <span className="text-xs md:text-sm font-hindi ml-1">Admin</span>
        </Link>
      </div>
      
      <nav className="p-2 md:p-4">
        <ul className="space-y-1 md:space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-1.5 md:p-2 rounded transition-colors ${
                    isActive 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <item.icon size={isMobile ? 16 : 18} className="mr-2 md:mr-3" />
                  <span className="text-xs md:text-sm font-hindi">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-blue-800">
          <button className="flex items-center p-1.5 md:p-2 rounded w-full text-blue-100 hover:bg-blue-800 hover:text-white transition-colors">
            <LogOut size={isMobile ? 16 : 18} className="mr-2 md:mr-3" />
            <span className="text-xs md:text-sm font-hindi">लॉग आउट</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
