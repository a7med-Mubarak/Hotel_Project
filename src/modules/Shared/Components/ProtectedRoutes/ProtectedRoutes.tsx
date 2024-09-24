import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {

  if (localStorage.getItem("token")) return children;
  else return <Navigate to={"/login"} />;
}
