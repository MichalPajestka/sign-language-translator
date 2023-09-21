import { useNavigate } from "react-router-dom";
import TNavbar from "../components/Translation/TranlsationNavbar";
import TranslationInput from "../components/Translation/TranslationInput";
import TranslationOutput from "../components/Translation/TranslationOutput";
import { useEffect, useState } from "react";

const Translation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
    
        if(!isLoggedIn || isLoggedIn !== "true") {
            navigate("/")
        }
    }, [navigate]);

    const [translatedText, setTranslatedText] = useState(""); // State to hold translated text

    const updateTranslatedText = (text) => {
        setTranslatedText(text);
      };

    return (
        <div>
            <TNavbar></TNavbar>
            <TranslationInput updateTranslatedText={updateTranslatedText}></TranslationInput>
            <TranslationOutput translatedText={translatedText}></TranslationOutput>
        </div>
    )
}
export default Translation;