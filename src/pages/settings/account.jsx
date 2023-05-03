import React from "react";
import DeleteButton from "../../components/Buttons/DeleteButton";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import ErrorAlert from "@/components/Alerts/Login/ErrorAlert";

const deleteAccountResponse = async (user_id) => {
  const response = await fetch(
		process.env.NEXT_PUBLIC_API_ENDPOINT+`account/delete/${user_id}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
	);
  console.log(response);
  return response.json();
};
function Account() {
  const { user, logout } = useContext(AuthContext);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const user_id = user ? user.id : null;

  //   console.log(user);
  console.log(user_id);

  const handleSubmit = (event) => {
    event.preventDefault();
    deleteAccountResponse(user_id)
      .then((res) => {
        console.log(res);
        setDeleteResponse(res);
        console.log("**********************************");

        if (res.status === "success") {
          console.log("eliminado correctamente");
          logout();
        } else {
          //404
          let message = `User not found`;
          setMessage(message);
          setShowError(true);
        }
      })
      .catch((error) => {
        console.error("Unexpected error", error);
      });
  };

  const resetAlert = () => {
    setShowError(false);
  };

  return (
    <div>
      <h1>ACCOUNT PAGE</h1>
      <div>
        {
          <ErrorAlert
            show={showError}
            message={message}
            resetAlert={resetAlert}
          />
        }
        <form onSubmit={(event) => handleSubmit(event)}>
          <h2>Delete Account</h2>
          <label
            htmlFor="my-modal"
            className="btn bg-red-400 border-none hover:bg-red-400 "
          >
            Delete User Account
          </label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you sure you want to delete your account?
              </h3>
              <p className="py-4">
                Are you sure you want to delete your account?
              </p>
              <div className="modal-action">
                <DeleteButton
                  text={
                    <label htmlFor="my-modal" className="btn btn-error">
                      Delete
                    </label>
                  }
                />
                <label htmlFor="my-modal" className="btn btn-warning">
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
