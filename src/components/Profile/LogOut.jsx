import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		//Remove logged in flag and username from storage
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("username");
		navigate("/");
	};

	return (
		<div>
			<button onClick={handleLogOut}>Log Out</button>
		</div>
	);
};

export default LogOut;
