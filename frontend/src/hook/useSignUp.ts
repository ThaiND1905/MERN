import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";


interface Info {
    fullName  : string;
    userName :string;
    password : string;
    confirmPassword :string;
    gender : "male" | "female" |" other",
}

const useSignUp = () => {
    const [isLoading , setIsLoading] = useState(false);
    const {setAuthUser} = useAuthContext();


    const signup = async ({fullName, userName, password, confirmPassword,gender } : Info) => {

        const success = handleInputErrors({fullName, userName, password, confirmPassword,gender })


        if (!success) return; 
        
        setIsLoading(true);

        try{
            const res = await fetch(`/api/auth/signup`,{
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({fullName, userName, password, confirmPassword,gender }),
            })
            const data = await res.json();


            if(data.error){
                throw new Error(data.error);
            }

            //Local Storage

            localStorage.setItem("chat-user", JSON.stringify(data));
            // console.log(JSON.parse(localStorage.getItem("chat-user")!))
            setAuthUser(data);
          

        }catch(err){
            toast.error((err as Error).message)
        }finally{
            setIsLoading(false);
        }
    };

    return {isLoading,signup};
}

export default useSignUp;

function handleInputErrors({fullName, userName, password, confirmPassword,gender}: Info) {
    if(!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all field");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password do not match");
        return false;
    }

    if(password.length < 8){
        toast.error("Password must be at least 8 characters");
        return false;
    }
    return true;
}
