
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-news-blue-dark text-white pt-10 pb-6">
      <div className="news-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-hindi">न्यूज़डे राजस्थान</h3>
            <p className="text-gray-300 mb-4 font-hindi">
              राजस्थान की सबसे विश्वसनीय समाचार वेबसाइट, जो आपको प्रदान करती है ताज़ा और सही खबरें।
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="text-white hover:text-news-saffron transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-news-saffron transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-news-saffron transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-news-saffron transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 font-hindi">महत्वपूर्ण लिंक</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors font-hindi">हमारे बारे में</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors font-hindi">गोपनीयता नीति</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors font-hindi">नियम और शर्तें</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors font-hindi">संपर्क करें</Link>
              <Link to="/advertisement" className="text-gray-300 hover:text-white transition-colors font-hindi">विज्ञापन</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 font-hindi">संपर्क</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-news-saffron flex-shrink-0 mt-1" />
                <p className="text-gray-300 font-hindi">123 मेन स्ट्रीट, जयपुर, राजस्थान, भारत - 302001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-news-saffron flex-shrink-0" />
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-news-saffron flex-shrink-0" />
                <p className="text-gray-300">info@newsdayrajasthan.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} News Day Rajasthan. सर्वाधिकार सुरक्षित.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
