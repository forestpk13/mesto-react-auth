import { Navigate } from 'react-router';

export const ProtectedRoute = ({ element: Component, ...props }) => {
  return (props.loggedIn ? <Component {...props} /> : <Navigate to="./sign-in" replace/>);
}