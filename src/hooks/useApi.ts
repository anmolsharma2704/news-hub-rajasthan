import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, NewsItem, Advertisement, User, LoginCredentials } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// News hooks
export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => apiService.getAllNews(),
  });
};

export const useLatestNews = () => {
  return useQuery({
    queryKey: ['latest-news'],
    queryFn: () => apiService.getLatestNews(),
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => apiService.getNewsById(id),
    enabled: !!id,
  });
};

export const useNewsBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['news', 'slug', slug],
    queryFn: () => apiService.getNewsBySlug(slug),
    enabled: !!slug,
  });
};

export const useNewsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['news', 'category', category],
    queryFn: () => apiService.getNewsByCategory(category),
    enabled: !!category,
  });
};

export const usePendingNews = () => {
  return useQuery({
    queryKey: ['pending-news'],
    queryFn: () => apiService.getPendingNews(),
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (newsData: Partial<NewsItem>) => apiService.createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['pending-news'] });
      toast({
        title: 'Success',
        description: 'News created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create news',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, newsData }: { id: string; newsData: Partial<NewsItem> }) =>
      apiService.updateNews(id, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['pending-news'] });
      toast({
        title: 'Success',
        description: 'News updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update news',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['pending-news'] });
      toast({
        title: 'Success',
        description: 'News deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete news',
        variant: 'destructive',
      });
    },
  });
};

export const useApproveNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.approveNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['pending-news'] });
      toast({
        title: 'Success',
        description: 'News approved successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to approve news',
        variant: 'destructive',
      });
    },
  });
};

// Advertisement hooks
export const useAds = () => {
  return useQuery({
    queryKey: ['ads'],
    queryFn: () => apiService.getAllAds(),
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (adData: Partial<Advertisement>) => apiService.createAd(adData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: 'Success',
        description: 'Advertisement created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create advertisement',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, adData }: { id: string; adData: Partial<Advertisement> }) =>
      apiService.updateAd(id, adData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: 'Success',
        description: 'Advertisement updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update advertisement',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteAd = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteAd(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: 'Success',
        description: 'Advertisement deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete advertisement',
        variant: 'destructive',
      });
    },
  });
};

// Auth hooks
export const useLogin = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => apiService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast({
        title: 'Success',
        description: 'Login successful',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Login failed',
        variant: 'destructive',
      });
    },
  });
};

export const useRegister = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userData: { name: string; email: string; password: string; role?: string }) =>
      apiService.register(userData),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast({
        title: 'Success',
        description: 'Registration successful',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Registration failed',
        variant: 'destructive',
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => apiService.getCurrentUser(),
    enabled: !!localStorage.getItem('token'),
  });
};

// User management hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiService.getAllUsers(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<User> }) =>
      apiService.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    },
  });
}; 