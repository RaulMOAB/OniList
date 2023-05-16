import React from "react";
import RegisterButton from "@/components/Buttons/AuthForms/SubmitButton";
import { useState,useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { IoAt, IoLockClosed, IoPerson } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import ValidationAlert from "../Alerts/Register/ValidationAlert";
import { useRouter } from 'next/router';
import Alert from "@/components/Alerts/Alert_prueba";
import Link from "next/link";

// API Petitions
const sendEmail = async (email) => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+'send/'+email, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

export default function RegisterForm() {

	// Variables
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

  const router = useRouter();
	const username = watch("username");
	const email = watch("email");
	const password = watch("password");
	const [shownPassword, setShownPassword] = useState(false);
	const [shownConfirmPassword, setShownConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
	const [typeAlert, setTypeAlert] = useState("error");
	const [message, setMessage] = useState("");

	// register submit
	const onSubmit = () => {
		console.log(username + "  " + email + "  " + password);

		sendEmail(email)
			.then((res) => {
				console.log(res);

				if (res.success) {
                    console.log("Email enviado");
                    router.push({
                        pathname: '/verification-email',
                        query: { username: username, email: email, password: password }
                    }, '/verification-email');
				} else {
					setMessage(res.error);
					setShowAlert(true);
				}
			})
			.catch((error) => {
				console.error("Error al enviar el formulario:", error);
			});
	};


	// hide or show password
	const switchShownPassword = () => setShownPassword(!shownPassword);
	const switchShownConfirmPassword = () =>
		setShownConfirmPassword(!shownConfirmPassword);

	const validateConfirmPassword = (value) => {
		if (value === password) {
			return true;
		}
		return "Passwords do not match";
	};

	return (
		<>
			<div className='h-screen'>
				<div className='relative container mx-auto md:w-96 rounded-md p-0 md:p-5 sm:p-10 sm:w-full'></div>
				<Alert
					show={showAlert}
					message={message}
					seconds={4}
					setShowError={setShowAlert}
					type={typeAlert}
				/>
				<div className='container mx-auto bg-neutral h-full sm:h-fit sm:my-20 sm:rounded-md p-5 sm:w-96'>
					<div className='m-5 sm:mt-0 mt-40'>
						<h1 className='text-xl font-bold text-center text-accent'>
							Sign up
						</h1>
						<div className='divider'></div>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='form-control'>
						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='flex justify-center input-group input-group-md '>
									<span className='bg-base-content '>
										<IoAt className='text-lg text-accent' />
									</span>
									<input
										placeholder='Email'
										className='w-full h-9 focus:outline-none  bg-base-content  opacity-60 p-3 text-accent font-semibold rounded-md'
										{...register("email", {
											required: true,
											pattern:
												/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
										})}
									/>
								</label>
							</div>

							<small style={{ color: "red" }}>
								{errors.email?.type === "required" && "Email required *"}
								{errors.email?.type === "pattern" && "Input valid email"}
							</small>
						</div>

						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='flex justify-center input-group input-group-md '>
									<span className='bg-base-content '>
										<IoPerson className='text-lg text-accent' />
									</span>
									<input
										placeholder='Name'
										className='w-full h-9 focus:outline-none  bg-base-content  opacity-60 p-3 text-accent font-semibold rounded-md'
										{...register("username", {
											required: true,
											pattern: /^\S*$/,
										})}
									/>
								</label>
							</div>

							<small style={{ color: "red" }}>
								{errors.username?.type === "required" && "Name required *"}
								{errors.username?.type === "pattern" && "Non-whitespaces"}
							</small>
						</div>

						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='relative flex justify-center input-group input-group-md '>
									<span className=' bg-base-content '>
										<IoLockClosed className='text-lg text-accent' />
									</span>
									<input
										type={shownPassword ? "text" : "password"}
										name='password'
										placeholder='Password'
										className='w-full h-9 focus:outline-none  bg-base-content  opacity-60 p-3 z-0 text-accent font-semibold rounded-r-md'
										{...register("password", {
											required: true,
											minLength: 8,
											maxLength: 20,
											pattern: {
												value:
													/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
												message: <ValidationAlert />,
											},
										})}
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
										onClick={switchShownPassword}>
										{shownPassword ? (
											<AiFillEye className='text-lg text-accent' />
										) : (
											<AiFillEyeInvisible className='text-lg text-accent ' />
										)}
									</button>
								</label>
							</div>

							<small style={{ color: "red" }}>
								{errors.password?.type === "required" && "Password required *"}
								{errors.password?.type === "minLength" &&
									"Minimum length 8 characters"}
								{errors.password?.message}
								{errors.password?.type === "maxLength" &&
									"Maximum length 20 characters"}
							</small>
						</div>

						<div className='mb-4 w-full sm:w-11/12 mx-auto'>
							<div className='input-group'>
								<label className='relative flex justify-center input-group input-group-md '>
									<span className=' bg-base-content '>
										<IoLockClosed className='text-lg text-accent' />
									</span>
									<input
										type={shownConfirmPassword ? "text" : "password"}
										placeholder='Confirm Password'
										className='w-full h-9 focus:outline-none  bg-base-content  opacity-60 z-0 p-3 text-accent font-semibold  rounded-r-md'
										{...register("cpassword", {
											required: true,
											validate: validateConfirmPassword,
										})}
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
										onClick={switchShownConfirmPassword}>
										{shownConfirmPassword ? (
											<AiFillEye className='text-lg text-accent rounded-md' />
										) : (
											<AiFillEyeInvisible className='text-lg text-accent rounded-md' />
										)}
									</button>
								</label>
							</div>

							<small style={{ color: "red" }}>
								{errors.cpassword?.type === "required" &&
									"Confirm Password required *"}
								{errors.cpassword?.message}
							</small>
						</div>

						<div className='mb-6 w-11/12 mx-auto text-center'>
							<input
								type='checkbox'
								className='checkbox checkbox-sm checkbox-info align-middle'
								{...register("agreement", { required: "*" })}
							/>

							<small className='ml-2 text-accent'>
								You agree to our terms of service
								<small style={{ color: "red", fontSize: 15 }}>
									{errors.agreement?.message}
								</small>
							</small>
						</div>

						<div className='mb-8 mx-auto'>
							<RegisterButton text='Register' />
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
