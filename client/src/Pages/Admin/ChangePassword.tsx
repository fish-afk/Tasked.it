import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { ChangePasssword } from "../../Interfaces/changePassword";

export default function ChangePassword(): JSX.Element {
	const [formValues, setFormValues] = useState<ChangePasssword>({
		current_password: "",
		new_password: "",
		confirm_new_password: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { current_password, new_password, confirm_new_password } = formValues;

		if (new_password !== confirm_new_password) {
			Swal.fire({
				title: "New Passwords Dont match",
				timer: 3000,
				icon: "error",
			});
			return;
		}

		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		try {
			const response = await fetch(`${SERVER_URL}/admins/changepassword`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					current_password,
					new_password,
				}),
			});

			const data = await response.json();
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "Changed Password successfully",
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
				<div className="d-flex justify-content-center p-4">
					<h1>Update your details</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Current Password
						</label>
						<input
							required
							type="password"
							minLength={8}
							id="form6Example5"
							className="form-control"
							value={formValues.current_password}
							onChange={(e) =>
								setFormValues({
									...formValues,
									current_password: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							New Password
						</label>
						<input
							required
							type="password"
							minLength={8}
							id="form6Example5"
							className="form-control"
							value={formValues.new_password}
							onChange={(e) =>
								setFormValues({
									...formValues,
									new_password: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Confirm New Password
						</label>
						<input
							required
							type="password"
							minLength={8}
							id="form6Example5"
							className="form-control"
							value={formValues.confirm_new_password}
							onChange={(e) =>
								setFormValues({
									...formValues,
									confirm_new_password: e.target.value,
								})
							}
						/>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button className="btn btn-primary" onClick={(e) => handleSubmit}>
							CHANGE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
