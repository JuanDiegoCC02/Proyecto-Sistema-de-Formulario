import { postUsers } from "../Services/llamados.js"

const idEstudiante = document.getElementById("idEstudiante")
const idCompu = document.getElementById("idCompu")
const sede = document.getElementById("sede")
const fechaSalida = document.getElementById("fechaSalida")
const fechaRegreso = document.getElementById("fechaRegreso")
const enviar = document.getElementById("enviar")
const checkbox = document.getElementById("checkbox")





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
  window.location.reload()
}
    const estadisticas = {
        "idEstudiante": idEstudiante.value,
        "idCompu": idCompu.value,
        "sede": sede.value,
        "fechaSalida": fechaSalida.value,
        "fechaRegreso": fechaRegreso.value
   
   }
    await postUsers(estadisticas,"estadisticas")
    window.location.reload()
})

