import { createContext, useState, useEffect } from "react";
import { useUserStore } from "@/store/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logoutFromStore = useUserStore((state) => state.logout);

    useEffect(() => {
        // cargar usuario desde localStorage al arrancar
        const storedUser = useUserStore.getState().getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        logoutFromStore();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};