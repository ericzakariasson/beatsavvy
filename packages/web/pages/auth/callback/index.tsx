import { useMutation } from '@apollo/react-hooks';
import { NextPageContext } from 'next';
import { useEffect } from 'react';
import {
  authenticateMutation,
  AuthenticateResponse,
} from './authenticateQuery';
import { useRouter } from 'next/dist/client/router';

interface CallbackProps {
  code?: string;
  state?: string;
}

const Callback = ({ code, state }: CallbackProps) => {
  const router = useRouter();

  const [authenticate, { data }] = useMutation<AuthenticateResponse>(
    authenticateMutation
  );

  useEffect(() => {
    if (code && state) {
      authenticate({ variables: { code, state } });
    }
  }, [code, state]);

  useEffect(() => {
    if (data?.authenticate && process.browser) {
      localStorage.setItem('token', data.authenticate.token);
      router.push('/');
    }
  }, [data]);

  return <div>Hej</div>;
};

Callback.getInitialProps = async (ctx: NextPageContext) => {
  const { code, state } = ctx.query;
  return { code, state };
};

export default Callback;
