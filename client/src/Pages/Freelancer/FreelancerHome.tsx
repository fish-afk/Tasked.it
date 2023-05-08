import React, { useEffect, useState } from "react";
import SERVER_URL from "../../Constants/server_url";
import Navbar from "../../Components/Navbar";
import { Role } from "../../Interfaces/Role";

export default function FreelancerHome() {
	const [roles, setroles] = useState<Role[]>([]);
	const [loading, setloading] = useState(false)

	const username = JSON.stringify(localStorage.getItem("username")).replaceAll(
		'"',
		"",
	);
	const func = async () => {
		setloading(true)
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/freelancers/getmyroles`, {
			headers: {
				"taskedit-accesstoken": token,
				username: username,
				isadmin: "false",
			},
		});

		const data = await response.json();

		
		console.log(data);

		if (data.status == "SUCCESS") {
			setroles(data.data);
		}

		setloading(false)
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

	return loading ? <></> : (
		<div className="d-flex ">
			<Navbar priv="freelancer" />
			<div className="text-center container-fluid">
				<h1 className="p-4">Welcome {username}.</h1>
				<h3 className="pb-4">Todays Date: {getDate()}</h3>
				{roles?.map((role) => (
					<h3 className="text-dark" key={role.id}>{role.name}</h3>
				))}
			</div>
		</div>
	);
}
