import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('isloggedin') || false
  );

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('https://localhost:7050/user/login', {
        Username: username,
        Password: password,
      });
      console.log(response); // debug: log response
      if (response && response.data) {
        const { role, userId, username } = response.data;
        window.localStorage.setItem('userrole', role);
        window.localStorage.setItem('userid', userId);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('isloggedin', true);
        setIsLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      return false;
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem('userrole');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('isloggedin');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
