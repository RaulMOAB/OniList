import React, { useState, useEffect } from "react";

export default function Alert({
  show,
  message,
  seconds,
  setShowError,
  type = "error",
}) {
  const [counter, setCounter] = useState(0);
  let type_class = "";
  if (type === "success") {
    type_class = "alert-success text-green-800";
  } else if (type === "info") {
    type_class = "alert-info";
  } else {
    type_class = "alert-error text-white";
  }
  const [disapearEffect, setDissapearEffect] = useState(false);
  //TODO Disapear with effect
  useEffect(() => {
    let transcurred_seconds = 0;
    const timer = setInterval(() => {
      setShowError(false);
      setCounter((prevCounter) => prevCounter + 1);
      transcurred_seconds++;
    }, seconds * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [show, setShowError, seconds]);

  return (
    <>
      <div
        className={`${
          show ? " " : "hidden "
        } absolute left-0 w-full  alert  shadow-lg rounded-md transition-all animate-fade-down ${
          disapearEffect ? "bg-blue-700 " : " "
        }  animate-duration-300  ${type_class}`}
      >
        <div>
          {(() => {
            if (type === "success") {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              );
            } else if (type === "info") {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              );
            } else {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              );
            }
          })()}

          <span className=" w-full">{message}</span>
        </div>
      </div>
    </>
  );
}
