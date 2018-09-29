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
	console.log(j12);
	r[1] = sumVectors(a[1], multiplicateNumberAndVector(-1 * j12, r[0]));
	console.log(r[1]);

	let j13 = calculateLambda(a[2], r[0]);
	let j23 = calculateLambda(a[2], r[1]);
	console.log(j13);
	console.log(j23);

	let tmp1 = multiplicateNumberAndVector(-1 * j13, r[0]);
	let tmp2 = multiplicateNumberAndVector(-1 * j23, r[1]);

	r[2] = sumLotsVectors(a[2], tmp1, tmp2);

	console.log(r[2]);
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

export function sumLotsVectors(...vectors) {
	let result = [0, 0, 0];
	console.log(vectors.length);
	for (let i = 0; i < vectors.length; i++) {
		for (let j = 0; j < vectors[i].length; j++) {
			result[j] += vectors[i][j];
		}
	}

	return result;
}

function transMatrix(matrix) {
	let m = matrix.length, n = matrix[0].length, AT = [];
	for (let i = 0; i < n; i++) {
		AT[i] = [];
		for (let j = 0; j < m; j++) AT[i][j] = matrix[j][i];
	}
	return AT;
}

function determinant(A) {
	let N = A.length, B = [], denom = 1, exchanges = 0;

	for (let i = 0; i < N; ++i) {
		B[i] = [];
		for (let j = 0; j < N; ++j) {
			B[i][j] = A[i][j]
		};
	}

	for (let i = 0; i < N - 1; ++i) {
		let maxN = i, maxValue = Math.abs(B[i][i]);

		for (let j = i + 1; j < N; ++j) {
			let value = Math.abs(B[j][i]);
			if (value > maxValue) {
				maxN = j; maxValue = value;
			}
		}

		if (maxN > i) {
			let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
			exchanges += 1;
		} else {
			if (maxValue == 0) {
				return maxValue;
			}
		}

		let value1 = B[i][i];

		for (let j = i + 1; j < N; ++j) {
			let value2 = B[j][i];
			B[j][i] = 0;

			for (let k = i + 1; k < N; ++k) {
				B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
			}
		}
		denom = value1;
	}

	if (exchanges % 2) {
		return -B[N - 1][N - 1];
	}

	return B[N - 1][N - 1];
}
