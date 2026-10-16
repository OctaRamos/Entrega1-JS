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

const adicional1 = new Adicional("Desayuno", 20000, "Comida", true);
const adicional2 = new Adicional("Traslado", 40000, "Transporte", true);
const adicional3 = new Adicional("Excursión", 70000, "Actividad", true);

const adicionales = [
    adicional1,
    adicional2,
    adicional3
];

function pedirNumero(mensaje) {
    let numero = parseInt(prompt(mensaje));

    while (!(numero > 0)) {
        numero = parseInt(prompt("Valor inválido. " + mensaje));
    }

    return numero;
}

const calcularCosto = (dias, presupuestoDiario) => dias * presupuestoDiario;

const calcularSaldo = (presupuestoDisponible, costoTotal) => presupuestoDisponible - costoTotal;

const mostrarResultado = (nombre, costoTotal, presupuestoDisponible) => {
    let diferencia = calcularSaldo(presupuestoDisponible, costoTotal);

    if (diferencia >= 0) {
        alert(nombre + ", tu viaje cuesta $" + costoTotal + " y te quedan $" + diferencia + ".");
    } else {
        alert(nombre + ", tu viaje cuesta $" + costoTotal + " y te faltan $" + (-diferencia) + ".");
    }
};

function mostrarAdicionales(lista) {
    if (lista.length === 0) {
        return "No se encontraron adicionales.";
    }

    let mensaje = "--- ADICIONALES EN CATÁLOGO ---\n";
    let indice = 0;

    for (const adicional of lista) {
        mensaje += (indice + 1) + " - " + adicional.mostrarInformacion() + "\n";
        indice++;
    }

    return mensaje;
}

function buscarAdicionalPorNombre(lista) {
    let nombreBuscado = prompt("Ingresá el nombre del adicional a buscar:");

    if (!nombreBuscado) return;

    let encontrado = lista.find(item => item.nombre.toLowerCase() === nombreBuscado.toLowerCase());

    if (encontrado) {
        console.log("Resultado de búsqueda (find):", encontrado);
        alert("¡Encontrado!\n" + encontrado.mostrarInformacion());
    } else {
        alert("No se encontró ningún adicional con el nombre '" + nombreBuscado + "'.");
    }
}

function filtrarAdicionalesPorPrecio(lista) {
    let precioMaximo = pedirNumero("Ingresá el precio máximo que estás dispuesto a pagar:");

    let filtrados = lista.filter(item => item.precio <= precioMaximo);

    console.log("Adicionales filtrados por precio <=" + precioMaximo + ":", filtrados);

    if (filtrados.length > 0) {
        alert("Adicionales con precio hasta $" + precioMaximo + ":\n\n" + mostrarAdicionales(filtrados));
    } else {
        alert("No hay adicionales disponibles por un precio menor o igual a $" + precioMaximo + ".");
    }
}

function verEstadisticasAdicionales(lista) {
    if (lista.length === 0) {
        alert("No hay adicionales cargados para calcular estadísticas.");
        return;
    }

    let categorias = lista.map(item => item.categoria);

    let costoTotalAdicionales = lista.reduce((acumulado, item) => acumulado + item.precio, 0);

    let precioPromedio = costoTotalAdicionales / lista.length;

    console.log("Categorías mapeadas (map):", categorias);
    console.log("Costo total de adicionales (reduce):", costoTotalAdicionales);

    alert(
        "--- ESTADÍSTICAS DEL CATÁLOGO ---\n\n" +
        "• Cantidad total de adicionales: " + lista.length + "\n" +
        "• Categorías presentes: " + categorias.join(", ") + "\n" +
        "• Suma total de precios: $" + costoTotalAdicionales + "\n" +
        "• Precio promedio: $" + precioPromedio.toFixed(2)
    );
}

