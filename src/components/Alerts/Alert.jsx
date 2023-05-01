import React, { useState, useEffect } from "react";

export default function Alert({ show, message, resetAlert, type }) {
  const [showAlert, setShowAlert] = useState(show);
  useEffect(() => {
    setShowAlert(show);
  }, [show]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  if (showAlert) {
    return (
      <>
        <div
          className={
            "mx-auto w-fit alert  shadow-lg rounded-md animate-fade-down animate-duration-300 bg-green-100 text-green-500 font-normal " +
            type
          }
        >
          <div>
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
            <span className="">{message}</span>
            <button
              onClick={() => {
                closeAlert();
                resetAlert();
              }}
              className="text-green-400 hover:text-green-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }
}
