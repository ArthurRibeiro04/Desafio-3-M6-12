const imgContainer = document.getElementById("imgContainer")
const infoContainer = document.getElementById("infoContainer")
const modal = document.getElementById("modalBack")
const form = document.getElementById("modalForm")
const seusContatos = document.getElementById("seusContatos")
const openModal = document.getElementById("openModal")
const closeModal = document.getElementById("closeButton")
const token = JSON.parse(localStorage.getItem("TOKEN"))
const userId = JSON.parse(localStorage.getItem("USER_ID"))


if(!localStorage.getItem("TOKEN")){
    window.location.href = "../index.html"
}

seusContatos.addEventListener("click", () => {
    window.location.href = "../pages/dashboard.html"
})

form.addEventListener("submit", async (e) => {
    if(form.password.value !== form.confirm.value){
        window.alert("Senhas não coencidem!")
    }
    else{
    e.preventDefault()
    modal.className = "modalBackground sumir"

    const obj = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.password.value
    }

    const response = fetch(`http://localhost:3000/clients/${userId}`, {
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

    location.reload()

}})

closeModal.addEventListener("click", () => {
    modal.className = "modalBackground sumir"
})

openModal.addEventListener("click", () => {
    modal.className = "modalBackground"
})



const carregarPerfil = async () => {

    const response = fetch("http://localhost:3000/clients", {
        method: "GET"
    })
    .then(res => res.json())
    .then(res => res)

    const clients = await response

    const client = clients.find(client => client.id === userId)

    const h1 = document.createElement("h1")
    h1.innerText = client.name
    h1.className = "username"

    imgContainer.appendChild(h1)

    const email = document.createElement("h2")
    email.innerText = client.email

    const phone = document.createElement("h2")
    phone.innerText = client.phone

    infoContainer.append(email, phone)

}

carregarPerfil()

