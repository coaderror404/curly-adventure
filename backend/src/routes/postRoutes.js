import express from 'express';
import {
  createPost,
  deletePost,
  getPostBySlug,
  listPosts,
  toggleLike,
  trendingPosts,
  updatePost
} from '../controllers/postController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', listPosts);
router.get('/trending', trendingPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, adminOnly, upload.single('featuredImage'), createPost);
router.put('/:id', protect, adminOnly, upload.single('featuredImage'), updatePost);
router.delete('/:id', protect, adminOnly, deletePost);
router.post('/:id/like', protect, toggleLike);

export default router;
