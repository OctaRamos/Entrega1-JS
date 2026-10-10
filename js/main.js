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

const mostrarResultado = function(nombre, costoTotal, presupuestoDisponible) {
    let diferencia = calcularSaldo(presupuestoDisponible, costoTotal);

    if (diferencia >= 0) {
        alert(nombre + ", tu viaje cuesta $" + costoTotal + " y te quedan $" + diferencia + ".");
    } else {
        alert(nombre + ", tu viaje cuesta $" + costoTotal + " y te faltan $" + (-diferencia) + ".");
    }
};

function mostrarAdicionales(lista) {
    let mensaje = "--- ADICIONALES EN CATÁLOGO ---\n";
    let indice = 0;

    for (const adicional of lista) {
        mensaje += (indice + 1) + " - " + adicional.mostrarInformacion() + "\n";
        indice++;
    }

    return mensaje;
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

// Inicio de ejeccucón del simulador

let nombreUsuario = prompt("¡Bienvenido al Simulador de Viajes! Ingresá tu nombre:");

if (nombreUsuario) {
    let opcion = "";

    while (opcion !== "0") {
        opcion = prompt(
            "Hola " + nombreUsuario + ", elegí una opción del menú:\n\n" +
            "1 - Ver adicionales disponibles\n" +
            "2 - Agregar un adicional personalizado\n" +
            "3 - Quitar un adicional de la lista\n" +
            "4 - Simular presupuesto de viaje\n" +
            "0 - Salir"
        );

        switch (opcion) {
            case "1":
                alert(mostrarAdicionales(adicionales));
                break;

            case "2":
                agregarAdicionalUsuario(adicionales);
                break;

            case "3":
                eliminarAdicionalUsuario(adicionales);
                break;

            case "4":
                let dias = pedirNumero("Ingresá la cantidad de días del viaje:");
                let presupuestoDiario = pedirNumero("Ingresá tu presupuesto diario:");
                let presupuestoDisponible = pedirNumero("Ingresá tu presupuesto disponible:");

                let costoTotal = calcularCosto(dias, presupuestoDiario);

                mostrarResultado(nombreUsuario, costoTotal, presupuestoDisponible);
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