import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../components/Profile/ProfileNavbar";
import TranslationHistory from "../components/Profile/TranslationHistory";
import ClearTranslations from "../components/Profile/ClearTranslations";
import LogOut from "../components/Profile/LogOut";

const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  // Check if the user is not logged in and redirect to the login page
  useEffect(() => {
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || isLoggedIn !== "true") {
    // If the user is not logged in, do not render the profile page
    return null;
  }

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
