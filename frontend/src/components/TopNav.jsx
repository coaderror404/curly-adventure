import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const categories = ['Crypto', 'Forex', 'Stocks', 'Analysis', 'Signals'];

export const TopNav = ({ darkMode, onToggleDarkMode }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold text-brandRed">TradeLive</Link>
        <nav className="hidden gap-4 md:flex">
          {categories.map((cat) => (
            <NavLink key={cat} to={`/?category=${cat.toLowerCase()}`} className="text-sm font-semibold hover:text-brandRed">
              {cat}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onToggleDarkMode} className="rounded-full border border-zinc-300 p-2 dark:border-zinc-700">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <button onClick={logout} className="text-sm font-semibold text-brandRed">Logout</button>
          ) : (
            <Link to="/admin" className="text-sm font-semibold text-brandRed">Admin</Link>
          )}
        </div>
      </div>
    </header>
  );
};
