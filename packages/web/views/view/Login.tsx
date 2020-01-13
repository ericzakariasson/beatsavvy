import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthenticationUrl } from '../../types/graphql';
import { AuthenticationUrlQuery } from '../../graphql/queries/AuthenticationUrlQuery';

export const LoginPage = () => {
  const { error, loading, data } = useQuery<AuthenticationUrl>(
    AuthenticationUrlQuery
  );

  if (error) return null;

  // Maybe the whole thing is suppose to be a redirect?
  // No page, as we do with the callback.
  useEffect(() => {
    if (!loading && data) {
      // Push to external data.authenticationUrl.
    }
  }, [loading, data]);
  // On the otherhand it could be nice to provide some information here aswell.

  return (
    <a href={data?.authenticationUrl ?? '#'}>{loading ? '...' : 'Sign in'}</a>
  );
};
