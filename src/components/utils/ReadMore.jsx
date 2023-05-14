import React, { useState } from "react";

export default function ReadMore({ children, maxCharacterCount = 500 }) {
	const text = children;

	const [isTruncated, setIsTruncated] = useState(true);

	let resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

	const markdownLinkRegex = /\[([^\]]+)\]\(([^\s]+)(?:\s+"([^"]+)")?\)/g;
	let regexBold = /\_\_(\S(.*?\S)?)\_\_/gm;
	let regexItalic = /\_(\S(.*?\S)?)\_/gm;

	resultString = resultString.replaceAll(regexBold, "<strong>$1</strong>");
	resultString = resultString.replaceAll(regexItalic, "<i>$1</i>");
	resultString = resultString.replaceAll(
		markdownLinkRegex,
		'<a class="text-primary" href="$2" title="$3">$1</a>'
	);

	function toggleIsTruncated() {
		setIsTruncated(!isTruncated);
	}

	return (
		<>
			<div>
				<p
					dangerouslySetInnerHTML={{
						__html: resultString
					}}></p>
				<span
					className={
						text.length <= maxCharacterCount
							? "text-primary invisible"
							: "text-primary visible"
					}
					onClick={toggleIsTruncated}>
					{isTruncated ? "Read More" : "Read Less"}
				</span>
			</div>
		</>
	);
}
