import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import appErr from "../../errors/appErr";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs"
import { ILogin } from "../../Interfaces/interfaces";

const loginService = async ({email, password}: ILogin) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.find()

    const user = client.find(client => client.email === email)

    if(!user){
        throw new appErr("Incorrect Email or Password", 400);
    }

    const passMatch = bcrypt.compareSync(password, user.password)

    if(!passMatch){
        throw new appErr("Incorrect Email or Password", 400)
    }

    const token = jwt.sign({email: email}, "SECRET_KEY", {expiresIn: "24h"})

    return {token: token, userId: user.id}
}

export default loginService