import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {useState} from 'react';

function BarChart() {

	const  UserData = [
		{
			id: 1,
			year: 2016,
			userGain: 8000,
			userLost: 823,
		},
		{
			id: 2,
			year: 2017,
			userGain: 4677,
			userLost: 345,
		},
		{
			id: 3,
			year: 2018,
			userGain: 7888,
			userLost: 555,
		},
		{
			id: 4,
			year: 2019,
			userGain: 9000,
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
				label: "Freelancer numbers",
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

	return <Bar data={userData} />;
}

export default BarChart;
