
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Globe, Image, Settings, ArrowRight, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

interface WebSettingsFormProps {
  onSave: (data: any) => void;
}

const WebSettingsForm: React.FC<WebSettingsFormProps> = ({ onSave }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      siteTitle: 'न्यूज़ हब राजस्थान',
      siteName: 'न्यूज़ हब राजस्थान',
      siteDescription: 'राजस्थान का अपना न्यूज़ पोर्टल',
      siteKeywords: 'न्यूज़, राजस्थान, समाचार, हिंदी न्यूज़',
      siteEmail: 'contact@newshubrajasthan.com',
      sitePhone: '+91 9876543210',
      siteAddress: 'जयपुर, राजस्थान',
      socialFacebook: 'https://facebook.com/newshubrajasthan',
      socialTwitter: 'https://twitter.com/newshubrajasthan',
      socialInstagram: 'https://instagram.com/newshubrajasthan',
      socialYoutube: 'https://youtube.com/newshubrajasthan',
      logo: '',
      favicon: '',
    }
  });
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFaviconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: any) => {
    // Add the image previews to the data
    const submitData = {
      ...data,
      logoPreview,
      faviconPreview
    };
    onSave(submitData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-hindi text-lg md:text-xl">वेबसाइट सेटिंग्स अपडेट करें</CardTitle>
        <CardDescription>
          अपनी वेबसाइट के प्रमुख विवरण और सेटिंग्स यहां अपडेट करें
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general">
              <TabsList className="mb-4 w-full md:w-auto overflow-x-auto flex whitespace-nowrap">
                <TabsTrigger value="general" className="flex items-center">
                  <Globe size={16} className="mr-2" />
                  <span>सामान्य</span>
                </TabsTrigger>
                <TabsTrigger value="branding" className="flex items-center">
                  <Image size={16} className="mr-2" />
                  <span>ब्रांडिंग</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center">
                  <Settings size={16} className="mr-2" />
                  <span>सोशल मीडिया</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <FormField
                  control={form.control}
                  name="siteTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">वेबसाइट शीर्षक</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        वेबसाइट का शीर्षक जो ब्राउज़र टैब में दिखाई देगा
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">वेबसाइट का नाम</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="siteDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">वेबसाइट विवरण</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormDescription>
                        सर्च इंजन के लिए मेटा विवरण
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="siteKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">कीवर्ड्स</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        अल्पविराम से अलग किए गए कीवर्ड
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="siteEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">संपर्क ईमेल</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sitePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">संपर्क फोन</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="siteAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">पता</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="branding" className="space-y-4">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">लोगो</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input 
                            id="logo" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              handleLogoChange(e);
                              onChange(e);
                            }}
                            {...rest}
                          />
                          {logoPreview && (
                            <div className="mt-2">
                              <p className="text-sm mb-1 text-gray-500">प्रीव्यू:</p>
                              <div className="bg-gray-100 p-4 rounded-md inline-block">
                                <img 
                                  src={logoPreview} 
                                  alt="Logo Preview" 
                                  className="max-h-20 max-w-full" 
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        लोगो आकार: 200x50 पिक्सल, PNG या SVG (पारदर्शी पृष्ठभूमि के साथ)
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="favicon"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">फेविकॉन</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input 
                            id="favicon" 
                            type="file" 
                            accept="image/x-icon,image/png" 
                            onChange={(e) => {
                              handleFaviconChange(e);
                              onChange(e);
                            }}
                            {...rest}
                          />
                          {faviconPreview && (
                            <div className="mt-2">
                              <p className="text-sm mb-1 text-gray-500">प्रीव्यू:</p>
                              <div className="bg-gray-100 p-4 rounded-md inline-block">
                                <img 
                                  src={faviconPreview} 
                                  alt="Favicon Preview" 
                                  className="max-h-16 max-w-16" 
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        फेविकॉन आकार: 32x32 पिक्सल, ICO या PNG
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4">
                <FormField
                  control={form.control}
                  name="socialFacebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">फेसबुक पेज URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialTwitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">ट्विटर/एक्स प्रोफाइल URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialInstagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">इंस्टाग्राम प्रोफाइल URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialYoutube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">यूट्यूब चैनल URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="pt-2">
              <Button type="submit" className="w-full md:w-auto bg-news-blue hover:bg-news-blue-dark">
                सेटिंग्स सहेजें <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WebSettingsForm;
