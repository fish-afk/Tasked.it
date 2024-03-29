import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";

export default function AdminLogin() {
	const Navigate = useNavigate();

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch(`${SERVER_URL}/admins/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (data.status == "SUCCESS" || (data.accessToken && data.refreshToken)) {
				localStorage.setItem("taskedit-accesstoken", data.accessToken);
				localStorage.setItem("taskedit-refreshtoken", data.refreshToken);
				localStorage.setItem("username", username);
				localStorage.setItem("priv", "admin");
				Navigate("/admin/home");
			} else {
				Swal.fire({
					title: "Wrong credentials.",
					timer: 3000,
					icon: "error",
				});
			}
		} catch (error: any) {
			Swal.fire({
				title: "Unknown error. try later",
				timer: 3000,
				icon: "error",
			});
		}
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = (document.getElementById("username") as HTMLInputElement)
			.value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;
		login(username, password);
	};

	return (
		<section className="vh-100 gradient-custom">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div
							className="card bg-dark text-white"
							style={{ borderRadius: "1rem" }}
						>
							<div className="card-body p-5 text-center">
								<div className="mb-md-5 mt-md-4 pb-5">
									<h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
									<p className="text-white-50 mb-5">
										Please enter your username and password
									</p>

									<form onSubmit={handleLogin}>
										<div className="form-outline form-white mb-4">
											<input
												required
												type="text"
												id="username"
												className="form-control form-control-lg"
											/>
											<label className="form-label" htmlFor="typeEmailX">
												Username
											</label>
										</div>

										<div className="form-outline form-white mb-4">
											<input
												required
												type="password"
												id="password"
												className="form-control form-control-lg"
											/>
											<label className="form-label" htmlFor="typePasswordX">
												Password
											</label>
										</div>

										<p className="small mb-5 pb-lg-2">
											<a className="text-white-50" href="#!">
												Forgot password?
											</a>
										</p>

										<button
											className="btn btn-outline-warning btn-lg px-5 me-2"
											type="button"
											onClick={() => {
												Navigate("/");
											}}
										>
											Back
										</button>

										<button
											className="btn btn-outline-primary btn-lg px-5 ms-2"
											type="submit"
										>
											Login
										</button>
									</form>

									<div className="d-flex justify-content-center text-center mt-4 pt-1">
										<a href="#!" className="text-white">
											<i className="fab fa-facebook-f fa-lg"></i>
										</a>
										<a href="#!" className="text-white">
											<i className="fab fa-twitter fa-lg mx-4 px-2"></i>
										</a>
										<a href="#!" className="text-white">
											<i className="fab fa-google fa-lg"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
