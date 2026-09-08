const PRECIO_DESAYUNO = 20000;
const PRECIO_TRASLADO = 40000;
const PRECIO_EXCURSION = 70000;

function pedirNumero(mensaje) {
    let numero = parseInt(prompt(mensaje));

    while (!(numero > 0)) {
        numero = parseInt(prompt("Valor inválido. " + mensaje));
    }

    return numero;
}

function calcularCosto(dias, presupuestoDiario) {
    return dias * presupuestoDiario;
}

const calcularSaldo = (presupuestoDisponible, costoTotal) =>
    presupuestoDisponible - costoTotal;

const mostrarResultado = function(nombre, costoTotal, presupuestoDisponible) {
    let diferencia = calcularSaldo(presupuestoDisponible, costoTotal);

    if (diferencia >= 0) {
        alert(nombre + ", tu viaje cuesta $" + costoTotal +
            " y te quedan $" + diferencia + ".");
    } else {
        alert(nombre + ", tu viaje cuesta $" + costoTotal +
            " y te faltan $" + (-diferencia) + ".");
    }
};

function procesarAdicional(opcion, saldo) {
    let precioAdicional = 0;
    let nombreAdicional = "";

    switch (opcion) {
        case "1":
            precioAdicional = PRECIO_DESAYUNO;
            nombreAdicional = "Desayuno";
            break;

        case "2":
            precioAdicional = PRECIO_TRASLADO;
            nombreAdicional = "Traslado";
            break;

        case "3":
            precioAdicional = PRECIO_EXCURSION;
            nombreAdicional = "Excursión";
            break;

        default:
            alert("Opción inválida.");
            return saldo;
    }

    if (saldo >= precioAdicional) {
        saldo = saldo - precioAdicional;

        alert(nombreAdicional + " agregado. Te quedan $" + saldo + ".");
    } else {
        alert("No tenés presupuesto suficiente para agregar " +
            nombreAdicional + ".");
    }

    return saldo;
}

const nombre = prompt("Ingresá tu nombre:");

let dias = pedirNumero("Ingresá la cantidad de días del viaje:");
let presupuestoDiario = pedirNumero("Ingresá tu presupuesto diario:");
let presupuestoDisponible = pedirNumero("Ingresá tu presupuesto disponible:");

let costoTotal = calcularCosto(dias, presupuestoDiario);

mostrarResultado(nombre, costoTotal, presupuestoDisponible);


while (costoTotal > presupuestoDisponible) {

    let opcion = prompt(
        "Tu presupuesto no alcanza.\n" +
        "Elegí una opción:\n" +
        "1 - Modificar cantidad de días\n" +
        "2 - Modificar presupuesto diario\n" +
        "3 - Modificar presupuesto disponible"
    );

    switch (opcion) {
        case "1":
            dias = pedirNumero("Ingresá la nueva cantidad de días:");
            break;

        case "2":
            presupuestoDiario = pedirNumero(
                "Ingresá el nuevo presupuesto diario:"
            );
            break;

        case "3":
            presupuestoDisponible = pedirNumero(
                "Ingresá el nuevo presupuesto disponible:"
            );
            break;

        default:
            alert("Opción inválida.");
    }

    costoTotal = calcularCosto(dias, presupuestoDiario);

    mostrarResultado(nombre, costoTotal, presupuestoDisponible);
}


let saldo = calcularSaldo(presupuestoDisponible, costoTotal);

let opcionAdicional = prompt(
    "Podés agregar adicionales:\n" +
    "1 - Desayuno ($20000)\n" +
    "2 - Traslado ($40000)\n" +
    "3 - Excursión ($70000)\n" +
    "4 - Finalizar"
);

while (opcionAdicional !== "4") {

    saldo = procesarAdicional(opcionAdicional, saldo);

    opcionAdicional = prompt(
        "Elegí otro adicional o finalizá:\n" +
        "1 - Desayuno ($20000)\n" +
        "2 - Traslado ($40000)\n" +
        "3 - Excursión ($70000)\n" +
        "4 - Finalizar"
    );
}

alert(nombre + ", simulación finalizada. Tu saldo restante es $" + saldo + ".");