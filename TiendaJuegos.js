function mostrarError(input, mensaje) {
  const contenedorError = document.getElementById("error-" + input.id);
  if (contenedorError) {
    contenedorError.textContent = mensaje;
  }
  input.classList.toggle("campo-invalido", Boolean(mensaje));
}

const reglas = {
  requerido: (valor) => (valor.trim() === "" ? "Este campo es obligatorio" : ""),

  correo: (valor) => {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor.trim() === "") return "Este campo es obligatorio";
    return patron.test(valor) ? "" : "Ingresa un correo con formato valido, por ejemplo ja.pere@duocuc.cl";
  },

  telefono: (valor) => {
    const patron = /^\+?[0-9\s]{8,15}$/;
    if (valor.trim() === "") return "Este campo es obligatorio";
    return patron.test(valor) ? "" : "Ingresa un telefono valido (solo numeros, entre 8 y 15 digitos).";
  },

  minLargo: (valor, largo) => {
    if (valor.trim() === "") return "Este campo es obligatorio.";
    return valor.trim().length >= largo ? "" : `Debe tener al menos ${largo} caracteres.`;
  },

  apodo: (valor) => {
    if (valor.trim() === "") return ""; 
    const patron = /^[a-zA-Z0-9_]{3,15}$/;
    return patron.test(valor) ? "" : "Usa entre 3 y 15 caracteres, sin espacios ni simbolos.";
  },

  clave: (valor) => {
    const tieneLetra = /[a-zA-Z]/.test(valor);
    const tieneNumero = /[0-9]/.test(valor);
    if (valor === "") return "Este campo es obligatorio.";
    if (valor.length < 8) return "Debe tener al menos 8 caracteres.";
    if (!tieneLetra || !tieneNumero) return "Debe incluir al menos una letra y un numero.";
    return "";
  },
};

const listaProductos = [
  { id: 1, nombre: "The Last of Us", precio: 12000, imagen: "Imagenes/thelast.png" },
  { id: 2, nombre: "God Of War", precio: 12000, imagen: "Imagenes/gow.png" },
  { id: 3, nombre: "Call Of Duty", precio: 15000, imagen: "Imagenes/call.png" },
  { id: 4, nombre: "Helldivers", precio: 28000, imagen: "Imagenes/hell.png"},
  { id: 5, nombre: "GTAVI", precio: 90000, imagen: "Imagenes/gta.png" },
];

const listaProductosCarreras = [
  { id: 6, nombre: "Need For Speed", precio: 60000, imagen: "Imagenes/need.png" },
  { id: 7, nombre: "Gran Turismo", precio: 22000, imagen: "Imagenes/granturismo.png" },
  { id: 8, nombre: "Forza Horizon", precio: 35000, imagen: "Imagenes/forza.png" },
  { id: 9, nombre: "F1", precio: 45000, imagen: "Imagenes/f1.png" },
  { id: 10, nombre: "Burnout", precio: 8000, imagen: "Imagenes/burnout.png" },
];

function cargarProductos() {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;
  contenedor.innerHTML = ""; 

  listaProductos.concat(listaProductosCarreras).forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <li>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
      </li>`;

    contenedor.appendChild(tarjeta);
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const apodo = document.getElementById("apodo");
  const usuario = document.getElementById("usuario");
  const clave = document.getElementById("clave");
  const claveConfirmacion = document.getElementById("clave-confirmacion");
  const terminos = document.getElementById("terminos");
  const mensajeExito = document.getElementById("mensaje-exito");

  function validarCampo(input) {
    let mensaje = "";

    switch (input.id) {
      case "nombre":
        mensaje = reglas.minLargo(input.value, 3);
        break;
      case "correo":
        mensaje = reglas.correo(input.value);
        break;
      case "telefono":
        mensaje = reglas.telefono(input.value);
        break;
      case "apodo":
        mensaje = reglas.apodo(input.value);
        break;
      case "usuario":
        mensaje = reglas.minLargo(input.value, 4);
        break;
      case "clave":
        mensaje = reglas.clave(input.value);
        break;
      case "clave-confirmacion":
        mensaje = input.value !== clave.value ? "Las contraseñas no coinciden vuelva a intentar" : "";
        break;
    }

    mostrarError(input, mensaje);
    return mensaje === "";
  }

  function enviar() {
    const nombre = document.getElementById('nombre')
    
    console.log('el tipo de dato del input email es: ' + nombre.value.length)

    if (nombre,nombre.value.length == 0){
        alert('el campo debe de tener un valor')
        return false
    }

    if (nombre.value.length <=100){
        alert('exedes el limite de carateres ')
        return false
    }



    return true
  }
  
  
  
  function enviar() {
    const email = document.getElementById('correo')
    
    console.log('el tipo de dato del input email es: ' + email.value.length)

    if (email.value.length == 0){
        alert('el campo email debe tener un valor')
        return false
    }

    if (email.value.length <=100){
        alert('exedes el limite de carateres ')
        return false
    }



    return true
  }

  formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if(mensajeExito) mensajeExito.hidden = true;

    const camposValidos = [nombre, correo, telefono, apodo, usuario, clave, claveConfirmacion]
      .filter(Boolean)
      .map(validarCampo)
      .every(Boolean);

    let terminosValido = true;
    const errorTerminos = document.getElementById("error-terminos");
    if (terminos && !terminos.checked) {
      if(errorTerminos) errorTerminos.textContent = "Debes aceptar los terminos y condiciones.";
      terminosValido = false;
    } else if(errorTerminos) {
      errorTerminos.textContent = "";
    }

    if (camposValidos && terminosValido) {
      if(mensajeExito) mensajeExito.hidden = false;
      formRegistro.reset();
    }
  });
}