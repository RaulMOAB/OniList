import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";
export default function ScrollButton() {
    const { theme } = useContext(ThemeContext);

    let bg_color = theme === "oni-dark" ? "#152232" : "#e5ebf1";
  
    return (
			<div>
				<ScrollToTop
					smooth={true}
					width='40px'
					color='#3b82f6'
					top={800}
					viewBox='0 0 32 32'
					svgPath='m15.29 10.29-8 8L8.7 19.7l7.3-7.29 7.29 7.29 1.41-1.41-8-8a1 1 0 0 0-1.41 0z'
					style={{ backgroundColor: bg_color, bottom: "240px", right: "14px", boxShadow:"none" }} //!important for overrides might be needed
				/>
			</div>
		);
}