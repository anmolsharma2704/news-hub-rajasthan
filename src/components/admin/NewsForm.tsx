
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Image, X, UploadCloud, Save } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Form validation schema
const newsFormSchema = z.object({
  title: z.string().min(10, {
    message: "शीर्षक कम से कम 10 अक्षर का होना चाहिए",
  }),
  content: z.string().min(50, {
    message: "सामग्री कम से कम 50 अक्षर की होनी चाहिए",
  }),
  excerpt: z.string().min(20, {
    message: "सारांश कम से कम 20 अक्षर का होना चाहिए",
  }),
  category: z.string({
    required_error: "एक श्रेणी चुनें",
  }),
  featured: z.boolean().default(false),
  publishDate: z.string().optional(),
});

type NewsFormValues = z.infer<typeof newsFormSchema>;

interface NewsFormProps {
  onClose: () => void;
  onSubmit: (data: NewsFormValues) => void;
  isEditing: boolean;
  newsData?: any;
}

const NewsForm = ({ onClose, onSubmit, isEditing, newsData }: NewsFormProps) => {
  const isMobile = useIsMobile();
  
  // Default values for the form
  const defaultValues: Partial<NewsFormValues> = {
    title: newsData?.title || "",
    content: newsData?.content || "",
    excerpt: newsData?.excerpt || "",
    category: newsData?.category || "",
    featured: newsData?.featured || false,
    publishDate: newsData?.publishDate || "",
  };
  
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues,
  });
  
  const handleSubmit = (data: NewsFormValues) => {
    onSubmit(data);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={onClose}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg md:text-xl font-bold text-news-blue-dark font-hindi">
            {isEditing ? 'समाचार संपादित करें' : 'नया समाचार जोड़ें'}
          </h2>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6 md:col-span-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-hindi">शीर्षक</FormLabel>
                    <FormControl>
                      <Input placeholder="समाचार का शीर्षक यहां दर्ज करें" {...field} className="font-hindi" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-hindi">सारांश</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="समाचार का संक्षिप्त विवरण दें" 
                        className="resize-none font-hindi" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">श्रेणी</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="श्रेणी चुनें" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="राजनीति">राजनीति</SelectItem>
                          <SelectItem value="व्यापार">व्यापार</SelectItem>
                          <SelectItem value="खेल">खेल</SelectItem>
                          <SelectItem value="संस्कृति">संस्कृति</SelectItem>
                          <SelectItem value="शिक्षा">शिक्षा</SelectItem>
                          <SelectItem value="स्वास्थ्य">स्वास्थ्य</SelectItem>
                          <SelectItem value="विज्ञान">विज्ञान और तकनीक</SelectItem>
                          <SelectItem value="मनोरंजन">मनोरंजन</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-hindi">प्रकाशन तिथि (वैकल्पिक)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-4">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Image className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-hindi">मुख्य छवि अपलोड करें</p>
                    <p className="text-xs text-gray-500 font-hindi">PNG, JPG या WebP (अधिकतम 2MB)</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    ब्राउज़ करें
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-hindi">सामग्री</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="समाचार की पूरी सामग्री यहां दर्ज करें" 
                        className="resize-none font-hindi min-h-[300px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start space-x-2 space-y-0 mt-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-news-blue focus:ring-news-blue border-gray-300 rounded"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-hindi cursor-pointer">इस समाचार को मुख्य रूप से प्रदर्शित करें</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              रद्द करें
            </Button>
            <Button 
              type="submit" 
              className="bg-news-blue hover:bg-news-blue-dark"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'अपडेट करें' : 'प्रकाशित करें'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewsForm;
