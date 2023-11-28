// Obtener todas las piezas del rompecabezas
const piezasRompecabezas = document.querySelectorAll('.pieza-rompecabezas');
const botonIniciar = document.getElementById('boton-iniciar');

// Para el tiempo
const tiempoTranscurridoElemento = document.getElementById('tiempo-transcurrido');
let tiempoInicio;

// Función para verificar si el rompecabezas está resuelto
function esRompecabezasResuelto() {
  for (let i = 0; i < piezasRompecabezas.length - 1; i++) {
    if (parseInt(piezasRompecabezas[i].textContent) !== i + 1) {
      return false;
    }
  }
  return true;
}

// Funcion para desordenar las piezas (arreglo)
function desordenar(array) {
  const longitud = array.length;

  for (let i = longitud - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiar elementos
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Función para iniciar el juego
function iniciarJuego() {
  // Crear una matriz de valores del 1 al 15
  const valores = Array.from({ length: 15 }, (_, i) => i + 1);
  valores.push(0); // Agregar un 0 para representar la casilla en blanco

  desordenar(valores);

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
  // Empieza a contar el tiempo
  tiempoInicio = new Date();
  iniciarJuego();
  actualizarTiempo();
});

function actualizarTiempo() {
  // Calcula el tiempo transcurrido en milisegundos
  const tiempoTranscurrido = new Date() - tiempoInicio;

  // Convertir el tiempo a segundos
  const segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000);

  // Actualiza el elemento HTML con el tiempo transcurrido
  tiempoTranscurridoElemento.textContent = `Tiempo: ${segundosTranscurridos} segundos`;

  // para que sea en 1 segundo
  setTimeout(actualizarTiempo, 1000);
}

let movimientos = 0;

// Escuchar clics en cada pieza
piezasRompecabezas.forEach((pieza) => {
  pieza.addEventListener('click', () => {
    if (!esRompecabezasResuelto()) {
      const posicionActual = Array.from(piezasRompecabezas).indexOf(pieza);
      const posicionVacia = Array.from(piezasRompecabezas).findIndex((pieza) => pieza.classList.contains('pieza-vacia'));

      // Verificar las posiciones de columna y fila de la ficha vacia y ciclada 
      const diferenciaFila = Math.floor(posicionActual / 4) - Math.floor(posicionVacia / 4);
      const diferenciaColumna = posicionActual % 4 - posicionVacia % 4;

      // Validar que el movimiento es valido, osea que las piezas sen adyacentes a a la pieza vacia  para poder hace el movimiento
      //  se intercambian las clases y los textos entre la pieza clicada y la pieza vacía.
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
      tiempoFin = new Date();

      // Calcula la diferencia de tiempo en milisegundos
      const tiempoTranscurrido = tiempoFin - tiempoInicio;

      // Convierte la diferencia de tiempo a segundos
      const segundosTranscurridos = tiempoTranscurrido / 1000;

      alert('¡Felicidades! Has resuelto el rompecabezas.' + movimientos + ' movimientos.');
    }
  });
});
