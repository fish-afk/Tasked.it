import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import RolesCheckboxList from "../../Components/RolesCheckBoxList";
import { Role } from "../../Interfaces/Roles";
import SERVER_URL from "../../Constants/server_url";

export default function AddNewFreelancer() {
	const [roles, setroles] = useState([]);
	const [chosenRoles, setchosenRoles] = useState<Role[]>([]);

	useEffect(() => {
		const func = async () => {
			const token = JSON.stringify(
				localStorage.getItem("taskedit-accesstoken"),
			).replaceAll('"', "");

			const username = JSON.stringify(
				localStorage.getItem("username"),
			).replaceAll('"', "");

			const response = await fetch(`${SERVER_URL}/roles/getallroles`, {
				headers: {
					"taskedit-accesstoken": token,
					username: username,
					isadmin: "true",
				},
				method: "POST",
			});

			const data = await response.json();

			console.log(data);
			if (data.status == "SUCCESS") {
				setroles(data.data);
			}
		};

		func();
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center">
					<h1>Add new freelancer</h1>
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

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example6">
							Roles (Tick the ones that apply)
						</label>

						<RolesCheckboxList
							Roles={roles}
							setchosenRoles={setchosenRoles}
							chosenRoles={chosenRoles}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<button
							type="submit"
							className="btn btn-primary btn-block mb-4 pe-5 ps-5"
						>
							Add Freelancer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
