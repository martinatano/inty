const productos = [
    {
        id: 1,
        nombreProducto: "Arrolladitos de coliflor x6",
        precio: 850,
        imagen: "assets/arrolladitos coliflor.jpg",
        cantidad: 0

    },
    {
        id: 2,
        nombreProducto: "Milanesas no pollo x4",
        precio: 800,
        imagen: "assets/mila no-carne.jpg",
        cantidad: 0
    },
    {
        id: 3,
        nombreProducto: "Burger Sweet",
        precio: 600,
        imagen: "assets/burger sweet.jpg",
        cantidad: 0

    },
    {
        id: 4,
        nombreProducto: "Burrito",
        precio: 2000,
        imagen: "assets/burrito.jpg",
        cantidad: 0
    },
    {
        id: 5,
        nombreProducto: "Nuggets x6",
        precio: 700,
        imagen: "assets/nuggets de tofu.jpg",
        cantidad: 0
    },
    {
        id: 6,
        nombreProducto: "Pizzetas de coliflor x4",
        precio: 850,
        imagen: "assets/pizzetas cuscus.jpg",
        cantidad: 0
    },
    {
        id: 7,
        nombreProducto: "Falafels",
        precio: 700,
        imagen: "assets/Falafels.jpg",
        cantidad: 0
    },
    {
        id: 8,
        nombreProducto: "Empanadas x6",
        precio: 1250,
        imagen: "assets/empanadas.jpg",
        cantidad: 0
    },

]

const productCards = document.getElementById("product-cards")
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    let cardHTML = `
    <div class="col-md-4 mb-4">
    <div class="card">
      <img src="../${producto.imagen}" class="card-img-top" alt="Imagen del producto">
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

const agregarButtons = document.getElementsByClassName("btn-agregar-carrito");


for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", agregarAlCarrito);

}


for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i]
    button.addEventListener("click", () => {
        Swal.fire({
            icon: 'success',
            title: 'Genial!',
            text: 'Producto agregado al carrito',
          })

    });
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
    let productoId = button.getAttribute("data-producto-id")

    let producto = productos.find((producto) => producto.id == parseInt(productoId));

    let productoEnCarrito = carrito.find((item) => item.id == productoId);
    // operador ternario if
    productoEnCarrito ?  productoEnCarrito.cantidad += producto.cantidad : carrito.push({ ...producto });

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const botonCarrito = document.getElementById("botonCarrito")
const modalBody = document.getElementById("modal-body")

function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""


    array.forEach(productoCarrito => {
        modalBody.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
      <img class="card-img-top" height="300px" src="../${productoCarrito.imagen}" alt="${productoCarrito.nombreProducto}">
      <div class="card-body">
              <h4 class="card-title">${productoCarrito.nombreProducto}</h4>
          
              <p class="card-text"> seleccionaste ${productoCarrito.cantidad} unidad/es a $${productoCarrito.precio} cada una </p> 
              <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
      </div>    
  </div>
`
    });

    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            carrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))


        })

    });

}

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(carrito)
})


