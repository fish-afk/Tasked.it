import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type NavProps = {
	priv: string;
};

const Navbar = ({ priv }: NavProps) => {
	const Navigate = useNavigate();


	return priv == "admin" ? (
		<div
			className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
			style={{ width: "280px", height: "100vh" }}
		>
			<a
				href="/"
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<svg className="bi me-2" width="40" height="32">
					<use xlinkHref="#bootstrap"></use>
				</svg>
				<span className="fs-4">VTE {priv}</span>
			</a>

			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<a href="#" className="nav-link active" aria-current="page">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#home"></use>
						</svg>
						Home
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#speedometer2"></use>
						</svg>
						Freelancers
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#speedometer2"></use>
						</svg>
						Admins
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#table"></use>
						</svg>
						Projects
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#grid"></use>
						</svg>
						Roles
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#people-circle"></use>
						</svg>
						Messages
					</a>
				</li>
			</ul>
			<hr />
			<div
				className="container text-white btn btn-primary mb-3"
				onClick={() => {
					
				}}
			>
				<h3>Edit Profile</h3>
			</div>
			<div
				className="container text-white btn btn-danger"
				onClick={() => {
					Swal.fire({
						title: "Are you sure you want to logout?",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#3085d6",
						cancelButtonColor: "#d33",
						confirmButtonText: "Yes",
					}).then((result) => {
						if (result.isConfirmed) {
							Navigate(`/${priv}/logout`);
						}
					});
				}}
			>
				<h3>Logout</h3>
			</div>
		</div>
	) : <></>;
};

export default Navbar;
