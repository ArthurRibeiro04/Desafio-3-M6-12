import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import appErr from "../../errors/appErr";
import { IClient } from "../../Interfaces/interfaces";
import * as bcrypt from "bcryptjs"

const createclientService = async ({name, email, phone, password}: IClient) => {
    
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.find()

    const emailAlreadyExist = clients.find(client => client.email === email)

    if (emailAlreadyExist){
        throw new appErr("Email Already Exist", 400)
    }   

    const hashedPass = await bcrypt.hash(password, 10)

    const user = new Client()
    user.name = name
    user.email = email
    user.phone = phone
    user.password = hashedPass

    clientRepository.create(user)
    await clientRepository.save(user)

    return user
}

export default createclientService