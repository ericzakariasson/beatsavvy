import { useEffect } from 'react';
import { useCallbackQuery } from '../../hooks/useCallbackQuery';
import { useRouter } from 'next/router';

import { NextPageContext } from 'next';

const REDIRECT_URI = process.env.REDIRECT_URI || '/';

const Callback = ({ code = '', state = '' }) => {
  const [{ error, loading }] = useCallbackQuery({ code, state });
  const router = useRouter();

  // https://github.com/zeit/next.js/issues/4931#issuecomment-512787861
  // But I would rather do it inside getInitialProps.
  useEffect(() => {
    if (!loading && !error) {
      // Also populate state with user
      router.push(REDIRECT_URI as string);
    }
  }, []);

  return null;
};

Callback.getInitialProps = async (ctx: NextPageContext) => {
  const { code, state } = ctx.query;
  return { code, state };
};

export default Callback;
