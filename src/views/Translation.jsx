import { useNavigate } from "react-router-dom";
import TNavbar from "../components/Translation/TranlsationNavbar";
import TranslationInput from "../components/Translation/TranslationInput";
import TranslationOutput from "../components/Translation/TranslationOutput";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";

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
		<div>
			<TNavbar></TNavbar>
			<TranslationInput
				updateTranslatedText={updateTranslatedText}
			></TranslationInput>
			<TranslationOutput
				translatedText={translatedText}
			></TranslationOutput>
		</div>
	);
};

export default Translation;
