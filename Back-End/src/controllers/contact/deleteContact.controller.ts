import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import deleteContactService from "../../services/contact/deleteContact.service";

const deleteContactController = async (req: Request, res: Response) => {
    
    const {id} = req.params
    
    try {
        
        const deleted = await deleteContactService(id)

        return res.status(204).send()

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default deleteContactController