import Conversation from "./Conversation"
import useGetConversation from "../../hook/useGetConversations"
import { getRandomEmoji } from "../../utils/emojis";


const Conversations = () => {
  const {isLoading, conversations} = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        conversations.map((conversation , idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji = {getRandomEmoji()}
            lastIdx = {idx === conversations.length - 1} />
        ))
      }

      { isLoading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default Conversations