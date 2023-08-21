const productCards = document.getElementById("product-cards")
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

fetch('../json/data.json')
.then((response) => response.json())
.then((data) => {
    productos = data;
    generarTarjetasProductos(productos);
})

function generarTarjetasProductos(productos){
    productos.forEach(producto => {
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
    })
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
            confirmButtonColor: `darksalmon`, 
            confirmButtonText: 'Aceptar'
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

    let inputCantidad = document.querySelector(`input[data-producto-id="${productoId}"]`);
    let cantidad = parseInt(inputCantidad.value);

    let productoEnCarrito = carrito.find((item) => item.id == productoId);
    // operador ternario if
    productoEnCarrito ?  productoEnCarrito.cantidad += cantidad : carrito.push({ ...producto, cantidad:cantidad });

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
          
              <p class="card-text"> Cantidad: ${productoCarrito.cantidad} | Subtotal: $${productoCarrito.precio * productoCarrito.cantidad}  </p> 
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