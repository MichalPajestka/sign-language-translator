import React from "react";
import "./TranslationOutput.css";

const TranslationOutput = ({ translatedText }) => {
	return (
		<div className="translation-output">
			{translatedText}
		</div>
	);
};

export default TranslationOutput;
