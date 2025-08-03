
import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  title: string;
  category?: string;
  newsItems: NewsItem[];
  viewAllLink?: string;
  layout?: 'grid' | 'list';
}

const NewsSection = ({ 
  title, 
  category, 
  newsItems, 
  viewAllLink,
  layout = 'grid'
}: NewsSectionProps) => {
  // Don't render if no news items
  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <section className="news-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="text-news-blue hover:text-news-blue-dark text-sm font-medium flex items-center"
          >
            और देखें <ChevronRight size={16} />
          </Link>
        )}
      </div>
      
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {newsItems.map((news) => (
            <NewsCard key={news._id} news={news} variant="small" />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
