import React from 'react';
import { Product, Category, IncludedItem } from './types';

const AnniversaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const BirthdayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454V5.118a2.704 2.704 0 011.5-.454c.523 0 1.046.151 1.5.454a2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0c.454-.303.977-.454 1.5-.454v10.428zM5 21h14a2 2 0 002-2v-8.546" /></svg>;
const DecorationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M5 3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" /></svg>;
const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CateringIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16-4l-3-6H6L3 11m18 0h-5.04M4 11H3m1-4h16" /></svg>;
const EntertainmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-12v13c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>;
const VenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;


export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: <GiftIcon/> },
  { id: 'anniversary', name: 'Anniversary', icon: <AnniversaryIcon /> },
  { id: 'birthday', name: 'Birthday', icon: <BirthdayIcon /> },
  { id: 'decorations', name: 'Decorations', icon: <DecorationIcon /> },
  { id: 'gifts', name: 'Gifts', icon: <GiftIcon /> },
  { id: 'photography', name: 'Photography', icon: <CameraIcon /> },
  { id: 'videography', name: 'Videography', icon: <VideoIcon /> },
  { id: 'catering', name: 'Catering', icon: <CateringIcon /> },
  { id: 'entertainment', name: 'Entertainment', icon: <EntertainmentIcon /> },
  { id: 'venues', name: 'Venues', icon: <VenueIcon /> },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Romantic Anniversary Decor',
    category: 'anniversary',
    price: 2999,
    rating: 4.8,
    reviews: 154,
    imageUrl: 'https://picsum.photos/seed/anniversary1/400/400',
    description: 'Create an unforgettable romantic atmosphere with this beautiful decoration set, perfect for anniversaries and special moments.',
    serviceType: 'package',
    details: [
      { name: 'Red Metallic Balloons', quantity: 100, isQuantityCustomizable: true, costPerUnit: 15 },
      { name: 'Fairy Lights', quantity: 2, isQuantityCustomizable: false },
      { name: 'Happy Anniversary Foil Banner', quantity: 1, isQuantityCustomizable: false },
      { name: 'Rose Petals for walkway (1 pack)', quantity: 1, isQuantityCustomizable: true, costPerUnit: 200 },
    ]
  },
  {
    id: 2,
    name: 'Golden Birthday Surprise',
    category: 'birthday',
    price: 3499,
    rating: 4.9,
    reviews: 212,
    imageUrl: 'https://picsum.photos/seed/birthday1/400/400',
    description: 'Celebrate in style with a stunning golden and black themed birthday decoration setup. Includes a customizable name banner.',
    serviceType: 'package',
    details: [
      { name: 'Golden & Black Balloons', quantity: 100, isQuantityCustomizable: true, costPerUnit: 10 },
      { name: 'Happy Birthday Foil Banner', quantity: 1, isQuantityCustomizable: false },
      { name: 'Customizable Name Foil Letters', quantity: 1, isQuantityCustomizable: false },
      { name: 'Star-shaped Foil Balloons', quantity: 2, isQuantityCustomizable: true, costPerUnit: 150 },
    ],
    customizationOptions: [
      {
        id: 'balloonColor1',
        name: 'Primary Balloon Color (50 pcs)',
        type: 'select',
        choices: [
          { name: 'Golden', cost: 50 },
          { name: 'Black', cost: 0 },
          { name: 'Silver', cost: 50 },
          { name: 'White', cost: 0 },
        ]
      },
      {
        id: 'balloonColor2',
        name: 'Secondary Balloon Color (50 pcs)',
        type: 'select',
        choices: [
          { name: 'Black', cost: 0 },
          { name: 'Golden', cost: 50 },
          { name: 'Silver', cost: 50 },
          { name: 'White', cost: 0 },
        ]
      },
      {
        id: 'bannerText',
        name: 'Foil Banner Text',
        type: 'select',
        choices: [
          { name: 'Happy Birthday', cost: 0 },
          { name: 'Happy Anniversary', cost: 50 },
          { name: 'Congratulations', cost: 50 },
        ]
      },
      {
        id: 'customName',
        name: 'Custom Name (Foil Letters)',
        type: 'text',
        placeholder: 'e.g., ALEX',
        maxLength: 15,
        costPerCharacter: 25 // 25 per letter
      },
      {
        id: 'foilShape',
        name: 'Shape of Foil Balloons (x2)',
        type: 'select',
        choices: [
          { name: 'Star', cost: 0 },
          { name: 'Heart', cost: 100 },
          { name: 'Circle', cost: 0 },
        ]
      },
      {
        id: 'foilColor',
        name: 'Color of Foil Balloons',
        type: 'select',
        choices: [
          { name: 'Golden', cost: 0 },
          { name: 'Silver', cost: 0 },
          { name: 'Red', cost: 50 },
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'The Ultimate Gift Hamper',
    category: 'gifts',
    price: 4500,
    rating: 4.7,
    reviews: 88,
    imageUrl: 'https://picsum.photos/seed/gift1/400/400',
    description: 'A curated hamper filled with premium chocolates, a personalized mug, a photo frame, and a scented candle.',
    serviceType: 'package',
    details: [
      { name: 'Gourmet Chocolate Box', quantity: 1, isQuantityCustomizable: false },
      { name: 'Personalized Mug', quantity: 1, isQuantityCustomizable: false },
      { name: 'Photo Frame 4x6 inch', quantity: 1, isQuantityCustomizable: false },
      { name: 'Aromatic Scented Candle', quantity: 1, isQuantityCustomizable: true, costPerUnit: 400 },
      { name: 'Luxury Gift Box', quantity: 1, isQuantityCustomizable: false },
    ],
    customizationOptions: [
      {
        id: 'mugDesign',
        name: 'Mug Design',
        type: 'select',
        choices: [
          { name: 'Best Mom Ever', cost: 0 },
          { name: 'Happy Birthday!', cost: 0 },
          { name: 'I Love You', cost: 50 },
          { name: 'World\'s Best Dad', cost: 0 },
          { name: 'Custom Photo', cost: 150 },
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Canopy Dream Date Setup',
    category: 'decorations',
    price: 5999,
    rating: 5.0,
    reviews: 45,
    imageUrl: 'https://picsum.photos/seed/decor1/400/400',
    description: 'A magical canopy setup with fairy lights and comfortable cushions, perfect for a romantic indoor date night.',
    serviceType: 'package',
    details: [
      { name: 'White Net Canopy', quantity: 1, isQuantityCustomizable: false },
      { name: 'Warm White Fairy Lights', quantity: 4, isQuantityCustomizable: false },
      { name: 'Large Cushions', quantity: 2, isQuantityCustomizable: true, costPerUnit: 500 },
      { name: 'Artificial Flower Vines', quantity: 4, isQuantityCustomizable: true, costPerUnit: 250 },
    ]
  },
  {
    id: 5,
    name: 'Love Explosion Box',
    category: 'gifts',
    price: 1999,
    rating: 4.6,
    reviews: 120,
    imageUrl: 'https://picsum.photos/seed/gift2/400/400',
    description: 'A multi-layered box that opens up to reveal photos and messages, with a small gift box in the center.',
    serviceType: 'package',
    details: [
      { name: 'Space for 24 photos', quantity: 1, isQuantityCustomizable: false },
      { name: 'Multiple message cards', quantity: 1, isQuantityCustomizable: false },
      { name: 'Central gift box', quantity: 1, isQuantityCustomizable: false },
      { name: 'Customizable outer design', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 6,
    name: 'First Birthday Bash Decor',
    category: 'birthday',
    price: 4999,
    rating: 4.9,
    reviews: 95,
    imageUrl: 'https://picsum.photos/seed/birthday2/400/400',
    description: 'Celebrate your little one\'s first milestone with this adorable and colorful decoration package.',
    serviceType: 'package',
    details: [
      { name: 'Pastel Balloon Arch', quantity: 1, isQuantityCustomizable: false },
      { name: 'Number "1" Foil Balloon (3 ft)', quantity: 1, isQuantityCustomizable: false },
      { name: 'High Chair Decoration Kit', quantity: 1, isQuantityCustomizable: false },
      { name: 'Monthly Photo Banner', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 7,
    name: 'Silver Jubilee Anniversary',
    category: 'anniversary',
    price: 3999,
    rating: 4.8,
    reviews: 76,
    imageUrl: 'https://picsum.photos/seed/anniversary2/400/400',
    description: 'Elegant silver-themed decorations to celebrate a glorious 25 years of togetherness.',
    serviceType: 'package',
    details: [
      { name: 'Silver & White Balloons', quantity: 100, isQuantityCustomizable: true, costPerUnit: 15 },
      { name: 'Number "25" Foil Balloons', quantity: 1, isQuantityCustomizable: false },
      { name: '"Happy 25th Anniversary" Banner', quantity: 1, isQuantityCustomizable: false },
      { name: 'Silver Confetti Balloons', quantity: 10, isQuantityCustomizable: true, costPerUnit: 50 },
    ]
  },
  {
    id: 8,
    name: 'Movie Night Decoration Kit',
    category: 'decorations',
    price: 2500,
    rating: 4.5,
    reviews: 63,
    imageUrl: 'https://picsum.photos/seed/decor2/400/400',
    description: 'Turn your living room into a movie theatre with this fun decoration kit. Popcorn not included!',
    serviceType: 'package',
    details: [
      { name: '"Now Showing" Banner', quantity: 1, isQuantityCustomizable: false },
      { name: 'Movie Ticket Invites (Digital)', quantity: 1, isQuantityCustomizable: false },
      { name: 'Star Foil Balloons', quantity: 5, isQuantityCustomizable: true, costPerUnit: 100 },
      { name: 'Clapperboard Cutout', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 9,
    name: 'Event Photography Package',
    category: 'photography',
    price: 15000,
    rating: 4.9,
    reviews: 78,
    imageUrl: 'https://picsum.photos/seed/photo1/400/400',
    description: 'Capture every moment of your special event with our professional photography service. Ideal for birthdays, corporate events, and family gatherings.',
    serviceType: 'service',
    details: [
      { name: 'Hours of Coverage', quantity: 4, isQuantityCustomizable: true, costPerUnit: 3000 },
      { name: 'Number of Photographers', quantity: 1, isQuantityCustomizable: false },
      { name: 'Edited High-Res Photos', quantity: 200, isQuantityCustomizable: false },
      { name: 'Online Gallery', quantity: 1, isQuantityCustomizable: false },
    ],
    customizationOptions: [
      {
        id: 'album',
        name: 'Add a Premium Photo Album',
        type: 'select',
        choices: [
          { name: 'No, thanks', cost: 0 },
          { name: 'Yes, 20-page album', cost: 5000 },
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Cinematic Event Videography',
    category: 'videography',
    price: 25000,
    rating: 4.8,
    reviews: 55,
    imageUrl: 'https://picsum.photos/seed/video1/400/400',
    description: 'A beautifully crafted cinematic video to relive your event. Our team uses high-end equipment to create a stunning film.',
    serviceType: 'service',
    details: [
      { name: 'Hours of Coverage', quantity: 5, isQuantityCustomizable: true, costPerUnit: 4000 },
      { name: 'Final Video Length (minutes)', quantity: 5, isQuantityCustomizable: false },
      { name: '4K Resolution', quantity: 1, isQuantityCustomizable: false },
      { name: 'Drone Shots (if applicable)', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 11,
    name: 'Gourmet Catering Service',
    category: 'catering',
    price: 1200,
    rating: 4.7,
    reviews: 92,
    imageUrl: 'https://picsum.photos/seed/cater1/400/400',
    description: 'Delicious multi-cuisine catering for your events. Price is per person, for a minimum of 50 guests.',
    serviceType: 'service',
    details: [
      { name: 'Minimum Guests', quantity: 50, isQuantityCustomizable: false },
      { name: 'Appetizers', quantity: 3, isQuantityCustomizable: false },
      { name: 'Main Courses', quantity: 4, isQuantityCustomizable: false },
      { name: 'Desserts', quantity: 2, isQuantityCustomizable: false },
      { name: 'Live Counter', quantity: 0, isQuantityCustomizable: true, costPerUnit: 15000 },
    ],
    customizationOptions: [
        {
            id: 'cuisine',
            name: 'Cuisine Type',
            type: 'select',
            choices: [
                { name: 'Indian', cost: 0 },
                { name: 'Continental', cost: 200 },
                { name: 'Asian', cost: 150 },
            ]
        }
    ]
  },
  {
    id: 12,
    name: 'Professional DJ Service',
    category: 'entertainment',
    price: 18000,
    rating: 4.9,
    reviews: 110,
    imageUrl: 'https://picsum.photos/seed/dj1/400/400',
    description: 'Get the party started with our professional DJ, complete with a high-quality sound system and lighting.',
    serviceType: 'service',
    details: [
      { name: 'Duration (hours)', quantity: 4, isQuantityCustomizable: true, costPerUnit: 3500 },
      { name: 'Sound System Included', quantity: 1, isQuantityCustomizable: false },
      { name: 'Basic Lighting Included', quantity: 1, isQuantityCustomizable: false },
      { name: 'Mic for Announcements', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 13,
    name: 'Interactive Magician Show',
    category: 'entertainment',
    price: 12000,
    rating: 5.0,
    reviews: 67,
    imageUrl: 'https://picsum.photos/seed/magic1/400/400',
    description: 'A mesmerizing and fun magic show for all ages. Perfect for birthday parties and family gatherings.',
    serviceType: 'service',
    details: [
      { name: 'Show Duration (minutes)', quantity: 60, isQuantityCustomizable: false },
      { name: 'Audience Interaction', quantity: 1, isQuantityCustomizable: false },
      { name: 'Suitable for All Ages', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 14,
    name: 'Elegant Banquet Hall',
    category: 'venues',
    price: 80000,
    rating: 4.8,
    reviews: 43,
    imageUrl: 'https://picsum.photos/seed/venue1/400/400',
    description: 'A spacious and elegant banquet hall, perfect for weddings, receptions, and large corporate events. Located in a prime area.',
    serviceType: 'venue',
    details: [
      { name: 'Guest Capacity', quantity: 250, isQuantityCustomizable: false },
      { name: 'Air Conditioned', quantity: 1, isQuantityCustomizable: false },
      { name: 'In-house Decor Team', quantity: 1, isQuantityCustomizable: false },
      { name: 'Valet Parking', quantity: 1, isQuantityCustomizable: false },
    ]
  },
  {
    id: 15,
    name: 'Cozy Rooftop Party Hall',
    category: 'venues',
    price: 45000,
    rating: 4.9,
    reviews: 58,
    imageUrl: 'https://picsum.photos/seed/venue2/400/400',
    description: 'A beautiful rooftop hall with city views, ideal for intimate gatherings, birthday parties, and cocktail events.',
    serviceType: 'venue',
    details: [
      { name: 'Guest Capacity', quantity: 80, isQuantityCustomizable: false },
      { name: 'Indoor & Outdoor Space', quantity: 1, isQuantityCustomizable: false },
      { name: 'Basic Sound System', quantity: 1, isQuantityCustomizable: false },
      { name: 'Self-catering Allowed', quantity: 1, isQuantityCustomizable: false },
    ]
  }
];