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
    },
    addIncome: async (user, income) => {
        const res = await fetch(`/api/accounts/${user}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        console.log("Data:", data);
        console.log("Data len:", data.data.length);
        if(!data.success) {
            return { success: false, message:"No hay cuentas para este usuario"}
        } else {
            set({ accounts: data.data });
            for (let i = 0; i < data.data.length; i++) {
                let newAmount = 0;
                newAmount = data.data[i].amount + (income * data.data[i].percentage);
                data.data[i].amount = newAmount;
                const res = await fetch(`/api/accounts/${data.data[i]._id}`, {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data.data[i]),
                });
                const data2 = await res.json();
                console.log("Data updated:", data2);
            }
            return { success: true, message:"Ingreso hecho correctamente"}
        }
    },
    addSpend: async (user, account, spend) => {
        const res = await fetch(`/api/accounts/${user}/${account}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        console.log("Data:", data);
        if (!data.success) {
            return { success: false, message:"No existe esta cuenta para este usuario"}
        } else {
            let newAmount = 0;
            newAmount = data.data[0].amount - spend;
            data.data[0].amount = newAmount;
            const res = await fetch(`/api/accounts/${data.data[0]._id}`, {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data.data[0]),
                });
                const data2 = await res.json();
                console.log("Data updated:", data2);
        }
    }
}));