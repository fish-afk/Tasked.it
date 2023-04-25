import React from "react";
import Swal from "sweetalert2";

interface Freelancer {
	username: string;
	fullname: string;
	age: string;
	email: string;
}

interface Props {
	freelancers: Freelancer[];
}

const FreelancerTable = ({ freelancers }: Props) => {
	const SERVER_URL = "http://localhost:4455";

	const delete_freelancer = (freelancer_username: string) => {

		const msg: string = "Are you sure you want to remove this freelancer?"
		const txt: string = "This will un-link them from any projects they're attached to !";
		Swal.fire({
			title: msg,
			text:  txt,
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

				const response = await fetch(
					`${SERVER_URL}/freelancers/deletefreelancer`,
					{
						headers: {
							"taskedit-accesstoken": token,
							username: username,
							isadmin: "true",
							"Content-Type": "application/json",
						},

						method: "DELETE",
						body: JSON.stringify({
							username: freelancer_username,
						}),
					},
				);

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: 'Deleted ' + freelancer_username + " Successfully",
						timer: 3000,
						icon: 'success',
					}).then(() => {
						location.reload();
					})
					
				} else {
					Swal.fire({
						title: "Error deleting freelancer. Try later",
						timer: 3000,
						icon: "error",
					}).then(() => {
						location.reload();
					});
				}
			}
		});
	};

	return (
		<table className="table table-hover table-dark p-5">
			<thead className="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Username</th>
					<th scope="col">Fullname</th>
					<th scope="col">Age</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{freelancers.map((freelancer, index) => (
					<tr key={index}>
						<th scope="row">{index + 1}</th>
						<td>{freelancer.username}</td>
						<td>{freelancer.fullname}</td>
						<td>{freelancer.age}</td>
						<td>{freelancer.email}</td>
						<td>
							<button className="btn btn-primary">Edit</button>
						</td>
						<td>
							<button
								className="btn btn-danger"
								onClick={() => {
									delete_freelancer(freelancer.username);
								}}
							>
								Remove
							</button>
						</td>
						<td>
							<button className="btn btn-warning">Message</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default FreelancerTable;
