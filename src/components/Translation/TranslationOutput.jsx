import React from "react";
import "./TranslationOutput.css";

const TranslationOutput = ({ translatedText }) => {
	return (
		<div className="translation-output">
			<p className="translated-text">{translatedText}</p>
		</div>
	);
};

export default TranslationOutput;
