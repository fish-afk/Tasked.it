import { useState } from 'react'
import './Styles/App.css'
import AdminHome from './Pages/Admin/AdminHome';
import FreelancerHome from './Pages/Freelancer/FreelancerHome';

function App() {
  const [logged, setlogged] = useState<boolean>(true);
  const [priv, setpriv] = useState<string | null>("admin");

  
  return logged ? (
		priv == "admin" ? (
			<AdminHome />
		) : (
			<FreelancerHome />
		)
	) : (
		<div className="container my-5">
			<h1 className="text-center mb-4">Welcome to VTE projectify.</h1>
			<h3 className="text-center mb-4 mt-5">Login as :</h3>
			<div className="d-flex justify-content-center">
				<div className="btn-group" role="group">
					<button type="button" className="btn rounded-2 btn-primary me-1">
						Admin
					</button>
					<button type="button" className="btn rounded-2 btn-primary ms-1">
						Freelancer
					</button>
				</div>
			</div>
		</div>
	);
}

export default App
