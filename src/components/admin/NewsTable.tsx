
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for the news table
const mockNewsData = [
  { 
    id: 1, 
    title: 'उदयपुर में पर्यटन को बढ़ावा देने के लिए नई पहल', 
    category: 'व्यापार', 
    author: 'विनोद शर्मा', 
    publishedAt: 'आज, 10:30',
    status: 'published' 
  },
  { 
    id: 2, 
    title: 'जयपुर में क्रिकेट टूर्नामेंट का आयोजन', 
    category: 'खेल', 
    author: 'सुनीता राठौर', 
    publishedAt: 'आज, 09:15',
    status: 'published' 
  },
  { 
    id: 3, 
    title: 'मुख्यमंत्री ने किया नई सड़क परियोजना का उद्घाटन', 
    category: 'राजनीति', 
    author: 'संदीप जोशी', 
    publishedAt: 'कल, 15:40',
    status: 'published' 
  },
  { 
    id: 4, 
    title: 'बीकानेर उत्सव की तैयारियां जोरों पर', 
    category: 'संस्कृति', 
    author: 'अमित सिंह', 
    publishedAt: '-',
    status: 'pending' 
  },
  { 
    id: 5, 
    title: 'राजस्थान के स्कूलों में नई शिक्षा नीति लागू', 
    category: 'शिक्षा', 
    author: 'प्रिया वर्मा', 
    publishedAt: 'परसों, 11:20',
    status: 'published' 
  },
];

interface NewsTableProps {
  onEdit: (news: any) => void;
  onDelete: (newsId: number) => void;
}

const NewsTable = ({ onEdit, onDelete }: NewsTableProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>समाचारों की सूची</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] md:w-auto">शीर्षक</TableHead>
              <TableHead className="hidden sm:table-cell">श्रेणी</TableHead>
              <TableHead className="hidden md:table-cell">रिपोर्टर</TableHead>
              <TableHead className="hidden sm:table-cell">प्रकाशित</TableHead>
              <TableHead>स्थिति</TableHead>
              <TableHead className="text-right">कार्रवाई</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNewsData.map((news) => (
              <TableRow key={news.id}>
                <TableCell className="font-medium font-hindi truncate max-w-[150px] md:max-w-none">
                  {news.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{news.category}</TableCell>
                <TableCell className="hidden md:table-cell">{news.author}</TableCell>
                <TableCell className="hidden sm:table-cell">{news.publishedAt}</TableCell>
                <TableCell>
                  {news.status === 'published' ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-2xs md:text-xs font-medium bg-green-100 text-green-800">
                      प्रकाशित
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-2xs md:text-xs font-medium bg-amber-100 text-amber-800">
                      अनुमोदन के लिए
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1 md:space-x-2">
                    {isMobile ? (
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 md:h-8 px-1 md:px-2 text-2xs md:text-xs text-blue-600"
                          onClick={() => onEdit(news)}
                        >
                          <Edit size={isMobile ? 12 : 14} className="mr-1 md:mr-2" />
                          संपादित
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 md:h-8 px-1 md:px-2 text-2xs md:text-xs text-red-600"
                          onClick={() => onDelete(news.id)}
                        >
                          <Trash2 size={isMobile ? 12 : 14} className="mr-1 md:mr-2" />
                          हटाएं
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 md:h-8 px-1 md:px-2 text-2xs md:text-xs text-gray-600 hidden md:flex"
                        >
                          <Eye size={isMobile ? 12 : 14} className="mr-1 md:mr-2" />
                          देखें
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default NewsTable;
