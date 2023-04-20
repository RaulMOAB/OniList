import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { IoAt, IoLockClosed } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LoginButton from "@/components/Buttons/AuthForms/SubmitButton";

import ErrorAlert from "@/components/Alerts/Login/ErrorAlert";

const getLoginResponse = async (email, password) => {
  const body = JSON.stringify({
    email,
    password,
  });
  const response = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body,
  });
  return response.json();
};

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginResponse, setLoginResponse] = useState(null);
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState('');

  const { login } = useContext(AuthContext);

  const handlePasswordChange = (written_password) => {
    setPassword(written_password);
  };
  const handleEmailChange = (written_email) => {
    setEmail(written_email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getLoginResponse(email, password)
      .then((res) => {
        setLoginResponse(res);
        console.log(res);

        if (res.status === "success") {
          //save user in context
          login(res.user);
        } else {
          //set message if indexOf find a "(" that means laravel give 2 errors or more but i just want show first
          let index_of_parenthesis = res.message.indexOf("(");
          let message =
            index_of_parenthesis != -1
              ? res.message.slice(0, index_of_parenthesis)
              : res.message;
          setMessage(message);
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

	return (
		<>
			<div className=' md:min-h-screen sm:h-full'>
				<div className='relative container mx-auto md:w-96 rounded p-5 sm:w-full'>
					{loginResponse && (
						<ErrorAlert
							show={showError}
							message={message}
							resetAlert={resetAlert}
						/>
					)}
				</div>
				<div className='container mx-auto bg-slate-50 md:w-96 my-20 rounded p-5 sm:w-full'>
					<div className='m-10'>
						<h1 className='text-xl text-gray-500 font-bold text-center'>Login</h1>
						<hr className='my-5' />
					</div>
					<form
						onSubmit={(event) => handleSubmit(event)}
						className='form-control mt-8'>
						<div className='input-group mb-5'>
							<label className='flex justify-center input-group input-group-md '>
								<span className='bg-slate-200'>
									<IoAt className='text-lg' />
								</span>
								<input
									type='email'
									value={email}
									onChange={(event) => handleEmailChange(event.target.value)}
									placeholder='Email'
									className={"h-9 focus:outline-none bg-slate-200 p-3"}
								/>
							</label>
						</div>
						<div className='input-group mb-5'>
							<label className='flex justify-center input-group input-group-md '>
								<span className='bg-slate-200'>
									<IoLockClosed className='text-lg' />
								</span>
								<input
									type='password'
									value={password}
									onChange={(event) => handlePasswordChange(event.target.value)}
									placeholder='••••••••••'
									className='h-9 focus:outline-none bg-slate-200 p-3'
								/>
							</label>
						</div>
						<div className='mx-auto mt-5'>
							<LoginButton text={'Login'} />
						</div>
						<div className='text-center mt-5'>
							<small className='text-gray-500 text-center'>
								<a
									href=''
									className='hover:text-red-500 active:text-red-700'>
									Forgot password?
								</a>
							</small>
						</div>
						<div className='text-center mt-5'>
							<small className='text-gray-500 text-center'>
								Not registered yet?&nbsp;
								<a
									href=''
									className='hover:text-red-500 active:text-red-700'>
									Create an account
								</a>
							</small>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
