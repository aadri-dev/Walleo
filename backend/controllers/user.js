import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.js";

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

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({ userName: user.userName, password: hashedPassword});

    try {
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({ success: true, data: newUser, token, user: {id: newUser._id, userName: newUser.userName}});
    } catch (error) {
        console.log("Error al crear usuario:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const savedUser = await User.findOne({ userName });
        if (!savedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado"});
        }
        const validPassword = await bcrypt.compare(password, savedUser.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta"});
        }
        const token = generateToken(savedUser);
        return res.status(200).json({ success: true, message: "Login correcto", token, user: { id: savedUser._id, userName: savedUser.userName}});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error"});
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

export const perfil = async (req, res) => {
    res.json({ mensaje: "Bienvenido a tu perfil", usuario: req.user });
};