import React from "react";

function DeleteButton({ text }) {
  return (
    <>
      <button className=" bg-red-400 text-white font-semibold  rounded  hover:text-white">
        {text}
      </button>
    </>
  );
}

export default DeleteButton;
