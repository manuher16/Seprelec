import express from "express";
import cors from "cors";
import publicRoutes from "./public.routes";
import userRoutes from "./user.routes";
const app = express();

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

//Routes


app.use('/api/public', publicRoutes);
app.use('/api/user', userRoutes);

export default app