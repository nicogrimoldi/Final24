const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenidoCarrito = document.getElementById("contenido-carrito");
const totalCarrito = document.getElementById("total-carrito");



function mostrarCarrito() {
    contenidoCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <div>${item.nombre}</div>
            </td>
            <td>
                <div>${item.marca}</div>
            </td>
            <td>
                <div>$${item.precio.toLocaleString()}</div>
            </td>
            <td>
                <div>
                    <button class="btn btn-decrementar" onclick="actualizarCantidad(${index}, -1)">-</button>
                    ${item.cantidad}
                    <button class="btn btn-incrementar" onclick="actualizarCantidad(${index}, 1)">+</button>
                </div>
            </td>
            <td>
                <div>$${(item.precio * item.cantidad).toLocaleString()}</div>
            </td>
            <td>
                <div>
                    <button class="btn btn-eliminar" onclick="eliminarProducto(${index})">🗑️</button>
                </div>
            </td>
        `;

        contenidoCarrito.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total.toLocaleString();
}

function actualizarCantidad(index, cambio) {
    if (carrito[index].cantidad + cambio >= 1) {  // Aseguramos que la cantidad mínima sea 1
        carrito[index].cantidad += cambio;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}


document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    contenidoCarrito.innerHTML = "";
    totalCarrito.textContent = "0";
});


// Mostrar el carrito al cargar la página
mostrarCarrito();
