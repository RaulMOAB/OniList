import React from 'react';
import RegisterButton from './../Buttons/RegisterButton';
import { useState } from "react";
import { useForm } from "react-hook-form";

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
        return "No coinciden las contraseñas";
    };

    return (
		<>
			<div className='container mx-auto bg-slate-50 md:w-96 w-full my-10 rounded p-5'>
				<div className='m-5'>
					<h1 
                        className='text-xl font-bold text-center'
                        style={{color: '#5C728A'}}>
                            Sign up to OniList 
                    </h1>
				</div>
				<form 
                    onSubmit={handleSubmit(onSubmit)}   
                    className='form-control mt-12'>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            placeholder='Email'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded'
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                            })} />

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.email?.type === "required" && "Email requerido"}
                                    {errors.email?.type === "pattern" &&
                                    "Introduce un email valido"}
                                </error>
                            </small>
                            

                            
                    </div>
                    
                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            placeholder='Name'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                            {...register("username", { required: true })} />

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.username?.type === "required" && "Nombre requerido"}
                                </error>
                            </small>
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            name="password"
                            placeholder='Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })} />

                            <small style={{color:'red'}}>
                                <error>
                                    {errors.password?.type === "required" && "Contraseña requerida"}
                                    {errors.password?.type === "minLength" &&
                                    "Minimo 6 caracteres"}
                                    {errors.password?.type === "maxLength" &&
                                    "Maximo 20 caracteres"}
                                </error>
                            </small>
                        

                            
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            placeholder='Confirm Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' 
                            {...register("cpassword", { required: true, validate: validateConfirmPassword })}/>

                        <small style={{color:'red'}}>
                            <error>
                                {errors.cpassword?.message}
                            </error>
                        </small>

                    </div>

                    <div className='mb-8 mx-auto'>
                        <RegisterButton/>
                    </div>
				</form>
			</div>
		</>
	);
}

// Arreglar las vistas inferiores
// Enviar los datos para el registro
// enviar codigo de validacion para completar el registro
// mostrar modal del error
// ocultar el campo contraseña
// cambiar diseño del registro
// cambiar los mensajes a ingles
// validar que este marcado el checkbox