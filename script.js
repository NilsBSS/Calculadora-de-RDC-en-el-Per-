const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const resistanceInput = document.getElementById('resistance');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');
const ohmChartCanvas = document.getElementById('ohmChart');

let ohmChart = null;

// Función para calcular la Ley de Ohm
function calculateOhm() {
  const voltage = parseFloat(voltageInput.value);
  const current = parseFloat(currentInput.value);
  const resistance = parseFloat(resistanceInput.value);

  if (!isNaN(voltage) && !isNaN(current)) {
    resistanceInput.value = (voltage / current).toFixed(2);
  } else if (!isNaN(voltage) && !isNaN(resistance)) {
    currentInput.value = (voltage / resistance).toFixed(2);
  } else if (!isNaN(current) && !isNaN(resistance)) {
    voltageInput.value = (current * resistance).toFixed(2);
  }

  updateChart();
}

// Función para actualizar el gráfico
function updateChart() {
  const voltage = parseFloat(voltageInput.value) || 0;
  const current = parseFloat(currentInput.value) || 0;
  const resistance = parseFloat(resistanceInput.value) || 0;

  if (ohmChart) {
    ohmChart.destroy();
  }

  ohmChart = new Chart(ohmChartCanvas, {
    type: 'line',
    data: {
      labels: ['Voltaje (V)', 'Corriente (I)', 'Resistencia (R)'],
      datasets: [{
        label: 'Valores',
        data: [voltage, current, resistance],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Función para restablecer los valores
function resetValues() {
  voltageInput.value = '';
  currentInput.value = '';
  resistanceInput.value = '';
  updateChart();
}

calculateButton.addEventListener('click', calculateOhm);
resetButton.addEventListener('click', resetValues);

// Inicializar el gráfico
updateChart();