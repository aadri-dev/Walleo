import { create } from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    createUser: async (newUser) => {
        if(!newUser.userName || !newUser.password) {
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/users", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser),
        });
        const data = await res.json();
        set((state) => ({users:[...state.users, data.data]}));
        return { success: true, message:"User created successfully"}
    },
    findUserByName: async (newUser) => {
        if(!newUser.userName || !newUser.password) {
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch(`/api/users/${newUser.userName}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        console.log("Data:", data);
        if(!data.success) {
            return { success: false, message:"Nombre de usuario o contraseña incorrecto"}
        }
        if(data.data.password != newUser.password) {
            return { success: false, message:"Contraseña incorrecta"}
        }
        return { success: true, message:"Sesión iniciada correctamente"}
    }
}));