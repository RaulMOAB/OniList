import React from 'react'
import LoginButton from '../Buttons/LoginButton';
import { IoAt, IoLockClosed } from "react-icons/io5";


export default function LoginForm() {
  return (
		<>
			<div className='container mx-auto bg-slate-50 w-96 my-10 rounded p-5'>
				<div className='m-5'>
					<h1 className='text-xl font-bold text-center'>Login</h1>
				</div>
				<form
					action=''
					className='form-control mt-8'>
					<div className='input-group mb-5'>
						<label className='flex justify-center input-group input-group-md '>
							<span className='bg-gray-300'>
								<IoAt className='text-lg' />
							</span>
							<input
								type='email'
								placeholder='Email'
								className='h-9 focus:outline-none bg-slate-200 p-3'
							/>
						</label>
					</div>
					<div className='input-group mb-5'>
						<label className='flex justify-center input-group input-group-md '>
							<span className='bg-gray-300'>
								<IoLockClosed className='text-lg' />
							</span>
							<input
								type='email'
								placeholder='********'
								className='h-9 focus:outline-none bg-slate-200 p-3'
							/>
						</label>
					</div>
					<div className='mx-auto mt-5'>
						<LoginButton />
					</div>
					<div className='text-center mt-2'>
						<a href=''>
							<small className='text-gray-500 text-center'>
								Forgot password?
							</small>
						</a>
					</div>
					<div className='text-center mt-2'>
						<a href=''>
							<small className='text-gray-500 text-center'>
								Not registered yet? Create an account
							</small>
						</a>
					</div>
				</form>
			</div>
		</>
	);
}
