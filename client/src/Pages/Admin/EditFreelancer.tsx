import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import SERVER_URL from "../../Constants/server_url";
import Swal from "sweetalert2";
import { Role } from "../../Interfaces/Roles";
import { EditFreelancerAdmin } from "../../Interfaces/EditFreelancerAdmin";
import RolesCheckboxList from "../../Components/RolesCheckBoxList";
import { useLocation } from "react-router-dom";

export default function EditFreelancer(): JSX.Element {

  const locationHook = useLocation();
  const [chosenRoles, setchosenRoles] = useState<Role[]>([]);
  const [fetchedroles, setfetchedroles] = useState([]);
  
  const [formValues, setFormValues] = useState<EditFreelancerAdmin>({
    
		fullname: "",
		email: "",
		age: ""
	});

	useEffect(() => {
      const func = async () => {
				const token = JSON.stringify(
					localStorage.getItem("taskedit-accesstoken"),
				).replaceAll('"', "");

				const username = JSON.stringify(
					localStorage.getItem("username"),
				).replaceAll('"', "");

				const response = await fetch(`${SERVER_URL}/roles/getallroles`, {
					headers: {
						"Content-Type": "application/json",
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
					},
					method: "GET",
				});

				const data = await response.json();

				console.log(data);
				if (data.status == "SUCCESS") {
					setfetchedroles(data.data);
				}
    };

    func();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

    const {
			email,
			age,
			fullname
		} = formValues;

		const token = JSON.stringify(
			localStorage.getItem("taskedit-accesstoken"),
		).replaceAll('"', "");

		const username_ = JSON.stringify(
			localStorage.getItem("username"),
		).replaceAll('"', "");

		try {
			const response = await fetch(`${SERVER_URL}/freelancers/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"taskedit-accesstoken": token,
					username: username_,
					isadmin: "true",
				},
				body: JSON.stringify({
					username: locationHook.state.username,
					age,
					email,
					fullname,
					chosenRoles,
				}),
			});

			const data = await response.json();
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "Updated profile successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: data.message,
					timer: 3000,
					icon: "error",
				}).then(() => {
					location.reload();
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<Navbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-4">
					<h1>
						Update the details for <em>{locationHook.state.username}</em>
					</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="row mb-4">
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Fullname
								</label>
								<input
									required
									placeholder={locationHook.state.fullname}
									type="text"
									id="form6Example2"
									className="form-control"
									value={formValues.fullname}
									onChange={(e) =>
										setFormValues({
											...formValues,
											fullname: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Email
						</label>
						<input
							placeholder={locationHook.state.email}
							required
							type="email"
							id="form6Example5"
							className="form-control"
							value={formValues.email}
							onChange={(e) =>
								setFormValues({
									...formValues,
									email: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Age
						</label>
						<input
							placeholder={locationHook.state.age}
							required
							type="number"
							id="form6Example5"
							className="form-control"
							value={formValues.age}
							onChange={(e) =>
								setFormValues({
									...formValues,
									age: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example6">
							Roles (Tick the ones that apply) :
						</label>

						<RolesCheckboxList
							Roles={fetchedroles}
							setchosenRoles={setchosenRoles}
							chosenRoles={chosenRoles}
						/>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button className="btn btn-primary" onClick={(e) => handleSubmit}>
							SAVE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
