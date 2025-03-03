    import { postUsers, getUsers, deleteUser } from "../Services/llamados.js"

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



    // Funcion del click para enviar Formularios al db.json 
    enviar.addEventListener("click", async function(e){   
    e.preventDefault()
    if (!checkbox.checked) {
        const { value: accept } = await Swal.fire({
            title: "Terminos y Condiciones",
            input: "checkbox",
            inputValue: 1,
            inputPlaceholder: `
              Estoy de acuerdo con los Terminos y Condiciones.
            `,
            confirmButtonText: `
              Continue&nbsp;<i class="fa fa-arrow-right"></i>
            `,
            inputValidator: (result) => {
              return !result && "No puedes enviar el Formulario sin Aceptar nuestros terminos y condiciones.";
            }
          });
          if (accept) {
            Swal.fire("Usted esta de acuerdo con los terminos y condiciones. Gracias!");
            
          }
          setTimeout (()=>{

            window.location.reload()
          },2000);
          
          }
     
      

        const estadisticas = {
            "idEstudiante": idEstudiante.value,
            "idCompu": idCompu.value,
            "sede": sede.value,
            "fechaSalida": fechaSalida.value,
            "fechaRegreso": fechaRegreso.value,
            
    
    }
        await postUsers(estadisticas,"estadisticas")
        
      window.location.reload()
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

            //Separacion de SD para el movimeinto de las listas
            let sedeEl = document.createElement("span");
        sedeEl.innerText = datosForm[index].sede;
        formSd.appendChild(sedeEl);

            let botonesContainer = document.createElement("div");
            let btnAceptar = document.createElement("button")
            btnAceptar.setAttribute("class", "btnFormReg")
            let btnNegar = document.createElement("button") 
            btnNegar.setAttribute("class", "btnFormReg")
            
            btnAceptar.innerText = "Aceptar"
            btnNegar.innerText = "Negar"
            
            // Agregar ambos botones al contenedor
            botonesContainer.appendChild(btnAceptar);
            botonesContainer.appendChild(btnNegar);
        
            idEst.innerText = datosForm[index].idEstudiante
            idComp.innerText = datosForm[index].idCompu
            fSalida.innerText = datosForm[index].fechaSalida
            fRegreso.innerText = datosForm[index].fechaRegreso
            formSd.innerText = datosForm[index].sede
            
                // Agregar el contenedor de botones al elemento formSd
                formSd.appendChild(botonesContainer);
            


            //Btn Aceptar Funcion  para mover con el post el contenido
            btnAceptar.addEventListener("click", async function(e){   
                e.preventDefault()
    
                const formAcept = {
                    "idEstudiante": idEst.innerText,
                    "idCompu": idComp.innerText,
                    "sede": sedeEl.innerText,
                    "fechaSalida": fSalida.innerText,
                    "fechaRegreso": fRegreso.innerText,
                }
                await postUsers(formAcept,"formAceptados")  

                      // Elimina el formulario del almacenamiento original (si tienes una función deleteUser)
                     await deleteUser("estadisticas", datosForm[index].id)
        
        // Eliminar botones "Aceptar" y "Negar"
        botonesContainer.remove()
 formSd.innerHTML = ""
        // Recargar la página para actualizar la vista (opcional)
            window.location.reload();
    });
                

            //Btn Negar Funcion
            btnNegar.addEventListener("click", async function(e){   
                e.preventDefault()
    
                const formNeg = {
                    "idEstudiante": idEst.innerText,
                    "idCompu": idComp.innerText,
                    "sede": sedeEl.innerText,
                    "fechaSalida": fSalida.innerText,
                    "fechaRegreso": fRegreso.innerText,
                }
                await postUsers(formNeg,"formNegados")  

                      // Elimina el formulario del almacenamiento original (si tienes una función deleteUser)
                     await deleteUser("estadisticas", datosForm[index].id)
        
        // Eliminar botones "Aceptar" y "Negar"
       botonesContainer.remove()

       
            window.location.reload();
    });
        
            mostrarFormularios.appendChild(idEst) 
            mostrarFormularios.appendChild(idComp)
            mostrarFormularios.appendChild(fSalida)
            mostrarFormularios.appendChild(fRegreso)
            mostrarFormularios.appendChild(formSd)
            
        
        }
        }
        mostrarFormulariosFunc()
    

   async function mostrarFormAceptadosF(){
    const datosAceptados = await getUsers("formAceptados")
    
    console.log(datosAceptados);
    
    for (let index = 0; index < datosAceptados.length; index++) {
        let idEst = document.createElement("p")
        let idComp = document.createElement("p")
        let fSalida = document.createElement("p")
        let fRegreso = document.createElement("p")
        let formSd = document.createElement("p")
        
        idEst.innerText = datosAceptados[index].idEstudiante
        idComp.innerText = datosAceptados[index].idCompu
        fSalida.innerText = datosAceptados[index].fechaSalida
        fRegreso.innerText = datosAceptados[index].fechaRegreso
        formSd.innerText = datosAceptados[index].sede
        
        
        formAceptados.appendChild(idEst)
        formAceptados.appendChild(idComp)
        formAceptados.appendChild(fSalida)
        formAceptados.appendChild(fRegreso)
        formAceptados.appendChild(formSd)
    }
}
mostrarFormAceptadosF()

async function mostrarFormNegadosF(){
    const datosNegados = await getUsers("formNegados")
    
    console.log(datosNegados);
    
    for (let index = 0; index < datosNegados.length; index++) {
        let idEst = document.createElement("p")
        let idComp = document.createElement("p")
        let fSalida = document.createElement("p")
        let fRegreso = document.createElement("p")
        let formSd = document.createElement("p")
        
        idEst.innerText = datosNegados[index].idEstudiante
        idComp.innerText = datosNegados[index].idCompu
        fSalida.innerText = datosNegados[index].fechaSalida
        fRegreso.innerText = datosNegados[index].fechaRegreso
        formSd.innerText = datosNegados[index].sede
        
        
        formNegados.appendChild(idEst)
        formNegados.appendChild(idComp)
        formNegados.appendChild(fSalida)
        formNegados.appendChild(fRegreso)
        formNegados.appendChild(formSd)
    }
}
mostrarFormNegadosF()
