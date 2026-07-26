import { NavLink } from 'react-router-dom';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useAuth } from 'contexts/AuthContext';
import css from './Navigation.module.css';

const getNavLinkClassName = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink className={css.logo} to="/contacts">
          Contact Book
        </NavLink>
        <div className={css.links}>
          {isLoggedIn && (
            <NavLink className={getNavLinkClassName} to="/contacts">
              Contacts
            </NavLink>
          )}
        </div>
      </nav>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
