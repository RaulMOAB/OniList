import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useContext } from 'react';
import { ThemeContext } from "@/contexts/ThemeContext";


export default function StatusBar({labels, data, label="None"}) {
	const {theme} = useContext(ThemeContext);
	let color = theme === "oni-dark" ? "white": "dark"
  Chart.defaults.color = color

  const bar_data = {
		labels,
		datasets: [
			{
				label,
				data,
				backgroundColor: [
					"#012a4a",
					"#013a63",
					"#01497c",
					"#014f86",
					"#2a6f97",
					"#2c7da0",
					"#468faf",
					"#61a5c2",
				],
				borderColor: ["#001233"],
				borderWidth: 1,
				hoverOffset: 2,
			},
		],
	};
  const options = {
		scales: {
			y: {
				ticks: {
					color,
				},
				grid: {
					display: false,
				},
			},
			x: {
				ticks: {
					color,
				},
        grid:{
          display: false,
        }
			},
		},
		plugins: {
			legend: {
				position: "top",
				color,
			},
		},
	};
  return (
		<div className='h-fit w-full md:h-80'>
			<Bar
				data={bar_data}
				options={options}
			/>
		</div>
	);
}
