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

	let j12 = calculateLambda(a[1], r[0]);
	r[1].push(sumVectors(a[1], multiplicateNumberAndVector(j12, r[0])));

	let j13 = calculateLambda(a[2], r[0]);
	let j23 = calculateLambda(a[2], r[1]);
}

function calculateLambda(a, r) {
	return multiplicateVectors(a, r) / multiplicateVectors(r, r);
}

function multiplicateVectors(v1, v2) {
	let result = v1.reduce((acc, el, ind) => {
		return acc += el * v2[ind];
	}, 0);

	return result;
}

function multiplicateNumberAndVector(num, vector) {
	let result = vector.map((el) => {
		return el *= num;
	}, 0);

	return result;
}

function sumVectors(v1, v2) {
	let result = v1.map((el, ind) => {
		return el += v2[ind];
	}, 0);

	return result;
}