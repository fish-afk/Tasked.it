import React from 'react'
import Navbar from '../../Components/Navbar';


export default function AdminHome() {
	
	const username = JSON.stringify(localStorage.getItem("username")).replaceAll('"', '');
  return (
	  <div className='d-flex'>
		  <Navbar  priv='admin'/>
		  <div className="text-center container">
			  <h1>
				  Welcome {username}.
			  </h1>
			</div>
		</div>
	);
}
