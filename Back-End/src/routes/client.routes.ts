import { Router } from "express";
import createClientController from "../controllers/user/createClient.controller";
import deleteClientController from "../controllers/user/deleteClient.controller";
import getClientsController from "../controllers/user/getClients.controller";
import loginController from "../controllers/user/login.controller";
import updateClientController from "../controllers/user/updateClient.controller";
import verifyAuthTokenMiddleware from "../middlewares/authToken.middleware";

const clientRoutes = Router()

clientRoutes.post("/clients", createClientController)
clientRoutes.get("/clients", getClientsController)
clientRoutes.patch("/clients/:id", verifyAuthTokenMiddleware, updateClientController)
clientRoutes.delete("/clients/:id", verifyAuthTokenMiddleware, deleteClientController)
clientRoutes.post("/login", loginController)

export default clientRoutes