import { postUsers } from "../Services/llamados.js"
const username = document.getElementById("username")
const password = document.getElementById("password")
const registrar = document.getElementById("registrar")

const users = {
    "Admin": "444",
    "Student": "333"
}


registrar.addEventListener("click", function(){
    postUsers(username.value, password.value)

})
    

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        alert('Inicio de sesión exitoso')
        window.location.href = 'pagPrincipal.html'; 
    } else {
        alert('ERROR! Nombre de usuario o contraseña incorrectos');
    }
});