let addToScreen = (data) => {
  document.getElementById("screen").value += data;
};

let clearScreen = () => {
  document.getElementById("screen").value = "";
};

let calculate = () => {
  let operation = document.getElementById("screen").value;

  console.log(operation);

  let result = cal(operation);

  result = obtenerDecimal(result)

  document.getElementById("screen").value = result;

  if (result == "Error!"){
    document.getElementById("sonidoError").play();
  }else{
    document.getElementById("sonidoAcertar").play();
  }
}

function encontrarOperador(operation) {
  let pos = -1;
  let operadoresEncontrados = 0;

  for (let i = 0; i < operation.length -1; i++){
    if (!isNaN(operation[i]) && isNaN(operation[i + 1])){
      operadoresEncontrados ++;
      pos = i + 1;
    }
  }

  if (operadoresEncontrados != 1 || pos == operation.length){
    pos = -1;
  }

  return pos;
}

function obtenerOperador(operation){
  let pos = encontrarOperador(operation);
  let operator = "Error!"

  if (pos != -1){
    operator = operation[pos];
  }
  return operator;
}

function obtenerPrimerNumero(operation){
  let pos = encontrarOperador(operation);
  let number = "";

  if(pos != -1){
    for (let i = 0; i < pos; i++){
      number += operation[i];
    }
  }

  return parseInt(number);
}

function obtenerSegundoNumero(operation){
  let pos = encontrarOperador(operation);
  let number = "";

  for (let i = 0; i < operation.length; i++){
    if (i > pos){
      number += operation[i];
    }
  }

  return parseInt(number)
}

function cal(operation){
  let cal = obtenerOperador(operation);
  let num1 = obtenerPrimerNumero(operation);
  let num2 = obtenerSegundoNumero(operation);
  let result = "Error!";
  console.log(cal);

  if(!isNaN(num1) && !isNaN(num2)) {
    switch (cal) {
      case ("+"):
        result = num1 + num2;
        break;
      case ("-"):
        result = num1 - num2;
      break;
        case ("*"):
        result = num1 * num2;
        break;
      case ("/"):
        result = "Error!";
        if (num2 !=0){
          result = num1 / num2;
        }
        break;
      default:
        result = "Error!";
        break;
        
    }
  }
  return result
}

function obtenerDecimal(result) {
   if (result != Math.floor(result)) {
    document.getElementById("screen").value = "Error!";
    document.getElementById("sonidoError").play();
    return "Error!";
  }
  return result;
}

document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("startButton");
  const bienvenidaSection = document.getElementById("bienvenidaSection");
  const calculatorSection = document.getElementById("calculatorSection");

  startButton.addEventListener("click", function() {
    bienvenidaSection.classList.add("fade-out");

    setTimeout(() => {
      bienvenidaSection.style.display = "none";
      calculatorSection.style.display = "flex";
    }, 600);
  });
});