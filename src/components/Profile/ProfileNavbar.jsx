import { NavLink } from "react-router-dom";

const PNavbar = () => {
	return (
		<div>
			<NavLink to="/translation">
				<h2>Lost in Translation</h2>
			</NavLink>
			<NavLink to="/">Log out</NavLink>
		</div>
	);
};
export default PNavbar;
