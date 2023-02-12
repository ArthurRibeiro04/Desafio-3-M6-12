#  Projeto Contact.io

O projeto Contact.io em um site + API feito totalmente em Javascript, utilizando do Javascrip vanilla para o front-end e o Node.js + express para o back-end.

A idéia do site é trazer um ambiente de fácil manuseio de contatos e de rede de contatoe em um geral, onde nossos clientes podem registrar e ver seus contatos registrados, atualizar seus contatos e deleta-los caso nescessário, conta com um sistema de autorização e permissão e com sistema de login e regristro do cliente.

Para iniciar a aplicação, após o git clone, na pasta Back-End, utilizar o comando yarn start, para instalar as dependecias, crie seu database, após isso coloque suas informações no .env utilizando o .env.example, depois rode o comando yarn typeorm migration:generate src/migrations/createTables -d src/data-source.ts para gerar as migrations e use o yarn typeorm migration:run -d src/data-source.ts para roda-las, após isso, utilizando um yarn dev a API já está de pé e o front-end já pode ser utilizaod normalmente.



DOCUMENTAÇÃO DA API:


Requisições que abrangem a área de contatos da API:

# Criação de contato - POST

**Todos os campos de envio são obrigatórios**
- name - tipo string,
- email - tipo string,
- phone - tipo string,

**ROTA NESCESSITA DE AUTENTICAÇÃO**

*O id do cliente vinculado com o contato deve ser passado no link da requisição*

*Exemplo: http://localhost:3000/contacts/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 201 CREATED:**

{
	"id": "d1bb5416-7e13-4813-b715-e5360b7f83ef",
	"name": "John Doe",
	"email": "johndoe@mail.com",
	"phone": "(48)12934124",
	"client": {
		"id": "bf44874b-c56f-45ef-8c29-6107b4e6284e",
		"name": "Jane Doe",
		"email": "janedoe@mail.com",
		"password": "$2a$10$cecGaYUXQ.5padWjVMPDS.d1Ecenxh4uDUJuzUTAiQYXb8eovsuGy",
		"phone": "(48)12934124",
		"created_at": "2023-02-02T01:44:47.618Z",
		"contacts": []
	},
	"created_at": "2023-02-03T16:59:18.875Z"
}


# Retorno de contatos - GET

**ROTA NÃO NESCESSITA DE AUTENTICAÇÃO**

*O id do cliente na qual pertencem os contatos deve ser passado na url*

*Exemplo: http://localhost:3000/contacts/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 200 OK:**

[
	{
		"id": "d1bb5416-7e13-4813-b715-e5360b7f83ef",
		"name": "ArXxctChur",
		"email": "tesXCxcte@email.com",
		"phone": "(48)12934124",
		"created_at": "2023-02-03T16:59:18.875Z"
	},
	{
		"id": "2465444a-86d5-4e9b-b04a-955678167947",
		"name": "ArXxxxcxzctChur",
		"email": "tesXzxczCxcte@email.com",
		"phone": "(48)12934124",
		"created_at": "2023-02-07T01:32:41.388Z"
	},
	{
		"id": "49db23b2-3fc7-490d-a9ae-e78be12c6de6",
		"name": "ArXxxxcxzctChur2",
		"email": "tesXzxczCxcte@email.com2",
		"phone": "(48)12934124",
		"created_at": "2023-02-07T01:33:09.733Z"
	},
	{
		"id": "45f8b18b-a9bb-441a-b88c-44f21fe04cff",
		"name": "ArXxxxcxzctChur3",
		"email": "tesXzxczCxcte@email.com3",
		"phone": "(48)12934124",
		"created_at": "2023-02-07T01:33:19.924Z"
	}
]

# Atualização de contato - PATCH

**Todos os campos de envio são obrigatórios**
- name - tipo string,
- email - tipo string,
- phone - tipo string,

**ROTA NESCESSITA DE AUTENTICAÇÃO**

*O id do contato a ser atualizado deve ser passado no link da requisição*

*Exemplo: http://localhost:3000/contacts/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 200 OK:**

{
	"id": "9ac06ba6-7ab6-4e29-80bc-a88be1affda8",
	"name": "Att John",
	"email": "newemail@teste.com",
	"phone": "(48)11111111",
	"created_at": "2023-02-02T02:23:20.746Z"
}

# Deleção de contato - DELETE

**Não nescessita de campos**

**ROTA NESCESSITA DE AUTENTICAÇÃO**

*O id do contato a ser deletado deve ser passado no link da requisição*

*Exemplo: http://localhost:3000/contacts/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 204 NO CONTENT:**

No content


Requisições que abrangem a parte do Cliente da API:

# Login de usuário - POST

**Todos os campos de envio são obrigatórios**
- email - tipo string,
- password - tipo string,

**ROTA NÃO NESCESSITA DE AUTENTICAÇÃO**

## RETORNO ESPERADO

**STATUS 200 OK:**


