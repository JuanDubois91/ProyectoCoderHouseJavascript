// FUNCIONES APLICADAS CON jQuery //
$(document).ready(function () {

  const filtroGenero = $("#generoF");
  const filtroMarca = $("#marcaF");
  const filtroPrecio = $("#precioF");


  filtroGenero.change(function(){
     ordenarPorNombre();
     let filtro = filtroGenero.val();
     if (filtro == "todos") {
      mostrarProducto(productos);
    }else {
    mostrarProducto(productos.filter(elem => elem.genero == filtro));
  }
})

  filtroMarca.change(function() {
    ordenarPorNombre();
    let filtro = filtroMarca.val();
    if (filtro == "todos") {
       mostrarProducto(productos);
      }else {
    mostrarProducto(productos.filter(elem => elem.marca == filtro));
  }
})

  filtroPrecio.change(function() {
     ordenarPorPrecio();
     let filtro = filtroPrecio.val();
     if (filtro == "0") {
    mostrarProducto(productos);
  }else if (filtro == "1") {
    mostrarProducto(productos.filter(elem => elem.precio < 2000));
  }else {
    mostrarProducto(productos.filter(elem => elem.precio > 2000));
  }
})

});


 const ordenarPorPrecio = () => {
    productos.sort((dato1, dato2) => {
        if (dato1.precio < dato2.precio) {
            return -1;
        }
        else if (dato1.precio > dato2.precio) {
            return 1;
        }
        return 0;
      })
 }


 const ordenarPorNombre = () => {
  productos.sort((dato1, dato2) => {
      if (dato1.nombre < dato2.nombre) {
          return -1;
      }
      else if (dato1.nombre > dato2.nombre) {
          return 1;
      }
      return 0;
    })
  }


const inputBuscar = document.querySelector("#inputBuscar");

const formularioBuscar = ()=> {
   let ingresoUsuario = inputBuscar.value.toLowerCase();
      if (ingresoUsuario) {
        mostrarProducto(productos.filter(elemento => elemento.nombre.toLowerCase().includes(ingresoUsuario)));
      }
    }

inputBuscar.addEventListener("keyup", formularioBuscar);






 




















