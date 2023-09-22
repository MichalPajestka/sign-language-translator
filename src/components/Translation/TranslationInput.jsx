import { useForm } from "react-hook-form";
import { useState } from "react";
import translate from "../../utils/translate";

const TranslationInput = ({ updateTranslatedText }) => {
  const { register, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTranslateButtonDisabled, setIsTranslateButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const cleanedText = e.target.value;
    setInputValue(cleanedText);

    if (cleanedText.length === 40) {
      setErrorMessage("Character limit reached (max: 40)");
    } else if (!/[a-zA-Z]/.test(cleanedText)) {
      setErrorMessage("Please enter at least one alphabetic character (a to z)");
      setIsTranslateButtonDisabled(true); // Disable the button
    } else {
      setErrorMessage("");
      setIsTranslateButtonDisabled(false); // Enable the button
    }
  };

const onSubmit = async (data) => {
  try {
    const cleanedText = data.translation;

    const translation = translate(cleanedText);
    console.log('Translation:', translation);

    updateTranslatedText(translation);
    const username = localStorage.getItem("username");

    // Fetch the user's existing translations from the API
    const response = await fetch(
      `https://translations-api-production-3e9d.up.railway.app/translations?username=${username}`,
      {
        method: "GET",
        headers: {
          'X-API-Key': 'xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o',
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();
    console.log('User Data:', userData);

    if (Array.isArray(userData) && userData.length > 0) {
      // Extract the user's ID
      const userId = userData[0].id;
      const existingTranslations = Array.isArray(userData[0].translations)
        ? userData[0].translations
        : [];
      existingTranslations.push(cleanedText);
      userData[0].translations = existingTranslations;

      // Send a PATCH request to the API to update the user's data
      const updatedResponse = await fetch(
        `https://translations-api-production-3e9d.up.railway.app/translations/${userId}`,
        {
          method: "PATCH",
          headers: {
            'X-API-Key': 'xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData[0]),
        }
      );

      if (!updatedResponse.ok) {
        throw new Error("Translation request failed");
      }

      setIsTranslateButtonDisabled(true);

      setErrorMessage("");
    } else {
      console.error('User data is not in the expected format:', userData);
    }
  } catch (error) {
    console.error('Translation error:', error);
  }
};


  // Disable enter key on form submission because it was causing problems
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("translation")}
          type="text"
          maxLength="40"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" disabled={isTranslateButtonDisabled}>Translate</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TranslationInput;
