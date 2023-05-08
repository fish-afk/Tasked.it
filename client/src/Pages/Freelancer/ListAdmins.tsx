import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AdminTable from "../../Components/AdminTable";
import SERVER_URL from "../../Constants/server_url";
import { useNavigate } from "react-router-dom";

export default function ListAdminsFreelancer() {
	const [admins, setadmins] = useState([]);

	const Navigate = useNavigate();

	const func = async () => {
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/admins/getalladmins`, {
			headers: {
				"taskedit-accesstoken": token,
				username: username,
				isadmin: "false",
			},
		});

		const data = await response.json();

		console.log(data);

		if (data.status == "SUCCESS") {
			setadmins(data.data);
		}
	};

	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<Navbar priv="freelancer" />
			<div className="container">
				<div className="title text-center p-3">
					<h1 className="fw-light">Admin list</h1>
				</div>

				

				<AdminTable admins={admins} />
			</div>
		</div>
	);
}
