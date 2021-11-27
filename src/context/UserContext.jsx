import React, { createContext, useState } from "react";

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(localStorage.getItem("token") !== null);

    return (
        <userContext.Provider
            value={{
                isConnected,

                setIsConnected
            }}
        >
            { children }
        </userContext.Provider>
    );
};