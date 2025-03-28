
import React, { useState } from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminTopbarProps {
  toggleSidebar: () => void;
}

const AdminTopbar = ({ toggleSidebar }: AdminTopbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <header className="bg-white shadow flex items-center justify-between h-16 px-4">
      <div className="flex items-center">
        <button 
          className="md:hidden p-2 text-news-gray-dark mr-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative md:w-64">
          <input 
            type="text" 
            placeholder="खोजें..."
            className="border border-gray-300 rounded-full pl-10 pr-4 py-1 w-full focus:outline-none focus:ring-1 focus:ring-news-blue text-sm font-hindi"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link to="/admin/notifications" className="p-2 text-news-gray-dark hover:text-news-blue relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-news-red rounded-full w-2 h-2"></span>
        </Link>
        
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-news-blue-light flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="hidden md:inline-block font-medium text-news-gray-dark">Admin</span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
              <Link 
                to="/admin/profile" 
                className="block px-4 py-2 text-sm text-news-gray-dark hover:bg-gray-100 font-hindi"
              >
                प्रोफाइल
              </Link>
              <Link 
                to="/admin/settings" 
                className="block px-4 py-2 text-sm text-news-gray-dark hover:bg-gray-100 font-hindi"
              >
                सेटिंग्स
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-news-red hover:bg-gray-100 font-hindi"
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
