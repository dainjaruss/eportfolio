import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import ApiCard from '../ApiCard';

const Header = ({ navLinks, themeMode, onToggleTheme }) => {
  // keep the DOM attribute in sync so CSS variables pick up the right theme
  const { pathname } = useLocation();
  const currentLabel = navLinks.find(ln => ln.path === pathname)?.label || 'Welcome';

  return (
    <header>
      <div className="header-title-row">
        <h1 className="page-title">Dain Franklyn's Portfolio</h1>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {themeMode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <Nav navLinks={navLinks} />

      <h2 className="section-title">{currentLabel}</h2>
      {/* placed api card banner right below the green line */}
      <ApiCard />
    </header>
  );
};

export default Header;
