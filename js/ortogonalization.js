export function calc(matrix) {
	let r = [];
	let a = [];
	let b = [];

	for (let i = 0; i < matrix.length; i++) {
		r.push([]);
		a.push([]);
	}

	for (let i = 0; i < matrix.length; i++) {
		r[0].push(matrix[i][0]);
		b.push(matrix[i].pop());
	}

	console.log('Matrix:');
	console.log(matrix);
	a = transMatrix(matrix);
	const T = getUnitMatrix(r.length);

	for (let i = 1; i < r[0].length; i++) {
		let tmpValues = [];

		for (let j = i - 1; j >= 0; j--) {
			T[j][i] = calculateLambda(a[i], r[j]);
			tmpValues.push(multiplicateNumberAndVector(-1 * T[j][i], r[j]));
		}

		r[i] = sumVectorWithVectorsArr(a[i], tmpValues);
	}

	const Tinvers = inverseMatrix(T);
	let Rtrans = [];
	let R = [];
	for (let i = 0; i < matrix.length; i++) {
		Rtrans.push(r[i]);
	}
	R = transMatrix(Rtrans);

	const D = multiplyMatrix(Rtrans, R);
	const DInvers = inverseMatrix(D);

	const betta = multiplyMatrixAndVector(Rtrans, b);
	const TD = multiplyMatrix(Tinvers, DInvers);
	const result = multiplyMatrixAndVector(TD, betta);
	console.log('Result:');
	console.log(result);
}

function getUnitMatrix(n) {
	const matrix = [];
	for (let i = 0; i < n; i++) {
		matrix.push([]);
		for (let j = 0; j < n; j++) {
			matrix[i][j] = 0;
		}
	}

	for (let i = 0; i < n; i++) {
		matrix[i][i] = 1;
	}

	return matrix;
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

function sumVectorWithVectorsArr(vector, vectorsArr) {
	let result = [];

	for (let i = 0; i < vector.length; i++) {
		result.push(0);
	}

	for (let i = 0; i < vectorsArr.length; i++) {
		for (let j = 0; j < vectorsArr[i].length; j++) {
			result[j] += vectorsArr[i][j];
		}
	}

	return sumVectors(vector, result);
}

function sumVectors(v1, v2) {
	let result = v1.map((el, ind) => {
		return el += v2[ind];
	}, 0);

	return result;
}

export function sumLotsVectors(...vectors) {
	let result = [];

	for (let i = 0; i < vectors[0].length; i++) {
		result.push(0);
	}

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

function adjugateMatrix(A) {
	const N = A.length, adjA = [];

	for (let i = 0; i < N; i++) {
		adjA[i] = []

		for (let j = 0; j < N; j++) {
			const B = [];
			const sign = ((i + j) % 2 == 0) ? 1 : -1;

			for (let k = 0; k < j; k++) {
				B[k] = [];

				for (let m = 0; m < i; m++) {
					B[k][m] = A[k][m];
				}

				for (let n = i + 1; n < N; n++) {
					B[k][n - 1] = A[k][n];
				}
			}

			for (let k = j + 1; k < N; k++) {
				B[k - 1] = [];

				for (let m = 0; m < i; m++) {
					B[k - 1][m] = A[k][m];
				}

				for (let m = i + 1; m < N; m++) {
					B[k - 1][m - 1] = A[k][m];
				}
			}
			adjA[i][j] = sign * determinant(B);
		}
	}

	return adjA;
}

function inverseMatrix(A) {
	const det = determinant(A);
	if (det == 0) {
		return false;
	}
	let N = A.length;
	const B = adjugateMatrix(A);
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			B[i][j] /= det;
		}
	}
	return B;
}

function multiplyMatrix(A, B) {
	let rowsA = A.length;
	let colsA = A[0].length;
	let rowsB = B.length;
	let colsB = B[0].length;
	let C = [];
	if (colsA != rowsB) {
		return false;
	}
	for (let i = 0; i < rowsA; i++) {
		C[i] = [];
	}
	for (let k = 0; k < colsB; k++) {
		for (let i = 0; i < rowsA; i++) {
			let t = 0;
			for (let j = 0; j < rowsB; j++) {
				t += A[i][j] * B[j][k];
			}
			C[i][k] = t;
		}
	}
	return C;
}

function multiplyMatrixAndVector(A, B) {
	let C = [];

	for (let i = 0; i < B.length; i++) {
		C[i] = 0;
	}

	for (let i = 0; i < A.length; i++) {
		let res = 0;
		for (let j = 0; j < A.length; j++) {
			res += A[i][j] * B[j];
		}
		C[i] = res;
	}

	return C;
}
