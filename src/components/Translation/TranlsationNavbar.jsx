import { NavLink } from "react-router-dom";

const TNavbar = () => {
	return (
		<div className="navbar">
			<div className="logo">
				<h2>Lost in Translation</h2>
			</div>
			<div className="profile-link">
				<NavLink to="/profile">Profile</NavLink>
			</div>
		</div>
	);
};

export default TNavbar;
