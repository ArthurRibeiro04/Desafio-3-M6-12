const openModal = document.getElementById("addButton")
const closeModal = document.getElementById("closeButton")
const closeModalEdit = document.getElementById("closeButtonEdit")
const modal = document.getElementById("modalBack")
const modalEdit = document.getElementById("modalEdit")
const modalForm = document.getElementById("modalForm")
const modalFormEdit = document.getElementById("modalFormEdit")
const lista = document.getElementById("lista")
const seuPerfil = document.getElementById("seuPerfil")
const imprimir = document.getElementById("relatorio")
const token = JSON.parse(localStorage.getItem("TOKEN"))
const userId = JSON.parse(localStorage.getItem("USER_ID"))

if(!localStorage.getItem("TOKEN")){
    window.location.href = "../index.html"
}

seuPerfil.addEventListener("click", () => {
    window.location.href = "../pages/perfil.html"
})

imprimir.addEventListener("click", () => {
    window.open(`http://localhost:3000/report/${userId}`)
})

const listarContatos = async () => {
    lista.innerHTML = ""

    const response = fetch(`http://localhost:3000/contacts/${userId}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(res => res)

    const contacts = await response

    contacts.forEach((contact) => {
        const li = document.createElement("li")
        li.className = "card"
        li.id = contact.id

        const img = document.createElement("img")
        img.className = "cardImg"
        img.src = "../sources/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
        li.appendChild(img)

        const div = document.createElement("div")
        div.className = "cardInfo"

        const h2 = document.createElement("h2")
        h2.innerText = contact.name
        div.appendChild(h2)

        const span1 = document.createElement("span")
        span1.innerText = contact.email
        div.appendChild(span1)

        const span2 = document.createElement("span")
        span2.innerText = contact.phone
        div.appendChild(span2)

        const button1 = document.createElement("button")
        button1.innerText = "Remover Contato"
        div.appendChild(button1)

        button1.addEventListener("click", async () => {
            const response = fetch(`http://localhost:3000/contacts/${contact.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            })

            await response

            location.reload()
        })

        const button2 = document.createElement("button")
        button2.innerText = "Editar Contato"
        div.appendChild(button2)

        button2.addEventListener("click", () => {
            modalEdit.className = "modalBackground"
            localStorage.setItem("CONTACT_ID", JSON.stringify(contact.id))
        })

        li.appendChild(div)

        lista.appendChild(li)
    })
}

modalFormEdit.addEventListener("submit", async (e) => {
    const contactId = JSON.parse(localStorage.getItem("CONTACT_ID"))
    e.preventDefault()
    modalEdit.className = "modalBackground sumir"

    const obj = {
        name: modalFormEdit.name.value,
        email: modalFormEdit.email.value,
        phone: modalFormEdit.phone.value
    }

    modalFormEdit.name.value = ""
    modalFormEdit.email.value = ""
    modalFormEdit.phone.value = ""

    const response = fetch(`http://localhost:3000/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(res => res)


    await response
    listarContatos()

})

modalForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    modal.className = "modalBackground sumir"
    


    const obj = {
        name: modalForm.name.value,
        email: modalForm.email.value,
        phone: modalForm.phone.value
    }

    modalForm.name.value = ""
    modalForm.email.value = ""
    modalForm.phone.value = ""


    const response = fetch(`http://localhost:3000/contacts/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(res => res)


    await response
    listarContatos()
    
})

openModal.addEventListener("click", () => {
    modal.className = "modalBackground"
})

closeModal.addEventListener("click", () => {
    modal.className = "modalBackground sumir"
})
closeModalEdit.addEventListener("click", () => {
    modalEdit.className = "modalBackground sumir"
})

await listarContatos()