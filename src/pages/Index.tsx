
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsCard, { NewsItem } from '@/components/news/NewsCard';
import NewsSection from '@/components/news/NewsSection';
import Advertisement from '@/components/ads/Advertisement';

// Mock data - would be fetched from an API in a real application
const featuredNews: NewsItem = {
  id: '1',
  title: 'राजस्थान के जयपुर में नई परिवहन नीति की घोषणा, यात्रियों को मिलेगी राहत',
  excerpt: 'जयपुर में राज्य सरकार ने नई परिवहन नीति की घोषणा की है, जिससे आम यात्रियों को काफी राहत मिलने की उम्मीद है। इस नीति के तहत, सार्वजनिक परिवहन को और अधिक सुलभ बनाने के साथ-साथ...',
  content: 'जयपुर में राज्य सरकार ने नई परिवहन नीति की घोषणा की है, जिससे आम यात्रियों को काफी राहत मिलने की उम्मीद है। इस नीति के तहत, सार्वजनिक परिवहन को और अधिक सुलभ बनाने के साथ-साथ...',
  image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3',
  category: 'politics',
  author: 'राजेश शर्मा',
  publishedAt: '2023-10-15T10:30:00Z',
  isFeatured: true
};

const latestNews: NewsItem[] = [
  {
    id: '2',
    title: 'कोटा में छात्रों के लिए नई शिक्षा योजना शुरू, मिलेगी विशेष सुविधाएं',
    excerpt: 'कोटा में छात्रों के लिए एक नई शिक्षा योजना की शुरुआत की गई है, जिसके तहत उन्हें कई विशेष सुविधाएं प्रदान की जाएंगी...',
    content: 'कोटा में छात्रों के लिए एक नई शिक्षा योजना की शुरुआत की गई है, जिसके तहत उन्हें कई विशेष सुविधाएं प्रदान की जाएंगी...',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3',
    category: 'politics',
    author: 'प्रिया गुप्ता',
    publishedAt: '2023-10-14T14:20:00Z'
  },
  {
    id: '3',
    title: 'जोधपुर में नए स्टार्टअप हब का उद्घाटन, युवाओं को मिलेगा रोजगार',
    excerpt: 'जोधपुर में एक नए स्टार्टअप हब का उद्घाटन किया गया है, जिससे स्थानीय युवाओं को रोजगार के नए अवसर मिलने की उम्मीद है...',
    content: 'जोधपुर में एक नए स्टार्टअप हब का उद्घाटन किया गया है, जिससे स्थानीय युवाओं को रोजगार के नए अवसर मिलने की उम्मीद है...',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3',
    category: 'business',
    author: 'अमित सिंह',
    publishedAt: '2023-10-14T09:15:00Z'
  },
  {
    id: '4',
    title: 'उदयपुर में पर्यटन को बढ़ावा देने के लिए नई पहल, होटल उद्योग में उछाल की उम्मीद',
    excerpt: 'उदयपुर में पर्यटन को बढ़ावा देने के लिए राज्य सरकार ने कई नई पहल की घोषणा की है, जिससे होटल उद्योग में उछाल आने की उम्मीद है...',
    content: 'उदयपुर में पर्यटन को बढ़ावा देने के लिए राज्य सरकार ने कई नई पहल की घोषणा की है, जिससे होटल उद्योग में उछाल आने की उम्मीद है...',
    image: 'https://images.unsplash.com/photo-1565018054866-968e93a2cceb?ixlib=rb-4.0.3',
    category: 'business',
    author: 'सुनीता राठौर',
    publishedAt: '2023-10-13T16:45:00Z'
  },
  {
    id: '5',
    title: 'जयपुर में क्रिकेट टूर्नामेंट का आयोजन, स्थानीय खिलाड़ियों को मिलेगा मौका',
    excerpt: 'जयपुर में एक बड़े क्रिकेट टूर्नामेंट का आयोजन किया जा रहा है, जिसमें स्थानीय खिलाड़ियों को अपनी प्रतिभा दिखाने का मौका मिलेगा...',
    content: 'जयपुर में एक बड़े क्रिकेट टूर्नामेंट का आयोजन किया जा रहा है, जिसमें स्थानीय खिलाड़ियों को अपनी प्रतिभा दिखाने का मौका मिलेगा...',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3',
    category: 'sports',
    author: 'विकास शर्मा',
    publishedAt: '2023-10-13T12:30:00Z'
  },
  {
    id: '6',
    title: 'जोधपुर के प्रसिद्ध त्योहार की तैयारियां शुरू, पर्यटकों का आकर्षण बढ़ेगा',
    excerpt: 'जोधपुर के प्रसिद्ध त्योहार की तैयारियां शुरू हो गई हैं, जिससे इस साल पर्यटकों का आकर्षण और भी बढ़ने की उम्मीद है...',
    content: 'जोधपुर के प्रसिद्ध त्योहार की तैयारियां शुरू हो गई हैं, जिससे इस साल पर्यटकों का आकर्षण और भी बढ़ने की उम्मीद है...',
    image: 'https://images.unsplash.com/photo-1540247110674-31e928ee852a?ixlib=rb-4.0.3',
    category: 'lifestyle',
    author: 'मेघा अग्रवाल',
    publishedAt: '2023-10-12T10:00:00Z'
  }
];

