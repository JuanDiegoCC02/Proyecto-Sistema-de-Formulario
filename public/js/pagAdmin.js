import { postUsers, getUsers } from "../Services/llamados.js"

const idEstudiante = document.getElementById("idEstudiante")
const idCompu = document.getElementById("idCompu")
const sede = document.getElementById("sede")
const fechaSalida = document.getElementById("fechaSalida")
const fechaRegreso = document.getElementById("fechaRegreso")
const enviar = document.getElementById("enviar")
const checkbox = document.getElementById("checkbox")

const mostrarUsuarios = document.getElementById("mostrarUsuarios")
const mostrarFormularios = document.getElementById("mostrarFormularios")



enviar.addEventListener("click", async function(e){   
e.preventDefault()

    const estadisticas = {
        "idEstudiante": idEstudiante.value,
        "idCompu": idCompu.value,
        "sede": sede.value,
        "fechaSalida": fechaSalida.value,
        "fechaRegreso": fechaRegreso.value
   
   }
    await postUsers(estadisticas,"estadisticas")
})


async function mostrarUsuariosFunc(){

const datosUser = await getUsers ("users")

console.log(datosUser);

for (let index = 0; index < datosUser.length; index++) {
    let p = document.createElement("p")
    p.innerText = datosUser[index].users
    mostrarUsuarios.appendChild(p)

} 

}
 mostrarUsuariosFunc() 

