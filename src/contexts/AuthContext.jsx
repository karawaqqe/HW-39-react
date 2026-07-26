import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'services/contactsApi';

const TOKEN_KEY = 'contactsToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isRefreshing, setIsRefreshing] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setIsRefreshing(false);
      return;
    }

    let isMounted = true;

    getCurrentUser(token)
      .then(currentUser => {
        if (isMounted) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsRefreshing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const register = useCallback(async credentials => {
    const data = await signUp(credentials);
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const login = useCallback(async credentials => {
    const data = await signIn(credentials);
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    const activeToken = token;
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);

    if (activeToken) {
      await signOut(activeToken).catch(() => {});
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoggedIn: Boolean(token && user),
      isRefreshing,
      register,
      login,
      logout,
    }),
    [isRefreshing, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
