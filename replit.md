# ResinArt E-Commerce Platform

## Overview
A full-featured Amazon-style e-commerce platform specifically designed for selling handcrafted resin art products. Built with React, Express, and Stripe for secure payment processing.

## Project Purpose
Enable users to browse, search, and purchase beautiful handcrafted resin art pieces including wall art, coasters, jewelry, trays, and home decor items with a seamless shopping experience.

## Current State
**Phase 1 Complete**: All frontend components, schemas, and UI implemented
- Data schemas defined in `shared/schema.ts` for products, orders, and cart
- Complete React component library with Header, CategoryNav, ProductCard, CartDrawer
- All pages implemented: Home, ProductDetail, Checkout (with Stripe), OrderConfirmation
- Beautiful, responsive design following design guidelines
- Shopping cart with local storage persistence
- Product filtering by category and search

**Next Phase**: Backend API implementation and integration

## Key Features
- Product catalog with grid display, ratings, and reviews
- Category-based navigation (Wall Art, Coasters, Jewelry, Trays, Home Decor)
- Search functionality across product names and descriptions
- Product detail pages with full descriptions, materials, dimensions
- Shopping cart with quantity management
- Secure Stripe checkout integration
- Order confirmation with tracking
- Responsive design for mobile and desktop
- Beautiful hero section and featured products

## Architecture
### Frontend (React + TypeScript)
- **Pages**: Home, ProductDetail, Checkout, OrderConfirmation
- **Components**: Header, CategoryNav, ProductCard, CartDrawer
- **State Management**: React Query for server state, localStorage for cart
- **Styling**: Tailwind CSS + Shadcn UI components
- **Payment**: Stripe Elements integration

### Backend (Express + TypeScript)
- **Storage**: In-memory storage for products, orders
- **API Routes**: Products CRUD, payment intent creation, order management
- **Payment Processing**: Stripe API integration

### Data Models
- **Product**: id, name, description, price, category, imageUrl, rating, reviewCount, inStock, colors, dimensions, materials
- **Order**: id, customerInfo, shippingAddress, totalAmount, status, createdAt
- **OrderItem**: id, orderId, productId, productName, productPrice, quantity
- **CartItem** (client-side): productId, name, price, imageUrl, quantity

## Technology Stack
- React 18 with TypeScript
- Express.js backend
- Stripe for payments
- Tailwind CSS + Shadcn UI
- React Query for data fetching
- Wouter for routing
- In-memory storage (MemStorage)

## Product Images
Generated product images stored in `attached_assets/generated_images/`:
- Ocean wave wall art
- Purple gold coasters
- Pink resin jewelry
- Emerald green serving tray
- Sunset wall clock
- Pastel drop earrings
- Teal geode art
- Coral trinket dish
- Navy copper abstract art
- Crafting process hero image

## Environment Variables
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key (frontend)
- `STRIPE_SECRET_KEY`: Stripe secret key (backend)

## Recent Changes
- 2025-01-05: Initial project setup with complete frontend implementation
- Generated 10 product images for resin art items
- Implemented all UI components and pages
- Set up Stripe integration for checkout
