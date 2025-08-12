const productos = [
  { nombre: "Desodorante Avon", precio: 9.99, imagen: "img/Avondeso.jpeg" },
  { nombre: "Banishing", precio: 19.99, imagen: "img/Banisin.jpeg" },
  { nombre: "Baume", precio: 14.99, imagen: "img/Baume.jpeg" },
  { nombre: "Jabón piel sensible", precio: 6.99, imagen: "img/Bebe.jpeg" },
  { nombre: "Perfume para Bebé", precio: 11.99, imagen: "img/Bebe1.jpeg" },
  { nombre: "Blossom", precio: 13.99, imagen: "img/Blossom.jpeg" },
  { nombre: "Crema para el cuerpo", precio: 7.99, imagen: "img/Bodycream.jpeg" },
  { nombre: "Colonia Chrome", precio: 15.99, imagen: "img/Chrome.jpeg" },
  { nombre: "Crema de día", precio: 5.99, imagen: "img/Cremadia.jpeg" },
  { nombre: "Delineador", precio: 8.99, imagen: "img/Delineador.jpeg" },
  { nombre: "Desodorantes", precio: 12.99, imagen: "img/Desodorantes.jpeg" },
  { nombre: "Loción para Caballero", precio: 10.99, imagen: "img/King.jpeg" },
  { nombre: "Perfume Unisex", precio: 9.49, imagen: "img/Kiwiunisex.jpeg" },
  { nombre: "Agua de Tocador", precio: 18.99, imagen: "img/Legend.jpeg" },
  { nombre: "Eau de Toilette", precio: 16.49, imagen: "img/Ride.jpeg" },
  { nombre: "Aceite para Cuerpo", precio: 13.49, imagen: "img/Royal.jpeg" },
  { nombre: "Agua de tocador para niño", precio: 8.49, imagen: "img/Skid.jpeg" },
  { nombre: "Pour Homme", precio: 6.49, imagen: "img/Sport.jpeg" },
  { nombre: "Crema extraprotectora", precio: 14.49, imagen: "img/terapia1.jpeg" },
  { nombre: "Crema para manos", precio: 17.99, imagen: "img/terapia2.jpeg" },
  { nombre: "Loción corporal", precio: 17.99, imagen: "img/vesen.jpeg" },
  { nombre: "Loción Master", precio: 17.99, imagen: "img/Yitsu.jpeg" }
];

const catalogo = document.getElementById("catalogo");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const pagarBtn = document.getElementById("pagar-btn");
let carrito = [];

function mostrarProductos() {
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });

  document.querySelectorAll(".producto-img").forEach((img, i) => {
    img.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      const imgGrande = document.getElementById("imgGrande");
      const modalNombre = document.getElementById("modalNombre");
      const modalPrecio = document.getElementById("modalPrecio");

      imgGrande.src = productos[i].imagen;
      imgGrande.alt = productos[i].nombre;
      modalNombre.textContent = productos[i].nombre;
      modalPrecio.textContent = `$${productos[i].precio.toFixed(2)}`;
      modal.style.display = "flex";
    });
  });
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function agregarAlCarrito(index) {
  const producto = productos[index];
  const existente = carrito.find(item => item.nombre === producto.nombre);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function eliminarUnaUnidad(index) {
  carrito[index].cantidad -= 1;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach((item, i) => {
    const subtotal = item.precio * item.cantidad;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} <strong>x${item.cantidad}</strong> - $${subtotal.toFixed(2)}
      <button onclick="eliminarUnaUnidad(${i})" style="margin-left:10px; background-color:#f44336; color:white; border:none; padding:3px 6px; border-radius:4px; cursor:pointer;">❌</button>
    `;
    listaCarrito.appendChild(li);
    totalCompra += subtotal;
  });

  const impuestos = totalCompra * 0.08;
  const totalFinal = totalCompra + impuestos;

  total.textContent = `Total: $${totalFinal.toFixed(2)} (incluye impuestos)`;

// ✅ Actualiza el botón de WhatsApp con el nuevo mensaje
  actualizarBotonWhatsapp();
}

function actualizarBotonWhatsapp() {
  const lista = document.querySelectorAll("#lista-carrito li");
  const total = document.getElementById("total").textContent;

  let mensaje = "Hola, quiero confirmar mi pedido:\n\n";

  lista.forEach(item => {
    mensaje += `• ${item.textContent}\n`;
  });

  mensaje += `\n${total}\n\nGracias.`;

  const numero = "15098300959"; // ← Reemplaza con el número de María
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  document.getElementById("whatsapp-btn").href = url;
}

pagarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let resumen = "Resumen de tu pedido:\n\n";
  carrito.forEach(item => {
    resumen += `• ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
  });

  const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const impuestos = totalCompra * 0.08;
  const totalFinal = totalCompra + impuestos;

  resumen += `\nSubtotal: $${totalCompra.toFixed(2)}\nImpuestos (8%): $${impuestos.toFixed(2)}\nTotal a pagar: $${totalFinal.toFixed(2)}\n\n`;
  resumen += "📨 Por favor realiza tu pago a Zelle al número: +1 509 830 0959\n";
  resumen += "Luego envía tu comprobante por WhatsApp a María.\n\n¡Gracias por tu compra, puede recogerlos en la dirección que se le proporcionará! 🙌";

  alert(resumen);
});

document.addEventListener("DOMContentLoaded", mostrarProductos);

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  const contenido = document.getElementById("modal-content");
  if (e.target === modal) {
    cerrarModal();
  }
});

// Cerrar modal al presionar la tecla Esc
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cerrarModal();
  }
});