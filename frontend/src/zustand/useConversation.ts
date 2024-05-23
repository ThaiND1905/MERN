import { create } from "zustand";
import { ConversationInterface } from "../hook/useGetConversations";

interface ConversationStoreState {
    selectedConversation: ConversationInterface | null;
    setSelectedConversation: (selectedConversation: ConversationInterface | null) => void;
    messages: Array<MessageInterface>;
    setMessages: (messages: Array<MessageInterface>) => void;
}
export interface MessageInterface {
    createdAt : Date;
    message : string,
    receiverId : string,
    senderId : string,
    updatedAt : Date,
    __v : number,
    _id : string,
    shouldShake: boolean,
}


const useConversation = create<ConversationStoreState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: ConversationInterface | null) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages: Array<MessageInterface>) => set({ messages }),
}))

export default useConversation;