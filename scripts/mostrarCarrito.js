const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenidoCarrito = document.getElementById("contenido-carrito");
const totalCarrito = document.getElementById("total-carrito");



function mostrarCarrito() {
    contenidoCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td style="background-color: #fffbf1;">
                <div>${item.nombre}</div>
            </td>
            <td style="background-color: #fffbf1;">
                <div>${item.marca}</div>
            </td>
            <td style="background-color: #fffbf1;">
                <div>$${item.precio.toLocaleString()}</div>
            </td>
            <td style="background-color: #fffbf1;">
                <div>
                    <button class="btn btn-decrementar" onclick="actualizarCantidad(${index}, -1)">-</button>
                    ${item.cantidad}
                    <button class="btn btn-incrementar" onclick="actualizarCantidad(${index}, 1)">+</button>
                </div>
            </td>
            <td style="background-color: #fffbf1;">
                <div>$${(item.precio * item.cantidad).toLocaleString()}</div>
            </td>
            <td style="background-color: #fffbf1;">
                <div style="align-items: center;>
                    <button class="btn btn-eliminar" onclick="eliminarProducto(${index})">✖</button>
                </div>
            </td>
        `;

        contenidoCarrito.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total.toLocaleString();
}

function actualizarCantidad(index, cambio) {
    if (carrito[index].cantidad + cambio >= 1) {
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

document.getElementById("checkout-btn").addEventListener("click", function() {

    const carritoVacio = document.getElementById("contenido-carrito").children.length === 0;
    if (carritoVacio) {
        return;
    }

    document.getElementById("modalPagoExitoso").style.display = "block";
    localStorage.removeItem("carrito");
    mostrarCarrito();
    document.getElementById("contenido-carrito").innerHTML = "";
    document.getElementById("total-carrito").innerText = "0";
});

document.getElementById("cerrarModal").addEventListener("click", function() {
    document.getElementById("modalPagoExitoso").style.display = "none";
});

document.getElementById("volverInicio").addEventListener("click", function() {
    window.location.href = "index.html";
});


mostrarCarrito();
