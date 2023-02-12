import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import deleteClientService from "../../services/user/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
    
    const {id} = req.params
    
    try {
        
        const deleted = await deleteClientService(id)

        return res.status(204).send()

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default deleteClientController