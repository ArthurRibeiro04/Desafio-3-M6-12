import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import updateClientService from "../../services/user/updateClient.service";

const updateClientController = async (req: Request, res: Response) => {
    
    const { id } = req.params
    const {name, email, phone, password} = req.body
    
    try {
        
        const client = await updateClientService({name, email, phone, password}, id)

        return res.status(200).send(client)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default updateClientController