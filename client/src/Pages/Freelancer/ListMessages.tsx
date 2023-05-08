import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { message } from "../../Interfaces/Message";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { TbInboxOff } from "react-icons/tb";

export default function ListMessagesFreelancer() {
	const [messages, setmessages] = useState<message[]>([]);
	const [loading, setloading] = useState<boolean>(false);
	const [sentMessages, setSentMessages] = useState<message[]>([]);
	const [receivedMessages, setReceivedMessages] = useState<message[]>([]);

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
					isadmin: "false",
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

	useEffect(() => {
		setSentMessages(
			messages.filter((msg) => msg.from === localStorage.getItem("username")),
		);
		setReceivedMessages(
			messages.filter((msg) => msg.to === localStorage.getItem("username")),
		);
	}, [messages]);

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<Navbar priv="freelancer" />
			<div className="container">
				<div className="d-flex justify-content-center p-5">
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

				<div id="recieved" className="container-fluid">
					<div className="d-flex justify-content-center pb-5">
						<h2>Received messages</h2>
					</div>

					{receivedMessages.length < 1 ? (
						<div className="d-flex m-5 justify-content-center">
							<h2>
								You have no messages recieved in the past
								<br />
								<div className="d-flex m-5 justify-content-center">
									<TbInboxOff fontSize={100} color="red" />
								</div>
							</h2>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
							{receivedMessages.map((msg) => (
								<div key={msg._id} className="col border border-info rounded-2">
									<div className="border border-info rounded-2 card h-100 message msg text-white">
										<div className="card-body">
											<h5 className="card-title">From: {msg.from}</h5>
											<h6 className="card-subtitle mb-2">
												Date: {msg.date_sent}
											</h6>
											<h6 className="card-subtitle mb-2">
												Time: {msg.time_sent}
											</h6>
											<p className="card-text">
												<b>Message:</b> {msg.Message}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div id="sent" className="container-fluid">
					<div className="d-flex justify-content-center pb-5">
						<h2>Sent messages</h2>
					</div>

					{sentMessages.length < 1 ? (
						<div className="d-flex m-5 justify-content-center">
							<h2>
								You have no messages sent to anyone
								<br />
								<div className="d-flex m-5 justify-content-center">
									<TbInboxOff fontSize={100} color="red" />
								</div>
							</h2>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-md-3">
							{sentMessages.map((msg) => (
								<div key={msg._id} className="col p-2">
									<div className="border border-info rounded-2 card h-100 message msg text-white">
										<div className="card-body">
											<h5 className="card-title">To: {msg.to}</h5>
											<h6 className="card-subtitle mb-2">
												Date: {msg.date_sent}
											</h6>
											<h6 className="card-subtitle mb-2">
												Time: {msg.time_sent}
											</h6>
											<p className="card-text">
												<b>Message:</b> {msg.Message}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
