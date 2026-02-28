import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaBookmark, FaShareAlt, FaThumbsUp } from 'react-icons/fa';
import { api } from '../api/client';

export const PostPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    api.get(`/posts/${slug}`).then((res) => setData(res.data));
  }, [slug]);

  if (!data) return <div className="mx-auto max-w-4xl p-6">Loading...</div>;

  const { post, comments, relatedPosts } = data;

  return (
    <article className="mx-auto max-w-4xl p-4 md:p-8">
      <Helmet>
        <title>{post.title} | TradeLive</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <h1 className="text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-2 text-sm text-zinc-500">By {post.author.name} • {new Date(post.publishedAt).toLocaleString()}</p>
      {post.featuredImage && <img src={`${import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000'}${post.featuredImage}`} className="my-6 w-full rounded-lg" />}
      <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="my-6 flex gap-3">
        <button className="rounded border px-3 py-2 text-sm"><FaThumbsUp className="mr-2 inline" />Like</button>
        <button className="rounded border px-3 py-2 text-sm"><FaBookmark className="mr-2 inline" />Bookmark</button>
        <button className="rounded border px-3 py-2 text-sm"><FaShareAlt className="mr-2 inline" />Share</button>
      </div>

      <section className="mt-8 border-t pt-4">
        <h3 className="text-xl font-bold">Related posts</h3>
        <ul className="mt-3 space-y-2">
          {relatedPosts.map((item) => (
            <li key={item._id}><Link to={`/post/${item.slug}`} className="hover:text-brandRed">{item.title}</Link></li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t pt-4">
        <h3 className="text-xl font-bold">Comments</h3>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-3 w-full rounded border p-3 dark:bg-zinc-900" placeholder="Share your market view..." />
        <button className="mt-2 rounded bg-brandRed px-4 py-2 text-white">Submit comment</button>
        <div className="mt-4 space-y-3">
          {comments.map((c) => <p key={c._id} className="rounded bg-zinc-100 p-3 text-sm dark:bg-zinc-900"><strong>{c.user.name}</strong>: {c.content}</p>)}
        </div>
      </section>
    </article>
  );
};
