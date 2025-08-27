import { create } from "zustand";

export const useAccountStore = create((set) => ({
    accounts: [],
    setUsers: (accounts) => set({ accounts }),
    // createUser: async (newUser) => {
    //     if(!newUser.userName || !newUser.password) {
    //         return {success:false, message:"Please fill in all fields"}
    //     }
    //     const res = await fetch("/api/users", {
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify(newUser),
    //     });
    //     const data = await res.json();
    //     set((state) => ({users:[...state.users, data.data]}));
    //     return { success: true, message:"User created successfully"}
    // },
    findAccountsUser: async (user) => {
        const res = await fetch(`/api/accounts/${user}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        console.log("Data:", data);
        if(!data.success) {
            return { success: false, message:"No hay cuentas para este usuario"}
        } else {
            set({ accounts: data.data });
            return { success: true, message:"Cuentas obtenidas correctamente"}
        }
    }
}));