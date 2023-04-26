/* This is a React functional component that renders a list of checkboxes for job roles. It receives an
array of `Role` objects as props, along with functions to set and retrieve the chosen roles. It uses
the `useState` hook to keep track of the currently hovered role, and displays a tooltip with the
role's description when the user hovers over a checkbox. It also updates the chosen roles array when
a checkbox is checked or unchecked. The component uses the `OverlayTrigger` and `Tooltip` components
from the `react-bootstrap` library to display the tooltips. */

import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Role } from "../Interfaces/Roles";

interface Props {
	Roles: Role[];
	setchosenRoles: any;
	chosenRoles: Role[];
}

const JobCheckboxList: React.FC<Props> = ({
	Roles,
	setchosenRoles,
	chosenRoles,
}) => {
	const [hoveredRole, setHoveredRole] = useState<Role | null>(null);

	const handleHover = (Role: Role) => {
		setHoveredRole(Role);
	};

	const handleMouseLeave = () => {
		setHoveredRole(null);
	};

	const handleCheck = (role: Role) => {
		const isChecked = chosenRoles.some(
			(checkedJob) => checkedJob.id === role.id,
		);
		if (isChecked) {
			setchosenRoles(
				chosenRoles.filter((checkedJob) => checkedJob.id !== role.id),
			);
		} else {
			setchosenRoles([...chosenRoles, role]);
		}
	};

	return (
		<div className="d-flex flex-wrap">
			{Roles.map((Role) => (
				<div
					key={Role.id}
					className="mx-2 my-2 text-white"
					onMouseEnter={() => handleHover(Role)}
					onMouseLeave={handleMouseLeave}
				>
					<OverlayTrigger
						placement="bottom"
						overlay={
							<Tooltip id={`tooltip-${Role.id}`}>{Role.description}</Tooltip>
						}
					>
						<div>
							<input
								type="checkbox"
								id={`role-${Role.id}`}
								checked={chosenRoles.some(
									(chosenRole) => chosenRole.id === Role.id,
								)}
								onChange={() => handleCheck(Role)}
							/>
							<label htmlFor={`Role-${Role.id}`} className="ms-2 mb-0">
								{Role.name}
							</label>
						</div>
					</OverlayTrigger>
				</div>
			))}
			{hoveredRole && (
				<div className="position-fixed start-50 translate-middle-x">
					<OverlayTrigger
						placement="bottom"
						overlay={
							<Tooltip id={`tooltip-${hoveredRole.id}`}>
								{hoveredRole.description}
							</Tooltip>
						}
					>
						<div></div>
					</OverlayTrigger>
				</div>
			)}
		</div>
	);
};

export default JobCheckboxList;
