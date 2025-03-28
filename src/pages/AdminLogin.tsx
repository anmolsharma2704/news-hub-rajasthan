
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-bold">
                News<span className="text-news-saffron">Day</span>
                <span className="text-gray-700 ml-1 font-hindi">राजस्थान</span>
              </h1>
            </Link>
            <h2 className="text-xl font-bold mt-4 text-news-blue-dark font-hindi">एडमिन पैनल</h2>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center text-sm text-news-gray-dark">
            <p className="font-hindi">
              न्यूज़डे राजस्थान के एडमिन पैनल में आपका स्वागत है। कृपया लॉगिन करें।
            </p>
            <p className="mt-4">
              <Link to="/" className="text-news-blue hover:underline">
                वापस होमपेज पर जाएं
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
