import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany } from "typeorm";

import { v4 as uuid } from "uuid";
import { Contact } from "./contact.entity";

@Entity()

export class Client{
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(type => Contact, contact => contact.client, {
        eager:true, onDelete: "CASCADE"
    })
    contacts: Contact[]
    

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}