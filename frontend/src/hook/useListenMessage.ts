import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "./useSocketContext"
import { MessageInterface } from "../zustand/useConversation";
import notificationSound from "../assets/sound/noti-sound.mp3";
const useListenMessage = () => {
    const { socket } = useSocketContext();
    const { messages , setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage",  (newMessage : MessageInterface) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages , newMessage])
    });
        return () => {socket?.off("newMessage");}
    },[socket, setMessages, messages])

}

export default useListenMessage;