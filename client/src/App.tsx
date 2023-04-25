import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React from "react";

import AdminHome from "./Pages/Admin/AdminHome";
import FreelancerHome from "./Pages/Freelancer/FreelancerHome";

import AdminRedirect from "./Pages/Admin/AdminRedirect";
import FreelancerRedirect from "./Pages/Freelancer/FreelancerRedirect";

import ListFreelancers from "./Pages/Admin/ListFreelancers";
import ListAdmins from "./Pages/Admin/ListAdmins";
import ListMessages from "./Pages/Admin/ListMessages";
import ListProjects from "./Pages/Admin/ListProjects";
import ListRoles from "./Pages/Admin/ListRoles";

import Index from "./Pages";
import AdminLogin from "./Pages/auth/AdminLogin";
import FreelancerLogin from "./Pages/auth/FreelancerLogin";
import Logout from "./Pages/auth/Logout";
import ProtectedRoute from "./Pages/auth/ProtectedRoute";

function App() {
	const Nav = useNavigate();

	const func = async () => {
		const priv: any = localStorage.getItem("priv");
		const refreshToken: any = localStorage.getItem("taskedit-refreshtoken");
		const username: any = localStorage.getItem("username");

		if (localStorage.getItem("taskedit-refreshtoken") !== undefined) {
			const response = await fetch(`http://localhost:4455/${priv}/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refreshToken: refreshToken,
					username: username,
				}),
			});

			const data = await response.json();

			if (data.jwt) {
				localStorage.setItem("taskedit-accesstoken", data.jwt);
				console.log('Refreshed !');
			} else {
				Nav(`/${priv}/logout`);
			}
		} else {
			Nav(`/${priv}/logout`);
		}
	};

	const REFRESH_AUTH_MINUTE_MS: number = 300000;

	useEffect(() => {
		const interval = setInterval(() => {
			func();
		}, REFRESH_AUTH_MINUTE_MS);

		return () => clearInterval(interval);
	});
	return (
		<React.Fragment>
			<Routes>
				<Route path="*" element={<h1>There's nothing here: 404!</h1>} />
				<Route path="/" element={<Index />} />
				<Route path="/admin">
					<Route element={<AdminRedirect />} index />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin/home"
						element={
							<ProtectedRoute>
								<AdminHome />
							</ProtectedRoute>
						}
					/>
					<Route path="/admin/logout" element={<Logout accountype="admin" />} />
					<Route path="/admin/listfreelancers" element={<ListFreelancers />} />
					<Route path="/admin/listadmins" element={<ListAdmins />} />
					<Route path="/admin/listprojects" element={<ListProjects />} />
					<Route path="/admin/listmessages" element={<ListMessages />} />
					<Route path="/admin/listroles" element={<ListRoles />} />
					<Route path="*" element={<h1>There's nothing here: 404!</h1>} />
				</Route>

				<Route path="/freelancer">
					<Route element={<FreelancerRedirect />} index />
					<Route path="/freelancer/login" element={<FreelancerLogin />} />
					<Route path="/freelancer/home" element={<FreelancerHome />} />
					<Route
						path="/freelancer/logout"
						element={<Logout accountype="freelancer" />}
					/>
					<Route path="*" element={<h1>There's nothing here: 404!</h1>} />
				</Route>
			</Routes>
		</React.Fragment>
	);
}

export default App;
