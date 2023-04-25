import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";

const SERVER_URL = "http://localhost:4455";

interface Numbers {
	Freelancers: number;
	Admins: number;
	Clients: number;
	Projects: number;
	Tasks: number;
}

export default function AdminHome() {
	const [numbers, setnumbers] = useState<Numbers>();

	const func = async () => {
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/admins/getnumbers`, {
			method: "POST",
			headers: {
				"taskedit-accesstoken": token,
				username: username,
				isadmin: "true",
			},
		});

		const data = await response.json();

		console.log(data);

		if (data.status == "SUCCESS") {
			setnumbers(data.result);
		}
	};

	useEffect(() => {
		func();
	}, []);

	const getDate = () => {
		const today = new Date();
		const day = today.getDate();
		const month = today.toLocaleString("default", { month: "long" });
		const year = today.getFullYear();

		const daySuffix = (day: number) => {
			if (day > 3 && day < 21) return "th";
			switch (day % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		const formattedDate = `${day}${daySuffix(day)} ${month} ${year}`;

		return formattedDate;
	};

	const username = JSON.stringify(localStorage.getItem("username")).replaceAll(
		'"',
		"",
	);
	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="text-center container">
				<h1 className="p-4">Welcome {username}.</h1>
				<h3 className="p-2">Todays Date: {getDate()}</h3>
				<h3 className="p-2">
					Number of current freelancers: {numbers?.Freelancers}
				</h3>
				<h3 className="p-2">Number of current admins: {numbers?.Admins}</h3>
				<h3 className="p-2">Number of active projects: {numbers?.Projects}</h3>
				<h3 className="p-2">Total tasks due today: {numbers?.Tasks}</h3>
			</div>
		</div>
	);
}
