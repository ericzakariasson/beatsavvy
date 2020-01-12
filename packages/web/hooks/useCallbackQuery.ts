import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CallbackQuery } from '../graphql/queries/CallbackQuery'
import {
    LoginCallbackVariables as CallbackVars,
    LoginCallbackResponse as CallbackResponse
} from '../types/graphql';
// import { useRouter } from 'next/router';
// Maybe also do redirect inside the hook.

interface CallbackProps {
    state: string;
    code: string;
}

type CallbackQueryObject = [{ error: any; loading: boolean }, string | null | undefined];

export function useCallbackQuery({ state, code }: CallbackProps): CallbackQueryObject {

    const [token, setToken] = React.useState<string>();
    const { error, loading, data } = useQuery<CallbackResponse, CallbackVars>(CallbackQuery, {
        variables: { code, state }
    });

    useEffect(() => {
        if (!loading && data) {
            setToken(data.authenticate?.token);
        }
    }, [loading]);

    return [{ error, loading }, token];
}