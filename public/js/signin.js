import { getUsers } from "../Services/llamados.js"

const username = document.getElementById("username")
const password = document.getElementById("password")
const iniciar = document.getElementById("iniciar")

iniciar.addEventListener("click",async function(e) {
    e.preventDefault()
    const datos = await getUsers("users")
    console.log(datos);

    const usuarioValidoEstudiante = datos.find((dato) => dato.nombreUsuario === username.value && dato.claveUsuario === password.value && dato.tipoUsuario === "estudiante")
    const usuarioValidoAdmin = datos.find((dato) => dato.nombreUsuario === username.value && dato.claveUsuario === password.value && dato.tipoUsuario === "admin")

    if (usuarioValidoEstudiante) {
        window.location.href="pagPrincipal.html"
    }else if(usuarioValidoAdmin){
        window.location.href="pagAdmin.html"
    }else{
        console.log("Credenciales invalidas");
        
    }

    
})



