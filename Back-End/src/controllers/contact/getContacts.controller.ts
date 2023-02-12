import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import getContactsService from "../../services/contact/getContacts.service";

const getContactsController = async (req: Request, res: Response) => {

    const {userId} = req.params

    try {
        
        const contacts = await getContactsService(userId)

        return res.status(200).send(contacts)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default getContactsController