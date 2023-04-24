
type NavProps = {
    priv: string
}

const Navbar = ({priv}: NavProps) => {
	return (
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
						Dashboard
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#table"></use>
						</svg>
						Orders
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#grid"></use>
						</svg>
						Products
					</a>
				</li>
				<li>
					<a href="#" className="nav-link text-white">
						<svg className="bi me-2" width="16" height="16">
							<use xlinkHref="#people-circle"></use>
						</svg>
						Customers
					</a>
				</li>
			</ul>
			<hr />
			<div className="container text-white btn btn-danger">
				<h3>
					Logout
				</h3>
			</div>
				
		</div>
	);
};

export default Navbar;
