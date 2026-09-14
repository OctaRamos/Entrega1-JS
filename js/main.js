const adicionales = [
    "Desayuno",
    "Traslado",
    "Excursión",
    "Seguro de viaje",
    "Late check-out"
];

const preciosAdicionales = [
    20000,
    40000,
    70000,
    30000,
    15000
];

// Actualización de adicionales disponibles

let adicionalEliminado = adicionales.pop();
preciosAdicionales.pop();

alert("Se ha eliminado el adicional: " + adicionalEliminado);

adicionales.push("Alquiler de bicicleta");
preciosAdicionales.push(25000);

adicionales.unshift("Snack de bienvenida");
preciosAdicionales.unshift(5000);

adicionales.splice(2, 1, "Traslado privado");
preciosAdicionales.splice(2, 1, 55000);


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


function mostrarAdicionales(lista, precios) {
    let mensaje = "Podés agregar adicionales:\n";
    let indice = 0;

    for (const adicional of lista) {
        console.log(
            "Adicional: " + adicional +
            " - $" + precios[indice]
        );

        mensaje += (indice + 1) + " - " + adicional +
            " ($" + precios[indice] + ")\n";

        indice++;
    }

    mensaje += (lista.length + 1) + " - Finalizar";

    return mensaje;
}


function procesarAdicional(opcion, saldo, lista, precios) {
    let indice = parseInt(opcion) - 1;

    if (!(indice >= 0 && indice < lista.length)) {
        alert("Opción inválida.");
        return saldo;
    }

    let nombreAdicional = lista[indice];
    let precioAdicional = precios[indice];

    if (saldo >= precioAdicional) {
        saldo = saldo - precioAdicional;

        alert(nombreAdicional + " agregado. Te quedan $" + saldo + ".");
    } else {
        alert(
            "No tenés presupuesto suficiente para agregar " +
            nombreAdicional + "."
        );
    }

    return saldo;
}


const nombre = prompt("Ingresá tu nombre:");

let dias = pedirNumero("Ingresá la cantidad de días del viaje:");
let presupuestoDiario = pedirNumero("Ingresá tu presupuesto diario:");
let presupuestoDisponible = pedirNumero(
    "Ingresá tu presupuesto disponible:"
);

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
            dias = pedirNumero(
                "Ingresá la nueva cantidad de días:"
            );
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

    mostrarResultado(
        nombre,
        costoTotal,
        presupuestoDisponible
    );
}


let adicionalBuscado = prompt(
    "Ingresá el nombre de un adicional para buscarlo:"
);

if (adicionales.includes(adicionalBuscado)) {
    let posicionAdicional = adicionales.indexOf(adicionalBuscado);

    alert(
        adicionalBuscado +
        " está disponible en el índice " +
        posicionAdicional + "."
    );
} else {
    alert("El adicional ingresado no está disponible.");
}


let saldo = calcularSaldo(
    presupuestoDisponible,
    costoTotal
);

let opcionAdicional = prompt(
    mostrarAdicionales(
        adicionales,
        preciosAdicionales
    )
);


let opcionFinalizar = adicionales.length + 1;

while (parseInt(opcionAdicional) !== opcionFinalizar) {

    saldo = procesarAdicional(
        opcionAdicional,
        saldo,
        adicionales,
        preciosAdicionales
    );

    opcionAdicional = prompt(
        mostrarAdicionales(
            adicionales,
            preciosAdicionales
        )
    );
}


alert(
    nombre +
    ", simulación finalizada. Tu saldo restante es $" +
    saldo + "."
);