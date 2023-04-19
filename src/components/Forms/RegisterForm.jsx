import React from 'react';
import RegisterButton from "@/components/Buttons/AuthForms/SubmitButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAt, IoLockClosed, IoPerson } from "react-icons/io5";

const getRegisterResponse = async (username, email, password) => {
	const body = JSON.stringify({
        username,
		email,
		password,
	});
	const response = await fetch("http://127.0.0.1:8000/api/register", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body,
	});
	return response.json();
};

export default function RegisterForm() {

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();

    const username = watch("username");
    const email = watch("email");
    const password = watch("password");

    const [registerResponse, setRegisterResponse] = useState(null);
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState('');

    const onSubmit = () => {

        console.log(username + "  " + email + "  " + password);

		getRegisterResponse(username,email,password)
			.then((res) => {
				setRegisterResponse(res);
				console.log(res);

				if(res.status === 'success'){
					//save user in context
					//login(res.user);
					//TODO redirect home
                    console.log("register done")
				}else{
					//set message if indexOf find a "(" that means laravel give 2 errors or more but i just want show first
					let index_of_parenthesis = res.message.indexOf("(");
					let message = index_of_parenthesis!=-1 ? res.message.slice(0,index_of_parenthesis) : res.message 
					setMessage(message)
					setShowError(true);
				}

			})
			.catch((error) => {
				console.error("Error al enviar el formulario:", error);
			});
	};

    const resetAlert = () => {
		setShowError(false);
	};


    const validateConfirmPassword = (value) => {
        if (value === password) {
          return true;
        }
        return "Passwords do not match";
    };

    return (
			<div className='min-h-screen'>
				<div className='relative container mx-auto md:w-96 rounded p-5 sm:w-full'>
				</div>
				<div className='container mx-auto bg-slate-50 md:w-96 w-full my-20 rounded-md p-5'>
					<div className='m-5'>
						<h1
							className='text-xl font-bold text-center'
							style={{ color: "#5C728A" }}>
							Sign up
						</h1>
						<hr className='my-5' />
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='form-control mt-10'>

						<div className='mb-4 w-4/5 mx-auto'>
                            <div className='input-group'>
                                <label className='flex justify-center input-group input-group-md '>
                                    <span className='bg-gray-300'>
                                        <IoAt className='text-lg' />
                                    </span>
                                    <input 
                                    placeholder='Email'
                                    className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded'
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                    })} />

                                </label>
                            </div>

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.email?.type === "required" && "Email required *"}
                                    {errors.email?.type === "pattern" && "Input valid email"}
                                </error>
                            </small>
                        </div>

                    

                        <div className='mb-4 w-4/5 mx-auto'>
                            <div className='input-group'>
                                <label className='flex justify-center input-group input-group-md '>
                                    <span className='bg-gray-300'>
                                        <IoPerson className='text-lg' />
                                    </span>
                                    <input 
                                        placeholder='Name'
                                        className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                                        {...register("username", { required: true })} 
                                    />
                                </label>
                            </div>

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.username?.type === "required" && "Name required *"}
                                </error>
                            </small>
                        </div>


                        <div className='mb-4 w-4/5 mx-auto'>
                            <div className='input-group'>
                                <label className='flex justify-center input-group input-group-md '>
                                    <span className='bg-gray-300'>
                                        <IoLockClosed className='text-lg' />
                                    </span>
                                    <input 
                                        name="password"
                                        placeholder='Password'
                                        className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20, })} 
                                    />
                                </label>
                            </div>

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.password?.type === "required" && "Password required *"}
                                    {errors.password?.type === "minLength" &&
                                    "Minimum length 6 characters"}
                                    {errors.password?.type === "maxLength" &&
                                    "Maximum length 20 characters"}
                                </error>
                            </small>
                        </div>


                        <div className='mb-5 w-4/5 mx-auto'>
                            <div className='input-group'>
                                <label className='flex justify-center input-group input-group-md '>
                                    <span className='bg-gray-300'>
                                        <IoLockClosed className='text-lg' />
                                    </span>
                                    <input 
                                        placeholder='Confirm Password'
                                        className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                                        {...register("cpassword", { required: true, validate: validateConfirmPassword })}
                                    />
                                </label>
                            </div>

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.cpassword?.type === "required" && "Confirm Password required *"}
                                    {errors.cpassword?.message}
                                </error>
                            </small>
                        </div>


						<div className='mb-6 w-11/12 mx-auto text-center'>
							<input
								type='checkbox'
								className='checkbox checkbox-sm checkbox-info align-middle'
								{...register("agreement", { required: "*" })}
							/>

							<small
								className='ml-2'
								style={{ color: "#5C728A" }}>
								You agree to our terms of service
								<small style={{ color: "red", fontSize: 15 }}>
									<error>{errors.agreement?.message}</error>
								</small>
							</small>
						</div>

						<div className='mb-8 mx-auto'>
							<RegisterButton text='Register'/>
						</div>
					</form>
				</div>
			</div>
		);
}

// Arreglar las vistas 
// Enviar los datos para el registro
// enviar codigo de validacion para completar el registro
// mostrar modal del error
// ocultar el campo contraseña