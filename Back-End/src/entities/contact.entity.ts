import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";

import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";

@Entity()

export class Contact{
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => Client, client => client.contacts)
    client: Client



    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}