import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../components/Profile/ProfileNavbar";
import TranslationHistory from "../components/Profile/TranslationHistory";
import ClearTranslations from "../components/Profile/ClearTranslations";
import LogOut from "../components/Profile/LogOut";
// import { deleteTranslations } from "../utils/deleteTranslations";

const Profile = () => {
	const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (!isLoggedIn || isLoggedIn !== "true") {
        // If not logged in, redirect to the login page
        navigate("/");
      }
    }, [navigate]);

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn");

		if (!isLoggedIn || isLoggedIn !== "true") {
			navigate("/");
		}
	}, [navigate]);

	const username = localStorage.getItem("username");

	return (
		<div>
			<ProfileNavbar />
			<h2>Profile Page</h2>
			<p>Welcome, {username}!</p>
			<TranslationHistory />
			<ClearTranslations />
			<LogOut />
		</div>
	);
};

export default Profile;
