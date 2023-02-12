import { Router } from "express";
import PdfPrinter from "pdfmake";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Request, Response } from "express";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { stringify } from "querystring";

const reportRoute = Router()

reportRoute.get("/report/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const clientRepository = AppDataSource.getRepository(Client)
    const client = await clientRepository.findOneBy({
        id
    })
    if(!client){
        return res.status(404).send("Client not Found")
    }
    const contacts = client.contacts

    const body = []

    for await(let contact of contacts){
        const rows = new Array()
        rows.push(contact.name)
        rows.push(contact.email)
        rows.push(contact.phone)

        body.push(rows);
    }

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
          }
    }     

    const printer = new PdfPrinter(fonts)
    
    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: { font: "Helvetica"},
        content: [
            {
                columns: [
                    {text: "Relatório com seus contatos", style: "header"}, 
                    {text: `Usuário: ${client.name}\n\n`, style: "header"}
                ]
            },
            {
                table: {
                    body: [["name", "email", "phone"], ...body]
                }
            }
        ],
        styles: {
            header:{
                fontSize: 18,
                bold: true,
            }
        }
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    const chunks: any = []

    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk)
    })

    pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.end(result)
    })

    pdfDoc.end()
})

export default reportRoute