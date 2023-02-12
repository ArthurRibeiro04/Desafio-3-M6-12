import express from "express";
import clientRoutes from "./routes/client.routes";
import contactRoutes from "./routes/contact.routes";
import cors from "cors"
import reportRoute from "./routes/report.routes";

const app = express()

app.use(cors())
app.set("trust proxy", true)
app.use(express.json())



app.use(clientRoutes)
app.use(contactRoutes)
app.use(reportRoute) 

export default app;

