import * as calc from './ortogonalization.js';

window.onload = () => {
  const matrix = [
    [0.43, 0.045, -0.02, 0.03, -0.02, 0.78],
    [0.12, 0.37, 0.02, 0, -0.01, -0.38],
    [0.01, 0.032, 0.356, -0.02, 0.05, 1.91],
    [0.12, -0.11, 0, 0.49, 0.112, -1.464],
    [-0.05, 0, 0.025, -0.01, 0.294, 2.362],
  ];
  const example = [
    [0.4, 0.3, -0.2, 2],
    [0.6, -0.5, 0.3, 2.5],
    [0.3, 0.2, 0.5, 11],
  ];
  const startValue = document.getElementById('matrix');
  const resultBlock = document.getElementById('result');
  calc.calc(example);
};