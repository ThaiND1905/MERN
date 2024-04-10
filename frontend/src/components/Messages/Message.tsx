import useConversation from "../../zustand/useConversation"
import { useAuthContext } from "../../hook/useAuthContext";
import { MessageInterface } from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractDateTime";
import useSendMessage from "../../hook/useSendMessage";


const Message = ( {message} : {message : MessageInterface}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const bubbleColor = fromMe ? "bg-blue-500" : "";
    const formatTime = extractTime(message.createdAt);
    const {isLoading} = useSendMessage();
    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="Tailwind chat bubble component" />
                </div>
            </div>
            <div className="chat-header">
                {
                fromMe ? authUser.fullName : selectedConversation?.fullName
                } &nbsp;
                <time className="text-xs opacity-50">{formatTime}</time>
            </div>
            <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className="chat-footer opacity-50">
                {isLoading ? `Delivering` : `Delivered`}
            </div>
        </div>
    )
}

export default Message