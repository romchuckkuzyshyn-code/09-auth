interface AuthLayout {
  children: React.ReactNode;
}
const Layout = ({ children }: AuthLayout) => {
  return <>{children}</>;
};

export default Layout;
