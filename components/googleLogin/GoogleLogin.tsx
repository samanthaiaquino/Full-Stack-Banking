/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Spin, message } from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { LoginWithGoogleAuth } from '../../services/auth';

// const CLIENT_ID = '64204656571-e077t6mi72t0l75joe8cu3fnc0n8frel.apps.googleusercontent.com';
const CLIENT_ID = '544371006464-1r66ls2v3cmj9iudocoruoajjj6igttb.apps.googleusercontent.com';

function LoginWithGoogle() {
  const router = useRouter();

    const { mutate, isLoading } = useMutation((data: any) => LoginWithGoogleAuth(data), {
        onSuccess: (res: any) => {
          localStorage.setItem('finance-management-app', JSON.stringify(res));
          router.push('/deposit');
        },
        onError: (err: any) => {
          message.error(err?.response?.data?.message);
        },
      });

  return (
    <div>
      <Spin spinning={isLoading}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
            //   console.log(credentialResponse);
              mutate(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </Spin>
    </div>
  );
}

export default LoginWithGoogle;
