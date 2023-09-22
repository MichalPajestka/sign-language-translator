import React, { useEffect, useState } from "react";

const TranslationHistory = () => {
  const [translations, setTranslations] = useState([]);
  const username = localStorage.getItem("username");

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
        throw new Error("Failed to fetch translation history");
      }

      const data = await response.json();

      // Reverse the order of translations before setting the state
      const lastTenTranslations = data[0]?.translations.reverse() || [];
      setTranslations(lastTenTranslations);
    } catch (error) {
      console.error("Error fetching translation history:", error);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, [username, fetchTranslations]);

  return (
    <div>
      <h3>Your Last 10 Translations</h3>
      <ul>
        {translations.slice(0, 10).map((translation, index) => (
          <li key={index}>{translation}</li>
        ))}
      </ul>
      {translations.length === 0 && <p>No translations available.</p>}
    </div>
  );
};

export default TranslationHistory;
