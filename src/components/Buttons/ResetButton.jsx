import React from "react";
import { GrPowerReset } from "react-icons/gr";

function ResetButton({ text, reset}) {
	return (
		<>
			<button 
        className="bg-base-200  btn-sm rounded-md p-1"
        onClick={reset}
        >
          <GrPowerReset className="text-lg inline-block"/>
          <span className="align-middle text-sm text-accent ml-1 pr-1">{text}</span>
      </button>
		</>
	);
}

export default ResetButton;