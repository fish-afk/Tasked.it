import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { Task } from "../../Interfaces/Task";
import { useLocation } from "react-router-dom";

export default function EditTask(): JSX.Element {
    const LocationHook = useLocation();
	const [formValues, setFormValues] = useState<Task>({
		id: 0,
		name: "",
		description: "",
		price_allocation: 0,
		project_id: "",
		due_date: "",
		Freelancer_id: "",
		completed: false,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const {
			name,
			description,
			price_allocation,
			project_id,
			due_date,
			Freelancer_id,
		} = formValues;

		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		try {
			const response = await fetch(`${SERVER_URL}/tasks/edittask`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					task_id: LocationHook.state.id,
					name,
					description,
					price_allocation,
					project_id: LocationHook.state.project_id,
					due_date,
					Freelancer_id,
				}),
			});

			const data = await response.json();
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "Updated Task successfully",
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
					<h1>Edit Task</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Name of Task
						</label>
						<input
							required
							type="text"
							placeholder={LocationHook.state.name}
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
							Description
						</label>
						<input
							required
							type="text"
							placeholder={LocationHook.state.description}
							minLength={10}
							maxLength={100}
							id="form6Example5"
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									description: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Due date
						</label>
						<input
							required
							type="date"
							placeholder={LocationHook.state.date}
							id="form6Example5"
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									due_date: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Price Allocation ($)
						</label>
						<input
							required
							type="number"
							placeholder={LocationHook.state.price_allocation}
							min={100}
							id="form6Example5"
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									price_allocation: e.target.value,
								})
							}
						/>
					</div>

					

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Freelancer Assigned to
						</label>
						<input
							required
							type="text"
							id="form6Example5"
							placeholder={LocationHook.state.Freelancer_id}
							className="form-control"
							onChange={(e) =>
								setFormValues({
									...formValues,
									Freelancer_id: e.target.value,
								})
							}
						/>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button className="btn btn-primary" onClick={(e) => handleSubmit}>
							SAVE TASK
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
