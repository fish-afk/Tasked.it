import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Role } from "../../Interfaces/Roles";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ListRoles() {
  const Navigate = useNavigate()
	const [roles, setroles] = useState<Role[]>([]);

	const delete_role = (Role_id: number) => {
		const msg: string = "Are you sure you want to remove this Role?";
		const txt: string =
			"This will un-link it from any freelancers its attached to !";
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

				const response = await fetch(`${SERVER_URL}/roles/deleterole`, {
					headers: {
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
						"Content-Type": "application/json",
					},

					method: "DELETE",
					body: JSON.stringify({
						id: Role_id,
					}),
				});

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: "Deleted Role with id: " + Role_id + " Successfully",
						timer: 3000,
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					Swal.fire({
						title: "Error deleting Role. Try later",
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
				<div className="title text-center p-3">
					<h1 className="fw-light">Current Freelancer roles in the system</h1>
				</div>

				<div className="container-fluid mt-3">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{roles.map((role) => (
							<div className="col" key={role.id}>
								<div className="card h-100">
									<div className="card-body">
										<h5 className="card-title">{role.name}</h5>
										<p className="card-text">{role.description}</p>
                    <button className="btn btn-warning me-2" onClick={() => {
                      Navigate('/admin/editrole',  {
                        state: {...role},
                      });
                    }}>Edit</button>
										<button
											className="btn btn-danger"
											onClick={() => {
												delete_role(role.id);
											}}
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="d-flex justify-content-center pt-4">
					<button className="btn btn-primary fw-bold">+ Add New Role</button>
				</div>
			</div>
		</div>
	);
}
