import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    
    useEffect(() => {
        const getMessages = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation!._id}`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setMessages(data);
                
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
        if(selectedConversation?._id) getMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConversation?._id,setMessages]);
    return {messages, isLoading};
}

export default useGetMessages;