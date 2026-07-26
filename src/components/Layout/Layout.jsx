import { Outlet } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={css.appShell}>
      <Navigation />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};
