# News Hub Rajasthan - Frontend

A modern React-based news website for Rajasthan with admin management capabilities.

## Features

- **Public News Viewing**: Browse news by categories
- **Admin Dashboard**: Complete news management system
- **Real-time Data**: Connected to your existing backend API
- **Modern UI**: Built with shadcn/ui components
- **Responsive Design**: Works on all devices

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Your backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Configuration

The frontend is configured to connect to your backend API at `http://localhost:5000/api`. 

If your backend is running on a different URL, update the `API_BASE_URL` in `src/lib/api.ts`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── news/           # News-related components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
│   └── useApi.ts       # API integration hooks
├── lib/                # Utility libraries
│   └── api.ts          # API service functions
├── pages/              # Page components
└── App.tsx             # Main app component
```

## Backend Integration

The frontend is now fully integrated with your existing backend API:

- **News Management**: Create, edit, delete, and approve news articles
- **User Authentication**: Login/logout functionality
- **Advertisement Management**: Display and manage ads
- **User Management**: Admin user management features

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Getting Started

1. Make sure your backend server is running
2. Start the frontend development server
3. Navigate to the admin login page at `/admin/login`
4. Use your existing admin credentials to log in
5. Start managing your news content!

## Troubleshooting

- **API Connection Issues**: Check that your backend is running on the correct port
- **CORS Errors**: Ensure your backend has CORS configured for `http://localhost:5173`
- **Authentication Issues**: Verify your admin credentials in the backend database
