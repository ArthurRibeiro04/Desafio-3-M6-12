import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import appErr from "../../errors/appErr";

const deleteContactService = async (id:string): Promise<boolean> => {

    const contactRepository = AppDataSource.getRepository(Contact)
    const contact = await contactRepository.findOneBy({
        id
    })

    if(!contact){
        throw new appErr("Contact not found", 404)
    }

    const deletedClient = await contactRepository.delete(id)

    return true
    
}

export default deleteContactService