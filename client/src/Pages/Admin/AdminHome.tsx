import React from 'react'
import Navbar from '../../Components/Navbar';


export default function AdminHome() {

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
	}
	
	const username = JSON.stringify(localStorage.getItem("username")).replaceAll('"', '');
  return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="text-center container">
				<h1 className='p-4'>Welcome {username}.</h1>
				<h3 className='p-2'>Todays Date: {getDate()}</h3>
				<h3 className='p-2'>Number of current freelancers: 23</h3>
				<h3 className='p-2'>Number of current admins: 32</h3>
				<h3 className='p-2'>Number of active projects: 12</h3>
				<h3 className='p-2'>Total tasks due today: 5</h3>
			</div>
		</div>
	);
}
