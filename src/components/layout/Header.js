//import { logout } from '../auth/service';
import './style/Header.css';
import './style/Button.css';
import { Link, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authLogout, meLoad } from '../../store/actions';
import { getIsLogged } from '../../store/selectors';

const Header = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(authLogout());



  const itsMe = () => dispatch(meLoad())
  itsMe()



  if (!isLogged) {
    dispatch(authLogout())
  }

  const goLogin = () => {
    dispatch(authLogout())
  };

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
          <button className="btn" onClick={onLogout}>
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
