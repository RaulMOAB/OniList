import { useForm } from "react-hook-form";
import VerificationButton from "@/components/Buttons/AuthForms/SubmitButton";
import { useRouter } from 'next/router';
import { useState,useContext } from "react";
import ErrorAlert from "@/components/Alerts/Login/ErrorAlert";
import { AuthContext } from "@/contexts/AuthContext";

// API Petitions
const getRegisterResponse = async (username, email, password, code) => {
    const body = JSON.stringify({
        username,
        email,
        password,
        code,
    });
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+"register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body,
    });
    return response.json();
};

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

export default function VerificationCode(){

    //Variables 
    const router = useRouter();
    const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");
    const [registerResponse, setRegisterResponse] = useState(null);
    const username = router.query.username;
    const email = router.query.email;
    const password = router.query.password;
    const { login } = useContext(AuthContext);

    const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const code = watch("code");

    const handleClick = () => {
        sendEmail(email);
    }

    const onSubmit = () => {
		console.log(username + "  " + email + "  " + password + " " + code);

		getRegisterResponse(username, email, password, code)
			.then((res) => {
				setRegisterResponse(res);
				console.log(res);

				if (res.status === "success") {
					//save user in context
					login(res.user, res.auth.token);
                    console.log("User created");
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

    return(
        <>
            <div className=" md:min-h-screen sm:h-full">
                <div className="relative container mx-auto md:w-96 rounded-md p-5 sm:w-full">
                    <ErrorAlert
                    show={showError}
                    message={message}
                    resetAlert={resetAlert}
                    />
                </div>
                <div className="container mx-auto bg-neutral md:w-96 my-20 rounded-md p-5 sm:w-full">
                <div className="m-4 text-center">
                    <h1 className="text-xl text-accent font-bold">Verification Code</h1>
                    <small className="text-accent font-bold">Check your email box</small>
                    <div className="divide-double"></div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-control mt-8"
                >
                    <div className="mb-4 w-4/5 mx-auto">
                        <input
                            type="text"
                            placeholder="Code"
                            className={
                            "w-full h-9 focus:outline-none bg-base-content opacity-60  text-accent font-semibold p-3 rounded-lg"}
                            {...register("code", {
                                required: true,
                                maxLength: 6,
                            })}
                        />

                        <small style={{ color: "red" }}>
                            {errors.code?.type === "required" && "Code required *"}
                            {errors.code?.type === "maxLength" &&
                                "Maximum length 6 digits"}
                            {errors.code?.message}
                        </small>
                    </div>


                    <div className="mx-auto mt-5">
                        <button 
                            type="button" 
                            className='py-2 px-4 mr-4 bg-secondary text-white font-semibold  rounded-md shadow-md hover:shadow-blue-500/50 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0'
                            onClick={handleClick}
                        >
                            Resend
                        </button>
                        <VerificationButton text="Verify"/>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}