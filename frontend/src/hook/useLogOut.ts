import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";


const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const [isLoading , setIsLoading ] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        try{
            
            const res = await fetch(`/api/auth/logout`,{
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");

            setAuthUser(null);

        }catch(error){
            toast.error((error as Error).message);
        }finally{
            setIsLoading(false);
        }
    }
    return {isLoading , logout};
}


export default useLogout;