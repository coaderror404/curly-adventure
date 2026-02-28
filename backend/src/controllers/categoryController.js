import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import { slugify } from '../utils/slugify.js';

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name);
  const category = await Category.create({ name, slug, description });
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  category.name = name ?? category.name;
  category.slug = name ? slugify(name) : category.slug;
  category.description = description ?? category.description;
  await category.save();
  res.json(category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  await category.deleteOne();
  res.json({ message: 'Category deleted' });
});
