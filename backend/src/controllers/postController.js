import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { slugify } from '../utils/slugify.js';

export const listPosts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 8);
  const skip = (page - 1) * limit;
  const query = {};

  if (req.query.category) query.category = req.query.category;
  if (req.query.live === 'true') query.isLiveUpdate = true;
  if (req.query.search) query.$text = { $search: req.query.search };

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(query)
  ]);

  res.json({ posts, total, page, pages: Math.ceil(total / limit) });
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('category', 'name slug')
    .populate('author', 'name');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  post.views += 1;
  await post.save();

  const comments = await Comment.find({ post: post._id, approved: true })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  const relatedPosts = await Post.find({
    _id: { $ne: post._id },
    category: post.category._id
  })
    .select('title slug publishedAt')
    .limit(4)
    .sort({ publishedAt: -1 });

  res.json({ post, comments, relatedPosts });
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags, isLiveUpdate } = req.body;
  const slug = slugify(title);

  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    category,
    tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    isLiveUpdate: Boolean(isLiveUpdate),
    featuredImage: req.file ? `/uploads/${req.file.filename}` : '',
    author: req.user._id
  });

  res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const { title, excerpt, content, category, tags, isLiveUpdate } = req.body;
  post.title = title ?? post.title;
  post.slug = title ? slugify(title) : post.slug;
  post.excerpt = excerpt ?? post.excerpt;
  post.content = content ?? post.content;
  post.category = category ?? post.category;
  post.tags = tags ? tags.split(',').map((tag) => tag.trim()) : post.tags;
  post.isLiveUpdate = typeof isLiveUpdate === 'undefined' ? post.isLiveUpdate : isLiveUpdate === 'true';
  if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;

  await post.save();
  res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  await post.deleteOne();
  res.json({ message: 'Post removed' });
});

export const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const liked = post.likes.some((id) => id.toString() === req.user._id.toString());
  if (liked) {
    post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();
  res.json({ likes: post.likes.length, liked: !liked });
});

export const trendingPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .select('title slug views publishedAt excerpt')
    .sort({ views: -1, publishedAt: -1 })
    .limit(5);
  res.json(posts);
});
