import { useNavigate } from "react-router-dom";
import TNavbar from "../components/Translation/TranlsationNavbar";
import TranslationInput from "../components/Translation/TranslationInput";
import TranslationOutput from "../components/Translation/TranslationOutput";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import "./Translation.css";

const Translation = () => {
	const navigate = useNavigate();
	const { state: userState } = useUser(); // Access user state from context
	const { isLoggedIn } = userState;

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/"); // Redirect to login page if not logged in
		}
		// Ignore the warning because navigate is a function that comes from React Router and is not going to change during the component's lifecycle
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	const [translatedText, setTranslatedText] = useState(""); // State to hold translated text

	const updateTranslatedText = (text) => {
		setTranslatedText(text);
	};

	return (
		<div className="translation-container">
			<div className="navbar">
				<h2 className="logo">Lost in Translation</h2>
				{isLoggedIn && (
					<button
						className="profile-link"
						onClick={() => navigate("/profile")}
					>
						Profile
					</button>
				)}
			</div>
			<div className="content">
				<div className="translate-content">
					<TranslationInput
						updateTranslatedText={updateTranslatedText}
					/>
					<TranslationOutput translatedText={translatedText} />
				</div>
			</div>
		</div>
	);
};
export default Translation;
