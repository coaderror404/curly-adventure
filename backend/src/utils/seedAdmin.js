import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

dotenv.config();
await connectDB();

const email = process.env.ADMIN_EMAIL || 'admin@tradelive.com';
const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

const existing = await User.findOne({ email });
if (existing) {
  existing.role = 'admin';
  existing.password = password;
  await existing.save();
  console.log(`Updated existing admin: ${email}`);
} else {
  await User.create({ name: 'TradeLive Admin', email, password, role: 'admin' });
  console.log(`Created admin user: ${email}`);
}

await mongoose.connection.close();
