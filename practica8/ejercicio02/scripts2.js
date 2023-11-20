document.addEventListener('DOMContentLoaded', function () {
  var miniaturas = document.querySelectorAll('.miniatura');
  var obras = document.querySelectorAll('tr[data-genero]');

  for (var i = 0; i < miniaturas.length; i++) {
      miniaturas[i].addEventListener('mouseenter', function (event) {
          // Crear una nueva imagen en el cuerpo del documento
          var contenedorExterno = document.createElement('div');
          contenedorExterno.classList.add('imagen-ampliada-externa');

          var contenedorInterno = document.createElement('div');
          contenedorInterno.classList.add('imagen-ampliada-interna', 'imagen-ampliada-borde'); // Agregar clases para el borde negro

          var imagenAmpliadaNueva = document.createElement('img');
          imagenAmpliadaNueva.src = this.src; //  para activar evento
          imagenAmpliadaNueva.alt = this.alt;

          // Agregar la imagen al contenedor interno
          contenedorInterno.appendChild(imagenAmpliadaNueva);

          // Agregar el contenedor interno al contenedor externo
          contenedorExterno.appendChild(contenedorInterno);

          // Mostrar la imagen ampliada en la posición del cursor
          document.body.appendChild(contenedorExterno);

          // Obtener la posición del cursor
          var x = event.pageX;
          var y = event.pageY;

          // Establecer la posición de la imagen ampliada
          contenedorExterno.style.left = x + 'px';
          contenedorExterno.style.top = y + 'px';

          // Adjuntar listener de mouseout para eliminar la imagen ampliada
          contenedorExterno.addEventListener('mouseout', function () {
              document.body.removeChild(contenedorExterno);
          });
      });
  }
    // Para seleccionar genero

    var filterSelect = document.querySelector('select[name="filter"]');
  
  filterSelect.addEventListener('change', function () {
    var selectedGenre = filterSelect.options[filterSelect.selectedIndex].value;

    // Restablecer la visualización de todas las obras
    obras.forEach(function (obra) {
      obra.style.display = '';
    });

    // Aplicar el filtro si se selecciona un género específico
    if (selectedGenre !== '0') {
      obras.forEach(function (obra) {
        var obraGenre = obra.getAttribute('data-genero');
        if (obraGenre !== selectedGenre) {
          obra.style.display = 'none';
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var editarBtns = document.querySelectorAll('.guardarBtn');

  editarBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
          var fila = btn.closest('tr');
          var atributosEditables = fila.querySelectorAll('.editable');

          var modal = document.createElement('div');
          modal.classList.add('modal');

          var contenidoModal = document.createElement('div');
          contenidoModal.classList.add('modal-contenido');

          // Agregar información de la obra al contenido del modal
          atributosEditables.forEach(function (atributoEditable) {
              var atributo = atributoEditable.getAttribute('data-atributo');
              var valorActual = atributoEditable.textContent;

              var etiqueta = document.createElement('p');
              etiqueta.textContent = atributo + ': ' + valorActual;
              contenidoModal.appendChild(etiqueta);
          });

          // Agregar campos de entrada para edición opcional
          atributosEditables.forEach(function (atributoEditable) {
              var input = document.createElement('input');
              input.type = 'text';
              input.value = atributoEditable.textContent;
              contenidoModal.appendChild(input);
          });

          // Agregar botón de guardar al contenido del modal
          var btnGuardar = document.createElement('button');
          btnGuardar.textContent = 'Guardar';
          contenidoModal.appendChild(btnGuardar);

          // Agregar contenido del modal al modal
          modal.appendChild(contenidoModal);

          // Mostrar el modal
          document.body.appendChild(modal);

          // Agregar evento al botón de guardar
          btnGuardar.addEventListener('click', function () {
              // Obtener los nuevos valores desde los campos de entrada
              var nuevosValores = contenidoModal.querySelectorAll('input');
              nuevosValores.forEach(function (input, index) {
                  atributosEditables[index].textContent = input.value;
              });

              // Cerrar el modal
              document.body.removeChild(modal);
          });
      });
  });
});

