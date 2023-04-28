import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { FreelancerNew } from "../../Interfaces/FreelancerNew";
import { Role } from "../../Interfaces/Roles";
import RolesCheckboxList from "../../Components/RolesCheckBoxList";

export default function AddNewFreelancer(): JSX.Element {
	const [chosenRoles, setchosenRoles] = useState<Role[]>([]);
	const [fetchedroles, setfetchedroles] = useState([]);

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
				setfetchedroles(data.data);
			}
		};

		func();
	}, []);

	const [formValues, setFormValues] = useState<FreelancerNew>({
		username: "",
		fullname: "",
		email: "",
		age: "",
		password: "",
		confirm_password: "",
	});

	useEffect(() => {
		const func = async () => {};

		func();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { username, password, email, age, fullname, confirm_password } =
			formValues;

		if (password !== confirm_password) {
			Swal.fire({
				title: "Passwords dont match",
				timer: 3000,
				icon: "error",
			});
			return;
		}

		if (chosenRoles?.length < 1) {
			Swal.fire({
				title: "Choose atleast 1 role",
				timer: 3000,
				icon: "error",
			});
			return;
		}

		try {
			const token = JSON.stringify(
				localStorage.getItem("taskedit-accesstoken"),
			).replaceAll('"', "");

			const username_ = JSON.stringify(
				localStorage.getItem("username"),
			).replaceAll('"', "");

			const response = await fetch(`${SERVER_URL}/freelancers/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					username,
					password,
					email,
					age,
					fullname,
					roles: chosenRoles,
				}),
			});

			const data = await response.json();
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "Registered successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: data.message,
					timer: 3000,
					icon: "error",
				}).then(() => {
					location.reload();
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<Navbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h1>Add new freelancer</h1>
				</div>
				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
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
									value={formValues.username}
									onChange={(e) =>
										setFormValues({
											...formValues,
											username: e.target.value,
										})
									}
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
									value={formValues.fullname}
									onChange={(e) =>
										setFormValues({
											...formValues,
											fullname: e.target.value,
										})
									}
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
							value={formValues.email}
							onChange={(e) =>
								setFormValues({
									...formValues,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Age
						</label>
						<input
							min={10}
							max={150}
							required
							type="number"
							id="form6Example5"
							className="form-control"
							value={formValues.age}
							onChange={(e) =>
								setFormValues({
									...formValues,
									age: e.target.value,
								})
							}
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
									minLength={8}
									id="form6Example1"
									className="form-control"
									value={formValues.password}
									onChange={(e) =>
										setFormValues({
											...formValues,
											password: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Confirm Password
								</label>
								<input
									required
									type="password"
									minLength={8}
									id="form6Example2"
									className="form-control"
									value={formValues.confirm_password}
									onChange={(e) =>
										setFormValues({
											...formValues,
											confirm_password: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example6">
							Roles (Tick the ones that apply) :
						</label>

						<RolesCheckboxList
							Roles={fetchedroles}
							setchosenRoles={setchosenRoles}
							chosenRoles={chosenRoles}
						/>
					</div>
					<div className="d-flex justify-content-center pt-3">
						<button className="btn btn-primary" onClick={() => handleSubmit}>
							Add Freelancer
						</button>
					</div>

					<div
						id="recaptcha"
						className="g-recaptcha"
						data-sitekey="6LdjmMElAAAAABfEmkPagcUOBmCcuYlUkVYVyVHO"
						data-callback="onSubmit"
						data-size="invisible"
					></div>
					<script src="https://www.google.com/recaptcha/api.js"></script>
				</form>
			</div>
		</div>
	);
}
