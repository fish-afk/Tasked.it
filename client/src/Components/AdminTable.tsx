/* This is a TypeScript React component that defines a table to display a list of admins. It imports
the React library and the Admin interface from a separate file. The component takes in an array of
admins as a prop and maps over the array to display each admin's information in a table row. It also
includes a button to message each admin. The component is exported as the default export. */

import Swal from "sweetalert2";
import { Admin } from "../Interfaces/Admin";
import SERVER_URL from "../Constants/server_url";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

interface Props {
	admins: Admin[];
}

const AdminTable = ({ admins }: Props) => {
	const [show, setShow] = useState(false);
	const [AdminChosen, setAdminChosen] = useState<Admin>();
	const handleClose = () => setShow(false);
	const handleShow = (Admin: Admin) => {
		setShow(true);
		setAdminChosen(Admin);
	};

	return (
		<div className="container-fluid">
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
								<Button
									variant="warning"
									onClick={() => {
										handleShow(Admin);
									}}
								>
									Message
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Modal show={show} onHide={handleClose} variant="dark">
				<Modal.Header closeButton>
					<Modal.Title>Send Message</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Send message to {AdminChosen?.username}</Form.Label>
							<Form.Control
								required
								minLength={50}
								as="textarea"
								id="message"
								type="text"
								placeholder="Enter message here"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							const message: any = (
								document.getElementById("message") as HTMLInputElement
							).value;

							if (message?.length < 7) {
								alert("Message not long enough.");
								return;
							}

							const token = JSON.stringify(
								localStorage.getItem("taskedit-accesstoken"),
							).replaceAll('"', "");

							const username = JSON.stringify(
								localStorage.getItem("username"),
							).replaceAll('"', "");

							const response = await fetch(
								`${SERVER_URL}/messages/sendmessage`,
								{
									headers: {
										"taskedit-accesstoken": token,
										username: username,
										isadmin: JSON.stringify(localStorage.getItem('priv') == 'freelancer') ? "false" : "true",
										"Content-Type": "application/json",
									},
									method: "POST",
									body: JSON.stringify({
										Message: message,
										to: AdminChosen?.username,
										to_usertype: "Admin",
									}),
								},
							);

							const data = await response.json();

							console.log(data);

							if (data.status == "SUCCESS") {
								Swal.fire({
									title: "Message sent",
									timer: 3000,
									icon: "success",
								}).then(() => {
									location.reload();
								});
							} else {
								Swal.fire({
									title: "An error occured, try later",
									timer: 3000,
									icon: "error",
								}).then(() => {
									location.reload();
								});
							}
						}}
					>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default AdminTable;
