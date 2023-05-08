import React, { useEffect, useState } from "react";
import SERVER_URL from "../../Constants/server_url";
import Navbar from "../../Components/Navbar";
import { FreelancerRole } from "../../Interfaces/FreelancerRole";
import { Role } from "../../Interfaces/Role";
import { FreelancerNumbers } from "../../Interfaces/FreelancerNumbers";

export default function FreelancerHome() {
	const [myroles, setmyroles] = useState<FreelancerRole[]>([]);
	const [roles, setroles] = useState<Role[]>([]);
	const [loading, setloading] = useState(false)
	const [numbers, setnumbers] = useState<FreelancerNumbers>();

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
			setmyroles(data.data);
		}

		setloading(false)
	};

	const func2 = async () => {
		setloading(true);
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/roles/getallroles`, {
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

		setloading(false);
	};

	const func3 = async () => {
		setloading(true);
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		const response = await fetch(`${SERVER_URL}/freelancers/getnumbers`, {
			headers: {
				"taskedit-accesstoken": token,
				username: username,
				isadmin: "false",
			},
		});

		const data = await response.json();

		console.log(data);

		if (data.status == "SUCCESS") {
			setnumbers(data.result);
		}

		setloading(false);
	};


	useEffect(() => {
		func();
		func2();
		func3();
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


	const get_role_name = (role_id: number) => {
		for (let i = 0; i < roles.length; i++){
			if (roles[i].id == role_id) {
				return roles[i].name;
			}
		}
	}

	return loading ? (
		<></>
	) : (
		<div className="d-flex ">
			<Navbar priv="freelancer" />
			<div className="text-center container-fluid">
				<h1 className="p-4">Welcome {username}.</h1>
				<h3 className="pb-4">Todays Date: {getDate()}</h3>

				<h3 className="pb-4">Your Roles: </h3>
				{myroles?.map((role) => (
					<h3 className="text-success" key={role.id}>
						{get_role_name(role.role)}
					</h3>
				))}

					
					<div className="p-5 text-primary">
						
				<h3 className="pb-4">
					Number of tasks assigned to you currently: {numbers?.remaining}
				</h3>
				<h3 className="pb-4">
					Number of tasks assigned done so far: {numbers?.done}
						</h3>
						</div>
			</div>
		</div>
	);
}
