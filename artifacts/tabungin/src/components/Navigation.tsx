import { NavLink } from 'react-router-dom';
import * as Lucide from 'lucide-react';
const { Home, PlusCircle, History } = Lucide;
import clsx from 'clsx';

export const Navigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) => clsx('nav-item', isActive && 'active')}
      >
        <Home />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/add"
        className={({ isActive }) => clsx('nav-item', isActive && 'active')}
      >
        <PlusCircle />
        <span>Add Goal</span>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => clsx('nav-item', isActive && 'active')}
      >
        <History />
        <span>History</span>
      </NavLink>
    </nav>
  );
};
