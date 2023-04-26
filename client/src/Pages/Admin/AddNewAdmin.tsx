import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";

export default function AddNewAdmin() {

	useEffect(() => {
		const func = async () => {
			
		};

		func();
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h1>Add new admin</h1>
				</div>
				<form className="bg-dark p-5 rounded-3">
					<div className="row mb-4">
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Username
								</label>
								<input
									required
									type="text"
									id="form6Example1"
									className="form-control"
								/>
							</div>
						</div>
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Fullname
								</label>
								<input
									required
									type="text"
									id="form6Example2"
									className="form-control"
								/>
							</div>
						</div>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Email
						</label>
						<input
							required
							type="email"
							id="form6Example5"
							className="form-control"
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example3">
							Age
						</label>
						<input
							required
							maxLength={3}
							id="form6Example3"
							type="number"
							className="form-control"
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example4">
							Employee title
						</label>
						<input
							required
							type="text"
							id="form6Example4"
							className="form-control"
						/>
					</div>

					<div className="row mb-4">
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Password
								</label>
								<input
									required
									type="password"
									id="form6Example1"
									className="form-control"
								/>
							</div>
						</div>
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Confirm password
								</label>
								<input
									required
									type="password"
									id="form6Example2"
									className="form-control"
								/>
							</div>
						</div>
					</div>

					<div className="d-flex justify-content-center">
						<button
							type="submit"
							className="btn btn-primary btn-block mb-4 pe-5 ps-5 mt-5"
						>
							Add Admin
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
