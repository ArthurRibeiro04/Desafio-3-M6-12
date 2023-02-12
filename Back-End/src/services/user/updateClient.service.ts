import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import appErr from "../../errors/appErr";
import { DbClient, IClient } from "../../Interfaces/interfaces";
import * as bcrypt from "bcryptjs"

const updateClientService = async ({name, email, phone, password}: IClient, id:string): Promise<DbClient> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.find()
    
    const client = clients.find(client => client.id === id)

    const userAlreadyExist = clients.find(client => client.email === email)

    if(userAlreadyExist){
        throw new appErr("Email Already Exist", 400)
    }

    if(!client){
        throw new appErr("User not found", 404)
    }

    const hashedPass = await bcrypt.hash(password, 10)

    await clientRepository.update(client.id, {
        name: name || client.name,
        email: email || client.email,
        phone: phone || client.phone,
        password: hashedPass || client.password
    })

    const newClient = await clientRepository.findOneBy({
        id: id
    })



    return newClient!
}

export default updateClientService