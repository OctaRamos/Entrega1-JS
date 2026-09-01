const nombre = prompt("Ingrese su nombre");

let dias = parseInt(prompt("Ingrese cantidad de días que desea viajar"));
let presupuestoDiario = parseFloat(prompt("Ingrese su presupuesto diario"));
let presupuestoDisponible = parseFloat(prompt("Ingrese cuánto dinero tiene disponible"));

let presupuestoTotal = dias * presupuestoDiario;

alert("Hola " + nombre + ", necesitarías un presupuesto total de $" + presupuestoTotal);

while (presupuestoTotal > presupuestoDisponible) {

    const dineroFaltante = presupuestoTotal - presupuestoDisponible;

    alert("Tu presupuesto no alcanza. Te faltan $" + dineroFaltante);

    let opcion = parseInt(prompt("¿Qué desea modificar? 1. Días, 2. Presupuesto diario, 3. Presupuesto disponible"));

    if (opcion === 1) {
        dias = parseInt(prompt("Ingrese nueva cantidad de días"));
    } else if (opcion === 2) {
        presupuestoDiario = parseFloat(prompt("Ingrese nuevo presupuesto diario"));
    } else if (opcion === 3) {
        presupuestoDisponible = parseFloat(prompt("Ingrese nuevo presupuesto disponible"));
    } else {
        alert("Opción incorrecta");
    }

    presupuestoTotal = dias * presupuestoDiario;
}

const dineroDisponible = presupuestoDisponible - presupuestoTotal;

let adicional = "Ninguno";

if (dineroDisponible >= 70000) {
    adicional = "Excursión";
} else if (dineroDisponible >= 40000) {
    adicional = "Traslado";
} else if (dineroDisponible >= 20000) {
    adicional = "Desayuno";
} else {
    adicional = "Ninguno";
}

alert("Viaje aprobado. Costo total: $" + presupuestoTotal + ". Dinero restante: $" + dineroDisponible + ". Adicional disponible: " + adicional);

console.log("Cliente: " + nombre);
console.log("Días: " + dias);
console.log("Presupuesto diario: $" + presupuestoDiario);
console.log("Costo total: $" + presupuestoTotal);
console.log("Dinero restante: $" + dineroDisponible);
console.log("Adicional disponible: " + adicional);