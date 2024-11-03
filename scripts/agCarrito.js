const botonesAgregar = document.querySelectorAll(".boton-agregar");


const contadorCarrito = document.querySelector("#contador-carrito");

// Función para actualizar el contador
function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalProductos; // Actualiza el texto del contador
}


actualizarContador();

// Función para agregar producto al carrito
botonesAgregar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector(".nombre-producto").textContent;
        const precio = producto.querySelector(".precio").textContent.replace("$", "").replace(".", "");
        const marca = producto.querySelector(".marca-producto").textContent;


        const itemCarrito = {
            nombre,
            marca,
            precio: parseInt(precio),
            cantidad: 1
        };


        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoExistente = carrito.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(itemCarrito);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarContador();
    });
});
