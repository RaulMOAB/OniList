import React from "react";

function Hero({ media }) {
  return (
    <>
      <div className="hero min-h-fit text-slate-200">
        <div className="my-10 hero-content h-96 bg-base-content flex-col lg:flex-row-reverse">
          <img
            src="./avatar/oni.gif"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Welcome to OniList!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-error">Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;