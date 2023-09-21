import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../components/ProfileNavbar";
import TranslationHistory from "../components/TranslationHistory";
import ClearTranslations from "../components/ClearTranslations";
import LogOut from "../components/LogOut";
// import { deleteTranslations } from "../utils/deleteTranslations";

const Profile = () => {
	/*const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (!isLoggedIn || isLoggedIn !== "true") {
        // If not logged in, redirect to the login page
        navigate("/");
      }
    }, [navigate]); */

	const navigate = useNavigate();

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
