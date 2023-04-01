import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({authed}: {authed: boolean}) => {
	
	return authed === true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
