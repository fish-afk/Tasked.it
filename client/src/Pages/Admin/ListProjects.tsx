import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Project } from "../../Interfaces/Project";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ListProjects() {
	const Navigate = useNavigate();
	const [projects, setprojects] = useState<Project[]>([]);

	const delete_role = (Project_id: number) => {
		const msg: string = "Are you sure you want to remove this Project?";
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

				const response = await fetch(`${SERVER_URL}/projects/deleteproject`, {
					headers: {
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
						"Content-Type": "application/json",
					},

					method: "DELETE",
					body: JSON.stringify({
						id: Project_id,
					}),
				});

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: "Deleted Project with id: " + Project_id + " Successfully",
						timer: 3000,
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					Swal.fire({
						title: "Error deleting Project. Try later",
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

			const response = await fetch(`${SERVER_URL}/projects/getallprojects`, {
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
				setprojects(data.data);
			}
		};

		func();
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="title text-center p-3">
					<h1 className="fw-light">List of Projects</h1>
				</div>

				<div className="container-fluid mt-3">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{projects.map((Project) => (
							<div className="col p-2" key={Project.id}>
								<div className="card h-100 border border-info rounded-2 bg-dark text-white">
									<div className="card-body">
										<h5 className="card-title">Name: {Project.name}</h5>
										<p className="card-text">
											Duration given in days: {Project.duration_in_days}
										</p>
										<p className="card-text">
											Funding: ${Project.total_funding}
										</p>
										<p className="card-text">Client id: {Project.client}</p>
										<p className="card-text">Project Admin: {Project.Admin}</p>
										<p className="card-text">
											Completed: {Project.completed == 0 ? "false" : "true"}
										</p>
										<button
											className="btn btn-warning me-2"
											onClick={() => {
												Navigate("/admin/editproject", {
													state: { ...Project },
												});
											}}
										>
											Edit
										</button>
										<button
											className="btn btn-danger me-2"
											onClick={() => {
												delete_role(Project.id);
											}}
										>
											Remove
										</button>
										<button className="btn btn-info">Show tasks</button>
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
							Navigate("/admin/newproject");
						}}
					>
						+ Create New Project
					</button>
				</div>
			</div>
		</div>
	);
}
