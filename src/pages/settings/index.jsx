/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import VerifyIfUserIsLogged from "@/components/Common/VerifyIfUserIsLogged";
import SettingsPage from "@/layouts/settingsPage/SettingsPage";
import { ThemeContext } from "@/contexts/ThemeContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { BsImageFill } from "react-icons/bs";
import Alert from "@/components/Alerts/Alert_prueba";
import Head from "next/head";

function Settings() {
	const { changeTheme } = useContext(ThemeContext);
	const { user, fetchData, updateUser, hasChanged } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState({});
	const [about, setAbout] = useState(userInfo.description);
	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			let endpoint = "user/" + user.id;
			fetchData(endpoint).then((res_user) => {
				setUserInfo(res_user);
				setAbout(res_user.description)
			});
		} else {
			setUserInfo({});
		}
	}, [hasChanged,user]);


	//Alert states
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");
	const [typeAlert, setTypeAlert] = useState("");

	const TYPE_ERROR = "error";
	const TYPE_SUCCESS = "success";
	const BANNER = "banner";
	const PROFILE = "profile";

	const handleAboutChange = (value) => {
		setAbout(value);
	};

	useEffect(() => {}, [about, user]);

	const updateDescription = () => {
		let endpoint = "update/description";
		let method = "POST";
		let body = JSON.stringify({
			id: user.id,
			description: about,
		});
		fetchData(endpoint, method, body).then((response) => {
			let response_key = Object.keys(response)[0];
			setTypeAlert(response_key);
			setMessage(response[response_key]);
			setShowError(true);
		});
		updateUser();
	};
	const changeImage = (image, type) => {
		console.log(image);
		if (
			(image.type === "image/jpg" ||
				image.type === "image/jpeg" ||
				image.type === "image/webp" ||
				image.type === "image/png") &&
			image.size <= 3000000
		) {
			let endpoint = "update/image";
			let method = "POST";
			let selected_image = image;
			let formData = new FormData();
			formData.append("id", user.id);
			formData.append("type", type);
			formData.append("image", selected_image, selected_image.name);

			fetchData(endpoint, method, formData, "image").then((response) => {
				let response_key = Object.keys(response)[0];
				setTypeAlert(response_key);
				setMessage(response[response_key]);
				setShowError(true);
			});

			updateUser();
		} else {
			setTypeAlert("error");
			if (image.size > 3000000) {
				setMessage("The image must not exceed 3MB");
			} else {
				setMessage("Not allowed format image.");
			}
			setShowError(true);
		}
	};

	return (
		//TODO verifyLogin
		//TODO NAVBAR LINKS
		<>
			<Head>
				<title>Profile · OniList</title>
			</Head>
			<Alert
				show={showError}
				message={message}
				seconds={3.5}
				setShowError={setShowError}
				type={typeAlert}
			/>
			<SettingsPage>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<h5 className='mb-2'>Site theme</h5>
					<div className=''>
						<div className='flex'>
							<div>
								<button
									onClick={() => {
										changeTheme("oni-ligth");
									}}
									className='w-9 h-9 text-2xl mr-2 border-2 border-accent-focus text-gray-900 font-semibold bg-gray-100 rounded-md'>
									A
								</button>
								<button
									onClick={() => {
										changeTheme("oni-dark");
									}}
									className='w-9 h-9 text-2xl mr-2 border-2 border-accent-focus text-gray-100 font-semibold bg-black rounded-md'>
									A
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<h5 className='mb-2'>About me</h5>
					<textarea
						value={about}
						className='textarea bg-base-300 w-full mb-2 h-32'
						placeholder='About me'
						onChange={(e) => handleAboutChange(e.target.value)}></textarea>
					<PrimaryButton
						text={"Save"}
						event={updateDescription}
					/>
				</div>
				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-2'>
						<h5>Avatar</h5>
						<small className='font-thin italic'>
							Allowed Formats: JPG, JPEG, PNG. Max size: 3mb
						</small>
					</div>
					<div>
						<div className='flex lg:flex-row flex-col'>
							<div className='rounded-md shadow-xl bg-base-300 w-52 h-52 p-2'>
								<div className='flex'>
									<div className='flex items-center justify-center cursor-pointer h-48 w-48 border-2 rounded-md border-dashed border-gray-800 hover:bg-base-200 hover:border-base-300'>
										<div className='flex flex-col items-center'>
											<BsImageFill className='w-8 h-8' />
											<p className='pt-1 text-sm tracking-wider text-accent'>
												Select a photo
											</p>
										</div>
										<input
											onChange={(e) => changeImage(e.target.files[0], PROFILE)}
											type='file'
											className='opacity-0 absolute w-48 h-48'
										/>
									</div>
								</div>
							</div>
							<div className='lg:mx-5 lg:my-0 my-3 lg:aspect-square '>
								<img
									draggable={false}
									alt='Profile image'
									src={
										process.env.NEXT_PUBLIC_RESOURCES_PROFILE +
										"" +
										userInfo.profile_image
									}
									className='rounded-md'
									width={200}
									height={200}></img>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full text-accent font-semibold text-sm mb-8'>
					<div className='mb-2'>
						<h5>Banner</h5>
						<small className='font-thin italic'>
							Allowed Formats: JPG, JPEG, PNG. Max size: 3mb
						</small>
					</div>
					<div>
						<div className='flex flex-col lg:flex-row'>
							<div className='rounded-md shadow-xl bg-base-300 w-52 h-52 p-2'>
								<div className='flex'>
									<div className='flex items-center justify-center cursor-pointer h-48 w-48 border-2 rounded-md border-dashed border-gray-800 hover:bg-base-200 hover:border-base-300'>
										<div className='flex flex-col items-center'>
											<BsImageFill className='w-8 h-8' />
											<p className='pt-1 text-sm tracking-wider text-accent'>
												Select a photo
											</p>
										</div>
										<input
											onChange={(e) => changeImage(e.target.files[0], BANNER)}
											type='file'
											className='opacity-0 absolute w-48 h-48'
										/>
									</div>
								</div>
							</div>
							<div className=' lg:mx-5 my-3 lg:my-0 h-full'>
								<img
									draggable={false}
									alt='Banner image'
									src={
										process.env.NEXT_PUBLIC_RESOURCES_BANNER +
										"" +
										userInfo.banner_image
									}
									className='rounded-md h-52 object-cover'></img>
							</div>
						</div>
					</div>
				</div>
			</SettingsPage>
		</>
	);
}

export default Settings;
