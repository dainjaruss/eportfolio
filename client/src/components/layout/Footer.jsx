import { NavLink } from 'react-router-dom';

const Footer = ({ navLinks }) => {
  return (
    <footer>
      <nav className="footer-nav" aria-label="Footer navigation">
        <ul>
          {navLinks.map((ln, i) => (
            <li key={i}>
              <NavLink to={ln.path} end={ln.path === '/'}>{ln.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="footer-nav social-media" aria-label="Social media">
        <ul>
          <li><a href="https://github.com/dainjaruss" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="#" target="_blank" rel="noreferrer">Scholar</a></li>
        </ul>
      </nav>

      <p className="copyright">&copy; {new Date().getFullYear()} Dain A. Franklyn.</p>
    </footer>
  );
};

export default Footer;
