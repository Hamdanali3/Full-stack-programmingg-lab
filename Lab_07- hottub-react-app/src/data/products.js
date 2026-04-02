export const featuredProducts = [
  {
    id: 1,
    name: 'Serenity Pro 6-Person Hot Tub',
    category: 'Hot Tubs',
    price: 4999,
    oldPrice: 5999,
    rating: 4.5,
    reviews: 48,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Alpine Cedar 4-Person',
    category: 'Wooden Tubs',
    price: 3499,
    rating: 4.4,
    reviews: 31,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Royal Therapy 8-Person',
    category: 'Luxury Spas',
    price: 7999,
    rating: 4.8,
    reviews: 52,
    badge: 'Premium',
    image:
      'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Breeze Portable Spa',
    category: 'Inflatable',
    price: 899,
    rating: 4.2,
    reviews: 19,
    badge: 'Sale',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
];

export const catalogProducts = [
  ...featuredProducts,
  {
    id: 5,
    name: 'Cascade Deluxe 6-Person',
    category: 'Hot Tubs',
    price: 5299,
    rating: 4.6,
    reviews: 36,
    image:
      'https://images.unsplash.com/photo-1519821172141-b5d8a9865ff3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Zen Garden 4-Person',
    category: 'Wooden Tubs',
    price: 2899,
    rating: 4.3,
    reviews: 22,
    image:
      'https://images.unsplash.com/photo-1437913135140-944c1ee62782?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Oasis 2-Person Compact',
    category: 'Inflatable',
    price: 1199,
    rating: 4.1,
    reviews: 14,
    image:
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Platinum Elite 8-Person',
    category: 'Luxury Spas',
    price: 9499,
    rating: 4.9,
    reviews: 41,
    image:
      'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    name: 'Spa Cover Deluxe',
    category: 'Accessories',
    price: 299,
    rating: 4.4,
    reviews: 11,
    image:
      'https://images.unsplash.com/photo-1458929526027-052f5d6a3c5e?auto=format&fit=crop&w=900&q=80',
  },
];

export const cartItems = [
  {
    id: 1,
    name: 'Serenity Pro 6-Person Hot Tub',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
    qty: 1,
    price: 4499,
  },
  {
    id: 2,
    name: 'Premium Spa Cover',
    image:
      'https://images.unsplash.com/photo-1458929526027-052f5d6a3c5e?auto=format&fit=crop&w=400&q=80',
    qty: 1,
    price: 299,
  },
  {
    id: 3,
    name: 'Water Care Starter Kit',
    image:
      'https://images.unsplash.com/photo-1611485988301-f2cd6aa2fe5f?auto=format&fit=crop&w=400&q=80',
    qty: 1,
    price: 89,
  },
];

export const recentOrders = [
  { id: 'HTH-1234', date: 'Mar 19, 2026', status: 'Delivered', total: 4999 },
  { id: 'HTH-1189', date: 'Mar 03, 2026', status: 'Processing', total: 1299 },
  { id: 'HTH-1102', date: 'Feb 11, 2026', status: 'Delivered', total: 3499 },
];
