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
        nombreProducto: "Arrolladitos de coliflor x6",
        precio: 850,
        imagen: "../assets/arrolladitos coliflor.jpg",
        cantidad: 0

    },
    {
        id: 2,
        nombreProducto: "Milanesas no pollo x4",
        precio: 800,
        imagen: "../assets/mila no-carne.jpg",
        cantidad: 0
    },
    {
        id: 3,
        nombreProducto: "Burger Sweet",
        precio: 600,
        imagen: "../assets/burger sweet.jpg",
        cantidad: 0

    },
    {
        id: 4,
        nombreProducto: "Burrito",
        precio: 2000,
        imagen: "../assets/burrito.jpg",
        cantidad: 0
    },
    {
        id: 5,
        nombreProducto: "Nuggets x6",
        precio: 700,
        imagen: "../assets/nuggets de tofu.jpg",
        cantidad: 0
    },
    {
        id: 6,
        nombreProducto: "Pizzetas de coliflor x4",
        precio: 850,
        imagen: "../assets/pizzetas cuscus.jpg",
        cantidad: 0
    },
    {
        id: 7,
        nombreProducto: "Falafels",
        precio: 700,
        imagen: "../assets/Falafels.jpg",
        cantidad: 0
    },
    {
        id: 8,
        nombreProducto: "Empanadas x6",
        precio: 1250,
        imagen: "../assets/empanadas.jpg",
        cantidad: 0
    },

]


let productCards = document.getElementById("product-cards")
let carrito = [];


for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    let cardHTML = `
    <div class="col-md-4 mb-4">
    <div class="card">
      <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
      <div class="card-body">
        <h5 class="card-title">${producto.nombreProducto}</h5>
        <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
        <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0" data-producto-id="${producto.id}"> 
        <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
      </div>
    </div>
  </div>`;

    productCards.innerHTML += cardHTML;
}
let cantidadInputs = document.querySelectorAll(`input[type="number"]`)

for (let i = 0; i < cantidadInputs.length; i++) {
    let input = cantidadInputs[i];
    input.addEventListener("input", actualizarCantidad)
}

let agregarButtons = document.getElementsByClassName("btn-agregar-carrito");

for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", agregarAlCarrito);

}

function actualizarCantidad(event) {
    let input = event.target;
    let productoId = input.getAttribute("data-producto-id");
    let cantidad = parseInt(input.value);//lo q escribe el user en el input
    //buscar el producto por id en el array de productos

    let producto = productos.find((producto) => producto.id === parseInt(productoId))
    // actualizar la q del producto en mi array de productos
    producto.cantidad = cantidad
}

function agregarAlCarrito(event) {
    let button = event.target;
    let productoid = button.getAttribute("data-producto-id")

    let producto = productos.find((producto) => producto.id == parseInt(productoid));

    let productoEnCarrito = carrito.find((item) => item.id == productoid);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += producto.cantidad;
    }
    else {
        carrito.push({ ...producto });
    }
    console.log("Producto agregado al carrito. ID: " + producto.id)
    console.log("carrito", carrito)
}

let productosEnCarrito = []
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

let botonCarrito = document.getElementById("botonCarrito")


function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""

    array.forEach(productoCarrito => {
        modalBody.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
      <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
      <div class="card-body">
              <h4 class="card-title">${productoCarrito.titulo}</h4>
          
              <p class="card-text">$${productoCarrito.precio}</p> 
              <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
      </div>    
  </div>
`
    });

    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))


        })

    });

}
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})


/* let carrito = []
let producto;

function buscarProducto() {
    let compra = prompt("Hola! ingrese el producto que quisiera comprar (Falafels, Milanesas veganas, Medallones de garbanzos, Arrolladitos de berenjena)");
    producto = productos.find ((p) => p.nombreProducto.toLowerCase() === compra.toLowerCase())
}

function agregarAlCarrito() {
    if (producto) {
        let cantidad = parseInt(prompt("Ingrese la cantidad que deseas agregar al carrito"))
        carrito.push({
            producto: producto.nombreProducto,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad
        });
    }
    else {
        alert("Ingrese una cantidad valida.")
    }
}

function confirmarCarrito() {
    while (true) {
        buscarProducto();
        agregarAlCarrito();

        if (!confirm("queres agregar otro producto?")){
            break;
        }
    }
}
confirmarCarrito()

function calcularTotal(){
    console.log("carrito de compras:");
    carrito.forEach((item) => {
       console.log(` - ${item.cantidad} ${item.producto}: ${item.subtotal}`)
    })
    let total = carrito.reduce ((sum, item) => sum + item.subtotal, 0)
    console.log(`total a pagar ${total}`)
}
calcularTotal() */
/* 
for (const producto of productos){
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h3> ID : ${producto.id}</h3>
    <p>Producto: ${producto.nombre}</p> `;
    document.body.appendChild(contenedor);
    //para saber que es hijo de body.(contenedor)//
} */