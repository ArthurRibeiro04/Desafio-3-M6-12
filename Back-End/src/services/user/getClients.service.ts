import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { DbClient } from "../../Interfaces/interfaces";

const getClientsService = async (): Promise<DbClient[]> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = clientRepository.find()

    return clients

}

export default getClientsService