import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import appErr from "../../errors/appErr";
import { IContato } from "../../Interfaces/interfaces";

const createContactService = async ({name, email, phone}: IContato, userId: string) => {
    
    const clientRepository = AppDataSource.getRepository(Client)
    const contactRepository = AppDataSource.getRepository(Contact)

    const client = await clientRepository.findOneBy({
        id: userId
    })

    if(!client){
        throw new appErr("Client not found", 404)
    }

    const contacts = await contactRepository.find()

    const emailAlreadyExist = contacts.find(con => con.email === email)

    if(emailAlreadyExist){
        throw new appErr("Email Already Exist", 400)
    }

    const contact = new Contact()
    contact.name = name
    contact.email = email
    contact.phone = phone
    contact.client = client

    contactRepository.create(contact)
    await contactRepository.save(contact)

    return contact
}

export default createContactService