
const MessageSkeleton = () => {
  return (
    <>
      <div className="chat chat-start">
            <div className="skeleton chat-image avatar">
                <div className="skeleton w-10 rounded-full">
                </div>
            </div>
            <div className="skeleton chat-header">
            </div>
            <div className="skeleton chat-bubble pb-2 w-64"></div>
            <div className="skeleton chat-footer opacity-50">
            </div>
        </div>
        <div className="chat chat-end">
            <div className="skeleton chat-image avatar">
                <div className="skeleton w-10 rounded-full">
                </div>
            </div>
            <div className="skeleton chat-header">
            </div>
            <div className="skeleton chat-bubble pb-2 w-32"></div>
            <div className="skeleton chat-footer opacity-50">
            </div>
        </div>
    </>
  )
}

export default MessageSkeleton
