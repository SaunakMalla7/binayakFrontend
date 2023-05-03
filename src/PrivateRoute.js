import { Route, Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element, ...rest }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.role === 'admin') {
    return <Route {...rest} element={<Element />} />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
