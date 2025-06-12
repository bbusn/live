import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AUTH_STATUS } from "../utils/auth";
import ROUTES from "../constants/routes";

const RequireAuth = () => {
    const { status } = useAuth();

    if (status === AUTH_STATUS.LOADING) {
        return null;
    }

    if (status === AUTH_STATUS.UNAUTH) {
        return <Navigate to={ROUTES.WELCOME} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
