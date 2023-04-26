import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import { Numbers } from "../../Interfaces/Numbers";
import { Line } from "react-chartjs-2";
import LineChart from "../../Components/LineChart";

export default function AdminHome() {
	const [numbers, setnumbers] = useState<Numbers>();

	const UserData = [
		{
			id: 1,
			year: 2016,
			userGain: 80000,
			userLost: 823,
		},
		{
			id: 2,
			year: 2017,
			userGain: 45677,
			userLost: 345,
		},
		{
			id: 3,
			year: 2018,
			userGain: 78888,
			userLost: 555,
		},
		{
			id: 4,
			year: 2019,
			userGain: 90000,
			userLost: 4555,
		},
		{
			id: 5,
			year: 2020,
			userGain: 4300,
			userLost: 234,
		},
	];

	const [userData, setUserData] = useState({
		labels: UserData.map((data) => data.year),
		datasets: [
			{
				label: "Tasks completed in past weeks",
				data: UserData.map((data) => data.userGain),
				backgroundColor: [
					"rgba(75,192,192,1)",
					"#ecf0f1",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0",
				],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	});
	
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
				<h3 className="pb-4">Todays Date: {getDate()}</h3>
				{/* <h3 className="p-2">
					Number of current freelancers: {numbers?.Freelancers}
				</h3>
				<h3 className="p-2">Number of current admins: {numbers?.Admins}</h3>
				<h3 className="p-2">Number of active projects: {numbers?.Projects}</h3>
				<h3 className="p-2">Total tasks due today: {numbers?.Tasks}</h3> */}
				<div className="chart-container d-flex">
					<div style={{ width: 600 }}>
						<LineChart chartData={userData} />
					</div>
					<div style={{ width: 600 }}>
						<LineChart chartData={userData} />
					</div>
				</div>

				
			</div>
		</div>
	);
}
