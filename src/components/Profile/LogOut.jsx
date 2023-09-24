import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext"; // Import UserContext

const LogOut = () => {
	const navigate = useNavigate();
	const { dispatch } = useUser(); // Access user dispatch from context

	const handleLogOut = () => {
		// Clear user state using dispatch
		dispatch({ type: "LOGOUT" });

		// Remove logged in flag and username from storage
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("username");

		// Redirect to the login page
		navigate("/");
	};

	return (
		<div>
			<button className="profile-button" onClick={handleLogOut}>
				Log Out
			</button>
		</div>
	);
};

export default LogOut;
