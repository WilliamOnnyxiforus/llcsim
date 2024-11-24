// withAuth.js
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
      const { name } = parseCookies();
      // Redirect to login if no auth token is found
      if (!name) {
        router.replace('/login');  // Replace with your login route
      }else{
        setIsAuthenticated(true);
      }
    }, [router]);

    // If name exists, render the wrapped component
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthHOC;
};

export default withAuth;
