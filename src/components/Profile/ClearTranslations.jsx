import React from "react";

const ClearTranslations = () => {
	const username = localStorage.getItem("username");

	const handleClearTranslations = async () => {
		try {
			const response = await fetch(
				`https://translations-api-production-3e9d.up.railway.app/translations?username=${username}`,
				{
					method: "DELETE",
					headers: {
						"X-API-Key":
							"xqW942yHAcoehSs1JRI9pMbAqTNIGl0hFEIdLgvS6cgogVlCrWzn7bWMIULvxQ3o",
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to clear translations");
			}

			// Clear the translations in the component state or perform any necessary updates
			console.log("Translations cleared successfully");
		} catch (error) {
			console.error("Error clearing translations:", error);
		}
	};

	return (
		<div>
			<button onClick={handleClearTranslations}>
				Clear Translations
			</button>
		</div>
	);
};

export default ClearTranslations;
