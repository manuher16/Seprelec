import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import logger from "express-logger"
//import routes 
import publicRoutes from "./public.routes";
import userRoutes from "./user.routes";
import utilsRoutes from "./utils.routes";
import adminRoutes from "./admin.routes"

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

//Routes
app.use('/api/public', publicRoutes);
app.use('/api/user', userRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/admin', adminRoutes);



export default app