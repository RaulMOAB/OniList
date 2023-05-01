import React from 'react'

export function timeLeftSince(date_string) {
	const now = new Date();
	const elapsed_time = now - new Date(date_string);

	// Calculate different elapsed times
	const elapsed_seconds = Math.floor(elapsed_time / 1000);
	const elapsed_minutes = Math.floor(elapsed_time / (1000 * 60));
	const elapsed_hours = Math.floor(elapsed_time / (1000 * 60 * 60));
	const elapsed_days = Math.floor(elapsed_time / (1000 * 60 * 60 * 24));
	const elapsed_weeks = Math.floor(elapsed_time / (1000 * 60 * 60 * 24 * 7));
	const elapsed_months =
		(now.getFullYear() - new Date(date_string).getFullYear()) * 12 +
		now.getMonth() -
		new Date(date_string).getMonth();
	const elapsed_years = Math.floor(elapsed_months / 12);

	// Return the result in a readable format
	if (elapsed_years > 0) {
		return elapsed_years + " years ago";
	} else if (elapsed_months > 0) {
		return elapsed_months + " months ago";
	} else if (elapsed_weeks > 0) {
		return elapsed_weeks + " weeks ago";
	} else if (elapsed_days > 0) {
		return elapsed_days + " days ago";
	} else if (elapsed_hours > 0) {
		return elapsed_hours + " hours ago";
	} else if (elapsed_minutes > 0) {
		return elapsed_minutes + " minutes ago";
	} else {
		return elapsed_seconds + " seconds ago";
	}
}

export function formatDate(date_string) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const date_parts = date_string.split("-");
	const year = date_parts[0];
	const month = months[parseInt(date_parts[1]) - 1];
	const day = parseInt(date_parts[2]);
	return `${month} ${day}, ${year}`;
}
