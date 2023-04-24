import React from 'react'
import Navbar from "../../Components/Navbar";

export default function ListAdmins() {
  return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">ListAdmins</div>
		</div>
	);
}
