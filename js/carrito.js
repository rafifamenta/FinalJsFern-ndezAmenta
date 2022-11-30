const colorCarrito = () => {

    //contenido del modal
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Tu elección:</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.id = "carrito-content";
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
    <img src= "${product.img}">
    <p>${product.nombre}</p>
    <p>${product.descripcion}</p>
    <p> $ ${product.precio} </p>
    <p class= "restar"> ➖​ </p>
    <p>Cantidad: ${product.cantidad}</p>
    <p class= "sumar"> ➕​ </p>
    <p>Total: $ ${product.cantidad * product.precio}</p> 
    <p class= "delete-product"> ❌​​ </p>
    `;

        modalContainer.append(carritoContent);

        //botones para sumar y restar productos dentro del carrito
        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
                saveLocal();
                colorCarrito();
            }
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            colorCarrito();
        });

        //boton para eliminar objetos del carrito
        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });

    //Calcula el total del carrito
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `TOTAL A PAGAR: $ ${total} `;
    modalContainer.append(totalCompra);

    const botonCompra = document.createElement("button");
    botonCompra.className = "boton-compra";
    botonCompra.innerText = "FINALIZAR COMPRA";
    botonCompra.addEventListener("click", () => {
        Swal.fire({
            text: "Por favor, continúa para realizar el pago.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#5d8a30",
            cancelButtonColor: "#d33",
            confirmButtonText: "Seguir",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("¡Gracias por tu compra!");
            }
        });

        carrito = [];
        const carritoContent = document.querySelectorAll("#carrito-content");
        console.log(carritoContent);
        carritoContent.forEach((element) => {
            element.remove();
        });
        localStorage.setItem("carrito", "[]");
    });
    modalContainer.append(botonCompra);
};

verCarrito.addEventListener("click", colorCarrito);

//boton para eliminar objetos del carrito
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoContador();
    saveLocal();
    colorCarrito();
};

//funcion para contar los objetos en el carrito
const carritoContador = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

//función para que el contador del carrito siga funcionando aún cuando refresco la página
carritoContador();
