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
      updateTranslatedText(translation);

      const response = await fetch(
        "https://translations-api-production-3e9d.up.railway.app/translations",
        {
          method: "POST",
          headers: {
            'X-API-Key': 'xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            translations: [cleanedText],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      setIsTranslateButtonDisabled(true); // Disable the button again after successful submission

      setErrorMessage("");
    } catch (error) {
      console.error('Translation error:', error);
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
        />
        <button type="submit" disabled={isTranslateButtonDisabled}>Translate</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TranslationInput;
