export function calc(matrix) {
	let r = [[], [], [], [], []];
	let a = [[], [], [], [], []];

	//считывание столбцов
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length - 1; j++) {
			a[j].push(matrix[i][j]);
		}
	}

	//создание первого вектора
	for (let i = 0; i < matrix.length; i++) {
		r[0].push(matrix[i][0]);
	}
}

function multiplicateVectors(v1, v2) {
	let result = v1.reduce((acc, el, ind) => {
		return acc += el * v2[ind];
	}, 0);

	return result;
}