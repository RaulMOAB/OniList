import React from "react";
import { useState } from "react";
export default function AuthConfirmModal({
	id,
	action = () => {},
	header,
	message,
	confirm_button_text = "Confirm",
	cancel_button_text = "Cancel",
}) {
  const [password , setPassword] = useState("");
	return (
		<>
			{/* The button to open modal */}
			{/* 
      <label
				htmlFor='confirm-modal'
				className='btn'>
				open modal
			</label> 
      */}

			<input
				type='checkbox'
				id={id}
				className='modal-toggle'
			/>
			<div className='modal modal-middle bg-opacity-60'>
				<div className='w-72 sm:w-96 text-accent bg-base-100 rounded-md p-3'>
					<h3 className='text-lg'>{header}</h3>
					<p className='py-4 text-sm'>{message}</p>
					<input
						type='password'
						value={password}
            placeholder="Confirm your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className='input h-10 w-full text-accent bg-base-300 text-sm mb-1'
					/>
					<div className='modal-action mt-2 '>
						<label
							htmlFor={id}
							onClick={() => {
								action(password);setPassword("");
							}}
							className='btn-secondary p-1 px-2 rounded-sm text-white text-sm'>
							{confirm_button_text}
						</label>
						<label
							htmlFor={id}
							className='btn-primary p-1 px-2 rounded-sm text-white text-sm'>
							{cancel_button_text}
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
