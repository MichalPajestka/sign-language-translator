import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../components/Profile/ProfileNavbar";
import TranslationHistory from "../components/Profile/TranslationHistory";
import ClearTranslations from "../components/Profile/ClearTranslations";
import LogOut from "../components/Profile/LogOut";
import { useUser } from "../Context/UserContext";
import "./Profile.css";

const Profile = () => {
	const navigate = useNavigate();
	const { state: userState } = useUser(); // Access user state from context
	const { isLoggedIn, username } = userState;

	// Check if the user is not logged in and redirect to the login page
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	if (!isLoggedIn) {
		// If the user is not logged in, do not render the profile page
		return null;
	}

	return (
		<div className="profile-container">
			{" "}
			{/* Apply the "profile-container" class */}
			<ProfileNavbar />
			<div className="profile-content">
				{" "}
				{/* Apply the "profile-content" class */}
				<h2 className="profile-heading">Profile Page</h2>{" "}
				{/* Apply the "profile-heading" class */}
				<p className="profile-text">Welcome, {username}!</p>{" "}
				{/* Apply the "profile-text" class */}
				<TranslationHistory />
				<ClearTranslations />
				<LogOut />
			</div>
		</div>
	);
};

export default Profile;
