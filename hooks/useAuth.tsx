import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

function useAuth() {
  const router = useRouter();

  // initially user is not logged in
  const [authorized, setAuthorized] = useState(false);
  const [authToken, setAuthToken] = useState();

  function authCheck(url: any) {
    let token = null;

    const authData: any = localStorage.getItem('finance-management-app');
    const parsedAuthData = JSON.parse(authData);
    if (parsedAuthData?.token) {
      token = parsedAuthData?.token;
      setAuthToken(token);
    }

console.log("parsedAuthData", parsedAuthData);

    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      '/login',
      '/signup',
        // '/dashboard',
      // '/create-account',
      // '/summary',
      // '/edit-profile',
      // '/users',
      // '/view-profile',
      // '/calender',
      // '/edit-profile',
    ];

    const authPaths = [
      '/login',
      '/signup',
    ];

    const path = url.split('?')[0];

    // if user is not logged in, redirect them to the login page
    if (!token && !publicPaths?.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
      });
    } else if (authPaths.includes(path) && token) {
      // if they are logged in, redirect them to the dashboard page
      setAuthorized(false);
      router.push({
        pathname: '/deposit',
      });
    } else {
      setAuthorized(true);
    }
  }
  useEffect(() => {
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);
    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authorized, authToken };
}

export default useAuth;


