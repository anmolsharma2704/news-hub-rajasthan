import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string): string {
  if (!dateString) {
    return 'तारीख उपलब्ध नहीं';
  }
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'तारीख उपलब्ध नहीं';
    }
    
    return new Intl.DateTimeFormat('hi-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'तारीख उपलब्ध नहीं';
  }
}
