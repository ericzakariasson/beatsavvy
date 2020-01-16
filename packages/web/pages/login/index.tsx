import { LoginPage } from '../../views/view/Login';

import {
  authenticationUrlQuery,
  AuthenticationUrl,
} from './authenticationUrlQuery';
import { useQuery } from '@apollo/react-hooks';

const Login = () => {
  const { data, error, loading } = useQuery<AuthenticationUrl>(
    authenticationUrlQuery
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.assign(data.authenticationUrl);
};

export default Login;
