import React, {useState} from "react";

export default function ReadMore({ children, maxCharacterCount = 500 }){

    const text = children;

    const [isTruncated, setIsTruncated] = useState(true);

    const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated);
    }

    return(
        <>
            <p>
                {resultString}
                <span
                    className={text.length <= maxCharacterCount ? "text-primary invisible" : "text-primary visible"}
                    onClick={toggleIsTruncated}
                >
                    {isTruncated ? "Read More" : "Read Less"}
                </span>
            </p>
        </>
    );
}