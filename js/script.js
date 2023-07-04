let nombre = prompt("Ingrese su nombre")
alert("Hola" + " " + nombre + " bienvenido a nuestra tienda online!")

let carrito = ""
let operacionNueva = false

function agregarAlCarrito() {
    do {
        let producto = prompt("ingrese el nombre del producto que desea comprar (milanesas veganas, medallones de garbanzos, falafels, arrolladitos de berenjenas)");
        let cantidad = Number(prompt(`Ingrese la cantidad de ${producto} que desea agregar al carrito`));
        seleccionarProducto(producto, cantidad)
        operacionNueva = confirm("desea agregar otro producto al carrito?")
    } while (operacionNueva);

    console.log("productos en el carrito")
    console.log(carrito)
}

function seleccionarProducto(producto, cantidad) {
    switch (producto.toLowerCase()) {
        case "milanesas veganas":
            carrito += `milanesas veganas - cantidad: ${cantidad} - precio por pack de 4: ${1500 * cantidad}\n`;
            break;
          case "medallones de garbanzos":
            carrito += `medallones de garbanzos - cantidad: ${cantidad} - precio por pack de 4: ${890 * cantidad}\n`;
            break;
          case "falafels":
            carrito += `falafels - cantidad: ${cantidad} - precio por 100grs: ${990 * cantidad}\n`;
            break;
          case "arrolladitos de berenjena":
            carrito += `arrolladitos de berenjena - cantidad: ${cantidad} - precio por pack de 4: ${1100 * cantidad}\n`;
            break;
          default:
            alert("Seleccione un producto válido.");
            break;
    }
}

agregarAlCarrito();
alert( "has agregado"+" "+ carrito)