import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import { LeftSidebar, RightSidebar } from '../components/Sidebars';
import { PostCard } from '../components/PostCard';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const category = searchParams.get('category');
      const [postRes, categoryRes, trendingRes] = await Promise.all([
        api.get('/posts', { params: { category } }),
        api.get('/categories'),
        api.get('/posts/trending')
      ]);
      setPosts(postRes.data.posts);
      setCategories(categoryRes.data);
      setTrending(trendingRes.data);
      setLoading(false);
    };
    load();
  }, [searchParams]);

  const hero = posts[0];

  return (
    <>
      <Helmet>
        <title>TradeLive | Live Trading Blogs & Market Analysis</title>
        <meta name="description" content="Live trading blog updates, crypto alerts, forex signals and stock insights." />
      </Helmet>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <div className="lg:col-span-2"><LeftSidebar categories={categories} /></div>
        <main className="lg:col-span-7">
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, idx) => <div key={idx} className="h-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />)}
            </div>
          ) : (
            <>
              {hero && (
                <section className="mb-6 rounded-lg bg-zinc-50 p-5 dark:bg-zinc-900">
                  <p className="text-xs uppercase text-brandRed">Latest Hero Story</p>
                  <h1 className="mt-2 text-3xl font-extrabold">{hero.title}</h1>
                  <p className="mt-2 text-zinc-700 dark:text-zinc-300">{hero.excerpt}</p>
                </section>
              )}
              <h2 className="mb-2 border-b-2 border-brandRed pb-2 text-lg font-bold">Live Market Updates</h2>
              {posts.map((post) => <PostCard key={post._id} post={post} />)}
              <section className="mt-8 rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-bold">Newsletter</h3>
                <p className="mb-3 text-sm">Get daily trading setups and macro analysis.</p>
                <input className="w-full rounded border p-2 dark:bg-zinc-900" placeholder="Your email" />
              </section>
            </>
          )}
        </main>
        <div className="lg:col-span-3"><RightSidebar trending={trending} /></div>
      </div>
    </>
  );
};
