import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
	return (
		<div className="container my-5">
			<h1 className="text-center mb-4">Welcome to VTE Tasked.it</h1>
			<h3 className="text-center mb-4 mt-5">Login as :</h3>
			<div className="d-flex justify-content-center">
				<div className="btn-group" role="group">
					<Link to="/admin/login" className="btn rounded-2 btn-primary me-1">
						Admin
					</Link>

					<Link
						to={"/freelancer/login"}
						className="btn rounded-2 btn-primary ms-1"
					>
						Freelancer
					</Link>
				</div>
			</div>
		</div>
	);
}
