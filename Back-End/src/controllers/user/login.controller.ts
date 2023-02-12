import { Request, Response } from "express";
import appErr, { handleError } from "../../errors/appErr";
import loginService from "../../services/user/login.service";

const loginController = async (req: Request, res: Response) => {

    const {email, password} = req.body

    try {

        const token = await loginService({email, password})

        return res.status(201).send(token)

    } catch (err) {
        if(err instanceof appErr) {
            handleError(err, res)
        }
    }
}

export default loginController