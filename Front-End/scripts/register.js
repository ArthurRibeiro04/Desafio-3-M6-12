const form = document.getElementById("formulario")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if(form.password.value !== form.confirm.value){
        window.alert("Senhas não coencidem!")
    }
    else{
        if(form.name.value === "" || form.email.value === "" || form.phone.value === "" || form.password.value === ""){
            window.alert("Preencha todos os campos!")
        }
        else{
            const obj = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                password: form.password.value
            }

    
            const response = fetch("http://localhost:3000/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            .then(res => {
                if(res.ok){
                    window.location.href = "../pages/login.html"
                }
                else{
                    window.alert("Email já cadastrado!")
                }
            })
        }

}})
