'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();

  const setUser = useAuthStore(s => s.setUser);
  const clearIsAuthenticated = useAuthStore(s => s.clearIsAuthenticated);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  const [isLoading, setIsLoading] = useState(true);

  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
