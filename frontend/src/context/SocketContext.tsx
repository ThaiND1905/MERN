import { createContext , useEffect , useState } from "react";
import { ReactNode } from "react";
import { useAuthContext } from "../hook/useAuthContext";
import { io , Socket} from "socket.io-client";
import { MessageInterface } from "../zustand/useConversation";

const defaultSocketContext: unknown = "";


export const SocketContext = createContext(defaultSocketContext as SocketValue);


type SocketProviderProps = {
    children: ReactNode;
};


interface ServerToClientEvents {
    noArg: () => void;
    newMessage : (newMessage : MessageInterface) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;

  }
interface ClientToServerEvents {
    hello: () => void;
    
  }

interface SocketValue{
    socket: Socket<ServerToClientEvents, ClientToServerEvents>|null,
    onlineUsers: Array<string>,
}
  

export const SocketContextProvider = ({children} : SocketProviderProps) => {
    const [socket , setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>|null>( null);
    const [onlineUsers, setOnlineUsers] =   useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("http://localhost:5000", { transports : ['websocket'] , query : {
                userId : authUser._id,
            }});
            setSocket(socket);

            socket.on("getOnlineUsers", (users) =>{
                setOnlineUsers(users);
            })

            return () => {
                socket.close()
            }
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
},[authUser]);

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}