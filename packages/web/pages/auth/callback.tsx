import { useEffect } from 'react';
import { useCallbackQuery } from '../../hooks/useCallbackQuery';
import { useRouter } from 'next/router';

const REDIRECT_URI = (process.env.REDIRECT_URI as string) || '/';

const Callback = ({ code = '', state = '' }) => {
  const [{ error, loading }] = useCallbackQuery({ code, state });
  const router = useRouter();

  // https://github.com/zeit/next.js/issues/4931#issuecomment-512787861
  // But I would rather do it inside getInitialProps.
  useEffect(() => {
    if (!loading && !error) {
      // Also populate state with user
      router.push(REDIRECT_URI);
    }
  });

  return null;
};

Callback.getInitialProps = async ctx => {
  const { code, state } = ctx.query;
  return { code, state };
};

export default Callback;
