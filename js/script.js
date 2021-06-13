
// VARIABLES Y CONSTANTES //
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("total");
const carritoContenedor = document.getElementById("contenedorCarrito");
const botonVaciarCarrito = document.getElementById("vaciarCarro");
const botonComprar = document.getElementById("botonComprar");
let carritoCompras = [];
let productos = [];
let generadorCards = ``;


let carritoEnLocalStorage = obtenerLocalStorage();
      if (carritoEnLocalStorage) {
          carritoCompras = carritoEnLocalStorage;
          actualizarCarrito();
        }

// FETCH //
async function productosJSON() {
    const response = await fetch("objetos.json");
    const data = await response.json();
    productos = data;
    mostrarProducto(productos);
}
productosJSON();

// mostrarProducto(productos)
function mostrarProducto(array){
  generadorCards = ``;
  for (let i = 0; i < array.length; i++) {
    generadorCards += `
    <div class="col-lg-4 col-md-6 mb-4" class="card">
    <div class="card h-100">
      <img class="card-img-top" src="${array[i].imagen}" alt="">
      <div class="card-body">
        <h4 class="card-title">
          <p>${array[i].nombre}</p>
        </h4>
        <h5>$${array[i].precio}</h5>
        <p class="card-text"><b>Marca: </b>${array[i].marca} <br> <b>Genero: </b>${array[i].genero} <br>  <b>Stock: </b>${array[i].stock}</p>
      </div>
      <button class="botonCard" data-bs-dismiss="modal" data-toggle="modal" data-target="#modalBtnAgregar" onclick="agregarAlCarrito(${array[i].id}, ${array[i].stock})">Agregar al carrito</button>
    </div>
  </div>`;
  }
   document.getElementById("cards").innerHTML = generadorCards;
  }
  

// FUNCIONES CARRITO //
function agregarAlCarrito(id) {
   let productoSeleccionado = productos.find(element => element.id == id);
   let productoEnCarrito = carritoCompras.find(element => element.id == id);
      if(productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
      }else {
        if (productoSeleccionado) {
          carritoCompras.push(productoSeleccionado);
        }
      }
  actualizarCarrito();
  guardarLocaStorage();
}

function actualizarCarrito() {
     carritoContenedor.innerHTML = ``;
     carritoCompras.forEach((productos) => {
        const div = document.createElement("div");
        div.classList.add("modal-body");
        div.innerHTML = `
                   <div class="contenido-modal">
                     <p><b>Producto:</b>${productos.nombre}</p>
                     <p><b>Precio: $</b>${productos.precio}</p>
                     <p><b>cantidad:</b>${productos.cantidad}</p>
                     <button  data-bs-dismiss="modal" data-toggle="modal" data-target="#modalBtnEliminar" onclick=eliminarProducto(${productos.id}) class="btn-close btn btn-danger">&times;</button> 
                     <button onclick=sumarCantidadProducto(${productos.id}) class="btn-close btn btn-primary">+</button>
                  </div>
                  `
          carritoContenedor.appendChild(div);        
      })
         contadorCarrito.innerText = carritoCompras.length;
         totalCarrito.innerText = carritoCompras.reduce((acumulador, elemento) => acumulador += (elemento.precio * elemento.cantidad), 0);
}

function eliminarProducto(id) {
   let productoParaEliminar = carritoCompras.find(element => element.id === id);
   productoParaEliminar.cantidad -= 1;
     if(productoParaEliminar.cantidad == 0) {
        let indiceProductoParaEliminar = carritoCompras.indexOf(productoParaEliminar);
        carritoCompras.splice(indiceProductoParaEliminar, 1); 
     }
     guardarLocaStorage();
     actualizarCarrito()
    }

function sumarCantidadProducto(id) {
    if (carritoCompras) {
        let productoParaSumar = carritoCompras.find(element => element.id === id);
            productoParaSumar.cantidad += 1;
    }
      guardarLocaStorage();
      actualizarCarrito();
}
      
function vaciarCarrito() {
   carritoCompras = [];
   guardarLocaStorage();
   actualizarCarrito();
}
      
function comprarProducto() {
  carritoCompras = [];
  actualizarCarrito();
  guardarLocaStorage();
}

//EVENTOS//
botonVaciarCarrito.addEventListener("click", ()=> {
   vaciarCarrito();
})

botonComprar.addEventListener("click", ()=> {
   comprarProducto();
});


     




    
    
     


      
 
        
        
    

    

    



    
    
  
  



  



