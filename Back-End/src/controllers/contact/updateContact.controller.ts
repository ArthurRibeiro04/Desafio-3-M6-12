import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import updateContactService from "../../services/contact/updateContact.service";

const updateContactController = async (req: Request, res: Response) => {
    
    const { id } = req.params
    const {name, email, phone, password} = req.body
    
    try {
        
        const contact = await updateContactService({name, email, phone}, id)

        return res.status(200).send(contact)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default updateContactController