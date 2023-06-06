import { useState } from 'react';
import { login } from './service';
import './style/LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/actions';

function LoginPage() {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credential, setCredentials] = useState({
    email: '',
    password: '',
  });

  const resetError = () => {
    setError(null);
  };

  const onLogin = () => dispatch(authLogin())

  const [saveSession, setSaveSession] = useState(false);

  const handlechecked = event => {
    setSaveSession(event.target.checked);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    

    resetError();

    setIsLoading(true);
    try {
      await login(credential, saveSession);
      setIsLoading(false);
    } catch (error) {
      console.log("error",error);
      setIsLoading(false);
      setError(error);
      return;
    }

    onLogin(true);

    const to = location.state?.from?.pathname || '/';

    navigate(to);
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
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                  value={credential.email}
                />
              </p>
              <p>
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={handleChange}
                  value={credential.password}
                />
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
              {error && <div className='error'> {error.message} </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
