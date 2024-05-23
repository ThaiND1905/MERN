import { createContext, useState } from "react";
import { ReactNode } from "react";
import { Dispatch } from "react";

export type AuthUser = {
    _id: string;
    userName: string;
    fullName: string;
    profilePic: string;
} | null;

interface User {
    authUser: AuthUser;
    setAuthUser: Dispatch<AuthUser>;
}

const defaultValue : unknown = "";

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext(defaultValue as User);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")!) || null);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}