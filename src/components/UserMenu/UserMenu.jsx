import { useAuth } from 'contexts/AuthContext';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const { user, logout } = useAuth();

  return (
    <div className={css.userMenu}>
      <p className={css.email}>{user?.email}</p>
      <button className={css.button} type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
