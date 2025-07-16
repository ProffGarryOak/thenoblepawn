// scripts/seedItems.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from '../models/Item.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // Dummy seller ObjectId (replace with a real User _id from your DB if needed)
  const dummySeller = new mongoose.Types.ObjectId();

  const items = [
    {
      name: 'Vintage Gold Ring',
      description: 'A beautiful vintage gold ring with intricate designs.',
      price: 1200,
      category: 'Jewelry',
      condition: 'Excellent',
      images: [
        { url: '/ring.png', isPrimary: true },
        { url: '/album.png' }
      ],
      seller: dummySeller,
      isVerified: true,
      status: 'listed',
      views: 10
    },
    {
      name: 'Antique Vase',
      description: 'Rare porcelain vase from the 19th century.',
      price: 3500,
      category: 'Antiques',
      condition: 'Good',
      images: [
        { url: '/vase.png', isPrimary: true }
      ],
      seller: dummySeller,
      isVerified: false,
      status: 'pending',
      views: 3
    },
    {
      name: 'Luxury Watch',
      description: 'Swiss-made luxury watch, perfect working condition.',
      price: 8000,
      category: 'Watches',
      condition: 'Mint',
      images: [
        { url: '/watch.png', isPrimary: true }
      ],
      seller: dummySeller,
      isVerified: true,
      status: 'listed',
      views: 25
    }
  ];

  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Dummy items inserted!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
