import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ path, element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
