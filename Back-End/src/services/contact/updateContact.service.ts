import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import appErr from "../../errors/appErr";
import { DbClient, DbContact, IClient, IContato } from "../../Interfaces/interfaces";
import * as bcrypt from "bcryptjs"
import { Contact } from "../../entities/contact.entity";

const updateContactService = async ({name, email, phone}: IContato, id:string): Promise<DbContact> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contacts = await contactRepository.find()
    
    const contact = contacts.find(contact => contact.id === id)

    const userAlreadyExist = contacts.find(contact => contact.email === email)

    if(userAlreadyExist){
        throw new appErr("Email Already Exist", 400)
    }

    if(!contact){
        throw new appErr("User not found", 404)
    }

    await contactRepository.update(contact.id, {
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone
    })

    const newClient = await contactRepository.findOneBy({
        id: id
    })



    return newClient!
}

export default updateContactService