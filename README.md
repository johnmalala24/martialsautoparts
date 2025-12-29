# Martial's Auto Parts

**For a ride in perfect flow**

A modern, full-featured auto parts marketplace built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🚀 Features

### Public Website
- **Home Page**: Hero section with call-to-action buttons, featured products, and category browsing
- **Shop Page**: Complete marketplace with product grid, search, and filters (category, brand)
- **Product Details**: Detailed product pages with image gallery, specifications, and compatibility info
- **About & Contact Pages**: Company information and contact forms

### Role-Based Dashboards

#### Admin Dashboard
- User management
- Product management
- Sales overview
- Inventory tracking
- Brand settings

#### Owner Dashboard
- Business overview with analytics
- Sales performance charts
- Product performance metrics
- Seller performance tracking

#### Manager Dashboard
- Inventory management
- Low-stock alerts
- Product approval workflow
- Seller assignment

#### Seller Dashboard
- Create new sales
- View sales history
- Customer inquiry management
- Receipt preview

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Context (built-in)
- **Package Manager**: npm

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Primary**: Red (#DC2626) - Automotive red for CTAs and accents
- **Neutral**: Black, Dark Gray, Medium Gray, Light Gray
- **Accent**: Success Green, Warning Yellow, Danger Red

### Typography
- Clean, bold headings for impact
- Highly readable body text
- System fonts for performance

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/shop` - Product marketplace
- `/shop/[slug]` - Product detail page
- `/about` - About us
- `/contact` - Contact page

### Dashboard Routes
- `/dashboard/admin` - Admin dashboard
- `/dashboard/owner` - Owner dashboard
- `/dashboard/manager` - Manager dashboard
- `/dashboard/seller` - Seller dashboard

## 🎯 Key Features

### Product Management
- OEM and Aftermarket parts
- Stock status tracking
- Category and brand filtering
- Product specifications
- Vehicle compatibility

### Communication
- **Call to Buy**: Direct phone call integration
- **WhatsApp**: Pre-filled WhatsApp messages for inquiries

### Mock Data
All data is currently mocked for frontend demonstration. Backend integration with Prisma and PostgreSQL will be added in future phases.

## 🔧 Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── shop/             # Shop pages
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   └── dashboard/        # Dashboard components
├── lib/
│   ├── mock-data.ts      # Mock data
│   └── formatters.ts     # Utility functions
└── types/
    └── index.ts          # TypeScript types
```

## 🎨 Component Library

### UI Components
- Button (Primary, Secondary, Outline, Danger variants)
- Card (with hover effects)
- Input (with labels and error states)
- Badge (Success, Warning, Danger, Info variants)
- StatCard (for dashboard metrics)

### Layout Components
- Navbar (responsive with mobile menu)
- Footer (with links and contact info)
- Sidebar (dashboard navigation)

### Product Components
- ProductCard (with CTA buttons)
- ProductGrid (responsive grid layout)
- ProductFilters (search and filter controls)

## 📝 Notes

- All dashboards are UI-only with mock data
- No authentication implemented yet
- No backend connection
- No payment processing
- Ready for backend integration

## 🚧 Future Enhancements

- Backend API with Prisma + PostgreSQL
- User authentication
- Real-time inventory updates
- Payment processing
- Order management
- Email notifications
- Advanced analytics

## 📄 License

Copyright © 2024 Martial's Auto Parts. All rights reserved.