import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { defaultState } from '../../../store/reducers';
import { authLogin, uiResetError } from '../../../store/actions';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/actions');


describe('LoginPage', () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = defaultState;
        state.ui.error = error
        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
  };



  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action', () => {
    const email = 'email';
    const password = '12345';
    const saveSession = false;

    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);

    const submitButton = screen.getByRole('button');
    

    expect(submitButton).toBeDisabled();

    userEvent.type(emailInput,email)
    userEvent.type(passwordInput,password)


    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password }, saveSession);

  });

   test('should display an error', () => {
    const error = {message: 'Unauthorized'}
    renderComponent(error);

    const errorElement = screen.getByText(error.message)
    expect(errorElement).toBeInTheDocument()


    userEvent.click(errorElement)

    expect(uiResetError).toHaveBeenCalled()
  });

  test('should checked save session',()=>{

    renderComponent();

    const chekedButton = screen.getByRole('checkbox');

     expect(chekedButton).not.toBeChecked();
     userEvent.click(chekedButton)
     expect(chekedButton).toBeChecked();
  });
});
