// Obtener todas las piezas del rompecabezas
const piezasRompecabezas = document.querySelectorAll('.pieza-rompecabezas');
const botonIniciar = document.getElementById('boton-iniciar');

// Función para verificar si el rompecabezas está resuelto
function esRompecabezasResuelto() {
  for (let i = 0; i < piezasRompecabezas.length - 1; i++) {
    if (parseInt(piezasRompecabezas[i].textContent) !== i + 1) {
      return false;
    }
  }
  return true;
}

// Función para iniciar el juego
function iniciarJuego() {
  // Crear una matriz de valores del 1 al 15
  const valores = Array.from({ length: 15 }, (_, i) => i + 1);
  valores.push(0); // Agregar un 0 para representar la casilla en blanco

  // Desordenar los valores
  for (let i = valores.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valores[i], valores[j]] = [valores[j], valores[i]];
  }

  // Asignar los valores desordenados a las piezas del rompecabezas
  piezasRompecabezas.forEach((pieza, index) => {
    pieza.textContent = valores[index];
    if (valores[index] === 0) {
      pieza.classList.add('pieza-vacia');
    } else {
      pieza.classList.remove('pieza-vacia');
    }
  });
}

// Manejador de clic en el botón de inicio
botonIniciar.addEventListener('click', () => {
  iniciarJuego();
});

let movimientos = 0;

// Escuchar clics en cada pieza
piezasRompecabezas.forEach((pieza) => {
  pieza.addEventListener('click', () => {
    if (!esRompecabezasResuelto()) {
      const posicionActual = Array.from(piezasRompecabezas).indexOf(pieza);
      const posicionVacia = Array.from(piezasRompecabezas).findIndex((pieza) => pieza.classList.contains('pieza-vacia'));

      const diferenciaFila = Math.floor(posicionActual / 4) - Math.floor(posicionVacia / 4);
      const diferenciaColumna = posicionActual % 4 - posicionVacia % 4;

      if ((Math.abs(diferenciaFila) === 1 && diferenciaColumna === 0) || (Math.abs(diferenciaColumna) === 1 && diferenciaFila === 0)) {
        pieza.classList.toggle('pieza-vacia');
        piezasRompecabezas[posicionVacia].classList.toggle('pieza-vacia');
        [pieza.textContent, piezasRompecabezas[posicionVacia].textContent] = [piezasRompecabezas[posicionVacia].textContent, pieza.textContent];

        // Incrementar el contador de movimientos
        movimientos++;

        // Actualizar un elemento HTML para mostrar el número de movimientos
        document.getElementById('contador-movimientos').textContent = `Movimientos: ${movimientos}`;
      }
    }

    if (esRompecabezasResuelto()) {
      alert('¡Felicidades! Has resuelto el rompecabezas.' + movimientos + ' movimientos.');
    }
  });
});
