import './Button.css';
import { logout } from '../auth/service';

const Button = ({ btnClass, children, isLogged, onLogout }) => {
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <button type="submit" className={btnClass} onClick={handleLogoutClick}>
      {' '}
      {children}{' '}
    </button>
  );
};

export default Button;
