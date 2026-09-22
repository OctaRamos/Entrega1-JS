class Adicional {
    constructor(nombre, precio, categoria, disponible) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.disponible = disponible;
    }

    mostrarInformacion() {
        return this.nombre + " - $" + this.precio;
    }
}


const adicional1 = new Adicional(
    "Desayuno",
    20000,
    "Comida",
    true
);

const adicional2 = new Adicional(
    "Traslado",
    40000,
    "Transporte",
    true
);

const adicional3 = new Adicional(
    "Excursión",
    70000,
    "Actividad",
    true
);


const adicionales = [
    adicional1,
    adicional2,
    adicional3
];

// Actualización de adicionales disponibles

let adicionalEliminado = adicionales.pop();

alert(
    "Se ha eliminado el adicional: " +
    adicionalEliminado.nombre
);

const adicional4 = new Adicional(
    "Alquiler de bicicleta",
    25000,
    "Actividad",
    true
);

adicionales.push(adicional4);

const adicional5 = new Adicional(
    "Snack de bienvenida",
    5000,
    "Comida",
    true
);

adicionales.unshift(adicional5);

const adicional6 = new Adicional(
    "Traslado privado",
    55000,
    "Transporte",
    true
);

adicionales.splice(2, 1, adicional6);

// Verificación de las instancias y del método

console.log(adicional1);
console.log(adicional2);
console.log(adicional3);

console.log(adicional1.mostrarInformacion());
console.log(adicional2.mostrarInformacion());
console.log(adicional3.mostrarInformacion());


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


function mostrarAdicionales(lista) {
    let mensaje = "Podés agregar adicionales:\n";
    let indice = 0;

    for (const adicional of lista) {
        console.log(
            "Adicional: " + adicional.nombre +
            " - $" + adicional.precio
        );

        mensaje += (indice + 1) + " - " +
            adicional.nombre +
            " ($" + adicional.precio + ")\n";

        indice++;
    }

    mensaje += (lista.length + 1) + " - Finalizar";

    return mensaje;
}


function procesarAdicional(opcion, saldo, lista) {
    let indice = parseInt(opcion) - 1;

    if (!(indice >= 0 && indice < lista.length)) {
        alert("Opción inválida.");
        return saldo;
    }

    let adicionalSeleccionado = lista[indice];

    if (saldo >= adicionalSeleccionado.precio) {
        saldo = saldo - adicionalSeleccionado.precio;

        alert(
            adicionalSeleccionado.nombre +
            " agregado. Te quedan $" +
            saldo + "."
        );
    } else {
        alert(
            "No tenés presupuesto suficiente para agregar " +
            adicionalSeleccionado.nombre + "."
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

let posicionAdicional = -1;

for (const adicional of adicionales) {
    if (adicional.nombre === adicionalBuscado) {
        posicionAdicional = adicionales.indexOf(adicional);
    }
}

if (posicionAdicional !== -1) {
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
    mostrarAdicionales(adicionales)
);


let opcionFinalizar = adicionales.length + 1;

while (parseInt(opcionAdicional) !== opcionFinalizar) {

    saldo = procesarAdicional(
    opcionAdicional,
    saldo,
    adicionales
    );

    opcionAdicional = prompt(
    mostrarAdicionales(adicionales)
    );
}


alert(
    nombre +
    ", simulación finalizada. Tu saldo restante es $" +
    saldo + "."
);