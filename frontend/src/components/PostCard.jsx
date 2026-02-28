import { Link } from 'react-router-dom';

export const PostCard = ({ post }) => (
  <article className="border-b border-zinc-200 py-4 dark:border-zinc-800">
    <p className="text-xs text-zinc-500">{new Date(post.publishedAt).toLocaleString()}</p>
    <Link to={`/post/${post.slug}`} className="mt-1 block text-xl font-bold hover:text-brandRed">{post.title}</Link>
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
  </article>
);
