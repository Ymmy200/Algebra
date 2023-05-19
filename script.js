const selectNumDimensiones = document.getElementById("num-dimensiones");
const coordenadas2D = document.getElementById("coordenadas-2d");
const coordenadas3D = document.getElementById("coordenadas-3d");
const cuadrante2D = document.getElementById("cuadrante-2d");
const btnCalcular = document.getElementById("btn-calcular");
const spanMagnitud = document.getElementById("magnitud");
const pFormulaMagnitud = document.getElementById("formula-magnitud");
const spanAngulo = document.getElementById("angulo");
const pCuadrante = document.getElementById("cuadrante");
const pCosenos = document.getElementById("cosenos");
const pVectorUnitario = document.getElementById("vector-unitario");
const pDireccion = document.getElementById("direccion");
const pFormulaAngulo = document.getElementById("formula-angulo");
const pFormulaCuadrante = document.getElementById("formula-cuadrante");
const pFormulaCosenos = document.getElementById("formula-cosenos");
const pFormulaVectorUnitario = document.getElementById("formula-vector-unitario");
const pFormulaDireccion = document.getElementById("formula-direccion");

// agregar evento al select para cambiar las coordenadas mostradas segun el numero de dimensiones seleccionado
selectNumDimensiones.addEventListener("change", (event) => {
  const numDimensiones = event.target.value;
  if (numDimensiones === "2") {
    coordenadas2D.style.display = "block";
    coordenadas3D.style.display = "none";
  } else if (numDimensiones === "3") {
    coordenadas2D.style.display = "none";
    coordenadas3D.style.display = "block";
  }
});


btnCalcular.addEventListener("click", (event) => {
  event.preventDefault(); // evitar que el formulario se envíe

  // obtener los valores de las coordenadas segun el numero de dimensiones seleccionado
  let x, y, z;
  const numDimensiones =
    selectNumDimensiones.options[selectNumDimensiones.selectedIndex].value;
  if (numDimensiones === "2") {
    x = Number(document.getElementById("x-2d").value);
    y = Number(document.getElementById("y-2d").value);
    z = 0;
  } else if (numDimensiones === "3") {
    x = Number(document.getElementById("x-3d").value);
    y = Number(document.getElementById("y-3d").value);
    z = Number(document.getElementById("z-3d").value);
  }

 
  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    alert("Introduce un valor numérico en todas las coordenadas");
    return;
  }

  // calcular la magnitud del vector
  const magnitud = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  spanMagnitud.textContent = `La magnitud es: ${magnitud.toFixed(2)}`;
  pFormulaMagnitud.style.display = "block";

  if (numDimensiones === "2") {
    // calcular el angulo del vector en 2D
    const angulo = Math.atan2(y, x) * (180 / Math.PI);
    spanAngulo.textContent = `El ángulo es: ${angulo.toFixed(2)}°`;
    spanAngulo.style.display = "block";
    pCuadrante.style.display = "block";
    pFormulaAngulo.style.display = "block";

    // determinar el cuadrante del vector en 2D
    let cuadrante;
    if (x > 0 && y > 0) {
      cuadrante = "I";
    } else if (x < 0 && y > 0) {
      cuadrante = "II";
    } else if (x < 0 && y < 0) {
      cuadrante = "III";
    } else if (x > 0 && y < 0) {
      cuadrante = "IV";
    } else {
      cuadrante = "No definido";
    }
    pCuadrante.textContent = `El vector se encuentra en el cuadrante ${cuadrante}`;
    pFormulaCuadrante.style.display = "block";
  } else if (numDimensiones === "3") {
    
    // Calcular el angulo del vector en 3D
    const anguloXY = Math.atan2(y, x) * (180 / Math.PI);
    const anguloXZ = Math.atan2(Math.sqrt(x ** 2 + y ** 2), z) * (180 / Math.PI);
    spanAngulo.innerHTML = `El ángulo en el plano XY es: ${anguloXY.toFixed(2)}°<br>
      El ángulo en el plano XZ es: ${anguloXZ.toFixed(2)}°`;
    spanAngulo.style.display = "block";
    pCosenos.style.display = "block";
    pVectorUnitario.style.display = "block";
    pDireccion.style.display = "block";
    pFormulaAngulo.style.display = "block";
    pFormulaCosenos.style.display = "block";
    pFormulaVectorUnitario.style.display = "block";
    pFormulaDireccion.style.display = "block";
    
    // calcular los cosenos directores del vector en 3D
    
    const cosenoX = x / magnitud;
    const cosenoY = y / magnitud;
    const cosenoZ = z / magnitud;
    pCosenos.innerHTML = `Los cosenos directores son:<br>
      Coseno θ (eje x): ${cosenoX.toFixed(2)}<br>
      Coseno φ (eje y): ${cosenoY.toFixed(2)}<br>
      Coseno λ (eje z): ${cosenoZ.toFixed(2)}`;
    
    // calcular el vector unitario del vector en 3D
    
    const vectorUnitario = `(${(x / magnitud).toFixed(2)})i + (${(y / magnitud).toFixed(2)})j + (${(z / magnitud).toFixed(2)})k`;
    pVectorUnitario.innerHTML = `El vector unitario es: ${vectorUnitario}`;

    // calcular la dirección del vector en 3D
    
   let direccion;
    if (isNaN(anguloXY) || isNaN(anguloXZ)) {
      direccion = "No definida";
    } else {
      if (anguloXY >= -90 && anguloXY < 90 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el primer octante (hacia arriba y hacia adelante)";
      } else if (anguloXY >= 90 && anguloXY < 180 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el segundo octante (hacia abajo y hacia adelante)";
      } else if (anguloXY >= 180 && anguloXY < 270 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el tercer octante (hacia abajo y hacia atrás)";
      } else if ((anguloXY >= -180 && anguloXY < -90 || anguloXY >= 270 && anguloXY < 360) && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el cuarto octante (hacia arriba y hacia atrás)";
      } else if (anguloXY >= 0 && anguloXY < 90 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el quinto octante (hacia arriba y hacia adelante)";
      } else if (anguloXY >= 90 && anguloXY < 180 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el sexto octante (hacia abajo y hacia adelante)";
      } else if (anguloXY >= 180 && anguloXY < 270 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el séptimo octante (hacia abajo y hacia atrás)";
      } else if ((anguloXY >= -180 && anguloXY < -90 || anguloXY >= 270 && anguloXY < 360) && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el octavo octante (hacia arriba y hacia atrás)";
      } else {
        direccion = "No definida";
      }
    }
    pDireccion.textContent = `La dirección del vector es: ${direccion}`;
  }
});

const LimpiarCal = document.getElementById("LimpiarCalculadora");

function limpiarCalculadora() {
  document.getElementById("anguloXY").value = "";
  document.getElementById("anguloXZ").value = "";
  document.getElementById("direccion").textContent = "";
}



