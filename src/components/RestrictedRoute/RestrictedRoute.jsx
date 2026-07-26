import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from 'contexts/AuthContext';
import css from './RestrictedRoute.module.css';

export const RestrictedRoute = ({ children, redirectTo }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) {
    return <p className={css.loader}>Refreshing user...</p>;
  }

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
