import React from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SettingsPage from "@/layouts/settingsPage/SettingsPage";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import AuthConfirmModal from "@/components/Modals/AuthConfirmModal";
import { AiFillEyeInvisible, AiFillEye, AiFillHeart } from "react-icons/ai";
import Alert from "@/components/Alerts/Alert_prueba";
import Head from "next/head";

function Account() {
	const router = useRouter();
	const { user, logout, fetchData, updateUser } = useContext(AuthContext);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showSaveUsernameButton, setShowSaveUsernameButton] = useState(false);
	const [showSaveEmailButton, setShowSaveEmailButton] = useState(false);

  const [shownPassword, setShownPassword] = useState(false);
  const [shownConfirmPassword, setConfirmShownPassword] = useState(false);
	const switchShownPassword = () => setShownPassword(!shownPassword);
	const switchShownConfirmPassword = () =>
		setConfirmShownPassword(!shownConfirmPassword);

	const [showCodeInput, setShowCodeInput] = useState(false);
	const [showSendCodeButtons, setShowSendCodeButtons] = useState(false);
	const [showSavePasswordButton, setShowSavePasswordButton] = useState(false);
	//Alert states
	const [showAlert, setShowAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [typeAlert, setTypeAlert] = useState("");

	useEffect(() => {}, [username, email, newPassword, confirmPassword]);

	const handleDeleteAccount = (password) => {
		let endpoint = `account/delete/${user.id}`;
		let method = "POST";
		let body = JSON.stringify({ password });
		fetchData(endpoint, method, body).then((response) => {
			let response_key = Object.keys(response)[0];
			if (response_key === "error") {
				setTypeAlert(response_key);
				setMessage(response[response_key]);
				setShowAlert(true);
			} else {
				logout();
			}
		});
	};
	const updateUsername = (password) => {
		const regex = /^[a-zA-Z0-9]*$/;
		if (
			username.includes(" ") ||
			username.length > 16 ||
			username.length < 3 ||
			!regex.test(username)
		) {
			setTypeAlert("error");
			if (username.includes(" ")) {
				setMessage("Username contains white spaces.");
			} else if (username.length > 16) {
				setMessage("Username exceeds the 16 character limit.");
			} else if (!regex.test(username)) {
				setMessage("Your new user name should not contain symbols.");
			} else {
				setMessage("Your new username must contain at least 3 characters.");
			}
			setShowAlert(true);
		} else {
			let endpoint = "update/username";
			let method = "POST";
			let body = JSON.stringify({ id: user.id, username, password });
			fetchData(endpoint, method, body).then((response) => {
				let response_key = Object.keys(response)[0];
				if (response_key === "error") {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
				} else {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
					updateUser();
				}
			});
		}
	};
	const updateEmail = (password) => {
		const emailRegex = /[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
		if (emailRegex.test(email)) {
			let endpoint = "send/registered-user-code";
			let method = "POST";
			let body = JSON.stringify({
				email,
				password,
				id: user.id,
			});

			fetchData(endpoint, method, body).then((response) => {
				let response_key = Object.keys(response)[0];
				if (response_key !== "error") {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
					setShowCodeInput(true);
				} else {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
				}
			});
		} else {
			setTypeAlert("error");
			setMessage("The email entered does not look like an email.");
			setShowAlert(true);
		}
	};

	const verifyCode = () => {
		let endpoint = "update/email";
		let body = JSON.stringify({
			id: user.id,
			email,
			code,
		});
		let method = "POST";

		fetchData(endpoint, method, body).then((response) => {
			let response_key = Object.keys(response)[0];
			if (response_key === "success") {
				setTypeAlert(response_key);
				setMessage(response[response_key]);
				setShowAlert(true);
				updateUser();
				setShowCodeInput(false);
				setCode("");
				setShowSaveEmailButton(false);
			} else {
				setTypeAlert(response_key);
				setMessage(response[response_key]);
				setShowAlert(true);
			}
		});
	};
	const resendEmail = () => {
		let endpoint = "send/" + email;
		fetchData(endpoint).then((response) => {
			let response_key = Object.keys(response)[1];
			if (response[response_key] !== "failed") {
				setTypeAlert("info");
				setMessage("Check your mail box, the code has been resent.");
				setShowAlert(true);
			} else {
				setTypeAlert("error");
				setMessage("Something went wrong.");
				setShowAlert(true);
			}
		});
	};

	const updatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
		if (passwordRegex.test(newPassword) && newPassword === confirmPassword) {
			let endpoint = "update/password";
			let body = JSON.stringify({
				id: user.id,
				last_password: password,
				new_password: newPassword,
			});
			let method = "POST";

			fetchData(endpoint, method, body).then((response) => {
				let response_key = Object.keys(response)[0];
				if (response_key === "success") {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
					setShowSavePasswordButton(false);
					setNewPassword("");
					setConfirmPassword("");
					updateUser();
				} else {
					setTypeAlert(response_key);
					setMessage(response[response_key]);
					setShowAlert(true);
				}
			});
		} else {
			if (!passwordRegex.test(newPassword)) {
				setTypeAlert("error");
				setMessage(
					"The password must contain uppercase, lowercase, symbols, numbers and a minimum of 8 characters."
				);
				setShowAlert(true);
			}
			if (newPassword !== confirmPassword) {
				setTypeAlert("error");
				setMessage("Passwords entered do not match.");
				setShowAlert(true);
			}
		}
	};

	return (
		<>
			<Head>
				<title>Settings · OniList</title>
			</Head>
			<Alert
				show={showAlert}
				message={message}
				seconds={5}
				setShowError={setShowAlert}
				type={typeAlert}
			/>
			<SettingsPage>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-2'>
						<h5>Username</h5>
					</div>
					<input
						type='text'
						value={username}
						autoComplete='off'
						onChange={(e) => {
							setUsername(e.target.value);
							e.target.value === user.username
								? setShowSaveUsernameButton(false)
								: setShowSaveUsernameButton(true);
						}}
						className='input h-10 w-full text-accent bg-base-300 text-sm mb-4'
					/>
					<div className={showSaveUsernameButton ? "" : "hidden"}>
						<label
							htmlFor='confirm-update-username-modal'
							className='cursor-pointer py-2 px-4 bg-primary text-white font-semibold  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
							Save
						</label>
					</div>
				</div>

				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-2'>
						<h5>Email</h5>
					</div>
					<input
						type='email'
						value={email}
						autoComplete='off'
						onChange={(e) => {
							setEmail(e.target.value);
							e.target.value === user.email
								? setShowSaveEmailButton(false)
								: setShowSaveEmailButton(true);
						}}
						className='input h-10 w-full text-accent bg-base-300 text-sm mb-4'
					/>
					<div className={showSaveEmailButton ? "mb-4" : "hidden"}>
						<label
							htmlFor='confirm-update-email-modal'
							className='cursor-pointer py-2 px-4 bg-primary text-white font-semibold  rounded-sm shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
							Save
						</label>
					</div>
					<div className={showCodeInput ? "" : "hidden"}>
						<div className='mb-2'>
							<h5>Verify code</h5>
						</div>
						<input
							type='text'
							value={code}
							autoComplete='off'
							onChange={(e) => {
								setCode(e.target.value);
							}}
							className='input h-10 w-full text-accent bg-base-300 text-sm mb-4'
						/>
						<SecondaryButton
							text='Resend'
							event={resendEmail}
						/>{" "}
						<span>
							<PrimaryButton
								text='Verify'
								event={verifyCode}
							/>
						</span>
					</div>
				</div>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-2'>
						<h5>Change password</h5>
					</div>
					<div className='relative'>
						<input
							type={shownPassword ? "text" : "password"}
							value={newPassword}
							autoComplete='off'
							placeholder='Enter a new password'
							onChange={(e) => {
								setNewPassword(e.target.value);
								setShowSavePasswordButton(true);
							}}
							className='input h-10 w-full text-accent bg-base-300 text-sm mb-4'
						/>
						<button
							type='button'
							className='absolute right-0 top-3 px-4'
							onClick={switchShownPassword}>
							{shownPassword ? (
								<AiFillEye className='text-lg text-accent' />
							) : (
								<AiFillEyeInvisible className='text-lg text-accent' />
							)}
						</button>
					</div>

					<div className='relative'>
						<input
							type={shownConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							autoComplete='off'
							placeholder='Confirm password'
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setShowSavePasswordButton(true);
							}}
							className='input h-10 w-full text-accent bg-base-300 text-sm mb-4'
						/>
						<button
							type='button'
							className='absolute right-0 top-3 px-4'
							onClick={switchShownConfirmPassword}>
							{shownConfirmPassword ? (
								<AiFillEye className='text-lg text-accent' />
							) : (
								<AiFillEyeInvisible className='text-lg text-accent' />
							)}
						</button>
					</div>
					<div className={showSavePasswordButton ? "" : "hidden"}>
						<label
							htmlFor='confirm-update-password-modal'
							className='cursor-pointer py-2 px-4 bg-primary text-white font-semibold  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
							Save
						</label>
					</div>
				</div>
				<div className='w-full h-px bg-gray-400 opacity-50 rounded-full mb-8'></div>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-1 text-secondary'>
						<h5>Delete User Account</h5>
					</div>
					<p className='mb-5 text-accent font-thin text-md'>
						Warning! this action will delete your account permanently and there
						will be no way to get it back.
					</p>
					<label
						htmlFor='confirm-delete-account-modal'
						className='cursor-pointer py-2 px-4 bg-secondary text-white font-semibold  rounded-sm shadow-md hover:shadow-red-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
						Delete Account
					</label>
				</div>
				<div className='w-full h-px bg-gray-400 opacity-50 rounded-full mb-8'></div>
				<div className='w-full text-accent font-semibold text-sm'>
					<div className='mb-1 text-green-600'>
						<h5>Thanks</h5>
					</div>
					<p className='mb-5 text-accent font-thin text-md'>
						Thanks for choosing us to manage all your anime and mangas, any
						suggestion is welcome :D.
					</p>
					<div className='flex'>
						<a
							href='mailto:onilist.sl@gmail.com'
							className=' flex mr-2 cursor-pointer py-2 px-4 bg-primary text-white font-semibold  rounded-sm shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
							Contact us
						</a>
						<div className='flex relative'>
							<a
								href='https://www.paypal.com/es/home'
								target='_blank'
								className='cursor-pointer py-2 pr-7 px-4 bg-primary text-white font-semibold  rounded-sm shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform'>
								Donate
								<div className='absolute top-1/2 transform -translate-y-1/2 right-2'>
									<AiFillHeart className='text-md text-red-400 ' />
								</div>
							</a>
						</div>
					</div>
				</div>
			</SettingsPage>

			<AuthConfirmModal
				id='confirm-delete-account-modal'
				action={handleDeleteAccount}
				header='Delete Account'
				message='This action is dangerous, are you sure you want to delete your account?'
				confirm_button_text='Delete'
				cancel_button_text='Cancel'
			/>
			<AuthConfirmModal
				id='confirm-update-email-modal'
				action={updateEmail}
				header='Update Email'
				message='Are you sure you want to update your email?'
				confirm_button_text='Update'
				cancel_button_text='Cancel'
			/>
			<AuthConfirmModal
				id='confirm-update-password-modal'
				action={updatePassword}
				header='Update Password'
				message='Are you sure you want to update your password?'
				confirm_button_text='Update'
				cancel_button_text='Cancel'
			/>

			<AuthConfirmModal
				id='confirm-update-username-modal'
				action={updateUsername}
				header='Update username'
				message='Are you sure you want to change your username?'
				confirm_button_text='Change'
				cancel_button_text='Cancel'
			/>
		</>
	);
}

export default Account;
