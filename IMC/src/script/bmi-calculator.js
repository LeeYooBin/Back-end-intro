document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");

  // Função executada ao preencher e enviar o formulário
  form.addEventListener("submit", (e) => {
    // Previne o comportamento padrão do formulário de refresh
    e.preventDefault();

    // Captura os valores de peso e altura do input e converte para float
    const weight = parseFloat(document.querySelector("#weight-input").value);
    const height = parseFloat(document.querySelector("#height-input").value);

    // Verifica se os valores de altura e peso são válidos
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert("Por favor, insira valores válidos para peso e altura.");
      return;
    }

    const bmi = calculateBmi(weight, height); // Calcula IMC
    const category = defineBmiCategory(bmi); // Define categoria

    // Exibe o IMC e a categoria na tela
    document.querySelector(".bmi-view").innerHTML = bmi.toFixed(1);
    document.querySelector(".category-view").innerHTML = category;
  });

  // Função para calcular o IMC
  const calculateBmi = (weight, height) => {
    const heightInMeters = height >= 3 ? height / 100 : height; // Converte a altura para metros
    return weight / (heightInMeters ** 2);
  }

  // Função para definir classificação do IMC
  const defineBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "Abaixo do peso";
    } else if (bmi < 24.9) {
      return "Peso normal";
    } else if (bmi < 29.9) {
      return "Sobrepeso";
    } else {
      return "Obesidade";
    }
  }
});
