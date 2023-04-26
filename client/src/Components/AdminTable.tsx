/* This is a TypeScript React component that defines a table to display a list of admins. It imports
the React library and the Admin interface from a separate file. The component takes in an array of
admins as a prop and maps over the array to display each admin's information in a table row. It also
includes a button to message each admin. The component is exported as the default export. */

import React from "react";
import { Admin } from "../Interfaces/Admin";

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
