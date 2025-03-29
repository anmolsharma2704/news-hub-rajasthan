
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { BarChart, Calendar, Users, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-news-blue-dark transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar />
      </div>
      
      <div className="flex-1 flex flex-col md:ml-64">
        <AdminTopbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-news-blue-dark font-hindi">डैशबोर्ड</h1>
            <p className="text-sm md:text-base text-news-gray-dark">आपके न्यूज़डे राजस्थान पोर्टल का ओवरव्यू</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-news-gray-dark">कुल समाचार</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg md:text-2xl font-bold">452</p>
                    <p className="text-2xs md:text-xs text-green-500">+12% इस सप्ताह</p>
                  </div>
                  <div className="p-1.5 md:p-2 bg-blue-100 rounded-full text-news-blue">
                    <FileText size={isMobile ? 16 : 20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-news-gray-dark">कुल पाठक</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg md:text-2xl font-bold">24,521</p>
                    <p className="text-2xs md:text-xs text-green-500">+18% इस महीने</p>
                  </div>
                  <div className="p-1.5 md:p-2 bg-green-100 rounded-full text-green-600">
                    <Users size={isMobile ? 16 : 20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-news-gray-dark">कुल रिपोर्टर्स</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg md:text-2xl font-bold">38</p>
                    <p className="text-2xs md:text-xs text-green-500">+3 नए इस महीने</p>
                  </div>
                  <div className="p-1.5 md:p-2 bg-purple-100 rounded-full text-purple-600">
                    <Users size={isMobile ? 16 : 20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-news-gray-dark">आज के पाठक</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg md:text-2xl font-bold">1,234</p>
                    <p className="text-2xs md:text-xs text-green-500">+25% कल से</p>
                  </div>
                  <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-600">
                    <TrendingUp size={isMobile ? 16 : 20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Traffic Overview */}
            <Card className="lg:col-span-2">
              <CardHeader className="space-y-0 pb-2 md:pb-4">
                <CardTitle className="text-sm md:text-base font-hindi">पाठक ट्रैफिक</CardTitle>
                <CardDescription className="text-xs md:text-sm">पिछले 30 दिनों के दौरान वेबसाइट पर आने वाले पाठकों की संख्या</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 md:h-80 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
                  <BarChart size={isMobile ? 24 : 32} className="text-news-gray" />
                  <p className="ml-2 text-xs md:text-sm text-news-gray-dark">ट्रैफिक चार्ट यहां होगा</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="h-auto">
              <CardHeader className="space-y-0 pb-2 md:pb-3">
                <CardTitle className="text-sm md:text-base font-hindi">हाल की गतिविधियां</CardTitle>
                <CardDescription className="text-xs md:text-sm">आपके पोर्टल की नवीनतम गतिविधियां</CardDescription>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="p-1.5 md:p-2 bg-blue-100 rounded-full text-news-blue shrink-0">
                      <FileText size={isMobile ? 12 : 16} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">नया समाचार प्रकाशित</p>
                      <p className="text-2xs md:text-xs text-news-gray-dark">विनोद ने "उदयपुर में पर्यटन को बढ़ावा" समाचार प्रकाशित किया</p>
                      <p className="text-2xs md:text-xs text-news-gray">30 मिनट पहले</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="p-1.5 md:p-2 bg-green-100 rounded-full text-green-600 shrink-0">
                      <Users size={isMobile ? 12 : 16} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">नए रिपोर्टर को मंजूरी दी गई</p>
                      <p className="text-2xs md:text-xs text-news-gray-dark">आपने "मोहन शर्मा" के खाते को मंजूरी दी</p>
                      <p className="text-2xs md:text-xs text-news-gray">2 घंटे पहले</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="p-1.5 md:p-2 bg-amber-100 rounded-full text-amber-600 shrink-0">
                      <AlertTriangle size={isMobile ? 12 : 16} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">समाचार संपादित</p>
                      <p className="text-2xs md:text-xs text-news-gray-dark">सुनीता ने "जयपुर में क्रिकेट टूर्नामेंट" समाचार को संपादित किया</p>
                      <p className="text-2xs md:text-xs text-news-gray">3 घंटे पहले</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="p-1.5 md:p-2 bg-purple-100 rounded-full text-purple-600 shrink-0">
                      <Calendar size={isMobile ? 12 : 16} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">अनुमोदन के लिए समाचार</p>
                      <p className="text-2xs md:text-xs text-news-gray-dark">अमित ने "बीकानेर उत्सव की तैयारियां" समाचार जमा किया</p>
                      <p className="text-2xs md:text-xs text-news-gray">5 घंटे पहले</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full mt-3 md:mt-4 text-news-blue border-news-blue hover:bg-news-blue hover:text-white text-xs md:text-sm">
                  और गतिविधियां देखें
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent News */}
          <Card className="mt-4 md:mt-6 overflow-hidden">
            <CardHeader className="space-y-0 pb-2 md:pb-4">
              <CardTitle className="text-sm md:text-base font-hindi">हाल ही में प्रकाशित खबरें</CardTitle>
              <CardDescription className="text-xs md:text-sm">आपके पोर्टल पर प्रकाशित नवीनतम खबरें</CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">शीर्षक</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden sm:table-cell">श्रेणी</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider hidden md:table-cell">रिपोर्टर</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">प्रकाशित</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">स्थिति</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 text-left text-2xs md:text-xs font-medium text-news-gray-dark uppercase tracking-wider">कार्रवाई</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm font-hindi truncate max-w-[120px] md:max-w-none">उदयपुर में पर्यटन को बढ़ावा देने के लिए नई पहल</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">व्यापार</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">विनोद शर्मा</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">आज, 10:30</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <span className="bg-green-100 text-green-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">प्रकाशित</span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1 md:space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-news-blue">संपादित</Button>
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-red-600">हटाएं</Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm font-hindi truncate max-w-[120px] md:max-w-none">जयपुर में क्रिकेट टूर्नामेंट का आयोजन</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">खेल</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">सुनीता राठौर</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">आज, 09:15</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <span className="bg-green-100 text-green-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">प्रकाशित</span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1 md:space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-news-blue">संपादित</Button>
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-red-600">हटाएं</Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm font-hindi truncate max-w-[120px] md:max-w-none">मुख्यमंत्री ने किया नई सड़क परियोजना का उद्घाटन</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">राजनीति</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">संदीप जोशी</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">कल, 15:40</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <span className="bg-green-100 text-green-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">प्रकाशित</span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1 md:space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-news-blue">संपादित</Button>
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-red-600">हटाएं</Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm font-hindi truncate max-w-[120px] md:max-w-none">बीकानेर उत्सव की तैयारियां जोरों पर</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden sm:table-cell">संस्कृति</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm hidden md:table-cell">अमित सिंह</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-2xs md:text-sm">-</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <span className="bg-amber-100 text-amber-800 text-2xs md:text-xs font-medium px-1 md:px-2 py-0.5 md:py-1 rounded">अनुमोदन के लिए</span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex space-x-1 md:space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-green-600">मंजूर</Button>
                          <Button variant="ghost" size="sm" className="h-6 md:h-8 px-1 md:px-2 text-2xs md:text-sm text-red-600">अस्वीकृत</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3">
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="w-full text-news-blue border-news-blue hover:bg-news-blue hover:text-white text-xs md:text-sm">
                  सभी समाचार देखें
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <footer className="py-3 md:py-4 px-4 md:px-6 bg-white border-t border-gray-200 text-center text-news-gray-dark text-xs md:text-sm">
          <p>© 2023 News Day Rajasthan. सर्वाधिकार सुरक्षित.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
