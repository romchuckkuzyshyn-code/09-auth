'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
};

export default Layout;
