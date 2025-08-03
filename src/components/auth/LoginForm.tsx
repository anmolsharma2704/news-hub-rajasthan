
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useApi';

interface LoginFormProps {
  onSuccess?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // Redirect to admin dashboard
        navigate('/admin');
        
        if (onSuccess) {
          onSuccess();
        }
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">ईमेल</Label>
        <Input
          id="email"
          type="email"
          placeholder="aapka@email.com"
          {...register('email', { 
            required: 'ईमेल आवश्यक है', 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'अमान्य ईमेल पता'
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">पासवर्ड</Label>
          <a href="#" className="text-xs text-news-blue hover:underline">
            पासवर्ड भूल गए?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          {...register('password', { 
            required: 'पासवर्ड आवश्यक है',
            minLength: {
              value: 6,
              message: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'
            }
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full bg-news-blue hover:bg-news-blue-dark">
        लॉगिन
      </Button>
    </form>
  );
};

export default LoginForm;
