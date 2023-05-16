import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@/components/Alerts/Alert_prueba";
import { IoAt, IoLockClosed } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import LoginButton from "@/components/Buttons/AuthForms/SubmitButton";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Head from "next/head";
export default function RecoverPassword() {
	const { fetchData } = useContext(AuthContext);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [code, setCode] = useState("");

	const [shownPassword, setShownPassword] = useState(false);
	const [shownConfirmPassword, setShownConfirmPassword] = useState(false);

	const [showAlert, setShowAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [typeAlert, setTypeAlert] = useState("");
	const [attempts, setAttempts] = useState(3);
	const router = useRouter();

	const token = router.query.token;

	const switchShownPassword = () => setShownPassword(!shownPassword);
	const switchShownConfirmPassword = () =>
		setShownConfirmPassword(!shownConfirmPassword);

	const handleSubmit = (event) => {
		event.preventDefault();

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
		if (passwordRegex.test(password) && password === confirmPassword) {
			let endpoint = "renew-password";
			let body = JSON.stringify({
				code,
				token,
				password,
				attempts,
			});
			let method = "POST";

			fetchData(endpoint, method, body).then((response) => {
				let response_key = Object.keys(response)[0];
				if (response_key === "success") {
          setPassword("");
          setConfirmPassword("");
          setCode("");
					router.push({
						pathname: "/login",
						query: { message: response[response_key] },
					});
				} else if (response.invalid_attempt) {
					let count_attempt = attempts - 1;
					setAttempts(count_attempt);
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
					setCode("");
				} else {
					let count_attempt = attempts - 1;
					if (count_attempt < -2) {
						router.push("/");
					}
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
				}
			});
		} else {
			if (!passwordRegex.test(password)) {
				setTypeAlert("error");
				setMessage(
					"The password must contain uppercase, lowercase, symbols, numbers and a minimum of 8 characters."
				);
				setShowAlert(true);
			}
			if (password !== confirmPassword) {
				setTypeAlert("error");
				setMessage("Passwords entered do not match.");
				setShowAlert(true);
			}
		}
	};

	return (
		<>
			<Head>
				<title>Renew password · Onilist</title>
			</Head>
			<div className=' h-screen'>
				<div className='relative container mx-auto md:w-96 rounded-md p-0 md:p-5 sm:p-10 sm:w-full'></div>
				<Alert
					show={showAlert}
					message={message}
					seconds={3}
					setShowError={setShowAlert}
					type={typeAlert}
				/>
				<div className='container mx-auto bg-neutral h-full sm:h-fit sm:my-20 sm:rounded-md p-5 sm:w-96'>
					<div className='m-5 sm:mt-0 mt-40'>
						<h1 className='text-xl text-accent font-bold text-center'>
							Renew Password
						</h1>
						<div className='divide-double'></div>
					</div>
					<form
						onSubmit={(event) => handleSubmit(event)}
						className='form-control mt-8'>
						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='relative flex justify-center input-group input-group-md'>
									<span className='bg-base-content '>
										<IoLockClosed className='text-lg text-accent' />
									</span>
									<input
										type={shownPassword ? "text" : "password"}
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										placeholder='Password'
										className='w-full h-9 focus:outline-none bg-base-content  opacity-60 p-3 rounded-r-md font-semibold text-accent'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 flex items-center px-4'
										onClick={switchShownPassword}>
										{shownPassword ? (
											<AiFillEye className='text-lg text-accent' />
										) : (
											<AiFillEyeInvisible className='text-lg text-accent' />
										)}
									</button>
								</label>
							</div>
						</div>

						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='relative flex justify-center input-group input-group-md'>
									<span className='bg-base-content '>
										<IoLockClosed className='text-lg text-accent' />
									</span>
									<input
										type={shownConfirmPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(event) => setConfirmPassword(event.target.value)}
										placeholder='Confirm password'
										className='w-full h-9 focus:outline-none bg-base-content  opacity-60 p-3 rounded-r-md font-semibold text-accent'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 flex items-center px-4'
										onClick={switchShownConfirmPassword}>
										{shownConfirmPassword ? (
											<AiFillEye className='text-lg text-accent' />
										) : (
											<AiFillEyeInvisible className='text-lg text-accent' />
										)}
									</button>
								</label>
							</div>
						</div>
						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='relative flex justify-center input-group input-group-md'>
									<span className='bg-base-content '>
										<MdVerifiedUser className='text-lg text-accent' />
									</span>
									<input
										type={"text"}
										value={code}
										onChange={(event) => setCode(event.target.value)}
										placeholder='Verification code'
										className='w-full h-9 focus:outline-none bg-base-content  opacity-60 p-3 rounded-r-md font-semibold text-accent'
									/>
								</label>
							</div>
						</div>

						<div className='mx-auto mt-5'>
							<LoginButton text={"Renew"} />
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
