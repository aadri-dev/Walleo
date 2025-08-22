import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor corriendo en puertooooooo ${PORT}`);
});
