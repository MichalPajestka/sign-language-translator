import React from "react";
import { useUser } from "../../Context/UserContext";

const ClearTranslations = () => {
	const { state: userState, dispatch } = useUser();
	const { username } = userState;

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
				const userId = userData[0].id;

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

				// Dispatch an action to update the translation history in the user context
				const clearedTranslations = [];
				dispatch({
					type: "UPDATE_TRANSLATION_HISTORY",
					payload: clearedTranslations,
				});

				console.log("Translations cleared successfully");
			} else {
				console.error(
					"User data is not in the expected format:",
					userData
				);
			}
		} catch (error) {
			console.error("Error clearing translations:", error);
		}
	};

	return (
		<div>
			<button
				className="profile-button"
				onClick={handleClearTranslations}
			>
				Clear Translations
			</button>
		</div>
	);
};

export default ClearTranslations;
