import React from "react";

const TranslationHistory = ({ translations }) => {
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