const politicsNews: NewsItem[] = [
  {
    id: '7',
    title: 'राजस्थान विधानसभा में नया विधेयक पेश, विपक्ष ने किया विरोध',
    excerpt: 'राजस्थान विधानसभा में एक नया विधेयक पेश किया गया है, जिसे लेकर विपक्ष ने कड़ा विरोध दर्ज कराया है...',
    content: 'राजस्थान विधानसभा में एक नया विधेयक पेश किया गया है, जिसे लेकर विपक्ष ने कड़ा विरोध दर्ज कराया है...',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3',
    category: 'politics',
    author: 'अनिल पाटिल',
    publishedAt: '2023-10-11T11:20:00Z'
  },
  {
    id: '8',
    title: 'मुख्यमंत्री ने किया नई सड़क परियोजना का उद्घाटन, कई जिलों को मिलेगा लाभ',
    excerpt: 'राजस्थान के मुख्यमंत्री ने एक नई सड़क परियोजना का उद्घाटन किया है, जिससे कई जिलों को सीधा लाभ मिलेगा...',
    content: 'राजस्थान के मुख्यमंत्री ने एक नई सड़क परियोजना का उद्घाटन किया है, जिससे कई जिलों को सीधा लाभ मिलेगा...',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3',
    category: 'politics',
    author: 'संदीप जोशी',
    publishedAt: '2023-10-10T09:45:00Z'
  },
  {
    id: '9',
    title: 'स्थानीय निकाय चुनावों की तैयारी शुरू, पार्टियों ने बनाई रणनीति',
    excerpt: 'राजस्थान में स्थानीय निकाय चुनावों की तैयारियां शुरू हो गई हैं, और सभी राजनीतिक पार्टियों ने अपनी-अपनी रणनीति बनानी शुरू कर दी है...',
    content: 'राजस्थान में स्थानीय निकाय चुनावों की तैयारियां शुरू हो गई हैं, और सभी राजनीतिक पार्टियों ने अपनी-अपनी रणनीति बनानी शुरू कर दी है...',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3',
    category: 'politics',
    author: 'निखिल त्रिपाठी',
    publishedAt: '2023-10-09T14:15:00Z'
  },
  {
    id: '10',
    title: 'जल संरक्षण पर सरकार की नई योजना, ग्रामीण क्षेत्रों पर फोकस',
    excerpt: 'राजस्थान सरकार ने जल संरक्षण पर एक नई योजना की घोषणा की है, जिसमें विशेष रूप से ग्रामीण क्षेत्रों पर ध्यान केंद्रित किया गया है...',
    content: 'राजस्थान सरकार ने जल संरक्षण पर एक नई योजना की घोषणा की है, जिसमें विशेष रूप से ग्रामीण क्षेत्रों पर ध्यान केंद्रित किया गया है...',
    image: 'https://images.unsplash.com/photo-1612965607446-25e1332775ae?ixlib=rb-4.0.3',
    category: 'politics',
    author: 'राहुल मिश्रा',
    publishedAt: '2023-10-08T10:30:00Z'
  }
];

const entertainmentNews: NewsItem[] = [
  {
    id: '11',
    title: 'जयपुर में आयोजित होने वाला फिल्म फेस्टिवल, कई बड़े सितारे होंगे शामिल',
    excerpt: 'जयपुर में आयोजित होने वाले फिल्म फेस्टिवल में इस साल कई बड़े बॉलीवुड सितारे शामिल होंगे...',
    content: 'जयपुर में आयोजित होने वाले फिल्म फेस्टिवल में इस साल कई बड़े बॉलीवुड सितारे शामिल होंगे...',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3',
    category: 'entertainment',
    author: 'मोनिका सिंह',
    publishedAt: '2023-10-07T15:40:00Z'
  },
  {
    id: '12',
    title: 'राजस्थानी संगीत को मिल रही है अंतरराष्ट्रीय पहचान, बढ़ रही है लोकप्रियता',
    excerpt: 'राजस्थानी लोक संगीत को अंतरराष्ट्रीय स्तर पर पहचान मिल रही है, और दुनिया भर में इसकी लोकप्रियता बढ़ रही है...',
    content: 'राजस्थानी लोक संगीत को अंतरराष्ट्रीय स्तर पर पहचान मिल रही है, और दुनिया भर में इसकी लोकप्रियता बढ़ रही है...',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3',
    category: 'entertainment',
    author: 'अनुष्का जैन',
    publishedAt: '2023-10-06T12:10:00Z'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="news-container py-4">
        {/* Featured News */}
        <section className="mb-8">
          <NewsCard news={featuredNews} variant="featured" />
        </section>
        
        {/* Advertisement Banner */}
        <Advertisement 
          position="banner"
          imageUrl="https://via.placeholder.com/1200x200/F5F5F5/333333?text=विज्ञापन+के+लिए+संपर्क+करें"
          link="#"
          altText="Advertisement Banner"
        />
        
        {/* Latest News */}
        <NewsSection 
          title="ताजा खबरें"
          newsItems={latestNews}
          viewAllLink="/latest"
        />
        
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
            
            {/* Entertainment News */}
            <NewsSection 
              title="मनोरंजन"
              category="entertainment"
              newsItems={entertainmentNews}
              viewAllLink="/category/entertainment"
            />
          </div>
          
          <div className="space-y-8">
            {/* Sidebar Advertisement */}
            <Advertisement 
              position="sidebar"
              imageUrl="https://via.placeholder.com/300x600/F5F5F5/333333?text=विज्ञापन"
              link="#"
              altText="Sidebar Advertisement"
            />
            
            {/* Trending News */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">ट्रेंडिंग</h2>
              <div className="space-y-4">
                {latestNews.slice(0, 4).map((news, index) => (
                  <NewsCard key={news.id} news={news} variant="small" />
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
