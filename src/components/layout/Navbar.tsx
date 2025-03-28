
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'politics', name: 'राजनीति' },
  { id: 'crime', name: 'अपराध' },
  { id: 'business', name: 'व्यापार' },
  { id: 'entertainment', name: 'मनोरंजन' },
  { id: 'sports', name: 'खेल' },
  { id: 'lifestyle', name: 'जीवनशैली' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="news-container">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-2 p-1"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-news-blue">
                News<span className="text-news-saffron">Day</span>
              </span>
              <span className="text-sm font-hindi ml-1 hidden sm:inline-block">राजस्थान</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="font-hindi text-news-gray-dark hover:text-news-blue transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <button 
              className="p-1 text-news-gray-dark hover:text-news-blue transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/admin" className="p-1 text-news-gray-dark hover:text-news-blue transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="font-hindi py-1 text-news-gray-dark hover:text-news-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 py-3 animate-slide-up">
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="खोजें..."
                className="flex-grow border border-gray-200 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-news-blue font-hindi"
              />
              <Button type="submit" className="bg-news-blue hover:bg-news-blue-dark rounded-r-md">
                <Search size={18} />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
