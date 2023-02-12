import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import appErr from "../../errors/appErr";
import { IContato } from "../../Interfaces/interfaces";

const getContactsService = async (userId: string) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({
        id: userId
    })

    if(!client){
        throw new appErr("Client not found", 404)
    }

    return client.contacts
}

export default getContactsService