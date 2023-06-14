import { useState } from 'react';
import './style/LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  authLogin,
  uiResetError,
} from '../../store/actions';
import { getUi } from '../../store/selectors';

function LoginPage() {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(getUi);

  const [credential, setCredentials] = useState({
    email: '',
    password: '',
  });

  const resetError = () => {
    dispatch(uiResetError());
  };

  const [saveSession, setSaveSession] = useState(false);

  const handlechecked = event => {
    setSaveSession(event.target.checked);
  };

  const handleSubmit =  event => {
    event.preventDefault();
    dispatch(authLogin(credential, saveSession))
  };

  const handleChange = event => {
    setCredentials({ ...credential, [event.target.name]: event.target.value });
  };

  const buttonDisabled = isLoading || !credential.email || !credential.password;
  const btnClass = !buttonDisabled ? 'btn' : 'btnDisabled';

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h1 className="card-title text-center">New User Register</h1>
          <div className="card-text">
            <form id="createUser" onSubmit={handleSubmit}>
              <p>
                <label>Email
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  value={credential.email}
                />
                </label>
              </p>
              <p>
                <label>Password
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={handleChange}
                  value={credential.password}
                />
                </label>
              </p>
              <button
                type="submit"
                className={btnClass}
                disabled={buttonDisabled}
              >
                Sign in
              </button>

              <p>
                <input type="checkbox" onChange={handlechecked} /> you want to
                save the session
              </p>
              {error && (
                <div className="error" onClick={resetError}>
                  {' '}
                  {error.message}{' '}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
