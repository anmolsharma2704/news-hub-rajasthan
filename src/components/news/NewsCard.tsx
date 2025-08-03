
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface NewsItem {
  _id: string;
  id?: string; // For backward compatibility
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  images?: string[]; // Your backend uses images array
  category?: string;
  author?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  slug?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
  city?: string;
  state?: string;
}

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'featured' | 'small';
}

const NewsCard = ({ news, variant = 'default' }: NewsCardProps) => {
  // Get the first image from images array or use image field as fallback
  const imageUrl = news.images?.[0] || news.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  
  // Get category with fallback
  const category = news.category || 'general';
  
  // Get author with fallback
  const author = news.author || 'संवाददाता';
  
  if (variant === 'featured') {
    console.log('NewsCard - Featured news ID:', news._id);
    return (
      <Link to={`/news/${news._id}`} className="block">
        <div className="relative news-card overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img 
              src={imageUrl} 
              alt={news.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
              <span className="inline-block bg-news-saffron text-black px-2 py-1 rounded text-xs font-bold mb-2">
                {category === 'politics' ? 'राजनीति' :
                 category === 'crime' ? 'अपराध' :
                 category === 'business' ? 'व्यापार' :
                 category === 'entertainment' ? 'मनोरंजन' :
                 category === 'sports' ? 'खेल' :
                 category === 'mixed' ? 'मिश्रित' : 'जीवनशैली'}
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white leading-tight">
                {news.title}
              </h2>
              <p className="text-gray-200 mb-3 hidden md:block line-clamp-2">{news.excerpt || news.title}</p>
              <div className="flex items-center text-xs md:text-sm text-gray-300">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(news.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'small') {
    console.log('NewsCard - Small news ID:', news._id);
    return (
      <Link to={`/news/${news._id}`} className="block">
        <div className="news-card flex h-24">
          <div className="w-1/3 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={news.title} 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
          <div className="w-2/3 p-2">
            <h3 className="text-sm font-bold mb-1 line-clamp-2">{news.title}</h3>
            <div className="flex items-center text-xs text-news-gray">
              <Clock size={12} className="mr-1" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  console.log('NewsCard - Default news ID:', news._id);
  return (
    <Link to={`/news/${news._id}`} className="block">
      <div className="news-card">
        <img 
          src={imageUrl} 
          alt={news.title} 
          className="news-card-image"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="news-card-content">
          <span className="inline-block bg-news-blue-light text-white px-2 py-1 rounded text-xs font-bold mb-2">
            {category === 'politics' ? 'राजनीति' :
             category === 'crime' ? 'अपराध' :
             category === 'business' ? 'व्यापार' :
             category === 'entertainment' ? 'मनोरंजन' :
             category === 'sports' ? 'खेल' :
             category === 'mixed' ? 'मिश्रित' : 'जीवनशैली'}
          </span>
          <h2 className="news-card-title">{news.title}</h2>
          <p className="news-card-excerpt">{news.excerpt || news.title}</p>
          <div className="news-card-meta">
            <span>{author}</span>
            <span>
              <Calendar size={14} className="inline mr-1" />
              {formatDate(news.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
