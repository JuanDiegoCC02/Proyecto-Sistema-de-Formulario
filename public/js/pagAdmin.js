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
    const formAceptados = document.getElementById("formAceptados")
    const formNegados = document.getElementById("formNegados")


/*          FUNCION DEL CAMBIO DE LISTAS CON LOCAL-STORAGE
    //almacena en el Local-Storage
     function saveState(){
        localStorage.setItem("formAceptados", formAceptados.innerHTML)
        localStorage.setItem("formNegados", formNegados.innerHTML)
    }
    //muestra el contenido del Local-Storage
     function loadState (){
        if (localStorage.getItem("formAceptados")) {
            formAceptados.innerHTML = localStorage.getItem("formAceptados")
        }
        if (localStorage.getItem("formNegados")) {
            formNegados.innerHTML = localStorage.getItem("formNegados")
        }
    }
     */

    // Funcion del click para enviar
    enviar.addEventListener("click", async function(e){   
    e.preventDefault()

    window.location.reload

        const estadisticas = {
            "idEstudiante": idEstudiante.value,
            "idCompu": idCompu.value,
            "sede": sede.value,
            "fechaSalida": fechaSalida.value,
            "fechaRegreso": fechaRegreso.value,
            "estado": false
    
    }
        await postUsers(estadisticas,"estadisticas")
        

    })


    //Funcion Mostrar registro de Usuarios
    async function mostrarUsuariosFunc(){

    const datosUser = await getUsers ("users")

    console.log(datosUser);

    for (let index = 0; index < datosUser.length; index++) {
        let name = document.createElement("p")
    // let e = document.createElement("p")
        let tpU = document.createElement("p")
        let Sd = document.createElement("p")

        name.innerText = datosUser[index].nombreUsuario
    // e.innerText = datosUser[index].email 
        tpU.innerText = datosUser[index].tipoUsuario
        Sd.innerText = datosUser[index].sede
        
        mostrarUsuarios.appendChild(name) 
    // mostrarUsuarios.appendChild(e)
        mostrarUsuarios.appendChild(tpU)
        mostrarUsuarios.appendChild(Sd)

    }
    }
    mostrarUsuariosFunc()


    //Funcion Mostrar registro de Formularios
    async function mostrarFormulariosFunc(){

        const datosForm = await getUsers ("estadisticas")
        
        console.log(datosForm);
        
        for (let index = 0; index < datosForm.length; index++) {
            let idEst = document.createElement("p")
            let idComp = document.createElement("p")
            let fSalida = document.createElement("p")
            let fRegreso = document.createElement("p")
            let formSd = document.createElement("p")
            

            let btnAceptar = document.createElement("button")
            let btnNegar = document.createElement("button") 
        
            idEst.innerText = datosForm[index].idEstudiante
            idComp.innerText = datosForm[index].idCompu
            fSalida.innerText = datosForm[index].fechaSalida
            fRegreso.innerText = datosForm[index].fechaRegreso
            formSd.innerText = datosForm[index].sede
            

            btnAceptar.innerText = "Aceptar"
            btnNegar.innerText = "Negar"


            //Btn Aceptar Funcion  
            btnAceptar.addEventListener("click", async function(){
                const actualizarForm =  await patchData( actualizarForm,`estadisticas/${datosForm[index].id}`)
                    formAceptados.appendChild(idEst)
                    formAceptados.appendChild(idComp)
                    formAceptados.appendChild(fSalida)
                    formAceptados.appendChild(fRegreso)
                    formAceptados.appendChild(formSd)

                
        })

            //Btn Negar Funcion
            btnNegar.addEventListener("click", function(){
                const data2 ={}
                formNegados.appendChild(idEst)
                formNegados.appendChild(idComp)
                formNegados.appendChild(fSalida)
                formNegados.appendChild(fRegreso)
                formNegados.appendChild(formSd)
                //saveState()
            })


             // Añadir botones a cada elemento <p>
            let botones = document.createElement("div");
            botones.appendChild(btnAceptar);
            botones.appendChild(btnNegar);
            
            formSd.appendChild(botones);


            mostrarFormularios.appendChild(idEst) 
            mostrarFormularios.appendChild(idComp)
            mostrarFormularios.appendChild(fSalida)
            mostrarFormularios.appendChild(fRegreso)
            mostrarFormularios.appendChild(formSd)
            mostrarFormularios.appendChild(status)
            

        
        }
        }
        mostrarFormulariosFunc()
        