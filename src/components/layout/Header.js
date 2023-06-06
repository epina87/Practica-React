import { logout } from '../auth/service';
import './style/Header.css';
import './style/Button.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getMe } from '../adverts/service';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../store/actions';
import { getIsLogged } from '../../store/selectors';

const Header = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(authLogout());

  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  const itsMe = async () => {
    try {
      await getMe();
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const goLogin = () => {
    navigate('/login');
  };

  itsMe();

  return (
    <header>
      <div>
        <Link to="/">
          <div className="logo"></div>
          <h1 className="texto">NODEPOP</h1>
        </Link>
      </div>

      <nav>
        <NavLink to="/adverts/new" className="active">
          {' '}
          New Advert
        </NavLink>

        <NavLink to="/adverts" className="active">
          {' '}
          See Adverts
        </NavLink>
      </nav>
      <div>
        {isLogged ? (
          <button className="btn" onClick={handleLogoutClick}>
            Logout
          </button>
        ) : (
          <button className="btn" onClick={goLogin}>
            {' '}
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
