export interface IContato{
    name: string,
    email: string,
    phone: string
}

export interface DbContact{
    id: string,
    name: string,
    email: string,
    phone: string,
    created_at: Date
}

export interface IClient{
    name: string,
    email: string,
    phone: string,
    password: string,
}

export interface DbClient{
    id: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    created_at: Date
}

export interface ILogin {
    email:string,
    password:string
}