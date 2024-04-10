import useGetMessages from "../../hook/useGetMessages"
import useListenMessage from "../../hook/useListenMessage";
import MessageSkeleton from "../Skeletons/MessageSkeleton";
import Message from "./Message"
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages , isLoading } = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const behavior: ScrollBehavior = 'smooth';
  useEffect(()=>{
    setTimeout( () =>{
      lastMessageRef.current?.scrollIntoView({ behavior: behavior});
    },100)
    
  },[messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
        {!isLoading && messages.length > 0 && messages.map((message) => 
        <div key = {message._id} ref={lastMessageRef}>
            <Message message = {message} key = {message._id} />
        </div>
         )
        }
        {isLoading && Array.from({length:3}).map((_,idx) => <MessageSkeleton key={idx}/> )}
        {!isLoading && messages.length === 0 && (
          <p className="text-center">Say "Hello" to each other <br /> 👋 <br /> and start the conversation</p>
        )}
    </div>
  )
}

export default Messages

// Static code
// return (
//   <div className="px-4 flex-1 overflow-auto">
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//   </div>
// )