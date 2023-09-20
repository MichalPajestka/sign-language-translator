import { useForm } from "react-hook-form";
import translate from "../../utils/translate";


const TranslationInput = ({ updateTranslatedText }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
       // Check if the input is empty or contains non-letter characters
      if (!/^[a-zA-Z]+$/.test(data.translation)) {
        console.error("Invalid input. Please enter only letters.");
        return; // Don't proceed with translation
      }

      const translation = translate(data.translation);
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
            translations: [data.translation],
          }),
        }
        );
        
        if (!response.ok) {
          throw new Error("Translation request failed");
        }

        // Clear the input field after successful submission
        
        } catch (error) {
            console.error('Translation error:', error);
        }
    };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("translation", {
            maxLength: 40,
          })}
          type="text"
        />

        {errors.translation && <p>The text you input is too long! (max: 40 characters)</p>}
        <button type="submit">Translate</button>
      </form>
    </div>
  );
};

export default TranslationInput;
