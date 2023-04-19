import React, { useState, useEffect } from "react";

export default function ErrorAlert({ show, message, resetAlert }) {

	const [showAlert, setShowAlert] = useState(show);
	  useEffect(() => {
			setShowAlert(show);
		}, [show]);
	
	const closeAlert = ()=>{
		setShowAlert(false);
	}

	if (showAlert) {
		return (
			<>
				<div
					className={
						"absolute left-0  alert alert-error shadow-lg w-96 rounded-md animate-fade-in-down"
					}>
					<div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 mr-4 text-white'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
								clipRule='evenodd'
							/>
						</svg>
						<span className='text-white w-72'>{message}</span>
						<button
							onClick={() => {closeAlert(); resetAlert();}}
							className='text-red-100 hover:text-white'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			</>
		);
	}
}