import Account from "../models/accounts.js";
import mongoose from "mongoose";

export const getAccounts = async (req, res) => {
    try{
        const {userName} = req.params;
        const accounts = await Account.find({ userName: userName });
        res.status(200).json({ success: true, data: accounts});
    } catch (error) {
        console.log("Error al obtener todas las cuentas:", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getAccount = async (req, res) => {
    try{
        const {userName, name} = req.params;
        const account = await Account.find({ userName: userName, name: name });
        res.status(200).json({ success: true, data: account});
    } catch (error) {
        console.log("Error al obtener la cuenta:", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const createAccount = async (req, res) => {
    const account = req.body;

    if(!account.userName || !account.name || !account.description || !account.amount) {
        return res.status(400).json({ success: false, message: "Introduce todos los datos"});
    }

    const newAccount = new Account(account);

    try {
        await newAccount.save();
        res.status(201).json({ success: true, data: newAccount});
    } catch (error) {
        console.log("Error al crear nueva cuenta:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteAccount = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Id de cuenta inválido"});
    }

    try {
        await Account.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Cuenta eliminada"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateAccount = async (req,res) => {
    const {id} = req.params;
    const account = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Id de cuenta inválido"});
    }

    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, account, {new: true});
        res.status(200).json({ success: true, data: updatedAccount});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};