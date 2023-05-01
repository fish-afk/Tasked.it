import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
	AiFillHome,
	AiFillProject,
	AiOutlineKey,
	AiFillMessage,
} from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri"
import { BsPersonLinesFill } from "react-icons/bs"
import { GoPerson } from "react-icons/go"


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
						className="nav-link text-white"
						aria-current="page"
					>
						<AiFillHome className="bi me-2 mb-1" />
						Home
					</Link>
				</li>
				<li>
					<Link to="/admin/listfreelancers" className="nav-link text-white">
						<BsPersonLinesFill className="bi me-2 mb-1" />
						Freelancers
					</Link>
				</li>
				<li>
					<Link to="/admin/listadmins" className="nav-link text-white">
						<RiAdminLine className="bi me-2 mb-1" />
						Admins
					</Link>
				</li>
				<li>
					<Link to="/admin/listclients" className="nav-link text-white">
						<GoPerson className="bi me-2 mb-1" />
						Clients
					</Link>
				</li>
				<li>
					<Link to="/admin/listprojects" className="nav-link text-white">
						<AiFillProject className="bi me-2 mb-1" />
						Projects
					</Link>
				</li>
				<li>
					<Link to="/admin/listroles" className="nav-link text-white">
						<AiOutlineKey className="bi me-2 mb-1" />
						Roles
					</Link>
				</li>
				<li>
					<Link to="/admin/listmessages" className="nav-link text-white">
						<AiFillMessage className="bi me-2 mb-1" />
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
