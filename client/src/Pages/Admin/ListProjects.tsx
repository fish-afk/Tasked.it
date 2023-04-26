import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import SERVER_URL from '../../Constants/server_url';

export default function ListProjects() {

  const [projects, setprojects] = useState();
  
  return (
      <div className="d-flex">
          <Navbar priv='admin'/>
			<div className="container">ListProjects</div>
		</div>
	);
}
