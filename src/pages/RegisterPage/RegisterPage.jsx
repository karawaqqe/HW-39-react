import { AuthForm } from 'components/AuthForm/AuthForm';
import { useAuth } from 'contexts/AuthContext';

export const RegisterPage = () => {
  const { register } = useAuth();

  return (
    <AuthForm
      title="Create account"
      submitLabel="Register"
      onSubmit={register}
      isRegister
    />
  );
};
