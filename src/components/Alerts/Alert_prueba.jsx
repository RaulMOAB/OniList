import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
export default function Alert({
  show,
  message,
  seconds,
  setShowError,
  type = "error",
  custom_class = "top-14"
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
				className={`fixed inset-x-0 ${custom_class} text-center z-50 container mx-auto w-full md:max-w-md rounded-md p-5`}>
				<div
					className={`${
						show ? " " : "hidden "
					} absolute flex left-0 w-full  alert  shadow-lg rounded-none md:rounded-md transition-all animate-fade-down ${
						disapearEffect ? "bg-blue-700 " : " "
					}  animate-duration-300  ${type_class}`}>
					<div className=''>
						{(() => {
							if (type === "success") {
								return (
									<div className='stroke-current grow-0'>
										<BsFillCheckCircleFill />
									</div>
								);
							} else if (type === "info") {
								return (
									<div className='stroke-current grow-0'>
										<AiFillInfoCircle />
									</div>
								);
							} else {
								return (
									<div className='stroke-current grow-0'>
										<MdOutlineError />
									</div>
								);
							}
						})()}

						<p className='flex-grow w-full text-sm'>{message}</p>
					</div>
				</div>
			</div>
		</>
	);
}
