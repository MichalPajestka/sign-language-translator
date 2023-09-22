const ClearTranslations = () => {
  const username = localStorage.getItem("username");
  let userId;    

  const fetchTranslations = async () => {
    try {
      const response = await fetch(
        `https://translations-api-production-3e9d.up.railway.app/translations?username=${username}`,
        {
          method: "GET",
          headers: {
            "X-API-Key":
              "xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

    } catch (error) {
      console.error("Error clearing translations:", error);
    }
  };

  const handleClearTranslations = async () => {
    try {
      // Fetch the user's data, including translations
      const response = await fetch(
        `https://translations-api-production-3e9d.up.railway.app/translations?username=${username}`,
        {
          method: "GET",
          headers: {
            "X-API-Key":
              "xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();

      // Check if user data is in the expected format
      if (Array.isArray(userData) && userData.length > 0) {
        // Extract the user's ID
        userId = userData[0].id; // Assign the value to userId

        // Clear the user's translations by sending a PATCH request with an empty array of translations
        const clearResponse = await fetch(
          `https://translations-api-production-3e9d.up.railway.app/translations/${userId}`,
          {
            method: "PATCH",
            headers: {
              "X-API-Key":
                "xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ translations: [] }),
          }
        );

        if (!clearResponse.ok) {
          throw new Error("Failed to clear translations");
        }

        // Call the fetchTranslations function to update the translation history
        fetchTranslations();

        // Clear the translations in the component state or perform any necessary updates
        console.log("Translations cleared successfully");
      } else {
        console.error("User data is not in the expected format:", userData);
      }
    } catch (error) {
      console.error("Error clearing translations:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClearTranslations}>Clear Translations</button>
    </div>
  );
};

export default ClearTranslations;
