import { useEffect , useState } from "react";
import toast from "react-hot-toast";
import { Types } from "mongoose";


export interface ConversationInterface {
    _id: string;
    userName: string;
    fullName: string;
    password: string;
    gender: string;
    createdAt: Date;
    profilePic: string;
    updatedAt: Date;
    organization: Types.ObjectId;
}



const defaultConversation : Array<ConversationInterface> = []

const useGetConversation = () => {
    const [ isLoading , setIsLoading ] = useState(false);
    const [ conversations , setConversations ] = useState(defaultConversation);

    useEffect(() => {
        const getConversation = async () => {
            setIsLoading(true);
            try{
                const res = await fetch(`/api/users`);
                const data = await res.json();

                setConversations(data);
                // console.log(data);
                if(data.error){
                    throw new Error(data.error);
                }

            }catch(error){
                toast.error((error as Error).message);
            }finally{
                setIsLoading(false);
            }
        }
        getConversation();
    },[])
    
    return {isLoading , conversations};
}

export default useGetConversation;