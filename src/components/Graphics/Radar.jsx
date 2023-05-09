import React from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function TypeMediaPie({ labels, data , label="None"}) {
	const { theme } = useContext(ThemeContext);
	let color = theme === "oni-dark" ? "white" : "dark";
	Chart.defaults.color = color;

	const pie_data = {
		labels,
		datasets: [
			{
				label,
				data,
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgb(54, 162, 235)",
				pointBackgroundColor: "rgb(54, 162, 235)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgb(54, 162, 235)",
			},
		],
	};
	const options = {
		scales: {
			r:{
				angleLines: {
					color: "#001d3d",
				},
				grid: {
					color: "#001d3d",
				}
			}
		},
		plugins: {
			legend: {
				position: "top",
			},
		},
	};
	return (
		<div className='grid  place-items-center h-fit md:h-96   w-full '>
			<Radar
				data={pie_data}
				options={options}
			/>
		</div>
	);
}
