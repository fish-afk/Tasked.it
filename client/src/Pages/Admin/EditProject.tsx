import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { Project } from "../../Interfaces/Project";
import { useLocation } from "react-router-dom";

export default function EditProject(): JSX.Element {
	const locationHook = useLocation();
	const [formValues, setFormValues] = useState<Project>({
		id: 0,
		name: "",
		duration_in_days: 0,
		Admin: "",
		client: 0, // client not needed here
		completed: false, // completed not needed as it auto completes when all tasks complete
		total_funding: 0,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { name, duration_in_days, Admin, total_funding } = formValues;

		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		try {
			const response = await fetch(`${SERVER_URL}/projects/editproject`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					id: locationHook.state.id,
					name,
					duration_in_days,
					Admin,
					total_funding,
				}),
			});

			const data = await response.json();
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "Updated project successfully",
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
					<h1>Edit project details</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Name of project
						</label>
						<input
							required
							placeholder={locationHook.state.name}
							type="text"
							minLength={4}
							id="form6Example5"
							className="form-control"
							value={formValues.name}
							onChange={(e) =>
								setFormValues({
									...formValues,
									name: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Duration (in days)
						</label>
						<input
							required
							placeholder={locationHook.state.duration_in_days}
							type="number"
							min={1}
							id="form6Example5"
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									duration_in_days: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Total Funding ($)
						</label>
						<input
							required
							placeholder={locationHook.state.total_funding}
							type="number"
							min={100}
							id="form6Example5"
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									total_funding: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Project Admin
						</label>
						<input
							required
							placeholder={locationHook.state.Admin}
							id="form6Example5"
							className="form-control"
							value={formValues.Admin}
							onChange={(e) =>
								setFormValues({
									...formValues,
									Admin: e.target.value,
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
