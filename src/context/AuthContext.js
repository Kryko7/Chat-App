import { onAuthStateChanged } from 'firebase/auth';
import { createContext } from 'react';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });


        return () => {
            unsub();
        }
    }, []);


    return(
        <AuthContextProvider value={{currentUser}}>
            {children}
        </AuthContextProvider>
    )
}