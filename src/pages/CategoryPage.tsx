
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams, Navigate } from 'react-router-dom';
import NewsCard, { NewsItem } from '@/components/news/NewsCard';
import Advertisement from '@/components/ads/Advertisement';
import { useNewsByCategory, useNews } from '@/hooks/useApi';
import { Skeleton } from '@/components/ui/skeleton';

// Category mapping
const categoryMapping: Record<string, { title: string; hindiTitle: string }> = {
  politics: {
    title: "Politics",
    hindiTitle: "राजनीति"
  },
  business: {
    title: "Business", 
    hindiTitle: "व्यापार"
  },
  entertainment: {
    title: "Entertainment",
    hindiTitle: "मनोरंजन"
  },
  sports: {
    title: "Sports",
    hindiTitle: "खेल"
  },
  lifestyle: {
    title: "Lifestyle",
    hindiTitle: "जीवनशैली"
  },
  crime: {
    title: "Crime",
    hindiTitle: "अपराध"
  },
  mixed: {
    title: "Mixed",
    hindiTitle: "मिश्रित"
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Get category info
  const category = categoryId ? categoryMapping[categoryId] : null;
  
  // Get news by category
  const { data: categoryData, isLoading, error } = useNewsByCategory(categoryId || '');
  
  // Get all news for related news section
  const { data: allNewsData } = useNews();
  
  // Get related news (other categories)
  const relatedNews = allNewsData?.news?.filter(
    newsItem => newsItem.category !== categoryId
  ).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="news-container py-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="news-container py-6">
        <h1 className="text-3xl font-bold mb-6 text-news-blue-dark border-b-2 border-news-saffron inline-block pb-2">
          {category.hindiTitle}
        </h1>
        
        {/* Advertisement Banner */}
        <Advertisement 
          position="banner"
          imageUrl="https://via.placeholder.com/1200x150/F5F5F5/333333?text=विज्ञापन+के+लिए+संपर्क+करें"
          link="#"
          altText="Advertisement Banner"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryData?.news?.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
            
            {(!categoryData?.news || categoryData.news.length === 0) && (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <p className="text-lg text-news-gray-dark font-hindi">इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।</p>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            {/* Sidebar Advertisement */}
            <Advertisement 
              position="sidebar"
              imageUrl="https://via.placeholder.com/300x600/F5F5F5/333333?text=विज्ञापन"
              link="#"
              altText="Sidebar Advertisement"
            />
            
            {/* Popular in Category */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">लोकप्रिय {category.hindiTitle}</h2>
              <div className="space-y-4">
                {categoryData?.news?.slice(0, 3).map((news) => (
                  <NewsCard key={news._id} news={news} variant="small" />
                ))}
              </div>
            </div>
            
            {/* Other Categories */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">अन्य श्रेणियां</h2>
              <div className="space-y-4">
                {relatedNews.map((news) => (
                  <NewsCard key={news._id} news={news} variant="small" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
