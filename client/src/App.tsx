import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/admin">
					<Route element={<AdminRedirect />} index />
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin/home" element={<AdminHome />} />
					<Route path="/admin/logout" element={<Logout accountype="admin" />} />
					<Route path="/admin/listfreelancers" element={<ListFreelancers />} />
					<Route path="/admin/listadmins" element={<ListAdmins />} />
					<Route path="/admin/listprojects" element={<ListProjects />} />
					<Route path="/admin/listmessages" element={<ListMessages />} />
					<Route path="/admin/listroles" element={<ListRoles />} />
					
				</Route>

				<Route path="/freelancer">
					<Route element={<FreelancerRedirect />} index />
					<Route path="/freelancer/login" element={<FreelancerLogin />} />
					<Route path="/freelancer/home" element={<FreelancerHome />} />
					<Route
						path="/freelancer/logout"
						element={<Logout accountype="freelancer" />}
					/>
				</Route>
			</Routes>
		</React.Fragment>
	);
}

export default App;
