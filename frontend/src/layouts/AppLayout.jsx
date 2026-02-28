import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { BreakingBanner } from '../components/BreakingBanner';

export const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div>
      <div className="overflow-hidden bg-brandBlack text-white">
        <div className="ticker-marquee whitespace-nowrap py-1 text-xs">
          BTC: $68,320 ▲ 1.2% • ETH: $3,560 ▲ 0.8% • DXY: 104.21 ▼ 0.3% • NASDAQ Futures: +0.5%
        </div>
      </div>
      <BreakingBanner />
      <TopNav darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} />
      <Outlet />
    </div>
  );
};
