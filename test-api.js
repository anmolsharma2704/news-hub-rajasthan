// Simple test script to verify API connection
// Run this in the browser console or as a Node.js script

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    // Test news endpoint
    const newsResponse = await fetch(`${API_BASE_URL}/news/all`);
    const newsData = await newsResponse.json();
    
    console.log('✅ News API working:', newsData.news?.length || 0, 'news items found');
    
    if (newsData.news && newsData.news.length > 0) {
      const firstNews = newsData.news[0];
      console.log('📰 Sample news item:', {
        id: firstNews._id,
        title: firstNews.title,
        images: firstNews.images?.length || 0,
        city: firstNews.city,
        state: firstNews.state
      });
    }
    
    // Test ads endpoint
    const adsResponse = await fetch(`${API_BASE_URL}/ads/all`);
    const adsData = await adsResponse.json();
    
    console.log('✅ Ads API working:', adsData.ads?.length || 0, 'ads found');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

// Run the test
testAPI(); 