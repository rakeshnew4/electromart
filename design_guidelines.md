# Design Guidelines: Resin Art E-Commerce Platform

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from Etsy's artisan marketplace aesthetic, Shopify's modern e-commerce patterns, and Airbnb's sophisticated card designs. The design should elevate the visual beauty of resin art while maintaining familiar e-commerce functionality.

## Core Design Principles
1. **Visual-First**: Let the vibrant colors and textures of resin art be the hero
2. **Clean Canvas**: Neutral backgrounds that make products pop
3. **Trust & Polish**: Professional design that inspires confidence in purchasing handmade art
4. **Seamless Shopping**: Intuitive navigation and frictionless checkout experience

## Typography System

**Primary Font**: Inter or DM Sans (Google Fonts)
- Headings: 700 weight, generous letter-spacing for product names
- Body: 400-500 weight for descriptions and UI elements
- Accent: 600 weight for CTAs and prices

**Scale**:
- Hero headline: text-5xl to text-6xl
- Product names: text-2xl to text-3xl
- Section headers: text-3xl to text-4xl
- Body text: text-base to text-lg
- UI labels: text-sm
- Price displays: text-xl to text-2xl, bold weight

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Content max-width: max-w-7xl for main containers

**Grid Systems**:
- Product grids: grid-cols-1 md:grid-cols-3 lg:grid-cols-4 with gap-6
- Featured products: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Category navigation: grid-cols-2 md:grid-cols-4 lg:grid-cols-6

## Component Library

### Navigation
- Sticky header with logo, category menu, search bar, cart icon, and account
- Category mega-menu on hover with subcategories and featured items
- Breadcrumb navigation on product and category pages
- Mobile: Hamburger menu with slide-out drawer

### Homepage Structure
1. **Hero Section**: Full-width banner (70vh) with featured collection imagery and overlay CTA
2. **Category Grid**: 6 category cards with representative product images
3. **Featured Products**: 3-column grid of bestsellers with quick-view
4. **New Arrivals**: Horizontal scrolling showcase
5. **About/Craftsmanship**: Split section with process imagery
6. **Customer Testimonials**: 3-column grid with photos and ratings
7. **Newsletter Signup**: Centered form with art background

### Product Cards
- High-quality product image with 4:3 aspect ratio
- Product name (truncated at 2 lines)
- Star rating with review count
- Price (large, prominent)
- Quick "Add to Cart" button on hover
- "New" or "Bestseller" badges positioned top-left
- Subtle shadow on hover with smooth transition

### Product Detail Page
- Left: Image gallery with main image (600x600+) and 4-6 thumbnails below
- Right: Product info panel with name, price, rating/reviews, description, customization options (if applicable), quantity selector, "Add to Cart" CTA, care instructions accordion
- Below: Tabbed interface for detailed description, specifications, reviews, and related products
- Reviews section: Sort/filter options, user photos in grid, star distribution chart

### Shopping Cart
- Slide-out drawer from right side (desktop) or full-page (mobile)
- Each item: thumbnail, name, variant details, quantity adjuster, price, remove button
- Sticky footer: subtotal, taxes estimate, "Proceed to Checkout" CTA
- Empty state: Illustration with "Browse Products" CTA

### Checkout Flow
- Multi-step progress indicator (Cart → Shipping → Payment → Confirmation)
- Left column: Form sections with clear labels and validation
- Right column: Order summary sticky sidebar
- Stripe payment element integration
- Trust badges near payment section

### Filters & Search
- Left sidebar: Category checkboxes, price range slider, rating filter, custom filters (size, style)
- Top bar: Sort dropdown (Featured, Price, Newest, Popular), view toggle (grid/list)
- Active filters displayed as removable chips
- Result count and clear all filters option

### Footer
- 4-column layout: Shop (categories), About (story, contact), Support (FAQs, shipping), Newsletter signup
- Social media icons
- Payment method icons
- Copyright and legal links

## Images

**Hero Section**: 
Full-width lifestyle image (1920x800) showing resin art in a styled home environment or artistic workspace. Include overlay with gradient for text readability. CTA buttons should have backdrop-blur background.

**Product Photography**:
- Main images: 1200x1200, white or lifestyle backgrounds
- Gallery images: Multiple angles, detail shots, scale references
- Category headers: 800x400 representative product collages

**Category Cards**: 
400x400 images representing each category (wall art, coasters, jewelry, trays, home decor)

**Testimonial Section**:
Customer photos with their purchased resin art pieces in their homes (300x300)

**About/Process Section**:
Behind-the-scenes images of resin art creation process

## Interaction Patterns

- Smooth scroll behavior throughout
- Fade-in animations for products on scroll (subtle, performant)
- Image zoom on hover for product cards
- Gallery lightbox with arrow navigation
- Quantity adjusters with haptic-style button feedback
- Toast notifications for cart actions
- Loading states for async operations (skeleton screens)

## Accessibility Standards

- Semantic HTML structure throughout
- ARIA labels for interactive elements
- Focus indicators on all interactive elements
- Alt text for all product images
- Keyboard navigation support
- Color contrast meeting WCAG AA standards
- Form validation with clear error messaging

This design creates a premium, gallery-like experience that showcases resin art while providing familiar, trusted e-commerce patterns for seamless shopping.