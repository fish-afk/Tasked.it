/* This is a TypeScript React component that defines a table to display a list of clients. It imports
the React library and the Client interface from a separate file. The component takes in an array of
clients as a prop and maps over the array to display each Client's information in a table row. It also
includes a button to message each Client. The component is exported as the default export. */

import { Client } from "../Interfaces/Client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../Constants/server_url";
import Swal from "sweetalert2";

interface Props {
	clients: Client[];
}

const ClientTable = ({ clients }: Props) => {

    const Navigate = useNavigate()


    const delete_client = (client_username: string) => {
			const msg: string = "Are you sure you want to remove this client?";
			const txt: string =
				"This will delete any projects they are attached to !";
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

					const response = await fetch(
						`${SERVER_URL}/clients/deleteclient`,
						{
							headers: {
								"taskedit-accesstoken": token,
								username: username,
								isadmin: "true",
								"Content-Type": "application/json",
							},

							method: "DELETE",
							body: JSON.stringify({
								name: client_username,
							}),
						},
					);

					const data = await response.json();

					console.log(data);

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Deleted " + client_username + " Successfully",
							timer: 3000,
							icon: "success",
						}).then(() => {
							location.reload();
						});
					} else {
						Swal.fire({
							title: "Error deleting client. Try later",
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
		<div className="container-fluid">
			<table className="table table-hover table-dark p-5">
				<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Description</th>
						<th scope="col">Email</th>
					</tr>
				</thead>
				<tbody>
					{clients.map((Client, index) => (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>{Client.name}</td>
							<td>{Client.description}</td>
							<td>{Client.email}</td>
							<td>
								<button
									className="btn btn-primary"
									onClick={() => {
										Navigate("/admin/editclient", {
											state: { ...Client },
										});
									}}
								>
									Edit
								</button>
							</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => {
										delete_client(Client.name);
									}}
								>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClientTable;
