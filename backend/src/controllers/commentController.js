import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.js';

export const addComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    post: req.params.postId,
    user: req.user._id,
    content: req.body.content
  });
  res.status(201).json(comment);
});

export const listPendingComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ approved: false })
    .populate('user', 'name')
    .populate('post', 'title slug')
    .sort({ createdAt: -1 });
  res.json(comments);
});

export const approveComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  comment.approved = true;
  await comment.save();
  res.json(comment);
});
