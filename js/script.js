//uso get item para recuperar los elementos guardados en mi carrito previamente.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//contenido y carrito
const contenidoCarrito = document.getElementById("contenidoCarrito");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//consumiendo JSON de productos usando fetch
fetch("./api/products.json")
  .then((res) => res.json())
  .then((productos) =>{
    productos.data.forEach((product) => {
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
  <img src= "${product.img}">
  <h3>${product.nombre}</h3>
  <h4>Características: ${product.descripcion}</h4>
  <p class= "precio"> $ ${product.precio}</p>
  `;

      contenidoCarrito.append(content);

      let comprar = document.createElement("button");
      comprar.innerText = "Agregar al carrito";
      comprar.className = "Comprar";

      content.append(comprar);

      comprar.addEventListener("click", () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "El producto fue añadido",
        });

        //aqui utilizo metodo de array
        const repeat = carrito.some(
          (repeatProduct) => repeatProduct.id === product.id
        );

        //condicion usada para cuando hay dos productos iguales en el carrito, los suma.
        if (repeat) {
          carrito.map((prod) => {
            if (prod.id === product.id) {
              prod.cantidad++;
            }
          });
        } else {
          carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            cantidad: product.cantidad,
          });
          console.log(carrito);
          console.log(carrito.length);
          carritoContador();
          saveLocal();
        }
      });
    })
  })
  .catch((error) => console.log(error));

//Storage & JSON
//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
