function guardarLocaStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
}

function obtenerLocalStorage() {
    if (localStorage.getItem("carrito")) {
        let productoEnLocalStorage = JSON.parse(localStorage.getItem("carrito"));
        return productoEnLocalStorage
    }
}