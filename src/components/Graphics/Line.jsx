import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function StatusBar({ labels, data, label="None" }) {
	const { theme } = useContext(ThemeContext);
	let color = theme === "oni-dark" ? "white" : "dark";
	Chart.defaults.color = color;

	const bar_data = {
		labels,
		datasets: [
			{
				label,
				data,
				backgroundColor: ["#3b82f6"],
				borderColor: ["#2563eb"],
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
				grid: {
					display: false,
				},
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
		<div className='grid  place-items-center  md:h-96 w-full'>
			<Line
				data={bar_data}
				options={options}
			/>
		</div>
	);
}
