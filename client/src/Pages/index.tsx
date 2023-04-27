import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/logo.png" 

export default function Index() {
	return (
		<div className="container my-5">
			<div className="d-flex justify-content-center p-5">
				{" "}
				<img src={Logo} width={300} />
			</div>

			<h1 className="text-center mb-4 fw-light">Welcome to VTE Tasked.it Dashboard</h1>
			<h3 className="text-center mb-4 mt-5 fw-normal">Login as</h3>
			<div className="d-flex justify-content-center">
				<div className="btn-group" role="group">
					<Link
						to="/admin/login"
						className="btn rounded-2 btn-primary me-1 ps-5 pe-5"
					>
						Admin
					</Link>

					<Link
						to={"/freelancer/login"}
						className="btn rounded-2 btn-primary ms-1 ps-5 pe-5"
					>
						Freelancer
					</Link>
				</div>
			</div>
		</div>
	);
}
