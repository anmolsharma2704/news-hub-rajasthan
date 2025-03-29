
import React, { useState } from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminTopbarProps {
  toggleSidebar: () => void;
}

const AdminTopbar = ({ toggleSidebar }: AdminTopbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white shadow flex items-center justify-between h-12 md:h-16 px-3 md:px-4">
      <div className="flex items-center">
        <button 
          className="md:hidden p-1.5 md:p-2 text-news-gray-dark mr-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={isMobile ? 20 : 24} />
        </button>
        
        <div className="relative md:w-64 w-36">
          <input 
            type="text" 
            placeholder="खोजें..."
            className="border border-gray-300 rounded-full pl-8 md:pl-10 pr-3 md:pr-4 py-1 w-full focus:outline-none focus:ring-1 focus:ring-news-blue text-xs md:text-sm font-hindi h-7 md:h-8"
          />
          <Search size={isMobile ? 14 : 16} className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-3">
        <Link to="/admin/notifications" className="p-1.5 md:p-2 text-news-gray-dark hover:text-news-blue relative">
          <Bell size={isMobile ? 18 : 20} />
          <span className="absolute top-1 right-1 bg-news-red rounded-full w-1.5 md:w-2 h-1.5 md:h-2"></span>
        </Link>
        
        <div className="relative">
          <button
            className="flex items-center space-x-1 md:space-x-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-news-blue-light flex items-center justify-center text-white">
              <User size={isMobile ? 16 : 18} />
            </div>
            <span className="hidden md:inline-block font-medium text-news-gray-dark">Admin</span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-36 md:w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
              <Link 
                to="/admin/profile" 
                className="block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-news-gray-dark hover:bg-gray-100 font-hindi"
              >
                प्रोफाइल
              </Link>
              <Link 
                to="/admin/settings" 
                className="block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-news-gray-dark hover:bg-gray-100 font-hindi"
              >
                सेटिंग्स
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                className="block w-full text-left px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-news-red hover:bg-gray-100 font-hindi"
              >
                लॉग आउट
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
