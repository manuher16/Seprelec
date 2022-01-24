
import dotenv from "dotenv"
import http from "http"
import app from "./routes/index.js"
import MONGO from "./config/database"
dotenv.config()


const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);

})

