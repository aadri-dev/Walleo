import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    users: [],
    setUsers: (users) => set({ users }),
    initUser: () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            set({ user: JSON.parse(storedUser) });
        }
    },
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
        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user || {}));
        }
        set((state) => ({users:[...state.users, data.data]}));
        return { success: true, message:"User created successfully", token: data.token, user: data.user}
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
    },
    findUserByNameForSignUp: async (newUser) => {
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
            return { success: true, message:"Usuario nuevo"}
        } else {
            return { success: false, message:"Usuario existente"}
        }
    },
    login: async (newUser) => {
        if(!newUser.userName || !newUser.password) {
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/users/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser),
        });
        const data = await res.json();
        console.log("Data:", data);
        if(!data.success) {
            return { success: false, message: data.message }
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
        set({ user: data.user });
        return { success: true, message: data.message, user: data.user, token: data.token }
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null });
    },
    getCurrentUser: () => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            console.error("Error al parsear user del localStorage:", err);
            return null;
        }
    }
}));