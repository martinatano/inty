let form = document.querySelector(`form`);
let submitButton = form.querySelector(`button[type="submit"]`)

form.addEventListener("submit", function(e){
    e.preventDefault();

//capturar lo q escribe el user
let nombreApellido = form.querySelector(`#nombreApellido`).value;
let telefono = form.querySelector(`#telefono`).value;
let email = form.querySelector(`#email`).value;
let direccion = form.querySelector(`#direccion`).value;
let consulta = form.querySelector(`#consulta`).value;

let datoUsuario= {
    nombreApellido: nombreApellido,
    telefono: telefono,
    email: email,
    direccion: direccion,
    consulta: consulta
};

let registros = []
registros.push(datoUsuario);
console.log(registros);

alert("has enviado los datos, pronto te contactaremos")
form.reset();
})