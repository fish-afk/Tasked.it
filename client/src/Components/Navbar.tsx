import { useNavigate, Link } from "react-router-dom";
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
			<Link
				to="#"
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<svg className="bi me-2" width="40" height="32">
					<use xlinkHref="#bootstrap"></use>
				</svg>
				<span className="fs-4">VTE Admins</span>
			</Link>

			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link
						to={`/admin/home`}
						className="nav-link text-white icon-link-hover"
						aria-current="page"
					>
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#home"></use>
						</svg>
						Home
					</Link>
				</li>
				<li>
					<Link to="/admin/listfreelancers" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#speedometer2"></use>
						</svg>
						Freelancers
					</Link>
				</li>
				<li>
					<Link to="/admin/listadmins" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#speedometer2"></use>
						</svg>
						Admins
					</Link>
				</li>
				<li>
					<Link to="/admin/listprojects" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#table"></use>
						</svg>
						Projects
					</Link>
				</li>
				<li>
					<Link to="/admin/listroles" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#grid"></use>
						</svg>
						Roles
					</Link>
				</li>
				<li>
					<Link to="/admin/listmessages" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#people-circle"></use>
						</svg>
						Messages
					</Link>
				</li>
			</ul>
			<hr />

			<div
				className="container text-white btn btn-primary mb-3"
				onClick={() => {
					Navigate("/admin/editprofile");
				}}
			>
				<h4>Edit Profile</h4>
			</div>
			<div
				className="container text-dark btn btn-warning mb-3"
				onClick={() => {
					Navigate("/admin/changepassword");
				}}
			>
				<h4>Change Password</h4>
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
				<h4>Logout</h4>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Navbar;
