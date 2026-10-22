class Adicional {
    constructor(nombre, precio, categoria, disponible) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.disponible = disponible;
    }

    mostrarInformacion() {
        return this.nombre + " (" + this.categoria + ") - $" + this.precio;
    }

    aplicarDescuento(porcentaje) {
        this.precio = this.precio - (this.precio * (porcentaje / 100));
    }
}

let adicionales = [
    new Adicional("Desayuno", 20000, "Comida", true),
    new Adicional("Traslado", 40000, "Transporte", true),
    new Adicional("Excursión", 70000, "Actividad", true)
];

const contenedorItems = document.getElementById("contenedor-items");
const formAgregar = document.getElementById("form-agregar");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputCategoria = document.getElementById("input-categoria");
const inputBuscar = document.getElementById("input-buscar");
const spanTotal = document.getElementById("span-total");
const spanPromedio = document.getElementById("span-promedio");
const mensajeFeedback = document.getElementById("mensaje-feedback");

function mostrarFeedback(texto) {
    mensajeFeedback.innerText = texto;
    mensajeFeedback.classList.remove("oculto");
    setTimeout(() => {
        mensajeFeedback.classList.add("oculto");
    }, 3000);
}

function renderizarAdicionales(lista) {
    contenedorItems.innerHTML = "";

    if (lista.length === 0) {
        contenedorItems.innerHTML = "<p>No hay adicionales disponibles.</p>";
        actualizarEstadisticas([]);
        return;
    }

    lista.forEach((item, index) => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "card-adicional";
        tarjeta.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Categoría: ${item.categoria}</p>
            <p>Precio: $${item.precio}</p>
            <button onclick="eliminarAdicional(${index})">Eliminar</button>
        `;
        contenedorItems.appendChild(tarjeta);
    });

    actualizarEstadisticas(lista);
}

const inputPrecioMax = document.getElementById("input-precio-max");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnReset = document.getElementById("btn-reset");

btnFiltrar.addEventListener("click", () => {
    let precioMaximo = Number(inputPrecioMax.value);

    if (!precioMaximo) {
        alert("Ingresa un precio máximo válido.");
        return;
    }

    let filtrados = adicionales.filter(item => item.precio <= precioMaximo);
    renderizarAdicionales(filtrados);
});

btnReset.addEventListener("click", () => {
    inputBuscar.value = "";
    inputPrecioMax.value = "";
    renderizarAdicionales(adicionales);
});

function actualizarEstadisticas(lista) {
    let costoTotalAdicionales = lista.reduce((acumulado, item) => acumulado + item.precio, 0);
    let precioPromedio = lista.length > 0 ? costoTotalAdicionales / lista.length : 0;

    spanTotal.innerText = `$${costoTotalAdicionales}`;
    spanPromedio.innerText = `$${precioPromedio.toFixed(0)}`;
}

formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();

    let nombre = inputNombre.value;
    let precio = Number(inputPrecio.value);
    let categoria = inputCategoria.value;

    let nuevoAdicional = new Adicional(nombre, precio, categoria, true);
    adicionales.push(nuevoAdicional);

    renderizarAdicionales(adicionales);
    formAgregar.reset();
    mostrarFeedback("¡" + nombre + " fue agregado con éxito!");
});

function eliminarAdicional(index) {
    let eliminado = adicionales.splice(index, 1);
    renderizarAdicionales(adicionales);
    mostrarFeedback("Se eliminó " + eliminado[0].nombre + " del catálogo.");
}

inputBuscar.addEventListener("input", (e) => {
    let textoBuscado = e.target.value.toLowerCase();
    let filtrados = adicionales.filter(item =>
        item.nombre.toLowerCase().includes(textoBuscado)
    );
    renderizarAdicionales(filtrados);
});

renderizarAdicionales(adicionales);

const inputDias = document.getElementById("input-dias");
const inputPresupuestoDiario = document.getElementById("input-presupuesto-diario");
const inputPresupuestoDisponible = document.getElementById("input-presupuesto-disponible");
const btnCalcularViaje = document.getElementById("btn-calcular-viaje");
const resultadoViaje = document.getElementById("resultado-viaje");

const calcularCosto = (dias, presupuestoDiario) => dias * presupuestoDiario;
const calcularSaldo = (presupuestoDisponible, costoTotal) => presupuestoDisponible - costoTotal;

btnCalcularViaje.addEventListener("click", () => {
    let dias = Number(inputDias.value);
    let presupuestoDiario = Number(inputPresupuestoDiario.value);
    let presupuestoDisponible = Number(inputPresupuestoDisponible.value);

    if (dias <= 0 || presupuestoDiario <= 0 || presupuestoDisponible <= 0) {
        resultadoViaje.innerText = "Por favor, completa todos los campos con valores válidos.";
        return;
    }

    let costoTotal = calcularCosto(dias, presupuestoDiario);
    let diferencia = calcularSaldo(presupuestoDisponible, costoTotal);

    if (diferencia >= 0) {
        resultadoViaje.innerText = `Tu viaje cuesta $${costoTotal} y te sobran $${diferencia}. ¡Presupuesto aprobado!`;
    } else {
        resultadoViaje.innerText = `Tu viaje cuesta $${costoTotal} y te faltan $${-diferencia}. ¡Estás excedido!`;
    }
});