import React from "react";

interface Freelancer {
	username: string;
	fullname: string;
	password: string;
	age: string;
	email: string;
}

interface Props {
	freelancers: Freelancer[];
}

const FreelancerTable = ({ freelancers }: Props) => {
	return (
		<table className="table table-hover table-dark p-5">
			<thead className="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Username</th>
					<th scope="col">Fullname</th>
					<th scope="col">Age</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{freelancers.map((freelancer, index) => (
					<tr key={index}>
						<th scope="row">{index + 1}</th>
						<td>{freelancer.username}</td>
						<td>{freelancer.fullname}</td>
						<td>{freelancer.age}</td>
						<td>{freelancer.email}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default FreelancerTable;
