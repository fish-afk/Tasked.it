import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Task } from "../../Interfaces/Task";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TiTick } from 'react-icons/ti';

export default function ListTasks() {
	const Navigate = useNavigate();
	const [tasks, settasks] = useState<Task[]>([]);

	const delete_task = (Task_id: number) => {
		const msg: string = "Are you sure you want to remove this Task?";
		const txt: string =
			"This will un-link it from any freelancers its attached to and also any tasks !";
		Swal.fire({
			title: msg,
			text: txt,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const token = JSON.stringify(
					localStorage.getItem("taskedit-accesstoken"),
				).replaceAll('"', "");

				const username = JSON.stringify(
					localStorage.getItem("username"),
				).replaceAll('"', "");

				const response = await fetch(`${SERVER_URL}/tasks/deletetask`, {
					headers: {
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
						"Content-Type": "application/json",
					},

					method: "DELETE",
					body: JSON.stringify({
						id: Task_id,
					}),
				});

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: "Deleted Task with id: " + Task_id + " Successfully",
						timer: 3000,
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					Swal.fire({
						title: "Error deleting Task. Try later",
						timer: 3000,
						icon: "error",
					}).then(() => {
						location.reload();
					});
				}
			}
		});
	};


	const Markascompleted = (Task_id: number) => {
		const msg: string = "Are you sure you want to mark this Task as complete?";
		
		Swal.fire({
			title: msg,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const token = JSON.stringify(
					localStorage.getItem("taskedit-accesstoken"),
				).replaceAll('"', "");

				const username = JSON.stringify(
					localStorage.getItem("username"),
				).replaceAll('"', "");

				const response = await fetch(`${SERVER_URL}/tasks/markascomplete`, {
					headers: {
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
						"Content-Type": "application/json",
					},

					method: "PATCH",
					body: JSON.stringify({
						id: Task_id,
					}),
				});

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: "marked Task with id: " + Task_id + " as complete.",
						timer: 3000,
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					Swal.fire({
						title: "Error completing Task. Try later",
						timer: 3000,
						icon: "error",
					}).then(() => {
						location.reload();
					});
				}
			}
		});
	};

	useEffect(() => {
		const func = async () => {
			const token = JSON.stringify(
				localStorage.getItem("taskedit-accesstoken"),
			).replaceAll('"', "");

			const username = JSON.stringify(
				localStorage.getItem("username"),
			).replaceAll('"', "");

			const response = await fetch(`${SERVER_URL}/tasks/getalltasks`, {
				headers: {
					"taskedit-accesstoken": token,
					username: username,
					isadmin: "true",
				},
				method: "GET",
			});

			const data = await response.json();

			console.log(data);
			if (data.status == "SUCCESS") {
				settasks(data.data);
			}
		};

		func();
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="title text-center p-3">
					<h1 className="fw-light">List of tasks</h1>
				</div>

				<div className="container-fluid mt-3">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{tasks.map((Task) => (
							<div className="col p-2" key={Task.id}>
								<div className="card h-100 border border-info rounded-2 task text-white">
									<div className="card-body">
										<h5 className="card-title">Name: {Task.name}</h5>
										<p className="card-text">Description: {Task.description}</p>
										<p className="card-text">
											Price allocated: ${Task.price_allocation}
										</p>
										<p className="card-text">Due date: {Task.due_date}</p>
										<p className="card-text">Project id: {Task.project_id}</p>

										<p className="card-text">
											Freelancer assigned to: {Task.Freelancer_id}
										</p>

										<button
											className="btn btn-warning me-2"
											onClick={() => {
												Navigate("/admin/edittask", {
													state: { ...Task },
												});
											}}
										>
											Edit
										</button>
										<button
											className="btn btn-danger me-2"
											onClick={() => {
												delete_task(Task.id);
											}}
										>
											Remove
										</button>

										{Task.completed == 0 ? (
											<button
												className="btn btn-info me-2"
												onClick={() => {
													Markascompleted(Task.id);
												}}
											>
												Mark as completed
											</button>
										) : (
											<p className="card-text btn text-success fw-bold pt-2">
												Completed <TiTick />
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="d-flex justify-content-center pt-4">
					<button
						className="btn btn-primary fw-bold"
						onClick={() => {
							Navigate("/admin/newtask");
						}}
					>
						+ Create New Task
					</button>
				</div>
			</div>
		</div>
	);
}
