import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import appErr from "../../errors/appErr";

const deleteClientService = async (id:string): Promise<boolean> => {

    const clientRepository = AppDataSource.getRepository(Client)
    const client = await clientRepository.findOneBy({
        id
    })

    if(!client){
        throw new appErr("User not found", 404)
    }

    const deletedClient = await clientRepository.delete(id)

    return true
    
}

export default deleteClientService