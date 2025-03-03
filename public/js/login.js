import { postUsers } from "../Services/llamados.js"
const username = document.getElementById("username")
const password = document.getElementById("password")
const registrar = document.getElementById("registrar")
const sede = document.getElementById("sede")
const checkbox = document.getElementById("checkbox")

registrar.addEventListener("click", async function(e){
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
              return !result && "No puedes registrarte sin Aceptar nuestros terminos y condiciones.";
            }
          });
          if (accept) {
            Swal.fire("Usted esta de acuerdo con los terminos y condiciones. Gracias!");
            
          }
     window.location.href = "signin.html"
    }
    const users = {
        "nombreUsuario": username.value,
        "claveUsuario": password.value,
        "tipoUsuario": "estudiante",
        "sede":sede.value,
    }
    postUsers(users,"users")
    

})