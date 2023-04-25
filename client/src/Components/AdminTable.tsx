import React from "react";

interface Admin {
	username: string;
	fullname: string;
	employee_title: string;
	email: string;
}

interface Props {
	admins: Admin[];
}

const AdminTable = ({ admins }: Props) => {
	return (
		<table className="table table-hover table-dark p-5">
			<thead className="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Username</th>
					<th scope="col">Fullname</th>
					<th scope="col">Title</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{admins.map((Admin, index) => (
					<tr key={index}>
						<th scope="row">{index + 1}</th>
						<td>{Admin.username}</td>
						<td>{Admin.fullname}</td>
						<td>{Admin.employee_title}</td>
						<td>{Admin.email}</td>
						
						
						<td>
							<button className="btn btn-warning">Message</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AdminTable;
