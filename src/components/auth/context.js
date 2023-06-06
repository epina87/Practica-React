// import { createContext, useContext, useState } from 'react';


// export const AuthContext = createContext(null);

// export const useAuth = () => {
//   const authValue = useContext(AuthContext);
//   return authValue;
// };

// export const AuthContextProvider = ({ isInitiallyLogged, children }) => {
//   const [isLogged, setIslogged] = useState(isInitiallyLogged);

//   const handleLogin = async () => {
//     setIslogged(true);
//   };

//   const handleLogout = () => {
//     setIslogged(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isLogged, onLogout: handleLogout, onLogin: handleLogin }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
