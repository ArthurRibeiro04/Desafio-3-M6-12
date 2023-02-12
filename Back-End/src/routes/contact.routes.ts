import { Router } from "express";
import createContactController from "../controllers/contact/createContact.controller";
import deleteContactController from "../controllers/contact/deleteContact.controller";
import getContactsController from "../controllers/contact/getContacts.controller";
import updateContactController from "../controllers/contact/updateContact.controller";
import verifyAuthTokenMiddleware from "../middlewares/authToken.middleware";


const contactRoutes = Router()

contactRoutes.post("/contacts/:userId", verifyAuthTokenMiddleware,createContactController)
contactRoutes.get("/contacts/:userId", getContactsController)
contactRoutes.delete("/contacts/:id", verifyAuthTokenMiddleware,deleteContactController)
contactRoutes.patch("/contacts/:id", verifyAuthTokenMiddleware,updateContactController)

export default contactRoutes