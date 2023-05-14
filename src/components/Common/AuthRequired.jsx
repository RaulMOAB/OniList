import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

function AuthRequired({ children }) {
	const { verifyToken } = useContext(AuthContext);
	const [isValid, setIsValid] = useState();
	const [isPushed, setIsPushed] = useState(false);
	const router = useRouter();



	useEffect(() => {
    if(isPushed){
      return
    }
		if (!verifyToken() && !isPushed) {
			router.push("/login",undefined,{shallow:true});
      return
		}
    setIsPushed(true);
	}, []);

	return <>{children}</>;
}

export default AuthRequired;
