import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { message } from "../../Interfaces/Messages";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";

export default function ListMessages() {
	const [messages, setmessages] = useState<message[]>([]);
	const [loading, setloading] = useState<boolean>(false);
	

	useEffect(() => {
		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		setloading(true);
		const func = async () => {
			const response = await fetch(`${SERVER_URL}/messages/getmymessages`, {
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
			});

			const data = await response.json();

			console.log(data);

			if (data.status == "SUCCESS") {
				setmessages(data?.data);
			} else {
				Swal.fire({
					icon: "error",
					title: "Error fetching your messages",
					timer: 3000,
				});
				setloading(false);
			}
		};

		func();
		(document.getElementById("sent") as HTMLDivElement).style.display = "none";

		setloading(false);
	}, []);

	return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Message Inbox</h3>
				</div>

				<div className="d-flex justify-content-center p-2">
					<button
						className="btn btn-primary ps-5 pe-5 m-3 mt-2 w-25"
						onClick={() => {
							(
								document.getElementById("sent") as HTMLDivElement
							).style.display = "none";

							(
								document.getElementById("recieved") as HTMLDivElement
							).style.display = "block";
						}}
					>
						Recieved
					</button>
					<button
						className="btn btn-primary ps-5 pe-5 m-3 mt-2 w-25"
						onClick={() => {
							(
								document.getElementById("recieved") as HTMLDivElement
							).style.display = "none";

							(
								document.getElementById("sent") as HTMLDivElement
							).style.display = "block";
						}}
					>
						Sent
					</button>
				</div>

				<div id="recieved">recieved</div>

				<div id="sent">sent</div>
			</div>
		</div>
	);
}
