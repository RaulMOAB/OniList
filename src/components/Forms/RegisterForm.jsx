import React from 'react';
import RegisterButton from './../Buttons/RegisterButton';
import { useState } from "react";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);

    const handleNameChange = (data) => {
		setName(data);
	};
	const handleEmailChange = (data) => {
		setEmail(data);
	};
    const handlePasswordChange = (data) => {
		setPassword(data);
	};
	const handleConfirmPasswordChange = (data) => {
		setConfirmPassword(data);
	};
    const handleTermsChange = (data) => {
        console.log(data);
		setTerms(data);
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
                    action='' 
                    className='form-control mt-12'>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={email}
							onChange={(event) => handleEmailChange(event.target.value)}
                            placeholder='Email'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>
                    
                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={name}
							onChange={(event) => handleNameChange(event.target.value)}
                            placeholder='Name'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            value={password}
							onChange={(event) => handlePasswordChange(event.target.value)}
                            placeholder='Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="password" 
                            name="confirm_password" 
                            id="confirm_password"
                            value={confirmPassword}
							onChange={(event) => handleConfirmPasswordChange(event.target.value)}
                            placeholder='Confirm Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>
					
                    <div className='mb-9 mx-auto'>
                        <input 
                            type="checkbox" 
                            name="terms" 
                            id="terms" 
                            value={terms}
                            onChange={(event) => handleTermsChange(event.target.value)}/>
                        <small className='ml-2'>
                            <label 
                                htmlFor="terms"
                                style={{color:'#7A858F'}}>
                                    You agree to our terms of service
                            </label>
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

// Validar en front al salir del campo
// Validar confirmacion de contraseña en laravel
// Activar el boton cuanto este todo correcto
// Arreglar las vistas inferiores
// Enviar los datos para el registro
