import express from 'express';
import { addComment, approveComment, listPendingComments } from '../controllers/commentController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/post/:postId', protect, addComment);
router.get('/pending', protect, adminOnly, listPendingComments);
router.patch('/:id/approve', protect, adminOnly, approveComment);

export default router;
