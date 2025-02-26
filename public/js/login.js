import { postUsers } from "../Services/llamados.js"
const username = document.getElementById("username")
const password = document.getElementById("password")
const registrar = document.getElementById("registrar")
const sede = document.getElementById("sede")

registrar.addEventListener("click", function(e){
    e.preventDefault()
    const users = {
        "nombreUsuario": username.value,
        "claveUsuario": password.value,
        "tipoUsuario": "estudiante",
        "sede":sede.value,
    }
    postUsers(users,"users")
    window.location.href = "signin.html"

})