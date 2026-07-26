import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './AuthForm.module.css';

export const AuthForm = ({ title, submitLabel, onSubmit, isRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...(isRegister ? { name } : {}),
        email,
        password,
      });
      setName('');
      setEmail('');
      setPassword('');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={css.authCard}>
      <h1 className={css.title}>{title}</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        {isRegister && (
          <label className={css.label}>
            Name
            <input
              className={css.input}
              name="name"
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </label>
        )}
        <label className={css.label}>
          Email
          <input
            className={css.input}
            name="email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className={css.label}>
          Password
          <input
            className={css.input}
            name="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            minLength="7"
            required
          />
        </label>
        {error && <p className={css.error}>{error}</p>}
        <button className={css.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : submitLabel}
        </button>
      </form>
    </section>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isRegister: PropTypes.bool,
};

AuthForm.defaultProps = {
  isRegister: false,
};
