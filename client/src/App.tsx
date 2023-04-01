import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import React from "react";

import AdminHome from "./Pages/Admin/AdminHome";
import FreelancerHome from "./Pages/Freelancer/FreelancerHome";
import Index from "./Pages";
import PrivateRoutes from "./Pages/auth/PrivateRoute";
import AdminLogin from "./Pages/auth/AdminLogin";
import FreelancerLogin from "./Pages/auth/FreelancerLogin";

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/admin">
					<Route path="/admin/login" element={<AdminLogin />} />
				</Route>

				<Route path="/freelancer">
					<Route path="/freelancer/login" element={<FreelancerLogin />} />
					<Route path="/freelancer/login" element={<FreelancerLogin />} />
				</Route>
			</Routes>
		</React.Fragment>
	);
}

export default App;
