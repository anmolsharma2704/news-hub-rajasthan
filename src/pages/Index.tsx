
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsCard, { NewsItem } from '@/components/news/NewsCard';
import NewsSection from '@/components/news/NewsSection';
import Advertisement from '@/components/ads/Advertisement';
import { useNews, useLatestNews, useAds } from '@/hooks/useApi';
import { Skeleton } from '@/components/ui/skeleton';
import Slider from "react-slick";

const Index = () => {
  const { data: newsData, isLoading: newsLoading, error: newsError } = useNews();
  const { data: latestNewsData, isLoading: latestLoading } = useLatestNews();
  const { data: adsData, isLoading: adsLoading } = useAds();

  // Get featured news (first approved news)
  const featuredNews = newsData?.news?.find(news => news.isFeatured) || newsData?.news?.[0];
  
  // Get latest news
  const latestNews = latestNewsData?.news || [];
  
  // Get ads
// Get ads
const bannerAds  = Array.isArray(adsData) ? adsData.slice(1, 6) : [];
const sidebarAds = Array.isArray(adsData) ? adsData.slice(1, 6) : [];


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
  



  // Group news by category
  const allNews = newsData?.news || [];
  
  // Since your data doesn't have categories, let's create some logical groupings
  const politicsNews = allNews.filter(news => 
    news.title.includes('सरकार') || news.title.includes('मंत्री') || news.title.includes('विधायक') || 
    news.title.includes('चुनाव') || news.title.includes('राजनीति')
  ) || [];
  
  const businessNews = allNews.filter(news => 
    news.title.includes('व्यापार') || news.title.includes('कंपनी') || news.title.includes('बाजार') ||
    news.title.includes('अर्थव्यवस्था') || news.title.includes('निवेश')
  ) || [];
  
  const sportsNews = allNews.filter(news => 
    news.title.includes('खेल') || news.title.includes('क्रिकेट') || news.title.includes('फुटबॉल') ||
    news.title.includes('टूर्नामेंट') || news.title.includes('मैच')
  ) || [];
  
  const entertainmentNews = allNews.filter(news => 
    news.title.includes('फिल्म') || news.title.includes('संगीत') || news.title.includes('कला') ||
    news.title.includes('मनोरंजन') || news.title.includes('फेस्टिवल')
  ) || [];
  
  const crimeNews = allNews.filter(news => 
    news.title.includes('अपराध') || news.title.includes('पुलिस') || news.title.includes('मामला') ||
    news.title.includes('गिरफ्तार') || news.title.includes('कानून')
  ) || [];
  
  // Mixed category for news that don't fit into specific categories
  const mixedNews = allNews.filter(news => {
    const title = news.title.toLowerCase();
    return !(
      title.includes('सरकार') || title.includes('मंत्री') || title.includes('विधायक') ||
      title.includes('व्यापार') || title.includes('कंपनी') || title.includes('बाजार') ||
      title.includes('खेल') || title.includes('क्रिकेट') || title.includes('फुटबॉल') ||
      title.includes('फिल्म') || title.includes('संगीत') || title.includes('कला') ||
      title.includes('अपराध') || title.includes('पुलिस') || title.includes('मामला')
    );
  }) || [];

  if (newsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="news-container py-4">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-600">Error loading news</h2>
            <p className="text-gray-500 mt-2">Please try again later</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="news-container py-4">
        {/* Featured News */}
        {newsLoading ? (
          <section className="mb-8">
            <Skeleton className="h-96 w-full" />
          </section>
        ) : featuredNews ? (
          <section className="mb-8">
            <NewsCard news={featuredNews} variant="featured" />
          </section>
        ) : null}
        
        {/* Advertisement Banner */}
       {/* Banner Ads Carousel */}
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
        
        {/* Latest News */}
        {latestLoading ? (
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </section>
        ) : (
          <NewsSection 
            title="ताजा खबरें"
            newsItems={latestNews}
            viewAllLink="/latest"
          />
        )}
        
        {/* Two Column Layout for Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {/* Politics News */}
            <NewsSection 
              title="राजनीति"
              category="politics"
              newsItems={politicsNews}
              viewAllLink="/category/politics"
            />
            
            {/* Business News */}
            <NewsSection 
              title="व्यापार"
              category="business"
              newsItems={businessNews}
              viewAllLink="/category/business"
            />
            
            {/* Entertainment News */}
            <NewsSection 
              title="मनोरंजन"
              category="entertainment"
              newsItems={entertainmentNews}
              viewAllLink="/category/entertainment"
            />
            
            {/* Sports News */}
            <NewsSection 
              title="खेल"
              category="sports"
              newsItems={sportsNews}
              viewAllLink="/category/sports"
            />
            
            {/* Crime News */}
            <NewsSection 
              title="अपराध"
              category="crime"
              newsItems={crimeNews}
              viewAllLink="/category/crime"
            />
            
            {/* Mixed News - for uncategorized news */}
            <NewsSection 
              title="मिश्रित"
              category="mixed"
              newsItems={mixedNews}
              viewAllLink="/category/mixed"
            />
          </div>
          
          <div className="space-y-8">
            {/* Sidebar Advertisement */}
            {!adsLoading && sidebarAds?.length > 0 && (
  <div className="sidebar-ads">
    {sidebarAds.map((ad, index) => (
      <Advertisement 
        key={ad._id || index}
        position="sidebar"
        imageUrl={ad.images?.[0] || "https://via.placeholder.com/300x600/F5F5F5/333333?text=विज्ञापन"}
        link={ad.link || "#"}
        altText={ad.title}
      />
    ))}
  </div>
)}
            
            {/* Trending News */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">ट्रेंडिंग</h2>
              <div className="space-y-4">
                {latestNews.slice(0, 4).map((news) => (
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

export default Index;
