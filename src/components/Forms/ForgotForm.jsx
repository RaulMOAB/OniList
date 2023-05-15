import React, { useContext,useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Alert from "@/components/Alerts/Login/ErrorAlert";
import { IoAt, IoLockClosed } from "react-icons/io5";
import Link from "next/link";
import LoginButton from "@/components/Buttons/AuthForms/SubmitButton";

export default function ForgotForm() {
  const { fetchData}= useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");
	const [shownPassword, setShownPassword] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("enviando email");
	};
	return (
		<>
			<div className=' h-96  sm:h-screen text-accent'>
				<Alert
					show={showError}
					message={message}
					seconds={3}
					setShowError={setShowError}
					type={"error"}
				/>
				<div className='container mx-auto bg-neutral w-full h-screen sm:h-fit my-20 rounded-md p-5 sm:w-96'>
					<div className='m-5'>
						<h1 className='text-xl text-accent font-bold text-center'>
							Forgot password
						</h1>
						<div className='divide-double'></div>
					</div>
					<form
						onSubmit={(event) => handleSubmit(event)}
						className='form-control mt-8'>
						<div className='mb-4 w-4/5 mx-auto'>
							<div className='input-group'>
								<label className='flex justify-center input-group input-group-md '>
									<span className='bg-base-content '>
										<IoAt className='text-lg text-accent' />
									</span>
									<input
										type='email'
										value={email}
										onChange={(event) => handleEmailChange(event.target.value)}
										placeholder='Email'
										className={
											"w-full h-9 focus:outline-none bg-base-content opacity-60  text-accent font-semibold p-3"
										}
									/>
								</label>
							</div>
						</div>

						<div className='mx-auto mt-5'>
							<LoginButton text={"Send email"} />
						</div>
						<div className='text-center mt-5'>
							<small className='text-accent text-center'>
								<Link
									href='/login'
									className='hover:text-blue-500 active:text-blue-700'>
									Login
								</Link>
							</small>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
