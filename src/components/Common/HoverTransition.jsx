import React, { useState } from "react";

const HoverTransition = ({ originalTxt, hoverTxt }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <span
        className={`absolute transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {originalTxt}
      </span>
      <span
       className={`absolute transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} text-red-600 font-semibold`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hoverTxt}
      </span>
    </>
  );
};

export default HoverTransition;
