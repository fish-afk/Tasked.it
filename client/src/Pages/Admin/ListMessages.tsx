import React from 'react'
import Navbar from "../../Components/Navbar";

export default function ListMessages() {
  return (
		<div className="d-flex">
			<Navbar priv="admin" />
			<div className="container">ListMessages</div>
		</div>
	);
}
