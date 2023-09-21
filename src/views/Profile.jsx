import PNavbar from "../components/Profile/ProfileNavbar";
import { deleteTranslations } from "../utils/deleteTranslations";

import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

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
    
    return (
        <div>
            <PNavbar></PNavbar>
            <h1>Profile</h1>
            <button onClick={deleteTranslations}>Delete Translations</button>
        </div>
    )
}
export default Profile;