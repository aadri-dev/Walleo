import jwt from "jsonwebtoken";

// Generar un token para un usuario
export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, password: user.password },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// Middleware para verificar tokens en rutas protegidas
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token requerido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }
        req.user = user; // guardamos el usuario en la request
        next();
    });
};