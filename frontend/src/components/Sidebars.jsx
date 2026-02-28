import { Link } from 'react-router-dom';

export const LeftSidebar = ({ categories }) => (
  <aside className="space-y-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
    <h2 className="border-l-4 border-brandRed pl-2 text-sm font-bold uppercase">Categories</h2>
    <ul className="space-y-2 text-sm">
      {categories.map((cat) => (
        <li key={cat._id}>
          <Link to={`/?category=${cat._id}`} className="hover:text-brandRed">{cat.name}</Link>
        </li>
      ))}
    </ul>
  </aside>
);

export const RightSidebar = ({ trending }) => (
  <aside className="space-y-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
    <h2 className="border-l-4 border-brandRed pl-2 text-sm font-bold uppercase">Trending</h2>
    <ul className="space-y-3">
      {trending.map((post) => (
        <li key={post._id}>
          <Link to={`/post/${post.slug}`} className="text-sm font-semibold hover:text-brandRed">{post.title}</Link>
        </li>
      ))}
    </ul>
  </aside>
);
