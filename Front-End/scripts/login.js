const form = document.getElementById("formulario")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const obj = {
        email: form.email.value,
        password: form.password.value
    }

    const response = fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(res => {
        if(res.ok){
            window.location.href = "../pages/dashboard.html"
        }
        return res.json()
    })
    .then(res => {
        localStorage.setItem("TOKEN", JSON.stringify(res.token))
        localStorage.setItem("USER_ID", JSON.stringify(res.userId))
    })
    .catch(err => {
        window.alert("Senha ou email incorreto")
    })
})