{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvcmdlQG1haWwuY29tMSIsImlhdCI6MTY3NTczMzU0NCwiZXhwIjoxNjc1ODE5OTQ0fQ.N84RvLbUdvNacr6rd-SSo5O_gcUT0VMSD3zZzW3e1W8",
	"userId": "ae99a924-9d46-491e-81c5-52a9dd43f013"
}


# Criação de cliente - POST

**Todos os campos de envio são obrigatórios**
- name - tipo string,
- email - tipo string,
- password - tipo string,
- phone - tipo string,

**ROTA NÃO NESCESSITA DE AUTENTICAÇÃO**

## RETORNO ESPERADO

**STATUS 201 CREATED:**


{
	"id": "e915cdc1-f53d-400c-a80d-bb605ef90c80",
	"name": "ArXtczxcChur",
	"email": "tesXczcCte@email.com",
	"phone": "(48)12934124",
	"password": "$2a$10$s8ltoa010XoalEdTbrhAX.KQLMblzZ520h.3DsP/VzYmRBckTO2dW",
	"created_at": "2023-02-12T14:08:23.568Z"
}


# Retorno de clientes - GET

**ROTA NÃO NESCESSITA DE AUTENTICAÇÃO**

## RETORNO ESPERADO

**STATUS 200 OK:**


[
	{
		"id": "bf44874b-c56f-45ef-8c29-6107b4e6284e",
		"name": "ArXtChur",
		"email": "tesXCte@email.com",
		"password": "$2a$10$cecGaYUXQ.5padWjVMPDS.d1Ecenxh4uDUJuzUTAiQYXb8eovsuGy",
		"phone": "(48)12934124",
		"created_at": "2023-02-02T01:44:47.618Z",
		"contacts": [
			{
				"id": "d1bb5416-7e13-4813-b715-e5360b7f83ef",
				"name": "ArXxctChur",
				"email": "tesXCxcte@email.com",
				"phone": "(48)12934124",
				"created_at": "2023-02-03T16:59:18.875Z"
			},
			{
				"id": "2465444a-86d5-4e9b-b04a-955678167947",
				"name": "ArXxxxcxzctChur",
				"email": "tesXzxczCxcte@email.com",
				"phone": "(48)12934124",
				"created_at": "2023-02-07T01:32:41.388Z"
			},
			{
				"id": "49db23b2-3fc7-490d-a9ae-e78be12c6de6",
				"name": "ArXxxxcxzctChur2",
				"email": "tesXzxczCxcte@email.com2",
				"phone": "(48)12934124",
				"created_at": "2023-02-07T01:33:09.733Z"
			},
			{
				"id": "45f8b18b-a9bb-441a-b88c-44f21fe04cff",
				"name": "ArXxxxcxzctChur3",
				"email": "tesXzxczCxcte@email.com3",
				"phone": "(48)12934124",
				"created_at": "2023-02-07T01:33:19.924Z"
			}
		]
	},
	{
		"id": "e65794f3-8137-4996-8579-ce6fdb00eadf",
		"name": "Arthur Ribeiro Goncalves",
		"email": "Jorge@mail.com2",
		"password": "$2a$10$Wt2NRE2NXpylQDLwJDhwUOP5UNUJueVutjDCmKOFPKk7YSNtGANJ6",
		"phone": "48999184091",
		"created_at": "2023-02-03T22:52:03.128Z",
		"contacts": []
	}
]

# Atualização de cliente - PATCH

**Todos os campos de envio são obrigatórios**
- name - tipo string,
- email - tipo string,
- password - tipo string,
- phone - tipo string,

**ROTA NESCESSITA DE AUTENTICAÇÃO**

*O id do cliente a ser atualizado deve ser passado no link da requisição*

*Exemplo: http://localhost:3000/clients/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 200 OK:**


{
	"id": "bf44874b-c56f-45ef-8c29-6107b4e6284e",
	"name": "Willy",
	"email": "willy@email.com",
	"password": "$2a$10$WsZfOo7Mz1rjTA13BXZ5qeCZ8fc6akv4HFI3xpIHIFUq4UkysjAxi",
	"phone": "(48)12934124",
	"created_at": "2023-02-02T01:44:47.618Z",
	"contacts": [
		{
			"id": "d1bb5416-7e13-4813-b715-e5360b7f83ef",
			"name": "ArXxctChur",
			"email": "tesXCxcte@email.com",
			"phone": "(48)12934124",
			"created_at": "2023-02-03T16:59:18.875Z"
		}
	]
}


# Deleção de cliente - DELETE

**Não nescessita de campos**

**ROTA NESCESSITA DE AUTENTICAÇÃO**

*O id do cliente a ser deletado deve ser passado no link da requisição*

*Exemplo: http://localhost:3000/clients/bf44874b-c56f-45ef-8c29-6107b4e6284e*

## RETORNO ESPERADO

**STATUS 204 NO CONTENT:**

No content





