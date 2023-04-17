import React from 'react'
import RegisterButton from './../Buttons/RegisterButton'

export default function RegisterForm() {
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
                            placeholder='Email'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>
                    
                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            placeholder='Name'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder='Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>

                    <div className='mb-6 w-11/12 mx-auto'>
                        <input 
                            type="password" 
                            name="confirm_password" 
                            id="confirm_password"
                            placeholder='Confirm Password'
                            className='w-full h-9 focus:outline-none bg-slate-200 opacity-60 p-3 rounded ' />
                    </div>
					
                    <div className='mb-9 mx-auto'>
                        <input 
                            type="checkbox" 
                            name="terms" 
                            id="terms" />
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
