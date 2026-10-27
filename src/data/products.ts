import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Arnica Montana 30C',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pain Relief',
    description: 'Natural remedy for bruises, soreness, and muscle pain. Made from mountain daisy.',
    ingredients: ['Arnica Montana', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets under tongue 3 times daily or as directed by practitioner.',
    stock: 45,
    rating: 4.8,
    reviews: 127,
    isOnSale: true
  },
  {
    id: '2',
    name: 'Belladonna 200C',
    price: 14.50,
    image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fever & Inflammation',
    description: 'Effective for sudden onset fever, headaches, and inflammatory conditions.',
    ingredients: ['Belladonna', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets under tongue every 2 hours during acute symptoms.',
    stock: 32,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Chamomilla 30C',
    price: 11.75,
    image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sleep & Relaxation',
    description: 'Gentle remedy for sleeplessness, teething pain, and irritability in children and adults.',
    ingredients: ['Chamomilla', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets before bedtime or as needed for calming.',
    stock: 67,
    rating: 4.9,
    reviews: 203
  },
  {
    id: '4',
    name: 'Ignatia Amara 30C',
    price: 13.25,
    image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Emotional Support',
    description: 'Natural support for grief, emotional stress, and mood swings.',
    ingredients: ['Ignatia Amara', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets 2-3 times daily during emotional distress.',
    stock: 28,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'Nux Vomica 30C',
    price: 12.50,
    image: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Digestive Health',
    description: 'Excellent for digestive issues, hangover, and overindulgence symptoms.',
    ingredients: ['Nux Vomica', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets before meals or as directed.',
    stock: 41,
    rating: 4.5,
    reviews: 94
  },
  {
    id: '6',
    name: 'Pulsatilla 200C',
    price: 15.99,
    originalPrice: 18.99,
    image: 'https://images.pexels.com/photos/6207386/pexels-photo-6207386.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Respiratory Health',
    description: 'Natural remedy for respiratory conditions, allergies, and sinus issues.',
    ingredients: ['Pulsatilla', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets 3 times daily or as recommended.',
    stock: 19,
    rating: 4.8,
    reviews: 178,
    isOnSale: true
  },
  {
    id: '7',
    name: 'Rhus Toxicodendron 30C',
    price: 13.75,
    image: 'https://images.pexels.com/photos/6823576/pexels-photo-6823576.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Joint & Muscle',
    description: 'Effective for joint stiffness, arthritis, and muscle strains.',
    ingredients: ['Rhus Toxicodendron', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets morning and evening.',
    stock: 35,
    rating: 4.6,
    reviews: 112
  },
  {
    id: '8',
    name: 'Calendula Cream',
    price: 18.99,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Topical Care',
    description: 'Healing cream for cuts, scrapes, and skin irritations. Natural antiseptic properties.',
    ingredients: ['Calendula Extract', 'Beeswax', 'Coconut Oil', 'Vitamin E'],
    usage: 'Apply thin layer to affected area 2-3 times daily.',
    stock: 52,
    rating: 4.9,
    reviews: 245
  }
];

export const categories = [
  'All Products',
  'Pain Relief',
  'Fever & Inflammation',
  'Sleep & Relaxation',
  'Emotional Support',
  'Digestive Health',
  'Respiratory Health',
  'Joint & Muscle',
  'Topical Care'
];