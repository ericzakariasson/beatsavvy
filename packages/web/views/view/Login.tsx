import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthenticationUrl } from '../../types/graphql';
import { AuthenticationUrlQuery } from '../../graphql/queries/AuthenticationUrlQuery';

export const LoginPage = () => {
  const { error, loading, data } = useQuery<AuthenticationUrl>(
    AuthenticationUrlQuery
  );

  if (error) return null;

  return (
    // Basics
    <a href={data?.authenticationUrl ?? '#'}>{loading ? '...' : 'Sign in'}</a>
  );
};
