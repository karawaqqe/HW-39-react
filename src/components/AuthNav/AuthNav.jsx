import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const getClassName = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export const AuthNav = () => {
  return (
    <div className={css.authNav}>
      <NavLink className={getClassName} to="/register">
        Register
      </NavLink>
      <NavLink className={getClassName} to="/login">
        Login
      </NavLink>
    </div>
  );
};
