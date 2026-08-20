const nombre = prompt("Ingrese su nombre");
const dias = parseInt(prompt("Ingrese cantidad de días que desea viajar"));
const presupuestoDiario = parseFloat(prompt("Ingrese su presupuesto diario"));

const presupuestoTotal = dias * presupuestoDiario;

alert("Hola " + nombre + ", para un viaje de " + dias + " días con un presupuesto diario de $" + presupuestoDiario + ", necesitarías un presupuesto total de $" + presupuestoTotal + ".");