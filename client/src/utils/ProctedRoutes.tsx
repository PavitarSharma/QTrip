import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { SelectAuthState } from "../redux/reducers/authSlice";

const ProctedRoutes = () => {
  const { isAuth } = useAppSelector(SelectAuthState);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default ProctedRoutes;
