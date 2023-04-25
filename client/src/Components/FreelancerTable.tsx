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

	
	const delete_freelancer = (username: string) => {
		Swal.fire({
			title: "Are you sure you want to remove this freelancer? this will un-link them from any projects they're attached to.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				alert('Removed ' + username)
			}
		});
	}

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
                        <td><button className="btn btn-primary">Edit</button></td>
						<td><button className="btn btn-danger" onClick={() => {
							delete_freelancer(freelancer.username);
						}}>Remove</button></td>
                        <td><button className="btn btn-warning">Message</button></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default FreelancerTable;
