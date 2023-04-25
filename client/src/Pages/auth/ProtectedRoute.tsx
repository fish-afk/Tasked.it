import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			const accessToken = localStorage.getItem("taskedit-accesstoken");
			const username = localStorage.getItem("username");
			const priv = localStorage.getItem("priv");

			const response = await fetch(`http://localhost:4455/${priv}/confirmjwt`, {
				body: JSON.stringify({
					"taskedit-accesstoken": accessToken,
					username: username,
					isadmin: priv === "admins" ? "true" : "false",
				}),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			setAuthenticated(data.auth);
			setLoading(false);
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	} else {
		return authenticated ? children : <Navigate to="/" replace />;
	}
};

export default ProtectedRoute;
