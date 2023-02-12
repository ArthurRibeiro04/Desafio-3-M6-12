import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import createclientService from "../../services/user/createClient.service";

const createClientController = async (req: Request, res: Response) => {
    
    const {name, email, phone, password} = req.body

    try {
        
        const client = await createclientService({name, email, phone, password})
        return res.status(201).send(client)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default createClientController