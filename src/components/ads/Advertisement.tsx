
import React from 'react';

interface AdvertisementProps {
  position: 'banner' | 'sidebar' | 'inline' | 'popup';
  imageUrl: string;
  link: string;
  altText: string;
}

const Advertisement = ({ position, imageUrl, link, altText }: AdvertisementProps) => {
  const getAdClasses = () => {
    switch (position) {
      case 'banner':
        return 'w-full h-20 md:h-72';
      case 'sidebar':
        return 'w-full h-80';
      case 'inline':
        return 'w-full h-32';
      case 'popup':
        return 'w-full max-w-md h-64';
      default:
        return 'w-full h-24';
    }
  };

  return (
    <div className="my-4 flex justify-center">
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`block ${getAdClasses()} bg-gray-100 overflow-hidden relative hover:opacity-95 transition-opacity border border-gray-200 rounded-md`}
      >
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-full object-contain"
        />
        <span className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-1 opacity-70">
          विज्ञापन
        </span>
      </a>
    </div>
  );
};

export default Advertisement;