function agregarAdicionalUsuario(lista) {
    let nombre = prompt("Ingresá el nombre del adicional:");
    
    if (nombre) {
        let precio = pedirNumero("Ingresá el precio:");
        let categoria = prompt("Ingresá la categoría (ej: Comida, Transporte, Actividad):");

        let nuevoAdicional = new Adicional(nombre, precio, categoria, true);
        lista.push(nuevoAdicional);

        alert("¡" + nombre + " fue agregado con éxito!");
    }
}

function eliminarAdicionalUsuario(lista) {
    if (lista.length === 0) {
        alert("No hay adicionales para eliminar.");
    } else {
        let mensaje = "Elegí el número del adicional que querés eliminar:\n" + mostrarAdicionales(lista);
        let opcion = parseInt(prompt(mensaje)) - 1;

        if (opcion >= 0 && opcion < lista.length) {
            let eliminado = lista.splice(opcion, 1);
            alert("Se eliminó " + eliminado[0].nombre + " del catálogo.");
        } else {
            alert("Opción inválida.");
        }
    }
}

function aplicarDescuentoAdicional(lista) {
    if (lista.length === 0) {
        alert("No hay adicionales disponibles.");
    } else {
        let mensaje = "Elegí el adicional al que querés aplicarle un descuento:\n" + mostrarAdicionales(lista);
        let indice = parseInt(prompt(mensaje)) - 1;

        if (indice >= 0 && indice < lista.length) {
            let porcentaje = pedirNumero("Ingresá el porcentaje de descuento (ej: 10, 15, 20):");
            lista[indice].aplicarDescuento(porcentaje);
            alert("¡Descuento aplicado! Nuevo precio de " + lista[indice].nombre + ": $" + lista[indice].precio);
        } else {
            alert("Opción inválida.");
        }
    }
}

function simularPresupuesto(nombreUsuario) {
    let dias = pedirNumero("Ingresá la cantidad de días del viaje:");
    let presupuestoDiario = pedirNumero("Ingresá tu presupuesto diario:");
    let presupuestoDisponible = pedirNumero("Ingresá tu presupuesto disponible:");

    let costoTotal = calcularCosto(dias, presupuestoDiario);

    mostrarResultado(nombreUsuario, costoTotal, presupuestoDisponible);
}

let nombreUsuario = prompt("¡Bienvenido al Simulador de Viajes! Ingresá tu nombre:");

if (nombreUsuario) {
    let opcion = "";

    while (opcion !== "0") {
        opcion = prompt(
            "Hola " + nombreUsuario + ", elegí una opción del menú:\n\n" +
            "1 - Ver adicionales disponibles\n" +
            "2 - Buscar adicional por nombre (find)\n" +
            "3 - Filtrar adicionales por precio máximo (filter)\n" +
            "4 - Ver estadísticas del catálogo (map & reduce)\n" +
            "5 - Agregar un adicional personalizado\n" +
            "6 - Quitar un adicional de la lista\n" +
            "7 - Aplicar descuento a un adicional\n" +
            "8 - Simular presupuesto de viaje\n" +
            "0 - Salir"
        );

        switch (opcion) {
            case "1":
                alert(mostrarAdicionales(adicionales));
                break;

            case "2":
                buscarAdicionalPorNombre(adicionales);
                break;

            case "3":
                filtrarAdicionalesPorPrecio(adicionales);
                break;

            case "4":
                verEstadisticasAdicionales(adicionales);
                break;

            case "5":
                agregarAdicionalUsuario(adicionales);
                break;

            case "6":
                eliminarAdicionalUsuario(adicionales);
                break;

            case "7":
                aplicarDescuentoAdicional(adicionales);
                break;

            case "8":
                simularPresupuesto(nombreUsuario);
                break;

            case "0":
                alert("Gracias por utilizar el simulador, " + nombreUsuario + ". ¡Hasta pronto!");
                break;

            default:
                alert("Opción no válida. Por favor, elegí un número del menú.");
                break;
        }
    }
}