import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Alert from "@/components/Alerts/Alert_prueba";
import Head from "next/head";
import { IoAt } from "react-icons/io5";
import Link from "next/link";
import LoginButton from "@/components/Buttons/AuthForms/SubmitButton";

export default function ForgotForm() {
	const { fetchData } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");
	const [typeAlert, setTypeAlert] = useState("");

	//Send email
	const handleSubmit = (event) => {
		event.preventDefault();
		let endpoint = "forgot-password";
		let method = "POST";
		let body = JSON.stringify({ email });
		fetchData(endpoint, method, body).then((response) => {
			let response_key = Object.keys(response)[0];
			setTypeAlert(response_key);
			setMessage(response[response_key]);
			setShowError(true);
		});
	};
	return (
		<>
			<Head>
				<title>Forgot password · Onilist</title>
			</Head>
			<div className=' h-screen'>
				<div className='relative container mx-auto md:w-96 rounded-md p-0 md:p-5 sm:p-10 sm:w-full'></div>

				<Alert
					show={showError}
					message={message}
					seconds={3}
					setShowError={setShowError}
					type={typeAlert}
				/>
				<div className='container mx-auto bg-neutral h-full sm:h-fit sm:my-20 sm:rounded-md p-5 sm:w-96'>
					<div className='m-5 sm:mt-0 mt-40'>
						<h1 className='text-xl text-accent font-bold text-center'>
							Forgot password
						</h1>
						<div className='divide-double'></div>
					</div>
					<form
						onSubmit={(event) => handleSubmit(event)}
						className='form-control mt-8'>
						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='flex justify-center input-group input-group-md '>
									<span className='bg-base-content '>
										<IoAt className='text-lg text-accent' />
									</span>
									<input
										type='email'
										value={email}
										onChange={(event) => setEmail(event.target.value)}
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
