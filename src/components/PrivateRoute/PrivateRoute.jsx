import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from 'contexts/AuthContext';
import css from './PrivateRoute.module.css';

export const PrivateRoute = ({ children, redirectTo }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) {
    return <p className={css.loader}>Refreshing user...</p>;
  }

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
