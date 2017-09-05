// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila: 2,
  columna: 2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano() {
  //var gano = true;

  console.log("|| Checkeando Posiciones de Piezas:");
  for (var y = 0; y < grilla.length; y++) {
    for (var x = 0; x < grilla[y].length; x++) {
      var coordsPieza = ((grilla[0].length * y) + x) + 1;
      console.log("=> " + coordsPieza);
      if (grilla[y][x] != coordsPieza) {
        return false
      }
    }
  }
  //console.log(gano ? "GANASTE" : "TE FALTAN ALGUNOS MOVIMIENTOS PARA GANAR");
  return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador() {
  alert("GANASTE");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {

  var valorAnterior = grilla[fila1][columna1];
  grilla[fila1][columna1] = grilla[fila2][columna2];
  grilla[fila2][columna2] = valorAnterior;
  console.log(grilla);

  var padre = document.getElementById("_9").parentNode;

  var idPiezaVacia = "_9";
  var idPiezaNoVacia = "_" + grilla[fila1][columna1];

  var piezaVacia = document.getElementById(idPiezaVacia).cloneNode(true);
  var piezaNoVacia = document.getElementById(idPiezaNoVacia).cloneNode(true);


  padre.replaceChild(piezaVacia, document.getElementById(idPiezaNoVacia));
  console.log(padre);
  var piezaANoVaciarEnDOM = (fila1 * grilla[0].length) + columna1;
  padre.insertBefore(piezaNoVacia, padre.children[piezaANoVaciarEnDOM]);
  padre.removeChild(padre.children[piezaANoVaciarEnDOM + 1]);
  console.log(padre);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  if (fila < 0 || fila >= grilla.length || columna < 0 || columna >= grilla[0].length) {
    console.log("|| MOVIMIENTO INVALIDO");
    return false;
  } else {
    return true;
  }

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion) {

  //left = 37
  //up = 38
  //right = 39
  //down = 40

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if (direccion == 40) {
    nuevaFilaPiezaVacia = posicionVacia.fila - 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
    console.log("|| HACIA ARRIBA /\\");
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
    console.log("|| HACIA ABAJO \\/");
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna - 1;
    console.log("|| HACIA IZQUIERDA <");
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna + 1;
    console.log("|| HACIA DERECHA >");

  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces) {
  console.log("|| SHUFFLING:");
  if (veces <= 0) { return; }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  console.log("=> ", veces);

  setTimeout(function () {
    mezclarPiezas(veces - 1);
},50);
}

function capturarTeclas() {
  document.body.onkeydown = (function (evento) {
    //debugger;
    console.log("==============");
    if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function () {
          mostrarCartelGanador();
       }, 20);
      }
      evento.preventDefault();
    }
  })
}

function iniciar() {
  mezclarPiezas(50);

  /*
  if(chequearSiGano()){
     mostrarCartelGanador();
  } else {
  }
  */
  capturarTeclas();

}

iniciar();
