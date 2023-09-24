import React, { useEffect } from "react";
import { useUser } from "../../Context/UserContext";

const TranslationHistory = () => {
	const { state: userState, dispatch } = useUser();
	const { username, translationHistory } = userState;

	useEffect(() => {
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

				if (Array.isArray(data) && data.length > 0) {
					const lastTenTranslations =
						data[0]?.translations.reverse() || [];
					// Update the translation history in the user context
					dispatch({
						type: "UPDATE_TRANSLATION_HISTORY",
						payload: lastTenTranslations,
					});
				}
			} catch (error) {
				console.error("Error fetching translation history:", error);
			}
		};

		fetchTranslations();
	}, [username, dispatch]);

	return (
		<div>
			<h3>Your Last 10 Translations</h3>
			<ul>
				{translationHistory.slice(0, 10).map((translation, index) => (
					<li key={index}>{translation}</li>
				))}
			</ul>
			{translationHistory.length === 0 && (
				<p>No translations available.</p>
			)}
		</div>
	);
};

export default TranslationHistory;
