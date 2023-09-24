import React from "react";
import LoginForm from "../components/Startup/LoginForm";
import "./Startup.css";

const Startup = () => {
	return (
		<div className="startup-container">
			<nav className="navbar">
				<h1 className="logo">Lost in Translation</h1>
			</nav>
			<div className="content">
				<LoginForm />
			</div>
		</div>
	);
};
export default Startup;
