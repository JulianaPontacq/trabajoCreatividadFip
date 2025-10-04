const cursos = [
  { nombre: "JavaScript", precio: 40000, imagen: "imagenes/javascript.jpg" },
  { nombre: "Python", precio: 45000, imagen: "imagenes/python.jpg" },
  { nombre: "Base de Datos", precio: 35000, imagen: "imagenes/base_datos.png" },
  { nombre: "Inteligencia Artificial", precio: 70000, imagen: "imagenes/ia.jpg" },
  { nombre: "Programación Orientada a Objetos", precio: 50000, imagen: "imagenes/poo.jpg" },
  { nombre: "GitHub", precio: 60000, imagen: "imagenes/github.jpg" },
  { nombre: "HTML & CSS", precio: 30000, imagen: "imagenes/html_css.jpg" },
  { nombre: "React", precio: 55000, imagen: "imagenes/react.png" }
];

const container = document.getElementById("cursos-container");

// Tarjetas de cursos
cursos.forEach(curso => {
  const div = document.createElement("div");
  div.className = "curso";

  div.innerHTML = `
    <img src="${curso.imagen}" alt="${curso.nombre}">
    <h3>${curso.nombre}</h3>
    <p>Precio: $${curso.precio}</p>
    <button class="add-to-cart" data-name="${curso.nombre}" data-price="${curso.precio}">Agregar al carrito</button>
  `;

  container.appendChild(div);
});

// Carrito 
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");
const comprarBtn = document.getElementById("comprar-btn");
let total = 0;

// Actualizador del  total con sus descuentos
function actualizarTotal() {
  let cantidad = carritoLista.children.length;
  let descuento = 0;

  if (cantidad === 2) descuento = 0.10;
  if (cantidad >= 3) descuento = 0.20;

  let totalConDescuento = total - (total * descuento);
  carritoTotal.textContent = totalConDescuento.toFixed(2);
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const nombre = e.target.getAttribute("data-name");
    const precio = parseFloat(e.target.getAttribute("data-price"));

    const li = document.createElement("li");
    li.innerHTML = `${nombre} - $${precio} <span class="remove-item">❌</span>`;

    li.querySelector(".remove-item").addEventListener("click", () => {
      carritoLista.removeChild(li);
      total -= precio;
      actualizarTotal();
    });

    carritoLista.appendChild(li);

    total += precio;
    actualizarTotal();
  }
});

// Compras con logros
comprarBtn.addEventListener("click", () => {
  if (total > 0) {
    const cantidad = carritoLista.children.length;
    let logro = "";

    if (cantidad >= 5) logro = "🌟 Logro desbloqueado: ¡Full Stack en progreso!";
    else if (cantidad >= 3) logro = "🏅 Logro desbloqueado: ¡Estudiante avanzado!";

    alert(`✅ Compra realizada por un total de $${carritoTotal.textContent}. ${logro}`);

    carritoLista.innerHTML = "";
    total = 0;
    carritoTotal.textContent = total.toFixed(2);
  } else {
    alert("⚠️ El carrito está vacío. Agregá cursos antes de comprar.");
  }
});

// Recomendador de cursos
const recomendacion = document.getElementById("recomendacion");
document.querySelectorAll("#recomendador button").forEach(boton => {
  boton.addEventListener("click", () => {
    const tipo = boton.getAttribute("data-tipo");

    let cursoRecomendado = "";
    if (tipo === "frontend") cursoRecomendado = "👉 Te recomiendo empezar con HTML & CSS.";
    if (tipo === "backend") cursoRecomendado = "👉 Te recomiendo empezar con Python o JavaScript.";
    if (tipo === "datos") cursoRecomendado = "👉 Te recomiendo el curso de SQL.";

    recomendacion.textContent = cursoRecomendado;
  });
});

// Contacto 
const formulario = document.getElementById("formulario-contacto");
formulario.addEventListener("submit", e => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Te responderemos pronto.");
  formulario.reset();
});
