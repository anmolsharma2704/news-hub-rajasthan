
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  isFeatured?: boolean;
}

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'featured' | 'small';
}

const NewsCard = ({ news, variant = 'default' }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hi-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  if (variant === 'featured') {
    return (
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative news-card overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
              <span className="inline-block bg-news-saffron text-black px-2 py-1 rounded text-xs font-bold mb-2">
                {news.category === 'politics' ? 'राजनीति' :
                 news.category === 'crime' ? 'अपराध' :
                 news.category === 'business' ? 'व्यापार' :
                 news.category === 'entertainment' ? 'मनोरंजन' :
                 news.category === 'sports' ? 'खेल' : 'जीवनशैली'}
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white leading-tight">
                {news.title}
              </h2>
              <p className="text-gray-200 mb-3 hidden md:block line-clamp-2">{news.excerpt}</p>
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
    return (
      <Link to={`/news/${news.id}`} className="block">
        <div className="news-card flex h-24">
          <div className="w-1/3 flex-shrink-0">
            <img 
              src={news.image} 
              alt={news.title} 
              className="h-full w-full object-cover"
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
  
  return (
    <Link to={`/news/${news.id}`} className="block">
      <div className="news-card">
        <img 
          src={news.image} 
          alt={news.title} 
          className="news-card-image"
        />
        <div className="news-card-content">
          <span className="inline-block bg-news-blue-light text-white px-2 py-1 rounded text-xs font-bold mb-2">
            {news.category === 'politics' ? 'राजनीति' :
             news.category === 'crime' ? 'अपराध' :
             news.category === 'business' ? 'व्यापार' :
             news.category === 'entertainment' ? 'मनोरंजन' :
             news.category === 'sports' ? 'खेल' : 'जीवनशैली'}
          </span>
          <h2 className="news-card-title">{news.title}</h2>
          <p className="news-card-excerpt">{news.excerpt}</p>
          <div className="news-card-meta">
            <span>{news.author}</span>
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
