import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { EditAdmin } from "../../Interfaces/EditAdminProfile";

export default function EditAdminProfile(): JSX.Element {
	const [formValues, setFormValues] = useState<EditAdmin>({
		
		fullname: "",
		email: "",
		age: "",
		employee_title: "",
	});

	useEffect(() => {
		const func = async () => {
			
		};

		func();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const {

			email,
			age,
			fullname,
			employee_title = "staff",
		} = formValues;

		

		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		try {
			const response = await fetch(`${SERVER_URL}/admins/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					username: username_,
					age,
					email,
					fullname,
					employee_title
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
				<div className="d-flex justify-content-center p-4">
					<h1>Update your details</h1>
				</div>
				
				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="row mb-4">
						
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

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example1">
							Employee title
						</label>
						<input
							required
							type="text"
							id="form6Example2"
							className="form-control"
							value={formValues.employee_title}
							onChange={(e) =>
								setFormValues({
									...formValues,
									employee_title: e.target.value,
								})
							}
						/>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button className="btn btn-primary" onClick={(e) => handleSubmit}>
							SAVE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
