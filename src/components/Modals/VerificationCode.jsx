import { useForm } from "react-hook-form";
import VerificationButton from "@/components/Buttons/AuthForms/SubmitButton";
import { useRouter } from 'next/router';
import { useState,useContext } from "react";

export default function (){

    const router = useRouter();

    const [registerResponse, setRegisterResponse] = useState(null);
    const username = router.query.username;
    const email = router.query.email;
    const password = router.query.password;

    const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const code = watch("code");

    const getRegisterResponse = async (username, email, password, code) => {
        const body = JSON.stringify({
            username,
            email,
            password,
            code,
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

    const onSubmit = () => {
		console.log(username + "  " + email + "  " + password + " " + code);

		getRegisterResponse(username, email, password, code)
			.then((res) => {
				setRegisterResponse(res);
				console.log(res);

				if (res.status === "success") {
					//save user in context
					// login(res.user, res.auth.token);
                    console.log("Usuario creado");
                    //TODO redirigir a la pagina de verificacion o mostrar modal
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

    return(
        <>
            <div className='min-h-screen bg-transparent py-24'>
			<div className='container mx-auto bg-neutral md:w-96 w-full rounded-md p-5'>
				<div className='m-5'>
					<h1 className='text-xl font-bold text-center text-accent'>Verification Code</h1>
                    <h4 className="text-sm font-bold text-center text-accent mt-2">Check your mail box</h4>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}
                    className="mt-3">
                    <input
                        type="number"
                        placeholder='Code'
                        className='w-full h-9 focus:outline-none  bg-base-content  opacity-60 p-3 text-accent font-semibold rounded-md'
                        {...register("code", {
                            required: true,
                            maxLength: 6,
                        })}
                    />
                    
                    <small style={{ color: "red" }}>
                        <error>
                            {errors.code?.type === "required" && "Code required *"}
                            {errors.code?.type === "maxLength" &&
                                "Maximum length 6 digits"}
                            {errors.code?.message}
                        </error>
                    </small>

                    <div className="mt-4 text-center">
                        <button type="button" className="py-2 px-4 mr-4 bg-secondary text-white font-semibold  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                            Resend
                        </button>
                        <VerificationButton text="Verify"/>
                    </div>
                </form>
			</div>
		</div>


            {/* <div className="container mx-auto bg-neutral md:w-96 w-full rounded-md p-5">
                <h1 className="text-2xl text-center" style={{
                    color:"black"
                }}>
                    <b>Verification Code</b>
                </h1>
                <h4 className="text-sm mt-2 text-center" style={{
                    color:"black"
                }}>
                    Check your mail box
                </h4>
                
            </div> */}
        </>
    );
}