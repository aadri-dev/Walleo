import User from "../models/user.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json({ success: true, data: users});
    } catch (error) {
        console.log("Error al obtener todos los usuarios:", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

export const getUsersByName = async (req, res) => {
    try {
        const {userName} = req.params;
        const savedUserName = await User.findOne({ userName: userName});
        if(!savedUserName) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado"});
        }
        res.status(200).json({ success: true, data: savedUserName});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if(!user.userName || !user.password) {
        return res.status(400).json({ success: false, message: "Introduce todos los datos"});
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser});
    } catch (error) {
        console.log("Error al crear usuario:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteUser = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Id de usuario inválido"});
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Usuario eliminado"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateUser = async (req,res) => {
    const {id} = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Id de usuario inválido"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({ success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};