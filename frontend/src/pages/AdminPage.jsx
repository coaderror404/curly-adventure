import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      api.get('/posts').then((res) => setPosts(res.data.posts));
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/login', form);
    login(res.data);
  };

  if (!user) {
    return (
      <form onSubmit={onLogin} className="mx-auto mt-16 max-w-sm space-y-3 rounded border p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input placeholder="Email" className="w-full rounded border p-2" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full rounded border p-2" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded bg-brandRed p-2 text-white">Sign in</button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-sm text-zinc-500">Manage posts, categories and comment approvals from API endpoints.</p>
      <div className="mt-5 rounded border p-4">
        <h2 className="text-lg font-bold">Recent posts</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {posts.map((post) => <li key={post._id}>{post.title}</li>)}
        </ul>
      </div>
    </div>
  );
};
