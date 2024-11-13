import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode, FC } from 'react';
import { getCookiesData } from '../utils/CookiesData';

interface ProtectedRouteProps {
  children?: ReactNode; // ReactNode en lugar de React.FC para aceptar cualquier tipo de nodo React
  redirectTo?: string;
}

export const ProtectedRouteByUserSession: FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login"
}) => {
  if (!getCookiesData( "AccessToken" )) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
