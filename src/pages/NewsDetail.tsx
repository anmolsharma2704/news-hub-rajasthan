
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, Share2, Facebook, Twitter, Bookmark, ThumbsUp } from 'lucide-react';
import Advertisement from '@/components/ads/Advertisement';
import NewsCard, { NewsItem } from '@/components/news/NewsCard';
import { useNewsById, useNews,useAds } from '@/hooks/useApi';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import Slider from "react-slick";

const NewsDetail = () => {
  const { id } = useParams();
  
  console.log('NewsDetail - ID from params:', id);
  
  const { data: newsData, isLoading, error } = useNewsById(id || '');
  const { data: allNewsData } = useNews();
  const { data: adsData, isLoading: adsLoading } = useAds();

const bannerAds  = Array.isArray(adsData) ? adsData.slice(1, 6) : [];
const sidebarAds = Array.isArray(adsData) ? adsData.slice(0, 5) : [];

  
 
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};
  
  // Get related news from the same category
  const relatedNews = allNewsData?.news?.filter(
    newsItem => newsItem._id !== id
  ).slice(0, 3) || [];
  


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="news-container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full mb-6" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !newsData) {
    return <Navigate to="/" replace />;
  }

  const news = newsData;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="news-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={news.images?.[0] || news.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={news.title} 
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center text-sm text-news-gray-dark mb-3 gap-3">
                  <span className="inline-block bg-news-blue-light text-white px-2 py-1 rounded text-xs font-bold">
                    {news.category === 'politics' ? 'राजनीति' :
                     news.category === 'crime' ? 'अपराध' :
                     news.category === 'business' ? 'व्यापार' :
                     news.category === 'entertainment' ? 'मनोरंजन' :
                     news.category === 'sports' ? 'खेल' :
                     news.category === 'mixed' ? 'मिश्रित' : 'जीवनशैली'}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(news.publishedAt)}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    5 मिनट पढ़ें
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-news-blue-dark">
                  {news.title}
                </h1>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-news-blue-light flex items-center justify-center text-white">
                      {(news.author || 'संवाददाता').charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{news.author || 'संवाददाता'}</p>
                      <p className="text-xs text-news-gray">पत्रकार</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-news-gray hover:text-blue-600 bg-gray-100 rounded-full" aria-label="Share on Facebook">
                      <Facebook size={18} />
                    </button>
                    <button className="p-2 text-news-gray hover:text-blue-400 bg-gray-100 rounded-full" aria-label="Share on Twitter">
                      <Twitter size={18} />
                    </button>
                    <button className="p-2 text-news-gray hover:text-news-blue bg-gray-100 rounded-full" aria-label="Share">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none font-hindi" 
                  dangerouslySetInnerHTML={{ __html: news.content || news.title }}
                />
                
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
                  <button className="flex items-center text-news-gray hover:text-news-blue transition-colors">
                    <ThumbsUp size={18} className="mr-1" />
                    <span>पसंद करें</span>
                  </button>
                  <button className="flex items-center text-news-gray hover:text-news-blue transition-colors">
                    <Bookmark size={18} className="mr-1" />
                    <span>सेव करें</span>
                  </button>
                </div>
              </div>
            </article>
            
            {/* Inline Advertisement */}
            {!adsLoading && bannerAds.length > 0 && (
  <Slider {...sliderSettings}>
    {bannerAds.map((ad) => (
      <Advertisement
        key={ad._id}
        position="banner"
        imageUrl={ad.images?.[0] || "https://via.placeholder.com/1200x200/F5F5F5/333333?text=विज्ञापन+के+लिए+संपर्क+करें"}
        link={ad.link || "#"}
        altText={ad.title}
      />
    ))}
  </Slider>
)}
            
            {/* Related News */}
            <div className="mt-8">
              <h2 className="section-title">संबंधित खबरें</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {relatedNews.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Sidebar Advertisement */}
            {/* Sidebar Advertisement */}
{!adsLoading && sidebarAds.length > 0 && (
  <div className="sidebar-ads">
    {sidebarAds.map((ad) => (
      <Advertisement
        key={ad._id}
        position="sidebar"
        imageUrl={ad.images?.[0] || "https://via.placeholder.com/300x600/F5F5F5/333333?text=विज्ञापन"}
        link={ad.link || "#"}
        altText={ad.title}
      />
    ))}
  </div>
)}

            
            {/* Latest News */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">ताजा खबरें</h2>
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

export default NewsDetail;
