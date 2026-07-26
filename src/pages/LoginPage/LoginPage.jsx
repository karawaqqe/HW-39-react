import { AuthForm } from 'components/AuthForm/AuthForm';
import { useAuth } from 'contexts/AuthContext';

export const LoginPage = () => {
  const { login } = useAuth();

  return <AuthForm title="Welcome back" submitLabel="Login" onSubmit={login} />;
};
