import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { IoAt, IoLockClosed } from "react-icons/io5";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import Link from "next/link";
import LoginButton from "@/components/Buttons/AuthForms/SubmitButton";

import ErrorAlert from "@/components/Alerts/Login/ErrorAlert";
import Alert from "@/components/Alerts/Alert_prueba"

const getLoginResponse = async (email, password) => {
  const body = JSON.stringify({
    email,
    password,
  });
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+"login", {
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
  const [message, setMessage] = useState("");
  const [shownPassword, setShownPassword] = useState(false);

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
          login(res.user, res.auth.token);
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

  const switchShownPassword = () => setShownPassword(!shownPassword);
  return (
    <>
      <div className=" md:min-h-screen sm:h-full">
        <div className="relative container mx-auto md:w-96 rounded-md p-5 sm:w-full">
          {loginResponse && (
            // <ErrorAlert
            //   show={showError}
            //   message={message}
            //   resetAlert={resetAlert}
            //   type={"alert-error"}
            // />
            <Alert 
            show={showError}
            message={message}
            seconds={3}
            setShowError={setShowError}
            type={"error"}
            />
            
          )}
        </div>
        <div className="container mx-auto bg-neutral md:w-96 my-20 rounded-md p-5 sm:w-full">
          <div className="m-5">
            <h1 className="text-xl text-accent font-bold text-center">Login</h1>
            <div className="divide-double"></div>
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="form-control mt-8"
          >
            <div className="mb-4 w-4/5 mx-auto">
              <div className="input-group">
                <label className="flex justify-center input-group input-group-md ">
                  <span className="bg-base-content ">
                    <IoAt className="text-lg text-accent" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => handleEmailChange(event.target.value)}
                    placeholder="Email"
                    className={
                      "w-full h-9 focus:outline-none bg-base-content opacity-60  text-accent font-semibold p-3"
                    }
                  />
                </label>
              </div>
            </div>

            <div className="mb-4 w-4/5 mx-auto">
              <div className="input-group">
                <label className="relative flex justify-center input-group input-group-md">
                  <span className="bg-base-content ">
                    <IoLockClosed className="text-lg text-accent" />
                  </span>
                  <input
                    type={shownPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      handlePasswordChange(event.target.value)
                    }
                    placeholder="••••••••••"
                    className="w-full h-9 focus:outline-none bg-base-content  opacity-60 p-3 rounded-r-md font-semibold text-accent"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4"
                    onClick={switchShownPassword}
                  >
                    {shownPassword ? (
                      <AiFillEye className="text-lg text-accent" />
                    ) : (
                      <AiFillEyeInvisible className="text-lg text-accent" />
                    )}
                  </button>
                </label>
              </div>
            </div>

            <div className="mx-auto mt-5">
              <LoginButton text={"Login"} />
            </div>
            <div className="text-center mt-5">
              <small className="text-accent text-center">
                <a href="" className="hover:text-blue-500 active:text-blue-700">
                  Forgot password?
                </a>
              </small>
            </div>
            <div className="text-center mt-5">
              <small className="text-accent text-center">
                Not registered yet?&nbsp;
                <Link
                  href="/register"
                  className="hover:text-blue-500 active:text-blue-700"
                >
                  Create an account
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
