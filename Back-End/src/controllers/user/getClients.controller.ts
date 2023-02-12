import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import getClientsService from "../../services/user/getClients.service";

const getClientsController = async (req: Request, res: Response) => {
    try {
        
        const clients = await getClientsService()

        return res.status(200).send(clients)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default getClientsController