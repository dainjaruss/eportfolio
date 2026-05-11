import { NavLink } from 'react-router-dom';

// nav now uses React Router NavLink so the URL actually changes on navigation
const Nav = ({ navLinks }) => {
  return (
    <nav aria-label="Primary navigation">
      <ul>
        {navLinks.map((link, i) => (
          <li key={i}>
            <NavLink
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
