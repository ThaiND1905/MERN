import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";




const useLogin = () => {
    const [isLoading , setIsLoading] = useState(false);
    const {setAuthUser} = useAuthContext();


    const login = async(userName : string, password : string) => {
        
        const success = handleInputErrors(userName, password);
        if (!success) return;
        setIsLoading(true);
        try{
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify({userName, password}),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        }catch(error){
            toast.error((error as Error).message);
        }finally{
            setIsLoading(false);
        }
    }
    return {isLoading , login};
}


export default useLogin;


function handleInputErrors(userName :string , password :string) {
    if( !userName || !password ) {
        toast.error("Please fill in all field");
        return false;
    }
    return true;
}
