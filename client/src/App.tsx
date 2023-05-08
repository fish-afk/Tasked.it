import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import "./Styles/App.css";

import AdminHome from "./Pages/Admin/AdminHome";
import FreelancerHome from "./Pages/Freelancer/FreelancerHome";

import ListFreelancers from "./Pages/Admin/ListFreelancers";
import ListAdmins from "./Pages/Admin/ListAdmins";
import ListMessages from "./Pages/Admin/ListMessages";
import ListProjects from "./Pages/Admin/ListProjects";
import ListTasks from "./Pages/Admin/ListTasks";
import ListRoles from "./Pages/Admin/ListRoles";
import ListClients from "./Pages/Admin/ListClients";
import ShowTasksByProject from "./Pages/Admin/ShowTasksByProject";

import ListAdminsFreelancer from "./Pages/Freelancer/ListAdmins";
import ListTasksFreelancer from "./Pages/Freelancer/ListTasks";
import ListMessagesFreelancer from "./Pages/Freelancer/ListMessages";
import ChangePasswordFreelancer from "./Pages/Freelancer/ChangePassword";

import AddNewFreelancer from "./Pages/Admin/AddNewFreelancer";
import AddNewAdmin from "./Pages/Admin/AddNewAdmin";
import AddNewClient from "./Pages/Admin/AddNewClient";
import AddNewTask from "./Pages/Admin/AddNewTask";
import AddNewRole from "./Pages/Admin/AddNewRole";
import AddNewProject from "./Pages/Admin/AddNewProject";

import EditFreelancer from "./Pages/Admin/EditFreelancer";
import EditAdminProfile from "./Pages/Admin/EditProfile";
import EditClient from "./Pages/Admin/EditClient";
import EditRole from "./Pages/Admin/EditRole";
import EditProject from "./Pages/Admin/EditProject";
import EditTask from "./Pages/Admin/EditTask";

import Index from "./Pages";
import AdminLogin from "./Pages/auth/AdminLogin";
import FreelancerLogin from "./Pages/auth/FreelancerLogin";
import Logout from "./Pages/auth/Logout";
import ProtectedRoute from "./Pages/auth/ProtectedRoute";
import ChangePassword from "./Pages/Admin/ChangePassword";
import AdminRedirect from "./Pages/Admin/AdminRedirect";
import FreelancerRedirect from "./Pages/Freelancer/FreelancerRedirect";

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
				console.log("Refreshed !");
			} else {
				Nav(`/${priv}/logout`);
			}
		} else {
			Nav(`/${priv}/logout`);
		}
	};

	useEffect(() => {
		const REFRESH_AUTH_MINUTE_MS: number = 300000;
		const interval = setInterval(() => {
			func();
		}, REFRESH_AUTH_MINUTE_MS);

		return () => clearInterval(interval);
	}, []);
	return (
		<React.Fragment>
			<Routes>
				<Route path="*" element={<h1>There's nothing here: 404!</h1>} />
				<Route path="/" element={<Index />} />
				<Route path="/admin">
					<Route element={<AdminRedirect />} index />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin/logout" element={<Logout accountype="admin" />} />
					<Route
						path="/admin/home"
						element={
							<ProtectedRoute>
								<AdminHome />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listfreelancers"
						element={
							<ProtectedRoute>
								<ListFreelancers />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listadmins"
						element={
							<ProtectedRoute>
								<ListAdmins />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listclients"
						element={
							<ProtectedRoute>
								<ListClients />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listprojects"
						element={
							<ProtectedRoute>
								<ListProjects />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listtasks"
						element={
							<ProtectedRoute>
								<ListTasks />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/showtasksbyproject"
						element={
							<ProtectedRoute>
								<ShowTasksByProject />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listmessages"
						element={
							<ProtectedRoute>
								<ListMessages />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/listroles"
						element={
							<ProtectedRoute>
								<ListRoles />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/newfreelancer"
						element={
							<ProtectedRoute>
								<AddNewFreelancer />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/newclient"
						element={
							<ProtectedRoute>
								<AddNewClient />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/newadmin"
						element={
							<ProtectedRoute>
								<AddNewAdmin />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/newtask"
						element={
							<ProtectedRoute>
								<AddNewTask />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/editfreelancer"
						element={
							<ProtectedRoute>
								<EditFreelancer />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/editprofile"
						element={
							<ProtectedRoute>
								<EditAdminProfile />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/editclient"
						element={
							<ProtectedRoute>
								<EditClient />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/edittask"
						element={
							<ProtectedRoute>
								<EditTask />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/editproject"
						element={
							<ProtectedRoute>
								<EditProject />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/editrole"
						element={
							<ProtectedRoute>
								<EditRole />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/newrole"
						element={
							<ProtectedRoute>
								<AddNewRole />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/newproject"
						element={
							<ProtectedRoute>
								<AddNewProject />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/changepassword"
						element={
							<ProtectedRoute>
								<ChangePassword />
							</ProtectedRoute>
						}
					/>

					<Route path="*" element={<h1>There's nothing here: 404!</h1>} />
				</Route>

				<Route path="/freelancer">
					<Route element={<FreelancerRedirect />} index />
					<Route path="/freelancer/login" element={<FreelancerLogin />} />
					<Route path="/freelancer/home" element={<FreelancerHome />} />
					<Route path="/freelancer/listadmins" element={<ListAdminsFreelancer />} />
					<Route path="/freelancer/listtasks" element={<ListTasksFreelancer />} />
					<Route path="/freelancer/listmessages" element={<ListMessagesFreelancer />} />
					<Route path="/freelancer/changepassword" element={<ChangePasswordFreelancer />} />
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
