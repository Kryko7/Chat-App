import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from "../context/AuthContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatID : "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatID : 
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid    
                            : action.payload.uid + currentUser.uid
                }
            default:
                return state;
        }
    };

    const [chatState, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    return(
        <UserContext.Provider value={{data: chatState, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};