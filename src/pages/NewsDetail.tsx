
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Share2, Facebook, Twitter, Bookmark, ThumbsUp } from 'lucide-react';
import Advertisement from '@/components/ads/Advertisement';
import NewsCard, { NewsItem } from '@/components/news/NewsCard';

// Mock data - in a real app this would come from an API
const newsData: NewsItem = {
  id: '1',
  title: 'राजस्थान के जयपुर में नई परिवहन नीति की घोषणा, यात्रियों को मिलेगी राहत',
  excerpt: 'जयपुर में राज्य सरकार ने नई परिवहन नीति की घोषणा की है, जिससे आम यात्रियों को काफी राहत मिलने की उम्मीद है।',
  content: `
    <p>जयपुर, 15 अक्टूबर 2023 - राजस्थान की राज्य सरकार ने आज जयपुर में एक नई परिवहन नीति की घोषणा की, जिसका उद्देश्य शहरी और ग्रामीण क्षेत्रों में सार्वजनिक परिवहन को अधिक सुलभ, किफायती और पर्यावरण के अनुकूल बनाना है।</p>
    
    <p>इस नई नीति के अंतर्गत, सरकार ने निम्नलिखित पहलों की घोषणा की है:</p>
    
    <ul>
      <li>शहरी क्षेत्रों में इलेक्ट्रिक बसों की संख्या में 50% की वृद्धि</li>
      <li>ग्रामीण क्षेत्रों में नई बस सेवाओं का विस्तार</li>
      <li>वरिष्ठ नागरिकों और छात्रों के लिए किराए में विशेष छूट</li>
      <li>मोबाइल एप के माध्यम से डिजिटल टिकटिंग सिस्टम</li>
      <li>सभी बस स्टैंड्स पर वाई-फाई और पीने के पानी की निःशुल्क सुविधा</li>
    </ul>
    
    <p>परिवहन मंत्री ने कहा, "हमारा लक्ष्य है कि राजस्थान में सार्वजनिक परिवहन न केवल सुविधाजनक हो, बल्कि पर्यावरण के अनुकूल भी हो। इलेक्ट्रिक बसों की संख्या बढ़ाकर हम प्रदूषण को कम करने की दिशा में एक महत्वपूर्ण कदम उठा रहे हैं।"</p>
    
    <p>इस नई परिवहन नीति से राज्य के विभिन्न जिलों में यात्रा करने वाले लाखों लोगों को लाभ होने की उम्मीद है। विशेष रूप से ग्रामीण क्षेत्रों में रहने वाले लोगों को, जहां अक्सर परिवहन की सुविधाएं सीमित होती हैं, इससे काफी राहत मिलेगी।</p>
    
    <p>सरकार ने यह भी घोषणा की है कि इस नई परिवहन नीति के कार्यान्वयन के लिए अगले वित्तीय वर्ष में 500 करोड़ रुपये का बजट आवंटित किया जाएगा।</p>
    
    <p>विपक्षी दलों ने हालांकि इस नीति पर संदेह व्यक्त किया है और कहा है कि इसके प्रभावी कार्यान्वयन के लिए और अधिक धन की आवश्यकता होगी। उन्होंने यह भी कहा है कि सरकार को पहले मौजूदा परिवहन बुनियादी ढांचे की स्थिति में सुधार करना चाहिए।</p>
    
    <p>परिवहन विभाग के एक वरिष्ठ अधिकारी ने बताया कि नई नीति की शुरुआत अगले महीने से होगी और इसे चरणबद्ध तरीके से लागू किया जाएगा।</p>
  `,
  image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3',
  category: 'politics',
  author: 'राजेश शर्मा',
  publishedAt: '2023-10-15T10:30:00Z',
  isFeatured: true
};

const relatedNews: NewsItem[] = [
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
  }
];

const NewsDetail = () => {
  const { id } = useParams();
  
  // In a real app, you'd fetch the news based on the ID
  // For now, we'll use our mock data
  const news = newsData;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hi-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="news-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
              
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center text-sm text-news-gray-dark mb-3 gap-3">
                  <span className="inline-block bg-news-blue-light text-white px-2 py-1 rounded text-xs font-bold">
                    {news.category === 'politics' ? 'राजनीति' :
                     news.category === 'crime' ? 'अपराध' :
                     news.category === 'business' ? 'व्यापार' :
                     news.category === 'entertainment' ? 'मनोरंजन' :
                     news.category === 'sports' ? 'खेल' : 'जीवनशैली'}
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
                      {news.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{news.author}</p>
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
                  dangerouslySetInnerHTML={{ __html: news.content }}
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
            <Advertisement 
              position="inline"
              imageUrl="https://via.placeholder.com/800x150/F5F5F5/333333?text=विज्ञापन"
              link="#"
              altText="Inline Advertisement"
            />
            
            {/* Related News */}
            <div className="mt-8">
              <h2 className="section-title">संबंधित खबरें</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {relatedNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Sidebar Advertisement */}
            <Advertisement 
              position="sidebar"
              imageUrl="https://via.placeholder.com/300x600/F5F5F5/333333?text=विज्ञापन"
              link="#"
              altText="Sidebar Advertisement"
            />
            
            {/* Latest News */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="section-title mb-4">ताजा खबरें</h2>
              <div className="space-y-4">
                {relatedNews.map((news) => (
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

export default NewsDetail;
