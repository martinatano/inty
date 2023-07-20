/* PRIMER PREENTREGA 
 let nombre = prompt("Ingrese su nombre");

while (nombre === null || nombre === ""){
    alert("por favor, ingrese un nombre valido");
nombre = prompt("ingrese su nombre")
}
alert("Hola"+ " " +"bienvenido a nuestra tienda online")

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
while( producto === null || producto === "" && cantidad === null || cantidad === ""){
    alert("por favor indique el producto que quisiera comprar");

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
alert("has agregado" + " " + carrito)

SEGUNDA PREENTREGA
 */

let productos = [
    {
        id: 1,
        nombreProducto: "Falafels",
        precio: 990
    },
    {
        id: 2,
        nombreProducto: "Milanesas veganas",
        precio: 1500
    },
    {
        id: 3,
        nombreProducto: "Medallones de garbanzos",
        precio: 890
    },
    {
        id: 4,
        nombreProducto: "Arrolladitos de berenjena",
        precio: 1100
    },

]
let carrito = []
let producto;

function buscarProducto() {
    let nombreProducto = prompt("Hola! ingrese el producto que quisiera comprar (Falafels, Milanesas veganas, Medallones de garbanzos, Arrolladitos de berenjena)");
    producto = productos.find ((p) => p.nombreProducto.toLowerCase() == nombreProducto.toLowerCase())
}

function agregarAlCarrito() {
    if (producto) {
        let cantidad = parseInt(prompt("Ingrese la cantidad que deseas agregar al carrito"))
        carrito.push({
            producto: producto.nombreProducto,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad
        })
    }
    else {
        alert("Ingrese una cantidad valida.")
    }
}

function confirmarCarrito() {
    while (true) {
        buscarProducto()
        agregarAlCarrito()

        if (!confirm("queres agregar otro producto?")){
            break;
        }
    }
}

function calcularTotal(){
    carrito.forEach((item) => {
       console.log(` - ${item.cantidad} ${item.producto}: ${item.subtotal}`)
    })
    let total = carrito.reduce ((sum, item) => sum + item.subtotal, 0)
    console.log(`total a pagar ${total}`)
}