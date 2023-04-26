import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import FreelancerTable from "../../Components/FreelancerTable";
import SERVER_URL from "../../Constants/server_url";

export default function ListFreelancers() {
	const Navigate = useNavigate();

	const [freelancers, setfreelancers] = useState([]);

	const func = async () => {
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(
			`${SERVER_URL}/freelancers/getallfreelancers`,
			{
				headers: {
					"taskedit-accesstoken": token,
					username: username,
					isadmin: "true",
				},
			},
		);

		const data = await response.json();

		console.log(data);

		if (data.status == "SUCCESS") {
			setfreelancers(data.data);
		}
	};

	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="title text-center p-3">
					<h1>Freelancer list</h1>
				</div>

				<div className="d-flex justify-content-end">
					<button
						className="btn btn-primary me-5 ms-5"
						onClick={() => {
							Navigate("/admin/newfreelancer");
						}}
					>
						<b>+</b> Add New Freelancer
					</button>
				</div>

				<FreelancerTable freelancers={freelancers} />
			</div>

			
		</div>
	);
}
