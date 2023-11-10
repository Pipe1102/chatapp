import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: RouteComponent }: Props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
