import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import ClientTable from "../../Components/ClientTable";
import SERVER_URL from "../../Constants/server_url";
import { useNavigate } from "react-router-dom";

export default function ListClients() {
	const [clients, setclients] = useState([]);

	const Navigate = useNavigate();

	const func = async () => {
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/clients/getallclients`, {
			headers: {
				"taskedit-accesstoken": token,
				username: username,
				isadmin: "true",
			},
		});

		const data = await response.json();

		console.log(data);

		if (data.status == "SUCCESS") {
			setclients(data.data);
		}
	};

	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<Navbar priv="admin" />
			<div className="container">
				<div className="title text-center p-3">
					<h1 className="fw-light">Client list</h1>
				</div>

				<div className="d-flex justify-content-end pb-4">
					<button
						className="btn btn-primary me-5 ms-5"
						onClick={() => {
							Navigate("/admin/newclient");
						}}
					>
						<b>+</b> Add New Client
					</button>
				</div>

				<ClientTable clients={clients} />
			</div>
		</div>
	);
}
