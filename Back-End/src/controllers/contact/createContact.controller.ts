import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import createContactService from "../../services/contact/createContact.service";

const createContactController = async (req: Request, res: Response) => {
    
    const {userId} = req.params

    const {name, email, phone} = req.body

    try {
        
        const client = await createContactService({name, email, phone}, userId)
        return res.status(201).send(client)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default createContactController