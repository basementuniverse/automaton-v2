/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@basementuniverse/commonjs/common.js":
/*!***********************************************************!*\
  !*** ./node_modules/@basementuniverse/commonjs/common.js ***!
  \***********************************************************/
/***/ ((module) => {

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 * @version 1.2.9
 */

/** @class Math */

/**
 * Check if two numbers are approximately equal
 * @param {number} a Number a
 * @param {number} b Number b
 * @param {number} [p=Number.EPSILON] The precision value
 * @return {boolean} True if numbers a and b are approximately equal
 */
Math.floatEquals = (a, b, p = Number.EPSILON) => Math.abs(a - b) < p;

/**
 * Clamp a number between min and max
 * @param {number} a The number to clamp
 * @param {number} [min=0] The minimum value
 * @param {number} [max=1] The maximum value
 * @return {number} A clamped number
 */
Math.clamp = (a, min = 0, max = 1) => a < min ? min : (a > max ? max : a);

/**
 * Get the fractional part of a number
 * @param {number} a The number from which to get the fractional part
 * @return {number} The fractional part of the number
 */
Math.frac = a => a >= 0 ? a - Math.floor(a) : a - Math.ceil(a);

/**
 * Do a linear interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} An interpolated value in the interval [a, b]
 */
Math.lerp = (a, b, i) => a + (b - a) * i;

/**
 * Get the position of i between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolated value in the interval [a, b]
 * @return {number} The position of i between a and b
 */
Math.unlerp = (a, b, i) => (i - a) / (b - a);

/**
 * Do a bilinear interpolation
 * @param {number} c00 Top-left value
 * @param {number} c10 Top-right value
 * @param {number} c01 Bottom-left value
 * @param {number} c11 Bottom-right value
 * @param {number} ix Interpolation value along x
 * @param {number} iy Interpolation value along y
 * @return {number} A bilinear interpolated value
 */
Math.blerp = (c00, c10, c01, c11, ix, iy) => Math.lerp(Math.lerp(c00, c10, ix), Math.lerp(c01, c11, ix), iy);

/**
 * Re-map a number i from range a1...a2 to b1...b2
 * @param {number} i The number to re-map
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
Math.remap = (i, a1, a2, b1, b2) => b1 + (i - a1) * (b2 - b1) / (a2 - a1);

/**
 * Do a smooth interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value
 * @return {number} An interpolated value in the interval [a, b]
 */
Math.smoothstep = (a, b, i) => Math.lerp(a, b, 3 * Math.pow(i, 2) - 2 * Math.pow(i, 3));

/**
 * Get an angle in radians
 * @param {number} degrees The angle in degrees
 * @return {number} The angle in radians
 */
Math.radians = degrees => (Math.PI / 180) * degrees;

/**
 * Get an angle in degrees
 * @param {number} radians The angle in radians
 * @return {number} The angle in degrees
 */
Math.degrees = radians => (180 / Math.PI) * radians;

/**
 * Get a random float in the interval [min, max)
 * @param {number} min Inclusive min
 * @param {number} max Exclusive max
 * @return {number} A random float in the interval [min, max)
 */
Math.randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Get a random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A random integer in the interval [min, max]
 */
Math.randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get a normally-distributed random number
 * @param {number} [mu=0.5] The mean value
 * @param {number} [sigma=0.5] The standard deviation
 * @param {number} [samples=2] The number of samples
 * @return {number} A normally-distributed random number
 */
Math.cltRandom = (mu = 0.5, sigma = 0.5, samples = 2) => {
  let total = 0;
  for (let i = samples; i--;) {
    total += Math.random();
  }
  return mu + (total - samples / 2) / (samples / 2) * sigma;
};

/**
 * Get a normally-distributed random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A normally-distributed random integer
 */
Math.cltRandomInt = (min, max) => Math.floor(min + Math.cltRandom(0.5, 0.5, 2) * (max + 1 - min));

/**
 * Return a weighted random integer
 * @param {Array<number>} w An array of weights
 * @return {number} An index from w
 */
Math.weightedRandom = w => {
  let total = w.reduce((a, i) => a + i, 0), n = 0;
  const r = Math.random() * total;
  while (total > r) {
    total -= w[n++];
  }
  return n - 1;
};

/**
 * An interpolation function
 * @callback interpolationCallback
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} The interpolated value in the interval [a, b]
 */

/**
 * Return an interpolated value from an array
 * @param {Array<number>} a An array of values interpolate
 * @param {number} i A number in the interval [0, 1]
 * @param {interpolationCallback} [f=Math.lerp] The interpolation function to use
 * @return {number} An interpolated value in the interval [min(a), max(a)]
 */
Math.lerpArray = (a, i, f = Math.lerp) => {
  const s = i * (a.length - 1);
  const p = Math.clamp(Math.trunc(s), 0, a.length - 1);
  return f(a[p] || 0, a[p + 1] || 0, Math.frac(s));
};

/**
 * Get the dot product of two vectors
 * @param {Array<number>} a Vector a
 * @param {Array<number>} b Vector b
 * @return {number} a ∙ b
 */
Math.dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);

/**
 * Get the factorial of a number
 * @param {number} a
 * @return {number} a!
 */
Math.factorial = a => {
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
};

/**
 * Get the number of permutations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nPr
 */
Math.permutation = (n, r) => Math.factorial(n) / Math.factorial(n - r);

/**
 * Get the number of combinations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nCr
 */
Math.combination = (n, r) => Math.factorial(n) / (Math.factorial(r) * Math.factorial(n - r));

/** @class Array */

/**
 * A function for generating array values
 * @callback timesCallback
 * @param {number} i The array index
 * @return {*} The array value
 */

/**
 * Return a new array with length n by calling function f(i) on each element
 * @param {timesCallback} f
 * @param {number} n The size of the array
 * @return {Array<*>}
 */
Array.times = (f, n) => Array(n).fill(0).map((_, i) => f(i));

/**
 * Return an array containing numbers 0->(n - 1)
 * @param {number} n The size of the array
 * @return {Array<number>} An array of integers 0->(n - 1)
 */
Array.range = n => Array.times(i => i, n);

/**
 * Zip 2 arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]
 * @param {Array<*>} a
 * @param {Array<*>} b
 * @return {Array<Array<*>>}
 */
Array.zip = (a, b) => a.map((k, i) => [k, b[i]]);

/**
 * Return array[i] with positive and negative wrapping
 * @name at
 * @function
 * @memberof Array.prototype
 * @param {number} i The positively/negatively wrapped array index
 * @return {*} An element from the array
 */
Object.defineProperty(Array.prototype, 'at', {
  value: function (i) {
    const l = this.length;
    return this[i < 0 ? l - (Math.abs(i + 1) % l) - 1 : i % l];
  }
});

/**
 * Chop an array into chunks of size n
 * @name chunk
 * @function
 * @memberof Array.prototype
 * @param {number} n The chunk size
 * @return {Array<Array<*>>} An array of array chunks
 */
Object.defineProperty(Array.prototype, 'chunk', {
  value: function (n) {
    return Array.times(i => this.slice(i * n, i * n + n), Math.ceil(this.length / n));
  }
});

/**
 * Randomly shuffle an array in-place
 * @name shuffle
 * @function
 * @memberof Array.prototype
 * @return {Array<*>} The shuffled array
 */
Object.defineProperty(Array.prototype, 'shuffle', {
  value: function () {
    return this.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
  }
});

/**
 * A 2d vector
 * @typedef {Object} vec
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 */

/**
 * Create a new vector
 * @param {number|vec} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector
 * @return {vec} A new vector
 * @example <caption>Various ways to initialise a vector</caption>
 * let a = vec(3, 2);  // (3, 2)
 * let b = vec(4);     // (4, 4)
 * let c = vec(a);     // (3, 2)
 * let d = vec();      // (0, 0)
 */
const vec = (x, y) => (!x && !y ?
  { x: 0, y: 0 } : (typeof x === 'object' ?
    { x: x.x || 0, y: x.y || 0 } : (y === null || y === undefined ?
      { x: x, y: x } : { x: x, y: y })
  )
);

/**
 * Get the components of a vector as an array
 * @param {vec} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec.components = a => [a.x, a.y];

/**
 * Return a unit vector (1, 0)
 * @return {vec} A unit vector (1, 0)
 */
vec.ux = () => vec(1, 0);

/**
 * Return a unit vector (0, 1)
 * @return {vec} A unit vector (0, 1)
 */
vec.uy = () => vec(0, 1);

/**
 * Add vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a + b
 */
vec.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

/**
 * Scale a vector
 * @param {vec} a Vector a
 * @param {number} b Scalar b
 * @return {vec} a * b
 */
vec.mul = (a, b) => ({ x: a.x * b, y: a.y * b });

/**
 * Subtract vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a - b
 */
vec.sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * Get the length of a vector
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.len = a => Math.sqrt(a.x * a.x + a.y * a.y);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.manhattan = a => Math.abs(a.x) + Math.abs(a.y);

/**
 * Normalise a vector
 * @param {vec} a The vector to normalise
 * @return {vec} ^a
 */
vec.nor = a => {
  let len = vec.len(a);
  return len ? { x: a.x / len, y: a.y / len } : vec();
};

/**
 * Get a dot product of vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {number} a ∙ b
 */
vec.dot = (a, b) => a.x * b.x + a.y * b.y;

/**
 * Rotate a vector by r radians
 * @param {vec} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec} A rotated vector
 */
vec.rot = (a, r) => {
  let s = Math.sin(r),
    c = Math.cos(r);
  return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
}

/**
 * Check if two vectors are equal
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec.eq = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Get the angle of a vector
 * @param {vec} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec.rad = a => Math.atan2(a.y, a.x);

/**
 * Copy a vector
 * @param {vec} a The vector to copy
 * @return {vec} A copy of vector a
 */
vec.cpy = a => vec(a);

/**
 * A function to call on each component of a vector
 * @callback vectorMapCallback
 * @param {number} value The component value
 * @param {'x' | 'y'} label The component label (x or y)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec} a Vector a
 * @param {vectorMapCallback} f The function to call on each component of the vector
 * @return {vec} Vector a mapped through f
 */
vec.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y') });

/**
 * Convert a vector into a string
 * @param {vec} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec.str = (a, s = ', ') => `${a.x}${s}${a.y}`;

/**
 * A matrix
 * @typedef {Object} mat
 * @property {number} m The number of rows in the matrix
 * @property {number} n The number of columns in the matrix
 * @property {Array<number>} entries The matrix values
 */

/**
 * Create a new matrix
 * @param {number} [m=4] The number of rows
 * @param {number} [n=4] The number of columns
 * @param {Array<number>} [entries=[]] Matrix values in reading order
 * @return {mat} A new matrix
 */
const mat = (m = 4, n = 4, entries = []) => ({
  m, n,
  entries: entries.concat(Array(m * n).fill(0)).slice(0, m * n)
});

/**
 * Get an identity matrix of size n
 * @param {number} n The size of the matrix
 * @return {mat} An identity matrix
 */
mat.identity = n => mat(n, n, Array(n * n).fill(0).map((v, i) => +(Math.floor(i / n) === i % n)));

/**
 * Get an entry from a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {number} The value at position (i, j) in matrix a
 */
mat.get = (a, i, j) => a.entries[(j - 1) + (i - 1) * a.n];

/**
 * Set an entry of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @param {number} v The value to set in matrix a
 */
mat.set = (a, i, j, v) => { a.entries[(j - 1) + (i - 1) * a.n] = v; };

/**
 * Get a row from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} m The row offset
 * @return {Array<number>} Row m from matrix a
 */
mat.row = (a, m) => {
  const s = (m - 1) * a.n;
  return a.entries.slice(s, s + a.n);
};

/**
 * Get a column from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} n The column offset
 * @return {Array<number>} Column n from matrix a
 */
mat.col = (a, n) => Array.times(i => mat.get(a, (i + 1), n), a.m);

/**
 * Add matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a + b
 */
mat.add = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v + b.entries[i]);

/**
 * Subtract matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a - b
 */
mat.sub = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v - b.entries[i]);

/**
 * Multiply matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat|boolean} ab or false if the matrices cannot be multiplied
 */
mat.mul = (a, b) => {
  if (a.n !== b.m) { return false; }
  const result = mat(a.m, b.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= b.n; j++) {
      mat.set(result, i, j, Math.dot(mat.row(a, i), mat.col(b, j)));
    }
  }
  return result;
};

/**
 * Scale a matrix
 * @param {mat} a Matrix a
 * @param {number} b Scalar b
 * @return {mat} a * b
 */
mat.scale = (a, b) => mat.map(a, v => v * b);

/**
 * Transpose a matrix
 * @param {mat} a The matrix to transpose
 * @return {mat} A transposed matrix
 */
mat.trans = a => mat(a.n, a.m, Array.times(i => mat.col(a, (i + 1)), a.n).flat());

/**
 * Get the minor of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {mat|boolean} The (i, j) minor of matrix a or false if the matrix is not square
 */
mat.minor = (a, i, j) => {
  if (a.m !== a.n) { return false; }
  const entries = [];
  for (let ii = 1; ii <= a.m; ii++) {
    if (ii === i) { continue; }
    for (let jj = 1; jj <= a.n; jj++) {
      if (jj === j) { continue; }
      entries.push(mat.get(a, ii, jj));
    }
  }
  return mat(a.m - 1, a.n - 1, entries);
};

/**
 * Get the determinant of a matrix
 * @param {mat} a Matrix a
 * @return {number|boolean} |a| or false if the matrix is not square
 */
mat.det = a => {
  if (a.m !== a.n) { return false; }
  if (a.m === 1) {
    return a.entries[0];
  }
  if (a.m === 2) {
    return a.entries[0] * a.entries[3] - a.entries[1] * a.entries[2];
  }
  let total = 0, sign = 1;
  for (let j = 1; j <= a.n; j++) {
    total += sign * a.entries[j - 1] * mat.det(mat.minor(a, 1, j));
    sign *= -1;
  }
  return total;
};

/**
 * Normalise a matrix
 * @param {mat} a The matrix to normalise
 * @return {mat|boolean} ^a or false if the matrix is not square
 */
mat.nor = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  return mat.map(a, i => i * d);
};

/**
 * Get the adjugate of a matrix
 * @param {mat} a The matrix from which to get the adjugate
 * @return {mat} The adjugate of a
 */
mat.adj = a => {
  const minors = mat(a.m, a.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= a.n; j++) {
      mat.set(minors, i, j, mat.det(mat.minor(a, i, j)));
    }
  }
  const cofactors = mat.map(minors, (v, i) => v * (i % 2 ? -1 : 1));
  return mat.trans(cofactors);
};

/**
 * Get the inverse of a matrix
 * @param {mat} a The matrix to invert
 * @return {mat|boolean} a^-1 or false if the matrix has no inverse
 */
mat.inv = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  if (d === 0) { return false; }
  return mat.scale(mat.adj(a), 1 / d);
};

/**
 * Check if two matrices are equal
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {boolean} True if matrices a and b are identical, false otherwise
 */
mat.eq = (a, b) => a.m === b.m && a.n === b.n && mat.str(a) === mat.str(b);

/**
 * Copy a matrix
 * @param {mat} a The matrix to copy
 * @return {mat} A copy of matrix a
 */
mat.cpy = a => mat(a.m, a.n, [...a.entries]);

/**
 * A function to call on each entry of a matrix
 * @callback matrixMapCallback
 * @param {number} value The entry value
 * @param {number} index The entry index
 * @param {Array<number>} entries The array of matrix entries
 * @return {number} The mapped entry
 */

/**
 * Call a function on each entry of a matrix and build a new matrix from the results
 * @param {mat} a Matrix a
 * @param {matrixMapCallback} f The function to call on each entry of the matrix
 * @return {mat} Matrix a mapped through f
 */
mat.map = (a, f) => mat(a.m, a.n, a.entries.map(f));

/**
 * Convert a matrix into a string
 * @param {mat} a The matrix to convert
 * @param {string} [ms=', '] The separator string for columns
 * @param {string} [ns='\n'] The separator string for rows
 * @return {string} A string representation of the matrix
 */
mat.str = (a, ms = ', ', ns = '\n') => a.entries.chunk(a.n).map(r => r.join(ms)).join(ns);

if (true) {
  module.exports = { vec, mat };
}


/***/ }),

/***/ "./node_modules/ajv/dist/ajv.js":
/*!**************************************!*\
  !*** ./node_modules/ajv/dist/ajv.js ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const draft7MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-07.json */ "./node_modules/ajv/dist/refs/json-schema-draft-07.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
//# sourceMappingURL=ajv.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/code.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/code.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
const scope_1 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
var code_2 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return code_2._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return code_2.str; } }));
Object.defineProperty(exports, "strConcat", ({ enumerable: true, get: function () { return code_2.strConcat; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return code_2.nil; } }));
Object.defineProperty(exports, "getProperty", ({ enumerable: true, get: function () { return code_2.getProperty; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return code_2.stringify; } }));
Object.defineProperty(exports, "regexpCode", ({ enumerable: true, get: function () { return code_2.regexpCode; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return code_2.Name; } }));
var scope_2 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return scope_2.Scope; } }));
Object.defineProperty(exports, "ValueScope", ({ enumerable: true, get: function () { return scope_2.ValueScope; } }));
Object.defineProperty(exports, "ValueScopeName", ({ enumerable: true, get: function () { return scope_2.ValueScopeName; } }));
Object.defineProperty(exports, "varKinds", ({ enumerable: true, get: function () { return scope_2.varKinds; } }));
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/scope.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/scope.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/errors.js":
/*!*************************************************!*\
  !*** ./node_modules/ajv/dist/compile/errors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/index.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const validation_error_1 = __webpack_require__(/*! ../runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const validate_1 = __webpack_require__(/*! ./validate */ "./node_modules/ajv/dist/compile/validate/index.js");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/names.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/names.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports["default"] = names;
//# sourceMappingURL=names.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/ref_error.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/compile/ref_error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports["default"] = MissingRefError;
//# sourceMappingURL=ref_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/resolve.js":
/*!**************************************************!*\
  !*** ./node_modules/ajv/dist/compile/resolve.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
const traverse = __webpack_require__(/*! json-schema-traverse */ "./node_modules/json-schema-traverse/index.js");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(resolver, id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/rules.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/rules.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/util.js":
/*!***********************************************!*\
  !*** ./node_modules/ajv/dist/compile/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const code_1 = __webpack_require__(/*! ./codegen/code */ "./node_modules/ajv/dist/compile/codegen/code.js");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/applicability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/applicability.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/boolSchema.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/boolSchema.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}
//# sourceMappingURL=boolSchema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/dataType.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/dataType.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __webpack_require__(/*! ../rules */ "./node_modules/ajv/dist/compile/rules.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}
//# sourceMappingURL=dataType.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/defaults.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignDefaults = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __webpack_require__(/*! ./boolSchema */ "./node_modules/ajv/dist/compile/validate/boolSchema.js");
const dataType_1 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const dataType_2 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/ajv/dist/compile/validate/defaults.js");
const keyword_1 = __webpack_require__(/*! ./keyword */ "./node_modules/ajv/dist/compile/validate/keyword.js");
const subschema_1 = __webpack_require__(/*! ./subschema */ "./node_modules/ajv/dist/compile/validate/subschema.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ../resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/keyword.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/keyword.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const code_1 = __webpack_require__(/*! ../../vocabularies/code */ "./node_modules/ajv/dist/vocabularies/code.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/subschema.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/subschema.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/core.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/core.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
const validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const rules_1 = __webpack_require__(/*! ./compile/rules */ "./node_modules/ajv/dist/compile/rules.js");
const compile_1 = __webpack_require__(/*! ./compile */ "./node_modules/ajv/dist/compile/index.js");
const codegen_2 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const resolve_1 = __webpack_require__(/*! ./compile/resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const dataType_1 = __webpack_require__(/*! ./compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const util_1 = __webpack_require__(/*! ./compile/util */ "./node_modules/ajv/dist/compile/util.js");
const $dataRefSchema = __webpack_require__(/*! ./refs/data.json */ "./node_modules/ajv/dist/refs/data.json");
const uri_1 = __webpack_require__(/*! ./runtime/uri */ "./node_modules/ajv/dist/runtime/uri.js");
const defaultRegExp = (str, flags) => new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports["default"] = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/equal.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/equal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/ajv-validator/ajv/issues/889
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports["default"] = equal;
//# sourceMappingURL=equal.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/ucs2length.js":
/*!*****************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/ucs2length.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports["default"] = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/uri.js":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/runtime/uri.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const uri = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports["default"] = uri;
//# sourceMappingURL=uri.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/validation_error.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/validation_error.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports["default"] = ValidationError;
//# sourceMappingURL=validation_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAdditionalItems = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports["default"] = def;
//# sourceMappingURL=additionalItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=additionalProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/allOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports["default"] = def;
//# sourceMappingURL=allOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/anyOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports["default"] = def;
//# sourceMappingURL=anyOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/contains.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/contains.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined)
                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
        }
        else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=contains.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependencies.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports["default"] = def;
//# sourceMappingURL=dependencies.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/if.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/if.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports["default"] = def;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const prefixItems_1 = __webpack_require__(/*! ./prefixItems */ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js");
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const items2020_1 = __webpack_require__(/*! ./items2020 */ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js");
const contains_1 = __webpack_require__(/*! ./contains */ "./node_modules/ajv/dist/vocabularies/applicator/contains.js");
const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const propertyNames_1 = __webpack_require__(/*! ./propertyNames */ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const properties_1 = __webpack_require__(/*! ./properties */ "./node_modules/ajv/dist/vocabularies/applicator/properties.js");
const patternProperties_1 = __webpack_require__(/*! ./patternProperties */ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js");
const not_1 = __webpack_require__(/*! ./not */ "./node_modules/ajv/dist/vocabularies/applicator/not.js");
const anyOf_1 = __webpack_require__(/*! ./anyOf */ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js");
const oneOf_1 = __webpack_require__(/*! ./oneOf */ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js");
const allOf_1 = __webpack_require__(/*! ./allOf */ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js");
const if_1 = __webpack_require__(/*! ./if */ "./node_modules/ajv/dist/vocabularies/applicator/if.js");
const thenElse_1 = __webpack_require__(/*! ./thenElse */ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports["default"] = getApplicator;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateTuple = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports["default"] = def;
//# sourceMappingURL=items.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items2020.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports["default"] = def;
//# sourceMappingURL=items2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/not.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/not.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports["default"] = def;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/oneOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=oneOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const util_2 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=patternProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports["default"] = def;
//# sourceMappingURL=prefixItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/properties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/properties.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_1 = __webpack_require__(/*! ../../compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js":
/*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports["default"] = def;
//# sourceMappingURL=propertyNames.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/thenElse.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports["default"] = def;
//# sourceMappingURL=thenElse.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/code.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/code.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __webpack_require__(/*! ../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_2 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._) `new RegExp`;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/id.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/id.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports["default"] = def;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const id_1 = __webpack_require__(/*! ./id */ "./node_modules/ajv/dist/vocabularies/core/id.js");
const ref_1 = __webpack_require__(/*! ./ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports["default"] = core;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/ref.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/ref.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __webpack_require__(/*! ../../compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports["default"] = def;
//# sourceMappingURL=ref.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const types_1 = __webpack_require__(/*! ../discriminator/types */ "./node_modules/ajv/dist/vocabularies/discriminator/types.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                    if (sch instanceof compile_1.SchemaEnv)
                        sch = sch.schema;
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/draft7.js":
/*!******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft7.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports["default"] = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/format.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/format.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/index.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/format.js");
const format = [format_1.default];
exports["default"] = format;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/metadata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/const.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/const.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=const.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/enum.js":
/*!***************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/enum.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js");
const multipleOf_1 = __webpack_require__(/*! ./multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
const limitLength_1 = __webpack_require__(/*! ./limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
const pattern_1 = __webpack_require__(/*! ./pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
const limitProperties_1 = __webpack_require__(/*! ./limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
const required_1 = __webpack_require__(/*! ./required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
const limitItems_1 = __webpack_require__(/*! ./limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
const uniqueItems_1 = __webpack_require__(/*! ./uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
const const_1 = __webpack_require__(/*! ./const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
const enum_1 = __webpack_require__(/*! ./enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports["default"] = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitItems.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitLength.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const ucs2length_1 = __webpack_require__(/*! ../../runtime/ucs2length */ "./node_modules/ajv/dist/runtime/ucs2length.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitLength.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitNumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitProperties.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/multipleOf.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports["default"] = def;
//# sourceMappingURL=multipleOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/pattern.js":
/*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/pattern.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=pattern.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/required.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/required.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=required.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dataType_1 = __webpack_require__(/*! ../../compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=uniqueItems.js.map

/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/json-schema-traverse/index.js":
/*!****************************************************!*\
  !*** ./node_modules/json-schema-traverse/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


/***/ }),

/***/ "./src/Debug.ts":
/*!**********************!*\
  !*** ./src/Debug.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
class Debug {
    constructor(options = {}) {
        this.defaultOptions = {
            margin: 10,
            padding: 4,
            font: '10pt Lucida Console, monospace',
            lineHeight: 12,
            foregroundColour: '#fff',
            backgroundColour: '#3338',
            defaultValue: {
                align: 'left',
                showLabel: true,
            },
            defaultMarker: {
                showLabel: true,
                showValue: true,
                showMarker: true,
                markerSize: 6,
                markerStyle: 'x',
                markerColour: '#ccc',
                space: 'world',
                labelOffset: (0, commonjs_1.vec)(10),
            },
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.values = new Map();
        this.markers = new Map();
    }
    static initialise(options = {}) {
        Debug.instance = new Debug(options);
    }
    static getInstance() {
        if (Debug.instance == null) {
            Debug.initialise();
        }
        return Debug.instance;
    }
    static value(label, value, options = {}) {
        const debug = Debug.getInstance();
        debug.values.set(label, Object.assign({ label, value }, debug.defaultOptions.defaultValue, options));
    }
    static marker(label, value, position, options = {}) {
        const debug = Debug.getInstance();
        debug.markers.set(label, Object.assign({ label, value, position }, debug.defaultOptions.defaultMarker, options));
    }
    static draw(context) {
        const debug = Debug.getInstance();
        context.save();
        debug.markers.forEach(marker => {
            if (marker.space === 'world') {
                debug.drawMarker(context, marker);
            }
        });
        context.restore();
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let position;
        let leftY = debug.options.margin;
        let rightY = debug.options.margin;
        const lineHeight = (debug.options.lineHeight + debug.options.padding * 2);
        debug.values.forEach(value => {
            var _a, _b, _c, _d;
            switch (value.align) {
                case 'left':
                    position = (0, commonjs_1.vec)(debug.options.margin, leftY);
                    leftY += lineHeight;
                    break;
                case 'right':
                    position = (0, commonjs_1.vec)(context.canvas.clientWidth - debug.options.margin, rightY);
                    rightY += lineHeight;
                    break;
            }
            debug.drawLabel(context, (value.showLabel ? `${value.label}: ` : '') + `${value.value}`, position, value.align, (_a = value.padding) !== null && _a !== void 0 ? _a : debug.options.padding, (_b = value.font) !== null && _b !== void 0 ? _b : debug.options.font, (_c = value.foregroundColour) !== null && _c !== void 0 ? _c : debug.options.foregroundColour, (_d = value.backgroundColour) !== null && _d !== void 0 ? _d : debug.options.backgroundColour);
        });
        debug.markers.forEach(marker => {
            if (marker.space === 'screen') {
                debug.drawMarker(context, marker);
            }
        });
        context.restore();
        debug.values.clear();
        debug.markers.clear();
    }
    drawMarker(context, marker) {
        var _a, _b, _c, _d, _e;
        context.save();
        const position = (_a = marker.position) !== null && _a !== void 0 ? _a : (0, commonjs_1.vec)();
        if (marker.showLabel || marker.showValue) {
            this.drawLabel(context, (marker.showLabel ? `${marker.label}: ` : '') + (marker.showValue ? `${marker.value}` : ''), commonjs_1.vec.add(position !== null && position !== void 0 ? position : (0, commonjs_1.vec)(), marker.labelOffset), 'left', (_b = marker.padding) !== null && _b !== void 0 ? _b : this.options.padding, (_c = marker.font) !== null && _c !== void 0 ? _c : this.options.font, (_d = marker.foregroundColour) !== null && _d !== void 0 ? _d : this.options.foregroundColour, (_e = marker.backgroundColour) !== null && _e !== void 0 ? _e : this.options.backgroundColour);
        }
        if (marker.showMarker) {
            context.lineWidth = 2;
            context.strokeStyle = context.fillStyle = marker.markerColour;
            switch (marker.markerStyle) {
                case 'x':
                    this.drawCross(context, position, marker.markerSize);
                    break;
                case '+':
                    this.drawPlus(context, position, marker.markerSize);
                    break;
                case '.':
                    this.drawDot(context, position, marker.markerSize);
                    break;
            }
        }
        context.restore();
    }
    drawLabel(context, text, position, align, padding, font, foregroundColour, backgroundColour) {
        context.save();
        context.font = font;
        context.textBaseline = 'top';
        const backgroundSize = {
            width: context.measureText(text).width + padding * 2,
            height: this.options.lineHeight + padding * 2,
        };
        const x = align === 'right' ? (position.x - backgroundSize.width) : position.x;
        context.fillStyle = backgroundColour;
        context.fillRect(x - padding, position.y - padding, backgroundSize.width, backgroundSize.height);
        context.fillStyle = foregroundColour;
        context.fillText(text, x, position.y);
        context.restore();
    }
    drawCross(context, position, size) {
        context.beginPath();
        const halfSize = size / 2;
        context.moveTo(position.x - halfSize, position.y - halfSize);
        context.lineTo(position.x + halfSize, position.y + halfSize);
        context.moveTo(position.x - halfSize, position.y + halfSize);
        context.lineTo(position.x + halfSize, position.y - halfSize);
        context.stroke();
    }
    drawPlus(context, position, size) {
        context.beginPath();
        const halfSize = size / 2;
        context.moveTo(position.x, position.y - halfSize);
        context.lineTo(position.x, position.y + halfSize);
        context.moveTo(position.x - halfSize, position.y);
        context.lineTo(position.x + halfSize, position.y);
        context.stroke();
    }
    drawDot(context, position, size) {
        context.beginPath();
        context.arc(position.x, position.y, size / 2, 0, Math.PI * 2);
        context.fill();
    }
}
exports["default"] = Debug;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const config = __webpack_require__(/*! ./config.json */ "./src/config.json");
const constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const Content_1 = __webpack_require__(/*! ./content/Content */ "./src/content/Content.ts");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./src/Debug.ts");
const Input_1 = __webpack_require__(/*! ./Input */ "./src/Input.ts");
class Game {
    constructor(container) {
        this.frameRate = 0;
        this.frameCount = 0;
        if (container === null) {
            throw new Error('A valid container element must be specified.');
        }
        if (container.tagName.toLowerCase() !== 'canvas') {
            throw new Error('Container element must be a canvas.');
        }
        this.canvas = container;
        const context = this.canvas.getContext('2d');
        if (context !== null) {
            this.context = context;
        }
        else {
            throw new Error("Couldn't get a 2d context.");
        }
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context.imageSmoothingEnabled = false;
    }
    initialise() {
        Debug_1.default.initialise();
        Input_1.default.initialise();
        Content_1.default.initialise();
        this.lastFrameTime = this.lastFrameCountTime = performance.now();
        this.loop();
    }
    loop() {
        const now = performance.now();
        const elapsedTime = Math.min(now - this.lastFrameTime, constants.FPS_MIN);
        if (now - this.lastFrameCountTime >= 1000) {
            this.lastFrameCountTime = now;
            this.frameRate = this.frameCount;
            this.frameCount = 0;
        }
        this.frameCount++;
        this.lastFrameTime = now;
        if (config.showFPS) {
            Debug_1.default.value('FPS', this.frameRate, { align: 'right' });
        }
        this.update(elapsedTime);
        this.draw();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        Game.screen = (0, commonjs_1.vec)(this.canvas.width, this.canvas.height);
        Input_1.default.update();
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        Debug_1.default.draw(this.context);
    }
}
exports["default"] = Game;


/***/ }),

/***/ "./src/Input.ts":
/*!**********************!*\
  !*** ./src/Input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
class Input {
    constructor() {
        this.keyboardState = {};
        this.previousKeyboardState = {};
        this.mouseState = { button: false, position: (0, commonjs_1.vec)(), wheel: 0 };
        this.previousMouseState = { button: false, position: (0, commonjs_1.vec)(), wheel: 0 };
        window.addEventListener('mousedown', () => {
            this.mouseState.button = true;
        });
        window.addEventListener('mouseup', () => {
            this.mouseState.button = false;
        });
        window.addEventListener('touchstart', () => {
            this.mouseState.button = true;
        });
        window.addEventListener('touchend', () => {
            this.mouseState.button = false;
        });
        window.addEventListener('mousemove', e => {
            this.mouseState.position.x = e.offsetX;
            this.mouseState.position.y = e.offsetY;
        });
        window.addEventListener('keydown', e => {
            this.keyboardState[e.code] = true;
        });
        window.addEventListener('keyup', e => {
            this.keyboardState[e.code] = false;
        });
        window.addEventListener('wheel', e => {
            this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
        });
    }
    static initialise() {
        Input.instance = new Input();
    }
    static getInstance() {
        if (Input.instance === undefined) {
            throw new Error('Input manager not properly initialised');
        }
        return Input.instance;
    }
    static update() {
        const instance = Input.getInstance();
        instance.previousKeyboardState = Object.assign({}, instance.keyboardState);
        instance.previousMouseState = {
            button: instance.mouseState.button,
            position: commonjs_1.vec.cpy(instance.mouseState.position),
            wheel: 0,
        };
    }
    static keyDown(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[key];
    }
    static keyPressed(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k] &&
                    (!(k in instance.previousKeyboardState) ||
                        !instance.previousKeyboardState[k])) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[key] && !instance.previousKeyboardState[key];
    }
    static keyReleased(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (!instance.keyboardState[k] &&
                    !!instance.previousKeyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !instance.keyboardState[key] && !!instance.previousKeyboardState[key];
    }
    static mouseDown() {
        const instance = Input.getInstance();
        return !!instance.mouseState.button;
    }
    static mousePressed() {
        const instance = Input.getInstance();
        return !!instance.mouseState.button && !instance.previousMouseState.button;
    }
    static mouseReleased() {
        const instance = Input.getInstance();
        return !instance.mouseState.button && !!instance.previousMouseState.button;
    }
    static mouseWheelUp() {
        const instance = Input.getInstance();
        return instance.mouseState.wheel > 0;
    }
    static mouseWheelDown() {
        const instance = Input.getInstance();
        return instance.mouseState.wheel < 0;
    }
    static mousePosition() {
        const instance = Input.getInstance();
        return instance.mouseState.position;
    }
}
exports["default"] = Input;


/***/ }),

/***/ "./src/actors/Actor.ts":
/*!*****************************!*\
  !*** ./src/actors/Actor.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorDataSchema = void 0;
const uuid = __webpack_require__(/*! uuid-random */ "./node_modules/uuid-random/index.js");
exports.ActorDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
    additionalProperties: false,
};
class Actor {
    constructor(id, name) {
        this.id = id !== null && id !== void 0 ? id : uuid();
        this.name = name;
    }
    serialize() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
exports["default"] = Actor;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FPS_MIN = exports.SIMULATE_SLOW_LOADING = exports.DEBUG = void 0;
exports.DEBUG = true;
exports.SIMULATE_SLOW_LOADING = true;
exports.FPS_MIN = 1 / 30;


/***/ }),

/***/ "./src/content/ActorDataLoader.ts":
/*!****************************************!*\
  !*** ./src/content/ActorDataLoader.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorDataLoader = void 0;
const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
const Actor_1 = __webpack_require__(/*! ../actors/Actor */ "./src/actors/Actor.ts");
const constants = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const JSONLoader_1 = __webpack_require__(/*! ./JSONLoader */ "./src/content/JSONLoader.ts");
const ActorDataLoader = async (url) => {
    const data = await (0, JSONLoader_1.JSONLoader)(url);
    const validate = new ajv_1.default().compile(Actor_1.ActorDataSchema);
    if (!validate(data)) {
        constants.DEBUG && console.log(validate.errors);
        throw new Error(`Invalid actor data: ${url}`);
    }
    return data;
};
exports.ActorDataLoader = ActorDataLoader;


/***/ }),

/***/ "./src/content/Content.ts":
/*!********************************!*\
  !*** ./src/content/Content.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
const _contentManifest = __webpack_require__(/*! ../../content/content.json */ "./content/content.json");
const constants = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const content_1 = __webpack_require__(/*! ../content */ "./src/content/index.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
const sleep_1 = __webpack_require__(/*! ../utilities/sleep */ "./src/utilities/sleep.ts");
const contentItemLoaders = {
    [enums_1.ContentItemType.Image]: content_1.ImageLoader,
    [enums_1.ContentItemType.Sound]: content_1.SoundLoader,
    [enums_1.ContentItemType.Font]: content_1.FontLoader,
    [enums_1.ContentItemType.ActorData]: content_1.ActorDataLoader,
};
class Content {
    constructor(content) {
        this.items = {};
        this.content = content;
    }
    static initialise() {
        const contentManifest = _contentManifest;
        const validate = new ajv_1.default().compile({
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                            },
                            type: {
                                type: 'string',
                                enum: Object.values(enums_1.ContentItemType),
                            },
                            args: {
                                type: 'array',
                                items: {
                                    type: ['string', 'object', 'array'],
                                },
                            },
                        },
                    },
                },
            },
            additionalProperties: false,
        });
        if (!validate(contentManifest)) {
            constants.DEBUG && console.log(validate.errors);
            throw new Error('Invalid content manifest');
        }
        Content.instance = new Content(contentManifest.items);
    }
    static getInstance() {
        if (Content.instance === undefined) {
            throw new Error('Content manager not properly initialised');
        }
        return Content.instance;
    }
    static async load() {
        if (Content.loaded) {
            throw new Error('Content already loaded');
        }
        const instance = Content.getInstance();
        if (instance.content.length === 0) {
            throw new Error('No content items to load');
        }
        const progressDelta = 1 / instance.content.length;
        for (const c of instance.content) {
            if (constants.DEBUG && constants.SIMULATE_SLOW_LOADING) {
                await (0, sleep_1.default)(Math.randomBetween(100, 1000));
            }
            instance.items[c.name] = await contentItemLoaders[c.type](...c.args);
            Content.progress = Math.clamp(Content.progress + progressDelta, 0, 1);
        }
        Content.loaded = true;
    }
    static get(name) {
        if (!Content.loaded) {
            throw new Error('Content not loaded');
        }
        const instance = Content.getInstance();
        if (!(name in instance.items)) {
            throw new Error(`Content item "${name}" not found`);
        }
        return instance.items[name];
    }
}
exports["default"] = Content;
Content.progress = 0;
Content.loaded = false;


/***/ }),

/***/ "./src/content/FontLoader.ts":
/*!***********************************!*\
  !*** ./src/content/FontLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontLoader = void 0;
const FontLoader = async (url, family) => {
    return new Promise((resolve, reject) => {
        const font = new FontFace(family, `url(${url})`);
        font.load()
            .then(font => {
            document.fonts.add(font);
            resolve(font);
        })
            .catch(() => {
            reject(`Error loading font "${url}"`);
        });
    });
};
exports.FontLoader = FontLoader;


/***/ }),

/***/ "./src/content/ImageLoader.ts":
/*!************************************!*\
  !*** ./src/content/ImageLoader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageLoader = void 0;
const ImageLoader = async (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', () => {
            reject(`Error loading image "${url}"`);
        });
    });
};
exports.ImageLoader = ImageLoader;


/***/ }),

/***/ "./src/content/JSONLoader.ts":
/*!***********************************!*\
  !*** ./src/content/JSONLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONLoader = void 0;
const JSONLoader = async (urlOrData) => {
    if (typeof urlOrData === 'string') {
        return new Promise((resolve, reject) => {
            window.fetch(urlOrData, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
                .then(response => {
                return response.json();
            })
                .then(json => {
                resolve(json);
            })
                .catch(() => {
                reject(`Error loading json "${urlOrData}"`);
            });
        });
    }
    return urlOrData;
};
exports.JSONLoader = JSONLoader;


/***/ }),

/***/ "./src/content/SoundLoader.ts":
/*!************************************!*\
  !*** ./src/content/SoundLoader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoundLoader = void 0;
const SoundLoader = async (url) => {
    return new Promise((resolve, reject) => {
        const sound = new Audio(url);
        sound.addEventListener('loadeddata', () => {
            resolve(sound);
        });
        sound.addEventListener('error', () => {
            reject(`Error loading sound "${url}"`);
        });
    });
};
exports.SoundLoader = SoundLoader;


/***/ }),

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoundLoader = exports.ImageLoader = exports.FontLoader = exports.ActorDataLoader = void 0;
var ActorDataLoader_1 = __webpack_require__(/*! ./ActorDataLoader */ "./src/content/ActorDataLoader.ts");
Object.defineProperty(exports, "ActorDataLoader", ({ enumerable: true, get: function () { return ActorDataLoader_1.ActorDataLoader; } }));
var FontLoader_1 = __webpack_require__(/*! ./FontLoader */ "./src/content/FontLoader.ts");
Object.defineProperty(exports, "FontLoader", ({ enumerable: true, get: function () { return FontLoader_1.FontLoader; } }));
var ImageLoader_1 = __webpack_require__(/*! ./ImageLoader */ "./src/content/ImageLoader.ts");
Object.defineProperty(exports, "ImageLoader", ({ enumerable: true, get: function () { return ImageLoader_1.ImageLoader; } }));
var SoundLoader_1 = __webpack_require__(/*! ./SoundLoader */ "./src/content/SoundLoader.ts");
Object.defineProperty(exports, "SoundLoader", ({ enumerable: true, get: function () { return SoundLoader_1.SoundLoader; } }));


/***/ }),

/***/ "./src/enums.ts":
/*!**********************!*\
  !*** ./src/enums.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Key = exports.ContentItemType = void 0;
var ContentItemType;
(function (ContentItemType) {
    ContentItemType["Image"] = "image";
    ContentItemType["Sound"] = "sound";
    ContentItemType["Font"] = "font";
    ContentItemType["ActorData"] = "actorData";
})(ContentItemType = exports.ContentItemType || (exports.ContentItemType = {}));
var Key;
(function (Key) {
    Key["Up"] = "ArrowUp";
    Key["Down"] = "ArrowDown";
    Key["Left"] = "ArrowLeft";
    Key["Right"] = "ArrowRight";
    Key["Space"] = "Space";
    Key["Enter"] = "Enter";
    Key["Shift"] = "Shift";
    Key["Control"] = "Control";
    Key["Escape"] = "Escape";
    Key["Digit0"] = "Digit0";
    Key["Digit1"] = "Digit1";
    Key["Digit2"] = "Digit2";
    Key["Digit3"] = "Digit3";
    Key["Digit4"] = "Digit4";
    Key["Digit5"] = "Digit5";
    Key["Digit6"] = "Digit6";
    Key["Digit7"] = "Digit7";
    Key["Digit8"] = "Digit8";
    Key["Digit9"] = "Digit9";
})(Key = exports.Key || (exports.Key = {}));


/***/ }),

/***/ "./src/utilities/sleep.ts":
/*!********************************!*\
  !*** ./src/utilities/sleep.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports["default"] = sleep;


/***/ }),

/***/ "./node_modules/uri-js/dist/es5/uri.all.js":
/*!*************************************************!*\
  !*** ./node_modules/uri-js/dist/es5/uri.all.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {

/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uri.all.js.map


/***/ }),

/***/ "./node_modules/uuid-random/index.js":
/*!*******************************************!*\
  !*** ./node_modules/uuid-random/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


(function(){

  var
    buf,
    bufIdx = 0,
    hexBytes = [],
    i
  ;

  // Pre-calculate toString(16) for speed
  for (i = 0; i < 256; i++) {
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
  }

  // Buffer random numbers for speed
  // Reduce memory usage by decreasing this number (min 16)
  // or improve speed by increasing this number (try 16384)
  uuid.BUFFER_SIZE = 4096;

  // Binary uuids
  uuid.bin = uuidBin;

  // Clear buffer
  uuid.clearBuffer = function() {
    buf = null;
    bufIdx = 0;
  };

  // Test for uuid
  uuid.test = function(uuid) {
    if (typeof uuid === 'string') {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    }
    return false;
  };

  // Node & Browser support
  var crypt0;
  if (typeof crypto !== 'undefined') {
    crypt0 = crypto;
  } else if( (typeof window !== 'undefined') && (typeof window.msCrypto !== 'undefined')) {
    crypt0 = window.msCrypto; // IE11
  }

  if (true) {
    crypt0 = crypt0 || __webpack_require__(/*! crypto */ "?779a");
    module.exports = uuid;
  } else {}

  // Use best available PRNG
  // Also expose this so you can override it.
  uuid.randomBytes = (function(){
    if (crypt0) {
      if (crypt0.randomBytes) {
        return crypt0.randomBytes;
      }
      if (crypt0.getRandomValues) {
        if (typeof Uint8Array.prototype.slice !== 'function') {
          return function(n) {
            var bytes = new Uint8Array(n);
            crypt0.getRandomValues(bytes);
            return Array.from(bytes);
          };
        }
        return function(n) {
          var bytes = new Uint8Array(n);
          crypt0.getRandomValues(bytes);
          return bytes;
        };
      }
    }
    return function(n) {
      var i, r = [];
      for (i = 0; i < n; i++) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    };
  })();

  // Buffer some random bytes for speed
  function randomBytesBuffered(n) {
    if (!buf || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
      bufIdx = 0;
      buf = uuid.randomBytes(uuid.BUFFER_SIZE);
    }
    return buf.slice(bufIdx, bufIdx += n);
  }

  // uuid.bin
  function uuidBin() {
    var b = randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var b = uuidBin();
    return hexBytes[b[0]] + hexBytes[b[1]] +
      hexBytes[b[2]] + hexBytes[b[3]] + '-' +
      hexBytes[b[4]] + hexBytes[b[5]] + '-' +
      hexBytes[b[6]] + hexBytes[b[7]] + '-' +
      hexBytes[b[8]] + hexBytes[b[9]] + '-' +
      hexBytes[b[10]] + hexBytes[b[11]] +
      hexBytes[b[12]] + hexBytes[b[13]] +
      hexBytes[b[14]] + hexBytes[b[15]]
    ;
  }

})();


/***/ }),

/***/ "?779a":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./content/content.json":
/*!******************************!*\
  !*** ./content/content.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"items":[{"name":"testActor","type":"actorData","args":["content/json/testActor.json"]}]}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/data.json":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/refs/data.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$id":"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON AnySchema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-draft-07.json":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-draft-07.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');

/***/ }),

/***/ "./src/config.json":
/*!*************************!*\
  !*** ./src/config.json ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"title":"Automaton V2","showFPS":true}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
window.onload = () => {
    const game = new Game_1.default(document.querySelector('#game'));
    game.initialise();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxTQUFTLEtBQUssV0FBVztBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFFBQVEsUUFBUSxHQUFHLFFBQVEsWUFBWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0csT0FBTztBQUN2RztBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxxRkFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsRUFBRTtBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FB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QTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsY0FBYyxHQUFHO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxhQUFhOztBQUU1RCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7OztBQ2w2Q2E7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHO0FBQ2xGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSiw4QkFBOEI7QUFDOUI7O0FBRUEsTUFBTSxJQUFrRTtBQUN4RSx1QkFBdUIsbUJBQU8sQ0FBQyxxQkFBUTtBQUN2QztBQUNBLElBQUksS0FBSyxFQUVOOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDbkhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsa0VBQTBCO0FBRTFCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvYWp2LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2NvZGVnZW4vY29kZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2NvZGVnZW4vc2NvcGUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvZXJyb3JzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL25hbWVzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3JlZl9lcnJvci5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZXNvbHZlLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3J1bGVzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvYXBwbGljYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9ib29sU2NoZW1hLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2RhdGFUeXBlLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2tleXdvcmQuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvc3Vic2NoZW1hLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb3JlLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL2VxdWFsLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3VjczJsZW5ndGguanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3J1bnRpbWUvdXJpLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3IuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FkZGl0aW9uYWxJdGVtcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvYWRkaXRpb25hbFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FsbE9mLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbnlPZi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvY29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2RlcGVuZGVuY2llcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaWYuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pdGVtcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaXRlbXMyMDIwLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9ub3QuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL29uZU9mLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wYXR0ZXJuUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvcHJlZml4SXRlbXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3Byb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3Byb3BlcnR5TmFtZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3RoZW5FbHNlLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29kZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvaWQuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9jb3JlL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9yZWYuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kaXNjcmltaW5hdG9yL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZGlzY3JpbWluYXRvci90eXBlcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2RyYWZ0Ny5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Zvcm1hdC9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9mb3JtYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vY29uc3QuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2VudW0uanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdEl0ZW1zLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdExlbmd0aC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbGltaXROdW1iZXIuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbXVsdGlwbGVPZi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vcGF0dGVybi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vcmVxdWlyZWQuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3VuaXF1ZUl0ZW1zLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9mYXN0LWRlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2pzb24tc2NoZW1hLXRyYXZlcnNlL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9EZWJ1Zy50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2FjdG9ycy9BY3Rvci50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9jb250ZW50L0FjdG9yRGF0YUxvYWRlci50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29udGVudC9Db250ZW50LnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9jb250ZW50L0ZvbnRMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnRlbnQvSW1hZ2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnRlbnQvSlNPTkxvYWRlci50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29udGVudC9Tb3VuZExvYWRlci50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29udGVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvZW51bXMudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL3V0aWxpdGllcy9zbGVlcC50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvdXJpLWpzL2Rpc3QvZXM1L3VyaS5hbGwuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQtcmFuZG9tL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi9pZ25vcmVkfC9ob21lL2dvcmRvbi9Qcm9qZWN0cy9hdXRvbWF0b24vbm9kZV9tb2R1bGVzL3V1aWQtcmFuZG9tfGNyeXB0byIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG92ZXJ2aWV3IEEgbGlicmFyeSBvZiB1c2VmdWwgZnVuY3Rpb25zXG4gKiBAYXV0aG9yIEdvcmRvbiBMYXJyaWdhblxuICogQHZlcnNpb24gMS4yLjlcbiAqL1xuXG4vKiogQGNsYXNzIE1hdGggKi9cblxuLyoqXG4gKiBDaGVjayBpZiB0d28gbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbFxuICogQHBhcmFtIHtudW1iZXJ9IGEgTnVtYmVyIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIE51bWJlciBiXG4gKiBAcGFyYW0ge251bWJlcn0gW3A9TnVtYmVyLkVQU0lMT05dIFRoZSBwcmVjaXNpb24gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbnVtYmVycyBhIGFuZCBiIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsXG4gKi9cbk1hdGguZmxvYXRFcXVhbHMgPSAoYSwgYiwgcCA9IE51bWJlci5FUFNJTE9OKSA9PiBNYXRoLmFicyhhIC0gYikgPCBwO1xuXG4vKipcbiAqIENsYW1wIGEgbnVtYmVyIGJldHdlZW4gbWluIGFuZCBtYXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBudW1iZXIgdG8gY2xhbXBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWluPTBdIFRoZSBtaW5pbXVtIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gW21heD0xXSBUaGUgbWF4aW11bSB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBBIGNsYW1wZWQgbnVtYmVyXG4gKi9cbk1hdGguY2xhbXAgPSAoYSwgbWluID0gMCwgbWF4ID0gMSkgPT4gYSA8IG1pbiA/IG1pbiA6IChhID4gbWF4ID8gbWF4IDogYSk7XG5cbi8qKlxuICogR2V0IHRoZSBmcmFjdGlvbmFsIHBhcnQgb2YgYSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBudW1iZXIgZnJvbSB3aGljaCB0byBnZXQgdGhlIGZyYWN0aW9uYWwgcGFydFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZnJhY3Rpb25hbCBwYXJ0IG9mIHRoZSBudW1iZXJcbiAqL1xuTWF0aC5mcmFjID0gYSA9PiBhID49IDAgPyBhIC0gTWF0aC5mbG9vcihhKSA6IGEgLSBNYXRoLmNlaWwoYSk7XG5cbi8qKlxuICogRG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZSwgc2hvdWxkIGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV1cbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuTWF0aC5sZXJwID0gKGEsIGIsIGkpID0+IGEgKyAoYiAtIGEpICogaTtcblxuLyoqXG4gKiBHZXQgdGhlIHBvc2l0aW9uIG9mIGkgYmV0d2VlbiBhIGFuZCBiXG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbWluaW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFRoZSBtYXhpbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW2EsIGJdXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBwb3NpdGlvbiBvZiBpIGJldHdlZW4gYSBhbmQgYlxuICovXG5NYXRoLnVubGVycCA9IChhLCBiLCBpKSA9PiAoaSAtIGEpIC8gKGIgLSBhKTtcblxuLyoqXG4gKiBEbyBhIGJpbGluZWFyIGludGVycG9sYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBjMDAgVG9wLWxlZnQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMTAgVG9wLXJpZ2h0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gYzAxIEJvdHRvbS1sZWZ0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gYzExIEJvdHRvbS1yaWdodCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGl4IEludGVycG9sYXRpb24gdmFsdWUgYWxvbmcgeFxuICogQHBhcmFtIHtudW1iZXJ9IGl5IEludGVycG9sYXRpb24gdmFsdWUgYWxvbmcgeVxuICogQHJldHVybiB7bnVtYmVyfSBBIGJpbGluZWFyIGludGVycG9sYXRlZCB2YWx1ZVxuICovXG5NYXRoLmJsZXJwID0gKGMwMCwgYzEwLCBjMDEsIGMxMSwgaXgsIGl5KSA9PiBNYXRoLmxlcnAoTWF0aC5sZXJwKGMwMCwgYzEwLCBpeCksIE1hdGgubGVycChjMDEsIGMxMSwgaXgpLCBpeSk7XG5cbi8qKlxuICogUmUtbWFwIGEgbnVtYmVyIGkgZnJvbSByYW5nZSBhMS4uLmEyIHRvIGIxLi4uYjJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBudW1iZXIgdG8gcmUtbWFwXG4gKiBAcGFyYW0ge251bWJlcn0gYTFcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMlxuICogQHBhcmFtIHtudW1iZXJ9IGIxXG4gKiBAcGFyYW0ge251bWJlcn0gYjJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuTWF0aC5yZW1hcCA9IChpLCBhMSwgYTIsIGIxLCBiMikgPT4gYjEgKyAoaSAtIGExKSAqIChiMiAtIGIxKSAvIChhMiAtIGExKTtcblxuLyoqXG4gKiBEbyBhIHNtb290aCBpbnRlcnBvbGF0aW9uIGJldHdlZW4gYSBhbmQgYlxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW2EsIGJdXG4gKi9cbk1hdGguc21vb3Roc3RlcCA9IChhLCBiLCBpKSA9PiBNYXRoLmxlcnAoYSwgYiwgMyAqIE1hdGgucG93KGksIDIpIC0gMiAqIE1hdGgucG93KGksIDMpKTtcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXMgVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuTWF0aC5yYWRpYW5zID0gZGVncmVlcyA9PiAoTWF0aC5QSSAvIDE4MCkgKiBkZWdyZWVzO1xuXG4vKipcbiAqIEdldCBhbiBhbmdsZSBpbiBkZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybiB7bnVtYmVyfSBUaGUgYW5nbGUgaW4gZGVncmVlc1xuICovXG5NYXRoLmRlZ3JlZXMgPSByYWRpYW5zID0+ICgxODAgLyBNYXRoLlBJKSAqIHJhZGlhbnM7XG5cbi8qKlxuICogR2V0IGEgcmFuZG9tIGZsb2F0IGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXgpXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIEluY2x1c2l2ZSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggRXhjbHVzaXZlIG1heFxuICogQHJldHVybiB7bnVtYmVyfSBBIHJhbmRvbSBmbG9hdCBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4KVxuICovXG5NYXRoLnJhbmRvbUJldHdlZW4gPSAobWluLCBtYXgpID0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBJbmNsdXNpdmUgbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IEluY2x1c2l2ZSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gQSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICovXG5NYXRoLnJhbmRvbUludEJldHdlZW4gPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cbi8qKlxuICogR2V0IGEgbm9ybWFsbHktZGlzdHJpYnV0ZWQgcmFuZG9tIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFttdT0wLjVdIFRoZSBtZWFuIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpZ21hPTAuNV0gVGhlIHN0YW5kYXJkIGRldmlhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IFtzYW1wbGVzPTJdIFRoZSBudW1iZXIgb2Ygc2FtcGxlc1xuICogQHJldHVybiB7bnVtYmVyfSBBIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBudW1iZXJcbiAqL1xuTWF0aC5jbHRSYW5kb20gPSAobXUgPSAwLjUsIHNpZ21hID0gMC41LCBzYW1wbGVzID0gMikgPT4ge1xuICBsZXQgdG90YWwgPSAwO1xuICBmb3IgKGxldCBpID0gc2FtcGxlczsgaS0tOykge1xuICAgIHRvdGFsICs9IE1hdGgucmFuZG9tKCk7XG4gIH1cbiAgcmV0dXJuIG11ICsgKHRvdGFsIC0gc2FtcGxlcyAvIDIpIC8gKHNhbXBsZXMgLyAyKSAqIHNpZ21hO1xufTtcblxuLyoqXG4gKiBHZXQgYSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBJbmNsdXNpdmUgbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IEluY2x1c2l2ZSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gQSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gaW50ZWdlclxuICovXG5NYXRoLmNsdFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLmNsdFJhbmRvbSgwLjUsIDAuNSwgMikgKiAobWF4ICsgMSAtIG1pbikpO1xuXG4vKipcbiAqIFJldHVybiBhIHdlaWdodGVkIHJhbmRvbSBpbnRlZ2VyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHcgQW4gYXJyYXkgb2Ygd2VpZ2h0c1xuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbmRleCBmcm9tIHdcbiAqL1xuTWF0aC53ZWlnaHRlZFJhbmRvbSA9IHcgPT4ge1xuICBsZXQgdG90YWwgPSB3LnJlZHVjZSgoYSwgaSkgPT4gYSArIGksIDApLCBuID0gMDtcbiAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiB0b3RhbDtcbiAgd2hpbGUgKHRvdGFsID4gcikge1xuICAgIHRvdGFsIC09IHdbbisrXTtcbiAgfVxuICByZXR1cm4gbiAtIDE7XG59O1xuXG4vKipcbiAqIEFuIGludGVycG9sYXRpb24gZnVuY3Rpb25cbiAqIEBjYWxsYmFjayBpbnRlcnBvbGF0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZSwgc2hvdWxkIGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV1cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW2EsIGJdXG4gKi9cblxuLyoqXG4gKiBSZXR1cm4gYW4gaW50ZXJwb2xhdGVkIHZhbHVlIGZyb20gYW4gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYSBBbiBhcnJheSBvZiB2YWx1ZXMgaW50ZXJwb2xhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIEEgbnVtYmVyIGluIHRoZSBpbnRlcnZhbCBbMCwgMV1cbiAqIEBwYXJhbSB7aW50ZXJwb2xhdGlvbkNhbGxiYWNrfSBbZj1NYXRoLmxlcnBdIFRoZSBpbnRlcnBvbGF0aW9uIGZ1bmN0aW9uIHRvIHVzZVxuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFttaW4oYSksIG1heChhKV1cbiAqL1xuTWF0aC5sZXJwQXJyYXkgPSAoYSwgaSwgZiA9IE1hdGgubGVycCkgPT4ge1xuICBjb25zdCBzID0gaSAqIChhLmxlbmd0aCAtIDEpO1xuICBjb25zdCBwID0gTWF0aC5jbGFtcChNYXRoLnRydW5jKHMpLCAwLCBhLmxlbmd0aCAtIDEpO1xuICByZXR1cm4gZihhW3BdIHx8IDAsIGFbcCArIDFdIHx8IDAsIE1hdGguZnJhYyhzKSk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYSBWZWN0b3IgYVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xuTWF0aC5kb3QgPSAoYSwgYikgPT4gYS5yZWR1Y2UoKG4sIHYsIGkpID0+IG4gKyB2ICogYltpXSwgMCk7XG5cbi8qKlxuICogR2V0IHRoZSBmYWN0b3JpYWwgb2YgYSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEhXG4gKi9cbk1hdGguZmFjdG9yaWFsID0gYSA9PiB7XG4gIGxldCByZXN1bHQgPSAxO1xuICBmb3IgKGxldCBpID0gMjsgaSA8PSBhOyBpKyspIHtcbiAgICByZXN1bHQgKj0gaTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG51bWJlciBvZiBwZXJtdXRhdGlvbnMgb2YgciBlbGVtZW50cyBmcm9tIGEgc2V0IG9mIG4gZWxlbWVudHNcbiAqIEBwYXJhbSB7bnVtYmVyfSBuXG4gKiBAcGFyYW0ge251bWJlcn0gclxuICogQHJldHVybiB7bnVtYmVyfSBuUHJcbiAqL1xuTWF0aC5wZXJtdXRhdGlvbiA9IChuLCByKSA9PiBNYXRoLmZhY3RvcmlhbChuKSAvIE1hdGguZmFjdG9yaWFsKG4gLSByKTtcblxuLyoqXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjb21iaW5hdGlvbnMgb2YgciBlbGVtZW50cyBmcm9tIGEgc2V0IG9mIG4gZWxlbWVudHNcbiAqIEBwYXJhbSB7bnVtYmVyfSBuXG4gKiBAcGFyYW0ge251bWJlcn0gclxuICogQHJldHVybiB7bnVtYmVyfSBuQ3JcbiAqL1xuTWF0aC5jb21iaW5hdGlvbiA9IChuLCByKSA9PiBNYXRoLmZhY3RvcmlhbChuKSAvIChNYXRoLmZhY3RvcmlhbChyKSAqIE1hdGguZmFjdG9yaWFsKG4gLSByKSk7XG5cbi8qKiBAY2xhc3MgQXJyYXkgKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBnZW5lcmF0aW5nIGFycmF5IHZhbHVlc1xuICogQGNhbGxiYWNrIHRpbWVzQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBhcnJheSBpbmRleFxuICogQHJldHVybiB7Kn0gVGhlIGFycmF5IHZhbHVlXG4gKi9cblxuLyoqXG4gKiBSZXR1cm4gYSBuZXcgYXJyYXkgd2l0aCBsZW5ndGggbiBieSBjYWxsaW5nIGZ1bmN0aW9uIGYoaSkgb24gZWFjaCBlbGVtZW50XG4gKiBAcGFyYW0ge3RpbWVzQ2FsbGJhY2t9IGZcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSBhcnJheVxuICogQHJldHVybiB7QXJyYXk8Kj59XG4gKi9cbkFycmF5LnRpbWVzID0gKGYsIG4pID0+IEFycmF5KG4pLmZpbGwoMCkubWFwKChfLCBpKSA9PiBmKGkpKTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgY29udGFpbmluZyBudW1iZXJzIDAtPihuIC0gMSlcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSBhcnJheVxuICogQHJldHVybiB7QXJyYXk8bnVtYmVyPn0gQW4gYXJyYXkgb2YgaW50ZWdlcnMgMC0+KG4gLSAxKVxuICovXG5BcnJheS5yYW5nZSA9IG4gPT4gQXJyYXkudGltZXMoaSA9PiBpLCBuKTtcblxuLyoqXG4gKiBaaXAgMiBhcnJheXMgdG9nZXRoZXIsIGkuZS4gKFsxLCAyLCAzXSwgW2EsIGIsIGNdKSA9PiBbWzEsIGFdLCBbMiwgYl0sIFszLCBjXV1cbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PCo+Pn1cbiAqL1xuQXJyYXkuemlwID0gKGEsIGIpID0+IGEubWFwKChrLCBpKSA9PiBbaywgYltpXV0pO1xuXG4vKipcbiAqIFJldHVybiBhcnJheVtpXSB3aXRoIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB3cmFwcGluZ1xuICogQG5hbWUgYXRcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIEFycmF5LnByb3RvdHlwZVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHBvc2l0aXZlbHkvbmVnYXRpdmVseSB3cmFwcGVkIGFycmF5IGluZGV4XG4gKiBAcmV0dXJuIHsqfSBBbiBlbGVtZW50IGZyb20gdGhlIGFycmF5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdhdCcsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uIChpKSB7XG4gICAgY29uc3QgbCA9IHRoaXMubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzW2kgPCAwID8gbCAtIChNYXRoLmFicyhpICsgMSkgJSBsKSAtIDEgOiBpICUgbF07XG4gIH1cbn0pO1xuXG4vKipcbiAqIENob3AgYW4gYXJyYXkgaW50byBjaHVua3Mgb2Ygc2l6ZSBuXG4gKiBAbmFtZSBjaHVua1xuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgQXJyYXkucHJvdG90eXBlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgY2h1bmsgc2l6ZVxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8Kj4+fSBBbiBhcnJheSBvZiBhcnJheSBjaHVua3NcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ2NodW5rJywge1xuICB2YWx1ZTogZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gQXJyYXkudGltZXMoaSA9PiB0aGlzLnNsaWNlKGkgKiBuLCBpICogbiArIG4pLCBNYXRoLmNlaWwodGhpcy5sZW5ndGggLyBuKSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJhbmRvbWx5IHNodWZmbGUgYW4gYXJyYXkgaW4tcGxhY2VcbiAqIEBuYW1lIHNodWZmbGVcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIEFycmF5LnByb3RvdHlwZVxuICogQHJldHVybiB7QXJyYXk8Kj59IFRoZSBzaHVmZmxlZCBhcnJheVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc2h1ZmZsZScsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoYSA9PiBbTWF0aC5yYW5kb20oKSwgYV0pLnNvcnQoKGEsIGIpID0+IGFbMF0gLSBiWzBdKS5tYXAoYSA9PiBhWzFdKTtcbiAgfVxufSk7XG5cbi8qKlxuICogQSAyZCB2ZWN0b3JcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHZlY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHggVGhlIHggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB5IFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdmVjdG9yXG4gKiBAcGFyYW0ge251bWJlcnx2ZWN9IFt4XSBUaGUgeCBjb21wb25lbnQgb2YgdGhlIHZlY3Rvciwgb3IgYSB2ZWN0b3IgdG8gY29weVxuICogQHBhcmFtIHtudW1iZXJ9IFt5XSBUaGUgeSBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBBIG5ldyB2ZWN0b3JcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlZhcmlvdXMgd2F5cyB0byBpbml0aWFsaXNlIGEgdmVjdG9yPC9jYXB0aW9uPlxuICogbGV0IGEgPSB2ZWMoMywgMik7ICAvLyAoMywgMilcbiAqIGxldCBiID0gdmVjKDQpOyAgICAgLy8gKDQsIDQpXG4gKiBsZXQgYyA9IHZlYyhhKTsgICAgIC8vICgzLCAyKVxuICogbGV0IGQgPSB2ZWMoKTsgICAgICAvLyAoMCwgMClcbiAqL1xuY29uc3QgdmVjID0gKHgsIHkpID0+ICgheCAmJiAheSA/XG4gIHsgeDogMCwgeTogMCB9IDogKHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/XG4gICAgeyB4OiB4LnggfHwgMCwgeTogeC55IHx8IDAgfSA6ICh5ID09PSBudWxsIHx8IHkgPT09IHVuZGVmaW5lZCA/XG4gICAgICB7IHg6IHgsIHk6IHggfSA6IHsgeDogeCwgeTogeSB9KVxuICApXG4pO1xuXG4vKipcbiAqIEdldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlY3RvciBhcyBhbiBhcnJheVxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBnZXQgY29tcG9uZW50cyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBUaGUgdmVjdG9yIGNvbXBvbmVudHMgYXMgYW4gYXJyYXlcbiAqL1xudmVjLmNvbXBvbmVudHMgPSBhID0+IFthLngsIGEueV07XG5cbi8qKlxuICogUmV0dXJuIGEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKiBAcmV0dXJuIHt2ZWN9IEEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKi9cbnZlYy51eCA9ICgpID0+IHZlYygxLCAwKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB1bml0IHZlY3RvciAoMCwgMSlcbiAqIEByZXR1cm4ge3ZlY30gQSB1bml0IHZlY3RvciAoMCwgMSlcbiAqL1xudmVjLnV5ID0gKCkgPT4gdmVjKDAsIDEpO1xuXG4vKipcbiAqIEFkZCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSArIGJcbiAqL1xudmVjLmFkZCA9IChhLCBiKSA9PiAoeyB4OiBhLnggKyBiLngsIHk6IGEueSArIGIueSB9KTtcblxuLyoqXG4gKiBTY2FsZSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFNjYWxhciBiXG4gKiBAcmV0dXJuIHt2ZWN9IGEgKiBiXG4gKi9cbnZlYy5tdWwgPSAoYSwgYikgPT4gKHsgeDogYS54ICogYiwgeTogYS55ICogYiB9KTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSAtIGJcbiAqL1xudmVjLnN1YiA9IChhLCBiKSA9PiAoeyB4OiBhLnggLSBiLngsIHk6IGEueSAtIGIueSB9KTtcblxuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gfGF8XG4gKi9cbnZlYy5sZW4gPSBhID0+IE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkpO1xuXG4vKipcbiAqIEdldCB0aGUgbGVuZ3RoIG9mIGEgdmVjdG9yIHVzaW5nIHRheGljYWIgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHxhfFxuICovXG52ZWMubWFuaGF0dGFuID0gYSA9PiBNYXRoLmFicyhhLngpICsgTWF0aC5hYnMoYS55KTtcblxuLyoqXG4gKiBOb3JtYWxpc2UgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gbm9ybWFsaXNlXG4gKiBAcmV0dXJuIHt2ZWN9IF5hXG4gKi9cbnZlYy5ub3IgPSBhID0+IHtcbiAgbGV0IGxlbiA9IHZlYy5sZW4oYSk7XG4gIHJldHVybiBsZW4gPyB7IHg6IGEueCAvIGxlbiwgeTogYS55IC8gbGVuIH0gOiB2ZWMoKTtcbn07XG5cbi8qKlxuICogR2V0IGEgZG90IHByb2R1Y3Qgb2YgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xudmVjLmRvdCA9IChhLCBiKSA9PiBhLnggKiBiLnggKyBhLnkgKiBiLnk7XG5cbi8qKlxuICogUm90YXRlIGEgdmVjdG9yIGJ5IHIgcmFkaWFuc1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByIFRoZSBhbmdsZSB0byByb3RhdGUgYnksIG1lYXN1cmVkIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge3ZlY30gQSByb3RhdGVkIHZlY3RvclxuICovXG52ZWMucm90ID0gKGEsIHIpID0+IHtcbiAgbGV0IHMgPSBNYXRoLnNpbihyKSxcbiAgICBjID0gTWF0aC5jb3Mocik7XG4gIHJldHVybiB7IHg6IGMgKiBhLnggLSBzICogYS55LCB5OiBzICogYS54ICsgYyAqIGEueSB9O1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2ZWN0b3JzIGFyZSBlcXVhbFxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZlY3RvcnMgYSBhbmQgYiBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG52ZWMuZXEgPSAoYSwgYikgPT4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG5cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIG9mIHZlY3RvciBhIGluIHJhZGlhbnNcbiAqL1xudmVjLnJhZCA9IGEgPT4gTWF0aC5hdGFuMihhLnksIGEueCk7XG5cbi8qKlxuICogQ29weSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb3B5XG4gKiBAcmV0dXJuIHt2ZWN9IEEgY29weSBvZiB2ZWN0b3IgYVxuICovXG52ZWMuY3B5ID0gYSA9PiB2ZWMoYSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yXG4gKiBAY2FsbGJhY2sgdmVjdG9yTWFwQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgY29tcG9uZW50IHZhbHVlXG4gKiBAcGFyYW0geyd4JyB8ICd5J30gbGFiZWwgVGhlIGNvbXBvbmVudCBsYWJlbCAoeCBvciB5KVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGNvbXBvbmVudFxuICovXG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yIGFuZCBidWlsZCBhIG5ldyB2ZWN0b3IgZnJvbSB0aGUgcmVzdWx0c1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjdG9yTWFwQ2FsbGJhY2t9IGYgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBWZWN0b3IgYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbnZlYy5tYXAgPSAoYSwgZikgPT4gKHsgeDogZihhLngsICd4JyksIHk6IGYoYS55LCAneScpIH0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSB2ZWN0b3IgaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gW3M9JywgJ10gVGhlIHNlcGFyYXRvciBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMuc3RyID0gKGEsIHMgPSAnLCAnKSA9PiBgJHthLnh9JHtzfSR7YS55fWA7XG5cbi8qKlxuICogQSBtYXRyaXhcbiAqIEB0eXBlZGVmIHtPYmplY3R9IG1hdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IG0gVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBtYXRyaXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbWF0cml4XG4gKiBAcHJvcGVydHkge0FycmF5PG51bWJlcj59IGVudHJpZXMgVGhlIG1hdHJpeCB2YWx1ZXNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXRyaXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbT00XSBUaGUgbnVtYmVyIG9mIHJvd3NcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj00XSBUaGUgbnVtYmVyIG9mIGNvbHVtbnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW2VudHJpZXM9W11dIE1hdHJpeCB2YWx1ZXMgaW4gcmVhZGluZyBvcmRlclxuICogQHJldHVybiB7bWF0fSBBIG5ldyBtYXRyaXhcbiAqL1xuY29uc3QgbWF0ID0gKG0gPSA0LCBuID0gNCwgZW50cmllcyA9IFtdKSA9PiAoe1xuICBtLCBuLFxuICBlbnRyaWVzOiBlbnRyaWVzLmNvbmNhdChBcnJheShtICogbikuZmlsbCgwKSkuc2xpY2UoMCwgbSAqIG4pXG59KTtcblxuLyoqXG4gKiBHZXQgYW4gaWRlbnRpdHkgbWF0cml4IG9mIHNpemUgblxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBBbiBpZGVudGl0eSBtYXRyaXhcbiAqL1xubWF0LmlkZW50aXR5ID0gbiA9PiBtYXQobiwgbiwgQXJyYXkobiAqIG4pLmZpbGwoMCkubWFwKCh2LCBpKSA9PiArKE1hdGguZmxvb3IoaSAvIG4pID09PSBpICUgbikpKTtcblxuLyoqXG4gKiBHZXQgYW4gZW50cnkgZnJvbSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSByb3cgb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gaiBUaGUgY29sdW1uIG9mZnNldFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgYXQgcG9zaXRpb24gKGksIGopIGluIG1hdHJpeCBhXG4gKi9cbm1hdC5nZXQgPSAoYSwgaSwgaikgPT4gYS5lbnRyaWVzWyhqIC0gMSkgKyAoaSAtIDEpICogYS5uXTtcblxuLyoqXG4gKiBTZXQgYW4gZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcm93IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IGogVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IFRoZSB2YWx1ZSB0byBzZXQgaW4gbWF0cml4IGFcbiAqL1xubWF0LnNldCA9IChhLCBpLCBqLCB2KSA9PiB7IGEuZW50cmllc1soaiAtIDEpICsgKGkgLSAxKSAqIGEubl0gPSB2OyB9O1xuXG4vKipcbiAqIEdldCBhIHJvdyBmcm9tIGEgbWF0cml4IGFzIGFuIGFycmF5XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IG0gVGhlIHJvdyBvZmZzZXRcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IFJvdyBtIGZyb20gbWF0cml4IGFcbiAqL1xubWF0LnJvdyA9IChhLCBtKSA9PiB7XG4gIGNvbnN0IHMgPSAobSAtIDEpICogYS5uO1xuICByZXR1cm4gYS5lbnRyaWVzLnNsaWNlKHMsIHMgKyBhLm4pO1xufTtcblxuLyoqXG4gKiBHZXQgYSBjb2x1bW4gZnJvbSBhIG1hdHJpeCBhcyBhbiBhcnJheVxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBDb2x1bW4gbiBmcm9tIG1hdHJpeCBhXG4gKi9cbm1hdC5jb2wgPSAoYSwgbikgPT4gQXJyYXkudGltZXMoaSA9PiBtYXQuZ2V0KGEsIChpICsgMSksIG4pLCBhLm0pO1xuXG4vKipcbiAqIEFkZCBtYXRyaWNlc1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHttYXR9IGEgKyBiXG4gKi9cbm1hdC5hZGQgPSAoYSwgYikgPT4gYS5tID09PSBiLm0gJiYgYS5uID09PSBiLm4gJiYgbWF0Lm1hcChhLCAodiwgaSkgPT4gdiArIGIuZW50cmllc1tpXSk7XG5cbi8qKlxuICogU3VidHJhY3QgbWF0cmljZXNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7bWF0fSBhIC0gYlxuICovXG5tYXQuc3ViID0gKGEsIGIpID0+IGEubSA9PT0gYi5tICYmIGEubiA9PT0gYi5uICYmIG1hdC5tYXAoYSwgKHYsIGkpID0+IHYgLSBiLmVudHJpZXNbaV0pO1xuXG4vKipcbiAqIE11bHRpcGx5IG1hdHJpY2VzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBhYiBvciBmYWxzZSBpZiB0aGUgbWF0cmljZXMgY2Fubm90IGJlIG11bHRpcGxpZWRcbiAqL1xubWF0Lm11bCA9IChhLCBiKSA9PiB7XG4gIGlmIChhLm4gIT09IGIubSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgcmVzdWx0ID0gbWF0KGEubSwgYi5uKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYS5tOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBiLm47IGorKykge1xuICAgICAgbWF0LnNldChyZXN1bHQsIGksIGosIE1hdGguZG90KG1hdC5yb3coYSwgaSksIG1hdC5jb2woYiwgaikpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogU2NhbGUgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gYiBTY2FsYXIgYlxuICogQHJldHVybiB7bWF0fSBhICogYlxuICovXG5tYXQuc2NhbGUgPSAoYSwgYikgPT4gbWF0Lm1hcChhLCB2ID0+IHYgKiBiKTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gdHJhbnNwb3NlXG4gKiBAcmV0dXJuIHttYXR9IEEgdHJhbnNwb3NlZCBtYXRyaXhcbiAqL1xubWF0LnRyYW5zID0gYSA9PiBtYXQoYS5uLCBhLm0sIEFycmF5LnRpbWVzKGkgPT4gbWF0LmNvbChhLCAoaSArIDEpKSwgYS5uKS5mbGF0KCkpO1xuXG4vKipcbiAqIEdldCB0aGUgbWlub3Igb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcm93IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IGogVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBUaGUgKGksIGopIG1pbm9yIG9mIG1hdHJpeCBhIG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaXMgbm90IHNxdWFyZVxuICovXG5tYXQubWlub3IgPSAoYSwgaSwgaikgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgZm9yIChsZXQgaWkgPSAxOyBpaSA8PSBhLm07IGlpKyspIHtcbiAgICBpZiAoaWkgPT09IGkpIHsgY29udGludWU7IH1cbiAgICBmb3IgKGxldCBqaiA9IDE7IGpqIDw9IGEubjsgamorKykge1xuICAgICAgaWYgKGpqID09PSBqKSB7IGNvbnRpbnVlOyB9XG4gICAgICBlbnRyaWVzLnB1c2gobWF0LmdldChhLCBpaSwgamopKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdChhLm0gLSAxLCBhLm4gLSAxLCBlbnRyaWVzKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEByZXR1cm4ge251bWJlcnxib29sZWFufSB8YXwgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBpcyBub3Qgc3F1YXJlXG4gKi9cbm1hdC5kZXQgPSBhID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoYS5tID09PSAxKSB7XG4gICAgcmV0dXJuIGEuZW50cmllc1swXTtcbiAgfVxuICBpZiAoYS5tID09PSAyKSB7XG4gICAgcmV0dXJuIGEuZW50cmllc1swXSAqIGEuZW50cmllc1szXSAtIGEuZW50cmllc1sxXSAqIGEuZW50cmllc1syXTtcbiAgfVxuICBsZXQgdG90YWwgPSAwLCBzaWduID0gMTtcbiAgZm9yIChsZXQgaiA9IDE7IGogPD0gYS5uOyBqKyspIHtcbiAgICB0b3RhbCArPSBzaWduICogYS5lbnRyaWVzW2ogLSAxXSAqIG1hdC5kZXQobWF0Lm1pbm9yKGEsIDEsIGopKTtcbiAgICBzaWduICo9IC0xO1xuICB9XG4gIHJldHVybiB0b3RhbDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXNlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIG5vcm1hbGlzZVxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IF5hIG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaXMgbm90IHNxdWFyZVxuICovXG5tYXQubm9yID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgZCA9IG1hdC5kZXQoYSk7XG4gIHJldHVybiBtYXQubWFwKGEsIGkgPT4gaSAqIGQpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGFkanVnYXRlIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IGZyb20gd2hpY2ggdG8gZ2V0IHRoZSBhZGp1Z2F0ZVxuICogQHJldHVybiB7bWF0fSBUaGUgYWRqdWdhdGUgb2YgYVxuICovXG5tYXQuYWRqID0gYSA9PiB7XG4gIGNvbnN0IG1pbm9ycyA9IG1hdChhLm0sIGEubik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IGEubTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gYS5uOyBqKyspIHtcbiAgICAgIG1hdC5zZXQobWlub3JzLCBpLCBqLCBtYXQuZGV0KG1hdC5taW5vcihhLCBpLCBqKSkpO1xuICAgIH1cbiAgfVxuICBjb25zdCBjb2ZhY3RvcnMgPSBtYXQubWFwKG1pbm9ycywgKHYsIGkpID0+IHYgKiAoaSAlIDIgPyAtMSA6IDEpKTtcbiAgcmV0dXJuIG1hdC50cmFucyhjb2ZhY3RvcnMpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGludmVyc2Ugb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gaW52ZXJ0XG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gYV4tMSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGhhcyBubyBpbnZlcnNlXG4gKi9cbm1hdC5pbnYgPSBhID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCBkID0gbWF0LmRldChhKTtcbiAgaWYgKGQgPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiBtYXQuc2NhbGUobWF0LmFkaihhKSwgMSAvIGQpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0d28gbWF0cmljZXMgYXJlIGVxdWFsXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbWF0cmljZXMgYSBhbmQgYiBhcmUgaWRlbnRpY2FsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xubWF0LmVxID0gKGEsIGIpID0+IGEubSA9PT0gYi5tICYmIGEubiA9PT0gYi5uICYmIG1hdC5zdHIoYSkgPT09IG1hdC5zdHIoYik7XG5cbi8qKlxuICogQ29weSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBjb3B5XG4gKiBAcmV0dXJuIHttYXR9IEEgY29weSBvZiBtYXRyaXggYVxuICovXG5tYXQuY3B5ID0gYSA9PiBtYXQoYS5tLCBhLm4sIFsuLi5hLmVudHJpZXNdKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBlbnRyeSBvZiBhIG1hdHJpeFxuICogQGNhbGxiYWNrIG1hdHJpeE1hcENhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVGhlIGVudHJ5IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGVudHJ5IGluZGV4XG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGVudHJpZXMgVGhlIGFycmF5IG9mIG1hdHJpeCBlbnRyaWVzXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXBwZWQgZW50cnlcbiAqL1xuXG4vKipcbiAqIENhbGwgYSBmdW5jdGlvbiBvbiBlYWNoIGVudHJ5IG9mIGEgbWF0cml4IGFuZCBidWlsZCBhIG5ldyBtYXRyaXggZnJvbSB0aGUgcmVzdWx0c1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0cml4TWFwQ2FsbGJhY2t9IGYgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBlbnRyeSBvZiB0aGUgbWF0cml4XG4gKiBAcmV0dXJuIHttYXR9IE1hdHJpeCBhIG1hcHBlZCB0aHJvdWdoIGZcbiAqL1xubWF0Lm1hcCA9IChhLCBmKSA9PiBtYXQoYS5tLCBhLm4sIGEuZW50cmllcy5tYXAoZikpO1xuXG4vKipcbiAqIENvbnZlcnQgYSBtYXRyaXggaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gW21zPScsICddIFRoZSBzZXBhcmF0b3Igc3RyaW5nIGZvciBjb2x1bW5zXG4gKiBAcGFyYW0ge3N0cmluZ30gW25zPSdcXG4nXSBUaGUgc2VwYXJhdG9yIHN0cmluZyBmb3Igcm93c1xuICogQHJldHVybiB7c3RyaW5nfSBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdC5zdHIgPSAoYSwgbXMgPSAnLCAnLCBucyA9ICdcXG4nKSA9PiBhLmVudHJpZXMuY2h1bmsoYS5uKS5tYXAociA9PiByLmpvaW4obXMpKS5qb2luKG5zKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0geyB2ZWMsIG1hdCB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvZGVHZW4gPSBleHBvcnRzLk5hbWUgPSBleHBvcnRzLm5pbCA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHIgPSBleHBvcnRzLl8gPSBleHBvcnRzLktleXdvcmRDeHQgPSB2b2lkIDA7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiLi9jb3JlXCIpO1xuY29uc3QgZHJhZnQ3XzEgPSByZXF1aXJlKFwiLi92b2NhYnVsYXJpZXMvZHJhZnQ3XCIpO1xuY29uc3QgZGlzY3JpbWluYXRvcl8xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3JcIik7XG5jb25zdCBkcmFmdDdNZXRhU2NoZW1hID0gcmVxdWlyZShcIi4vcmVmcy9qc29uLXNjaGVtYS1kcmFmdC0wNy5qc29uXCIpO1xuY29uc3QgTUVUQV9TVVBQT1JUX0RBVEEgPSBbXCIvcHJvcGVydGllc1wiXTtcbmNvbnN0IE1FVEFfU0NIRU1BX0lEID0gXCJodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYVwiO1xuY2xhc3MgQWp2IGV4dGVuZHMgY29yZV8xLmRlZmF1bHQge1xuICAgIF9hZGRWb2NhYnVsYXJpZXMoKSB7XG4gICAgICAgIHN1cGVyLl9hZGRWb2NhYnVsYXJpZXMoKTtcbiAgICAgICAgZHJhZnQ3XzEuZGVmYXVsdC5mb3JFYWNoKCh2KSA9PiB0aGlzLmFkZFZvY2FidWxhcnkodikpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmRpc2NyaW1pbmF0b3IpXG4gICAgICAgICAgICB0aGlzLmFkZEtleXdvcmQoZGlzY3JpbWluYXRvcl8xLmRlZmF1bHQpO1xuICAgIH1cbiAgICBfYWRkRGVmYXVsdE1ldGFTY2hlbWEoKSB7XG4gICAgICAgIHN1cGVyLl9hZGREZWZhdWx0TWV0YVNjaGVtYSgpO1xuICAgICAgICBpZiAoIXRoaXMub3B0cy5tZXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBtZXRhU2NoZW1hID0gdGhpcy5vcHRzLiRkYXRhXG4gICAgICAgICAgICA/IHRoaXMuJGRhdGFNZXRhU2NoZW1hKGRyYWZ0N01ldGFTY2hlbWEsIE1FVEFfU1VQUE9SVF9EQVRBKVxuICAgICAgICAgICAgOiBkcmFmdDdNZXRhU2NoZW1hO1xuICAgICAgICB0aGlzLmFkZE1ldGFTY2hlbWEobWV0YVNjaGVtYSwgTUVUQV9TQ0hFTUFfSUQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWZzW1wiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9zY2hlbWFcIl0gPSBNRVRBX1NDSEVNQV9JRDtcbiAgICB9XG4gICAgZGVmYXVsdE1ldGEoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRzLmRlZmF1bHRNZXRhID1cbiAgICAgICAgICAgIHN1cGVyLmRlZmF1bHRNZXRhKCkgfHwgKHRoaXMuZ2V0U2NoZW1hKE1FVEFfU0NIRU1BX0lEKSA/IE1FVEFfU0NIRU1BX0lEIDogdW5kZWZpbmVkKSk7XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gQWp2O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWp2O1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2V5d29yZEN4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGVfMS5LZXl3b3JkQ3h0OyB9IH0pO1xudmFyIGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvY29kZWdlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLk5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb2RlR2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuQ29kZUdlbjsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFqdi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVnZXhwQ29kZSA9IGV4cG9ydHMuZ2V0RXNtRXhwb3J0TmFtZSA9IGV4cG9ydHMuZ2V0UHJvcGVydHkgPSBleHBvcnRzLnNhZmVTdHJpbmdpZnkgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyQ29uY2F0ID0gZXhwb3J0cy5hZGRDb2RlQXJnID0gZXhwb3J0cy5zdHIgPSBleHBvcnRzLl8gPSBleHBvcnRzLm5pbCA9IGV4cG9ydHMuX0NvZGUgPSBleHBvcnRzLk5hbWUgPSBleHBvcnRzLklERU5USUZJRVIgPSBleHBvcnRzLl9Db2RlT3JOYW1lID0gdm9pZCAwO1xuY2xhc3MgX0NvZGVPck5hbWUge1xufVxuZXhwb3J0cy5fQ29kZU9yTmFtZSA9IF9Db2RlT3JOYW1lO1xuZXhwb3J0cy5JREVOVElGSUVSID0gL15bYS16JF9dW2EteiRfMC05XSokL2k7XG5jbGFzcyBOYW1lIGV4dGVuZHMgX0NvZGVPck5hbWUge1xuICAgIGNvbnN0cnVjdG9yKHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCFleHBvcnRzLklERU5USUZJRVIudGVzdChzKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IG5hbWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcIik7XG4gICAgICAgIHRoaXMuc3RyID0gcztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG4gICAgZW1wdHlTdHIoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4geyBbdGhpcy5zdHJdOiAxIH07XG4gICAgfVxufVxuZXhwb3J0cy5OYW1lID0gTmFtZTtcbmNsYXNzIF9Db2RlIGV4dGVuZHMgX0NvZGVPck5hbWUge1xuICAgIGNvbnN0cnVjdG9yKGNvZGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSB0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIiA/IFtjb2RlXSA6IGNvZGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxuICAgIGVtcHR5U3RyKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zWzBdO1xuICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJcIiB8fCBpdGVtID09PSAnXCJcIic7XG4gICAgfVxuICAgIGdldCBzdHIoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLl9zdHIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICh0aGlzLl9zdHIgPSB0aGlzLl9pdGVtcy5yZWR1Y2UoKHMsIGMpID0+IGAke3N9JHtjfWAsIFwiXCIpKSk7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMuX25hbWVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAodGhpcy5fbmFtZXMgPSB0aGlzLl9pdGVtcy5yZWR1Y2UoKG5hbWVzLCBjKSA9PiB7XG4gICAgICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIE5hbWUpXG4gICAgICAgICAgICAgICAgbmFtZXNbYy5zdHJdID0gKG5hbWVzW2Muc3RyXSB8fCAwKSArIDE7XG4gICAgICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgICAgIH0sIHt9KSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuX0NvZGUgPSBfQ29kZTtcbmV4cG9ydHMubmlsID0gbmV3IF9Db2RlKFwiXCIpO1xuZnVuY3Rpb24gXyhzdHJzLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgY29kZSA9IFtzdHJzWzBdXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgICBhZGRDb2RlQXJnKGNvZGUsIGFyZ3NbaV0pO1xuICAgICAgICBjb2RlLnB1c2goc3Ryc1srK2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfQ29kZShjb2RlKTtcbn1cbmV4cG9ydHMuXyA9IF87XG5jb25zdCBwbHVzID0gbmV3IF9Db2RlKFwiK1wiKTtcbmZ1bmN0aW9uIHN0cihzdHJzLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXhwciA9IFtzYWZlU3RyaW5naWZ5KHN0cnNbMF0pXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgICBleHByLnB1c2gocGx1cyk7XG4gICAgICAgIGFkZENvZGVBcmcoZXhwciwgYXJnc1tpXSk7XG4gICAgICAgIGV4cHIucHVzaChwbHVzLCBzYWZlU3RyaW5naWZ5KHN0cnNbKytpXSkpO1xuICAgIH1cbiAgICBvcHRpbWl6ZShleHByKTtcbiAgICByZXR1cm4gbmV3IF9Db2RlKGV4cHIpO1xufVxuZXhwb3J0cy5zdHIgPSBzdHI7XG5mdW5jdGlvbiBhZGRDb2RlQXJnKGNvZGUsIGFyZykge1xuICAgIGlmIChhcmcgaW5zdGFuY2VvZiBfQ29kZSlcbiAgICAgICAgY29kZS5wdXNoKC4uLmFyZy5faXRlbXMpO1xuICAgIGVsc2UgaWYgKGFyZyBpbnN0YW5jZW9mIE5hbWUpXG4gICAgICAgIGNvZGUucHVzaChhcmcpO1xuICAgIGVsc2VcbiAgICAgICAgY29kZS5wdXNoKGludGVycG9sYXRlKGFyZykpO1xufVxuZXhwb3J0cy5hZGRDb2RlQXJnID0gYWRkQ29kZUFyZztcbmZ1bmN0aW9uIG9wdGltaXplKGV4cHIpIHtcbiAgICBsZXQgaSA9IDE7XG4gICAgd2hpbGUgKGkgPCBleHByLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgaWYgKGV4cHJbaV0gPT09IHBsdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG1lcmdlRXhwckl0ZW1zKGV4cHJbaSAtIDFdLCBleHByW2kgKyAxXSk7XG4gICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBleHByLnNwbGljZShpIC0gMSwgMywgcmVzKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHJbaSsrXSA9IFwiK1wiO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG59XG5mdW5jdGlvbiBtZXJnZUV4cHJJdGVtcyhhLCBiKSB7XG4gICAgaWYgKGIgPT09ICdcIlwiJylcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgaWYgKGEgPT09ICdcIlwiJylcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgaWYgKHR5cGVvZiBhID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKGIgaW5zdGFuY2VvZiBOYW1lIHx8IGFbYS5sZW5ndGggLSAxXSAhPT0gJ1wiJylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gYCR7YS5zbGljZSgwLCAtMSl9JHtifVwiYDtcbiAgICAgICAgaWYgKGJbMF0gPT09ICdcIicpXG4gICAgICAgICAgICByZXR1cm4gYS5zbGljZSgwLCAtMSkgKyBiLnNsaWNlKDEpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYiA9PSBcInN0cmluZ1wiICYmIGJbMF0gPT09ICdcIicgJiYgIShhIGluc3RhbmNlb2YgTmFtZSkpXG4gICAgICAgIHJldHVybiBgXCIke2F9JHtiLnNsaWNlKDEpfWA7XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gc3RyQ29uY2F0KGMxLCBjMikge1xuICAgIHJldHVybiBjMi5lbXB0eVN0cigpID8gYzEgOiBjMS5lbXB0eVN0cigpID8gYzIgOiBzdHIgYCR7YzF9JHtjMn1gO1xufVxuZXhwb3J0cy5zdHJDb25jYXQgPSBzdHJDb25jYXQ7XG4vLyBUT0RPIGRvIG5vdCBhbGxvdyBhcnJheXMgaGVyZVxuZnVuY3Rpb24gaW50ZXJwb2xhdGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcIm51bWJlclwiIHx8IHR5cGVvZiB4ID09IFwiYm9vbGVhblwiIHx8IHggPT09IG51bGxcbiAgICAgICAgPyB4XG4gICAgICAgIDogc2FmZVN0cmluZ2lmeShBcnJheS5pc0FycmF5KHgpID8geC5qb2luKFwiLFwiKSA6IHgpO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5KHgpIHtcbiAgICByZXR1cm4gbmV3IF9Db2RlKHNhZmVTdHJpbmdpZnkoeCkpO1xufVxuZXhwb3J0cy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5mdW5jdGlvbiBzYWZlU3RyaW5naWZ5KHgpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXFxcdTIwMjhcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgXCJcXFxcdTIwMjlcIik7XG59XG5leHBvcnRzLnNhZmVTdHJpbmdpZnkgPSBzYWZlU3RyaW5naWZ5O1xuZnVuY3Rpb24gZ2V0UHJvcGVydHkoa2V5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBrZXkgPT0gXCJzdHJpbmdcIiAmJiBleHBvcnRzLklERU5USUZJRVIudGVzdChrZXkpID8gbmV3IF9Db2RlKGAuJHtrZXl9YCkgOiBfIGBbJHtrZXl9XWA7XG59XG5leHBvcnRzLmdldFByb3BlcnR5ID0gZ2V0UHJvcGVydHk7XG4vL0RvZXMgYmVzdCBlZmZvcnQgdG8gZm9ybWF0IHRoZSBuYW1lIHByb3Blcmx5XG5mdW5jdGlvbiBnZXRFc21FeHBvcnROYW1lKGtleSkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09IFwic3RyaW5nXCIgJiYgZXhwb3J0cy5JREVOVElGSUVSLnRlc3Qoa2V5KSkge1xuICAgICAgICByZXR1cm4gbmV3IF9Db2RlKGAke2tleX1gKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBpbnZhbGlkIGV4cG9ydCBuYW1lOiAke2tleX0sIHVzZSBleHBsaWNpdCAkaWQgbmFtZSBtYXBwaW5nYCk7XG59XG5leHBvcnRzLmdldEVzbUV4cG9ydE5hbWUgPSBnZXRFc21FeHBvcnROYW1lO1xuZnVuY3Rpb24gcmVnZXhwQ29kZShyeCkge1xuICAgIHJldHVybiBuZXcgX0NvZGUocngudG9TdHJpbmcoKSk7XG59XG5leHBvcnRzLnJlZ2V4cENvZGUgPSByZWdleHBDb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub3IgPSBleHBvcnRzLmFuZCA9IGV4cG9ydHMubm90ID0gZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5vcGVyYXRvcnMgPSBleHBvcnRzLnZhcktpbmRzID0gZXhwb3J0cy5WYWx1ZVNjb3BlTmFtZSA9IGV4cG9ydHMuVmFsdWVTY29wZSA9IGV4cG9ydHMuU2NvcGUgPSBleHBvcnRzLk5hbWUgPSBleHBvcnRzLnJlZ2V4cENvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuZ2V0UHJvcGVydHkgPSBleHBvcnRzLm5pbCA9IGV4cG9ydHMuc3RyQ29uY2F0ID0gZXhwb3J0cy5zdHIgPSBleHBvcnRzLl8gPSB2b2lkIDA7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuY29uc3Qgc2NvcGVfMSA9IHJlcXVpcmUoXCIuL3Njb3BlXCIpO1xudmFyIGNvZGVfMiA9IHJlcXVpcmUoXCIuL2NvZGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0ckNvbmNhdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnN0ckNvbmNhdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldFByb3BlcnR5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuZ2V0UHJvcGVydHk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHJpbmdpZnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZWdleHBDb2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIucmVnZXhwQ29kZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5OYW1lOyB9IH0pO1xudmFyIHNjb3BlXzIgPSByZXF1aXJlKFwiLi9zY29wZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNjb3BlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLlNjb3BlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVTY29wZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi5WYWx1ZVNjb3BlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVTY29wZU5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIuVmFsdWVTY29wZU5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2YXJLaW5kc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi52YXJLaW5kczsgfSB9KTtcbmV4cG9ydHMub3BlcmF0b3JzID0ge1xuICAgIEdUOiBuZXcgY29kZV8xLl9Db2RlKFwiPlwiKSxcbiAgICBHVEU6IG5ldyBjb2RlXzEuX0NvZGUoXCI+PVwiKSxcbiAgICBMVDogbmV3IGNvZGVfMS5fQ29kZShcIjxcIiksXG4gICAgTFRFOiBuZXcgY29kZV8xLl9Db2RlKFwiPD1cIiksXG4gICAgRVE6IG5ldyBjb2RlXzEuX0NvZGUoXCI9PT1cIiksXG4gICAgTkVROiBuZXcgY29kZV8xLl9Db2RlKFwiIT09XCIpLFxuICAgIE5PVDogbmV3IGNvZGVfMS5fQ29kZShcIiFcIiksXG4gICAgT1I6IG5ldyBjb2RlXzEuX0NvZGUoXCJ8fFwiKSxcbiAgICBBTkQ6IG5ldyBjb2RlXzEuX0NvZGUoXCImJlwiKSxcbiAgICBBREQ6IG5ldyBjb2RlXzEuX0NvZGUoXCIrXCIpLFxufTtcbmNsYXNzIE5vZGUge1xuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKF9uYW1lcywgX2NvbnN0YW50cykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5jbGFzcyBEZWYgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YXJLaW5kLCBuYW1lLCByaHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5yaHMgPSByaHM7XG4gICAgfVxuICAgIHJlbmRlcih7IGVzNSwgX24gfSkge1xuICAgICAgICBjb25zdCB2YXJLaW5kID0gZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiB0aGlzLnZhcktpbmQ7XG4gICAgICAgIGNvbnN0IHJocyA9IHRoaXMucmhzID09PSB1bmRlZmluZWQgPyBcIlwiIDogYCA9ICR7dGhpcy5yaHN9YDtcbiAgICAgICAgcmV0dXJuIGAke3ZhcktpbmR9ICR7dGhpcy5uYW1lfSR7cmhzfTtgICsgX247XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIW5hbWVzW3RoaXMubmFtZS5zdHJdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5yaHMpXG4gICAgICAgICAgICB0aGlzLnJocyA9IG9wdGltaXplRXhwcih0aGlzLnJocywgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJocyBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZU9yTmFtZSA/IHRoaXMucmhzLm5hbWVzIDoge307XG4gICAgfVxufVxuY2xhc3MgQXNzaWduIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IobGhzLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGhzID0gbGhzO1xuICAgICAgICB0aGlzLnJocyA9IHJocztcbiAgICAgICAgdGhpcy5zaWRlRWZmZWN0cyA9IHNpZGVFZmZlY3RzO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxoc30gPSAke3RoaXMucmhzfTtgICsgX247XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAodGhpcy5saHMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSAmJiAhbmFtZXNbdGhpcy5saHMuc3RyXSAmJiAhdGhpcy5zaWRlRWZmZWN0cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yaHMgPSBvcHRpbWl6ZUV4cHIodGhpcy5yaHMsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHRoaXMubGhzIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyB7fSA6IHsgLi4udGhpcy5saHMubmFtZXMgfTtcbiAgICAgICAgcmV0dXJuIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy5yaHMpO1xuICAgIH1cbn1cbmNsYXNzIEFzc2lnbk9wIGV4dGVuZHMgQXNzaWduIHtcbiAgICBjb25zdHJ1Y3RvcihsaHMsIG9wLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHN1cGVyKGxocywgcmhzLCBzaWRlRWZmZWN0cyk7XG4gICAgICAgIHRoaXMub3AgPSBvcDtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5saHN9ICR7dGhpcy5vcH09ICR7dGhpcy5yaHN9O2AgKyBfbjtcbiAgICB9XG59XG5jbGFzcyBMYWJlbCBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lcyA9IHt9O1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVsfTpgICsgX247XG4gICAgfVxufVxuY2xhc3MgQnJlYWsgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZXMgPSB7fTtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWwgPyBgICR7dGhpcy5sYWJlbH1gIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIGBicmVhayR7bGFiZWx9O2AgKyBfbjtcbiAgICB9XG59XG5jbGFzcyBUaHJvdyBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYHRocm93ICR7dGhpcy5lcnJvcn07YCArIF9uO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yLm5hbWVzO1xuICAgIH1cbn1cbmNsYXNzIEFueUNvZGUgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29kZX07YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb2RlfWAgPyB0aGlzIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gb3B0aW1pemVFeHByKHRoaXMuY29kZSwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZGUgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGVPck5hbWUgPyB0aGlzLmNvZGUubmFtZXMgOiB7fTtcbiAgICB9XG59XG5jbGFzcyBQYXJlbnROb2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3Iobm9kZXMgPSBbXSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLnJlZHVjZSgoY29kZSwgbikgPT4gY29kZSArIG4ucmVuZGVyKG9wdHMpLCBcIlwiKTtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSBub2Rlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2Rlc1tpXS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuKSlcbiAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSwgLi4ubik7XG4gICAgICAgICAgICBlbHNlIGlmIChuKVxuICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gbjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVzLmxlbmd0aCA+IDAgPyB0aGlzIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSBub2Rlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIC8vIGl0ZXJhdGluZyBiYWNrd2FyZHMgaW1wcm92ZXMgMS1wYXNzIG9wdGltaXphdGlvblxuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKG4ub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHN1YnRyYWN0TmFtZXMobmFtZXMsIG4ubmFtZXMpO1xuICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2Rlcy5sZW5ndGggPiAwID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoKG5hbWVzLCBuKSA9PiBhZGROYW1lcyhuYW1lcywgbi5uYW1lcyksIHt9KTtcbiAgICB9XG59XG5jbGFzcyBCbG9ja05vZGUgZXh0ZW5kcyBQYXJlbnROb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJ7XCIgKyBvcHRzLl9uICsgc3VwZXIucmVuZGVyKG9wdHMpICsgXCJ9XCIgKyBvcHRzLl9uO1xuICAgIH1cbn1cbmNsYXNzIFJvb3QgZXh0ZW5kcyBQYXJlbnROb2RlIHtcbn1cbmNsYXNzIEVsc2UgZXh0ZW5kcyBCbG9ja05vZGUge1xufVxuRWxzZS5raW5kID0gXCJlbHNlXCI7XG5jbGFzcyBJZiBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29uZGl0aW9uLCBub2Rlcykge1xuICAgICAgICBzdXBlcihub2Rlcyk7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBsZXQgY29kZSA9IGBpZigke3RoaXMuY29uZGl0aW9ufSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5lbHNlKVxuICAgICAgICAgICAgY29kZSArPSBcImVsc2UgXCIgKyB0aGlzLmVsc2UucmVuZGVyKG9wdHMpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgc3VwZXIub3B0aW1pemVOb2RlcygpO1xuICAgICAgICBjb25zdCBjb25kID0gdGhpcy5jb25kaXRpb247XG4gICAgICAgIGlmIChjb25kID09PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXM7IC8vIGVsc2UgaXMgaWdub3JlZCBoZXJlXG4gICAgICAgIGxldCBlID0gdGhpcy5lbHNlO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgY29uc3QgbnMgPSBlLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgICAgIGUgPSB0aGlzLmVsc2UgPSBBcnJheS5pc0FycmF5KG5zKSA/IG5ldyBFbHNlKG5zKSA6IG5zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBpZiAoY29uZCA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBJZiA/IGUgOiBlLm5vZGVzO1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZihub3QoY29uZCksIGUgaW5zdGFuY2VvZiBJZiA/IFtlXSA6IGUubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kID09PSBmYWxzZSB8fCAhdGhpcy5ub2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5lbHNlID0gKF9hID0gdGhpcy5lbHNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgaWYgKCEoc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB8fCB0aGlzLmVsc2UpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IG9wdGltaXplRXhwcih0aGlzLmNvbmRpdGlvbiwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gc3VwZXIubmFtZXM7XG4gICAgICAgIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy5jb25kaXRpb24pO1xuICAgICAgICBpZiAodGhpcy5lbHNlKVxuICAgICAgICAgICAgYWRkTmFtZXMobmFtZXMsIHRoaXMuZWxzZS5uYW1lcyk7XG4gICAgICAgIHJldHVybiBuYW1lcztcbiAgICB9XG59XG5JZi5raW5kID0gXCJpZlwiO1xuY2xhc3MgRm9yIGV4dGVuZHMgQmxvY2tOb2RlIHtcbn1cbkZvci5raW5kID0gXCJmb3JcIjtcbmNsYXNzIEZvckxvb3AgZXh0ZW5kcyBGb3Ige1xuICAgIGNvbnN0cnVjdG9yKGl0ZXJhdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLml0ZXJhdGlvbiA9IGl0ZXJhdGlvbjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGBmb3IoJHt0aGlzLml0ZXJhdGlvbn0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICghc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pdGVyYXRpb24gPSBvcHRpbWl6ZUV4cHIodGhpcy5pdGVyYXRpb24sIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gYWRkTmFtZXMoc3VwZXIubmFtZXMsIHRoaXMuaXRlcmF0aW9uLm5hbWVzKTtcbiAgICB9XG59XG5jbGFzcyBGb3JSYW5nZSBleHRlbmRzIEZvciB7XG4gICAgY29uc3RydWN0b3IodmFyS2luZCwgbmFtZSwgZnJvbSwgdG8pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgdGhpcy50byA9IHRvO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBjb25zdCB2YXJLaW5kID0gb3B0cy5lczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHRoaXMudmFyS2luZDtcbiAgICAgICAgY29uc3QgeyBuYW1lLCBmcm9tLCB0byB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGBmb3IoJHt2YXJLaW5kfSAke25hbWV9PSR7ZnJvbX07ICR7bmFtZX08JHt0b307ICR7bmFtZX0rKylgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gYWRkRXhwck5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLmZyb20pO1xuICAgICAgICByZXR1cm4gYWRkRXhwck5hbWVzKG5hbWVzLCB0aGlzLnRvKTtcbiAgICB9XG59XG5jbGFzcyBGb3JJdGVyIGV4dGVuZHMgRm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihsb29wLCB2YXJLaW5kLCBuYW1lLCBpdGVyYWJsZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xuICAgICAgICB0aGlzLnZhcktpbmQgPSB2YXJLaW5kO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLml0ZXJhYmxlID0gaXRlcmFibGU7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dGhpcy52YXJLaW5kfSAke3RoaXMubmFtZX0gJHt0aGlzLmxvb3B9ICR7dGhpcy5pdGVyYWJsZX0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICghc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pdGVyYWJsZSA9IG9wdGltaXplRXhwcih0aGlzLml0ZXJhYmxlLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGFkZE5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLml0ZXJhYmxlLm5hbWVzKTtcbiAgICB9XG59XG5jbGFzcyBGdW5jIGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBhcmdzLCBhc3luYykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLmFzeW5jID0gYXN5bmM7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIGNvbnN0IF9hc3luYyA9IHRoaXMuYXN5bmMgPyBcImFzeW5jIFwiIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIGAke19hc3luY31mdW5jdGlvbiAke3RoaXMubmFtZX0oJHt0aGlzLmFyZ3N9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuRnVuYy5raW5kID0gXCJmdW5jXCI7XG5jbGFzcyBSZXR1cm4gZXh0ZW5kcyBQYXJlbnROb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJyZXR1cm4gXCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuUmV0dXJuLmtpbmQgPSBcInJldHVyblwiO1xuY2xhc3MgVHJ5IGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBsZXQgY29kZSA9IFwidHJ5XCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmNhdGNoKVxuICAgICAgICAgICAgY29kZSArPSB0aGlzLmNhdGNoLnJlbmRlcihvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseSlcbiAgICAgICAgICAgIGNvZGUgKz0gdGhpcy5maW5hbGx5LnJlbmRlcihvcHRzKTtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgKF9hID0gdGhpcy5jYXRjaCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgKF9iID0gdGhpcy5maW5hbGx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub3B0aW1pemVOb2RlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIChfYSA9IHRoaXMuY2F0Y2gpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICAoX2IgPSB0aGlzLmZpbmFsbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHN1cGVyLm5hbWVzO1xuICAgICAgICBpZiAodGhpcy5jYXRjaClcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmNhdGNoLm5hbWVzKTtcbiAgICAgICAgaWYgKHRoaXMuZmluYWxseSlcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmZpbmFsbHkubmFtZXMpO1xuICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgfVxufVxuY2xhc3MgQ2F0Y2ggZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGBjYXRjaCgke3RoaXMuZXJyb3J9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuQ2F0Y2gua2luZCA9IFwiY2F0Y2hcIjtcbmNsYXNzIEZpbmFsbHkgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBcImZpbmFsbHlcIiArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG59XG5GaW5hbGx5LmtpbmQgPSBcImZpbmFsbHlcIjtcbmNsYXNzIENvZGVHZW4ge1xuICAgIGNvbnN0cnVjdG9yKGV4dFNjb3BlLCBvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX2Jsb2NrU3RhcnRzID0gW107XG4gICAgICAgIHRoaXMuX2NvbnN0YW50cyA9IHt9O1xuICAgICAgICB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIF9uOiBvcHRzLmxpbmVzID8gXCJcXG5cIiA6IFwiXCIgfTtcbiAgICAgICAgdGhpcy5fZXh0U2NvcGUgPSBleHRTY29wZTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBuZXcgc2NvcGVfMS5TY29wZSh7IHBhcmVudDogZXh0U2NvcGUgfSk7XG4gICAgICAgIHRoaXMuX25vZGVzID0gW25ldyBSb290KCldO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3QucmVuZGVyKHRoaXMub3B0cyk7XG4gICAgfVxuICAgIC8vIHJldHVybnMgdW5pcXVlIG5hbWUgaW4gdGhlIGludGVybmFsIHNjb3BlXG4gICAgbmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlLm5hbWUocHJlZml4KTtcbiAgICB9XG4gICAgLy8gcmVzZXJ2ZXMgdW5pcXVlIG5hbWUgaW4gdGhlIGV4dGVybmFsIHNjb3BlXG4gICAgc2NvcGVOYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUubmFtZShwcmVmaXgpO1xuICAgIH1cbiAgICAvLyByZXNlcnZlcyB1bmlxdWUgbmFtZSBpbiB0aGUgZXh0ZXJuYWwgc2NvcGUgYW5kIGFzc2lnbnMgdmFsdWUgdG8gaXRcbiAgICBzY29wZVZhbHVlKHByZWZpeE9yTmFtZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX2V4dFNjb3BlLnZhbHVlKHByZWZpeE9yTmFtZSwgdmFsdWUpO1xuICAgICAgICBjb25zdCB2cyA9IHRoaXMuX3ZhbHVlc1tuYW1lLnByZWZpeF0gfHwgKHRoaXMuX3ZhbHVlc1tuYW1lLnByZWZpeF0gPSBuZXcgU2V0KCkpO1xuICAgICAgICB2cy5hZGQobmFtZSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBnZXRTY29wZVZhbHVlKHByZWZpeCwga2V5T3JSZWYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLmdldFZhbHVlKHByZWZpeCwga2V5T3JSZWYpO1xuICAgIH1cbiAgICAvLyByZXR1cm4gY29kZSB0aGF0IGFzc2lnbnMgdmFsdWVzIGluIHRoZSBleHRlcm5hbCBzY29wZSB0byB0aGUgbmFtZXMgdGhhdCBhcmUgdXNlZCBpbnRlcm5hbGx5XG4gICAgLy8gKHNhbWUgbmFtZXMgdGhhdCB3ZXJlIHJldHVybmVkIGJ5IGdlbi5zY29wZU5hbWUgb3IgZ2VuLnNjb3BlVmFsdWUpXG4gICAgc2NvcGVSZWZzKHNjb3BlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUuc2NvcGVSZWZzKHNjb3BlTmFtZSwgdGhpcy5fdmFsdWVzKTtcbiAgICB9XG4gICAgc2NvcGVDb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUuc2NvcGVDb2RlKHRoaXMuX3ZhbHVlcyk7XG4gICAgfVxuICAgIF9kZWYodmFyS2luZCwgbmFtZU9yUHJlZml4LCByaHMsIGNvbnN0YW50KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgaWYgKHJocyAhPT0gdW5kZWZpbmVkICYmIGNvbnN0YW50KVxuICAgICAgICAgICAgdGhpcy5fY29uc3RhbnRzW25hbWUuc3RyXSA9IHJocztcbiAgICAgICAgdGhpcy5fbGVhZk5vZGUobmV3IERlZih2YXJLaW5kLCBuYW1lLCByaHMpKTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIC8vIGBjb25zdGAgZGVjbGFyYXRpb24gKGB2YXJgIGluIGVzNSBtb2RlKVxuICAgIGNvbnN0KG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLmNvbnN0LCBuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KTtcbiAgICB9XG4gICAgLy8gYGxldGAgZGVjbGFyYXRpb24gd2l0aCBvcHRpb25hbCBhc3NpZ25tZW50IChgdmFyYCBpbiBlczUgbW9kZSlcbiAgICBsZXQobmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmKHNjb3BlXzEudmFyS2luZHMubGV0LCBuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KTtcbiAgICB9XG4gICAgLy8gYHZhcmAgZGVjbGFyYXRpb24gd2l0aCBvcHRpb25hbCBhc3NpZ25tZW50XG4gICAgdmFyKG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLnZhciwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGFzc2lnbm1lbnQgY29kZVxuICAgIGFzc2lnbihsaHMsIHJocywgc2lkZUVmZmVjdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBBc3NpZ24obGhzLCByaHMsIHNpZGVFZmZlY3RzKSk7XG4gICAgfVxuICAgIC8vIGArPWAgY29kZVxuICAgIGFkZChsaHMsIHJocykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IEFzc2lnbk9wKGxocywgZXhwb3J0cy5vcGVyYXRvcnMuQURELCByaHMpKTtcbiAgICB9XG4gICAgLy8gYXBwZW5kcyBwYXNzZWQgU2FmZUV4cHIgdG8gY29kZSBvciBleGVjdXRlcyBCbG9ja1xuICAgIGNvZGUoYykge1xuICAgICAgICBpZiAodHlwZW9mIGMgPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgYygpO1xuICAgICAgICBlbHNlIGlmIChjICE9PSBjb2RlXzEubmlsKVxuICAgICAgICAgICAgdGhpcy5fbGVhZk5vZGUobmV3IEFueUNvZGUoYykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gcmV0dXJucyBjb2RlIGZvciBvYmplY3QgbGl0ZXJhbCBmb3IgdGhlIHBhc3NlZCBhcmd1bWVudCBsaXN0IG9mIGtleS12YWx1ZSBwYWlyc1xuICAgIG9iamVjdCguLi5rZXlWYWx1ZXMpIHtcbiAgICAgICAgY29uc3QgY29kZSA9IFtcIntcIl07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGtleVZhbHVlcykge1xuICAgICAgICAgICAgaWYgKGNvZGUubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICBjb2RlLnB1c2goXCIsXCIpO1xuICAgICAgICAgICAgY29kZS5wdXNoKGtleSk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB2YWx1ZSB8fCB0aGlzLm9wdHMuZXM1KSB7XG4gICAgICAgICAgICAgICAgY29kZS5wdXNoKFwiOlwiKTtcbiAgICAgICAgICAgICAgICAoMCwgY29kZV8xLmFkZENvZGVBcmcpKGNvZGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb2RlLnB1c2goXCJ9XCIpO1xuICAgICAgICByZXR1cm4gbmV3IGNvZGVfMS5fQ29kZShjb2RlKTtcbiAgICB9XG4gICAgLy8gYGlmYCBjbGF1c2UgKG9yIHN0YXRlbWVudCBpZiBgdGhlbkJvZHlgIGFuZCwgb3B0aW9uYWxseSwgYGVsc2VCb2R5YCBhcmUgcGFzc2VkKVxuICAgIGlmKGNvbmRpdGlvbiwgdGhlbkJvZHksIGVsc2VCb2R5KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShuZXcgSWYoY29uZGl0aW9uKSk7XG4gICAgICAgIGlmICh0aGVuQm9keSAmJiBlbHNlQm9keSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlKHRoZW5Cb2R5KS5lbHNlKCkuY29kZShlbHNlQm9keSkuZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGVuQm9keSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlKHRoZW5Cb2R5KS5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVsc2VCb2R5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwiZWxzZVwiIGJvZHkgd2l0aG91dCBcInRoZW5cIiBib2R5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGBlbHNlIGlmYCBjbGF1c2UgLSBpbnZhbGlkIHdpdGhvdXQgYGlmYCBvciBhZnRlciBgZWxzZWAgY2xhdXNlc1xuICAgIGVsc2VJZihjb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vsc2VOb2RlKG5ldyBJZihjb25kaXRpb24pKTtcbiAgICB9XG4gICAgLy8gYGVsc2VgIGNsYXVzZSAtIG9ubHkgdmFsaWQgYWZ0ZXIgYGlmYCBvciBgZWxzZSBpZmAgY2xhdXNlc1xuICAgIGVsc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbHNlTm9kZShuZXcgRWxzZSgpKTtcbiAgICB9XG4gICAgLy8gZW5kIGBpZmAgc3RhdGVtZW50IChuZWVkZWQgaWYgZ2VuLmlmIHdhcyB1c2VkIG9ubHkgd2l0aCBjb25kaXRpb24pXG4gICAgZW5kSWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoSWYsIEVsc2UpO1xuICAgIH1cbiAgICBfZm9yKG5vZGUsIGZvckJvZHkpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5vZGUpO1xuICAgICAgICBpZiAoZm9yQm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShmb3JCb2R5KS5lbmRGb3IoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGEgZ2VuZXJpYyBgZm9yYCBjbGF1c2UgKG9yIHN0YXRlbWVudCBpZiBgZm9yQm9keWAgaXMgcGFzc2VkKVxuICAgIGZvcihpdGVyYXRpb24sIGZvckJvZHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9yTG9vcChpdGVyYXRpb24pLCBmb3JCb2R5KTtcbiAgICB9XG4gICAgLy8gYGZvcmAgc3RhdGVtZW50IGZvciBhIHJhbmdlIG9mIHZhbHVlc1xuICAgIGZvclJhbmdlKG5hbWVPclByZWZpeCwgZnJvbSwgdG8sIGZvckJvZHksIHZhcktpbmQgPSB0aGlzLm9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiBzY29wZV8xLnZhcktpbmRzLmxldCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvclJhbmdlKHZhcktpbmQsIG5hbWUsIGZyb20sIHRvKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGBmb3Itb2ZgIHN0YXRlbWVudCAoaW4gZXM1IG1vZGUgcmVwbGFjZSB3aXRoIGEgbm9ybWFsIGZvciBsb29wKVxuICAgIGZvck9mKG5hbWVPclByZWZpeCwgaXRlcmFibGUsIGZvckJvZHksIHZhcktpbmQgPSBzY29wZV8xLnZhcktpbmRzLmNvbnN0KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5lczUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IGl0ZXJhYmxlIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyBpdGVyYWJsZSA6IHRoaXMudmFyKFwiX2FyclwiLCBpdGVyYWJsZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JSYW5nZShcIl9pXCIsIDAsICgwLCBjb2RlXzEuXykgYCR7YXJyfS5sZW5ndGhgLCAoaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFyKG5hbWUsICgwLCBjb2RlXzEuXykgYCR7YXJyfVske2l9XWApO1xuICAgICAgICAgICAgICAgIGZvckJvZHkobmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JJdGVyKFwib2ZcIiwgdmFyS2luZCwgbmFtZSwgaXRlcmFibGUpLCAoKSA9PiBmb3JCb2R5KG5hbWUpKTtcbiAgICB9XG4gICAgLy8gYGZvci1pbmAgc3RhdGVtZW50LlxuICAgIC8vIFdpdGggb3B0aW9uIGBvd25Qcm9wZXJ0aWVzYCByZXBsYWNlZCB3aXRoIGEgYGZvci1vZmAgbG9vcCBmb3Igb2JqZWN0IGtleXNcbiAgICBmb3JJbihuYW1lT3JQcmVmaXgsIG9iaiwgZm9yQm9keSwgdmFyS2luZCA9IHRoaXMub3B0cy5lczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHNjb3BlXzEudmFyS2luZHMuY29uc3QpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5vd25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JPZihuYW1lT3JQcmVmaXgsICgwLCBjb2RlXzEuXykgYE9iamVjdC5rZXlzKCR7b2JqfSlgLCBmb3JCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvckl0ZXIoXCJpblwiLCB2YXJLaW5kLCBuYW1lLCBvYmopLCAoKSA9PiBmb3JCb2R5KG5hbWUpKTtcbiAgICB9XG4gICAgLy8gZW5kIGBmb3JgIGxvb3BcbiAgICBlbmRGb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoRm9yKTtcbiAgICB9XG4gICAgLy8gYGxhYmVsYCBzdGF0ZW1lbnRcbiAgICBsYWJlbChsYWJlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IExhYmVsKGxhYmVsKSk7XG4gICAgfVxuICAgIC8vIGBicmVha2Agc3RhdGVtZW50XG4gICAgYnJlYWsobGFiZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBCcmVhayhsYWJlbCkpO1xuICAgIH1cbiAgICAvLyBgcmV0dXJuYCBzdGF0ZW1lbnRcbiAgICByZXR1cm4odmFsdWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBSZXR1cm4oKTtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5vZGUpO1xuICAgICAgICB0aGlzLmNvZGUodmFsdWUpO1xuICAgICAgICBpZiAobm9kZS5ub2Rlcy5sZW5ndGggIT09IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwicmV0dXJuXCIgc2hvdWxkIGhhdmUgb25lIG5vZGUnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShSZXR1cm4pO1xuICAgIH1cbiAgICAvLyBgdHJ5YCBzdGF0ZW1lbnRcbiAgICB0cnkodHJ5Qm9keSwgY2F0Y2hDb2RlLCBmaW5hbGx5Q29kZSkge1xuICAgICAgICBpZiAoIWNhdGNoQ29kZSAmJiAhZmluYWxseUNvZGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwidHJ5XCIgd2l0aG91dCBcImNhdGNoXCIgYW5kIFwiZmluYWxseVwiJyk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgVHJ5KCk7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgdGhpcy5jb2RlKHRyeUJvZHkpO1xuICAgICAgICBpZiAoY2F0Y2hDb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMubmFtZShcImVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG5vZGUuY2F0Y2ggPSBuZXcgQ2F0Y2goZXJyb3IpO1xuICAgICAgICAgICAgY2F0Y2hDb2RlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWxseUNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJOb2RlID0gbm9kZS5maW5hbGx5ID0gbmV3IEZpbmFsbHkoKTtcbiAgICAgICAgICAgIHRoaXMuY29kZShmaW5hbGx5Q29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShDYXRjaCwgRmluYWxseSk7XG4gICAgfVxuICAgIC8vIGB0aHJvd2Agc3RhdGVtZW50XG4gICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBUaHJvdyhlcnJvcikpO1xuICAgIH1cbiAgICAvLyBzdGFydCBzZWxmLWJhbGFuY2luZyBibG9ja1xuICAgIGJsb2NrKGJvZHksIG5vZGVDb3VudCkge1xuICAgICAgICB0aGlzLl9ibG9ja1N0YXJ0cy5wdXNoKHRoaXMuX25vZGVzLmxlbmd0aCk7XG4gICAgICAgIGlmIChib2R5KVxuICAgICAgICAgICAgdGhpcy5jb2RlKGJvZHkpLmVuZEJsb2NrKG5vZGVDb3VudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBlbmQgdGhlIGN1cnJlbnQgc2VsZi1iYWxhbmNpbmcgYmxvY2tcbiAgICBlbmRCbG9jayhub2RlQ291bnQpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5fYmxvY2tTdGFydHMucG9wKCk7XG4gICAgICAgIGlmIChsZW4gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IG5vdCBpbiBzZWxmLWJhbGFuY2luZyBibG9ja1wiKTtcbiAgICAgICAgY29uc3QgdG9DbG9zZSA9IHRoaXMuX25vZGVzLmxlbmd0aCAtIGxlbjtcbiAgICAgICAgaWYgKHRvQ2xvc2UgPCAwIHx8IChub2RlQ291bnQgIT09IHVuZGVmaW5lZCAmJiB0b0Nsb3NlICE9PSBub2RlQ291bnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IHdyb25nIG51bWJlciBvZiBub2RlczogJHt0b0Nsb3NlfSB2cyAke25vZGVDb3VudH0gZXhwZWN0ZWRgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ub2Rlcy5sZW5ndGggPSBsZW47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBgZnVuY3Rpb25gIGhlYWRpbmcgKG9yIGRlZmluaXRpb24gaWYgZnVuY0JvZHkgaXMgcGFzc2VkKVxuICAgIGZ1bmMobmFtZSwgYXJncyA9IGNvZGVfMS5uaWwsIGFzeW5jLCBmdW5jQm9keSkge1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobmV3IEZ1bmMobmFtZSwgYXJncywgYXN5bmMpKTtcbiAgICAgICAgaWYgKGZ1bmNCb2R5KVxuICAgICAgICAgICAgdGhpcy5jb2RlKGZ1bmNCb2R5KS5lbmRGdW5jKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBlbmQgZnVuY3Rpb24gZGVmaW5pdGlvblxuICAgIGVuZEZ1bmMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoRnVuYyk7XG4gICAgfVxuICAgIG9wdGltaXplKG4gPSAxKSB7XG4gICAgICAgIHdoaWxlIChuLS0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yb290Lm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3Qub3B0aW1pemVOYW1lcyh0aGlzLl9yb290Lm5hbWVzLCB0aGlzLl9jb25zdGFudHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9sZWFmTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJOb2RlLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfYmxvY2tOb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5fY3Vyck5vZGUubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgdGhpcy5fbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gICAgX2VuZEJsb2NrTm9kZShOMSwgTjIpIHtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuX2N1cnJOb2RlO1xuICAgICAgICBpZiAobiBpbnN0YW5jZW9mIE4xIHx8IChOMiAmJiBuIGluc3RhbmNlb2YgTjIpKSB7XG4gICAgICAgICAgICB0aGlzLl9ub2Rlcy5wb3AoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogbm90IGluIGJsb2NrIFwiJHtOMiA/IGAke04xLmtpbmR9LyR7TjIua2luZH1gIDogTjEua2luZH1cImApO1xuICAgIH1cbiAgICBfZWxzZU5vZGUobm9kZSkge1xuICAgICAgICBjb25zdCBuID0gdGhpcy5fY3Vyck5vZGU7XG4gICAgICAgIGlmICghKG4gaW5zdGFuY2VvZiBJZikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29kZUdlbjogXCJlbHNlXCIgd2l0aG91dCBcImlmXCInKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG4uZWxzZSA9IG5vZGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgX3Jvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2Rlc1swXTtcbiAgICB9XG4gICAgZ2V0IF9jdXJyTm9kZSgpIHtcbiAgICAgICAgY29uc3QgbnMgPSB0aGlzLl9ub2RlcztcbiAgICAgICAgcmV0dXJuIG5zW25zLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBzZXQgX2N1cnJOb2RlKG5vZGUpIHtcbiAgICAgICAgY29uc3QgbnMgPSB0aGlzLl9ub2RlcztcbiAgICAgICAgbnNbbnMubGVuZ3RoIC0gMV0gPSBub2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29kZUdlbiA9IENvZGVHZW47XG5mdW5jdGlvbiBhZGROYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIGZvciAoY29uc3QgbiBpbiBmcm9tKVxuICAgICAgICBuYW1lc1tuXSA9IChuYW1lc1tuXSB8fCAwKSArIChmcm9tW25dIHx8IDApO1xuICAgIHJldHVybiBuYW1lcztcbn1cbmZ1bmN0aW9uIGFkZEV4cHJOYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIHJldHVybiBmcm9tIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlT3JOYW1lID8gYWRkTmFtZXMobmFtZXMsIGZyb20ubmFtZXMpIDogbmFtZXM7XG59XG5mdW5jdGlvbiBvcHRpbWl6ZUV4cHIoZXhwciwgbmFtZXMsIGNvbnN0YW50cykge1xuICAgIGlmIChleHByIGluc3RhbmNlb2YgY29kZV8xLk5hbWUpXG4gICAgICAgIHJldHVybiByZXBsYWNlTmFtZShleHByKTtcbiAgICBpZiAoIWNhbk9wdGltaXplKGV4cHIpKVxuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICByZXR1cm4gbmV3IGNvZGVfMS5fQ29kZShleHByLl9pdGVtcy5yZWR1Y2UoKGl0ZW1zLCBjKSA9PiB7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgY29kZV8xLk5hbWUpXG4gICAgICAgICAgICBjID0gcmVwbGFjZU5hbWUoYyk7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlKVxuICAgICAgICAgICAgaXRlbXMucHVzaCguLi5jLl9pdGVtcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goYyk7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9LCBbXSkpO1xuICAgIGZ1bmN0aW9uIHJlcGxhY2VOYW1lKG4pIHtcbiAgICAgICAgY29uc3QgYyA9IGNvbnN0YW50c1tuLnN0cl07XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQgfHwgbmFtZXNbbi5zdHJdICE9PSAxKVxuICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIGRlbGV0ZSBuYW1lc1tuLnN0cl07XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5PcHRpbWl6ZShlKSB7XG4gICAgICAgIHJldHVybiAoZSBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZSAmJlxuICAgICAgICAgICAgZS5faXRlbXMuc29tZSgoYykgPT4gYyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lICYmIG5hbWVzW2Muc3RyXSA9PT0gMSAmJiBjb25zdGFudHNbYy5zdHJdICE9PSB1bmRlZmluZWQpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJ0cmFjdE5hbWVzKG5hbWVzLCBmcm9tKSB7XG4gICAgZm9yIChjb25zdCBuIGluIGZyb20pXG4gICAgICAgIG5hbWVzW25dID0gKG5hbWVzW25dIHx8IDApIC0gKGZyb21bbl0gfHwgMCk7XG59XG5mdW5jdGlvbiBub3QoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgeCA9PSBcIm51bWJlclwiIHx8IHggPT09IG51bGwgPyAheCA6ICgwLCBjb2RlXzEuXykgYCEke3Bhcih4KX1gO1xufVxuZXhwb3J0cy5ub3QgPSBub3Q7XG5jb25zdCBhbmRDb2RlID0gbWFwcGVuZChleHBvcnRzLm9wZXJhdG9ycy5BTkQpO1xuLy8gYm9vbGVhbiBBTkQgKCYmKSBleHByZXNzaW9uIHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbmZ1bmN0aW9uIGFuZCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKGFuZENvZGUpO1xufVxuZXhwb3J0cy5hbmQgPSBhbmQ7XG5jb25zdCBvckNvZGUgPSBtYXBwZW5kKGV4cG9ydHMub3BlcmF0b3JzLk9SKTtcbi8vIGJvb2xlYW4gT1IgKHx8KSBleHByZXNzaW9uIHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbmZ1bmN0aW9uIG9yKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5yZWR1Y2Uob3JDb2RlKTtcbn1cbmV4cG9ydHMub3IgPSBvcjtcbmZ1bmN0aW9uIG1hcHBlbmQob3ApIHtcbiAgICByZXR1cm4gKHgsIHkpID0+ICh4ID09PSBjb2RlXzEubmlsID8geSA6IHkgPT09IGNvZGVfMS5uaWwgPyB4IDogKDAsIGNvZGVfMS5fKSBgJHtwYXIoeCl9ICR7b3B9ICR7cGFyKHkpfWApO1xufVxuZnVuY3Rpb24gcGFyKHgpIHtcbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8geCA6ICgwLCBjb2RlXzEuXykgYCgke3h9KWA7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmFsdWVTY29wZSA9IGV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBleHBvcnRzLlNjb3BlID0gZXhwb3J0cy52YXJLaW5kcyA9IGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuY2xhc3MgVmFsdWVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKGBDb2RlR2VuOiBcImNvZGVcIiBmb3IgJHtuYW1lfSBub3QgZGVmaW5lZGApO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmFtZS52YWx1ZTtcbiAgICB9XG59XG52YXIgVXNlZFZhbHVlU3RhdGU7XG4oZnVuY3Rpb24gKFVzZWRWYWx1ZVN0YXRlKSB7XG4gICAgVXNlZFZhbHVlU3RhdGVbVXNlZFZhbHVlU3RhdGVbXCJTdGFydGVkXCJdID0gMF0gPSBcIlN0YXJ0ZWRcIjtcbiAgICBVc2VkVmFsdWVTdGF0ZVtVc2VkVmFsdWVTdGF0ZVtcIkNvbXBsZXRlZFwiXSA9IDFdID0gXCJDb21wbGV0ZWRcIjtcbn0pKFVzZWRWYWx1ZVN0YXRlID0gZXhwb3J0cy5Vc2VkVmFsdWVTdGF0ZSB8fCAoZXhwb3J0cy5Vc2VkVmFsdWVTdGF0ZSA9IHt9KSk7XG5leHBvcnRzLnZhcktpbmRzID0ge1xuICAgIGNvbnN0OiBuZXcgY29kZV8xLk5hbWUoXCJjb25zdFwiKSxcbiAgICBsZXQ6IG5ldyBjb2RlXzEuTmFtZShcImxldFwiKSxcbiAgICB2YXI6IG5ldyBjb2RlXzEuTmFtZShcInZhclwiKSxcbn07XG5jbGFzcyBTY29wZSB7XG4gICAgY29uc3RydWN0b3IoeyBwcmVmaXhlcywgcGFyZW50IH0gPSB7fSkge1xuICAgICAgICB0aGlzLl9uYW1lcyA9IHt9O1xuICAgICAgICB0aGlzLl9wcmVmaXhlcyA9IHByZWZpeGVzO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxuICAgIHRvTmFtZShuYW1lT3JQcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVPclByZWZpeCBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8gbmFtZU9yUHJlZml4IDogdGhpcy5uYW1lKG5hbWVPclByZWZpeCk7XG4gICAgfVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuZXcgY29kZV8xLk5hbWUodGhpcy5fbmV3TmFtZShwcmVmaXgpKTtcbiAgICB9XG4gICAgX25ld05hbWUocHJlZml4KSB7XG4gICAgICAgIGNvbnN0IG5nID0gdGhpcy5fbmFtZXNbcHJlZml4XSB8fCB0aGlzLl9uYW1lR3JvdXAocHJlZml4KTtcbiAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke25nLmluZGV4Kyt9YDtcbiAgICB9XG4gICAgX25hbWVHcm91cChwcmVmaXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSB0aGlzLl9wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5fcHJlZml4ZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYXMocHJlZml4KSkgfHwgKHRoaXMuX3ByZWZpeGVzICYmICF0aGlzLl9wcmVmaXhlcy5oYXMocHJlZml4KSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogcHJlZml4IFwiJHtwcmVmaXh9XCIgaXMgbm90IGFsbG93ZWQgaW4gdGhpcyBzY29wZWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbmFtZXNbcHJlZml4XSA9IHsgcHJlZml4LCBpbmRleDogMCB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNjb3BlID0gU2NvcGU7XG5jbGFzcyBWYWx1ZVNjb3BlTmFtZSBleHRlbmRzIGNvZGVfMS5OYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXgsIG5hbWVTdHIpIHtcbiAgICAgICAgc3VwZXIobmFtZVN0cik7XG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSwgeyBwcm9wZXJ0eSwgaXRlbUluZGV4IH0pIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNjb3BlUGF0aCA9ICgwLCBjb2RlXzEuXykgYC4ke25ldyBjb2RlXzEuTmFtZShwcm9wZXJ0eSl9WyR7aXRlbUluZGV4fV1gO1xuICAgIH1cbn1cbmV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBWYWx1ZVNjb3BlTmFtZTtcbmNvbnN0IGxpbmUgPSAoMCwgY29kZV8xLl8pIGBcXG5gO1xuY2xhc3MgVmFsdWVTY29wZSBleHRlbmRzIFNjb3BlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLl92YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBvcHRzLnNjb3BlO1xuICAgICAgICB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIF9uOiBvcHRzLmxpbmVzID8gbGluZSA6IGNvZGVfMS5uaWwgfTtcbiAgICB9XG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFsdWVTY29wZU5hbWUocHJlZml4LCB0aGlzLl9uZXdOYW1lKHByZWZpeCkpO1xuICAgIH1cbiAgICB2YWx1ZShuYW1lT3JQcmVmaXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHZhbHVlLnJlZiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29kZUdlbjogcmVmIG11c3QgYmUgcGFzc2VkIGluIHZhbHVlXCIpO1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgY29uc3QgeyBwcmVmaXggfSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlS2V5ID0gKF9hID0gdmFsdWUua2V5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWx1ZS5yZWY7XG4gICAgICAgIGxldCB2cyA9IHRoaXMuX3ZhbHVlc1twcmVmaXhdO1xuICAgICAgICBpZiAodnMpIHtcbiAgICAgICAgICAgIGNvbnN0IF9uYW1lID0gdnMuZ2V0KHZhbHVlS2V5KTtcbiAgICAgICAgICAgIGlmIChfbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gX25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2cyA9IHRoaXMuX3ZhbHVlc1twcmVmaXhdID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHZzLnNldCh2YWx1ZUtleSwgbmFtZSk7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLl9zY29wZVtwcmVmaXhdIHx8ICh0aGlzLl9zY29wZVtwcmVmaXhdID0gW10pO1xuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSBzLmxlbmd0aDtcbiAgICAgICAgc1tpdGVtSW5kZXhdID0gdmFsdWUucmVmO1xuICAgICAgICBuYW1lLnNldFZhbHVlKHZhbHVlLCB7IHByb3BlcnR5OiBwcmVmaXgsIGl0ZW1JbmRleCB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIGdldFZhbHVlKHByZWZpeCwga2V5T3JSZWYpIHtcbiAgICAgICAgY29uc3QgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgaWYgKCF2cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHZzLmdldChrZXlPclJlZik7XG4gICAgfVxuICAgIHNjb3BlUmVmcyhzY29wZU5hbWUsIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkdWNlVmFsdWVzKHZhbHVlcywgKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLnNjb3BlUGF0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogbmFtZSBcIiR7bmFtZX1cIiBoYXMgbm8gdmFsdWVgKTtcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZV8xLl8pIGAke3Njb3BlTmFtZX0ke25hbWUuc2NvcGVQYXRofWA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzY29wZUNvZGUodmFsdWVzID0gdGhpcy5fdmFsdWVzLCB1c2VkVmFsdWVzLCBnZXRDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWR1Y2VWYWx1ZXModmFsdWVzLCAobmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5hbWUgXCIke25hbWV9XCIgaGFzIG5vIHZhbHVlYCk7XG4gICAgICAgICAgICByZXR1cm4gbmFtZS52YWx1ZS5jb2RlO1xuICAgICAgICB9LCB1c2VkVmFsdWVzLCBnZXRDb2RlKTtcbiAgICB9XG4gICAgX3JlZHVjZVZhbHVlcyh2YWx1ZXMsIHZhbHVlQ29kZSwgdXNlZFZhbHVlcyA9IHt9LCBnZXRDb2RlKSB7XG4gICAgICAgIGxldCBjb2RlID0gY29kZV8xLm5pbDtcbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICBjb25zdCB2cyA9IHZhbHVlc1twcmVmaXhdO1xuICAgICAgICAgICAgaWYgKCF2cylcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVTZXQgPSAodXNlZFZhbHVlc1twcmVmaXhdID0gdXNlZFZhbHVlc1twcmVmaXhdIHx8IG5ldyBNYXAoKSk7XG4gICAgICAgICAgICB2cy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVTZXQuaGFzKG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbmFtZVNldC5zZXQobmFtZSwgVXNlZFZhbHVlU3RhdGUuU3RhcnRlZCk7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSB2YWx1ZUNvZGUobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmID0gdGhpcy5vcHRzLmVzNSA/IGV4cG9ydHMudmFyS2luZHMudmFyIDogZXhwb3J0cy52YXJLaW5kcy5jb25zdDtcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9ICgwLCBjb2RlXzEuXykgYCR7Y29kZX0ke2RlZn0gJHtuYW1lfSA9ICR7Y307JHt0aGlzLm9wdHMuX259YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKGMgPSBnZXRDb2RlID09PSBudWxsIHx8IGdldENvZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdldENvZGUobmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoMCwgY29kZV8xLl8pIGAke2NvZGV9JHtjfSR7dGhpcy5vcHRzLl9ufWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVmFsdWVFcnJvcihuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZVNldC5zZXQobmFtZSwgVXNlZFZhbHVlU3RhdGUuQ29tcGxldGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuVmFsdWVTY29wZSA9IFZhbHVlU2NvcGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY29wZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXh0ZW5kRXJyb3JzID0gZXhwb3J0cy5yZXNldEVycm9yc0NvdW50ID0gZXhwb3J0cy5yZXBvcnRFeHRyYUVycm9yID0gZXhwb3J0cy5yZXBvcnRFcnJvciA9IGV4cG9ydHMua2V5d29yZCREYXRhRXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVzXCIpO1xuZXhwb3J0cy5rZXl3b3JkRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgcGFzcyBcIiR7a2V5d29yZH1cIiBrZXl3b3JkIHZhbGlkYXRpb25gLFxufTtcbmV4cG9ydHMua2V5d29yZCREYXRhRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCwgc2NoZW1hVHlwZSB9KSA9PiBzY2hlbWFUeXBlXG4gICAgICAgID8gKDAsIGNvZGVnZW5fMS5zdHIpIGBcIiR7a2V5d29yZH1cIiBrZXl3b3JkIG11c3QgYmUgJHtzY2hlbWFUeXBlfSAoJGRhdGEpYFxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgXCIke2tleXdvcmR9XCIga2V5d29yZCBpcyBpbnZhbGlkICgkZGF0YSlgLFxufTtcbmZ1bmN0aW9uIHJlcG9ydEVycm9yKGN4dCwgZXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciwgZXJyb3JQYXRocywgb3ZlcnJpZGVBbGxFcnJvcnMpIHtcbiAgICBjb25zdCB7IGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGFsbEVycm9ycyB9ID0gaXQ7XG4gICAgY29uc3QgZXJyT2JqID0gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIGlmIChvdmVycmlkZUFsbEVycm9ycyAhPT0gbnVsbCAmJiBvdmVycmlkZUFsbEVycm9ycyAhPT0gdm9pZCAwID8gb3ZlcnJpZGVBbGxFcnJvcnMgOiAoY29tcG9zaXRlUnVsZSB8fCBhbGxFcnJvcnMpKSB7XG4gICAgICAgIGFkZEVycm9yKGdlbiwgZXJyT2JqKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybkVycm9ycyhpdCwgKDAsIGNvZGVnZW5fMS5fKSBgWyR7ZXJyT2JqfV1gKTtcbiAgICB9XG59XG5leHBvcnRzLnJlcG9ydEVycm9yID0gcmVwb3J0RXJyb3I7XG5mdW5jdGlvbiByZXBvcnRFeHRyYUVycm9yKGN4dCwgZXJyb3IgPSBleHBvcnRzLmtleXdvcmRFcnJvciwgZXJyb3JQYXRocykge1xuICAgIGNvbnN0IHsgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IGdlbiwgY29tcG9zaXRlUnVsZSwgYWxsRXJyb3JzIH0gPSBpdDtcbiAgICBjb25zdCBlcnJPYmogPSBlcnJvck9iamVjdENvZGUoY3h0LCBlcnJvciwgZXJyb3JQYXRocyk7XG4gICAgYWRkRXJyb3IoZ2VuLCBlcnJPYmopO1xuICAgIGlmICghKGNvbXBvc2l0ZVJ1bGUgfHwgYWxsRXJyb3JzKSkge1xuICAgICAgICByZXR1cm5FcnJvcnMoaXQsIG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzKTtcbiAgICB9XG59XG5leHBvcnRzLnJlcG9ydEV4dHJhRXJyb3IgPSByZXBvcnRFeHRyYUVycm9yO1xuZnVuY3Rpb24gcmVzZXRFcnJvcnNDb3VudChnZW4sIGVycnNDb3VudCkge1xuICAgIGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgZXJyc0NvdW50KTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gIT09IG51bGxgLCAoKSA9PiBnZW4uaWYoZXJyc0NvdW50LCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9Lmxlbmd0aGAsIGVycnNDb3VudCksICgpID0+IGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsIG51bGwpKSk7XG59XG5leHBvcnRzLnJlc2V0RXJyb3JzQ291bnQgPSByZXNldEVycm9yc0NvdW50O1xuZnVuY3Rpb24gZXh0ZW5kRXJyb3JzKHsgZ2VuLCBrZXl3b3JkLCBzY2hlbWFWYWx1ZSwgZGF0YSwgZXJyc0NvdW50LCBpdCwgfSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlcnJzQ291bnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIGNvbnN0IGVyciA9IGdlbi5uYW1lKFwiZXJyXCIpO1xuICAgIGdlbi5mb3JSYW5nZShcImlcIiwgZXJyc0NvdW50LCBuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoaSkgPT4ge1xuICAgICAgICBnZW4uY29uc3QoZXJyLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfVske2l9XWApO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9Lmluc3RhbmNlUGF0aCA9PT0gdW5kZWZpbmVkYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uaW5zdGFuY2VQYXRoYCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGl0LmVycm9yUGF0aCkpKTtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uc2NoZW1hUGF0aGAsICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCk7XG4gICAgICAgIGlmIChpdC5vcHRzLnZlcmJvc2UpIHtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LnNjaGVtYWAsIHNjaGVtYVZhbHVlKTtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LmRhdGFgLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5leHRlbmRFcnJvcnMgPSBleHRlbmRFcnJvcnM7XG5mdW5jdGlvbiBhZGRFcnJvcihnZW4sIGVyck9iaikge1xuICAgIGNvbnN0IGVyciA9IGdlbi5jb25zdChcImVyclwiLCBlcnJPYmopO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbGAsICgpID0+IGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYFske2Vycn1dYCksICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9LnB1c2goJHtlcnJ9KWApO1xuICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30rK2ApO1xufVxuZnVuY3Rpb24gcmV0dXJuRXJyb3JzKGl0LCBlcnJzKSB7XG4gICAgY29uc3QgeyBnZW4sIHZhbGlkYXRlTmFtZSwgc2NoZW1hRW52IH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hRW52LiRhc3luYykge1xuICAgICAgICBnZW4udGhyb3coKDAsIGNvZGVnZW5fMS5fKSBgbmV3ICR7aXQuVmFsaWRhdGlvbkVycm9yfSgke2VycnN9KWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXJyb3JzYCwgZXJycyk7XG4gICAgICAgIGdlbi5yZXR1cm4oZmFsc2UpO1xuICAgIH1cbn1cbmNvbnN0IEUgPSB7XG4gICAga2V5d29yZDogbmV3IGNvZGVnZW5fMS5OYW1lKFwia2V5d29yZFwiKSxcbiAgICBzY2hlbWFQYXRoOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzY2hlbWFQYXRoXCIpLFxuICAgIHBhcmFtczogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyYW1zXCIpLFxuICAgIHByb3BlcnR5TmFtZTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicHJvcGVydHlOYW1lXCIpLFxuICAgIG1lc3NhZ2U6IG5ldyBjb2RlZ2VuXzEuTmFtZShcIm1lc3NhZ2VcIiksXG4gICAgc2NoZW1hOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzY2hlbWFcIiksXG4gICAgcGFyZW50U2NoZW1hOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnRTY2hlbWFcIiksXG59O1xuZnVuY3Rpb24gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpIHtcbiAgICBjb25zdCB7IGNyZWF0ZUVycm9ycyB9ID0gY3h0Lml0O1xuICAgIGlmIChjcmVhdGVFcnJvcnMgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBge31gO1xuICAgIHJldHVybiBlcnJvck9iamVjdChjeHQsIGVycm9yLCBlcnJvclBhdGhzKTtcbn1cbmZ1bmN0aW9uIGVycm9yT2JqZWN0KGN4dCwgZXJyb3IsIGVycm9yUGF0aHMgPSB7fSkge1xuICAgIGNvbnN0IHsgZ2VuLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IGtleVZhbHVlcyA9IFtcbiAgICAgICAgZXJyb3JJbnN0YW5jZVBhdGgoaXQsIGVycm9yUGF0aHMpLFxuICAgICAgICBlcnJvclNjaGVtYVBhdGgoY3h0LCBlcnJvclBhdGhzKSxcbiAgICBdO1xuICAgIGV4dHJhRXJyb3JQcm9wcyhjeHQsIGVycm9yLCBrZXlWYWx1ZXMpO1xuICAgIHJldHVybiBnZW4ub2JqZWN0KC4uLmtleVZhbHVlcyk7XG59XG5mdW5jdGlvbiBlcnJvckluc3RhbmNlUGF0aCh7IGVycm9yUGF0aCB9LCB7IGluc3RhbmNlUGF0aCB9KSB7XG4gICAgY29uc3QgaW5zdFBhdGggPSBpbnN0YW5jZVBhdGhcbiAgICAgICAgPyAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyb3JQYXRofSR7KDAsIHV0aWxfMS5nZXRFcnJvclBhdGgpKGluc3RhbmNlUGF0aCwgdXRpbF8xLlR5cGUuU3RyKX1gXG4gICAgICAgIDogZXJyb3JQYXRoO1xuICAgIHJldHVybiBbbmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGluc3RQYXRoKV07XG59XG5mdW5jdGlvbiBlcnJvclNjaGVtYVBhdGgoeyBrZXl3b3JkLCBpdDogeyBlcnJTY2hlbWFQYXRoIH0gfSwgeyBzY2hlbWFQYXRoLCBwYXJlbnRTY2hlbWEgfSkge1xuICAgIGxldCBzY2hQYXRoID0gcGFyZW50U2NoZW1hID8gZXJyU2NoZW1hUGF0aCA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YDtcbiAgICBpZiAoc2NoZW1hUGF0aCkge1xuICAgICAgICBzY2hQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke3NjaFBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoc2NoZW1hUGF0aCwgdXRpbF8xLlR5cGUuU3RyKX1gO1xuICAgIH1cbiAgICByZXR1cm4gW0Uuc2NoZW1hUGF0aCwgc2NoUGF0aF07XG59XG5mdW5jdGlvbiBleHRyYUVycm9yUHJvcHMoY3h0LCB7IHBhcmFtcywgbWVzc2FnZSB9LCBrZXlWYWx1ZXMpIHtcbiAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYVZhbHVlLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgb3B0cywgcHJvcGVydHlOYW1lLCB0b3BTY2hlbWFSZWYsIHNjaGVtYVBhdGggfSA9IGl0O1xuICAgIGtleVZhbHVlcy5wdXNoKFtFLmtleXdvcmQsIGtleXdvcmRdLCBbRS5wYXJhbXMsIHR5cGVvZiBwYXJhbXMgPT0gXCJmdW5jdGlvblwiID8gcGFyYW1zKGN4dCkgOiBwYXJhbXMgfHwgKDAsIGNvZGVnZW5fMS5fKSBge31gXSk7XG4gICAgaWYgKG9wdHMubWVzc2FnZXMpIHtcbiAgICAgICAga2V5VmFsdWVzLnB1c2goW0UubWVzc2FnZSwgdHlwZW9mIG1lc3NhZ2UgPT0gXCJmdW5jdGlvblwiID8gbWVzc2FnZShjeHQpIDogbWVzc2FnZV0pO1xuICAgIH1cbiAgICBpZiAob3B0cy52ZXJib3NlKSB7XG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLnNjaGVtYSwgc2NoZW1hVmFsdWVdLCBbRS5wYXJlbnRTY2hlbWEsICgwLCBjb2RlZ2VuXzEuXykgYCR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH1gXSwgW25hbWVzXzEuZGVmYXVsdC5kYXRhLCBkYXRhXSk7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0eU5hbWUpXG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlc29sdmVTY2hlbWEgPSBleHBvcnRzLmdldENvbXBpbGluZ1NjaGVtYSA9IGV4cG9ydHMucmVzb2x2ZVJlZiA9IGV4cG9ydHMuY29tcGlsZVNjaGVtYSA9IGV4cG9ydHMuU2NoZW1hRW52ID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IHZhbGlkYXRpb25fZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4vbmFtZXNcIik7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9yZXNvbHZlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0ZVwiKTtcbmNsYXNzIFNjaGVtYUVudiB7XG4gICAgY29uc3RydWN0b3IoZW52KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMuZHluYW1pY0FuY2hvcnMgPSB7fTtcbiAgICAgICAgbGV0IHNjaGVtYTtcbiAgICAgICAgaWYgKHR5cGVvZiBlbnYuc2NoZW1hID09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICBzY2hlbWEgPSBlbnYuc2NoZW1hO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGVudi5zY2hlbWE7XG4gICAgICAgIHRoaXMuc2NoZW1hSWQgPSBlbnYuc2NoZW1hSWQ7XG4gICAgICAgIHRoaXMucm9vdCA9IGVudi5yb290IHx8IHRoaXM7XG4gICAgICAgIHRoaXMuYmFzZUlkID0gKF9hID0gZW52LmJhc2VJZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hW2Vudi5zY2hlbWFJZCB8fCBcIiRpZFwiXSk7XG4gICAgICAgIHRoaXMuc2NoZW1hUGF0aCA9IGVudi5zY2hlbWFQYXRoO1xuICAgICAgICB0aGlzLmxvY2FsUmVmcyA9IGVudi5sb2NhbFJlZnM7XG4gICAgICAgIHRoaXMubWV0YSA9IGVudi5tZXRhO1xuICAgICAgICB0aGlzLiRhc3luYyA9IHNjaGVtYSA9PT0gbnVsbCB8fCBzY2hlbWEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaGVtYS4kYXN5bmM7XG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgIH1cbn1cbmV4cG9ydHMuU2NoZW1hRW52ID0gU2NoZW1hRW52O1xuLy8gbGV0IGNvZGVTaXplID0gMFxuLy8gbGV0IG5vZGVDb3VudCA9IDBcbi8vIENvbXBpbGVzIHNjaGVtYSBpbiBTY2hlbWFFbnZcbmZ1bmN0aW9uIGNvbXBpbGVTY2hlbWEoc2NoKSB7XG4gICAgLy8gVE9ETyByZWZhY3RvciAtIHJlbW92ZSBjb21waWxhdGlvbnNcbiAgICBjb25zdCBfc2NoID0gZ2V0Q29tcGlsaW5nU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICBpZiAoX3NjaClcbiAgICAgICAgcmV0dXJuIF9zY2g7XG4gICAgY29uc3Qgcm9vdElkID0gKDAsIHJlc29sdmVfMS5nZXRGdWxsUGF0aCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBzY2gucm9vdC5iYXNlSWQpOyAvLyBUT0RPIGlmIGdldEZ1bGxQYXRoIHJlbW92ZWQgMSB0ZXN0cyBmYWlsc1xuICAgIGNvbnN0IHsgZXM1LCBsaW5lcyB9ID0gdGhpcy5vcHRzLmNvZGU7XG4gICAgY29uc3QgeyBvd25Qcm9wZXJ0aWVzIH0gPSB0aGlzLm9wdHM7XG4gICAgY29uc3QgZ2VuID0gbmV3IGNvZGVnZW5fMS5Db2RlR2VuKHRoaXMuc2NvcGUsIHsgZXM1LCBsaW5lcywgb3duUHJvcGVydGllcyB9KTtcbiAgICBsZXQgX1ZhbGlkYXRpb25FcnJvcjtcbiAgICBpZiAoc2NoLiRhc3luYykge1xuICAgICAgICBfVmFsaWRhdGlvbkVycm9yID0gZ2VuLnNjb3BlVmFsdWUoXCJFcnJvclwiLCB7XG4gICAgICAgICAgICByZWY6IHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0LFxuICAgICAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgcmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKS5kZWZhdWx0YCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRlTmFtZSA9IGdlbi5zY29wZU5hbWUoXCJ2YWxpZGF0ZVwiKTtcbiAgICBzY2gudmFsaWRhdGVOYW1lID0gdmFsaWRhdGVOYW1lO1xuICAgIGNvbnN0IHNjaGVtYUN4dCA9IHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBhbGxFcnJvcnM6IHRoaXMub3B0cy5hbGxFcnJvcnMsXG4gICAgICAgIGRhdGE6IG5hbWVzXzEuZGVmYXVsdC5kYXRhLFxuICAgICAgICBwYXJlbnREYXRhOiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSxcbiAgICAgICAgcGFyZW50RGF0YVByb3BlcnR5OiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LFxuICAgICAgICBkYXRhTmFtZXM6IFtuYW1lc18xLmRlZmF1bHQuZGF0YV0sXG4gICAgICAgIGRhdGFQYXRoQXJyOiBbY29kZWdlbl8xLm5pbF0sXG4gICAgICAgIGRhdGFMZXZlbDogMCxcbiAgICAgICAgZGF0YVR5cGVzOiBbXSxcbiAgICAgICAgZGVmaW5lZFByb3BlcnRpZXM6IG5ldyBTZXQoKSxcbiAgICAgICAgdG9wU2NoZW1hUmVmOiBnZW4uc2NvcGVWYWx1ZShcInNjaGVtYVwiLCB0aGlzLm9wdHMuY29kZS5zb3VyY2UgPT09IHRydWVcbiAgICAgICAgICAgID8geyByZWY6IHNjaC5zY2hlbWEsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShzY2guc2NoZW1hKSB9XG4gICAgICAgICAgICA6IHsgcmVmOiBzY2guc2NoZW1hIH0pLFxuICAgICAgICB2YWxpZGF0ZU5hbWUsXG4gICAgICAgIFZhbGlkYXRpb25FcnJvcjogX1ZhbGlkYXRpb25FcnJvcixcbiAgICAgICAgc2NoZW1hOiBzY2guc2NoZW1hLFxuICAgICAgICBzY2hlbWFFbnY6IHNjaCxcbiAgICAgICAgcm9vdElkLFxuICAgICAgICBiYXNlSWQ6IHNjaC5iYXNlSWQgfHwgcm9vdElkLFxuICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICBlcnJTY2hlbWFQYXRoOiBzY2guc2NoZW1hUGF0aCB8fCAodGhpcy5vcHRzLmp0ZCA/IFwiXCIgOiBcIiNcIiksXG4gICAgICAgIGVycm9yUGF0aDogKDAsIGNvZGVnZW5fMS5fKSBgXCJcImAsXG4gICAgICAgIG9wdHM6IHRoaXMub3B0cyxcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICB9O1xuICAgIGxldCBzb3VyY2VDb2RlO1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2NvbXBpbGF0aW9ucy5hZGQoc2NoKTtcbiAgICAgICAgKDAsIHZhbGlkYXRlXzEudmFsaWRhdGVGdW5jdGlvbkNvZGUpKHNjaGVtYUN4dCk7XG4gICAgICAgIGdlbi5vcHRpbWl6ZSh0aGlzLm9wdHMuY29kZS5vcHRpbWl6ZSk7XG4gICAgICAgIC8vIGdlbi5vcHRpbWl6ZSgxKVxuICAgICAgICBjb25zdCB2YWxpZGF0ZUNvZGUgPSBnZW4udG9TdHJpbmcoKTtcbiAgICAgICAgc291cmNlQ29kZSA9IGAke2dlbi5zY29wZVJlZnMobmFtZXNfMS5kZWZhdWx0LnNjb3BlKX1yZXR1cm4gJHt2YWxpZGF0ZUNvZGV9YDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coKGNvZGVTaXplICs9IHNvdXJjZUNvZGUubGVuZ3RoKSwgKG5vZGVDb3VudCArPSBnZW4ubm9kZUNvdW50KSlcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnByb2Nlc3MpXG4gICAgICAgICAgICBzb3VyY2VDb2RlID0gdGhpcy5vcHRzLmNvZGUucHJvY2Vzcyhzb3VyY2VDb2RlLCBzY2gpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlxcblxcblxcbiAqKiogXFxuXCIsIHNvdXJjZUNvZGUpXG4gICAgICAgIGNvbnN0IG1ha2VWYWxpZGF0ZSA9IG5ldyBGdW5jdGlvbihgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn1gLCBgJHtuYW1lc18xLmRlZmF1bHQuc2NvcGV9YCwgc291cmNlQ29kZSk7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gbWFrZVZhbGlkYXRlKHRoaXMsIHRoaXMuc2NvcGUuZ2V0KCkpO1xuICAgICAgICB0aGlzLnNjb3BlLnZhbHVlKHZhbGlkYXRlTmFtZSwgeyByZWY6IHZhbGlkYXRlIH0pO1xuICAgICAgICB2YWxpZGF0ZS5lcnJvcnMgPSBudWxsO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWEgPSBzY2guc2NoZW1hO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWFFbnYgPSBzY2g7XG4gICAgICAgIGlmIChzY2guJGFzeW5jKVxuICAgICAgICAgICAgdmFsaWRhdGUuJGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnNvdXJjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFsaWRhdGUuc291cmNlID0geyB2YWxpZGF0ZU5hbWUsIHZhbGlkYXRlQ29kZSwgc2NvcGVWYWx1ZXM6IGdlbi5fdmFsdWVzIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0cy51bmV2YWx1YXRlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBwcm9wcywgaXRlbXMgfSA9IHNjaGVtYUN4dDtcbiAgICAgICAgICAgIHZhbGlkYXRlLmV2YWx1YXRlZCA9IHtcbiAgICAgICAgICAgICAgICBwcm9wczogcHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSA/IHVuZGVmaW5lZCA6IHByb3BzLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gdW5kZWZpbmVkIDogaXRlbXMsXG4gICAgICAgICAgICAgICAgZHluYW1pY1Byb3BzOiBwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lLFxuICAgICAgICAgICAgICAgIGR5bmFtaWNJdGVtczogaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodmFsaWRhdGUuc291cmNlKVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlLnNvdXJjZS5ldmFsdWF0ZWQgPSAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkodmFsaWRhdGUuZXZhbHVhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBzY2gudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZTtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZU5hbWU7XG4gICAgICAgIGlmIChzb3VyY2VDb2RlKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJFcnJvciBjb21waWxpbmcgc2NoZW1hLCBmdW5jdGlvbiBjb2RlOlwiLCBzb3VyY2VDb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJcXG5cXG5cXG4gKioqIFxcblwiLCBzb3VyY2VDb2RlLCB0aGlzLm9wdHMpXG4gICAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMuZGVsZXRlKHNjaCk7XG4gICAgfVxufVxuZXhwb3J0cy5jb21waWxlU2NoZW1hID0gY29tcGlsZVNjaGVtYTtcbmZ1bmN0aW9uIHJlc29sdmVSZWYocm9vdCwgYmFzZUlkLCByZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgcmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgcmVmKTtcbiAgICBjb25zdCBzY2hPckZ1bmMgPSByb290LnJlZnNbcmVmXTtcbiAgICBpZiAoc2NoT3JGdW5jKVxuICAgICAgICByZXR1cm4gc2NoT3JGdW5jO1xuICAgIGxldCBfc2NoID0gcmVzb2x2ZS5jYWxsKHRoaXMsIHJvb3QsIHJlZik7XG4gICAgaWYgKF9zY2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzY2hlbWEgPSAoX2EgPSByb290LmxvY2FsUmVmcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3JlZl07IC8vIFRPRE8gbWF5YmUgbG9jYWxSZWZzIHNob3VsZCBob2xkIFNjaGVtYUVudlxuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmIChzY2hlbWEpXG4gICAgICAgICAgICBfc2NoID0gbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICB9XG4gICAgaWYgKF9zY2ggPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAocm9vdC5yZWZzW3JlZl0gPSBpbmxpbmVPckNvbXBpbGUuY2FsbCh0aGlzLCBfc2NoKSk7XG59XG5leHBvcnRzLnJlc29sdmVSZWYgPSByZXNvbHZlUmVmO1xuZnVuY3Rpb24gaW5saW5lT3JDb21waWxlKHNjaCkge1xuICAgIGlmICgoMCwgcmVzb2x2ZV8xLmlubGluZVJlZikoc2NoLnNjaGVtYSwgdGhpcy5vcHRzLmlubGluZVJlZnMpKVxuICAgICAgICByZXR1cm4gc2NoLnNjaGVtYTtcbiAgICByZXR1cm4gc2NoLnZhbGlkYXRlID8gc2NoIDogY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG59XG4vLyBJbmRleCBvZiBzY2hlbWEgY29tcGlsYXRpb24gaW4gdGhlIGN1cnJlbnRseSBjb21waWxlZCBsaXN0XG5mdW5jdGlvbiBnZXRDb21waWxpbmdTY2hlbWEoc2NoRW52KSB7XG4gICAgZm9yIChjb25zdCBzY2ggb2YgdGhpcy5fY29tcGlsYXRpb25zKSB7XG4gICAgICAgIGlmIChzYW1lU2NoZW1hRW52KHNjaCwgc2NoRW52KSlcbiAgICAgICAgICAgIHJldHVybiBzY2g7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21waWxpbmdTY2hlbWEgPSBnZXRDb21waWxpbmdTY2hlbWE7XG5mdW5jdGlvbiBzYW1lU2NoZW1hRW52KHMxLCBzMikge1xuICAgIHJldHVybiBzMS5zY2hlbWEgPT09IHMyLnNjaGVtYSAmJiBzMS5yb290ID09PSBzMi5yb290ICYmIHMxLmJhc2VJZCA9PT0gczIuYmFzZUlkO1xufVxuLy8gcmVzb2x2ZSBhbmQgY29tcGlsZSB0aGUgcmVmZXJlbmNlcyAoJHJlZilcbi8vIFRPRE8gcmV0dXJucyBBbnlTY2hlbWFPYmplY3QgKGlmIHRoZSBzY2hlbWEgY2FuIGJlIGlubGluZWQpIG9yIHZhbGlkYXRpb24gZnVuY3Rpb25cbmZ1bmN0aW9uIHJlc29sdmUocm9vdCwgLy8gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJvb3Qgc2NoZW1hIGZvciB0aGUgY3VycmVudCBzY2hlbWFcbnJlZiAvLyByZWZlcmVuY2UgdG8gcmVzb2x2ZVxuKSB7XG4gICAgbGV0IHNjaDtcbiAgICB3aGlsZSAodHlwZW9mIChzY2ggPSB0aGlzLnJlZnNbcmVmXSkgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmVmID0gc2NoO1xuICAgIHJldHVybiBzY2ggfHwgdGhpcy5zY2hlbWFzW3JlZl0gfHwgcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIHJlZik7XG59XG4vLyBSZXNvbHZlIHNjaGVtYSwgaXRzIHJvb3QgYW5kIGJhc2VJZFxuZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYShyb290LCAvLyByb290IG9iamVjdCB3aXRoIHByb3BlcnRpZXMgc2NoZW1hLCByZWZzIFRPRE8gYmVsb3cgU2NoZW1hRW52IGlzIGFzc2lnbmVkIHRvIGl0XG5yZWYgLy8gcmVmZXJlbmNlIHRvIHJlc29sdmVcbikge1xuICAgIGNvbnN0IHAgPSB0aGlzLm9wdHMudXJpUmVzb2x2ZXIucGFyc2UocmVmKTtcbiAgICBjb25zdCByZWZQYXRoID0gKDAsIHJlc29sdmVfMS5fZ2V0RnVsbFBhdGgpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgcCk7XG4gICAgbGV0IGJhc2VJZCA9ICgwLCByZXNvbHZlXzEuZ2V0RnVsbFBhdGgpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgcm9vdC5iYXNlSWQsIHVuZGVmaW5lZCk7XG4gICAgLy8gVE9ETyBgT2JqZWN0LmtleXMocm9vdC5zY2hlbWEpLmxlbmd0aCA+IDBgIHNob3VsZCBub3QgYmUgbmVlZGVkIC0gYnV0IHJlbW92aW5nIGJyZWFrcyAyIHRlc3RzXG4gICAgaWYgKE9iamVjdC5rZXlzKHJvb3Quc2NoZW1hKS5sZW5ndGggPiAwICYmIHJlZlBhdGggPT09IGJhc2VJZCkge1xuICAgICAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCByb290KTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShyZWZQYXRoKTtcbiAgICBjb25zdCBzY2hPclJlZiA9IHRoaXMucmVmc1tpZF0gfHwgdGhpcy5zY2hlbWFzW2lkXTtcbiAgICBpZiAodHlwZW9mIHNjaE9yUmVmID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29uc3Qgc2NoID0gcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIHNjaE9yUmVmKTtcbiAgICAgICAgaWYgKHR5cGVvZiAoc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLnNjaGVtYSkgIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiBnZXRKc29uUG9pbnRlci5jYWxsKHRoaXMsIHAsIHNjaCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKHNjaE9yUmVmID09PSBudWxsIHx8IHNjaE9yUmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hPclJlZi5zY2hlbWEpICE9PSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFzY2hPclJlZi52YWxpZGF0ZSlcbiAgICAgICAgY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaE9yUmVmKTtcbiAgICBpZiAoaWQgPT09ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKHJlZikpIHtcbiAgICAgICAgY29uc3QgeyBzY2hlbWEgfSA9IHNjaE9yUmVmO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGNvbnN0IHNjaElkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgaWYgKHNjaElkKVxuICAgICAgICAgICAgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgc2NoSWQpO1xuICAgICAgICByZXR1cm4gbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEpzb25Qb2ludGVyLmNhbGwodGhpcywgcCwgc2NoT3JSZWYpO1xufVxuZXhwb3J0cy5yZXNvbHZlU2NoZW1hID0gcmVzb2x2ZVNjaGVtYTtcbmNvbnN0IFBSRVZFTlRfU0NPUEVfQ0hBTkdFID0gbmV3IFNldChbXG4gICAgXCJwcm9wZXJ0aWVzXCIsXG4gICAgXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgIFwiZW51bVwiLFxuICAgIFwiZGVwZW5kZW5jaWVzXCIsXG4gICAgXCJkZWZpbml0aW9uc1wiLFxuXSk7XG5mdW5jdGlvbiBnZXRKc29uUG9pbnRlcihwYXJzZWRSZWYsIHsgYmFzZUlkLCBzY2hlbWEsIHJvb3QgfSkge1xuICAgIHZhciBfYTtcbiAgICBpZiAoKChfYSA9IHBhcnNlZFJlZi5mcmFnbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdKSAhPT0gXCIvXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFyc2VkUmVmLmZyYWdtZW50LnNsaWNlKDEpLnNwbGl0KFwiL1wiKSkge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHBhcnRTY2hlbWEgPSBzY2hlbWFbKDAsIHV0aWxfMS51bmVzY2FwZUZyYWdtZW50KShwYXJ0KV07XG4gICAgICAgIGlmIChwYXJ0U2NoZW1hID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNjaGVtYSA9IHBhcnRTY2hlbWE7XG4gICAgICAgIC8vIFRPRE8gUFJFVkVOVF9TQ09QRV9DSEFOR0UgY291bGQgYmUgZGVmaW5lZCBpbiBrZXl3b3JkIGRlZj9cbiAgICAgICAgY29uc3Qgc2NoSWQgPSB0eXBlb2Ygc2NoZW1hID09PSBcIm9iamVjdFwiICYmIHNjaGVtYVt0aGlzLm9wdHMuc2NoZW1hSWRdO1xuICAgICAgICBpZiAoIVBSRVZFTlRfU0NPUEVfQ0hBTkdFLmhhcyhwYXJ0KSAmJiBzY2hJZCkge1xuICAgICAgICAgICAgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgc2NoSWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbnY7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgIT0gXCJib29sZWFuXCIgJiYgc2NoZW1hLiRyZWYgJiYgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgdGhpcy5SVUxFUykpIHtcbiAgICAgICAgY29uc3QgJHJlZiA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsIHNjaGVtYS4kcmVmKTtcbiAgICAgICAgZW52ID0gcmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsICRyZWYpO1xuICAgIH1cbiAgICAvLyBldmVuIHRob3VnaCByZXNvbHV0aW9uIGZhaWxlZCB3ZSBuZWVkIHRvIHJldHVybiBTY2hlbWFFbnYgdG8gdGhyb3cgZXhjZXB0aW9uXG4gICAgLy8gc28gdGhhdCBjb21waWxlQXN5bmMgbG9hZHMgbWlzc2luZyBzY2hlbWEuXG4gICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgIGVudiA9IGVudiB8fCBuZXcgU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgcm9vdCwgYmFzZUlkIH0pO1xuICAgIGlmIChlbnYuc2NoZW1hICE9PSBlbnYucm9vdC5zY2hlbWEpXG4gICAgICAgIHJldHVybiBlbnY7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzID0ge1xuICAgIC8vIHZhbGlkYXRpb24gZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgZGF0YTogbmV3IGNvZGVnZW5fMS5OYW1lKFwiZGF0YVwiKSxcbiAgICAvLyBhcmdzIHBhc3NlZCBmcm9tIHJlZmVyZW5jaW5nIHNjaGVtYVxuICAgIHZhbEN4dDogbmV3IGNvZGVnZW5fMS5OYW1lKFwidmFsQ3h0XCIpLFxuICAgIGluc3RhbmNlUGF0aDogbmV3IGNvZGVnZW5fMS5OYW1lKFwiaW5zdGFuY2VQYXRoXCIpLFxuICAgIHBhcmVudERhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmVudERhdGFcIiksXG4gICAgcGFyZW50RGF0YVByb3BlcnR5OiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnREYXRhUHJvcGVydHlcIiksXG4gICAgcm9vdERhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInJvb3REYXRhXCIpLFxuICAgIGR5bmFtaWNBbmNob3JzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJkeW5hbWljQW5jaG9yc1wiKSxcbiAgICAvLyBmdW5jdGlvbiBzY29wZWQgdmFyaWFibGVzXG4gICAgdkVycm9yczogbmV3IGNvZGVnZW5fMS5OYW1lKFwidkVycm9yc1wiKSxcbiAgICBlcnJvcnM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImVycm9yc1wiKSxcbiAgICB0aGlzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJ0aGlzXCIpLFxuICAgIC8vIFwiZ2xvYmFsc1wiXG4gICAgc2VsZjogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2VsZlwiKSxcbiAgICBzY29wZTogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NvcGVcIiksXG4gICAgLy8gSlREIHNlcmlhbGl6ZS9wYXJzZSBuYW1lIGZvciBKU09OIHN0cmluZyBhbmQgcG9zaXRpb25cbiAgICBqc29uOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uXCIpLFxuICAgIGpzb25Qb3M6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25Qb3NcIiksXG4gICAganNvbkxlbjogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvbkxlblwiKSxcbiAgICBqc29uUGFydDogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvblBhcnRcIiksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gbmFtZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYW1lcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlc29sdmVfMSA9IHJlcXVpcmUoXCIuL3Jlc29sdmVcIik7XG5jbGFzcyBNaXNzaW5nUmVmRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVzb2x2ZXIsIGJhc2VJZCwgcmVmLCBtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnIHx8IGBjYW4ndCByZXNvbHZlIHJlZmVyZW5jZSAke3JlZn0gZnJvbSBpZCAke2Jhc2VJZH1gKTtcbiAgICAgICAgdGhpcy5taXNzaW5nUmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShyZXNvbHZlciwgYmFzZUlkLCByZWYpO1xuICAgICAgICB0aGlzLm1pc3NpbmdTY2hlbWEgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKSgoMCwgcmVzb2x2ZV8xLmdldEZ1bGxQYXRoKShyZXNvbHZlciwgdGhpcy5taXNzaW5nUmVmKSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTWlzc2luZ1JlZkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmX2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRTY2hlbWFSZWZzID0gZXhwb3J0cy5yZXNvbHZlVXJsID0gZXhwb3J0cy5ub3JtYWxpemVJZCA9IGV4cG9ydHMuX2dldEZ1bGxQYXRoID0gZXhwb3J0cy5nZXRGdWxsUGF0aCA9IGV4cG9ydHMuaW5saW5lUmVmID0gdm9pZCAwO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IGVxdWFsID0gcmVxdWlyZShcImZhc3QtZGVlcC1lcXVhbFwiKTtcbmNvbnN0IHRyYXZlcnNlID0gcmVxdWlyZShcImpzb24tc2NoZW1hLXRyYXZlcnNlXCIpO1xuLy8gVE9ETyByZWZhY3RvciB0byB1c2Uga2V5d29yZCBkZWZpbml0aW9uc1xuY29uc3QgU0lNUExFX0lOTElORUQgPSBuZXcgU2V0KFtcbiAgICBcInR5cGVcIixcbiAgICBcImZvcm1hdFwiLFxuICAgIFwicGF0dGVyblwiLFxuICAgIFwibWF4TGVuZ3RoXCIsXG4gICAgXCJtaW5MZW5ndGhcIixcbiAgICBcIm1heFByb3BlcnRpZXNcIixcbiAgICBcIm1pblByb3BlcnRpZXNcIixcbiAgICBcIm1heEl0ZW1zXCIsXG4gICAgXCJtaW5JdGVtc1wiLFxuICAgIFwibWF4aW11bVwiLFxuICAgIFwibWluaW11bVwiLFxuICAgIFwidW5pcXVlSXRlbXNcIixcbiAgICBcIm11bHRpcGxlT2ZcIixcbiAgICBcInJlcXVpcmVkXCIsXG4gICAgXCJlbnVtXCIsXG4gICAgXCJjb25zdFwiLFxuXSk7XG5mdW5jdGlvbiBpbmxpbmVSZWYoc2NoZW1hLCBsaW1pdCA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGxpbWl0ID09PSB0cnVlKVxuICAgICAgICByZXR1cm4gIWhhc1JlZihzY2hlbWEpO1xuICAgIGlmICghbGltaXQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gY291bnRLZXlzKHNjaGVtYSkgPD0gbGltaXQ7XG59XG5leHBvcnRzLmlubGluZVJlZiA9IGlubGluZVJlZjtcbmNvbnN0IFJFRl9LRVlXT1JEUyA9IG5ldyBTZXQoW1xuICAgIFwiJHJlZlwiLFxuICAgIFwiJHJlY3Vyc2l2ZVJlZlwiLFxuICAgIFwiJHJlY3Vyc2l2ZUFuY2hvclwiLFxuICAgIFwiJGR5bmFtaWNSZWZcIixcbiAgICBcIiRkeW5hbWljQW5jaG9yXCIsXG5dKTtcbmZ1bmN0aW9uIGhhc1JlZihzY2hlbWEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKFJFRl9LRVlXT1JEUy5oYXMoa2V5KSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFba2V5XTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoKSAmJiBzY2guc29tZShoYXNSZWYpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoID09IFwib2JqZWN0XCIgJiYgaGFzUmVmKHNjaCkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY291bnRLZXlzKHNjaGVtYSkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiJHJlZlwiKVxuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBpZiAoU0lNUExFX0lOTElORUQuaGFzKGtleSkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWFba2V5XSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShzY2hlbWFba2V5XSwgKHNjaCkgPT4gKGNvdW50ICs9IGNvdW50S2V5cyhzY2gpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufVxuZnVuY3Rpb24gZ2V0RnVsbFBhdGgocmVzb2x2ZXIsIGlkID0gXCJcIiwgbm9ybWFsaXplKSB7XG4gICAgaWYgKG5vcm1hbGl6ZSAhPT0gZmFsc2UpXG4gICAgICAgIGlkID0gbm9ybWFsaXplSWQoaWQpO1xuICAgIGNvbnN0IHAgPSByZXNvbHZlci5wYXJzZShpZCk7XG4gICAgcmV0dXJuIF9nZXRGdWxsUGF0aChyZXNvbHZlciwgcCk7XG59XG5leHBvcnRzLmdldEZ1bGxQYXRoID0gZ2V0RnVsbFBhdGg7XG5mdW5jdGlvbiBfZ2V0RnVsbFBhdGgocmVzb2x2ZXIsIHApIHtcbiAgICBjb25zdCBzZXJpYWxpemVkID0gcmVzb2x2ZXIuc2VyaWFsaXplKHApO1xuICAgIHJldHVybiBzZXJpYWxpemVkLnNwbGl0KFwiI1wiKVswXSArIFwiI1wiO1xufVxuZXhwb3J0cy5fZ2V0RnVsbFBhdGggPSBfZ2V0RnVsbFBhdGg7XG5jb25zdCBUUkFJTElOR19TTEFTSF9IQVNIID0gLyNcXC8/JC87XG5mdW5jdGlvbiBub3JtYWxpemVJZChpZCkge1xuICAgIHJldHVybiBpZCA/IGlkLnJlcGxhY2UoVFJBSUxJTkdfU0xBU0hfSEFTSCwgXCJcIikgOiBcIlwiO1xufVxuZXhwb3J0cy5ub3JtYWxpemVJZCA9IG5vcm1hbGl6ZUlkO1xuZnVuY3Rpb24gcmVzb2x2ZVVybChyZXNvbHZlciwgYmFzZUlkLCBpZCkge1xuICAgIGlkID0gbm9ybWFsaXplSWQoaWQpO1xuICAgIHJldHVybiByZXNvbHZlci5yZXNvbHZlKGJhc2VJZCwgaWQpO1xufVxuZXhwb3J0cy5yZXNvbHZlVXJsID0gcmVzb2x2ZVVybDtcbmNvbnN0IEFOQ0hPUiA9IC9eW2Etel9dWy1hLXowLTkuX10qJC9pO1xuZnVuY3Rpb24gZ2V0U2NoZW1hUmVmcyhzY2hlbWEsIGJhc2VJZCkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4ge307XG4gICAgY29uc3QgeyBzY2hlbWFJZCwgdXJpUmVzb2x2ZXIgfSA9IHRoaXMub3B0cztcbiAgICBjb25zdCBzY2hJZCA9IG5vcm1hbGl6ZUlkKHNjaGVtYVtzY2hlbWFJZF0gfHwgYmFzZUlkKTtcbiAgICBjb25zdCBiYXNlSWRzID0geyBcIlwiOiBzY2hJZCB9O1xuICAgIGNvbnN0IHBhdGhQcmVmaXggPSBnZXRGdWxsUGF0aCh1cmlSZXNvbHZlciwgc2NoSWQsIGZhbHNlKTtcbiAgICBjb25zdCBsb2NhbFJlZnMgPSB7fTtcbiAgICBjb25zdCBzY2hlbWFSZWZzID0gbmV3IFNldCgpO1xuICAgIHRyYXZlcnNlKHNjaGVtYSwgeyBhbGxLZXlzOiB0cnVlIH0sIChzY2gsIGpzb25QdHIsIF8sIHBhcmVudEpzb25QdHIpID0+IHtcbiAgICAgICAgaWYgKHBhcmVudEpzb25QdHIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgZnVsbFBhdGggPSBwYXRoUHJlZml4ICsganNvblB0cjtcbiAgICAgICAgbGV0IGJhc2VJZCA9IGJhc2VJZHNbcGFyZW50SnNvblB0cl07XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoW3NjaGVtYUlkXSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgYmFzZUlkID0gYWRkUmVmLmNhbGwodGhpcywgc2NoW3NjaGVtYUlkXSk7XG4gICAgICAgIGFkZEFuY2hvci5jYWxsKHRoaXMsIHNjaC4kYW5jaG9yKTtcbiAgICAgICAgYWRkQW5jaG9yLmNhbGwodGhpcywgc2NoLiRkeW5hbWljQW5jaG9yKTtcbiAgICAgICAgYmFzZUlkc1tqc29uUHRyXSA9IGJhc2VJZDtcbiAgICAgICAgZnVuY3Rpb24gYWRkUmVmKHJlZikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmJvdW5kLW1ldGhvZFxuICAgICAgICAgICAgY29uc3QgX3Jlc29sdmUgPSB0aGlzLm9wdHMudXJpUmVzb2x2ZXIucmVzb2x2ZTtcbiAgICAgICAgICAgIHJlZiA9IG5vcm1hbGl6ZUlkKGJhc2VJZCA/IF9yZXNvbHZlKGJhc2VJZCwgcmVmKSA6IHJlZik7XG4gICAgICAgICAgICBpZiAoc2NoZW1hUmVmcy5oYXMocmVmKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBhbWJpZ3VvcyhyZWYpO1xuICAgICAgICAgICAgc2NoZW1hUmVmcy5hZGQocmVmKTtcbiAgICAgICAgICAgIGxldCBzY2hPclJlZiA9IHRoaXMucmVmc1tyZWZdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hPclJlZiA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIHNjaE9yUmVmID0gdGhpcy5yZWZzW3NjaE9yUmVmXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoT3JSZWYgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGNoZWNrQW1iaWd1b3NSZWYoc2NoLCBzY2hPclJlZi5zY2hlbWEsIHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZWYgIT09IG5vcm1hbGl6ZUlkKGZ1bGxQYXRoKSkge1xuICAgICAgICAgICAgICAgIGlmIChyZWZbMF0gPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQW1iaWd1b3NSZWYoc2NoLCBsb2NhbFJlZnNbcmVmXSwgcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxSZWZzW3JlZl0gPSBzY2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbcmVmXSA9IGZ1bGxQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWY7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWRkQW5jaG9yKGFuY2hvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhbmNob3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmICghQU5DSE9SLnRlc3QoYW5jaG9yKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGFuY2hvciBcIiR7YW5jaG9yfVwiYCk7XG4gICAgICAgICAgICAgICAgYWRkUmVmLmNhbGwodGhpcywgYCMke2FuY2hvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBsb2NhbFJlZnM7XG4gICAgZnVuY3Rpb24gY2hlY2tBbWJpZ3Vvc1JlZihzY2gxLCBzY2gyLCByZWYpIHtcbiAgICAgICAgaWYgKHNjaDIgIT09IHVuZGVmaW5lZCAmJiAhZXF1YWwoc2NoMSwgc2NoMikpXG4gICAgICAgICAgICB0aHJvdyBhbWJpZ3VvcyhyZWYpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhbWJpZ3VvcyhyZWYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVmZXJlbmNlIFwiJHtyZWZ9XCIgcmVzb2x2ZXMgdG8gbW9yZSB0aGFuIG9uZSBzY2hlbWFgKTtcbiAgICB9XG59XG5leHBvcnRzLmdldFNjaGVtYVJlZnMgPSBnZXRTY2hlbWFSZWZzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb2x2ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UnVsZXMgPSBleHBvcnRzLmlzSlNPTlR5cGUgPSB2b2lkIDA7XG5jb25zdCBfanNvblR5cGVzID0gW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiaW50ZWdlclwiLCBcImJvb2xlYW5cIiwgXCJudWxsXCIsIFwib2JqZWN0XCIsIFwiYXJyYXlcIl07XG5jb25zdCBqc29uVHlwZXMgPSBuZXcgU2V0KF9qc29uVHlwZXMpO1xuZnVuY3Rpb24gaXNKU09OVHlwZSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09IFwic3RyaW5nXCIgJiYganNvblR5cGVzLmhhcyh4KTtcbn1cbmV4cG9ydHMuaXNKU09OVHlwZSA9IGlzSlNPTlR5cGU7XG5mdW5jdGlvbiBnZXRSdWxlcygpIHtcbiAgICBjb25zdCBncm91cHMgPSB7XG4gICAgICAgIG51bWJlcjogeyB0eXBlOiBcIm51bWJlclwiLCBydWxlczogW10gfSxcbiAgICAgICAgc3RyaW5nOiB7IHR5cGU6IFwic3RyaW5nXCIsIHJ1bGVzOiBbXSB9LFxuICAgICAgICBhcnJheTogeyB0eXBlOiBcImFycmF5XCIsIHJ1bGVzOiBbXSB9LFxuICAgICAgICBvYmplY3Q6IHsgdHlwZTogXCJvYmplY3RcIiwgcnVsZXM6IFtdIH0sXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlczogeyAuLi5ncm91cHMsIGludGVnZXI6IHRydWUsIGJvb2xlYW46IHRydWUsIG51bGw6IHRydWUgfSxcbiAgICAgICAgcnVsZXM6IFt7IHJ1bGVzOiBbXSB9LCBncm91cHMubnVtYmVyLCBncm91cHMuc3RyaW5nLCBncm91cHMuYXJyYXksIGdyb3Vwcy5vYmplY3RdLFxuICAgICAgICBwb3N0OiB7IHJ1bGVzOiBbXSB9LFxuICAgICAgICBhbGw6IHt9LFxuICAgICAgICBrZXl3b3Jkczoge30sXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0UnVsZXMgPSBnZXRSdWxlcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jaGVja1N0cmljdE1vZGUgPSBleHBvcnRzLmdldEVycm9yUGF0aCA9IGV4cG9ydHMuVHlwZSA9IGV4cG9ydHMudXNlRnVuYyA9IGV4cG9ydHMuc2V0RXZhbHVhdGVkID0gZXhwb3J0cy5ldmFsdWF0ZWRQcm9wc1RvTmFtZSA9IGV4cG9ydHMubWVyZ2VFdmFsdWF0ZWQgPSBleHBvcnRzLmVhY2hJdGVtID0gZXhwb3J0cy51bmVzY2FwZUpzb25Qb2ludGVyID0gZXhwb3J0cy5lc2NhcGVKc29uUG9pbnRlciA9IGV4cG9ydHMuZXNjYXBlRnJhZ21lbnQgPSBleHBvcnRzLnVuZXNjYXBlRnJhZ21lbnQgPSBleHBvcnRzLnNjaGVtYVJlZk9yVmFsID0gZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0J1dFJlZiA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXMgPSBleHBvcnRzLmNoZWNrVW5rbm93blJ1bGVzID0gZXhwb3J0cy5hbHdheXNWYWxpZFNjaGVtYSA9IGV4cG9ydHMudG9IYXNoID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW4vY29kZVwiKTtcbi8vIFRPRE8gcmVmYWN0b3IgdG8gdXNlIFNldFxuZnVuY3Rpb24gdG9IYXNoKGFycikge1xuICAgIGNvbnN0IGhhc2ggPSB7fTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYXJyKVxuICAgICAgICBoYXNoW2l0ZW1dID0gdHJ1ZTtcbiAgICByZXR1cm4gaGFzaDtcbn1cbmV4cG9ydHMudG9IYXNoID0gdG9IYXNoO1xuZnVuY3Rpb24gYWx3YXlzVmFsaWRTY2hlbWEoaXQsIHNjaGVtYSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2hlY2tVbmtub3duUnVsZXMoaXQsIHNjaGVtYSk7XG4gICAgcmV0dXJuICFzY2hlbWFIYXNSdWxlcyhzY2hlbWEsIGl0LnNlbGYuUlVMRVMuYWxsKTtcbn1cbmV4cG9ydHMuYWx3YXlzVmFsaWRTY2hlbWEgPSBhbHdheXNWYWxpZFNjaGVtYTtcbmZ1bmN0aW9uIGNoZWNrVW5rbm93blJ1bGVzKGl0LCBzY2hlbWEgPSBpdC5zY2hlbWEpIHtcbiAgICBjb25zdCB7IG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgIGlmICghb3B0cy5zdHJpY3RTY2hlbWEpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBydWxlcyA9IHNlbGYuUlVMRVMua2V5d29yZHM7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmICghcnVsZXNba2V5XSlcbiAgICAgICAgICAgIGNoZWNrU3RyaWN0TW9kZShpdCwgYHVua25vd24ga2V5d29yZDogXCIke2tleX1cImApO1xuICAgIH1cbn1cbmV4cG9ydHMuY2hlY2tVbmtub3duUnVsZXMgPSBjaGVja1Vua25vd25SdWxlcztcbmZ1bmN0aW9uIHNjaGVtYUhhc1J1bGVzKHNjaGVtYSwgcnVsZXMpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuICFzY2hlbWE7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKVxuICAgICAgICBpZiAocnVsZXNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuc2NoZW1hSGFzUnVsZXMgPSBzY2hlbWFIYXNSdWxlcztcbmZ1bmN0aW9uIHNjaGVtYUhhc1J1bGVzQnV0UmVmKHNjaGVtYSwgUlVMRVMpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuICFzY2hlbWE7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKVxuICAgICAgICBpZiAoa2V5ICE9PSBcIiRyZWZcIiAmJiBSVUxFUy5hbGxba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuc2NoZW1hSGFzUnVsZXNCdXRSZWYgPSBzY2hlbWFIYXNSdWxlc0J1dFJlZjtcbmZ1bmN0aW9uIHNjaGVtYVJlZk9yVmFsKHsgdG9wU2NoZW1hUmVmLCBzY2hlbWFQYXRoIH0sIHNjaGVtYSwga2V5d29yZCwgJGRhdGEpIHtcbiAgICBpZiAoISRkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWF9YDtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfWA7XG59XG5leHBvcnRzLnNjaGVtYVJlZk9yVmFsID0gc2NoZW1hUmVmT3JWYWw7XG5mdW5jdGlvbiB1bmVzY2FwZUZyYWdtZW50KHN0cikge1xuICAgIHJldHVybiB1bmVzY2FwZUpzb25Qb2ludGVyKGRlY29kZVVSSUNvbXBvbmVudChzdHIpKTtcbn1cbmV4cG9ydHMudW5lc2NhcGVGcmFnbWVudCA9IHVuZXNjYXBlRnJhZ21lbnQ7XG5mdW5jdGlvbiBlc2NhcGVGcmFnbWVudChzdHIpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGVzY2FwZUpzb25Qb2ludGVyKHN0cikpO1xufVxuZXhwb3J0cy5lc2NhcGVGcmFnbWVudCA9IGVzY2FwZUZyYWdtZW50O1xuZnVuY3Rpb24gZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIGAke3N0cn1gO1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcLy9nLCBcIn4xXCIpO1xufVxuZXhwb3J0cy5lc2NhcGVKc29uUG9pbnRlciA9IGVzY2FwZUpzb25Qb2ludGVyO1xuZnVuY3Rpb24gdW5lc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL34xL2csIFwiL1wiKS5yZXBsYWNlKC9+MC9nLCBcIn5cIik7XG59XG5leHBvcnRzLnVuZXNjYXBlSnNvblBvaW50ZXIgPSB1bmVzY2FwZUpzb25Qb2ludGVyO1xuZnVuY3Rpb24gZWFjaEl0ZW0oeHMsIGYpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4cykpIHtcbiAgICAgICAgZm9yIChjb25zdCB4IG9mIHhzKVxuICAgICAgICAgICAgZih4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGYoeHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuZWFjaEl0ZW0gPSBlYWNoSXRlbTtcbmZ1bmN0aW9uIG1ha2VNZXJnZUV2YWx1YXRlZCh7IG1lcmdlTmFtZXMsIG1lcmdlVG9OYW1lLCBtZXJnZVZhbHVlcywgcmVzdWx0VG9OYW1lLCB9KSB7XG4gICAgcmV0dXJuIChnZW4sIGZyb20sIHRvLCB0b05hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gdG8gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBmcm9tXG4gICAgICAgICAgICA6IHRvIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWVcbiAgICAgICAgICAgICAgICA/IChmcm9tIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyBtZXJnZU5hbWVzKGdlbiwgZnJvbSwgdG8pIDogbWVyZ2VUb05hbWUoZ2VuLCBmcm9tLCB0byksIHRvKVxuICAgICAgICAgICAgICAgIDogZnJvbSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lXG4gICAgICAgICAgICAgICAgICAgID8gKG1lcmdlVG9OYW1lKGdlbiwgdG8sIGZyb20pLCBmcm9tKVxuICAgICAgICAgICAgICAgICAgICA6IG1lcmdlVmFsdWVzKGZyb20sIHRvKTtcbiAgICAgICAgcmV0dXJuIHRvTmFtZSA9PT0gY29kZWdlbl8xLk5hbWUgJiYgIShyZXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkgPyByZXN1bHRUb05hbWUoZ2VuLCByZXMpIDogcmVzO1xuICAgIH07XG59XG5leHBvcnRzLm1lcmdlRXZhbHVhdGVkID0ge1xuICAgIHByb3BzOiBtYWtlTWVyZ2VFdmFsdWF0ZWQoe1xuICAgICAgICBtZXJnZU5hbWVzOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlICYmICR7ZnJvbX0gIT09IHVuZGVmaW5lZGAsICgpID0+IHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2Zyb219ID09PSB0cnVlYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgdHJ1ZSksICgpID0+IGdlbi5hc3NpZ24odG8sICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99IHx8IHt9YCkuY29kZSgoMCwgY29kZWdlbl8xLl8pIGBPYmplY3QuYXNzaWduKCR7dG99LCAke2Zyb219KWApKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1lcmdlVG9OYW1lOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlYCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZyb20gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHRvLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odG8sICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99IHx8IHt9YCk7XG4gICAgICAgICAgICAgICAgc2V0RXZhbHVhdGVkKGdlbiwgdG8sIGZyb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgbWVyZ2VWYWx1ZXM6IChmcm9tLCB0bykgPT4gKGZyb20gPT09IHRydWUgPyB0cnVlIDogeyAuLi5mcm9tLCAuLi50byB9KSxcbiAgICAgICAgcmVzdWx0VG9OYW1lOiBldmFsdWF0ZWRQcm9wc1RvTmFtZSxcbiAgICB9KSxcbiAgICBpdGVtczogbWFrZU1lcmdlRXZhbHVhdGVkKHtcbiAgICAgICAgbWVyZ2VOYW1lczogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZSAmJiAke2Zyb219ICE9PSB1bmRlZmluZWRgLCAoKSA9PiBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke2Zyb219ID09PSB0cnVlID8gdHJ1ZSA6ICR7dG99ID4gJHtmcm9tfSA/ICR7dG99IDogJHtmcm9tfWApKSxcbiAgICAgICAgbWVyZ2VUb05hbWU6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWVgLCAoKSA9PiBnZW4uYXNzaWduKHRvLCBmcm9tID09PSB0cnVlID8gdHJ1ZSA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ID4gJHtmcm9tfSA/ICR7dG99IDogJHtmcm9tfWApKSxcbiAgICAgICAgbWVyZ2VWYWx1ZXM6IChmcm9tLCB0bykgPT4gKGZyb20gPT09IHRydWUgPyB0cnVlIDogTWF0aC5tYXgoZnJvbSwgdG8pKSxcbiAgICAgICAgcmVzdWx0VG9OYW1lOiAoZ2VuLCBpdGVtcykgPT4gZ2VuLnZhcihcIml0ZW1zXCIsIGl0ZW1zKSxcbiAgICB9KSxcbn07XG5mdW5jdGlvbiBldmFsdWF0ZWRQcm9wc1RvTmFtZShnZW4sIHBzKSB7XG4gICAgaWYgKHBzID09PSB0cnVlKVxuICAgICAgICByZXR1cm4gZ2VuLnZhcihcInByb3BzXCIsIHRydWUpO1xuICAgIGNvbnN0IHByb3BzID0gZ2VuLnZhcihcInByb3BzXCIsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgaWYgKHBzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHNldEV2YWx1YXRlZChnZW4sIHByb3BzLCBwcyk7XG4gICAgcmV0dXJuIHByb3BzO1xufVxuZXhwb3J0cy5ldmFsdWF0ZWRQcm9wc1RvTmFtZSA9IGV2YWx1YXRlZFByb3BzVG9OYW1lO1xuZnVuY3Rpb24gc2V0RXZhbHVhdGVkKGdlbiwgcHJvcHMsIHBzKSB7XG4gICAgT2JqZWN0LmtleXMocHMpLmZvckVhY2goKHApID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtwcm9wc30keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHApfWAsIHRydWUpKTtcbn1cbmV4cG9ydHMuc2V0RXZhbHVhdGVkID0gc2V0RXZhbHVhdGVkO1xuY29uc3Qgc25pcHBldHMgPSB7fTtcbmZ1bmN0aW9uIHVzZUZ1bmMoZ2VuLCBmKSB7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwiZnVuY1wiLCB7XG4gICAgICAgIHJlZjogZixcbiAgICAgICAgY29kZTogc25pcHBldHNbZi5jb2RlXSB8fCAoc25pcHBldHNbZi5jb2RlXSA9IG5ldyBjb2RlXzEuX0NvZGUoZi5jb2RlKSksXG4gICAgfSk7XG59XG5leHBvcnRzLnVzZUZ1bmMgPSB1c2VGdW5jO1xudmFyIFR5cGU7XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICBUeXBlW1R5cGVbXCJOdW1cIl0gPSAwXSA9IFwiTnVtXCI7XG4gICAgVHlwZVtUeXBlW1wiU3RyXCJdID0gMV0gPSBcIlN0clwiO1xufSkoVHlwZSA9IGV4cG9ydHMuVHlwZSB8fCAoZXhwb3J0cy5UeXBlID0ge30pKTtcbmZ1bmN0aW9uIGdldEVycm9yUGF0aChkYXRhUHJvcCwgZGF0YVByb3BUeXBlLCBqc1Byb3BlcnR5U3ludGF4KSB7XG4gICAgLy8gbGV0IHBhdGhcbiAgICBpZiAoZGF0YVByb3AgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkge1xuICAgICAgICBjb25zdCBpc051bWJlciA9IGRhdGFQcm9wVHlwZSA9PT0gVHlwZS5OdW07XG4gICAgICAgIHJldHVybiBqc1Byb3BlcnR5U3ludGF4XG4gICAgICAgICAgICA/IGlzTnVtYmVyXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGBcIltcIiArICR7ZGF0YVByb3B9ICsgXCJdXCJgXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGBcIlsnXCIgKyAke2RhdGFQcm9wfSArIFwiJ11cImBcbiAgICAgICAgICAgIDogaXNOdW1iZXJcbiAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYFwiL1wiICsgJHtkYXRhUHJvcH1gXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGBcIi9cIiArICR7ZGF0YVByb3B9LnJlcGxhY2UoL34vZywgXCJ+MFwiKS5yZXBsYWNlKC9cXFxcLy9nLCBcIn4xXCIpYDsgLy8gVE9ETyBtYXliZSB1c2UgZ2xvYmFsIGVzY2FwZVBvaW50ZXJcbiAgICB9XG4gICAgcmV0dXJuIGpzUHJvcGVydHlTeW50YXggPyAoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShkYXRhUHJvcCkudG9TdHJpbmcoKSA6IFwiL1wiICsgZXNjYXBlSnNvblBvaW50ZXIoZGF0YVByb3ApO1xufVxuZXhwb3J0cy5nZXRFcnJvclBhdGggPSBnZXRFcnJvclBhdGg7XG5mdW5jdGlvbiBjaGVja1N0cmljdE1vZGUoaXQsIG1zZywgbW9kZSA9IGl0Lm9wdHMuc3RyaWN0U2NoZW1hKSB7XG4gICAgaWYgKCFtb2RlKVxuICAgICAgICByZXR1cm47XG4gICAgbXNnID0gYHN0cmljdCBtb2RlOiAke21zZ31gO1xuICAgIGlmIChtb2RlID09PSB0cnVlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICBpdC5zZWxmLmxvZ2dlci53YXJuKG1zZyk7XG59XG5leHBvcnRzLmNoZWNrU3RyaWN0TW9kZSA9IGNoZWNrU3RyaWN0TW9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNob3VsZFVzZVJ1bGUgPSBleHBvcnRzLnNob3VsZFVzZUdyb3VwID0gZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0ZvclR5cGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlc0ZvclR5cGUoeyBzY2hlbWEsIHNlbGYgfSwgdHlwZSkge1xuICAgIGNvbnN0IGdyb3VwID0gc2VsZi5SVUxFUy50eXBlc1t0eXBlXTtcbiAgICByZXR1cm4gZ3JvdXAgJiYgZ3JvdXAgIT09IHRydWUgJiYgc2hvdWxkVXNlR3JvdXAoc2NoZW1hLCBncm91cCk7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzRm9yVHlwZSA9IHNjaGVtYUhhc1J1bGVzRm9yVHlwZTtcbmZ1bmN0aW9uIHNob3VsZFVzZUdyb3VwKHNjaGVtYSwgZ3JvdXApIHtcbiAgICByZXR1cm4gZ3JvdXAucnVsZXMuc29tZSgocnVsZSkgPT4gc2hvdWxkVXNlUnVsZShzY2hlbWEsIHJ1bGUpKTtcbn1cbmV4cG9ydHMuc2hvdWxkVXNlR3JvdXAgPSBzaG91bGRVc2VHcm91cDtcbmZ1bmN0aW9uIHNob3VsZFVzZVJ1bGUoc2NoZW1hLCBydWxlKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoc2NoZW1hW3J1bGUua2V5d29yZF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoKF9hID0gcnVsZS5kZWZpbml0aW9uLmltcGxlbWVudHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zb21lKChrd2QpID0+IHNjaGVtYVtrd2RdICE9PSB1bmRlZmluZWQpKSk7XG59XG5leHBvcnRzLnNob3VsZFVzZVJ1bGUgPSBzaG91bGRVc2VSdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwbGljYWJpbGl0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYm9vbE9yRW1wdHlTY2hlbWEgPSBleHBvcnRzLnRvcEJvb2xPckVtcHR5U2NoZW1hID0gdm9pZCAwO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgYm9vbEVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwiYm9vbGVhbiBzY2hlbWEgaXMgZmFsc2VcIixcbn07XG5mdW5jdGlvbiB0b3BCb29sT3JFbXB0eVNjaGVtYShpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHZhbGlkYXRlTmFtZSB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZmFsc2VTY2hlbWFFcnJvcihpdCwgZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgc2NoZW1hLiRhc3luYyA9PT0gdHJ1ZSkge1xuICAgICAgICBnZW4ucmV0dXJuKG5hbWVzXzEuZGVmYXVsdC5kYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmVycm9yc2AsIG51bGwpO1xuICAgICAgICBnZW4ucmV0dXJuKHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydHMudG9wQm9vbE9yRW1wdHlTY2hlbWEgPSB0b3BCb29sT3JFbXB0eVNjaGVtYTtcbmZ1bmN0aW9uIGJvb2xPckVtcHR5U2NoZW1hKGl0LCB2YWxpZCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGdlbi52YXIodmFsaWQsIGZhbHNlKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgZmFsc2VTY2hlbWFFcnJvcihpdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTsgLy8gVE9ETyB2YXJcbiAgICB9XG59XG5leHBvcnRzLmJvb2xPckVtcHR5U2NoZW1hID0gYm9vbE9yRW1wdHlTY2hlbWE7XG5mdW5jdGlvbiBmYWxzZVNjaGVtYUVycm9yKGl0LCBvdmVycmlkZUFsbEVycm9ycykge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhIH0gPSBpdDtcbiAgICAvLyBUT0RPIG1heWJlIHNvbWUgb3RoZXIgaW50ZXJmYWNlIHNob3VsZCBiZSB1c2VkIGZvciBub24ta2V5d29yZCB2YWxpZGF0aW9uIGVycm9ycy4uLlxuICAgIGNvbnN0IGN4dCA9IHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBrZXl3b3JkOiBcImZhbHNlIHNjaGVtYVwiLFxuICAgICAgICBkYXRhLFxuICAgICAgICBzY2hlbWE6IGZhbHNlLFxuICAgICAgICBzY2hlbWFDb2RlOiBmYWxzZSxcbiAgICAgICAgc2NoZW1hVmFsdWU6IGZhbHNlLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBpdCxcbiAgICB9O1xuICAgICgwLCBlcnJvcnNfMS5yZXBvcnRFcnJvcikoY3h0LCBib29sRXJyb3IsIHVuZGVmaW5lZCwgb3ZlcnJpZGVBbGxFcnJvcnMpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vbFNjaGVtYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVwb3J0VHlwZUVycm9yID0gZXhwb3J0cy5jaGVja0RhdGFUeXBlcyA9IGV4cG9ydHMuY2hlY2tEYXRhVHlwZSA9IGV4cG9ydHMuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSA9IGV4cG9ydHMuZ2V0SlNPTlR5cGVzID0gZXhwb3J0cy5nZXRTY2hlbWFUeXBlcyA9IGV4cG9ydHMuRGF0YVR5cGUgPSB2b2lkIDA7XG5jb25zdCBydWxlc18xID0gcmVxdWlyZShcIi4uL3J1bGVzXCIpO1xuY29uc3QgYXBwbGljYWJpbGl0eV8xID0gcmVxdWlyZShcIi4vYXBwbGljYWJpbGl0eVwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgRGF0YVR5cGU7XG4oZnVuY3Rpb24gKERhdGFUeXBlKSB7XG4gICAgRGF0YVR5cGVbRGF0YVR5cGVbXCJDb3JyZWN0XCJdID0gMF0gPSBcIkNvcnJlY3RcIjtcbiAgICBEYXRhVHlwZVtEYXRhVHlwZVtcIldyb25nXCJdID0gMV0gPSBcIldyb25nXCI7XG59KShEYXRhVHlwZSA9IGV4cG9ydHMuRGF0YVR5cGUgfHwgKGV4cG9ydHMuRGF0YVR5cGUgPSB7fSkpO1xuZnVuY3Rpb24gZ2V0U2NoZW1hVHlwZXMoc2NoZW1hKSB7XG4gICAgY29uc3QgdHlwZXMgPSBnZXRKU09OVHlwZXMoc2NoZW1hLnR5cGUpO1xuICAgIGNvbnN0IGhhc051bGwgPSB0eXBlcy5pbmNsdWRlcyhcIm51bGxcIik7XG4gICAgaWYgKGhhc051bGwpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5udWxsYWJsZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlOiBudWxsIGNvbnRyYWRpY3RzIG51bGxhYmxlOiBmYWxzZVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghdHlwZXMubGVuZ3RoICYmIHNjaGVtYS5udWxsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wibnVsbGFibGVcIiBjYW5ub3QgYmUgdXNlZCB3aXRob3V0IFwidHlwZVwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5udWxsYWJsZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHR5cGVzLnB1c2goXCJudWxsXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG59XG5leHBvcnRzLmdldFNjaGVtYVR5cGVzID0gZ2V0U2NoZW1hVHlwZXM7XG5mdW5jdGlvbiBnZXRKU09OVHlwZXModHMpIHtcbiAgICBjb25zdCB0eXBlcyA9IEFycmF5LmlzQXJyYXkodHMpID8gdHMgOiB0cyA/IFt0c10gOiBbXTtcbiAgICBpZiAodHlwZXMuZXZlcnkocnVsZXNfMS5pc0pTT05UeXBlKSlcbiAgICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgbXVzdCBiZSBKU09OVHlwZSBvciBKU09OVHlwZVtdOiBcIiArIHR5cGVzLmpvaW4oXCIsXCIpKTtcbn1cbmV4cG9ydHMuZ2V0SlNPTlR5cGVzID0gZ2V0SlNPTlR5cGVzO1xuZnVuY3Rpb24gY29lcmNlQW5kQ2hlY2tEYXRhVHlwZShpdCwgdHlwZXMpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgb3B0cyB9ID0gaXQ7XG4gICAgY29uc3QgY29lcmNlVG8gPSBjb2VyY2VUb1R5cGVzKHR5cGVzLCBvcHRzLmNvZXJjZVR5cGVzKTtcbiAgICBjb25zdCBjaGVja1R5cGVzID0gdHlwZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAhKGNvZXJjZVRvLmxlbmd0aCA9PT0gMCAmJiB0eXBlcy5sZW5ndGggPT09IDEgJiYgKDAsIGFwcGxpY2FiaWxpdHlfMS5zY2hlbWFIYXNSdWxlc0ZvclR5cGUpKGl0LCB0eXBlc1swXSkpO1xuICAgIGlmIChjaGVja1R5cGVzKSB7XG4gICAgICAgIGNvbnN0IHdyb25nVHlwZSA9IGNoZWNrRGF0YVR5cGVzKHR5cGVzLCBkYXRhLCBvcHRzLnN0cmljdE51bWJlcnMsIERhdGFUeXBlLldyb25nKTtcbiAgICAgICAgZ2VuLmlmKHdyb25nVHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvZXJjZVRvLmxlbmd0aClcbiAgICAgICAgICAgICAgICBjb2VyY2VEYXRhKGl0LCB0eXBlcywgY29lcmNlVG8pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcG9ydFR5cGVFcnJvcihpdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hlY2tUeXBlcztcbn1cbmV4cG9ydHMuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSA9IGNvZXJjZUFuZENoZWNrRGF0YVR5cGU7XG5jb25zdCBDT0VSQ0lCTEUgPSBuZXcgU2V0KFtcInN0cmluZ1wiLCBcIm51bWJlclwiLCBcImludGVnZXJcIiwgXCJib29sZWFuXCIsIFwibnVsbFwiXSk7XG5mdW5jdGlvbiBjb2VyY2VUb1R5cGVzKHR5cGVzLCBjb2VyY2VUeXBlcykge1xuICAgIHJldHVybiBjb2VyY2VUeXBlc1xuICAgICAgICA/IHR5cGVzLmZpbHRlcigodCkgPT4gQ09FUkNJQkxFLmhhcyh0KSB8fCAoY29lcmNlVHlwZXMgPT09IFwiYXJyYXlcIiAmJiB0ID09PSBcImFycmF5XCIpKVxuICAgICAgICA6IFtdO1xufVxuZnVuY3Rpb24gY29lcmNlRGF0YShpdCwgdHlwZXMsIGNvZXJjZVRvKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IGRhdGFUeXBlID0gZ2VuLmxldChcImRhdGFUeXBlXCIsICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9YCk7XG4gICAgY29uc3QgY29lcmNlZCA9IGdlbi5sZXQoXCJjb2VyY2VkXCIsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgIGlmIChvcHRzLmNvZXJjZVR5cGVzID09PSBcImFycmF5XCIpIHtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoJHtkYXRhfSkgJiYgJHtkYXRhfS5sZW5ndGggPT0gMWAsICgpID0+IGdlblxuICAgICAgICAgICAgLmFzc2lnbihkYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9WzBdYClcbiAgICAgICAgICAgIC5hc3NpZ24oZGF0YVR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9YClcbiAgICAgICAgICAgIC5pZihjaGVja0RhdGFUeXBlcyh0eXBlcywgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzKSwgKCkgPT4gZ2VuLmFzc2lnbihjb2VyY2VkLCBkYXRhKSkpO1xuICAgIH1cbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb2VyY2VkfSAhPT0gdW5kZWZpbmVkYCk7XG4gICAgZm9yIChjb25zdCB0IG9mIGNvZXJjZVRvKSB7XG4gICAgICAgIGlmIChDT0VSQ0lCTEUuaGFzKHQpIHx8ICh0ID09PSBcImFycmF5XCIgJiYgb3B0cy5jb2VyY2VUeXBlcyA9PT0gXCJhcnJheVwiKSkge1xuICAgICAgICAgICAgY29lcmNlU3BlY2lmaWNUeXBlKHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdlbi5lbHNlKCk7XG4gICAgcmVwb3J0VHlwZUVycm9yKGl0KTtcbiAgICBnZW4uZW5kSWYoKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb2VyY2VkfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4ge1xuICAgICAgICBnZW4uYXNzaWduKGRhdGEsIGNvZXJjZWQpO1xuICAgICAgICBhc3NpZ25QYXJlbnREYXRhKGl0LCBjb2VyY2VkKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjb2VyY2VTcGVjaWZpY1R5cGUodCkge1xuICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSBcIm51bWJlclwiIHx8ICR7ZGF0YVR5cGV9ID09IFwiYm9vbGVhblwiYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGBcIlwiICsgJHtkYXRhfWApXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gbnVsbGApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcImApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSBcImJvb2xlYW5cIiB8fCAke2RhdGF9ID09PSBudWxsXG4gICAgICAgICAgICAgIHx8ICgke2RhdGFUeXBlfSA9PSBcInN0cmluZ1wiICYmICR7ZGF0YX0gJiYgJHtkYXRhfSA9PSArJHtkYXRhfSlgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYCske2RhdGF9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImludGVnZXJcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbFxuICAgICAgICAgICAgICB8fCAoJHtkYXRhVHlwZX0gPT09IFwic3RyaW5nXCIgJiYgJHtkYXRhfSAmJiAke2RhdGF9ID09ICske2RhdGF9ICYmICEoJHtkYXRhfSAlIDEpKWApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgKyR7ZGF0YX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IFwiZmFsc2VcIiB8fCAke2RhdGF9ID09PSAwIHx8ICR7ZGF0YX0gPT09IG51bGxgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IFwidHJ1ZVwiIHx8ICR7ZGF0YX0gPT09IDFgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudWxsXCI6XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcIlwiIHx8ICR7ZGF0YX0gPT09IDAgfHwgJHtkYXRhfSA9PT0gZmFsc2VgKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKGNvZXJjZWQsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09PSBcInN0cmluZ1wiIHx8ICR7ZGF0YVR5cGV9ID09PSBcIm51bWJlclwiXG4gICAgICAgICAgICAgIHx8ICR7ZGF0YVR5cGV9ID09PSBcImJvb2xlYW5cIiB8fCAke2RhdGF9ID09PSBudWxsYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtkYXRhfV1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2lnblBhcmVudERhdGEoeyBnZW4sIHBhcmVudERhdGEsIHBhcmVudERhdGFQcm9wZXJ0eSB9LCBleHByKSB7XG4gICAgLy8gVE9ETyB1c2UgZ2VuLnByb3BlcnR5XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7cGFyZW50RGF0YX0gIT09IHVuZGVmaW5lZGAsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtwYXJlbnREYXRhfVske3BhcmVudERhdGFQcm9wZXJ0eX1dYCwgZXhwcikpO1xufVxuZnVuY3Rpb24gY2hlY2tEYXRhVHlwZShkYXRhVHlwZSwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCA9IERhdGFUeXBlLkNvcnJlY3QpIHtcbiAgICBjb25zdCBFUSA9IGNvcnJlY3QgPT09IERhdGFUeXBlLkNvcnJlY3QgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkVRIDogY29kZWdlbl8xLm9wZXJhdG9ycy5ORVE7XG4gICAgbGV0IGNvbmQ7XG4gICAgc3dpdGNoIChkYXRhVHlwZSkge1xuICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gJHtFUX0gbnVsbGA7XG4gICAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYEFycmF5LmlzQXJyYXkoJHtkYXRhfSlgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICYmIHR5cGVvZiAke2RhdGF9ID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoJHtkYXRhfSlgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICBjb25kID0gbnVtQ29uZCgoMCwgY29kZWdlbl8xLl8pIGAhKCR7ZGF0YX0gJSAxKSAmJiAhaXNOYU4oJHtkYXRhfSlgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICBjb25kID0gbnVtQ29uZCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX0gJHtFUX0gJHtkYXRhVHlwZX1gO1xuICAgIH1cbiAgICByZXR1cm4gY29ycmVjdCA9PT0gRGF0YVR5cGUuQ29ycmVjdCA/IGNvbmQgOiAoMCwgY29kZWdlbl8xLm5vdCkoY29uZCk7XG4gICAgZnVuY3Rpb24gbnVtQ29uZChfY29uZCA9IGNvZGVnZW5fMS5uaWwpIHtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuYW5kKSgoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfSA9PSBcIm51bWJlclwiYCwgX2NvbmQsIHN0cmljdE51bXMgPyAoMCwgY29kZWdlbl8xLl8pIGBpc0Zpbml0ZSgke2RhdGF9KWAgOiBjb2RlZ2VuXzEubmlsKTtcbiAgICB9XG59XG5leHBvcnRzLmNoZWNrRGF0YVR5cGUgPSBjaGVja0RhdGFUeXBlO1xuZnVuY3Rpb24gY2hlY2tEYXRhVHlwZXMoZGF0YVR5cGVzLCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0KSB7XG4gICAgaWYgKGRhdGFUeXBlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrRGF0YVR5cGUoZGF0YVR5cGVzWzBdLCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0KTtcbiAgICB9XG4gICAgbGV0IGNvbmQ7XG4gICAgY29uc3QgdHlwZXMgPSAoMCwgdXRpbF8xLnRvSGFzaCkoZGF0YVR5cGVzKTtcbiAgICBpZiAodHlwZXMuYXJyYXkgJiYgdHlwZXMub2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IG5vdE9iaiA9ICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9ICE9IFwib2JqZWN0XCJgO1xuICAgICAgICBjb25kID0gdHlwZXMubnVsbCA/IG5vdE9iaiA6ICgwLCBjb2RlZ2VuXzEuXykgYCEke2RhdGF9IHx8ICR7bm90T2JqfWA7XG4gICAgICAgIGRlbGV0ZSB0eXBlcy5udWxsO1xuICAgICAgICBkZWxldGUgdHlwZXMuYXJyYXk7XG4gICAgICAgIGRlbGV0ZSB0eXBlcy5vYmplY3Q7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25kID0gY29kZWdlbl8xLm5pbDtcbiAgICB9XG4gICAgaWYgKHR5cGVzLm51bWJlcilcbiAgICAgICAgZGVsZXRlIHR5cGVzLmludGVnZXI7XG4gICAgZm9yIChjb25zdCB0IGluIHR5cGVzKVxuICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5hbmQpKGNvbmQsIGNoZWNrRGF0YVR5cGUodCwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCkpO1xuICAgIHJldHVybiBjb25kO1xufVxuZXhwb3J0cy5jaGVja0RhdGFUeXBlcyA9IGNoZWNrRGF0YVR5cGVzO1xuY29uc3QgdHlwZUVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYSB9KSA9PiBgbXVzdCBiZSAke3NjaGVtYX1gLFxuICAgIHBhcmFtczogKHsgc2NoZW1hLCBzY2hlbWFWYWx1ZSB9KSA9PiB0eXBlb2Ygc2NoZW1hID09IFwic3RyaW5nXCIgPyAoMCwgY29kZWdlbl8xLl8pIGB7dHlwZTogJHtzY2hlbWF9fWAgOiAoMCwgY29kZWdlbl8xLl8pIGB7dHlwZTogJHtzY2hlbWFWYWx1ZX19YCxcbn07XG5mdW5jdGlvbiByZXBvcnRUeXBlRXJyb3IoaXQpIHtcbiAgICBjb25zdCBjeHQgPSBnZXRUeXBlRXJyb3JDb250ZXh0KGl0KTtcbiAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKGN4dCwgdHlwZUVycm9yKTtcbn1cbmV4cG9ydHMucmVwb3J0VHlwZUVycm9yID0gcmVwb3J0VHlwZUVycm9yO1xuZnVuY3Rpb24gZ2V0VHlwZUVycm9yQ29udGV4dChpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWEgfSA9IGl0O1xuICAgIGNvbnN0IHNjaGVtYUNvZGUgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgc2NoZW1hLCBcInR5cGVcIik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBrZXl3b3JkOiBcInR5cGVcIixcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc2NoZW1hOiBzY2hlbWEudHlwZSxcbiAgICAgICAgc2NoZW1hQ29kZSxcbiAgICAgICAgc2NoZW1hVmFsdWU6IHNjaGVtYUNvZGUsXG4gICAgICAgIHBhcmVudFNjaGVtYTogc2NoZW1hLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBpdCxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YVR5cGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzc2lnbkRlZmF1bHRzID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmZ1bmN0aW9uIGFzc2lnbkRlZmF1bHRzKGl0LCB0eSkge1xuICAgIGNvbnN0IHsgcHJvcGVydGllcywgaXRlbXMgfSA9IGl0LnNjaGVtYTtcbiAgICBpZiAodHkgPT09IFwib2JqZWN0XCIgJiYgcHJvcGVydGllcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBhc3NpZ25EZWZhdWx0KGl0LCBrZXksIHByb3BlcnRpZXNba2V5XS5kZWZhdWx0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eSA9PT0gXCJhcnJheVwiICYmIEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKHNjaCwgaSkgPT4gYXNzaWduRGVmYXVsdChpdCwgaSwgc2NoLmRlZmF1bHQpKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2lnbkRlZmF1bHRzID0gYXNzaWduRGVmYXVsdHM7XG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0KGl0LCBwcm9wLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBjb25zdCB7IGdlbiwgY29tcG9zaXRlUnVsZSwgZGF0YSwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgY2hpbGREYXRhID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcCl9YDtcbiAgICBpZiAoY29tcG9zaXRlUnVsZSkge1xuICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBkZWZhdWx0IGlzIGlnbm9yZWQgZm9yOiAke2NoaWxkRGF0YX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY29uZGl0aW9uID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtjaGlsZERhdGF9ID09PSB1bmRlZmluZWRgO1xuICAgIGlmIChvcHRzLnVzZURlZmF1bHRzID09PSBcImVtcHR5XCIpIHtcbiAgICAgICAgY29uZGl0aW9uID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtjb25kaXRpb259IHx8ICR7Y2hpbGREYXRhfSA9PT0gbnVsbCB8fCAke2NoaWxkRGF0YX0gPT09IFwiXCJgO1xuICAgIH1cbiAgICAvLyBgJHtjaGlsZERhdGF9ID09PSB1bmRlZmluZWRgICtcbiAgICAvLyAob3B0cy51c2VEZWZhdWx0cyA9PT0gXCJlbXB0eVwiID8gYCB8fCAke2NoaWxkRGF0YX0gPT09IG51bGwgfHwgJHtjaGlsZERhdGF9ID09PSBcIlwiYCA6IFwiXCIpXG4gICAgZ2VuLmlmKGNvbmRpdGlvbiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtjaGlsZERhdGF9ID0gJHsoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkoZGVmYXVsdFZhbHVlKX1gKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXREYXRhID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gZXhwb3J0cy52YWxpZGF0ZUZ1bmN0aW9uQ29kZSA9IHZvaWQgMDtcbmNvbnN0IGJvb2xTY2hlbWFfMSA9IHJlcXVpcmUoXCIuL2Jvb2xTY2hlbWFcIik7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4vZGF0YVR5cGVcIik7XG5jb25zdCBhcHBsaWNhYmlsaXR5XzEgPSByZXF1aXJlKFwiLi9hcHBsaWNhYmlsaXR5XCIpO1xuY29uc3QgZGF0YVR5cGVfMiA9IHJlcXVpcmUoXCIuL2RhdGFUeXBlXCIpO1xuY29uc3QgZGVmYXVsdHNfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRzXCIpO1xuY29uc3Qga2V5d29yZF8xID0gcmVxdWlyZShcIi4va2V5d29yZFwiKTtcbmNvbnN0IHN1YnNjaGVtYV8xID0gcmVxdWlyZShcIi4vc3Vic2NoZW1hXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4uL3Jlc29sdmVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbi8vIHNjaGVtYSBjb21waWxhdGlvbiAtIGdlbmVyYXRlcyB2YWxpZGF0aW9uIGZ1bmN0aW9uLCBzdWJzY2hlbWFDb2RlIChiZWxvdykgaXMgdXNlZCBmb3Igc3Vic2NoZW1hc1xuZnVuY3Rpb24gdmFsaWRhdGVGdW5jdGlvbkNvZGUoaXQpIHtcbiAgICBpZiAoaXNTY2hlbWFPYmooaXQpKSB7XG4gICAgICAgIGNoZWNrS2V5d29yZHMoaXQpO1xuICAgICAgICBpZiAoc2NoZW1hQ3h0SGFzUnVsZXMoaXQpKSB7XG4gICAgICAgICAgICB0b3BTY2hlbWFPYmpDb2RlKGl0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZUZ1bmN0aW9uKGl0LCAoKSA9PiAoMCwgYm9vbFNjaGVtYV8xLnRvcEJvb2xPckVtcHR5U2NoZW1hKShpdCkpO1xufVxuZXhwb3J0cy52YWxpZGF0ZUZ1bmN0aW9uQ29kZSA9IHZhbGlkYXRlRnVuY3Rpb25Db2RlO1xuZnVuY3Rpb24gdmFsaWRhdGVGdW5jdGlvbih7IGdlbiwgdmFsaWRhdGVOYW1lLCBzY2hlbWEsIHNjaGVtYUVudiwgb3B0cyB9LCBib2R5KSB7XG4gICAgaWYgKG9wdHMuY29kZS5lczUpIHtcbiAgICAgICAgZ2VuLmZ1bmModmFsaWRhdGVOYW1lLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5kYXRhfSwgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fWAsIHNjaGVtYUVudi4kYXN5bmMsICgpID0+IHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYFwidXNlIHN0cmljdFwiOyAke2Z1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKX1gKTtcbiAgICAgICAgICAgIGRlc3RydWN0dXJlVmFsQ3h0RVM1KGdlbiwgb3B0cyk7XG4gICAgICAgICAgICBnZW4uY29kZShib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uZnVuYyh2YWxpZGF0ZU5hbWUsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmRhdGF9LCAke2Rlc3RydWN0dXJlVmFsQ3h0KG9wdHMpfWAsIHNjaGVtYUVudi4kYXN5bmMsICgpID0+IGdlbi5jb2RlKGZ1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKSkuY29kZShib2R5KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzdHJ1Y3R1cmVWYWxDeHQob3B0cykge1xuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGB7JHtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRofT1cIlwiLCAke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhfSwgJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5fSwgJHtuYW1lc18xLmRlZmF1bHQucm9vdERhdGF9PSR7bmFtZXNfMS5kZWZhdWx0LmRhdGF9JHtvcHRzLmR5bmFtaWNSZWYgPyAoMCwgY29kZWdlbl8xLl8pIGAsICR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfT17fWAgOiBjb2RlZ2VuXzEubmlsfX09e31gO1xufVxuZnVuY3Rpb24gZGVzdHJ1Y3R1cmVWYWxDeHRFUzUoZ2VuLCBvcHRzKSB7XG4gICAgZ2VuLmlmKG5hbWVzXzEuZGVmYXVsdC52YWxDeHQsICgpID0+IHtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aH1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhfWApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5fWApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5yb290RGF0YX1gKTtcbiAgICAgICAgaWYgKG9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfWApO1xuICAgIH0sICgpID0+IHtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLl8pIGBcIlwiYCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgbmFtZXNfMS5kZWZhdWx0LmRhdGEpO1xuICAgICAgICBpZiAob3B0cy5keW5hbWljUmVmKVxuICAgICAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnMsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0b3BTY2hlbWFPYmpDb2RlKGl0KSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIG9wdHMsIGdlbiB9ID0gaXQ7XG4gICAgdmFsaWRhdGVGdW5jdGlvbihpdCwgKCkgPT4ge1xuICAgICAgICBpZiAob3B0cy4kY29tbWVudCAmJiBzY2hlbWEuJGNvbW1lbnQpXG4gICAgICAgICAgICBjb21tZW50S2V5d29yZChpdCk7XG4gICAgICAgIGNoZWNrTm9EZWZhdWx0KGl0KTtcbiAgICAgICAgZ2VuLmxldChuYW1lc18xLmRlZmF1bHQudkVycm9ycywgbnVsbCk7XG4gICAgICAgIGdlbi5sZXQobmFtZXNfMS5kZWZhdWx0LmVycm9ycywgMCk7XG4gICAgICAgIGlmIChvcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmVzZXRFdmFsdWF0ZWQoaXQpO1xuICAgICAgICB0eXBlQW5kS2V5d29yZHMoaXQpO1xuICAgICAgICByZXR1cm5SZXN1bHRzKGl0KTtcbiAgICB9KTtcbiAgICByZXR1cm47XG59XG5mdW5jdGlvbiByZXNldEV2YWx1YXRlZChpdCkge1xuICAgIC8vIFRPRE8gbWF5YmUgc29tZSBob29rIHRvIGV4ZWN1dGUgaXQgaW4gdGhlIGVuZCB0byBjaGVjayB3aGV0aGVyIHByb3BzL2l0ZW1zIGFyZSBOYW1lLCBhcyBpbiBhc3NpZ25FdmFsdWF0ZWRcbiAgICBjb25zdCB7IGdlbiwgdmFsaWRhdGVOYW1lIH0gPSBpdDtcbiAgICBpdC5ldmFsdWF0ZWQgPSBnZW4uY29uc3QoXCJldmFsdWF0ZWRcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmV2YWx1YXRlZGApO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uZHluYW1pY1Byb3BzYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0ucHJvcHNgLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKSk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5keW5hbWljSXRlbXNgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5pdGVtc2AsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApKTtcbn1cbmZ1bmN0aW9uIGZ1bmNTb3VyY2VVcmwoc2NoZW1hLCBvcHRzKSB7XG4gICAgY29uc3Qgc2NoSWQgPSB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgc2NoZW1hW29wdHMuc2NoZW1hSWRdO1xuICAgIHJldHVybiBzY2hJZCAmJiAob3B0cy5jb2RlLnNvdXJjZSB8fCBvcHRzLmNvZGUucHJvY2VzcykgPyAoMCwgY29kZWdlbl8xLl8pIGAvKiMgc291cmNlVVJMPSR7c2NoSWR9ICovYCA6IGNvZGVnZW5fMS5uaWw7XG59XG4vLyBzY2hlbWEgY29tcGlsYXRpb24gLSB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgcmVjdXJzaXZlbHkgdG8gZ2VuZXJhdGUgY29kZSBmb3Igc3ViLXNjaGVtYXNcbmZ1bmN0aW9uIHN1YnNjaGVtYUNvZGUoaXQsIHZhbGlkKSB7XG4gICAgaWYgKGlzU2NoZW1hT2JqKGl0KSkge1xuICAgICAgICBjaGVja0tleXdvcmRzKGl0KTtcbiAgICAgICAgaWYgKHNjaGVtYUN4dEhhc1J1bGVzKGl0KSkge1xuICAgICAgICAgICAgc3ViU2NoZW1hT2JqQ29kZShpdCwgdmFsaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgICgwLCBib29sU2NoZW1hXzEuYm9vbE9yRW1wdHlTY2hlbWEpKGl0LCB2YWxpZCk7XG59XG5mdW5jdGlvbiBzY2hlbWFDeHRIYXNSdWxlcyh7IHNjaGVtYSwgc2VsZiB9KSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKHNlbGYuUlVMRVMuYWxsW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NjaGVtYU9iaihpdCkge1xuICAgIHJldHVybiB0eXBlb2YgaXQuc2NoZW1hICE9IFwiYm9vbGVhblwiO1xufVxuZnVuY3Rpb24gc3ViU2NoZW1hT2JqQ29kZShpdCwgdmFsaWQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgZ2VuLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAob3B0cy4kY29tbWVudCAmJiBzY2hlbWEuJGNvbW1lbnQpXG4gICAgICAgIGNvbW1lbnRLZXl3b3JkKGl0KTtcbiAgICB1cGRhdGVDb250ZXh0KGl0KTtcbiAgICBjaGVja0FzeW5jU2NoZW1hKGl0KTtcbiAgICBjb25zdCBlcnJzQ291bnQgPSBnZW4uY29uc3QoXCJfZXJyc1wiLCBuYW1lc18xLmRlZmF1bHQuZXJyb3JzKTtcbiAgICB0eXBlQW5kS2V5d29yZHMoaXQsIGVycnNDb3VudCk7XG4gICAgLy8gVE9ETyB2YXJcbiAgICBnZW4udmFyKHZhbGlkLCAoMCwgY29kZWdlbl8xLl8pIGAke2VycnNDb3VudH0gPT09ICR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc31gKTtcbn1cbmZ1bmN0aW9uIGNoZWNrS2V5d29yZHMoaXQpIHtcbiAgICAoMCwgdXRpbF8xLmNoZWNrVW5rbm93blJ1bGVzKShpdCk7XG4gICAgY2hlY2tSZWZzQW5kS2V5d29yZHMoaXQpO1xufVxuZnVuY3Rpb24gdHlwZUFuZEtleXdvcmRzKGl0LCBlcnJzQ291bnQpIHtcbiAgICBpZiAoaXQub3B0cy5qdGQpXG4gICAgICAgIHJldHVybiBzY2hlbWFLZXl3b3JkcyhpdCwgW10sIGZhbHNlLCBlcnJzQ291bnQpO1xuICAgIGNvbnN0IHR5cGVzID0gKDAsIGRhdGFUeXBlXzEuZ2V0U2NoZW1hVHlwZXMpKGl0LnNjaGVtYSk7XG4gICAgY29uc3QgY2hlY2tlZFR5cGVzID0gKDAsIGRhdGFUeXBlXzEuY29lcmNlQW5kQ2hlY2tEYXRhVHlwZSkoaXQsIHR5cGVzKTtcbiAgICBzY2hlbWFLZXl3b3JkcyhpdCwgdHlwZXMsICFjaGVja2VkVHlwZXMsIGVycnNDb3VudCk7XG59XG5mdW5jdGlvbiBjaGVja1JlZnNBbmRLZXl3b3JkcyhpdCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBlcnJTY2hlbWFQYXRoLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hLiRyZWYgJiYgb3B0cy5pZ25vcmVLZXl3b3Jkc1dpdGhSZWYgJiYgKDAsIHV0aWxfMS5zY2hlbWFIYXNSdWxlc0J1dFJlZikoc2NoZW1hLCBzZWxmLlJVTEVTKSkge1xuICAgICAgICBzZWxmLmxvZ2dlci53YXJuKGAkcmVmOiBrZXl3b3JkcyBpZ25vcmVkIGluIHNjaGVtYSBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tOb0RlZmF1bHQoaXQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYS5kZWZhdWx0ICE9PSB1bmRlZmluZWQgJiYgb3B0cy51c2VEZWZhdWx0cyAmJiBvcHRzLnN0cmljdFNjaGVtYSkge1xuICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIFwiZGVmYXVsdCBpcyBpZ25vcmVkIGluIHRoZSBzY2hlbWEgcm9vdFwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVDb250ZXh0KGl0KSB7XG4gICAgY29uc3Qgc2NoSWQgPSBpdC5zY2hlbWFbaXQub3B0cy5zY2hlbWFJZF07XG4gICAgaWYgKHNjaElkKVxuICAgICAgICBpdC5iYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKGl0Lm9wdHMudXJpUmVzb2x2ZXIsIGl0LmJhc2VJZCwgc2NoSWQpO1xufVxuZnVuY3Rpb24gY2hlY2tBc3luY1NjaGVtYShpdCkge1xuICAgIGlmIChpdC5zY2hlbWEuJGFzeW5jICYmICFpdC5zY2hlbWFFbnYuJGFzeW5jKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBzY2hlbWEgaW4gc3luYyBzY2hlbWFcIik7XG59XG5mdW5jdGlvbiBjb21tZW50S2V5d29yZCh7IGdlbiwgc2NoZW1hRW52LCBzY2hlbWEsIGVyclNjaGVtYVBhdGgsIG9wdHMgfSkge1xuICAgIGNvbnN0IG1zZyA9IHNjaGVtYS4kY29tbWVudDtcbiAgICBpZiAob3B0cy4kY29tbWVudCA9PT0gdHJ1ZSkge1xuICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5zZWxmfS5sb2dnZXIubG9nKCR7bXNnfSlgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9wdHMuJGNvbW1lbnQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVBhdGggPSAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyU2NoZW1hUGF0aH0vJGNvbW1lbnRgO1xuICAgICAgICBjb25zdCByb290TmFtZSA9IGdlbi5zY29wZVZhbHVlKFwicm9vdFwiLCB7IHJlZjogc2NoZW1hRW52LnJvb3QgfSk7XG4gICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnNlbGZ9Lm9wdHMuJGNvbW1lbnQoJHttc2d9LCAke3NjaGVtYVBhdGh9LCAke3Jvb3ROYW1lfS5zY2hlbWEpYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmV0dXJuUmVzdWx0cyhpdCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFFbnYsIHZhbGlkYXRlTmFtZSwgVmFsaWRhdGlvbkVycm9yLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hRW52LiRhc3luYykge1xuICAgICAgICAvLyBUT0RPIGFzc2lnbiB1bmV2YWx1YXRlZFxuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gMGAsICgpID0+IGdlbi5yZXR1cm4obmFtZXNfMS5kZWZhdWx0LmRhdGEpLCAoKSA9PiBnZW4udGhyb3coKDAsIGNvZGVnZW5fMS5fKSBgbmV3ICR7VmFsaWRhdGlvbkVycm9yfSgke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSlgKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5lcnJvcnNgLCBuYW1lc18xLmRlZmF1bHQudkVycm9ycyk7XG4gICAgICAgIGlmIChvcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgYXNzaWduRXZhbHVhdGVkKGl0KTtcbiAgICAgICAgZ2VuLnJldHVybigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9ID09PSAwYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzaWduRXZhbHVhdGVkKHsgZ2VuLCBldmFsdWF0ZWQsIHByb3BzLCBpdGVtcyB9KSB7XG4gICAgaWYgKHByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpXG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtldmFsdWF0ZWR9LnByb3BzYCwgcHJvcHMpO1xuICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKVxuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXZhbHVhdGVkfS5pdGVtc2AsIGl0ZW1zKTtcbn1cbmZ1bmN0aW9uIHNjaGVtYUtleXdvcmRzKGl0LCB0eXBlcywgdHlwZUVycm9ycywgZXJyc0NvdW50KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgYWxsRXJyb3JzLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBjb25zdCB7IFJVTEVTIH0gPSBzZWxmO1xuICAgIGlmIChzY2hlbWEuJHJlZiAmJiAob3B0cy5pZ25vcmVLZXl3b3Jkc1dpdGhSZWYgfHwgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgUlVMRVMpKSkge1xuICAgICAgICBnZW4uYmxvY2soKCkgPT4ga2V5d29yZENvZGUoaXQsIFwiJHJlZlwiLCBSVUxFUy5hbGwuJHJlZi5kZWZpbml0aW9uKSk7IC8vIFRPRE8gdHlwZWNhc3RcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW9wdHMuanRkKVxuICAgICAgICBjaGVja1N0cmljdFR5cGVzKGl0LCB0eXBlcyk7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBSVUxFUy5ydWxlcylcbiAgICAgICAgICAgIGdyb3VwS2V5d29yZHMoZ3JvdXApO1xuICAgICAgICBncm91cEtleXdvcmRzKFJVTEVTLnBvc3QpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGdyb3VwS2V5d29yZHMoZ3JvdXApIHtcbiAgICAgICAgaWYgKCEoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZUdyb3VwKShzY2hlbWEsIGdyb3VwKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGdyb3VwLnR5cGUpIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgZGF0YVR5cGVfMi5jaGVja0RhdGFUeXBlKShncm91cC50eXBlLCBkYXRhLCBvcHRzLnN0cmljdE51bWJlcnMpKTtcbiAgICAgICAgICAgIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApO1xuICAgICAgICAgICAgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMSAmJiB0eXBlc1swXSA9PT0gZ3JvdXAudHlwZSAmJiB0eXBlRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgICAgICAoMCwgZGF0YVR5cGVfMi5yZXBvcnRUeXBlRXJyb3IpKGl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0ZUtleXdvcmRzKGl0LCBncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyBtYWtlIGl0IFwib2tcIiBjYWxsP1xuICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9ID09PSAke2VycnNDb3VudCB8fCAwfWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBvcHRzOiB7IHVzZURlZmF1bHRzIH0sIH0gPSBpdDtcbiAgICBpZiAodXNlRGVmYXVsdHMpXG4gICAgICAgICgwLCBkZWZhdWx0c18xLmFzc2lnbkRlZmF1bHRzKShpdCwgZ3JvdXAudHlwZSk7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIGdyb3VwLnJ1bGVzKSB7XG4gICAgICAgICAgICBpZiAoKDAsIGFwcGxpY2FiaWxpdHlfMS5zaG91bGRVc2VSdWxlKShzY2hlbWEsIHJ1bGUpKSB7XG4gICAgICAgICAgICAgICAga2V5d29yZENvZGUoaXQsIHJ1bGUua2V5d29yZCwgcnVsZS5kZWZpbml0aW9uLCBncm91cC50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gY2hlY2tTdHJpY3RUeXBlcyhpdCwgdHlwZXMpIHtcbiAgICBpZiAoaXQuc2NoZW1hRW52Lm1ldGEgfHwgIWl0Lm9wdHMuc3RyaWN0VHlwZXMpXG4gICAgICAgIHJldHVybjtcbiAgICBjaGVja0NvbnRleHRUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGlmICghaXQub3B0cy5hbGxvd1VuaW9uVHlwZXMpXG4gICAgICAgIGNoZWNrTXVsdGlwbGVUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGNoZWNrS2V5d29yZFR5cGVzKGl0LCBpdC5kYXRhVHlwZXMpO1xufVxuZnVuY3Rpb24gY2hlY2tDb250ZXh0VHlwZXMoaXQsIHR5cGVzKSB7XG4gICAgaWYgKCF0eXBlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIWl0LmRhdGFUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgaXQuZGF0YVR5cGVzID0gdHlwZXM7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHlwZXMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICBpZiAoIWluY2x1ZGVzVHlwZShpdC5kYXRhVHlwZXMsIHQpKSB7XG4gICAgICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBgdHlwZSBcIiR7dH1cIiBub3QgYWxsb3dlZCBieSBjb250ZXh0IFwiJHtpdC5kYXRhVHlwZXMuam9pbihcIixcIil9XCJgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGl0LmRhdGFUeXBlcyA9IGl0LmRhdGFUeXBlcy5maWx0ZXIoKHQpID0+IGluY2x1ZGVzVHlwZSh0eXBlcywgdCkpO1xufVxuZnVuY3Rpb24gY2hlY2tNdWx0aXBsZVR5cGVzKGl0LCB0cykge1xuICAgIGlmICh0cy5sZW5ndGggPiAxICYmICEodHMubGVuZ3RoID09PSAyICYmIHRzLmluY2x1ZGVzKFwibnVsbFwiKSkpIHtcbiAgICAgICAgc3RyaWN0VHlwZXNFcnJvcihpdCwgXCJ1c2UgYWxsb3dVbmlvblR5cGVzIHRvIGFsbG93IHVuaW9uIHR5cGUga2V5d29yZFwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja0tleXdvcmRUeXBlcyhpdCwgdHMpIHtcbiAgICBjb25zdCBydWxlcyA9IGl0LnNlbGYuUlVMRVMuYWxsO1xuICAgIGZvciAoY29uc3Qga2V5d29yZCBpbiBydWxlcykge1xuICAgICAgICBjb25zdCBydWxlID0gcnVsZXNba2V5d29yZF07XG4gICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PSBcIm9iamVjdFwiICYmICgwLCBhcHBsaWNhYmlsaXR5XzEuc2hvdWxkVXNlUnVsZSkoaXQuc2NoZW1hLCBydWxlKSkge1xuICAgICAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBydWxlLmRlZmluaXRpb247XG4gICAgICAgICAgICBpZiAodHlwZS5sZW5ndGggJiYgIXR5cGUuc29tZSgodCkgPT4gaGFzQXBwbGljYWJsZVR5cGUodHMsIHQpKSkge1xuICAgICAgICAgICAgICAgIHN0cmljdFR5cGVzRXJyb3IoaXQsIGBtaXNzaW5nIHR5cGUgXCIke3R5cGUuam9pbihcIixcIil9XCIgZm9yIGtleXdvcmQgXCIke2tleXdvcmR9XCJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGhhc0FwcGxpY2FibGVUeXBlKHNjaFRzLCBrd2RUKSB7XG4gICAgcmV0dXJuIHNjaFRzLmluY2x1ZGVzKGt3ZFQpIHx8IChrd2RUID09PSBcIm51bWJlclwiICYmIHNjaFRzLmluY2x1ZGVzKFwiaW50ZWdlclwiKSk7XG59XG5mdW5jdGlvbiBpbmNsdWRlc1R5cGUodHMsIHQpIHtcbiAgICByZXR1cm4gdHMuaW5jbHVkZXModCkgfHwgKHQgPT09IFwiaW50ZWdlclwiICYmIHRzLmluY2x1ZGVzKFwibnVtYmVyXCIpKTtcbn1cbmZ1bmN0aW9uIHN0cmljdFR5cGVzRXJyb3IoaXQsIG1zZykge1xuICAgIGNvbnN0IHNjaGVtYVBhdGggPSBpdC5zY2hlbWFFbnYuYmFzZUlkICsgaXQuZXJyU2NoZW1hUGF0aDtcbiAgICBtc2cgKz0gYCBhdCBcIiR7c2NoZW1hUGF0aH1cIiAoc3RyaWN0VHlwZXMpYDtcbiAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIG1zZywgaXQub3B0cy5zdHJpY3RUeXBlcyk7XG59XG5jbGFzcyBLZXl3b3JkQ3h0IHtcbiAgICBjb25zdHJ1Y3RvcihpdCwgZGVmLCBrZXl3b3JkKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEudmFsaWRhdGVLZXl3b3JkVXNhZ2UpKGl0LCBkZWYsIGtleXdvcmQpO1xuICAgICAgICB0aGlzLmdlbiA9IGl0LmdlbjtcbiAgICAgICAgdGhpcy5hbGxFcnJvcnMgPSBpdC5hbGxFcnJvcnM7XG4gICAgICAgIHRoaXMua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgIHRoaXMuZGF0YSA9IGl0LmRhdGE7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gaXQuc2NoZW1hW2tleXdvcmRdO1xuICAgICAgICB0aGlzLiRkYXRhID0gZGVmLiRkYXRhICYmIGl0Lm9wdHMuJGRhdGEgJiYgdGhpcy5zY2hlbWEgJiYgdGhpcy5zY2hlbWEuJGRhdGE7XG4gICAgICAgIHRoaXMuc2NoZW1hVmFsdWUgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgdGhpcy5zY2hlbWEsIGtleXdvcmQsIHRoaXMuJGRhdGEpO1xuICAgICAgICB0aGlzLnNjaGVtYVR5cGUgPSBkZWYuc2NoZW1hVHlwZTtcbiAgICAgICAgdGhpcy5wYXJlbnRTY2hlbWEgPSBpdC5zY2hlbWE7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge307XG4gICAgICAgIHRoaXMuaXQgPSBpdDtcbiAgICAgICAgdGhpcy5kZWYgPSBkZWY7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYUNvZGUgPSBpdC5nZW4uY29uc3QoXCJ2U2NoZW1hXCIsIGdldERhdGEodGhpcy4kZGF0YSwgaXQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hQ29kZSA9IHRoaXMuc2NoZW1hVmFsdWU7XG4gICAgICAgICAgICBpZiAoISgwLCBrZXl3b3JkXzEudmFsaWRTY2hlbWFUeXBlKSh0aGlzLnNjaGVtYSwgZGVmLnNjaGVtYVR5cGUsIGRlZi5hbGxvd1VuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7a2V5d29yZH0gdmFsdWUgbXVzdCBiZSAke0pTT04uc3RyaW5naWZ5KGRlZi5zY2hlbWFUeXBlKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJjb2RlXCIgaW4gZGVmID8gZGVmLnRyYWNrRXJyb3JzIDogZGVmLmVycm9ycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyc0NvdW50ID0gaXQuZ2VuLmNvbnN0KFwiX2VycnNcIiwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0KGNvbmRpdGlvbiwgc3VjY2Vzc0FjdGlvbiwgZmFpbEFjdGlvbikge1xuICAgICAgICB0aGlzLmZhaWxSZXN1bHQoKDAsIGNvZGVnZW5fMS5ub3QpKGNvbmRpdGlvbiksIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pO1xuICAgIH1cbiAgICBmYWlsUmVzdWx0KGNvbmRpdGlvbiwgc3VjY2Vzc0FjdGlvbiwgZmFpbEFjdGlvbikge1xuICAgICAgICB0aGlzLmdlbi5pZihjb25kaXRpb24pO1xuICAgICAgICBpZiAoZmFpbEFjdGlvbilcbiAgICAgICAgICAgIGZhaWxBY3Rpb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5lcnJvcigpO1xuICAgICAgICBpZiAoc3VjY2Vzc0FjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgICAgICAgICAgc3VjY2Vzc0FjdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uZW5kSWYoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdlbi5lbHNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFzcyhjb25kaXRpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWlsUmVzdWx0KCgwLCBjb2RlZ2VuXzEubm90KShjb25kaXRpb24pLCB1bmRlZmluZWQsIGZhaWxBY3Rpb24pO1xuICAgIH1cbiAgICBmYWlsKGNvbmRpdGlvbikge1xuICAgICAgICBpZiAoY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uaWYoZmFsc2UpOyAvLyB0aGlzIGJyYW5jaCB3aWxsIGJlIHJlbW92ZWQgYnkgZ2VuLm9wdGltaXplXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW4uaWYoY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5lcnJvcigpO1xuICAgICAgICBpZiAodGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmdlbi5lbmRJZigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmdlbi5lbHNlKCk7XG4gICAgfVxuICAgIGZhaWwkZGF0YShjb25kaXRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLiRkYXRhKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbChjb25kaXRpb24pO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUNvZGUgfSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZmFpbCgoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ICE9PSB1bmRlZmluZWQgJiYgKCR7KDAsIGNvZGVnZW5fMS5vcikodGhpcy5pbnZhbGlkJGRhdGEoKSwgY29uZGl0aW9uKX0pYCk7XG4gICAgfVxuICAgIGVycm9yKGFwcGVuZCwgZXJyb3JQYXJhbXMsIGVycm9yUGF0aHMpIHtcbiAgICAgICAgaWYgKGVycm9yUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtcyhlcnJvclBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbXMoe30pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vycm9yKGFwcGVuZCwgZXJyb3JQYXRocyk7XG4gICAgfVxuICAgIF9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpIHtcbiAgICAgICAgO1xuICAgICAgICAoYXBwZW5kID8gZXJyb3JzXzEucmVwb3J0RXh0cmFFcnJvciA6IGVycm9yc18xLnJlcG9ydEVycm9yKSh0aGlzLCB0aGlzLmRlZi5lcnJvciwgZXJyb3JQYXRocyk7XG4gICAgfVxuICAgICRkYXRhRXJyb3IoKSB7XG4gICAgICAgICgwLCBlcnJvcnNfMS5yZXBvcnRFcnJvcikodGhpcywgdGhpcy5kZWYuJGRhdGFFcnJvciB8fCBlcnJvcnNfMS5rZXl3b3JkJERhdGFFcnJvcik7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5lcnJzQ291bnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWRkIFwidHJhY2tFcnJvcnNcIiB0byBrZXl3b3JkIGRlZmluaXRpb24nKTtcbiAgICAgICAgKDAsIGVycm9yc18xLnJlc2V0RXJyb3JzQ291bnQpKHRoaXMuZ2VuLCB0aGlzLmVycnNDb3VudCk7XG4gICAgfVxuICAgIG9rKGNvbmQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFsbEVycm9ycylcbiAgICAgICAgICAgIHRoaXMuZ2VuLmlmKGNvbmQpO1xuICAgIH1cbiAgICBzZXRQYXJhbXMob2JqLCBhc3NpZ24pIHtcbiAgICAgICAgaWYgKGFzc2lnbilcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wYXJhbXMsIG9iaik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gb2JqO1xuICAgIH1cbiAgICBibG9jayRkYXRhKHZhbGlkLCBjb2RlQmxvY2ssICRkYXRhVmFsaWQgPSBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIHRoaXMuZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2skZGF0YSh2YWxpZCwgJGRhdGFWYWxpZCk7XG4gICAgICAgICAgICBjb2RlQmxvY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrJGRhdGEodmFsaWQgPSBjb2RlZ2VuXzEubmlsLCAkZGF0YVZhbGlkID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICBpZiAoIXRoaXMuJGRhdGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFDb2RlLCBzY2hlbWFUeXBlLCBkZWYgfSA9IHRoaXM7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm9yKSgoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ID09PSB1bmRlZmluZWRgLCAkZGF0YVZhbGlkKSk7XG4gICAgICAgIGlmICh2YWxpZCAhPT0gY29kZWdlbl8xLm5pbClcbiAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICBpZiAoc2NoZW1hVHlwZS5sZW5ndGggfHwgZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgICAgICBnZW4uZWxzZUlmKHRoaXMuaW52YWxpZCRkYXRhKCkpO1xuICAgICAgICAgICAgdGhpcy4kZGF0YUVycm9yKCk7XG4gICAgICAgICAgICBpZiAodmFsaWQgIT09IGNvZGVnZW5fMS5uaWwpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGdlbi5lbHNlKCk7XG4gICAgfVxuICAgIGludmFsaWQkZGF0YSgpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYUNvZGUsIHNjaGVtYVR5cGUsIGRlZiwgaXQgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLm9yKSh3cm9uZyREYXRhVHlwZSgpLCBpbnZhbGlkJERhdGFTY2hlbWEoKSk7XG4gICAgICAgIGZ1bmN0aW9uIHdyb25nJERhdGFUeXBlKCkge1xuICAgICAgICAgICAgaWYgKHNjaGVtYVR5cGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKCEoc2NoZW1hQ29kZSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ID0gQXJyYXkuaXNBcnJheShzY2hlbWFUeXBlKSA/IHNjaGVtYVR5cGUgOiBbc2NoZW1hVHlwZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIGRhdGFUeXBlXzIuY2hlY2tEYXRhVHlwZXMpKHN0LCBzY2hlbWFDb2RlLCBpdC5vcHRzLnN0cmljdE51bWJlcnMsIGRhdGFUeXBlXzIuRGF0YVR5cGUuV3JvbmcpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpbnZhbGlkJERhdGFTY2hlbWEoKSB7XG4gICAgICAgICAgICBpZiAoZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVTY2hlbWFSZWYgPSBnZW4uc2NvcGVWYWx1ZShcInZhbGlkYXRlJGRhdGFcIiwgeyByZWY6IGRlZi52YWxpZGF0ZVNjaGVtYSB9KTsgLy8gVE9ETyB2YWx1ZS5jb2RlIGZvciBzdGFuZGFsb25lXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCEke3ZhbGlkYXRlU2NoZW1hUmVmfSgke3NjaGVtYUNvZGV9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdWJzY2hlbWEoYXBwbCwgdmFsaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NoZW1hID0gKDAsIHN1YnNjaGVtYV8xLmdldFN1YnNjaGVtYSkodGhpcy5pdCwgYXBwbCk7XG4gICAgICAgICgwLCBzdWJzY2hlbWFfMS5leHRlbmRTdWJzY2hlbWFEYXRhKShzdWJzY2hlbWEsIHRoaXMuaXQsIGFwcGwpO1xuICAgICAgICAoMCwgc3Vic2NoZW1hXzEuZXh0ZW5kU3Vic2NoZW1hTW9kZSkoc3Vic2NoZW1hLCBhcHBsKTtcbiAgICAgICAgY29uc3QgbmV4dENvbnRleHQgPSB7IC4uLnRoaXMuaXQsIC4uLnN1YnNjaGVtYSwgaXRlbXM6IHVuZGVmaW5lZCwgcHJvcHM6IHVuZGVmaW5lZCB9O1xuICAgICAgICBzdWJzY2hlbWFDb2RlKG5leHRDb250ZXh0LCB2YWxpZCk7XG4gICAgICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgICB9XG4gICAgbWVyZ2VFdmFsdWF0ZWQoc2NoZW1hQ3h0LCB0b05hbWUpIHtcbiAgICAgICAgY29uc3QgeyBpdCwgZ2VuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWl0Lm9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChpdC5wcm9wcyAhPT0gdHJ1ZSAmJiBzY2hlbWFDeHQucHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBzY2hlbWFDeHQucHJvcHMsIGl0LnByb3BzLCB0b05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdC5pdGVtcyAhPT0gdHJ1ZSAmJiBzY2hlbWFDeHQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hlbWFDeHQuaXRlbXMsIGl0Lml0ZW1zLCB0b05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoZW1hQ3h0LCB2YWxpZCkge1xuICAgICAgICBjb25zdCB7IGl0LCBnZW4gfSA9IHRoaXM7XG4gICAgICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIChpdC5wcm9wcyAhPT0gdHJ1ZSB8fCBpdC5pdGVtcyAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIGdlbi5pZih2YWxpZCwgKCkgPT4gdGhpcy5tZXJnZUV2YWx1YXRlZChzY2hlbWFDeHQsIGNvZGVnZW5fMS5OYW1lKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuS2V5d29yZEN4dCA9IEtleXdvcmRDeHQ7XG5mdW5jdGlvbiBrZXl3b3JkQ29kZShpdCwga2V5d29yZCwgZGVmLCBydWxlVHlwZSkge1xuICAgIGNvbnN0IGN4dCA9IG5ldyBLZXl3b3JkQ3h0KGl0LCBkZWYsIGtleXdvcmQpO1xuICAgIGlmIChcImNvZGVcIiBpbiBkZWYpIHtcbiAgICAgICAgZGVmLmNvZGUoY3h0LCBydWxlVHlwZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN4dC4kZGF0YSAmJiBkZWYudmFsaWRhdGUpIHtcbiAgICAgICAgKDAsIGtleXdvcmRfMS5mdW5jS2V5d29yZENvZGUpKGN4dCwgZGVmKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoXCJtYWNyb1wiIGluIGRlZikge1xuICAgICAgICAoMCwga2V5d29yZF8xLm1hY3JvS2V5d29yZENvZGUpKGN4dCwgZGVmKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGVmLmNvbXBpbGUgfHwgZGVmLnZhbGlkYXRlKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEuZnVuY0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxufVxuY29uc3QgSlNPTl9QT0lOVEVSID0gL15cXC8oPzpbXn5dfH4wfH4xKSokLztcbmNvbnN0IFJFTEFUSVZFX0pTT05fUE9JTlRFUiA9IC9eKFswLTldKykoI3xcXC8oPzpbXn5dfH4wfH4xKSopPyQvO1xuZnVuY3Rpb24gZ2V0RGF0YSgkZGF0YSwgeyBkYXRhTGV2ZWwsIGRhdGFOYW1lcywgZGF0YVBhdGhBcnIgfSkge1xuICAgIGxldCBqc29uUG9pbnRlcjtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoJGRhdGEgPT09IFwiXCIpXG4gICAgICAgIHJldHVybiBuYW1lc18xLmRlZmF1bHQucm9vdERhdGE7XG4gICAgaWYgKCRkYXRhWzBdID09PSBcIi9cIikge1xuICAgICAgICBpZiAoIUpTT05fUE9JTlRFUi50ZXN0KCRkYXRhKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBKU09OLXBvaW50ZXI6ICR7JGRhdGF9YCk7XG4gICAgICAgIGpzb25Qb2ludGVyID0gJGRhdGE7XG4gICAgICAgIGRhdGEgPSBuYW1lc18xLmRlZmF1bHQucm9vdERhdGE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gUkVMQVRJVkVfSlNPTl9QT0lOVEVSLmV4ZWMoJGRhdGEpO1xuICAgICAgICBpZiAoIW1hdGNoZXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSlNPTi1wb2ludGVyOiAkeyRkYXRhfWApO1xuICAgICAgICBjb25zdCB1cCA9ICttYXRjaGVzWzFdO1xuICAgICAgICBqc29uUG9pbnRlciA9IG1hdGNoZXNbMl07XG4gICAgICAgIGlmIChqc29uUG9pbnRlciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmICh1cCA+PSBkYXRhTGV2ZWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKFwicHJvcGVydHkvaW5kZXhcIiwgdXApKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhUGF0aEFycltkYXRhTGV2ZWwgLSB1cF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwID4gZGF0YUxldmVsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKFwiZGF0YVwiLCB1cCkpO1xuICAgICAgICBkYXRhID0gZGF0YU5hbWVzW2RhdGFMZXZlbCAtIHVwXTtcbiAgICAgICAgaWYgKCFqc29uUG9pbnRlcilcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBsZXQgZXhwciA9IGRhdGE7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBqc29uUG9pbnRlci5zcGxpdChcIi9cIik7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgICAgICBkYXRhID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoKDAsIHV0aWxfMS51bmVzY2FwZUpzb25Qb2ludGVyKShzZWdtZW50KSl9YDtcbiAgICAgICAgICAgIGV4cHIgPSAoMCwgY29kZWdlbl8xLl8pIGAke2V4cHJ9ICYmICR7ZGF0YX1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleHByO1xuICAgIGZ1bmN0aW9uIGVycm9yTXNnKHBvaW50ZXJUeXBlLCB1cCkge1xuICAgICAgICByZXR1cm4gYENhbm5vdCBhY2Nlc3MgJHtwb2ludGVyVHlwZX0gJHt1cH0gbGV2ZWxzIHVwLCBjdXJyZW50IGxldmVsIGlzICR7ZGF0YUxldmVsfWA7XG4gICAgfVxufVxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZUtleXdvcmRVc2FnZSA9IGV4cG9ydHMudmFsaWRTY2hlbWFUeXBlID0gZXhwb3J0cy5mdW5jS2V5d29yZENvZGUgPSBleHBvcnRzLm1hY3JvS2V5d29yZENvZGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vbmFtZXNcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vLi4vdm9jYWJ1bGFyaWVzL2NvZGVcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG5mdW5jdGlvbiBtYWNyb0tleXdvcmRDb2RlKGN4dCwgZGVmKSB7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IG1hY3JvU2NoZW1hID0gZGVmLm1hY3JvLmNhbGwoaXQuc2VsZiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0KTtcbiAgICBjb25zdCBzY2hlbWFSZWYgPSB1c2VLZXl3b3JkKGdlbiwga2V5d29yZCwgbWFjcm9TY2hlbWEpO1xuICAgIGlmIChpdC5vcHRzLnZhbGlkYXRlU2NoZW1hICE9PSBmYWxzZSlcbiAgICAgICAgaXQuc2VsZi52YWxpZGF0ZVNjaGVtYShtYWNyb1NjaGVtYSwgdHJ1ZSk7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICBzY2hlbWE6IG1hY3JvU2NoZW1hLFxuICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCxcbiAgICAgICAgdG9wU2NoZW1hUmVmOiBzY2hlbWFSZWYsXG4gICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgfSwgdmFsaWQpO1xuICAgIGN4dC5wYXNzKHZhbGlkLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xufVxuZXhwb3J0cy5tYWNyb0tleXdvcmRDb2RlID0gbWFjcm9LZXl3b3JkQ29kZTtcbmZ1bmN0aW9uIGZ1bmNLZXl3b3JkQ29kZShjeHQsIGRlZikge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB7IGdlbiwga2V5d29yZCwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsICRkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGNoZWNrQXN5bmNLZXl3b3JkKGl0LCBkZWYpO1xuICAgIGNvbnN0IHZhbGlkYXRlID0gISRkYXRhICYmIGRlZi5jb21waWxlID8gZGVmLmNvbXBpbGUuY2FsbChpdC5zZWxmLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQpIDogZGVmLnZhbGlkYXRlO1xuICAgIGNvbnN0IHZhbGlkYXRlUmVmID0gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIHZhbGlkYXRlKTtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgdmFsaWRhdGVLZXl3b3JkKTtcbiAgICBjeHQub2soKF9hID0gZGVmLnZhbGlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWxpZCk7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVLZXl3b3JkKCkge1xuICAgICAgICBpZiAoZGVmLmVycm9ycyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFzc2lnblZhbGlkKCk7XG4gICAgICAgICAgICBpZiAoZGVmLm1vZGlmeWluZylcbiAgICAgICAgICAgICAgICBtb2RpZnlEYXRhKGN4dCk7XG4gICAgICAgICAgICByZXBvcnRFcnJzKCgpID0+IGN4dC5lcnJvcigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJ1bGVFcnJzID0gZGVmLmFzeW5jID8gdmFsaWRhdGVBc3luYygpIDogdmFsaWRhdGVTeW5jKCk7XG4gICAgICAgICAgICBpZiAoZGVmLm1vZGlmeWluZylcbiAgICAgICAgICAgICAgICBtb2RpZnlEYXRhKGN4dCk7XG4gICAgICAgICAgICByZXBvcnRFcnJzKCgpID0+IGFkZEVycnMoY3h0LCBydWxlRXJycykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQXN5bmMoKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVFcnJzID0gZ2VuLmxldChcInJ1bGVFcnJzXCIsIG51bGwpO1xuICAgICAgICBnZW4udHJ5KCgpID0+IGFzc2lnblZhbGlkKCgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0IGApLCAoZSkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZX0gaW5zdGFuY2VvZiAke2l0LlZhbGlkYXRpb25FcnJvcn1gLCAoKSA9PiBnZW4uYXNzaWduKHJ1bGVFcnJzLCAoMCwgY29kZWdlbl8xLl8pIGAke2V9LmVycm9yc2ApLCAoKSA9PiBnZW4udGhyb3coZSkpKTtcbiAgICAgICAgcmV0dXJuIHJ1bGVFcnJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVN5bmMoKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRXJycyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVSZWZ9LmVycm9yc2A7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWRhdGVFcnJzLCBudWxsKTtcbiAgICAgICAgYXNzaWduVmFsaWQoY29kZWdlbl8xLm5pbCk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZUVycnM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFzc2lnblZhbGlkKF9hd2FpdCA9IGRlZi5hc3luYyA/ICgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0IGAgOiBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIGNvbnN0IHBhc3NDeHQgPSBpdC5vcHRzLnBhc3NDb250ZXh0ID8gbmFtZXNfMS5kZWZhdWx0LnRoaXMgOiBuYW1lc18xLmRlZmF1bHQuc2VsZjtcbiAgICAgICAgY29uc3QgcGFzc1NjaGVtYSA9ICEoKFwiY29tcGlsZVwiIGluIGRlZiAmJiAhJGRhdGEpIHx8IGRlZi5zY2hlbWEgPT09IGZhbHNlKTtcbiAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtfYXdhaXR9JHsoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdmFsaWRhdGVSZWYsIHBhc3NDeHQsIHBhc3NTY2hlbWEpfWAsIGRlZi5tb2RpZnlpbmcpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJzKGVycm9ycykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkoKF9hID0gZGVmLnZhbGlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWxpZCksIGVycm9ycyk7XG4gICAgfVxufVxuZXhwb3J0cy5mdW5jS2V5d29yZENvZGUgPSBmdW5jS2V5d29yZENvZGU7XG5mdW5jdGlvbiBtb2RpZnlEYXRhKGN4dCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGdlbi5pZihpdC5wYXJlbnREYXRhLCAoKSA9PiBnZW4uYXNzaWduKGRhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQucGFyZW50RGF0YX1bJHtpdC5wYXJlbnREYXRhUHJvcGVydHl9XWApKTtcbn1cbmZ1bmN0aW9uIGFkZEVycnMoY3h0LCBlcnJzKSB7XG4gICAgY29uc3QgeyBnZW4gfSA9IGN4dDtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgQXJyYXkuaXNBcnJheSgke2VycnN9KWAsICgpID0+IHtcbiAgICAgICAgZ2VuXG4gICAgICAgICAgICAuYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbCA/ICR7ZXJyc30gOiAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5jb25jYXQoJHtlcnJzfSlgKVxuICAgICAgICAgICAgLmFzc2lnbihuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgKTtcbiAgICAgICAgKDAsIGVycm9yc18xLmV4dGVuZEVycm9ycykoY3h0KTtcbiAgICB9LCAoKSA9PiBjeHQuZXJyb3IoKSk7XG59XG5mdW5jdGlvbiBjaGVja0FzeW5jS2V5d29yZCh7IHNjaGVtYUVudiB9LCBkZWYpIHtcbiAgICBpZiAoZGVmLmFzeW5jICYmICFzY2hlbWFFbnYuJGFzeW5jKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBrZXl3b3JkIGluIHN5bmMgc2NoZW1hXCIpO1xufVxuZnVuY3Rpb24gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiIGZhaWxlZCB0byBjb21waWxlYCk7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwia2V5d29yZFwiLCB0eXBlb2YgcmVzdWx0ID09IFwiZnVuY3Rpb25cIiA/IHsgcmVmOiByZXN1bHQgfSA6IHsgcmVmOiByZXN1bHQsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShyZXN1bHQpIH0pO1xufVxuZnVuY3Rpb24gdmFsaWRTY2hlbWFUeXBlKHNjaGVtYSwgc2NoZW1hVHlwZSwgYWxsb3dVbmRlZmluZWQgPSBmYWxzZSkge1xuICAgIC8vIFRPRE8gYWRkIHRlc3RzXG4gICAgcmV0dXJuICghc2NoZW1hVHlwZS5sZW5ndGggfHxcbiAgICAgICAgc2NoZW1hVHlwZS5zb21lKChzdCkgPT4gc3QgPT09IFwiYXJyYXlcIlxuICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KHNjaGVtYSlcbiAgICAgICAgICAgIDogc3QgPT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICA/IHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hKVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIHNjaGVtYSA9PSBzdCB8fCAoYWxsb3dVbmRlZmluZWQgJiYgdHlwZW9mIHNjaGVtYSA9PSBcInVuZGVmaW5lZFwiKSkpO1xufVxuZXhwb3J0cy52YWxpZFNjaGVtYVR5cGUgPSB2YWxpZFNjaGVtYVR5cGU7XG5mdW5jdGlvbiB2YWxpZGF0ZUtleXdvcmRVc2FnZSh7IHNjaGVtYSwgb3B0cywgc2VsZiwgZXJyU2NoZW1hUGF0aCB9LCBkZWYsIGtleXdvcmQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZWYua2V5d29yZCkgPyAhZGVmLmtleXdvcmQuaW5jbHVkZXMoa2V5d29yZCkgOiBkZWYua2V5d29yZCAhPT0ga2V5d29yZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgfVxuICAgIGNvbnN0IGRlcHMgPSBkZWYuZGVwZW5kZW5jaWVzO1xuICAgIGlmIChkZXBzID09PSBudWxsIHx8IGRlcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlcHMuc29tZSgoa3dkKSA9PiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwga3dkKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwYXJlbnQgc2NoZW1hIG11c3QgaGF2ZSBkZXBlbmRlbmNpZXMgb2YgJHtrZXl3b3JkfTogJHtkZXBzLmpvaW4oXCIsXCIpfWApO1xuICAgIH1cbiAgICBpZiAoZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZGVmLnZhbGlkYXRlU2NoZW1hKHNjaGVtYVtrZXl3b3JkXSk7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiIHZhbHVlIGlzIGludmFsaWQgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cIjogYCArXG4gICAgICAgICAgICAgICAgc2VsZi5lcnJvcnNUZXh0KGRlZi52YWxpZGF0ZVNjaGVtYS5lcnJvcnMpO1xuICAgICAgICAgICAgaWYgKG9wdHMudmFsaWRhdGVTY2hlbWEgPT09IFwibG9nXCIpXG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZXJyb3IobXNnKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVLZXl3b3JkVXNhZ2UgPSB2YWxpZGF0ZUtleXdvcmRVc2FnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleXdvcmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYU1vZGUgPSBleHBvcnRzLmV4dGVuZFN1YnNjaGVtYURhdGEgPSBleHBvcnRzLmdldFN1YnNjaGVtYSA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5mdW5jdGlvbiBnZXRTdWJzY2hlbWEoaXQsIHsga2V5d29yZCwgc2NoZW1hUHJvcCwgc2NoZW1hLCBzY2hlbWFQYXRoLCBlcnJTY2hlbWFQYXRoLCB0b3BTY2hlbWFSZWYgfSkge1xuICAgIGlmIChrZXl3b3JkICE9PSB1bmRlZmluZWQgJiYgc2NoZW1hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdib3RoIFwia2V5d29yZFwiIGFuZCBcInNjaGVtYVwiIHBhc3NlZCwgb25seSBvbmUgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBpZiAoa2V5d29yZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICAgICAgcmV0dXJuIHNjaGVtYVByb3AgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiBzY2gsXG4gICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5zY2hlbWFQYXRofSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoa2V5d29yZCl9YCxcbiAgICAgICAgICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoW3NjaGVtYVByb3BdLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuc2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoc2NoZW1hUHJvcCl9YCxcbiAgICAgICAgICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9LyR7KDAsIHV0aWxfMS5lc2NhcGVGcmFnbWVudCkoc2NoZW1hUHJvcCl9YCxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIGlmIChzY2hlbWEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoc2NoZW1hUGF0aCA9PT0gdW5kZWZpbmVkIHx8IGVyclNjaGVtYVBhdGggPT09IHVuZGVmaW5lZCB8fCB0b3BTY2hlbWFSZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInNjaGVtYVBhdGhcIiwgXCJlcnJTY2hlbWFQYXRoXCIgYW5kIFwidG9wU2NoZW1hUmVmXCIgYXJlIHJlcXVpcmVkIHdpdGggXCJzY2hlbWFcIicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICBzY2hlbWFQYXRoLFxuICAgICAgICAgICAgdG9wU2NoZW1hUmVmLFxuICAgICAgICAgICAgZXJyU2NoZW1hUGF0aCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdlaXRoZXIgXCJrZXl3b3JkXCIgb3IgXCJzY2hlbWFcIiBtdXN0IGJlIHBhc3NlZCcpO1xufVxuZXhwb3J0cy5nZXRTdWJzY2hlbWEgPSBnZXRTdWJzY2hlbWE7XG5mdW5jdGlvbiBleHRlbmRTdWJzY2hlbWFEYXRhKHN1YnNjaGVtYSwgaXQsIHsgZGF0YVByb3AsIGRhdGFQcm9wVHlwZTogZHBUeXBlLCBkYXRhLCBkYXRhVHlwZXMsIHByb3BlcnR5TmFtZSB9KSB7XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiBkYXRhUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYm90aCBcImRhdGFcIiBhbmQgXCJkYXRhUHJvcFwiIHBhc3NlZCwgb25seSBvbmUgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGdlbiB9ID0gaXQ7XG4gICAgaWYgKGRhdGFQcm9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgeyBlcnJvclBhdGgsIGRhdGFQYXRoQXJyLCBvcHRzIH0gPSBpdDtcbiAgICAgICAgY29uc3QgbmV4dERhdGEgPSBnZW4ubGV0KFwiZGF0YVwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0LmRhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShkYXRhUHJvcCl9YCwgdHJ1ZSk7XG4gICAgICAgIGRhdGFDb250ZXh0UHJvcHMobmV4dERhdGEpO1xuICAgICAgICBzdWJzY2hlbWEuZXJyb3JQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2Vycm9yUGF0aH0keygwLCB1dGlsXzEuZ2V0RXJyb3JQYXRoKShkYXRhUHJvcCwgZHBUeXBlLCBvcHRzLmpzUHJvcGVydHlTeW50YXgpfWA7XG4gICAgICAgIHN1YnNjaGVtYS5wYXJlbnREYXRhUHJvcGVydHkgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFQcm9wfWA7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhUGF0aEFyciA9IFsuLi5kYXRhUGF0aEFyciwgc3Vic2NoZW1hLnBhcmVudERhdGFQcm9wZXJ0eV07XG4gICAgfVxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgbmV4dERhdGEgPSBkYXRhIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyBkYXRhIDogZ2VuLmxldChcImRhdGFcIiwgZGF0YSwgdHJ1ZSk7IC8vIHJlcGxhY2VhYmxlIGlmIHVzZWQgb25jZT9cbiAgICAgICAgZGF0YUNvbnRleHRQcm9wcyhuZXh0RGF0YSk7XG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN1YnNjaGVtYS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIC8vIFRPRE8gc29tZXRoaW5nIGlzIHBvc3NpYmx5IHdyb25nIGhlcmUgd2l0aCBub3QgY2hhbmdpbmcgcGFyZW50RGF0YVByb3BlcnR5IGFuZCBub3QgYXBwZW5kaW5nIGRhdGFQYXRoQXJyXG4gICAgfVxuICAgIGlmIChkYXRhVHlwZXMpXG4gICAgICAgIHN1YnNjaGVtYS5kYXRhVHlwZXMgPSBkYXRhVHlwZXM7XG4gICAgZnVuY3Rpb24gZGF0YUNvbnRleHRQcm9wcyhfbmV4dERhdGEpIHtcbiAgICAgICAgc3Vic2NoZW1hLmRhdGEgPSBfbmV4dERhdGE7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhTGV2ZWwgPSBpdC5kYXRhTGV2ZWwgKyAxO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YVR5cGVzID0gW107XG4gICAgICAgIGl0LmRlZmluZWRQcm9wZXJ0aWVzID0gbmV3IFNldCgpO1xuICAgICAgICBzdWJzY2hlbWEucGFyZW50RGF0YSA9IGl0LmRhdGE7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhTmFtZXMgPSBbLi4uaXQuZGF0YU5hbWVzLCBfbmV4dERhdGFdO1xuICAgIH1cbn1cbmV4cG9ydHMuZXh0ZW5kU3Vic2NoZW1hRGF0YSA9IGV4dGVuZFN1YnNjaGVtYURhdGE7XG5mdW5jdGlvbiBleHRlbmRTdWJzY2hlbWFNb2RlKHN1YnNjaGVtYSwgeyBqdGREaXNjcmltaW5hdG9yLCBqdGRNZXRhZGF0YSwgY29tcG9zaXRlUnVsZSwgY3JlYXRlRXJyb3JzLCBhbGxFcnJvcnMgfSkge1xuICAgIGlmIChjb21wb3NpdGVSdWxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHN1YnNjaGVtYS5jb21wb3NpdGVSdWxlID0gY29tcG9zaXRlUnVsZTtcbiAgICBpZiAoY3JlYXRlRXJyb3JzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHN1YnNjaGVtYS5jcmVhdGVFcnJvcnMgPSBjcmVhdGVFcnJvcnM7XG4gICAgaWYgKGFsbEVycm9ycyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuYWxsRXJyb3JzID0gYWxsRXJyb3JzO1xuICAgIHN1YnNjaGVtYS5qdGREaXNjcmltaW5hdG9yID0ganRkRGlzY3JpbWluYXRvcjsgLy8gbm90IGluaGVyaXRlZFxuICAgIHN1YnNjaGVtYS5qdGRNZXRhZGF0YSA9IGp0ZE1ldGFkYXRhOyAvLyBub3QgaW5oZXJpdGVkXG59XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYU1vZGUgPSBleHRlbmRTdWJzY2hlbWFNb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NoZW1hLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gdm9pZCAwO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2V5d29yZEN4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGVfMS5LZXl3b3JkQ3h0OyB9IH0pO1xudmFyIGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvY29kZWdlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLk5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb2RlR2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuQ29kZUdlbjsgfSB9KTtcbmNvbnN0IHZhbGlkYXRpb25fZXJyb3JfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKTtcbmNvbnN0IHJlZl9lcnJvcl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5jb25zdCBydWxlc18xID0gcmVxdWlyZShcIi4vY29tcGlsZS9ydWxlc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGVcIik7XG5jb25zdCBjb2RlZ2VuXzIgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3Jlc29sdmVcIik7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0ICRkYXRhUmVmU2NoZW1hID0gcmVxdWlyZShcIi4vcmVmcy9kYXRhLmpzb25cIik7XG5jb25zdCB1cmlfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvdXJpXCIpO1xuY29uc3QgZGVmYXVsdFJlZ0V4cCA9IChzdHIsIGZsYWdzKSA9PiBuZXcgUmVnRXhwKHN0ciwgZmxhZ3MpO1xuZGVmYXVsdFJlZ0V4cC5jb2RlID0gXCJuZXcgUmVnRXhwXCI7XG5jb25zdCBNRVRBX0lHTk9SRV9PUFRJT05TID0gW1wicmVtb3ZlQWRkaXRpb25hbFwiLCBcInVzZURlZmF1bHRzXCIsIFwiY29lcmNlVHlwZXNcIl07XG5jb25zdCBFWFRfU0NPUEVfTkFNRVMgPSBuZXcgU2V0KFtcbiAgICBcInZhbGlkYXRlXCIsXG4gICAgXCJzZXJpYWxpemVcIixcbiAgICBcInBhcnNlXCIsXG4gICAgXCJ3cmFwcGVyXCIsXG4gICAgXCJyb290XCIsXG4gICAgXCJzY2hlbWFcIixcbiAgICBcImtleXdvcmRcIixcbiAgICBcInBhdHRlcm5cIixcbiAgICBcImZvcm1hdHNcIixcbiAgICBcInZhbGlkYXRlJGRhdGFcIixcbiAgICBcImZ1bmNcIixcbiAgICBcIm9ialwiLFxuICAgIFwiRXJyb3JcIixcbl0pO1xuY29uc3QgcmVtb3ZlZE9wdGlvbnMgPSB7XG4gICAgZXJyb3JEYXRhUGF0aDogXCJcIixcbiAgICBmb3JtYXQ6IFwiYHZhbGlkYXRlRm9ybWF0czogZmFsc2VgIGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgbnVsbGFibGU6ICdcIm51bGxhYmxlXCIga2V5d29yZCBpcyBzdXBwb3J0ZWQgYnkgZGVmYXVsdC4nLFxuICAgIGpzb25Qb2ludGVyczogXCJEZXByZWNhdGVkIGpzUHJvcGVydHlTeW50YXggY2FuIGJlIHVzZWQgaW5zdGVhZC5cIixcbiAgICBleHRlbmRSZWZzOiBcIkRlcHJlY2F0ZWQgaWdub3JlS2V5d29yZHNXaXRoUmVmIGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgbWlzc2luZ1JlZnM6IFwiUGFzcyBlbXB0eSBzY2hlbWEgd2l0aCAkaWQgdGhhdCBzaG91bGQgYmUgaWdub3JlZCB0byBhanYuYWRkU2NoZW1hLlwiLFxuICAgIHByb2Nlc3NDb2RlOiBcIlVzZSBvcHRpb24gYGNvZGU6IHtwcm9jZXNzOiAoY29kZSwgc2NoZW1hRW52OiBvYmplY3QpID0+IHN0cmluZ31gXCIsXG4gICAgc291cmNlQ29kZTogXCJVc2Ugb3B0aW9uIGBjb2RlOiB7c291cmNlOiB0cnVlfWBcIixcbiAgICBzdHJpY3REZWZhdWx0czogXCJJdCBpcyBkZWZhdWx0IG5vdywgc2VlIG9wdGlvbiBgc3RyaWN0YC5cIixcbiAgICBzdHJpY3RLZXl3b3JkczogXCJJdCBpcyBkZWZhdWx0IG5vdywgc2VlIG9wdGlvbiBgc3RyaWN0YC5cIixcbiAgICB1bmlxdWVJdGVtczogJ1widW5pcXVlSXRlbXNcIiBrZXl3b3JkIGlzIGFsd2F5cyB2YWxpZGF0ZWQuJyxcbiAgICB1bmtub3duRm9ybWF0czogXCJEaXNhYmxlIHN0cmljdCBtb2RlIG9yIHBhc3MgYHRydWVgIHRvIGBhanYuYWRkRm9ybWF0YCAob3IgYGZvcm1hdHNgIG9wdGlvbikuXCIsXG4gICAgY2FjaGU6IFwiTWFwIGlzIHVzZWQgYXMgY2FjaGUsIHNjaGVtYSBvYmplY3QgYXMga2V5LlwiLFxuICAgIHNlcmlhbGl6ZTogXCJNYXAgaXMgdXNlZCBhcyBjYWNoZSwgc2NoZW1hIG9iamVjdCBhcyBrZXkuXCIsXG4gICAgYWp2RXJyb3JzOiBcIkl0IGlzIGRlZmF1bHQgbm93LlwiLFxufTtcbmNvbnN0IGRlcHJlY2F0ZWRPcHRpb25zID0ge1xuICAgIGlnbm9yZUtleXdvcmRzV2l0aFJlZjogXCJcIixcbiAgICBqc1Byb3BlcnR5U3ludGF4OiBcIlwiLFxuICAgIHVuaWNvZGU6ICdcIm1pbkxlbmd0aFwiL1wibWF4TGVuZ3RoXCIgYWNjb3VudCBmb3IgdW5pY29kZSBjaGFyYWN0ZXJzIGJ5IGRlZmF1bHQuJyxcbn07XG5jb25zdCBNQVhfRVhQUkVTU0lPTiA9IDIwMDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiByZXF1aXJlZE9wdGlvbnMobykge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdSwgX3YsIF93LCBfeCwgX3ksIF96LCBfMDtcbiAgICBjb25zdCBzID0gby5zdHJpY3Q7XG4gICAgY29uc3QgX29wdHogPSAoX2EgPSBvLmNvZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZTtcbiAgICBjb25zdCBvcHRpbWl6ZSA9IF9vcHR6ID09PSB0cnVlIHx8IF9vcHR6ID09PSB1bmRlZmluZWQgPyAxIDogX29wdHogfHwgMDtcbiAgICBjb25zdCByZWdFeHAgPSAoX2MgPSAoX2IgPSBvLmNvZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZWdFeHApICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGRlZmF1bHRSZWdFeHA7XG4gICAgY29uc3QgdXJpUmVzb2x2ZXIgPSAoX2QgPSBvLnVyaVJlc29sdmVyKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB1cmlfMS5kZWZhdWx0O1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0cmljdFNjaGVtYTogKF9mID0gKF9lID0gby5zdHJpY3RTY2hlbWEpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IHMpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IHRydWUsXG4gICAgICAgIHN0cmljdE51bWJlcnM6IChfaCA9IChfZyA9IG8uc3RyaWN0TnVtYmVycykgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogcykgIT09IG51bGwgJiYgX2ggIT09IHZvaWQgMCA/IF9oIDogdHJ1ZSxcbiAgICAgICAgc3RyaWN0VHlwZXM6IChfayA9IChfaiA9IG8uc3RyaWN0VHlwZXMpICE9PSBudWxsICYmIF9qICE9PSB2b2lkIDAgPyBfaiA6IHMpICE9PSBudWxsICYmIF9rICE9PSB2b2lkIDAgPyBfayA6IFwibG9nXCIsXG4gICAgICAgIHN0cmljdFR1cGxlczogKF9tID0gKF9sID0gby5zdHJpY3RUdXBsZXMpICE9PSBudWxsICYmIF9sICE9PSB2b2lkIDAgPyBfbCA6IHMpICE9PSBudWxsICYmIF9tICE9PSB2b2lkIDAgPyBfbSA6IFwibG9nXCIsXG4gICAgICAgIHN0cmljdFJlcXVpcmVkOiAoX3AgPSAoX28gPSBvLnN0cmljdFJlcXVpcmVkKSAhPT0gbnVsbCAmJiBfbyAhPT0gdm9pZCAwID8gX28gOiBzKSAhPT0gbnVsbCAmJiBfcCAhPT0gdm9pZCAwID8gX3AgOiBmYWxzZSxcbiAgICAgICAgY29kZTogby5jb2RlID8geyAuLi5vLmNvZGUsIG9wdGltaXplLCByZWdFeHAgfSA6IHsgb3B0aW1pemUsIHJlZ0V4cCB9LFxuICAgICAgICBsb29wUmVxdWlyZWQ6IChfcSA9IG8ubG9vcFJlcXVpcmVkKSAhPT0gbnVsbCAmJiBfcSAhPT0gdm9pZCAwID8gX3EgOiBNQVhfRVhQUkVTU0lPTixcbiAgICAgICAgbG9vcEVudW06IChfciA9IG8ubG9vcEVudW0pICE9PSBudWxsICYmIF9yICE9PSB2b2lkIDAgPyBfciA6IE1BWF9FWFBSRVNTSU9OLFxuICAgICAgICBtZXRhOiAoX3MgPSBvLm1ldGEpICE9PSBudWxsICYmIF9zICE9PSB2b2lkIDAgPyBfcyA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2VzOiAoX3QgPSBvLm1lc3NhZ2VzKSAhPT0gbnVsbCAmJiBfdCAhPT0gdm9pZCAwID8gX3QgOiB0cnVlLFxuICAgICAgICBpbmxpbmVSZWZzOiAoX3UgPSBvLmlubGluZVJlZnMpICE9PSBudWxsICYmIF91ICE9PSB2b2lkIDAgPyBfdSA6IHRydWUsXG4gICAgICAgIHNjaGVtYUlkOiAoX3YgPSBvLnNjaGVtYUlkKSAhPT0gbnVsbCAmJiBfdiAhPT0gdm9pZCAwID8gX3YgOiBcIiRpZFwiLFxuICAgICAgICBhZGRVc2VkU2NoZW1hOiAoX3cgPSBvLmFkZFVzZWRTY2hlbWEpICE9PSBudWxsICYmIF93ICE9PSB2b2lkIDAgPyBfdyA6IHRydWUsXG4gICAgICAgIHZhbGlkYXRlU2NoZW1hOiAoX3ggPSBvLnZhbGlkYXRlU2NoZW1hKSAhPT0gbnVsbCAmJiBfeCAhPT0gdm9pZCAwID8gX3ggOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZUZvcm1hdHM6IChfeSA9IG8udmFsaWRhdGVGb3JtYXRzKSAhPT0gbnVsbCAmJiBfeSAhPT0gdm9pZCAwID8gX3kgOiB0cnVlLFxuICAgICAgICB1bmljb2RlUmVnRXhwOiAoX3ogPSBvLnVuaWNvZGVSZWdFeHApICE9PSBudWxsICYmIF96ICE9PSB2b2lkIDAgPyBfeiA6IHRydWUsXG4gICAgICAgIGludDMycmFuZ2U6IChfMCA9IG8uaW50MzJyYW5nZSkgIT09IG51bGwgJiYgXzAgIT09IHZvaWQgMCA/IF8wIDogdHJ1ZSxcbiAgICAgICAgdXJpUmVzb2x2ZXI6IHVyaVJlc29sdmVyLFxuICAgIH07XG59XG5jbGFzcyBBanYge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLnNjaGVtYXMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMuZm9ybWF0cyA9IHt9O1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB7fTtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIG9wdHMgPSB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIC4uLnJlcXVpcmVkT3B0aW9ucyhvcHRzKSB9O1xuICAgICAgICBjb25zdCB7IGVzNSwgbGluZXMgfSA9IHRoaXMub3B0cy5jb2RlO1xuICAgICAgICB0aGlzLnNjb3BlID0gbmV3IGNvZGVnZW5fMi5WYWx1ZVNjb3BlKHsgc2NvcGU6IHt9LCBwcmVmaXhlczogRVhUX1NDT1BFX05BTUVTLCBlczUsIGxpbmVzIH0pO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcihvcHRzLmxvZ2dlcik7XG4gICAgICAgIGNvbnN0IGZvcm1hdE9wdCA9IG9wdHMudmFsaWRhdGVGb3JtYXRzO1xuICAgICAgICBvcHRzLnZhbGlkYXRlRm9ybWF0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLlJVTEVTID0gKDAsIHJ1bGVzXzEuZ2V0UnVsZXMpKCk7XG4gICAgICAgIGNoZWNrT3B0aW9ucy5jYWxsKHRoaXMsIHJlbW92ZWRPcHRpb25zLCBvcHRzLCBcIk5PVCBTVVBQT1JURURcIik7XG4gICAgICAgIGNoZWNrT3B0aW9ucy5jYWxsKHRoaXMsIGRlcHJlY2F0ZWRPcHRpb25zLCBvcHRzLCBcIkRFUFJFQ0FURURcIiwgXCJ3YXJuXCIpO1xuICAgICAgICB0aGlzLl9tZXRhT3B0cyA9IGdldE1ldGFTY2hlbWFPcHRpb25zLmNhbGwodGhpcyk7XG4gICAgICAgIGlmIChvcHRzLmZvcm1hdHMpXG4gICAgICAgICAgICBhZGRJbml0aWFsRm9ybWF0cy5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRWb2NhYnVsYXJpZXMoKTtcbiAgICAgICAgdGhpcy5fYWRkRGVmYXVsdE1ldGFTY2hlbWEoKTtcbiAgICAgICAgaWYgKG9wdHMua2V5d29yZHMpXG4gICAgICAgICAgICBhZGRJbml0aWFsS2V5d29yZHMuY2FsbCh0aGlzLCBvcHRzLmtleXdvcmRzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1ldGEgPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRoaXMuYWRkTWV0YVNjaGVtYShvcHRzLm1ldGEpO1xuICAgICAgICBhZGRJbml0aWFsU2NoZW1hcy5jYWxsKHRoaXMpO1xuICAgICAgICBvcHRzLnZhbGlkYXRlRm9ybWF0cyA9IGZvcm1hdE9wdDtcbiAgICB9XG4gICAgX2FkZFZvY2FidWxhcmllcygpIHtcbiAgICAgICAgdGhpcy5hZGRLZXl3b3JkKFwiJGFzeW5jXCIpO1xuICAgIH1cbiAgICBfYWRkRGVmYXVsdE1ldGFTY2hlbWEoKSB7XG4gICAgICAgIGNvbnN0IHsgJGRhdGEsIG1ldGEsIHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGxldCBfZGF0YVJlZlNjaGVtYSA9ICRkYXRhUmVmU2NoZW1hO1xuICAgICAgICBpZiAoc2NoZW1hSWQgPT09IFwiaWRcIikge1xuICAgICAgICAgICAgX2RhdGFSZWZTY2hlbWEgPSB7IC4uLiRkYXRhUmVmU2NoZW1hIH07XG4gICAgICAgICAgICBfZGF0YVJlZlNjaGVtYS5pZCA9IF9kYXRhUmVmU2NoZW1hLiRpZDtcbiAgICAgICAgICAgIGRlbGV0ZSBfZGF0YVJlZlNjaGVtYS4kaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGEgJiYgJGRhdGEpXG4gICAgICAgICAgICB0aGlzLmFkZE1ldGFTY2hlbWEoX2RhdGFSZWZTY2hlbWEsIF9kYXRhUmVmU2NoZW1hW3NjaGVtYUlkXSwgZmFsc2UpO1xuICAgIH1cbiAgICBkZWZhdWx0TWV0YSgpIHtcbiAgICAgICAgY29uc3QgeyBtZXRhLCBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0cy5kZWZhdWx0TWV0YSA9IHR5cGVvZiBtZXRhID09IFwib2JqZWN0XCIgPyBtZXRhW3NjaGVtYUlkXSB8fCBtZXRhIDogdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgdmFsaWRhdGUoc2NoZW1hS2V5UmVmLCAvLyBrZXksIHJlZiBvciBzY2hlbWEgb2JqZWN0XG4gICAgZGF0YSAvLyB0byBiZSB2YWxpZGF0ZWRcbiAgICApIHtcbiAgICAgICAgbGV0IHY7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hS2V5UmVmID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLmdldFNjaGVtYShzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgaWYgKCF2KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbm8gc2NoZW1hIHdpdGgga2V5IG9yIHJlZiBcIiR7c2NoZW1hS2V5UmVmfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5jb21waWxlKHNjaGVtYUtleVJlZik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWQgPSB2KGRhdGEpO1xuICAgICAgICBpZiAoIShcIiRhc3luY1wiIGluIHYpKVxuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSB2LmVycm9ycztcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgICBjb21waWxlKHNjaGVtYSwgX21ldGEpIHtcbiAgICAgICAgY29uc3Qgc2NoID0gdGhpcy5fYWRkU2NoZW1hKHNjaGVtYSwgX21ldGEpO1xuICAgICAgICByZXR1cm4gKHNjaC52YWxpZGF0ZSB8fCB0aGlzLl9jb21waWxlU2NoZW1hRW52KHNjaCkpO1xuICAgIH1cbiAgICBjb21waWxlQXN5bmMoc2NoZW1hLCBtZXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLmxvYWRTY2hlbWEgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmxvYWRTY2hlbWEgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBsb2FkU2NoZW1hIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIHJldHVybiBydW5Db21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2hlbWEsIG1ldGEpO1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBydW5Db21waWxlQXN5bmMoX3NjaGVtYSwgX21ldGEpIHtcbiAgICAgICAgICAgIGF3YWl0IGxvYWRNZXRhU2NoZW1hLmNhbGwodGhpcywgX3NjaGVtYS4kc2NoZW1hKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaCA9IHRoaXMuX2FkZFNjaGVtYShfc2NoZW1hLCBfbWV0YSk7XG4gICAgICAgICAgICByZXR1cm4gc2NoLnZhbGlkYXRlIHx8IF9jb21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRNZXRhU2NoZW1hKCRyZWYpIHtcbiAgICAgICAgICAgIGlmICgkcmVmICYmICF0aGlzLmdldFNjaGVtYSgkcmVmKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJ1bkNvbXBpbGVBc3luYy5jYWxsKHRoaXMsIHsgJHJlZiB9LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBfY29tcGlsZUFzeW5jKHNjaCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGlsZVNjaGVtYUVudihzY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgcmVmX2Vycm9yXzEuZGVmYXVsdCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgY2hlY2tMb2FkZWQuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkTWlzc2luZ1NjaGVtYS5jYWxsKHRoaXMsIGUubWlzc2luZ1NjaGVtYSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTG9hZGVkKHsgbWlzc2luZ1NjaGVtYTogcmVmLCBtaXNzaW5nUmVmIH0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZnNbcmVmXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQW55U2NoZW1hICR7cmVmfSBpcyBsb2FkZWQgYnV0ICR7bWlzc2luZ1JlZn0gY2Fubm90IGJlIHJlc29sdmVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gbG9hZE1pc3NpbmdTY2hlbWEocmVmKSB7XG4gICAgICAgICAgICBjb25zdCBfc2NoZW1hID0gYXdhaXQgX2xvYWRTY2hlbWEuY2FsbCh0aGlzLCByZWYpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlZnNbcmVmXSlcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkTWV0YVNjaGVtYS5jYWxsKHRoaXMsIF9zY2hlbWEuJHNjaGVtYSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVmc1tyZWZdKVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKF9zY2hlbWEsIHJlZiwgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gX2xvYWRTY2hlbWEocmVmKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gdGhpcy5fbG9hZGluZ1tyZWZdO1xuICAgICAgICAgICAgaWYgKHApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCAodGhpcy5fbG9hZGluZ1tyZWZdID0gbG9hZFNjaGVtYShyZWYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9sb2FkaW5nW3JlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkcyBzY2hlbWEgdG8gdGhlIGluc3RhbmNlXG4gICAgYWRkU2NoZW1hKHNjaGVtYSwgLy8gSWYgYXJyYXkgaXMgcGFzc2VkLCBga2V5YCB3aWxsIGJlIGlnbm9yZWRcbiAgICBrZXksIC8vIE9wdGlvbmFsIHNjaGVtYSBrZXkuIENhbiBiZSBwYXNzZWQgdG8gYHZhbGlkYXRlYCBtZXRob2QgaW5zdGVhZCBvZiBzY2hlbWEgb2JqZWN0IG9yIGlkL3JlZi4gT25lIHNjaGVtYSBwZXIgaW5zdGFuY2UgY2FuIGhhdmUgZW1wdHkgYGlkYCBhbmQgYGtleWAuXG4gICAgX21ldGEsIC8vIHRydWUgaWYgc2NoZW1hIGlzIGEgbWV0YS1zY2hlbWEuIFVzZWQgaW50ZXJuYWxseSwgYWRkTWV0YVNjaGVtYSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgIF92YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSAvLyBmYWxzZSB0byBza2lwIHNjaGVtYSB2YWxpZGF0aW9uLiBVc2VkIGludGVybmFsbHksIG9wdGlvbiB2YWxpZGF0ZVNjaGVtYSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgICkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjaCBvZiBzY2hlbWEpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY2hlbWEoc2NoLCB1bmRlZmluZWQsIF9tZXRhLCBfdmFsaWRhdGVTY2hlbWEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgaWQgPSBzY2hlbWFbc2NoZW1hSWRdO1xuICAgICAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGlkICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNjaGVtYSAke3NjaGVtYUlkfSBtdXN0IGJlIHN0cmluZ2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleSA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGtleSB8fCBpZCk7XG4gICAgICAgIHRoaXMuX2NoZWNrVW5pcXVlKGtleSk7XG4gICAgICAgIHRoaXMuc2NoZW1hc1trZXldID0gdGhpcy5fYWRkU2NoZW1hKHNjaGVtYSwgX21ldGEsIGtleSwgX3ZhbGlkYXRlU2NoZW1hLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIEFkZCBzY2hlbWEgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgb3RoZXIgc2NoZW1hc1xuICAgIC8vIG9wdGlvbnMgaW4gTUVUQV9JR05PUkVfT1BUSU9OUyBhcmUgYWx3YXkgc2V0IHRvIGZhbHNlXG4gICAgYWRkTWV0YVNjaGVtYShzY2hlbWEsIGtleSwgLy8gc2NoZW1hIGtleVxuICAgIF92YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSAvLyBmYWxzZSB0byBza2lwIHNjaGVtYSB2YWxpZGF0aW9uLCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSB2YWxpZGF0ZVNjaGVtYSBvcHRpb24gZm9yIG1ldGEtc2NoZW1hXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYWRkU2NoZW1hKHNjaGVtYSwga2V5LCB0cnVlLCBfdmFsaWRhdGVTY2hlbWEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gIFZhbGlkYXRlIHNjaGVtYSBhZ2FpbnN0IGl0cyBtZXRhLXNjaGVtYVxuICAgIHZhbGlkYXRlU2NoZW1hKHNjaGVtYSwgdGhyb3dPckxvZ0Vycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGxldCAkc2NoZW1hO1xuICAgICAgICAkc2NoZW1hID0gc2NoZW1hLiRzY2hlbWE7XG4gICAgICAgIGlmICgkc2NoZW1hICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mICRzY2hlbWEgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJHNjaGVtYSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgICRzY2hlbWEgPSAkc2NoZW1hIHx8IHRoaXMub3B0cy5kZWZhdWx0TWV0YSB8fCB0aGlzLmRlZmF1bHRNZXRhKCk7XG4gICAgICAgIGlmICghJHNjaGVtYSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIm1ldGEtc2NoZW1hIG5vdCBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMudmFsaWRhdGUoJHNjaGVtYSwgc2NoZW1hKTtcbiAgICAgICAgaWYgKCF2YWxpZCAmJiB0aHJvd09yTG9nRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcInNjaGVtYSBpcyBpbnZhbGlkOiBcIiArIHRoaXMuZXJyb3JzVGV4dCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSA9PT0gXCJsb2dcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgICAvLyBHZXQgY29tcGlsZWQgc2NoZW1hIGJ5IGBrZXlgIG9yIGByZWZgLlxuICAgIC8vIChga2V5YCB0aGF0IHdhcyBwYXNzZWQgdG8gYGFkZFNjaGVtYWAgb3IgZnVsbCBzY2hlbWEgcmVmZXJlbmNlIC0gYHNjaGVtYS4kaWRgIG9yIHJlc29sdmVkIGlkKVxuICAgIGdldFNjaGVtYShrZXlSZWYpIHtcbiAgICAgICAgbGV0IHNjaDtcbiAgICAgICAgd2hpbGUgKHR5cGVvZiAoc2NoID0gZ2V0U2NoRW52LmNhbGwodGhpcywga2V5UmVmKSkgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGtleVJlZiA9IHNjaDtcbiAgICAgICAgaWYgKHNjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBjb25zdCByb290ID0gbmV3IGNvbXBpbGVfMS5TY2hlbWFFbnYoeyBzY2hlbWE6IHt9LCBzY2hlbWFJZCB9KTtcbiAgICAgICAgICAgIHNjaCA9IGNvbXBpbGVfMS5yZXNvbHZlU2NoZW1hLmNhbGwodGhpcywgcm9vdCwga2V5UmVmKTtcbiAgICAgICAgICAgIGlmICghc2NoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucmVmc1trZXlSZWZdID0gc2NoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoc2NoLnZhbGlkYXRlIHx8IHRoaXMuX2NvbXBpbGVTY2hlbWFFbnYoc2NoKSk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBjYWNoZWQgc2NoZW1hKHMpLlxuICAgIC8vIElmIG5vIHBhcmFtZXRlciBpcyBwYXNzZWQgYWxsIHNjaGVtYXMgYnV0IG1ldGEtc2NoZW1hcyBhcmUgcmVtb3ZlZC5cbiAgICAvLyBJZiBSZWdFeHAgaXMgcGFzc2VkIGFsbCBzY2hlbWFzIHdpdGgga2V5L2lkIG1hdGNoaW5nIHBhdHRlcm4gYnV0IG1ldGEtc2NoZW1hcyBhcmUgcmVtb3ZlZC5cbiAgICAvLyBFdmVuIGlmIHNjaGVtYSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIHNjaGVtYXMgaXQgc3RpbGwgY2FuIGJlIHJlbW92ZWQgYXMgb3RoZXIgc2NoZW1hcyBoYXZlIGxvY2FsIHJlZmVyZW5jZXMuXG4gICAgcmVtb3ZlU2NoZW1hKHNjaGVtYUtleVJlZikge1xuICAgICAgICBpZiAoc2NoZW1hS2V5UmVmIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMuc2NoZW1hcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5yZWZzLCBzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0eXBlb2Ygc2NoZW1hS2V5UmVmKSB7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnNjaGVtYXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5yZWZzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoID0gZ2V0U2NoRW52LmNhbGwodGhpcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjaCA9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoc2NoLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hc1tzY2hlbWFLZXlSZWZdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlZnNbc2NoZW1hS2V5UmVmXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gc2NoZW1hS2V5UmVmO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShjYWNoZUtleSk7XG4gICAgICAgICAgICAgICAgbGV0IGlkID0gc2NoZW1hS2V5UmVmW3RoaXMub3B0cy5zY2hlbWFJZF07XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoaWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWFzW2lkXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVmc1tpZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYucmVtb3ZlU2NoZW1hOiBpbnZhbGlkIHBhcmFtZXRlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgXCJ2b2NhYnVsYXJ5XCIgLSBhIGNvbGxlY3Rpb24gb2Yga2V5d29yZHNcbiAgICBhZGRWb2NhYnVsYXJ5KGRlZmluaXRpb25zKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZmluaXRpb25zKVxuICAgICAgICAgICAgdGhpcy5hZGRLZXl3b3JkKGRlZik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRLZXl3b3JkKGt3ZE9yRGVmLCBkZWYgLy8gZGVwcmVjYXRlZFxuICAgICkge1xuICAgICAgICBsZXQga2V5d29yZDtcbiAgICAgICAgaWYgKHR5cGVvZiBrd2RPckRlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBrZXl3b3JkID0ga3dkT3JEZWY7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZiA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcInRoZXNlIHBhcmFtZXRlcnMgYXJlIGRlcHJlY2F0ZWQsIHNlZSBkb2NzIGZvciBhZGRLZXl3b3JkXCIpO1xuICAgICAgICAgICAgICAgIGRlZi5rZXl3b3JkID0ga2V5d29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Yga3dkT3JEZWYgPT0gXCJvYmplY3RcIiAmJiBkZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVmID0ga3dkT3JEZWY7XG4gICAgICAgICAgICBrZXl3b3JkID0gZGVmLmtleXdvcmQ7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXl3b3JkKSAmJiAha2V5d29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhZGRLZXl3b3Jkczoga2V5d29yZCBtdXN0IGJlIHN0cmluZyBvciBub24tZW1wdHkgYXJyYXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGFkZEtleXdvcmRzIHBhcmFtZXRlcnNcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tLZXl3b3JkLmNhbGwodGhpcywga2V5d29yZCwgZGVmKTtcbiAgICAgICAgaWYgKCFkZWYpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIChrd2QpID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrd2QpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGtleXdvcmRNZXRhc2NoZW1hLmNhbGwodGhpcywgZGVmKTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IHtcbiAgICAgICAgICAgIC4uLmRlZixcbiAgICAgICAgICAgIHR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmLnR5cGUpLFxuICAgICAgICAgICAgc2NoZW1hVHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWYuc2NoZW1hVHlwZSksXG4gICAgICAgIH07XG4gICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIGRlZmluaXRpb24udHlwZS5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8gKGspID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrLCBkZWZpbml0aW9uKVxuICAgICAgICAgICAgOiAoaykgPT4gZGVmaW5pdGlvbi50eXBlLmZvckVhY2goKHQpID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrLCBkZWZpbml0aW9uLCB0KSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0S2V5d29yZChrZXl3b3JkKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSB0aGlzLlJVTEVTLmFsbFtrZXl3b3JkXTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBydWxlID09IFwib2JqZWN0XCIgPyBydWxlLmRlZmluaXRpb24gOiAhIXJ1bGU7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBrZXl3b3JkXG4gICAgcmVtb3ZlS2V5d29yZChrZXl3b3JkKSB7XG4gICAgICAgIC8vIFRPRE8gcmV0dXJuIHR5cGUgc2hvdWxkIGJlIEFqdlxuICAgICAgICBjb25zdCB7IFJVTEVTIH0gPSB0aGlzO1xuICAgICAgICBkZWxldGUgUlVMRVMua2V5d29yZHNba2V5d29yZF07XG4gICAgICAgIGRlbGV0ZSBSVUxFUy5hbGxba2V5d29yZF07XG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgUlVMRVMucnVsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBncm91cC5ydWxlcy5maW5kSW5kZXgoKHJ1bGUpID0+IHJ1bGUua2V5d29yZCA9PT0ga2V5d29yZCk7XG4gICAgICAgICAgICBpZiAoaSA+PSAwKVxuICAgICAgICAgICAgICAgIGdyb3VwLnJ1bGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gQWRkIGZvcm1hdFxuICAgIGFkZEZvcm1hdChuYW1lLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGZvcm1hdCA9IG5ldyBSZWdFeHAoZm9ybWF0KTtcbiAgICAgICAgdGhpcy5mb3JtYXRzW25hbWVdID0gZm9ybWF0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZXJyb3JzVGV4dChlcnJvcnMgPSB0aGlzLmVycm9ycywgLy8gb3B0aW9uYWwgYXJyYXkgb2YgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICB7IHNlcGFyYXRvciA9IFwiLCBcIiwgZGF0YVZhciA9IFwiZGF0YVwiIH0gPSB7fSAvLyBvcHRpb25hbCBvcHRpb25zIHdpdGggcHJvcGVydGllcyBgc2VwYXJhdG9yYCBhbmQgYGRhdGFWYXJgXG4gICAgKSB7XG4gICAgICAgIGlmICghZXJyb3JzIHx8IGVycm9ycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gXCJObyBlcnJvcnNcIjtcbiAgICAgICAgcmV0dXJuIGVycm9yc1xuICAgICAgICAgICAgLm1hcCgoZSkgPT4gYCR7ZGF0YVZhcn0ke2UuaW5zdGFuY2VQYXRofSAke2UubWVzc2FnZX1gKVxuICAgICAgICAgICAgLnJlZHVjZSgodGV4dCwgbXNnKSA9PiB0ZXh0ICsgc2VwYXJhdG9yICsgbXNnKTtcbiAgICB9XG4gICAgJGRhdGFNZXRhU2NoZW1hKG1ldGFTY2hlbWEsIGtleXdvcmRzSnNvblBvaW50ZXJzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5SVUxFUy5hbGw7XG4gICAgICAgIG1ldGFTY2hlbWEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1ldGFTY2hlbWEpKTtcbiAgICAgICAgZm9yIChjb25zdCBqc29uUG9pbnRlciBvZiBrZXl3b3Jkc0pzb25Qb2ludGVycykge1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBqc29uUG9pbnRlci5zcGxpdChcIi9cIikuc2xpY2UoMSk7IC8vIGZpcnN0IHNlZ21lbnQgaXMgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICBsZXQga2V5d29yZHMgPSBtZXRhU2NoZW1hO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWcgb2Ygc2VnbWVudHMpXG4gICAgICAgICAgICAgICAga2V5d29yZHMgPSBrZXl3b3Jkc1tzZWddO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBydWxlID0gcnVsZXNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJ1bGUgIT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY29uc3QgeyAkZGF0YSB9ID0gcnVsZS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IGtleXdvcmRzW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKCRkYXRhICYmIHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZHNba2V5XSA9IHNjaGVtYU9yRGF0YShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRhU2NoZW1hO1xuICAgIH1cbiAgICBfcmVtb3ZlQWxsU2NoZW1hcyhzY2hlbWFzLCByZWdleCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleVJlZiBpbiBzY2hlbWFzKSB7XG4gICAgICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICBpZiAoIXJlZ2V4IHx8IHJlZ2V4LnRlc3Qoa2V5UmVmKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNjaGVtYXNba2V5UmVmXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoICYmICFzY2gubWV0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoc2NoLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9hZGRTY2hlbWEoc2NoZW1hLCBtZXRhLCBiYXNlSWQsIHZhbGlkYXRlU2NoZW1hID0gdGhpcy5vcHRzLnZhbGlkYXRlU2NoZW1hLCBhZGRTY2hlbWEgPSB0aGlzLm9wdHMuYWRkVXNlZFNjaGVtYSkge1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWQgPSBzY2hlbWFbc2NoZW1hSWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5qdGQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIG11c3QgYmUgb2JqZWN0XCIpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNjaGVtYSAhPSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgbXVzdCBiZSBvYmplY3Qgb3IgYm9vbGVhblwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2NoID0gdGhpcy5fY2FjaGUuZ2V0KHNjaGVtYSk7XG4gICAgICAgIGlmIChzY2ggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBzY2g7XG4gICAgICAgIGJhc2VJZCA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGlkIHx8IGJhc2VJZCk7XG4gICAgICAgIGNvbnN0IGxvY2FsUmVmcyA9IHJlc29sdmVfMS5nZXRTY2hlbWFSZWZzLmNhbGwodGhpcywgc2NoZW1hLCBiYXNlSWQpO1xuICAgICAgICBzY2ggPSBuZXcgY29tcGlsZV8xLlNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIG1ldGEsIGJhc2VJZCwgbG9jYWxSZWZzIH0pO1xuICAgICAgICB0aGlzLl9jYWNoZS5zZXQoc2NoLnNjaGVtYSwgc2NoKTtcbiAgICAgICAgaWYgKGFkZFNjaGVtYSAmJiAhYmFzZUlkLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGF0bSBpdCBpcyBhbGxvd2VkIHRvIG92ZXJ3cml0ZSBzY2hlbWFzIHdpdGhvdXQgaWQgKGluc3RlYWQgb2Ygbm90IGFkZGluZyB0aGVtKVxuICAgICAgICAgICAgaWYgKGJhc2VJZClcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1VuaXF1ZShiYXNlSWQpO1xuICAgICAgICAgICAgdGhpcy5yZWZzW2Jhc2VJZF0gPSBzY2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlU2NoZW1hKVxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVNjaGVtYShzY2hlbWEsIHRydWUpO1xuICAgICAgICByZXR1cm4gc2NoO1xuICAgIH1cbiAgICBfY2hlY2tVbmlxdWUoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZW1hc1tpZF0gfHwgdGhpcy5yZWZzW2lkXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzY2hlbWEgd2l0aCBrZXkgb3IgaWQgXCIke2lkfVwiIGFscmVhZHkgZXhpc3RzYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbXBpbGVTY2hlbWFFbnYoc2NoKSB7XG4gICAgICAgIGlmIChzY2gubWV0YSlcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVNZXRhU2NoZW1hKHNjaCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbXBpbGVfMS5jb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghc2NoLnZhbGlkYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICByZXR1cm4gc2NoLnZhbGlkYXRlO1xuICAgIH1cbiAgICBfY29tcGlsZU1ldGFTY2hlbWEoc2NoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPcHRzID0gdGhpcy5vcHRzO1xuICAgICAgICB0aGlzLm9wdHMgPSB0aGlzLl9tZXRhT3B0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbXBpbGVfMS5jb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub3B0cyA9IGN1cnJlbnRPcHRzO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQWp2O1xuQWp2LlZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0O1xuQWp2Lk1pc3NpbmdSZWZFcnJvciA9IHJlZl9lcnJvcl8xLmRlZmF1bHQ7XG5mdW5jdGlvbiBjaGVja09wdGlvbnMoY2hlY2tPcHRzLCBvcHRpb25zLCBtc2csIGxvZyA9IFwiZXJyb3JcIikge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNoZWNrT3B0cykge1xuICAgICAgICBjb25zdCBvcHQgPSBrZXk7XG4gICAgICAgIGlmIChvcHQgaW4gb3B0aW9ucylcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyW2xvZ10oYCR7bXNnfTogb3B0aW9uICR7a2V5fS4gJHtjaGVja09wdHNbb3B0XX1gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRTY2hFbnYoa2V5UmVmKSB7XG4gICAga2V5UmVmID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoa2V5UmVmKTsgLy8gVE9ETyB0ZXN0cyBmYWlsIHdpdGhvdXQgdGhpcyBsaW5lXG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hc1trZXlSZWZdIHx8IHRoaXMucmVmc1trZXlSZWZdO1xufVxuZnVuY3Rpb24gYWRkSW5pdGlhbFNjaGVtYXMoKSB7XG4gICAgY29uc3Qgb3B0c1NjaGVtYXMgPSB0aGlzLm9wdHMuc2NoZW1hcztcbiAgICBpZiAoIW9wdHNTY2hlbWFzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0c1NjaGVtYXMpKVxuICAgICAgICB0aGlzLmFkZFNjaGVtYShvcHRzU2NoZW1hcyk7XG4gICAgZWxzZVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRzU2NoZW1hcylcbiAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKG9wdHNTY2hlbWFzW2tleV0sIGtleSk7XG59XG5mdW5jdGlvbiBhZGRJbml0aWFsRm9ybWF0cygpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5vcHRzLmZvcm1hdHMpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5vcHRzLmZvcm1hdHNbbmFtZV07XG4gICAgICAgIGlmIChmb3JtYXQpXG4gICAgICAgICAgICB0aGlzLmFkZEZvcm1hdChuYW1lLCBmb3JtYXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZEluaXRpYWxLZXl3b3JkcyhkZWZzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmcykpIHtcbiAgICAgICAgdGhpcy5hZGRWb2NhYnVsYXJ5KGRlZnMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLndhcm4oXCJrZXl3b3JkcyBvcHRpb24gYXMgbWFwIGlzIGRlcHJlY2F0ZWQsIHBhc3MgYXJyYXlcIik7XG4gICAgZm9yIChjb25zdCBrZXl3b3JkIGluIGRlZnMpIHtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmc1trZXl3b3JkXTtcbiAgICAgICAgaWYgKCFkZWYua2V5d29yZClcbiAgICAgICAgICAgIGRlZi5rZXl3b3JkID0ga2V5d29yZDtcbiAgICAgICAgdGhpcy5hZGRLZXl3b3JkKGRlZik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWV0YVNjaGVtYU9wdGlvbnMoKSB7XG4gICAgY29uc3QgbWV0YU9wdHMgPSB7IC4uLnRoaXMub3B0cyB9O1xuICAgIGZvciAoY29uc3Qgb3B0IG9mIE1FVEFfSUdOT1JFX09QVElPTlMpXG4gICAgICAgIGRlbGV0ZSBtZXRhT3B0c1tvcHRdO1xuICAgIHJldHVybiBtZXRhT3B0cztcbn1cbmNvbnN0IG5vTG9ncyA9IHsgbG9nKCkgeyB9LCB3YXJuKCkgeyB9LCBlcnJvcigpIHsgfSB9O1xuZnVuY3Rpb24gZ2V0TG9nZ2VyKGxvZ2dlcikge1xuICAgIGlmIChsb2dnZXIgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gbm9Mb2dzO1xuICAgIGlmIChsb2dnZXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGNvbnNvbGU7XG4gICAgaWYgKGxvZ2dlci5sb2cgJiYgbG9nZ2VyLndhcm4gJiYgbG9nZ2VyLmVycm9yKVxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIHRocm93IG5ldyBFcnJvcihcImxvZ2dlciBtdXN0IGltcGxlbWVudCBsb2csIHdhcm4gYW5kIGVycm9yIG1ldGhvZHNcIik7XG59XG5jb25zdCBLRVlXT1JEX05BTUUgPSAvXlthLXpfJF1bYS16MC05XyQ6LV0qJC9pO1xuZnVuY3Rpb24gY2hlY2tLZXl3b3JkKGtleXdvcmQsIGRlZikge1xuICAgIGNvbnN0IHsgUlVMRVMgfSA9IHRoaXM7XG4gICAgKDAsIHV0aWxfMS5lYWNoSXRlbSkoa2V5d29yZCwgKGt3ZCkgPT4ge1xuICAgICAgICBpZiAoUlVMRVMua2V5d29yZHNba3dkXSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5d29yZCAke2t3ZH0gaXMgYWxyZWFkeSBkZWZpbmVkYCk7XG4gICAgICAgIGlmICghS0VZV09SRF9OQU1FLnRlc3Qoa3dkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5d29yZCAke2t3ZH0gaGFzIGludmFsaWQgbmFtZWApO1xuICAgIH0pO1xuICAgIGlmICghZGVmKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGRlZi4kZGF0YSAmJiAhKFwiY29kZVwiIGluIGRlZiB8fCBcInZhbGlkYXRlXCIgaW4gZGVmKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyRkYXRhIGtleXdvcmQgbXVzdCBoYXZlIFwiY29kZVwiIG9yIFwidmFsaWRhdGVcIiBmdW5jdGlvbicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZFJ1bGUoa2V5d29yZCwgZGVmaW5pdGlvbiwgZGF0YVR5cGUpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgcG9zdCA9IGRlZmluaXRpb24gPT09IG51bGwgfHwgZGVmaW5pdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVmaW5pdGlvbi5wb3N0O1xuICAgIGlmIChkYXRhVHlwZSAmJiBwb3N0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleXdvcmQgd2l0aCBcInBvc3RcIiBmbGFnIGNhbm5vdCBoYXZlIFwidHlwZVwiJyk7XG4gICAgY29uc3QgeyBSVUxFUyB9ID0gdGhpcztcbiAgICBsZXQgcnVsZUdyb3VwID0gcG9zdCA/IFJVTEVTLnBvc3QgOiBSVUxFUy5ydWxlcy5maW5kKCh7IHR5cGU6IHQgfSkgPT4gdCA9PT0gZGF0YVR5cGUpO1xuICAgIGlmICghcnVsZUdyb3VwKSB7XG4gICAgICAgIHJ1bGVHcm91cCA9IHsgdHlwZTogZGF0YVR5cGUsIHJ1bGVzOiBbXSB9O1xuICAgICAgICBSVUxFUy5ydWxlcy5wdXNoKHJ1bGVHcm91cCk7XG4gICAgfVxuICAgIFJVTEVTLmtleXdvcmRzW2tleXdvcmRdID0gdHJ1ZTtcbiAgICBpZiAoIWRlZmluaXRpb24pXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBydWxlID0ge1xuICAgICAgICBrZXl3b3JkLFxuICAgICAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgdHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWZpbml0aW9uLnR5cGUpLFxuICAgICAgICAgICAgc2NoZW1hVHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWZpbml0aW9uLnNjaGVtYVR5cGUpLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgaWYgKGRlZmluaXRpb24uYmVmb3JlKVxuICAgICAgICBhZGRCZWZvcmVSdWxlLmNhbGwodGhpcywgcnVsZUdyb3VwLCBydWxlLCBkZWZpbml0aW9uLmJlZm9yZSk7XG4gICAgZWxzZVxuICAgICAgICBydWxlR3JvdXAucnVsZXMucHVzaChydWxlKTtcbiAgICBSVUxFUy5hbGxba2V5d29yZF0gPSBydWxlO1xuICAgIChfYSA9IGRlZmluaXRpb24uaW1wbGVtZW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goKGt3ZCkgPT4gdGhpcy5hZGRLZXl3b3JkKGt3ZCkpO1xufVxuZnVuY3Rpb24gYWRkQmVmb3JlUnVsZShydWxlR3JvdXAsIHJ1bGUsIGJlZm9yZSkge1xuICAgIGNvbnN0IGkgPSBydWxlR3JvdXAucnVsZXMuZmluZEluZGV4KChfcnVsZSkgPT4gX3J1bGUua2V5d29yZCA9PT0gYmVmb3JlKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHJ1bGVHcm91cC5ydWxlcy5zcGxpY2UoaSwgMCwgcnVsZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBydWxlR3JvdXAucnVsZXMucHVzaChydWxlKTtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgcnVsZSAke2JlZm9yZX0gaXMgbm90IGRlZmluZWRgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBrZXl3b3JkTWV0YXNjaGVtYShkZWYpIHtcbiAgICBsZXQgeyBtZXRhU2NoZW1hIH0gPSBkZWY7XG4gICAgaWYgKG1ldGFTY2hlbWEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkZWYuJGRhdGEgJiYgdGhpcy5vcHRzLiRkYXRhKVxuICAgICAgICBtZXRhU2NoZW1hID0gc2NoZW1hT3JEYXRhKG1ldGFTY2hlbWEpO1xuICAgIGRlZi52YWxpZGF0ZVNjaGVtYSA9IHRoaXMuY29tcGlsZShtZXRhU2NoZW1hLCB0cnVlKTtcbn1cbmNvbnN0ICRkYXRhUmVmID0ge1xuICAgICRyZWY6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqdi12YWxpZGF0b3IvYWp2L21hc3Rlci9saWIvcmVmcy9kYXRhLmpzb24jXCIsXG59O1xuZnVuY3Rpb24gc2NoZW1hT3JEYXRhKHNjaGVtYSkge1xuICAgIHJldHVybiB7IGFueU9mOiBbc2NoZW1hLCAkZGF0YVJlZl0gfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vYWp2LXZhbGlkYXRvci9hanYvaXNzdWVzLzg4OVxuY29uc3QgZXF1YWwgPSByZXF1aXJlKFwiZmFzdC1kZWVwLWVxdWFsXCIpO1xuZXF1YWwuY29kZSA9ICdyZXF1aXJlKFwiYWp2L2Rpc3QvcnVudGltZS9lcXVhbFwiKS5kZWZhdWx0JztcbmV4cG9ydHMuZGVmYXVsdCA9IGVxdWFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXF1YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZ1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL3B1bnljb2RlLmpzIC0gcHVueWNvZGUudWNzMi5kZWNvZGVcbmZ1bmN0aW9uIHVjczJsZW5ndGgoc3RyKSB7XG4gICAgY29uc3QgbGVuID0gc3RyLmxlbmd0aDtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgcG9zID0gMDtcbiAgICBsZXQgdmFsdWU7XG4gICAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgICAgICBsZW5ndGgrKztcbiAgICAgICAgdmFsdWUgPSBzdHIuY2hhckNvZGVBdChwb3MrKyk7XG4gICAgICAgIGlmICh2YWx1ZSA+PSAweGQ4MDAgJiYgdmFsdWUgPD0gMHhkYmZmICYmIHBvcyA8IGxlbikge1xuICAgICAgICAgICAgLy8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG4gICAgICAgICAgICB2YWx1ZSA9IHN0ci5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICBpZiAoKHZhbHVlICYgMHhmYzAwKSA9PT0gMHhkYzAwKVxuICAgICAgICAgICAgICAgIHBvcysrOyAvLyBsb3cgc3Vycm9nYXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHVjczJsZW5ndGg7XG51Y3MybGVuZ3RoLmNvZGUgPSAncmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvdWNzMmxlbmd0aFwiKS5kZWZhdWx0Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVjczJsZW5ndGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1cmkgPSByZXF1aXJlKFwidXJpLWpzXCIpO1xudXJpLmNvZGUgPSAncmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvdXJpXCIpLmRlZmF1bHQnO1xuZXhwb3J0cy5kZWZhdWx0ID0gdXJpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXJpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgVmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVycm9ycykge1xuICAgICAgICBzdXBlcihcInZhbGlkYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgdGhpcy5hanYgPSB0aGlzLnZhbGlkYXRpb24gPSB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZhbGlkYXRpb25FcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRpb25fZXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIG1vcmUgdGhhbiAke2xlbn0gaXRlbXNgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtsZW59fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiYWRkaXRpb25hbEl0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcImJvb2xlYW5cIiwgXCJvYmplY3RcIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCAnXCJhZGRpdGlvbmFsSXRlbXNcIiBpcyBpZ25vcmVkIHdoZW4gXCJpdGVtc1wiIGlzIG5vdCBhbiBhcnJheSBvZiBzY2hlbWFzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMoY3h0LCBpdGVtcyk7XG4gICAgfSxcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyhjeHQsIGl0ZW1zKSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7IGxlbjogaXRlbXMubGVuZ3RoIH0pO1xuICAgICAgICBjeHQucGFzcygoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPD0gJHtpdGVtcy5sZW5ndGh9YCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIiAmJiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4udmFyKFwidmFsaWRcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59IDw9ICR7aXRlbXMubGVuZ3RofWApOyAvLyBUT0RPIHZhclxuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gdmFsaWRhdGVJdGVtcyh2YWxpZCkpO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zKHZhbGlkKSB7XG4gICAgICAgIGdlbi5mb3JSYW5nZShcImlcIiwgaXRlbXMubGVuZ3RoLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHsga2V5d29yZCwgZGF0YVByb3A6IGksIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGlmICghaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMgPSB2YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcztcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZGl0aW9uYWxJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgTk9UIGhhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2FkZGl0aW9uYWxQcm9wZXJ0eTogJHtwYXJhbXMuYWRkaXRpb25hbFByb3BlcnR5fX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogW1wib2JqZWN0XCJdLFxuICAgIHNjaGVtYVR5cGU6IFtcImJvb2xlYW5cIiwgXCJvYmplY3RcIl0sXG4gICAgYWxsb3dVbmRlZmluZWQ6IHRydWUsXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBkYXRhLCBlcnJzQ291bnQsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIWVycnNDb3VudClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgY29uc3QgeyBhbGxFcnJvcnMsIG9wdHMgfSA9IGl0O1xuICAgICAgICBpdC5wcm9wcyA9IHRydWU7XG4gICAgICAgIGlmIChvcHRzLnJlbW92ZUFkZGl0aW9uYWwgIT09IFwiYWxsXCIgJiYgKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHByb3BzID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShwYXJlbnRTY2hlbWEucHJvcGVydGllcyk7XG4gICAgICAgIGNvbnN0IHBhdFByb3BzID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShwYXJlbnRTY2hlbWEucGF0dGVyblByb3BlcnRpZXMpO1xuICAgICAgICBjaGVja0FkZGl0aW9uYWxQcm9wZXJ0aWVzKCk7XG4gICAgICAgIGN4dC5vaygoMCwgY29kZWdlbl8xLl8pIGAke2VycnNDb3VudH0gPT09ICR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc31gKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBZGRpdGlvbmFsUHJvcGVydGllcygpIHtcbiAgICAgICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wcy5sZW5ndGggJiYgIXBhdFByb3BzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnR5Q29kZShrZXkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKGlzQWRkaXRpb25hbChrZXkpLCAoKSA9PiBhZGRpdGlvbmFsUHJvcGVydHlDb2RlKGtleSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNBZGRpdGlvbmFsKGtleSkge1xuICAgICAgICAgICAgbGV0IGRlZmluZWRQcm9wO1xuICAgICAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA+IDgpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIG1heWJlIGFuIG9wdGlvbiBpbnN0ZWFkIG9mIGhhcmQtY29kZWQgOD9cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wc1NjaGVtYSA9ICgwLCB1dGlsXzEuc2NoZW1hUmVmT3JWYWwpKGl0LCBwYXJlbnRTY2hlbWEucHJvcGVydGllcywgXCJwcm9wZXJ0aWVzXCIpO1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gKDAsIGNvZGVfMS5pc093blByb3BlcnR5KShnZW4sIHByb3BzU2NoZW1hLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSAoMCwgY29kZWdlbl8xLm9yKSguLi5wcm9wcy5tYXAoKHApID0+ICgwLCBjb2RlZ2VuXzEuXykgYCR7a2V5fSA9PT0gJHtwfWApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9ICgwLCBjb2RlZ2VuXzEub3IpKGRlZmluZWRQcm9wLCAuLi5wYXRQcm9wcy5tYXAoKHApID0+ICgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIGNvZGVfMS51c2VQYXR0ZXJuKShjeHQsIHApfS50ZXN0KCR7a2V5fSlgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5ub3QpKGRlZmluZWRQcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZWxldGVBZGRpdGlvbmFsKGtleSkge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgZGVsZXRlICR7ZGF0YX1bJHtrZXl9XWApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFkZGl0aW9uYWxQcm9wZXJ0eUNvZGUoa2V5KSB7XG4gICAgICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImFsbFwiIHx8IChvcHRzLnJlbW92ZUFkZGl0aW9uYWwgJiYgc2NoZW1hID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVBZGRpdGlvbmFsKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgYWRkaXRpb25hbFByb3BlcnR5OiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5icmVhaygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnJlbW92ZUFkZGl0aW9uYWwgPT09IFwiZmFpbGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5QWRkaXRpb25hbFNjaGVtYShrZXksIHZhbGlkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjeHQucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUFkZGl0aW9uYWwoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUFkZGl0aW9uYWxTY2hlbWEoa2V5LCB2YWxpZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IGdlbi5icmVhaygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXBwbHlBZGRpdGlvbmFsU2NoZW1hKGtleSwgdmFsaWQsIGVycm9ycykge1xuICAgICAgICAgICAgY29uc3Qgc3Vic2NoZW1hID0ge1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIixcbiAgICAgICAgICAgICAgICBkYXRhUHJvcDoga2V5LFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuU3RyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChlcnJvcnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdWJzY2hlbWEsIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWxsRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoc3Vic2NoZW1hLCB2YWxpZCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZGl0aW9uYWxQcm9wZXJ0aWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFsbE9mXCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBzY2hlbWEuZm9yRWFjaCgoc2NoLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQ6IFwiYWxsT2ZcIiwgc2NoZW1hUHJvcDogaSB9LCB2YWxpZCk7XG4gICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWxsT2YuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFueU9mXCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGNvZGU6IGNvZGVfMS52YWxpZGF0ZVVuaW9uLFxuICAgIGVycm9yOiB7IG1lc3NhZ2U6IFwibXVzdCBtYXRjaCBhIHNjaGVtYSBpbiBhbnlPZlwiIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW55T2YuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBtaW4sIG1heCB9IH0pID0+IG1heCA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgJHttaW59IHZhbGlkIGl0ZW0ocylgXG4gICAgICAgIDogKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgJHttaW59IGFuZCBubyBtb3JlIHRoYW4gJHttYXh9IHZhbGlkIGl0ZW0ocylgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IG1pbiwgbWF4IH0gfSkgPT4gbWF4ID09PSB1bmRlZmluZWQgPyAoMCwgY29kZWdlbl8xLl8pIGB7bWluQ29udGFpbnM6ICR7bWlufX1gIDogKDAsIGNvZGVnZW5fMS5fKSBge21pbkNvbnRhaW5zOiAke21pbn0sIG1heENvbnRhaW5zOiAke21heH19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJjb250YWluc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgY29uc3QgeyBtaW5Db250YWlucywgbWF4Q29udGFpbnMgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaWYgKGl0Lm9wdHMubmV4dCkge1xuICAgICAgICAgICAgbWluID0gbWluQ29udGFpbnMgPT09IHVuZGVmaW5lZCA/IDEgOiBtaW5Db250YWlucztcbiAgICAgICAgICAgIG1heCA9IG1heENvbnRhaW5zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWluID0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7IG1pbiwgbWF4IH0pO1xuICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQgJiYgbWluID09PSAwKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIm1pbkNvbnRhaW5zXCIgPT0gMCB3aXRob3V0IFwibWF4Q29udGFpbnNcIjogXCJjb250YWluc1wiIGtleXdvcmQgaWdub3JlZGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZCAmJiBtaW4gPiBtYXgpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYFwibWluQ29udGFpbnNcIiA+IFwibWF4Q29udGFpbnNcIiBpcyBhbHdheXMgaW52YWxpZGApO1xuICAgICAgICAgICAgY3h0LmZhaWwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgICAgIGxldCBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59ID49ICR7bWlufWA7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y29uZH0gJiYgJHtsZW59IDw9ICR7bWF4fWA7XG4gICAgICAgICAgICBjeHQucGFzcyhjb25kKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkICYmIG1pbiA9PT0gMSkge1xuICAgICAgICAgICAgdmFsaWRhdGVJdGVtcyh2YWxpZCwgKCkgPT4gZ2VuLmlmKHZhbGlkLCAoKSA9PiBnZW4uYnJlYWsoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgZ2VuLmxldCh2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoID4gMGAsIHZhbGlkYXRlSXRlbXNXaXRoQ291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuLmxldCh2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFsaWRhdGVJdGVtc1dpdGhDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGN4dC5yZXN1bHQodmFsaWQsICgpID0+IGN4dC5yZXNldCgpKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtc1dpdGhDb3VudCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGdlbi5sZXQoXCJjb3VudFwiLCAwKTtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXMoc2NoVmFsaWQsICgpID0+IGdlbi5pZihzY2hWYWxpZCwgKCkgPT4gY2hlY2tMaW1pdHMoY291bnQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyhfdmFsaWQsIGJsb2NrKSB7XG4gICAgICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIDAsIGxlbiwgKGkpID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJjb250YWluc1wiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcDogaSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5OdW0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSwgX3ZhbGlkKTtcbiAgICAgICAgICAgICAgICBibG9jaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMaW1pdHMoY291bnQpIHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9KytgKTtcbiAgICAgICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2NvdW50fSA+PSAke21pbn1gLCAoKSA9PiBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKS5icmVhaygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2NvdW50fSA+ICR7bWF4fWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5icmVhaygpKTtcbiAgICAgICAgICAgICAgICBpZiAobWluID09PSAxKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2NvdW50fSA+PSAke21pbn1gLCAoKSA9PiBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRhaW5zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZVNjaGVtYURlcHMgPSBleHBvcnRzLnZhbGlkYXRlUHJvcGVydHlEZXBzID0gZXhwb3J0cy5lcnJvciA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5leHBvcnRzLmVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBwcm9wZXJ0eSwgZGVwc0NvdW50LCBkZXBzIH0gfSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eV9pZXMgPSBkZXBzQ291bnQgPT09IDEgPyBcInByb3BlcnR5XCIgOiBcInByb3BlcnRpZXNcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBoYXZlICR7cHJvcGVydHlfaWVzfSAke2RlcHN9IHdoZW4gcHJvcGVydHkgJHtwcm9wZXJ0eX0gaXMgcHJlc2VudGA7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBwcm9wZXJ0eSwgZGVwc0NvdW50LCBkZXBzLCBtaXNzaW5nUHJvcGVydHkgfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cHJvcGVydHk6ICR7cHJvcGVydHl9LFxuICAgIG1pc3NpbmdQcm9wZXJ0eTogJHttaXNzaW5nUHJvcGVydHl9LFxuICAgIGRlcHNDb3VudDogJHtkZXBzQ291bnR9LFxuICAgIGRlcHM6ICR7ZGVwc319YCwgLy8gVE9ETyBjaGFuZ2UgdG8gcmVmZXJlbmNlXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZGVwZW5kZW5jaWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGVycm9yOiBleHBvcnRzLmVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IFtwcm9wRGVwcywgc2NoRGVwc10gPSBzcGxpdERlcGVuZGVuY2llcyhjeHQpO1xuICAgICAgICB2YWxpZGF0ZVByb3BlcnR5RGVwcyhjeHQsIHByb3BEZXBzKTtcbiAgICAgICAgdmFsaWRhdGVTY2hlbWFEZXBzKGN4dCwgc2NoRGVwcyk7XG4gICAgfSxcbn07XG5mdW5jdGlvbiBzcGxpdERlcGVuZGVuY2llcyh7IHNjaGVtYSB9KSB7XG4gICAgY29uc3QgcHJvcGVydHlEZXBzID0ge307XG4gICAgY29uc3Qgc2NoZW1hRGVwcyA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcIl9fcHJvdG9fX1wiKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGRlcHMgPSBBcnJheS5pc0FycmF5KHNjaGVtYVtrZXldKSA/IHByb3BlcnR5RGVwcyA6IHNjaGVtYURlcHM7XG4gICAgICAgIGRlcHNba2V5XSA9IHNjaGVtYVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gW3Byb3BlcnR5RGVwcywgc2NoZW1hRGVwc107XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnR5RGVwcyhjeHQsIHByb3BlcnR5RGVwcyA9IGN4dC5zY2hlbWEpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBpZiAoT2JqZWN0LmtleXMocHJvcGVydHlEZXBzKS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBtaXNzaW5nID0gZ2VuLmxldChcIm1pc3NpbmdcIik7XG4gICAgZm9yIChjb25zdCBwcm9wIGluIHByb3BlcnR5RGVwcykge1xuICAgICAgICBjb25zdCBkZXBzID0gcHJvcGVydHlEZXBzW3Byb3BdO1xuICAgICAgICBpZiAoZGVwcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgaGFzUHJvcGVydHkgPSAoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcyk7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoe1xuICAgICAgICAgICAgcHJvcGVydHk6IHByb3AsXG4gICAgICAgICAgICBkZXBzQ291bnQ6IGRlcHMubGVuZ3RoLFxuICAgICAgICAgICAgZGVwczogZGVwcy5qb2luKFwiLCBcIiksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgICAgICBnZW4uaWYoaGFzUHJvcGVydHksICgpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlcFByb3Agb2YgZGVwcykge1xuICAgICAgICAgICAgICAgICAgICAoMCwgY29kZV8xLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3ApKGN4dCwgZGVwUHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtoYXNQcm9wZXJ0eX0gJiYgKCR7KDAsIGNvZGVfMS5jaGVja01pc3NpbmdQcm9wKShjeHQsIGRlcHMsIG1pc3NpbmcpfSlgKTtcbiAgICAgICAgICAgICgwLCBjb2RlXzEucmVwb3J0TWlzc2luZ1Byb3ApKGN4dCwgbWlzc2luZyk7XG4gICAgICAgICAgICBnZW4uZWxzZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVByb3BlcnR5RGVwcyA9IHZhbGlkYXRlUHJvcGVydHlEZXBzO1xuZnVuY3Rpb24gdmFsaWRhdGVTY2hlbWFEZXBzKGN4dCwgc2NoZW1hRGVwcyA9IGN4dC5zY2hlbWEpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgZm9yIChjb25zdCBwcm9wIGluIHNjaGVtYURlcHMpIHtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWFEZXBzW3Byb3BdKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZCwgc2NoZW1hUHJvcDogcHJvcCB9LCB2YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VWYWxpZEV2YWx1YXRlZChzY2hDeHQsIHZhbGlkKTtcbiAgICAgICAgfSwgKCkgPT4gZ2VuLnZhcih2YWxpZCwgdHJ1ZSkgLy8gVE9ETyB2YXJcbiAgICAgICAgKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlU2NoZW1hRGVwcyA9IHZhbGlkYXRlU2NoZW1hRGVwcztcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlcGVuZGVuY2llcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBcIiR7cGFyYW1zLmlmQ2xhdXNlfVwiIHNjaGVtYWAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2ZhaWxpbmdLZXl3b3JkOiAke3BhcmFtcy5pZkNsYXVzZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpZlwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKHBhcmVudFNjaGVtYS50aGVuID09PSB1bmRlZmluZWQgJiYgcGFyZW50U2NoZW1hLmVsc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCAnXCJpZlwiIHdpdGhvdXQgXCJ0aGVuXCIgYW5kIFwiZWxzZVwiIGlzIGlnbm9yZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNUaGVuID0gaGFzU2NoZW1hKGl0LCBcInRoZW5cIik7XG4gICAgICAgIGNvbnN0IGhhc0Vsc2UgPSBoYXNTY2hlbWEoaXQsIFwiZWxzZVwiKTtcbiAgICAgICAgaWYgKCFoYXNUaGVuICYmICFoYXNFbHNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCB0cnVlKTtcbiAgICAgICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICAgICAgdmFsaWRhdGVJZigpO1xuICAgICAgICBjeHQucmVzZXQoKTtcbiAgICAgICAgaWYgKGhhc1RoZW4gJiYgaGFzRWxzZSkge1xuICAgICAgICAgICAgY29uc3QgaWZDbGF1c2UgPSBnZW4ubGV0KFwiaWZDbGF1c2VcIik7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgaWZDbGF1c2UgfSk7XG4gICAgICAgICAgICBnZW4uaWYoc2NoVmFsaWQsIHZhbGlkYXRlQ2xhdXNlKFwidGhlblwiLCBpZkNsYXVzZSksIHZhbGlkYXRlQ2xhdXNlKFwiZWxzZVwiLCBpZkNsYXVzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1RoZW4pIHtcbiAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgdmFsaWRhdGVDbGF1c2UoXCJ0aGVuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkoc2NoVmFsaWQpLCB2YWxpZGF0ZUNsYXVzZShcImVsc2VcIikpO1xuICAgICAgICB9XG4gICAgICAgIGN4dC5wYXNzKHZhbGlkLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUlmKCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJpZlwiLFxuICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY3JlYXRlRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbGxFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgfSwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVDbGF1c2Uoa2V5d29yZCwgaWZDbGF1c2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQgfSwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHNjaFZhbGlkKTtcbiAgICAgICAgICAgICAgICBjeHQubWVyZ2VWYWxpZEV2YWx1YXRlZChzY2hDeHQsIHZhbGlkKTtcbiAgICAgICAgICAgICAgICBpZiAoaWZDbGF1c2UpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oaWZDbGF1c2UsICgwLCBjb2RlZ2VuXzEuXykgYCR7a2V5d29yZH1gKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpZkNsYXVzZToga2V5d29yZCB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmZ1bmN0aW9uIGhhc1NjaGVtYShpdCwga2V5d29yZCkge1xuICAgIGNvbnN0IHNjaGVtYSA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICByZXR1cm4gc2NoZW1hICE9PSB1bmRlZmluZWQgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhZGRpdGlvbmFsSXRlbXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxJdGVtc1wiKTtcbmNvbnN0IHByZWZpeEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9wcmVmaXhJdGVtc1wiKTtcbmNvbnN0IGl0ZW1zXzEgPSByZXF1aXJlKFwiLi9pdGVtc1wiKTtcbmNvbnN0IGl0ZW1zMjAyMF8xID0gcmVxdWlyZShcIi4vaXRlbXMyMDIwXCIpO1xuY29uc3QgY29udGFpbnNfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5zXCIpO1xuY29uc3QgZGVwZW5kZW5jaWVzXzEgPSByZXF1aXJlKFwiLi9kZXBlbmRlbmNpZXNcIik7XG5jb25zdCBwcm9wZXJ0eU5hbWVzXzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eU5hbWVzXCIpO1xuY29uc3QgYWRkaXRpb25hbFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpO1xuY29uc3QgcHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vcHJvcGVydGllc1wiKTtcbmNvbnN0IHBhdHRlcm5Qcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9wYXR0ZXJuUHJvcGVydGllc1wiKTtcbmNvbnN0IG5vdF8xID0gcmVxdWlyZShcIi4vbm90XCIpO1xuY29uc3QgYW55T2ZfMSA9IHJlcXVpcmUoXCIuL2FueU9mXCIpO1xuY29uc3Qgb25lT2ZfMSA9IHJlcXVpcmUoXCIuL29uZU9mXCIpO1xuY29uc3QgYWxsT2ZfMSA9IHJlcXVpcmUoXCIuL2FsbE9mXCIpO1xuY29uc3QgaWZfMSA9IHJlcXVpcmUoXCIuL2lmXCIpO1xuY29uc3QgdGhlbkVsc2VfMSA9IHJlcXVpcmUoXCIuL3RoZW5FbHNlXCIpO1xuZnVuY3Rpb24gZ2V0QXBwbGljYXRvcihkcmFmdDIwMjAgPSBmYWxzZSkge1xuICAgIGNvbnN0IGFwcGxpY2F0b3IgPSBbXG4gICAgICAgIC8vIGFueVxuICAgICAgICBub3RfMS5kZWZhdWx0LFxuICAgICAgICBhbnlPZl8xLmRlZmF1bHQsXG4gICAgICAgIG9uZU9mXzEuZGVmYXVsdCxcbiAgICAgICAgYWxsT2ZfMS5kZWZhdWx0LFxuICAgICAgICBpZl8xLmRlZmF1bHQsXG4gICAgICAgIHRoZW5FbHNlXzEuZGVmYXVsdCxcbiAgICAgICAgLy8gb2JqZWN0XG4gICAgICAgIHByb3BlcnR5TmFtZXNfMS5kZWZhdWx0LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgICAgIGRlcGVuZGVuY2llc18xLmRlZmF1bHQsXG4gICAgICAgIHByb3BlcnRpZXNfMS5kZWZhdWx0LFxuICAgICAgICBwYXR0ZXJuUHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgXTtcbiAgICAvLyBhcnJheVxuICAgIGlmIChkcmFmdDIwMjApXG4gICAgICAgIGFwcGxpY2F0b3IucHVzaChwcmVmaXhJdGVtc18xLmRlZmF1bHQsIGl0ZW1zMjAyMF8xLmRlZmF1bHQpO1xuICAgIGVsc2VcbiAgICAgICAgYXBwbGljYXRvci5wdXNoKGFkZGl0aW9uYWxJdGVtc18xLmRlZmF1bHQsIGl0ZW1zXzEuZGVmYXVsdCk7XG4gICAgYXBwbGljYXRvci5wdXNoKGNvbnRhaW5zXzEuZGVmYXVsdCk7XG4gICAgcmV0dXJuIGFwcGxpY2F0b3I7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRBcHBsaWNhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlVHVwbGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYXJyYXlcIiwgXCJib29sZWFuXCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlVHVwbGUoY3h0LCBcImFkZGl0aW9uYWxJdGVtc1wiLCBzY2hlbWEpO1xuICAgICAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY3h0Lm9rKCgwLCBjb2RlXzEudmFsaWRhdGVBcnJheSkoY3h0KSk7XG4gICAgfSxcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZVR1cGxlKGN4dCwgZXh0cmFJdGVtcywgc2NoQXJyID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY2hlY2tTdHJpY3RUdXBsZShwYXJlbnRTY2hlbWEpO1xuICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIHNjaEFyci5sZW5ndGggJiYgaXQuaXRlbXMgIT09IHRydWUpIHtcbiAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hBcnIubGVuZ3RoLCBpdC5pdGVtcyk7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICBzY2hBcnIuZm9yRWFjaCgoc2NoLCBpKSA9PiB7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA+ICR7aX1gLCAoKSA9PiBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICBzY2hlbWFQcm9wOiBpLFxuICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgIH0sIHZhbGlkKSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2hlY2tTdHJpY3RUdXBsZShzY2gpIHtcbiAgICAgICAgY29uc3QgeyBvcHRzLCBlcnJTY2hlbWFQYXRoIH0gPSBpdDtcbiAgICAgICAgY29uc3QgbCA9IHNjaEFyci5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZ1bGxUdXBsZSA9IGwgPT09IHNjaC5taW5JdGVtcyAmJiAobCA9PT0gc2NoLm1heEl0ZW1zIHx8IHNjaFtleHRyYUl0ZW1zXSA9PT0gZmFsc2UpO1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RUdXBsZXMgJiYgIWZ1bGxUdXBsZSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gYFwiJHtrZXl3b3JkfVwiIGlzICR7bH0tdHVwbGUsIGJ1dCBtaW5JdGVtcyBvciBtYXhJdGVtcy8ke2V4dHJhSXRlbXN9IGFyZSBub3Qgc3BlY2lmaWVkIG9yIGRpZmZlcmVudCBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYDtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgbXNnLCBvcHRzLnN0cmljdFR1cGxlcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlVHVwbGUgPSB2YWxpZGF0ZVR1cGxlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgYWRkaXRpb25hbEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsSXRlbXNcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIG1vcmUgdGhhbiAke2xlbn0gaXRlbXNgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtsZW59fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IHByZWZpeEl0ZW1zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAocHJlZml4SXRlbXMpXG4gICAgICAgICAgICAoMCwgYWRkaXRpb25hbEl0ZW1zXzEudmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMpKGN4dCwgcHJlZml4SXRlbXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjeHQub2soKDAsIGNvZGVfMS52YWxpZGF0ZUFycmF5KShjeHQpKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZW1zMjAyMC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJub3RcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgY3h0LmZhaWwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZDogXCJub3RcIixcbiAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgYWxsRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICBjeHQuZmFpbFJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcigpKTtcbiAgICB9LFxuICAgIGVycm9yOiB7IG1lc3NhZ2U6IFwibXVzdCBOT1QgYmUgdmFsaWRcIiB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IG1hdGNoIGV4YWN0bHkgb25lIHNjaGVtYSBpbiBvbmVPZlwiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwYXNzaW5nU2NoZW1hczogJHtwYXJhbXMucGFzc2luZ319YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJvbmVPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgaWYgKGl0Lm9wdHMuZGlzY3JpbWluYXRvciAmJiBwYXJlbnRTY2hlbWEuZGlzY3JpbWluYXRvcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2NoQXJyID0gc2NoZW1hO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHBhc3NpbmcgPSBnZW4ubGV0KFwicGFzc2luZ1wiLCBudWxsKTtcbiAgICAgICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7IHBhc3NpbmcgfSk7XG4gICAgICAgIC8vIFRPRE8gcG9zc2libHkgZmFpbCBzdHJhaWdodCBhd2F5ICh3aXRoIHdhcm5pbmcgb3IgZXhjZXB0aW9uKSBpZiB0aGVyZSBhcmUgdHdvIGVtcHR5IGFsd2F5cyB2YWxpZCBzY2hlbWFzXG4gICAgICAgIGdlbi5ibG9jayh2YWxpZGF0ZU9uZU9mKTtcbiAgICAgICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlT25lT2YoKSB7XG4gICAgICAgICAgICBzY2hBcnIuZm9yRWFjaCgoc2NoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNjaEN4dDtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLnZhcihzY2hWYWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwib25lT2ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5pZigoMCwgY29kZWdlbl8xLl8pIGAke3NjaFZhbGlkfSAmJiAke3ZhbGlkfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXNzaWduKHZhbGlkLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hc3NpZ24ocGFzc2luZywgKDAsIGNvZGVnZW5fMS5fKSBgWyR7cGFzc2luZ30sICR7aX1dYClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbHNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihwYXNzaW5nLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaEN4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vbmVPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCB1dGlsXzIgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicGF0dGVyblByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMgfSA9IGl0O1xuICAgICAgICBjb25zdCBwYXR0ZXJucyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykoc2NoZW1hKTtcbiAgICAgICAgY29uc3QgYWx3YXlzVmFsaWRQYXR0ZXJucyA9IHBhdHRlcm5zLmZpbHRlcigocCkgPT4gKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYVtwXSkpO1xuICAgICAgICBpZiAocGF0dGVybnMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAoYWx3YXlzVmFsaWRQYXR0ZXJucy5sZW5ndGggPT09IHBhdHRlcm5zLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICghaXQub3B0cy51bmV2YWx1YXRlZCB8fCBpdC5wcm9wcyA9PT0gdHJ1ZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tQcm9wZXJ0aWVzID0gb3B0cy5zdHJpY3RTY2hlbWEgJiYgIW9wdHMuYWxsb3dNYXRjaGluZ1Byb3BlcnRpZXMgJiYgcGFyZW50U2NoZW1hLnByb3BlcnRpZXM7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgaWYgKGl0LnByb3BzICE9PSB0cnVlICYmICEoaXQucHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gKDAsIHV0aWxfMi5ldmFsdWF0ZWRQcm9wc1RvTmFtZSkoZ2VuLCBpdC5wcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gaXQ7XG4gICAgICAgIHZhbGlkYXRlUGF0dGVyblByb3BlcnRpZXMoKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVQYXR0ZXJuUHJvcGVydGllcygpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0IG9mIHBhdHRlcm5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrUHJvcGVydGllcylcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tNYXRjaGluZ1Byb3BlcnRpZXMocGF0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLnZhcih2YWxpZCwgdHJ1ZSk7IC8vIFRPRE8gdmFyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uaWYodmFsaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja01hdGNoaW5nUHJvcGVydGllcyhwYXQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBjaGVja1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChwYXQpLnRlc3QocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgcHJvcGVydHkgJHtwcm9wfSBtYXRjaGVzIHBhdHRlcm4gJHtwYXR9ICh1c2UgYWxsb3dNYXRjaGluZ1Byb3BlcnRpZXMpYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpIHtcbiAgICAgICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIGNvZGVfMS51c2VQYXR0ZXJuKShjeHQsIHBhdCl9LnRlc3QoJHtrZXl9KWAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWx3YXlzVmFsaWQgPSBhbHdheXNWYWxpZFBhdHRlcm5zLmluY2x1ZGVzKHBhdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWx3YXlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicGF0dGVyblByb3BlcnRpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFQcm9wOiBwYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMi5UeXBlLlN0cixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiBwcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3Byb3BzfVske2tleX1dYCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWFsd2F5c1ZhbGlkICYmICFpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbiBzaG9ydC1jaXJjdWl0IGlmIGB1bmV2YWx1YXRlZFByb3BlcnRpZXNgIGlzIG5vdCBzdXBwb3J0ZWQgKG9wdHMubmV4dCA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBpZiBhbGwgcHJvcGVydGllcyB3ZXJlIGV2YWx1YXRlZCAocHJvcHMgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0dGVyblByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpdGVtc18xID0gcmVxdWlyZShcIi4vaXRlbXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwcmVmaXhJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJhcnJheVwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBjb2RlOiAoY3h0KSA9PiAoMCwgaXRlbXNfMS52YWxpZGF0ZVR1cGxlKShjeHQsIFwiaXRlbXNcIiksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlZml4SXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdmFsaWRhdGVcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBhZGRpdGlvbmFsUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbFByb3BlcnRpZXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKGl0Lm9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJhbGxcIiAmJiBwYXJlbnRTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXNfMS5kZWZhdWx0LmNvZGUobmV3IHZhbGlkYXRlXzEuS2V5d29yZEN4dChpdCwgYWRkaXRpb25hbFByb3BlcnRpZXNfMS5kZWZhdWx0LCBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxQcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykoc2NoZW1hKTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGFsbFByb3BzKSB7XG4gICAgICAgICAgICBpdC5kZWZpbmVkUHJvcGVydGllcy5hZGQocHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0Lm9wdHMudW5ldmFsdWF0ZWQgJiYgYWxsUHJvcHMubGVuZ3RoICYmIGl0LnByb3BzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sICgwLCB1dGlsXzEudG9IYXNoKShhbGxQcm9wcyksIGl0LnByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYWxsUHJvcHMuZmlsdGVyKChwKSA9PiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYVtwXSkpO1xuICAgICAgICBpZiAocHJvcGVydGllcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlQcm9wZXJ0eVNjaGVtYShwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgIGFwcGx5UHJvcGVydHlTY2hlbWEocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5lbHNlKCkudmFyKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBnZW4uZW5kSWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN4dC5pdC5kZWZpbmVkUHJvcGVydGllcy5hZGQocHJvcCk7XG4gICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhc0RlZmF1bHQocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0Lm9wdHMudXNlRGVmYXVsdHMgJiYgIWl0LmNvbXBvc2l0ZVJ1bGUgJiYgc2NoZW1hW3Byb3BdLmRlZmF1bHQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseVByb3BlcnR5U2NoZW1hKHByb3ApIHtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicHJvcGVydGllc1wiLFxuICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IHByb3AsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IHByb3AsXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwicHJvcGVydHkgbmFtZSBtdXN0IGJlIHZhbGlkXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Byb3BlcnR5TmFtZTogJHtwYXJhbXMucHJvcGVydHlOYW1lfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByb3BlcnR5TmFtZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgcHJvcGVydHlOYW1lOiBrZXkgfSk7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcInByb3BlcnR5TmFtZXNcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBrZXksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVzOiBbXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnR5TmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcInRoZW5cIiwgXCJlbHNlXCJdLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgY29kZSh7IGtleXdvcmQsIHBhcmVudFNjaGVtYSwgaXQgfSkge1xuICAgICAgICBpZiAocGFyZW50U2NoZW1hLmlmID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIiR7a2V5d29yZH1cIiB3aXRob3V0IFwiaWZcIiBpcyBpZ25vcmVkYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVuRWxzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVVbmlvbiA9IGV4cG9ydHMudmFsaWRhdGVBcnJheSA9IGV4cG9ydHMudXNlUGF0dGVybiA9IGV4cG9ydHMuY2FsbFZhbGlkYXRlQ29kZSA9IGV4cG9ydHMuc2NoZW1hUHJvcGVydGllcyA9IGV4cG9ydHMuYWxsU2NoZW1hUHJvcGVydGllcyA9IGV4cG9ydHMubm9Qcm9wZXJ0eUluRGF0YSA9IGV4cG9ydHMucHJvcGVydHlJbkRhdGEgPSBleHBvcnRzLmlzT3duUHJvcGVydHkgPSBleHBvcnRzLmhhc1Byb3BGdW5jID0gZXhwb3J0cy5yZXBvcnRNaXNzaW5nUHJvcCA9IGV4cG9ydHMuY2hlY2tNaXNzaW5nUHJvcCA9IGV4cG9ydHMuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL25hbWVzXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvdXRpbFwiKTtcbmZ1bmN0aW9uIGNoZWNrUmVwb3J0TWlzc2luZ1Byb3AoY3h0LCBwcm9wKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgZ2VuLmlmKG5vUHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpLCAoKSA9PiB7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6ICgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcH1gIH0sIHRydWUpO1xuICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCA9IGNoZWNrUmVwb3J0TWlzc2luZ1Byb3A7XG5mdW5jdGlvbiBjaGVja01pc3NpbmdQcm9wKHsgZ2VuLCBkYXRhLCBpdDogeyBvcHRzIH0gfSwgcHJvcGVydGllcywgbWlzc2luZykge1xuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLm9yKSguLi5wcm9wZXJ0aWVzLm1hcCgocHJvcCkgPT4gKDAsIGNvZGVnZW5fMS5hbmQpKG5vUHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wLCBvcHRzLm93blByb3BlcnRpZXMpLCAoMCwgY29kZWdlbl8xLl8pIGAke21pc3Npbmd9ID0gJHtwcm9wfWApKSk7XG59XG5leHBvcnRzLmNoZWNrTWlzc2luZ1Byb3AgPSBjaGVja01pc3NpbmdQcm9wO1xuZnVuY3Rpb24gcmVwb3J0TWlzc2luZ1Byb3AoY3h0LCBtaXNzaW5nKSB7XG4gICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogbWlzc2luZyB9LCB0cnVlKTtcbiAgICBjeHQuZXJyb3IoKTtcbn1cbmV4cG9ydHMucmVwb3J0TWlzc2luZ1Byb3AgPSByZXBvcnRNaXNzaW5nUHJvcDtcbmZ1bmN0aW9uIGhhc1Byb3BGdW5jKGdlbikge1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImZ1bmNcIiwge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kXG4gICAgICAgIHJlZjogT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eWAsXG4gICAgfSk7XG59XG5leHBvcnRzLmhhc1Byb3BGdW5jID0gaGFzUHJvcEZ1bmM7XG5mdW5jdGlvbiBpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtoYXNQcm9wRnVuYyhnZW4pfS5jYWxsKCR7ZGF0YX0sICR7cHJvcGVydHl9KWA7XG59XG5leHBvcnRzLmlzT3duUHJvcGVydHkgPSBpc093blByb3BlcnR5O1xuZnVuY3Rpb24gcHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wZXJ0eSwgb3duUHJvcGVydGllcykge1xuICAgIGNvbnN0IGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwcm9wZXJ0eSl9ICE9PSB1bmRlZmluZWRgO1xuICAgIHJldHVybiBvd25Qcm9wZXJ0aWVzID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtjb25kfSAmJiAke2lzT3duUHJvcGVydHkoZ2VuLCBkYXRhLCBwcm9wZXJ0eSl9YCA6IGNvbmQ7XG59XG5leHBvcnRzLnByb3BlcnR5SW5EYXRhID0gcHJvcGVydHlJbkRhdGE7XG5mdW5jdGlvbiBub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcGVydHksIG93blByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcGVydHkpfSA9PT0gdW5kZWZpbmVkYDtcbiAgICByZXR1cm4gb3duUHJvcGVydGllcyA/ICgwLCBjb2RlZ2VuXzEub3IpKGNvbmQsICgwLCBjb2RlZ2VuXzEubm90KShpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpKSkgOiBjb25kO1xufVxuZXhwb3J0cy5ub1Byb3BlcnR5SW5EYXRhID0gbm9Qcm9wZXJ0eUluRGF0YTtcbmZ1bmN0aW9uIGFsbFNjaGVtYVByb3BlcnRpZXMoc2NoZW1hTWFwKSB7XG4gICAgcmV0dXJuIHNjaGVtYU1hcCA/IE9iamVjdC5rZXlzKHNjaGVtYU1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBcIl9fcHJvdG9fX1wiKSA6IFtdO1xufVxuZXhwb3J0cy5hbGxTY2hlbWFQcm9wZXJ0aWVzID0gYWxsU2NoZW1hUHJvcGVydGllcztcbmZ1bmN0aW9uIHNjaGVtYVByb3BlcnRpZXMoaXQsIHNjaGVtYU1hcCkge1xuICAgIHJldHVybiBhbGxTY2hlbWFQcm9wZXJ0aWVzKHNjaGVtYU1hcCkuZmlsdGVyKChwKSA9PiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYU1hcFtwXSkpO1xufVxuZXhwb3J0cy5zY2hlbWFQcm9wZXJ0aWVzID0gc2NoZW1hUHJvcGVydGllcztcbmZ1bmN0aW9uIGNhbGxWYWxpZGF0ZUNvZGUoeyBzY2hlbWFDb2RlLCBkYXRhLCBpdDogeyBnZW4sIHRvcFNjaGVtYVJlZiwgc2NoZW1hUGF0aCwgZXJyb3JQYXRoIH0sIGl0IH0sIGZ1bmMsIGNvbnRleHQsIHBhc3NTY2hlbWEpIHtcbiAgICBjb25zdCBkYXRhQW5kU2NoZW1hID0gcGFzc1NjaGVtYSA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hQ29kZX0sICR7ZGF0YX0sICR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH1gIDogZGF0YTtcbiAgICBjb25zdCB2YWxDeHQgPSBbXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLnN0ckNvbmNhdCkobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgZXJyb3JQYXRoKV0sXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSwgaXQucGFyZW50RGF0YV0sXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCBpdC5wYXJlbnREYXRhUHJvcGVydHldLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhLCBuYW1lc18xLmRlZmF1bHQucm9vdERhdGFdLFxuICAgIF07XG4gICAgaWYgKGl0Lm9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgdmFsQ3h0LnB1c2goW25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9ycywgbmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzXSk7XG4gICAgY29uc3QgYXJncyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YUFuZFNjaGVtYX0sICR7Z2VuLm9iamVjdCguLi52YWxDeHQpfWA7XG4gICAgcmV0dXJuIGNvbnRleHQgIT09IGNvZGVnZW5fMS5uaWwgPyAoMCwgY29kZWdlbl8xLl8pIGAke2Z1bmN9LmNhbGwoJHtjb250ZXh0fSwgJHthcmdzfSlgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtmdW5jfSgke2FyZ3N9KWA7XG59XG5leHBvcnRzLmNhbGxWYWxpZGF0ZUNvZGUgPSBjYWxsVmFsaWRhdGVDb2RlO1xuY29uc3QgbmV3UmVnRXhwID0gKDAsIGNvZGVnZW5fMS5fKSBgbmV3IFJlZ0V4cGA7XG5mdW5jdGlvbiB1c2VQYXR0ZXJuKHsgZ2VuLCBpdDogeyBvcHRzIH0gfSwgcGF0dGVybikge1xuICAgIGNvbnN0IHUgPSBvcHRzLnVuaWNvZGVSZWdFeHAgPyBcInVcIiA6IFwiXCI7XG4gICAgY29uc3QgeyByZWdFeHAgfSA9IG9wdHMuY29kZTtcbiAgICBjb25zdCByeCA9IHJlZ0V4cChwYXR0ZXJuLCB1KTtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJwYXR0ZXJuXCIsIHtcbiAgICAgICAga2V5OiByeC50b1N0cmluZygpLFxuICAgICAgICByZWY6IHJ4LFxuICAgICAgICBjb2RlOiAoMCwgY29kZWdlbl8xLl8pIGAke3JlZ0V4cC5jb2RlID09PSBcIm5ldyBSZWdFeHBcIiA/IG5ld1JlZ0V4cCA6ICgwLCB1dGlsXzIudXNlRnVuYykoZ2VuLCByZWdFeHApfSgke3BhdHRlcm59LCAke3V9KWAsXG4gICAgfSk7XG59XG5leHBvcnRzLnVzZVBhdHRlcm4gPSB1c2VQYXR0ZXJuO1xuZnVuY3Rpb24gdmFsaWRhdGVBcnJheShjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICBjb25zdCB2YWxpZEFyciA9IGdlbi5sZXQoXCJ2YWxpZFwiLCB0cnVlKTtcbiAgICAgICAgdmFsaWRhdGVJdGVtcygoKSA9PiBnZW4uYXNzaWduKHZhbGlkQXJyLCBmYWxzZSkpO1xuICAgICAgICByZXR1cm4gdmFsaWRBcnI7XG4gICAgfVxuICAgIGdlbi52YXIodmFsaWQsIHRydWUpO1xuICAgIHZhbGlkYXRlSXRlbXMoKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgIHJldHVybiB2YWxpZDtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zKG5vdFZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIDAsIGxlbiwgKGkpID0+IHtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5OdW0sXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgbm90VmFsaWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlQXJyYXkgPSB2YWxpZGF0ZUFycmF5O1xuZnVuY3Rpb24gdmFsaWRhdGVVbmlvbihjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgY29uc3QgYWx3YXlzVmFsaWQgPSBzY2hlbWEuc29tZSgoc2NoKSA9PiAoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSk7XG4gICAgaWYgKGFsd2F5c1ZhbGlkICYmICFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHNjaGVtYS5mb3JFYWNoKChfc2NoLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWR9IHx8ICR7c2NoVmFsaWR9YCk7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgc2NoVmFsaWQpO1xuICAgICAgICAvLyBjYW4gc2hvcnQtY2lyY3VpdCBpZiBgdW5ldmFsdWF0ZWRQcm9wZXJ0aWVzL0l0ZW1zYCBub3Qgc3VwcG9ydGVkIChvcHRzLnVuZXZhbHVhdGVkICE9PSB0cnVlKVxuICAgICAgICAvLyBvciBpZiBhbGwgcHJvcGVydGllcyBhbmQgaXRlbXMgd2VyZSBldmFsdWF0ZWQgKGl0LnByb3BzID09PSB0cnVlICYmIGl0Lml0ZW1zID09PSB0cnVlKVxuICAgICAgICBpZiAoIW1lcmdlZClcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpKTtcbiAgICB9KSk7XG4gICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG59XG5leHBvcnRzLnZhbGlkYXRlVW5pb24gPSB2YWxpZGF0ZVVuaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImlkXCIsXG4gICAgY29kZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgU1VQUE9SVEVEOiBrZXl3b3JkIFwiaWRcIiwgdXNlIFwiJGlkXCIgZm9yIHNjaGVtYSBJRCcpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpZF8xID0gcmVxdWlyZShcIi4vaWRcIik7XG5jb25zdCByZWZfMSA9IHJlcXVpcmUoXCIuL3JlZlwiKTtcbmNvbnN0IGNvcmUgPSBbXG4gICAgXCIkc2NoZW1hXCIsXG4gICAgXCIkaWRcIixcbiAgICBcIiRkZWZzXCIsXG4gICAgXCIkdm9jYWJ1bGFyeVwiLFxuICAgIHsga2V5d29yZDogXCIkY29tbWVudFwiIH0sXG4gICAgXCJkZWZpbml0aW9uc1wiLFxuICAgIGlkXzEuZGVmYXVsdCxcbiAgICByZWZfMS5kZWZhdWx0LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvcmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2FsbFJlZiA9IGV4cG9ydHMuZ2V0VmFsaWRhdGUgPSB2b2lkIDA7XG5jb25zdCByZWZfZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3JlZl9lcnJvclwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIiRyZWZcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWE6ICRyZWYsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgYmFzZUlkLCBzY2hlbWFFbnY6IGVudiwgdmFsaWRhdGVOYW1lLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICAgICAgY29uc3QgeyByb290IH0gPSBlbnY7XG4gICAgICAgIGlmICgoJHJlZiA9PT0gXCIjXCIgfHwgJHJlZiA9PT0gXCIjL1wiKSAmJiBiYXNlSWQgPT09IHJvb3QuYmFzZUlkKVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxSb290UmVmKCk7XG4gICAgICAgIGNvbnN0IHNjaE9yRW52ID0gY29tcGlsZV8xLnJlc29sdmVSZWYuY2FsbChzZWxmLCByb290LCBiYXNlSWQsICRyZWYpO1xuICAgICAgICBpZiAoc2NoT3JFbnYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyByZWZfZXJyb3JfMS5kZWZhdWx0KGl0Lm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgJHJlZik7XG4gICAgICAgIGlmIChzY2hPckVudiBpbnN0YW5jZW9mIGNvbXBpbGVfMS5TY2hlbWFFbnYpXG4gICAgICAgICAgICByZXR1cm4gY2FsbFZhbGlkYXRlKHNjaE9yRW52KTtcbiAgICAgICAgcmV0dXJuIGlubGluZVJlZlNjaGVtYShzY2hPckVudik7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxSb290UmVmKCkge1xuICAgICAgICAgICAgaWYgKGVudiA9PT0gcm9vdClcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbFJlZihjeHQsIHZhbGlkYXRlTmFtZSwgZW52LCBlbnYuJGFzeW5jKTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3ROYW1lID0gZ2VuLnNjb3BlVmFsdWUoXCJyb290XCIsIHsgcmVmOiByb290IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxSZWYoY3h0LCAoMCwgY29kZWdlbl8xLl8pIGAke3Jvb3ROYW1lfS52YWxpZGF0ZWAsIHJvb3QsIHJvb3QuJGFzeW5jKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYWxsVmFsaWRhdGUoc2NoKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gZ2V0VmFsaWRhdGUoY3h0LCBzY2gpO1xuICAgICAgICAgICAgY2FsbFJlZihjeHQsIHYsIHNjaCwgc2NoLiRhc3luYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW5saW5lUmVmU2NoZW1hKHNjaCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoTmFtZSA9IGdlbi5zY29wZVZhbHVlKFwic2NoZW1hXCIsIG9wdHMuY29kZS5zb3VyY2UgPT09IHRydWUgPyB7IHJlZjogc2NoLCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkoc2NoKSB9IDogeyByZWY6IHNjaCB9KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlczogW10sXG4gICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgICAgICAgICB0b3BTY2hlbWFSZWY6IHNjaE5hbWUsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogJHJlZixcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZnVuY3Rpb24gZ2V0VmFsaWRhdGUoY3h0LCBzY2gpIHtcbiAgICBjb25zdCB7IGdlbiB9ID0gY3h0O1xuICAgIHJldHVybiBzY2gudmFsaWRhdGVcbiAgICAgICAgPyBnZW4uc2NvcGVWYWx1ZShcInZhbGlkYXRlXCIsIHsgcmVmOiBzY2gudmFsaWRhdGUgfSlcbiAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2dlbi5zY29wZVZhbHVlKFwid3JhcHBlclwiLCB7IHJlZjogc2NoIH0pfS52YWxpZGF0ZWA7XG59XG5leHBvcnRzLmdldFZhbGlkYXRlID0gZ2V0VmFsaWRhdGU7XG5mdW5jdGlvbiBjYWxsUmVmKGN4dCwgdiwgc2NoLCAkYXN5bmMpIHtcbiAgICBjb25zdCB7IGdlbiwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IGFsbEVycm9ycywgc2NoZW1hRW52OiBlbnYsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IHBhc3NDeHQgPSBvcHRzLnBhc3NDb250ZXh0ID8gbmFtZXNfMS5kZWZhdWx0LnRoaXMgOiBjb2RlZ2VuXzEubmlsO1xuICAgIGlmICgkYXN5bmMpXG4gICAgICAgIGNhbGxBc3luY1JlZigpO1xuICAgIGVsc2VcbiAgICAgICAgY2FsbFN5bmNSZWYoKTtcbiAgICBmdW5jdGlvbiBjYWxsQXN5bmNSZWYoKSB7XG4gICAgICAgIGlmICghZW52LiRhc3luYylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIHNjaGVtYSByZWZlcmVuY2VkIGJ5IHN5bmMgc2NoZW1hXCIpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgZ2VuLnRyeSgoKSA9PiB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCAkeygwLCBjb2RlXzEuY2FsbFZhbGlkYXRlQ29kZSkoY3h0LCB2LCBwYXNzQ3h0KX1gKTtcbiAgICAgICAgICAgIGFkZEV2YWx1YXRlZEZyb20odik7IC8vIFRPRE8gd2lsbCBub3Qgd29yayB3aXRoIGFzeW5jLCBpdCBoYXMgdG8gYmUgcmV0dXJuZWQgd2l0aCB0aGUgcmVzdWx0XG4gICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAhKCR7ZX0gaW5zdGFuY2VvZiAke2l0LlZhbGlkYXRpb25FcnJvcn0pYCwgKCkgPT4gZ2VuLnRocm93KGUpKTtcbiAgICAgICAgICAgIGFkZEVycm9yc0Zyb20oZSk7XG4gICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxsU3luY1JlZigpIHtcbiAgICAgICAgY3h0LnJlc3VsdCgoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdiwgcGFzc0N4dCksICgpID0+IGFkZEV2YWx1YXRlZEZyb20odiksICgpID0+IGFkZEVycm9yc0Zyb20odikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRFcnJvcnNGcm9tKHNvdXJjZSkge1xuICAgICAgICBjb25zdCBlcnJzID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtzb3VyY2V9LmVycm9yc2A7XG4gICAgICAgIGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9ID09PSBudWxsID8gJHtlcnJzfSA6ICR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9LmNvbmNhdCgke2VycnN9KWApOyAvLyBUT0RPIHRhZ2dlZFxuICAgICAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9Lmxlbmd0aGApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRFdmFsdWF0ZWRGcm9tKHNvdXJjZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghaXQub3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2NoRXZhbHVhdGVkID0gKF9hID0gc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLnZhbGlkYXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZhbHVhdGVkO1xuICAgICAgICAvLyBUT0RPIHJlZmFjdG9yXG4gICAgICAgIGlmIChpdC5wcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZCAmJiAhc2NoRXZhbHVhdGVkLmR5bmFtaWNQcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQucHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sIHNjaEV2YWx1YXRlZC5wcm9wcywgaXQucHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gZ2VuLnZhcihcInByb3BzXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5ldmFsdWF0ZWQucHJvcHNgKTtcbiAgICAgICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sIHByb3BzLCBpdC5wcm9wcywgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpdC5pdGVtcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZCAmJiAhc2NoRXZhbHVhdGVkLmR5bmFtaWNJdGVtcykge1xuICAgICAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIHNjaEV2YWx1YXRlZC5pdGVtcywgaXQuaXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ2VuLnZhcihcIml0ZW1zXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5ldmFsdWF0ZWQuaXRlbXNgKTtcbiAgICAgICAgICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIGl0ZW1zLCBpdC5pdGVtcywgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5jYWxsUmVmID0gY2FsbFJlZjtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL2Rpc2NyaW1pbmF0b3IvdHlwZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgZGlzY3JFcnJvciwgdGFnTmFtZSB9IH0pID0+IGRpc2NyRXJyb3IgPT09IHR5cGVzXzEuRGlzY3JFcnJvci5UYWdcbiAgICAgICAgPyBgdGFnIFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgc3RyaW5nYFxuICAgICAgICA6IGB2YWx1ZSBvZiB0YWcgXCIke3RhZ05hbWV9XCIgbXVzdCBiZSBpbiBvbmVPZmAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgZGlzY3JFcnJvciwgdGFnLCB0YWdOYW1lIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2Vycm9yOiAke2Rpc2NyRXJyb3J9LCB0YWc6ICR7dGFnTmFtZX0sIHRhZ1ZhbHVlOiAke3RhZ319YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkaXNjcmltaW5hdG9yXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvbmVPZiB9ID0gcGFyZW50U2NoZW1hO1xuICAgICAgICBpZiAoIWl0Lm9wdHMuZGlzY3JpbWluYXRvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgZGlzY3JpbWluYXRvciBvcHRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHNjaGVtYS5wcm9wZXJ0eU5hbWU7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnTmFtZSAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgcHJvcGVydHlOYW1lXCIpO1xuICAgICAgICBpZiAoc2NoZW1hLm1hcHBpbmcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiBtYXBwaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIGlmICghb25lT2YpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiByZXF1aXJlcyBvbmVPZiBrZXl3b3JkXCIpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHRhZyA9IGdlbi5jb25zdChcInRhZ1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KSh0YWdOYW1lKX1gKTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke3RhZ30gPT0gXCJzdHJpbmdcImAsICgpID0+IHZhbGlkYXRlTWFwcGluZygpLCAoKSA9PiBjeHQuZXJyb3IoZmFsc2UsIHsgZGlzY3JFcnJvcjogdHlwZXNfMS5EaXNjckVycm9yLlRhZywgdGFnLCB0YWdOYW1lIH0pKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVNYXBwaW5nKCkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGdldE1hcHBpbmcoKTtcbiAgICAgICAgICAgIGdlbi5pZihmYWxzZSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhZ1ZhbHVlIGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICBnZW4uZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dGFnfSA9PT0gJHt0YWdWYWx1ZX1gKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBhcHBseVRhZ1NjaGVtYShtYXBwaW5nW3RhZ1ZhbHVlXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIGN4dC5lcnJvcihmYWxzZSwgeyBkaXNjckVycm9yOiB0eXBlc18xLkRpc2NyRXJyb3IuTWFwcGluZywgdGFnLCB0YWdOYW1lIH0pO1xuICAgICAgICAgICAgZ2VuLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXBwbHlUYWdTY2hlbWEoc2NoZW1hUHJvcCkge1xuICAgICAgICAgICAgY29uc3QgX3ZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcIm9uZU9mXCIsIHNjaGVtYVByb3AgfSwgX3ZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWFwcGluZygpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IG9uZU9mTWFwcGluZyA9IHt9O1xuICAgICAgICAgICAgY29uc3QgdG9wUmVxdWlyZWQgPSBoYXNSZXF1aXJlZChwYXJlbnRTY2hlbWEpO1xuICAgICAgICAgICAgbGV0IHRhZ1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lT2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NoID0gb25lT2ZbaV07XG4gICAgICAgICAgICAgICAgaWYgKChzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2guJHJlZikgJiYgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaCwgaXQuc2VsZi5SVUxFUykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoID0gY29tcGlsZV8xLnJlc29sdmVSZWYuY2FsbChpdC5zZWxmLCBpdC5zY2hlbWFFbnYucm9vdCwgaXQuYmFzZUlkLCBzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2guJHJlZik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2ggaW5zdGFuY2VvZiBjb21waWxlXzEuU2NoZW1hRW52KVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoID0gc2NoLnNjaGVtYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFNjaCA9IChfYSA9IHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC5wcm9wZXJ0aWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGFnTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wU2NoICE9IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBvbmVPZiBzdWJzY2hlbWFzIChvciByZWZlcmVuY2VkIHNjaGVtYXMpIG11c3QgaGF2ZSBcInByb3BlcnRpZXMvJHt0YWdOYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhZ1JlcXVpcmVkID0gdGFnUmVxdWlyZWQgJiYgKHRvcFJlcXVpcmVkIHx8IGhhc1JlcXVpcmVkKHNjaCkpO1xuICAgICAgICAgICAgICAgIGFkZE1hcHBpbmdzKHByb3BTY2gsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0YWdSZXF1aXJlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgcmVxdWlyZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBvbmVPZk1hcHBpbmc7XG4gICAgICAgICAgICBmdW5jdGlvbiBoYXNSZXF1aXJlZCh7IHJlcXVpcmVkIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXF1aXJlZCkgJiYgcmVxdWlyZWQuaW5jbHVkZXModGFnTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRNYXBwaW5ncyhzY2gsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoLmNvbnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZE1hcHBpbmcoc2NoLmNvbnN0LCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoLmVudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWdWYWx1ZSBvZiBzY2guZW51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogXCJwcm9wZXJ0aWVzLyR7dGFnTmFtZX1cIiBtdXN0IGhhdmUgXCJjb25zdFwiIG9yIFwiZW51bVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFnVmFsdWUgIT0gXCJzdHJpbmdcIiB8fCB0YWdWYWx1ZSBpbiBvbmVPZk1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBcIiR7dGFnTmFtZX1cIiB2YWx1ZXMgbXVzdCBiZSB1bmlxdWUgc3RyaW5nc2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbmVPZk1hcHBpbmdbdGFnVmFsdWVdID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpc2NyRXJyb3IgPSB2b2lkIDA7XG52YXIgRGlzY3JFcnJvcjtcbihmdW5jdGlvbiAoRGlzY3JFcnJvcikge1xuICAgIERpc2NyRXJyb3JbXCJUYWdcIl0gPSBcInRhZ1wiO1xuICAgIERpc2NyRXJyb3JbXCJNYXBwaW5nXCJdID0gXCJtYXBwaW5nXCI7XG59KShEaXNjckVycm9yID0gZXhwb3J0cy5EaXNjckVycm9yIHx8IChleHBvcnRzLkRpc2NyRXJyb3IgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiLi9jb3JlXCIpO1xuY29uc3QgdmFsaWRhdGlvbl8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvblwiKTtcbmNvbnN0IGFwcGxpY2F0b3JfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0b3JcIik7XG5jb25zdCBmb3JtYXRfMSA9IHJlcXVpcmUoXCIuL2Zvcm1hdFwiKTtcbmNvbnN0IG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbmNvbnN0IGRyYWZ0N1ZvY2FidWxhcmllcyA9IFtcbiAgICBjb3JlXzEuZGVmYXVsdCxcbiAgICB2YWxpZGF0aW9uXzEuZGVmYXVsdCxcbiAgICAoMCwgYXBwbGljYXRvcl8xLmRlZmF1bHQpKCksXG4gICAgZm9ybWF0XzEuZGVmYXVsdCxcbiAgICBtZXRhZGF0YV8xLm1ldGFkYXRhVm9jYWJ1bGFyeSxcbiAgICBtZXRhZGF0YV8xLmNvbnRlbnRWb2NhYnVsYXJ5LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRyYWZ0N1ZvY2FidWxhcmllcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYWZ0Ny5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBmb3JtYXQgXCIke3NjaGVtYUNvZGV9XCJgLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7Zm9ybWF0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZm9ybWF0XCIsXG4gICAgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQsIHJ1bGVUeXBlKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMsIGVyclNjaGVtYVBhdGgsIHNjaGVtYUVudiwgc2VsZiB9ID0gaXQ7XG4gICAgICAgIGlmICghb3B0cy52YWxpZGF0ZUZvcm1hdHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICgkZGF0YSlcbiAgICAgICAgICAgIHZhbGlkYXRlJERhdGFGb3JtYXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFsaWRhdGVGb3JtYXQoKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGUkRGF0YUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZtdHMgPSBnZW4uc2NvcGVWYWx1ZShcImZvcm1hdHNcIiwge1xuICAgICAgICAgICAgICAgIHJlZjogc2VsZi5mb3JtYXRzLFxuICAgICAgICAgICAgICAgIGNvZGU6IG9wdHMuY29kZS5mb3JtYXRzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBmRGVmID0gZ2VuLmNvbnN0KFwiZkRlZlwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdHN9WyR7c2NoZW1hQ29kZX1dYCk7XG4gICAgICAgICAgICBjb25zdCBmVHlwZSA9IGdlbi5sZXQoXCJmVHlwZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGdlbi5sZXQoXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAvLyBUT0RPIHNpbXBsaWZ5XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZkRlZn0gPT0gXCJvYmplY3RcIiAmJiAhKCR7ZkRlZn0gaW5zdGFuY2VvZiBSZWdFeHApYCwgKCkgPT4gZ2VuLmFzc2lnbihmVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmRGVmfS50eXBlIHx8IFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCAoMCwgY29kZWdlbl8xLl8pIGAke2ZEZWZ9LnZhbGlkYXRlYCksICgpID0+IGdlbi5hc3NpZ24oZlR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCBmRGVmKSk7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEub3IpKHVua25vd25GbXQoKSwgaW52YWxpZEZtdCgpKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm10KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlZ2VuXzEubmlsO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ICYmICEke2Zvcm1hdH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaW52YWxpZEZtdCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsRm9ybWF0ID0gc2NoZW1hRW52LiRhc3luY1xuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCgke2ZEZWZ9LmFzeW5jID8gYXdhaXQgJHtmb3JtYXR9KCR7ZGF0YX0pIDogJHtmb3JtYXR9KCR7ZGF0YX0pKWBcbiAgICAgICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0oJHtkYXRhfSlgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCh0eXBlb2YgJHtmb3JtYXR9ID09IFwiZnVuY3Rpb25cIiA/ICR7Y2FsbEZvcm1hdH0gOiAke2Zvcm1hdH0udGVzdCgke2RhdGF9KSlgO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0gJiYgJHtmb3JtYXR9ICE9PSB0cnVlICYmICR7ZlR5cGV9ID09PSAke3J1bGVUeXBlfSAmJiAhJHt2YWxpZERhdGF9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdERlZiA9IHNlbGYuZm9ybWF0c1tzY2hlbWFdO1xuICAgICAgICAgICAgaWYgKCFmb3JtYXREZWYpIHtcbiAgICAgICAgICAgICAgICB1bmtub3duRm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcm1hdERlZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBbZm10VHlwZSwgZm9ybWF0LCBmbXRSZWZdID0gZ2V0Rm9ybWF0KGZvcm1hdERlZik7XG4gICAgICAgICAgICBpZiAoZm10VHlwZSA9PT0gcnVsZVR5cGUpXG4gICAgICAgICAgICAgICAgY3h0LnBhc3ModmFsaWRDb25kaXRpb24oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm9ybWF0KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2Fybih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVua25vd25Nc2coKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgdW5rbm93biBmb3JtYXQgXCIke3NjaGVtYX1cIiBpZ25vcmVkIGluIHNjaGVtYSBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGb3JtYXQoZm10RGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGZtdERlZiBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEucmVnZXhwQ29kZSkoZm10RGVmKVxuICAgICAgICAgICAgICAgICAgICA6IG9wdHMuY29kZS5mb3JtYXRzXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7b3B0cy5jb2RlLmZvcm1hdHN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShzY2hlbWEpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZtdCA9IGdlbi5zY29wZVZhbHVlKFwiZm9ybWF0c1wiLCB7IGtleTogc2NoZW1hLCByZWY6IGZtdERlZiwgY29kZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZtdERlZiA9PSBcIm9iamVjdFwiICYmICEoZm10RGVmIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2ZtdERlZi50eXBlIHx8IFwic3RyaW5nXCIsIGZtdERlZi52YWxpZGF0ZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXR9LnZhbGlkYXRlYF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdHJpbmdcIiwgZm10RGVmLCBmbXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdmFsaWRDb25kaXRpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXREZWYgPT0gXCJvYmplY3RcIiAmJiAhKGZvcm1hdERlZiBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgZm9ybWF0RGVmLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIGZvcm1hdCBpbiBzeW5jIHNjaGVtYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0ICR7Zm10UmVmfSgke2RhdGF9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZm9ybWF0ID09IFwiZnVuY3Rpb25cIiA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10UmVmfSgke2RhdGF9KWAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdFJlZn0udGVzdCgke2RhdGF9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvcm1hdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZvcm1hdF8xID0gcmVxdWlyZShcIi4vZm9ybWF0XCIpO1xuY29uc3QgZm9ybWF0ID0gW2Zvcm1hdF8xLmRlZmF1bHRdO1xuZXhwb3J0cy5kZWZhdWx0ID0gZm9ybWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gZXhwb3J0cy5tZXRhZGF0YVZvY2FidWxhcnkgPSB2b2lkIDA7XG5leHBvcnRzLm1ldGFkYXRhVm9jYWJ1bGFyeSA9IFtcbiAgICBcInRpdGxlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVwcmVjYXRlZFwiLFxuICAgIFwicmVhZE9ubHlcIixcbiAgICBcIndyaXRlT25seVwiLFxuICAgIFwiZXhhbXBsZXNcIixcbl07XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gW1xuICAgIFwiY29udGVudE1lZGlhVHlwZVwiLFxuICAgIFwiY29udGVudEVuY29kaW5nXCIsXG4gICAgXCJjb250ZW50U2NoZW1hXCIsXG5dO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBlcXVhbCB0byBjb25zdGFudFwiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29uc3RcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYUNvZGUsIHNjaGVtYSB9ID0gY3h0O1xuICAgICAgICBpZiAoJGRhdGEgfHwgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIpKSB7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCEkeygwLCB1dGlsXzEudXNlRnVuYykoZ2VuLCBlcXVhbF8xLmRlZmF1bHQpfSgke2RhdGF9LCAke3NjaGVtYUNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3h0LmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWF9ICE9PSAke2RhdGF9YCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcXVhbF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvZXF1YWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlczogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImVudW1cIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgc2NoZW1hLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVudW0gbXVzdCBoYXZlIG5vbi1lbXB0eSBhcnJheVwiKTtcbiAgICAgICAgY29uc3QgdXNlTG9vcCA9IHNjaGVtYS5sZW5ndGggPj0gaXQub3B0cy5sb29wRW51bTtcbiAgICAgICAgbGV0IGVxbDtcbiAgICAgICAgY29uc3QgZ2V0RXFsID0gKCkgPT4gKGVxbCAhPT0gbnVsbCAmJiBlcWwgIT09IHZvaWQgMCA/IGVxbCA6IChlcWwgPSAoMCwgdXRpbF8xLnVzZUZ1bmMpKGdlbiwgZXF1YWxfMS5kZWZhdWx0KSkpO1xuICAgICAgICBsZXQgdmFsaWQ7XG4gICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGN4dC5ibG9jayRkYXRhKHZhbGlkLCBsb29wRW51bSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgIGNvbnN0IHZTY2hlbWEgPSBnZW4uY29uc3QoXCJ2U2NoZW1hXCIsIHNjaGVtYUNvZGUpO1xuICAgICAgICAgICAgdmFsaWQgPSAoMCwgY29kZWdlbl8xLm9yKSguLi5zY2hlbWEubWFwKChfeCwgaSkgPT4gZXF1YWxDb2RlKHZTY2hlbWEsIGkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnBhc3ModmFsaWQpO1xuICAgICAgICBmdW5jdGlvbiBsb29wRW51bSgpIHtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgIGdlbi5mb3JPZihcInZcIiwgc2NoZW1hQ29kZSwgKHYpID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2dldEVxbCgpfSgke2RhdGF9LCAke3Z9KWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlcXVhbENvZGUodlNjaGVtYSwgaSkge1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzY2ggPT09IFwib2JqZWN0XCIgJiYgc2NoICE9PSBudWxsXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGAke2dldEVxbCgpfSgke2RhdGF9LCAke3ZTY2hlbWF9WyR7aX1dKWBcbiAgICAgICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09ICR7c2NofWA7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVudW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsaW1pdE51bWJlcl8xID0gcmVxdWlyZShcIi4vbGltaXROdW1iZXJcIik7XG5jb25zdCBtdWx0aXBsZU9mXzEgPSByZXF1aXJlKFwiLi9tdWx0aXBsZU9mXCIpO1xuY29uc3QgbGltaXRMZW5ndGhfMSA9IHJlcXVpcmUoXCIuL2xpbWl0TGVuZ3RoXCIpO1xuY29uc3QgcGF0dGVybl8xID0gcmVxdWlyZShcIi4vcGF0dGVyblwiKTtcbmNvbnN0IGxpbWl0UHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vbGltaXRQcm9wZXJ0aWVzXCIpO1xuY29uc3QgcmVxdWlyZWRfMSA9IHJlcXVpcmUoXCIuL3JlcXVpcmVkXCIpO1xuY29uc3QgbGltaXRJdGVtc18xID0gcmVxdWlyZShcIi4vbGltaXRJdGVtc1wiKTtcbmNvbnN0IHVuaXF1ZUl0ZW1zXzEgPSByZXF1aXJlKFwiLi91bmlxdWVJdGVtc1wiKTtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi9jb25zdFwiKTtcbmNvbnN0IGVudW1fMSA9IHJlcXVpcmUoXCIuL2VudW1cIik7XG5jb25zdCB2YWxpZGF0aW9uID0gW1xuICAgIC8vIG51bWJlclxuICAgIGxpbWl0TnVtYmVyXzEuZGVmYXVsdCxcbiAgICBtdWx0aXBsZU9mXzEuZGVmYXVsdCxcbiAgICAvLyBzdHJpbmdcbiAgICBsaW1pdExlbmd0aF8xLmRlZmF1bHQsXG4gICAgcGF0dGVybl8xLmRlZmF1bHQsXG4gICAgLy8gb2JqZWN0XG4gICAgbGltaXRQcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICByZXF1aXJlZF8xLmRlZmF1bHQsXG4gICAgLy8gYXJyYXlcbiAgICBsaW1pdEl0ZW1zXzEuZGVmYXVsdCxcbiAgICB1bmlxdWVJdGVtc18xLmRlZmF1bHQsXG4gICAgLy8gYW55XG4gICAgeyBrZXl3b3JkOiBcInR5cGVcIiwgc2NoZW1hVHlwZTogW1wic3RyaW5nXCIsIFwiYXJyYXlcIl0gfSxcbiAgICB7IGtleXdvcmQ6IFwibnVsbGFibGVcIiwgc2NoZW1hVHlwZTogXCJib29sZWFuXCIgfSxcbiAgICBjb25zdF8xLmRlZmF1bHQsXG4gICAgZW51bV8xLmRlZmF1bHQsXG5dO1xuZXhwb3J0cy5kZWZhdWx0ID0gdmFsaWRhdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2UoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pIHtcbiAgICAgICAgY29uc3QgY29tcCA9IGtleXdvcmQgPT09IFwibWF4SXRlbXNcIiA/IFwibW9yZVwiIDogXCJmZXdlclwiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlICR7Y29tcH0gdGhhbiAke3NjaGVtYUNvZGV9IGl0ZW1zYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4SXRlbXNcIiwgXCJtaW5JdGVtc1wiXSxcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUgfSA9IGN4dDtcbiAgICAgICAgY29uc3Qgb3AgPSBrZXl3b3JkID09PSBcIm1heEl0ZW1zXCIgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkdUIDogY29kZWdlbl8xLm9wZXJhdG9ycy5MVDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aCAke29wfSAke3NjaGVtYUNvZGV9YCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdEl0ZW1zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCB1Y3MybGVuZ3RoXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS91Y3MybGVuZ3RoXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZSh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkge1xuICAgICAgICBjb25zdCBjb21wID0ga2V5d29yZCA9PT0gXCJtYXhMZW5ndGhcIiA/IFwibW9yZVwiIDogXCJmZXdlclwiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlICR7Y29tcH0gdGhhbiAke3NjaGVtYUNvZGV9IGNoYXJhY3RlcnNgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJtYXhMZW5ndGhcIiwgXCJtaW5MZW5ndGhcIl0sXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3Qgb3AgPSBrZXl3b3JkID09PSBcIm1heExlbmd0aFwiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGNvbnN0IGxlbiA9IGl0Lm9wdHMudW5pY29kZSA9PT0gZmFsc2UgPyAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGAgOiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCB1dGlsXzEudXNlRnVuYykoY3h0LmdlbiwgdWNzMmxlbmd0aF8xLmRlZmF1bHQpfSgke2RhdGF9KWA7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59ICR7b3B9ICR7c2NoZW1hQ29kZX1gKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0TGVuZ3RoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG9wcyA9IGNvZGVnZW5fMS5vcGVyYXRvcnM7XG5jb25zdCBLV0RzID0ge1xuICAgIG1heGltdW06IHsgb2tTdHI6IFwiPD1cIiwgb2s6IG9wcy5MVEUsIGZhaWw6IG9wcy5HVCB9LFxuICAgIG1pbmltdW06IHsgb2tTdHI6IFwiPj1cIiwgb2s6IG9wcy5HVEUsIGZhaWw6IG9wcy5MVCB9LFxuICAgIGV4Y2x1c2l2ZU1heGltdW06IHsgb2tTdHI6IFwiPFwiLCBvazogb3BzLkxULCBmYWlsOiBvcHMuR1RFIH0sXG4gICAgZXhjbHVzaXZlTWluaW11bTogeyBva1N0cjogXCI+XCIsIG9rOiBvcHMuR1QsIGZhaWw6IG9wcy5MVEUgfSxcbn07XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBiZSAke0tXRHNba2V5d29yZF0ub2tTdHJ9ICR7c2NoZW1hQ29kZX1gLFxuICAgIHBhcmFtczogKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7Y29tcGFyaXNvbjogJHtLV0RzW2tleXdvcmRdLm9rU3RyfSwgbGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogT2JqZWN0LmtleXMoS1dEcyksXG4gICAgdHlwZTogXCJudW1iZXJcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hQ29kZSB9ID0gY3h0O1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gJHtLV0RzW2tleXdvcmRdLmZhaWx9ICR7c2NoZW1hQ29kZX0gfHwgaXNOYU4oJHtkYXRhfSlgKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0TnVtYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2UoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pIHtcbiAgICAgICAgY29uc3QgY29tcCA9IGtleXdvcmQgPT09IFwibWF4UHJvcGVydGllc1wiID8gXCJtb3JlXCIgOiBcImZld2VyXCI7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgJHtjb21wfSB0aGFuICR7c2NoZW1hQ29kZX0gcHJvcGVydGllc2A7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heFByb3BlcnRpZXNcIiwgXCJtaW5Qcm9wZXJ0aWVzXCJdLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUgfSA9IGN4dDtcbiAgICAgICAgY29uc3Qgb3AgPSBrZXl3b3JkID09PSBcIm1heFByb3BlcnRpZXNcIiA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuR1QgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLkxUO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYE9iamVjdC5rZXlzKCR7ZGF0YX0pLmxlbmd0aCAke29wfSAke3NjaGVtYUNvZGV9YCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdFByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgYmUgbXVsdGlwbGUgb2YgJHtzY2hlbWFDb2RlfWAsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHttdWx0aXBsZU9mOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwibXVsdGlwbGVPZlwiLFxuICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgLy8gY29uc3QgYmR0ID0gYmFkJERhdGFUeXBlKHNjaGVtYUNvZGUsIDxzdHJpbmc+ZGVmLnNjaGVtYVR5cGUsICRkYXRhKVxuICAgICAgICBjb25zdCBwcmVjID0gaXQub3B0cy5tdWx0aXBsZU9mUHJlY2lzaW9uO1xuICAgICAgICBjb25zdCByZXMgPSBnZW4ubGV0KFwicmVzXCIpO1xuICAgICAgICBjb25zdCBpbnZhbGlkID0gcHJlY1xuICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGBNYXRoLmFicyhNYXRoLnJvdW5kKCR7cmVzfSkgLSAke3Jlc30pID4gMWUtJHtwcmVjfWBcbiAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtyZXN9ICE9PSBwYXJzZUludCgke3Jlc30pYDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAoJHtzY2hlbWFDb2RlfSA9PT0gMCB8fCAoJHtyZXN9ID0gJHtkYXRhfS8ke3NjaGVtYUNvZGV9LCAke2ludmFsaWR9KSlgKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW11bHRpcGxlT2YuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBwYXR0ZXJuIFwiJHtzY2hlbWFDb2RlfVwiYCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3BhdHRlcm46ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwYXR0ZXJuXCIsXG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSwgJGRhdGEsIHNjaGVtYSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgLy8gVE9ETyByZWdleHAgc2hvdWxkIGJlIHdyYXBwZWQgaW4gdHJ5L2NhdGNoc1xuICAgICAgICBjb25zdCB1ID0gaXQub3B0cy51bmljb2RlUmVnRXhwID8gXCJ1XCIgOiBcIlwiO1xuICAgICAgICBjb25zdCByZWdFeHAgPSAkZGF0YSA/ICgwLCBjb2RlZ2VuXzEuXykgYChuZXcgUmVnRXhwKCR7c2NoZW1hQ29kZX0sICR7dX0pKWAgOiAoMCwgY29kZV8xLnVzZVBhdHRlcm4pKGN4dCwgc2NoZW1hKTtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAhJHtyZWdFeHB9LnRlc3QoJHtkYXRhfSlgKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdHRlcm4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IG1pc3NpbmdQcm9wZXJ0eSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBoYXZlIHJlcXVpcmVkIHByb3BlcnR5ICcke21pc3NpbmdQcm9wZXJ0eX0nYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBtaXNzaW5nUHJvcGVydHkgfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bWlzc2luZ1Byb3BlcnR5OiAke21pc3NpbmdQcm9wZXJ0eX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJyZXF1aXJlZFwiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGRhdGEsICRkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMgfSA9IGl0O1xuICAgICAgICBpZiAoISRkYXRhICYmIHNjaGVtYS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHVzZUxvb3AgPSBzY2hlbWEubGVuZ3RoID49IG9wdHMubG9vcFJlcXVpcmVkO1xuICAgICAgICBpZiAoaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgYWxsRXJyb3JzTW9kZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBleGl0T25FcnJvck1vZGUoKTtcbiAgICAgICAgaWYgKG9wdHMuc3RyaWN0UmVxdWlyZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gY3h0LnBhcmVudFNjaGVtYS5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgY29uc3QgeyBkZWZpbmVkUHJvcGVydGllcyB9ID0gY3h0Lml0O1xuICAgICAgICAgICAgZm9yIChjb25zdCByZXF1aXJlZEtleSBvZiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wc1tyZXF1aXJlZEtleV0pID09PSB1bmRlZmluZWQgJiYgIWRlZmluZWRQcm9wZXJ0aWVzLmhhcyhyZXF1aXJlZEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hUGF0aCA9IGl0LnNjaGVtYUVudi5iYXNlSWQgKyBpdC5lcnJTY2hlbWFQYXRoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBgcmVxdWlyZWQgcHJvcGVydHkgXCIke3JlcXVpcmVkS2V5fVwiIGlzIG5vdCBkZWZpbmVkIGF0IFwiJHtzY2hlbWFQYXRofVwiIChzdHJpY3RSZXF1aXJlZClgO1xuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIG1zZywgaXQub3B0cy5zdHJpY3RSZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFsbEVycm9yc01vZGUoKSB7XG4gICAgICAgICAgICBpZiAodXNlTG9vcCB8fCAkZGF0YSkge1xuICAgICAgICAgICAgICAgIGN4dC5ibG9jayRkYXRhKGNvZGVnZW5fMS5uaWwsIGxvb3BBbGxSZXF1aXJlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2Ygc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBjb2RlXzEuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBwcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZXhpdE9uRXJyb3JNb2RlKCkge1xuICAgICAgICAgICAgY29uc3QgbWlzc2luZyA9IGdlbi5sZXQoXCJtaXNzaW5nXCIpO1xuICAgICAgICAgICAgaWYgKHVzZUxvb3AgfHwgJGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgKCkgPT4gbG9vcFVudGlsTWlzc2luZyhtaXNzaW5nLCB2YWxpZCkpO1xuICAgICAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVfMS5jaGVja01pc3NpbmdQcm9wKShjeHQsIHNjaGVtYSwgbWlzc2luZykpO1xuICAgICAgICAgICAgICAgICgwLCBjb2RlXzEucmVwb3J0TWlzc2luZ1Byb3ApKGN4dCwgbWlzc2luZyk7XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wQWxsUmVxdWlyZWQoKSB7XG4gICAgICAgICAgICBnZW4uZm9yT2YoXCJwcm9wXCIsIHNjaGVtYUNvZGUsIChwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogcHJvcCB9KTtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVfMS5ub1Byb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIG9wdHMub3duUHJvcGVydGllcyksICgpID0+IGN4dC5lcnJvcigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BVbnRpbE1pc3NpbmcobWlzc2luZywgdmFsaWQpIHtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6IG1pc3NpbmcgfSk7XG4gICAgICAgICAgICBnZW4uZm9yT2YobWlzc2luZywgc2NoZW1hQ29kZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgbWlzc2luZywgb3B0cy5vd25Qcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5icmVhaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgY29kZWdlbl8xLm5pbCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVpcmVkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3ZhbGlkYXRlL2RhdGFUeXBlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcXVhbF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvZXF1YWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgaSwgaiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSBkdXBsaWNhdGUgaXRlbXMgKGl0ZW1zICMjICR7an0gYW5kICR7aX0gYXJlIGlkZW50aWNhbClgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGksIGogfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7aTogJHtpfSwgajogJHtqfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYm9vbGVhblwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgIXNjaGVtYSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgICAgIGNvbnN0IGl0ZW1UeXBlcyA9IHBhcmVudFNjaGVtYS5pdGVtcyA/ICgwLCBkYXRhVHlwZV8xLmdldFNjaGVtYVR5cGVzKShwYXJlbnRTY2hlbWEuaXRlbXMpIDogW107XG4gICAgICAgIGN4dC5ibG9jayRkYXRhKHZhbGlkLCB2YWxpZGF0ZVVuaXF1ZUl0ZW1zLCAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ID09PSBmYWxzZWApO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZVVuaXF1ZUl0ZW1zKCkge1xuICAgICAgICAgICAgY29uc3QgaSA9IGdlbi5sZXQoXCJpXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgICAgICAgICBjb25zdCBqID0gZ2VuLmxldChcImpcIik7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgaSwgaiB9KTtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aX0gPiAxYCwgKCkgPT4gKGNhbk9wdGltaXplKCkgPyBsb29wTiA6IGxvb3BOMikoaSwgaikpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNhbk9wdGltaXplKCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1UeXBlcy5sZW5ndGggPiAwICYmICFpdGVtVHlwZXMuc29tZSgodCkgPT4gdCA9PT0gXCJvYmplY3RcIiB8fCB0ID09PSBcImFycmF5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BOKGksIGopIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBnZW4ubmFtZShcIml0ZW1cIik7XG4gICAgICAgICAgICBjb25zdCB3cm9uZ1R5cGUgPSAoMCwgZGF0YVR5cGVfMS5jaGVja0RhdGFUeXBlcykoaXRlbVR5cGVzLCBpdGVtLCBpdC5vcHRzLnN0cmljdE51bWJlcnMsIGRhdGFUeXBlXzEuRGF0YVR5cGUuV3JvbmcpO1xuICAgICAgICAgICAgY29uc3QgaW5kaWNlcyA9IGdlbi5jb25zdChcImluZGljZXNcIiwgKDAsIGNvZGVnZW5fMS5fKSBge31gKTtcbiAgICAgICAgICAgIGdlbi5mb3IoKDAsIGNvZGVnZW5fMS5fKSBgOyR7aX0tLTtgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuLmxldChpdGVtLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9WyR7aX1dYCk7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKHdyb25nVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgY29udGludWVgKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVR5cGVzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtpdGVtfSA9PSBcInN0cmluZ1wiYCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpdGVtfSArPSBcIl9cImApO1xuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7aW5kaWNlc31bJHtpdGVtfV0gPT0gXCJudW1iZXJcImAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihqLCAoMCwgY29kZWdlbl8xLl8pIGAke2luZGljZXN9WyR7aXRlbX1dYCk7XG4gICAgICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSkuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke2luZGljZXN9WyR7aXRlbX1dID0gJHtpfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcE4yKGksIGopIHtcbiAgICAgICAgICAgIGNvbnN0IGVxbCA9ICgwLCB1dGlsXzEudXNlRnVuYykoZ2VuLCBlcXVhbF8xLmRlZmF1bHQpO1xuICAgICAgICAgICAgY29uc3Qgb3V0ZXIgPSBnZW4ubmFtZShcIm91dGVyXCIpO1xuICAgICAgICAgICAgZ2VuLmxhYmVsKG91dGVyKS5mb3IoKDAsIGNvZGVnZW5fMS5fKSBgOyR7aX0tLTtgLCAoKSA9PiBnZW4uZm9yKCgwLCBjb2RlZ2VuXzEuXykgYCR7an0gPSAke2l9OyAke2p9LS07YCwgKCkgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXFsfSgke2RhdGF9WyR7aX1dLCAke2RhdGF9WyR7an1dKWAsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSkuYnJlYWsob3V0ZXIpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5pcXVlSXRlbXMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBkbyBub3QgZWRpdCAuanMgZmlsZXMgZGlyZWN0bHkgLSBlZGl0IHNyYy9pbmRleC5qc3RcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIGlmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgbGVuZ3RoLCBpLCBrZXlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxuICAgIGlmIChhLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHJldHVybiBhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5mbGFncyA9PT0gYi5mbGFncztcbiAgICBpZiAoYS52YWx1ZU9mICE9PSBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YpIHJldHVybiBhLnZhbHVlT2YoKSA9PT0gYi52YWx1ZU9mKCk7XG4gICAgaWYgKGEudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHJldHVybiBhLnRvU3RyaW5nKCkgPT09IGIudG9TdHJpbmcoKTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gdHJ1ZSBpZiBib3RoIE5hTiwgZmFsc2Ugb3RoZXJ3aXNlXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0cmF2ZXJzZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNjaGVtYSwgb3B0cywgY2IpIHtcbiAgLy8gTGVnYWN5IHN1cHBvcnQgZm9yIHYwLjMuMSBhbmQgZWFybGllci5cbiAgaWYgKHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdHM7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgY2IgPSBvcHRzLmNiIHx8IGNiO1xuICB2YXIgcHJlID0gKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nKSA/IGNiIDogY2IucHJlIHx8IGZ1bmN0aW9uKCkge307XG4gIHZhciBwb3N0ID0gY2IucG9zdCB8fCBmdW5jdGlvbigpIHt9O1xuXG4gIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaGVtYSwgJycsIHNjaGVtYSk7XG59O1xuXG5cbnRyYXZlcnNlLmtleXdvcmRzID0ge1xuICBhZGRpdGlvbmFsSXRlbXM6IHRydWUsXG4gIGl0ZW1zOiB0cnVlLFxuICBjb250YWluczogdHJ1ZSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHRydWUsXG4gIHByb3BlcnR5TmFtZXM6IHRydWUsXG4gIG5vdDogdHJ1ZSxcbiAgaWY6IHRydWUsXG4gIHRoZW46IHRydWUsXG4gIGVsc2U6IHRydWVcbn07XG5cbnRyYXZlcnNlLmFycmF5S2V5d29yZHMgPSB7XG4gIGl0ZW1zOiB0cnVlLFxuICBhbGxPZjogdHJ1ZSxcbiAgYW55T2Y6IHRydWUsXG4gIG9uZU9mOiB0cnVlXG59O1xuXG50cmF2ZXJzZS5wcm9wc0tleXdvcmRzID0ge1xuICAkZGVmczogdHJ1ZSxcbiAgZGVmaW5pdGlvbnM6IHRydWUsXG4gIHByb3BlcnRpZXM6IHRydWUsXG4gIHBhdHRlcm5Qcm9wZXJ0aWVzOiB0cnVlLFxuICBkZXBlbmRlbmNpZXM6IHRydWVcbn07XG5cbnRyYXZlcnNlLnNraXBLZXl3b3JkcyA9IHtcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgZW51bTogdHJ1ZSxcbiAgY29uc3Q6IHRydWUsXG4gIHJlcXVpcmVkOiB0cnVlLFxuICBtYXhpbXVtOiB0cnVlLFxuICBtaW5pbXVtOiB0cnVlLFxuICBleGNsdXNpdmVNYXhpbXVtOiB0cnVlLFxuICBleGNsdXNpdmVNaW5pbXVtOiB0cnVlLFxuICBtdWx0aXBsZU9mOiB0cnVlLFxuICBtYXhMZW5ndGg6IHRydWUsXG4gIG1pbkxlbmd0aDogdHJ1ZSxcbiAgcGF0dGVybjogdHJ1ZSxcbiAgZm9ybWF0OiB0cnVlLFxuICBtYXhJdGVtczogdHJ1ZSxcbiAgbWluSXRlbXM6IHRydWUsXG4gIHVuaXF1ZUl0ZW1zOiB0cnVlLFxuICBtYXhQcm9wZXJ0aWVzOiB0cnVlLFxuICBtaW5Qcm9wZXJ0aWVzOiB0cnVlXG59O1xuXG5cbmZ1bmN0aW9uIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaGVtYSwganNvblB0ciwgcm9vdFNjaGVtYSwgcGFyZW50SnNvblB0ciwgcGFyZW50S2V5d29yZCwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCkge1xuICBpZiAoc2NoZW1hICYmIHR5cGVvZiBzY2hlbWEgPT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgIHByZShzY2hlbWEsIGpzb25QdHIsIHJvb3RTY2hlbWEsIHBhcmVudEpzb25QdHIsIHBhcmVudEtleXdvcmQsIHBhcmVudFNjaGVtYSwga2V5SW5kZXgpO1xuICAgIGZvciAodmFyIGtleSBpbiBzY2hlbWEpIHtcbiAgICAgIHZhciBzY2ggPSBzY2hlbWFba2V5XTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaCkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0cmF2ZXJzZS5hcnJheUtleXdvcmRzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNjaC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaFtpXSwganNvblB0ciArICcvJyArIGtleSArICcvJyArIGksIHJvb3RTY2hlbWEsIGpzb25QdHIsIGtleSwgc2NoZW1hLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgaW4gdHJhdmVyc2UucHJvcHNLZXl3b3Jkcykge1xuICAgICAgICBpZiAoc2NoICYmIHR5cGVvZiBzY2ggPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNjaClcbiAgICAgICAgICAgIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaFtwcm9wXSwganNvblB0ciArICcvJyArIGtleSArICcvJyArIGVzY2FwZUpzb25QdHIocHJvcCksIHJvb3RTY2hlbWEsIGpzb25QdHIsIGtleSwgc2NoZW1hLCBwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgaW4gdHJhdmVyc2Uua2V5d29yZHMgfHwgKG9wdHMuYWxsS2V5cyAmJiAhKGtleSBpbiB0cmF2ZXJzZS5za2lwS2V5d29yZHMpKSkge1xuICAgICAgICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2gsIGpzb25QdHIgKyAnLycgKyBrZXksIHJvb3RTY2hlbWEsIGpzb25QdHIsIGtleSwgc2NoZW1hKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcG9zdChzY2hlbWEsIGpzb25QdHIsIHJvb3RTY2hlbWEsIHBhcmVudEpzb25QdHIsIHBhcmVudEtleXdvcmQsIHBhcmVudFNjaGVtYSwga2V5SW5kZXgpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZXNjYXBlSnNvblB0cihzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9+L2csICd+MCcpLnJlcGxhY2UoL1xcLy9nLCAnfjEnKTtcbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcblxudHlwZSBEZWJ1Z09wdGlvbnMgPSB7XG4gIG1hcmdpbjogbnVtYmVyLFxuICBwYWRkaW5nOiBudW1iZXIsXG4gIGZvbnQ6IHN0cmluZyxcbiAgbGluZUhlaWdodDogbnVtYmVyLFxuICBmb3JlZ3JvdW5kQ29sb3VyOiBDb2xvdXIsXG4gIGJhY2tncm91bmRDb2xvdXI6IENvbG91cixcbiAgZGVmYXVsdFZhbHVlOiBEZWJ1Z1ZhbHVlLFxuICBkZWZhdWx0TWFya2VyOiBEZWJ1Z01hcmtlclxufTtcblxudHlwZSBEZWJ1Z1ZhbHVlID0ge1xuICBsYWJlbD86IHN0cmluZyxcbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcsXG4gIGFsaWduOiAnbGVmdCcgfCAncmlnaHQnLFxuICBzaG93TGFiZWw6IGJvb2xlYW4sXG4gIHBhZGRpbmc/OiBudW1iZXIsXG4gIGZvbnQ/OiBzdHJpbmcsXG4gIGZvcmVncm91bmRDb2xvdXI/OiBDb2xvdXIsXG4gIGJhY2tncm91bmRDb2xvdXI/OiBDb2xvdXJcbn07XG5cbnR5cGUgRGVidWdNYXJrZXIgPSB7XG4gIGxhYmVsPzogc3RyaW5nLFxuICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyxcbiAgcG9zaXRpb24/OiB2ZWMsXG4gIHNob3dMYWJlbDogYm9vbGVhbixcbiAgc2hvd1ZhbHVlOiBib29sZWFuLFxuICBzaG93TWFya2VyOiBib29sZWFuLFxuICBtYXJrZXJTaXplOiBudW1iZXIsXG4gIG1hcmtlclN0eWxlOiAneCcgfCAnKycgfCAnLicsXG4gIG1hcmtlckNvbG91cjogQ29sb3VyLFxuICBzcGFjZTogJ3dvcmxkJyB8ICdzY3JlZW4nLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBmb250Pzogc3RyaW5nLFxuICBsYWJlbE9mZnNldDogdmVjLFxuICBmb3JlZ3JvdW5kQ29sb3VyPzogQ29sb3VyLFxuICBiYWNrZ3JvdW5kQ29sb3VyPzogQ29sb3VyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWJ1ZyB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBEZWJ1ZztcbiAgcHJpdmF0ZSB2YWx1ZXM6IE1hcDxzdHJpbmcsIERlYnVnVmFsdWU+O1xuICBwcml2YXRlIG1hcmtlcnM6IE1hcDxzdHJpbmcsIERlYnVnTWFya2VyPjtcbiAgcHJpdmF0ZSBvcHRpb25zOiBEZWJ1Z09wdGlvbnM7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdE9wdGlvbnM6IERlYnVnT3B0aW9ucyA9IHtcbiAgICBtYXJnaW46IDEwLFxuICAgIHBhZGRpbmc6IDQsXG4gICAgZm9udDogJzEwcHQgTHVjaWRhIENvbnNvbGUsIG1vbm9zcGFjZScsXG4gICAgbGluZUhlaWdodDogMTIsXG4gICAgZm9yZWdyb3VuZENvbG91cjogJyNmZmYnLFxuICAgIGJhY2tncm91bmRDb2xvdXI6ICcjMzMzOCcsXG4gICAgZGVmYXVsdFZhbHVlOiB7XG4gICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgc2hvd0xhYmVsOiB0cnVlLFxuICAgIH0sXG4gICAgZGVmYXVsdE1hcmtlcjoge1xuICAgICAgc2hvd0xhYmVsOiB0cnVlLFxuICAgICAgc2hvd1ZhbHVlOiB0cnVlLFxuICAgICAgc2hvd01hcmtlcjogdHJ1ZSxcbiAgICAgIG1hcmtlclNpemU6IDYsXG4gICAgICBtYXJrZXJTdHlsZTogJ3gnLFxuICAgICAgbWFya2VyQ29sb3VyOiAnI2NjYycsXG4gICAgICBzcGFjZTogJ3dvcmxkJyxcbiAgICAgIGxhYmVsT2Zmc2V0OiB2ZWMoMTApLFxuICAgIH0sXG4gIH07XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXJ0aWFsPERlYnVnT3B0aW9ucz4gPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHRoaXMudmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIERlYnVnVmFsdWU+KCk7XG4gICAgdGhpcy5tYXJrZXJzID0gbmV3IE1hcDxzdHJpbmcsIERlYnVnTWFya2VyPigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIGRlYnVnIHJlbmRlcmVyIGZvciBkaXNwbGF5aW5nIHZhbHVlcyBhbmQgbWFya2Vyc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXNlKG9wdGlvbnM6IFBhcnRpYWw8RGVidWdPcHRpb25zPiA9IHt9KTogdm9pZCB7XG4gICAgRGVidWcuaW5zdGFuY2UgPSBuZXcgRGVidWcob3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBEZWJ1ZyB7XG4gICAgaWYgKERlYnVnLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIERlYnVnLmluaXRpYWxpc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIERlYnVnLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgYSBkZWJ1ZyB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB2YWx1ZShsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBvcHRpb25zOiBQYXJ0aWFsPERlYnVnVmFsdWU+ID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCBkZWJ1ZyA9IERlYnVnLmdldEluc3RhbmNlKCk7XG4gICAgZGVidWcudmFsdWVzLnNldChsYWJlbCwgT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgbGFiZWwsIHZhbHVlIH0sXG4gICAgICBkZWJ1Zy5kZWZhdWx0T3B0aW9ucy5kZWZhdWx0VmFsdWUsXG4gICAgICBvcHRpb25zXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhIG1hcmtlciBpbiB3b3JsZCBvciBzY3JlZW4gc3BhY2VcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbWFya2VyKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHBvc2l0aW9uOiB2ZWMsIG9wdGlvbnM6IFBhcnRpYWw8RGVidWdNYXJrZXI+ID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCBkZWJ1ZyA9IERlYnVnLmdldEluc3RhbmNlKCk7XG4gICAgZGVidWcubWFya2Vycy5zZXQobGFiZWwsIE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGxhYmVsLCB2YWx1ZSwgcG9zaXRpb24gfSxcbiAgICAgIGRlYnVnLmRlZmF1bHRPcHRpb25zLmRlZmF1bHRNYXJrZXIsXG4gICAgICBvcHRpb25zXG4gICAgKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgZGVidWcgPSBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gRHJhdyB3b3JsZC1zcGFjZSBtYXJrZXJzXG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgZGVidWcubWFya2Vycy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICBpZiAobWFya2VyLnNwYWNlID09PSAnd29ybGQnKSB7XG4gICAgICAgIGRlYnVnLmRyYXdNYXJrZXIoY29udGV4dCwgbWFya2VyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgIC8vIERyYXcgdmFsdWVzIGFuZCBzY3JlZW4tc3BhY2UgbWFya2Vyc1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIGxldCBwb3NpdGlvbjogdmVjO1xuICAgIGxldCBsZWZ0WSA9IGRlYnVnLm9wdGlvbnMubWFyZ2luO1xuICAgIGxldCByaWdodFkgPSBkZWJ1Zy5vcHRpb25zLm1hcmdpbjtcbiAgICBjb25zdCBsaW5lSGVpZ2h0ID0gKGRlYnVnLm9wdGlvbnMubGluZUhlaWdodCArIGRlYnVnLm9wdGlvbnMucGFkZGluZyAqIDIpO1xuICAgIGRlYnVnLnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIHN3aXRjaCAodmFsdWUuYWxpZ24pIHtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgcG9zaXRpb24gPSB2ZWMoZGVidWcub3B0aW9ucy5tYXJnaW4sIGxlZnRZKTtcbiAgICAgICAgICBsZWZ0WSArPSBsaW5lSGVpZ2h0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgcG9zaXRpb24gPSB2ZWMoY29udGV4dC5jYW52YXMuY2xpZW50V2lkdGggLSBkZWJ1Zy5vcHRpb25zLm1hcmdpbiwgcmlnaHRZKTtcbiAgICAgICAgICByaWdodFkgKz0gbGluZUhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlYnVnLmRyYXdMYWJlbChcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgKHZhbHVlLnNob3dMYWJlbCA/IGAke3ZhbHVlLmxhYmVsfTogYCA6ICcnKSArIGAke3ZhbHVlLnZhbHVlfWAsXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICB2YWx1ZS5hbGlnbixcbiAgICAgICAgdmFsdWUucGFkZGluZyA/PyBkZWJ1Zy5vcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIHZhbHVlLmZvbnQgPz8gZGVidWcub3B0aW9ucy5mb250LFxuICAgICAgICB2YWx1ZS5mb3JlZ3JvdW5kQ29sb3VyID8/IGRlYnVnLm9wdGlvbnMuZm9yZWdyb3VuZENvbG91cixcbiAgICAgICAgdmFsdWUuYmFja2dyb3VuZENvbG91ciA/PyBkZWJ1Zy5vcHRpb25zLmJhY2tncm91bmRDb2xvdXJcbiAgICAgICk7XG4gICAgfSk7XG4gICAgZGVidWcubWFya2Vycy5mb3JFYWNoKG1hcmtlciA9PiB7XG4gICAgICBpZiAobWFya2VyLnNwYWNlID09PSAnc2NyZWVuJykge1xuICAgICAgICBkZWJ1Zy5kcmF3TWFya2VyKGNvbnRleHQsIG1hcmtlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAvLyBDbGVhciB2YWx1ZXMgYW5kIG1hcmtlcnMgcmVhZHkgZm9yIG5leHQgZnJhbWVcbiAgICBkZWJ1Zy52YWx1ZXMuY2xlYXIoKTtcbiAgICBkZWJ1Zy5tYXJrZXJzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdNYXJrZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBtYXJrZXI6IERlYnVnTWFya2VyKTogdm9pZCB7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBtYXJrZXIucG9zaXRpb24gPz8gdmVjKCk7XG4gICAgaWYgKG1hcmtlci5zaG93TGFiZWwgfHwgbWFya2VyLnNob3dWYWx1ZSkge1xuICAgICAgdGhpcy5kcmF3TGFiZWwoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIChtYXJrZXIuc2hvd0xhYmVsID8gYCR7bWFya2VyLmxhYmVsfTogYCA6ICcnKSArIChtYXJrZXIuc2hvd1ZhbHVlID8gYCR7bWFya2VyLnZhbHVlfWAgOiAnJyksXG4gICAgICAgIHZlYy5hZGQocG9zaXRpb24gPz8gdmVjKCksIG1hcmtlci5sYWJlbE9mZnNldCksXG4gICAgICAgICdsZWZ0JyxcbiAgICAgICAgbWFya2VyLnBhZGRpbmcgPz8gdGhpcy5vcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIG1hcmtlci5mb250ID8/IHRoaXMub3B0aW9ucy5mb250LFxuICAgICAgICBtYXJrZXIuZm9yZWdyb3VuZENvbG91ciA/PyB0aGlzLm9wdGlvbnMuZm9yZWdyb3VuZENvbG91cixcbiAgICAgICAgbWFya2VyLmJhY2tncm91bmRDb2xvdXIgPz8gdGhpcy5vcHRpb25zLmJhY2tncm91bmRDb2xvdXJcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYXJrZXIuc2hvd01hcmtlcikge1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSAyO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbnRleHQuZmlsbFN0eWxlID0gbWFya2VyLm1hcmtlckNvbG91cjtcbiAgICAgIHN3aXRjaCAobWFya2VyLm1hcmtlclN0eWxlKSB7XG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgIHRoaXMuZHJhd0Nyb3NzKGNvbnRleHQsIHBvc2l0aW9uLCBtYXJrZXIubWFya2VyU2l6ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgIHRoaXMuZHJhd1BsdXMoY29udGV4dCwgcG9zaXRpb24sIG1hcmtlci5tYXJrZXJTaXplKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgdGhpcy5kcmF3RG90KGNvbnRleHQsIHBvc2l0aW9uLCBtYXJrZXIubWFya2VyU2l6ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TGFiZWwoXG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBwb3NpdGlvbjogdmVjLFxuICAgIGFsaWduOiAnbGVmdCcgfCAncmlnaHQnLFxuICAgIHBhZGRpbmc6IG51bWJlcixcbiAgICBmb250OiBzdHJpbmcsXG4gICAgZm9yZWdyb3VuZENvbG91cjogQ29sb3VyLFxuICAgIGJhY2tncm91bmRDb2xvdXI6IENvbG91clxuICApOiB2b2lkIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LmZvbnQgPSBmb250O1xuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgY29uc3QgYmFja2dyb3VuZFNpemUgPSB7XG4gICAgICB3aWR0aDogY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCArIHBhZGRpbmcgKiAyLFxuICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMubGluZUhlaWdodCArIHBhZGRpbmcgKiAyLFxuICAgIH07XG4gICAgY29uc3QgeCA9IGFsaWduID09PSAncmlnaHQnID8gKHBvc2l0aW9uLnggLSBiYWNrZ3JvdW5kU2l6ZS53aWR0aCkgOiBwb3NpdGlvbi54O1xuXG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kQ29sb3VyO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoXG4gICAgICB4IC0gcGFkZGluZyxcbiAgICAgIHBvc2l0aW9uLnkgLSBwYWRkaW5nLFxuICAgICAgYmFja2dyb3VuZFNpemUud2lkdGgsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZS5oZWlnaHRcbiAgICApO1xuXG4gICAgLy8gRHJhdyB0ZXh0XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kQ29sb3VyO1xuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgcG9zaXRpb24ueSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDcm9zcyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHBvc2l0aW9uOiB2ZWMsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29uc3QgaGFsZlNpemUgPSBzaXplIC8gMjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb3NpdGlvbi54IC0gaGFsZlNpemUsIHBvc2l0aW9uLnkgLSBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIGhhbGZTaXplLCBwb3NpdGlvbi55ICsgaGFsZlNpemUpO1xuICAgIGNvbnRleHQubW92ZVRvKHBvc2l0aW9uLnggLSBoYWxmU2l6ZSwgcG9zaXRpb24ueSArIGhhbGZTaXplKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb3NpdGlvbi54ICsgaGFsZlNpemUsIHBvc2l0aW9uLnkgLSBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd1BsdXMoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBwb3NpdGlvbjogdmVjLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnN0IGhhbGZTaXplID0gc2l6ZSAvIDI7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSAtIGhhbGZTaXplKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55ICsgaGFsZlNpemUpO1xuICAgIGNvbnRleHQubW92ZVRvKHBvc2l0aW9uLnggLSBoYWxmU2l6ZSwgcG9zaXRpb24ueSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIGhhbGZTaXplLCBwb3NpdGlvbi55KTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3RG90KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcG9zaXRpb246IHZlYywgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBzaXplIC8gMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcuanNvbic7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IENvbnRlbnQgZnJvbSAnLi9jb250ZW50L0NvbnRlbnQnO1xuaW1wb3J0IERlYnVnIGZyb20gJy4vRGVidWcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBsYXN0RnJhbWVUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgbGFzdEZyYW1lQ291bnRUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgZnJhbWVSYXRlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGZyYW1lQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIHN0YXRpYyBzY3JlZW46IHZlYztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdmFsaWQgY29udGFpbmVyIGVsZW1lbnQgbXVzdCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgfVxuICAgIGlmIChjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnY2FudmFzJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgZWxlbWVudCBtdXN0IGJlIGEgY2FudmFzLicpO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhcyA9IGNvbnRhaW5lciBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIC8vIEdldCBhIDJkIGNvbnRleHRcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZ2V0IGEgMmQgY29udGV4dC5cIik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHJlc2l6ZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgLy8gRGlzYWJsZSBpbWFnZSBzbW9vdGhpbmcgZm9yIHBpeGVsYXRlZCBncmFwaGljc1xuICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBnYW1lIGFuZCBzdGFydCBwbGF5aW5nXG4gICAqL1xuICBwdWJsaWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcblxuICAgIC8vIEluaXRpYWxpc2Ugc3Vic3lzdGVtc1xuICAgIERlYnVnLmluaXRpYWxpc2UoKTtcbiAgICBJbnB1dC5pbml0aWFsaXNlKCk7XG4gICAgQ29udGVudC5pbml0aWFsaXNlKCk7XG5cbiAgICAvLyBTdGFydCBnYW1lIGxvb3BcbiAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSB0aGlzLmxhc3RGcmFtZUNvdW50VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHRoaXMubG9vcCgpO1xuXG4gICAgLy8gVE9ETyBzdGFydCB0aGUgZ2FtZS4uLlxuICB9XG5cbiAgcHJpdmF0ZSBsb29wKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gTWF0aC5taW4obm93IC0gdGhpcy5sYXN0RnJhbWVUaW1lLCBjb25zdGFudHMuRlBTX01JTik7XG5cbiAgICAvLyBDYWxjdWxhdGUgZnJhbWVyYXRlXG4gICAgaWYgKG5vdyAtIHRoaXMubGFzdEZyYW1lQ291bnRUaW1lID49IDEwMDApIHtcbiAgICAgIHRoaXMubGFzdEZyYW1lQ291bnRUaW1lID0gbm93O1xuICAgICAgdGhpcy5mcmFtZVJhdGUgPSB0aGlzLmZyYW1lQ291bnQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIH1cbiAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBub3c7XG4gICAgaWYgKGNvbmZpZy5zaG93RlBTKSB7XG4gICAgICBEZWJ1Zy52YWx1ZSgnRlBTJywgdGhpcy5mcmFtZVJhdGUsIHsgYWxpZ246ICdyaWdodCcgfSk7XG4gICAgfVxuXG4gICAgLy8gRG8gZ2FtZSBsb29wXG4gICAgdGhpcy51cGRhdGUoZWxhcHNlZFRpbWUpO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBwcml2YXRlIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgR2FtZS5zY3JlZW4gPSB2ZWModGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBUT0RPIHVwZGF0ZSB0aGUgZ2FtZS4uLlxuXG4gICAgSW5wdXQudXBkYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuXG4gICAgLy8gVE9ETyByZW5kZXIgdGhlIGdhbWUuLi5cblxuICAgIERlYnVnLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi9lbnVtcyc7XG5cbnR5cGUgTW91c2VTdGF0ZSA9IHtcbiAgYnV0dG9uOiBib29sZWFuLFxuICBwb3NpdGlvbjogdmVjLFxuICB3aGVlbDogbnVtYmVyXG59O1xuXG50eXBlIEtleWJvYXJkU3RhdGUgPSB7XG4gIFtrZXkgaW4gS2V5XT86IGJvb2xlYW5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IElucHV0O1xuICBwcml2YXRlIGtleWJvYXJkU3RhdGU6IEtleWJvYXJkU3RhdGUgPSB7fTtcbiAgcHJpdmF0ZSBwcmV2aW91c0tleWJvYXJkU3RhdGU6IEtleWJvYXJkU3RhdGUgPSB7fTtcbiAgcHJpdmF0ZSBtb3VzZVN0YXRlOiBNb3VzZVN0YXRlID0geyBidXR0b246IGZhbHNlLCBwb3NpdGlvbjogdmVjKCksIHdoZWVsOiAwIH07XG4gIHByaXZhdGUgcHJldmlvdXNNb3VzZVN0YXRlOiBNb3VzZVN0YXRlID0geyBidXR0b246IGZhbHNlLCBwb3NpdGlvbjogdmVjKCksIHdoZWVsOiAwIH07XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IHRydWU7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlU3RhdGUuYnV0dG9uID0gZmFsc2U7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlU3RhdGUuYnV0dG9uID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlU3RhdGUuYnV0dG9uID0gZmFsc2U7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLnBvc2l0aW9uLnggPSBlLm9mZnNldFg7XG4gICAgICB0aGlzLm1vdXNlU3RhdGUucG9zaXRpb24ueSA9IGUub2Zmc2V0WTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgdGhpcy5rZXlib2FyZFN0YXRlW2UuY29kZSBhcyBLZXldID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcbiAgICAgIHRoaXMua2V5Ym9hcmRTdGF0ZVtlLmNvZGUgYXMgS2V5XSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGUgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLndoZWVsID0gZS5kZWx0YVkgPiAwID8gMSA6IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIGlucHV0IG1hbmFnZXIgZm9yIG1hbmFnaW5nIG1vdXNlIGFuZCBrZXlib2FyZCBpbnB1dFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXNlKCk6IHZvaWQge1xuICAgIElucHV0Lmluc3RhbmNlID0gbmV3IElucHV0KCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBJbnB1dCB7XG4gICAgaWYgKElucHV0Lmluc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgbWFuYWdlciBub3QgcHJvcGVybHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIElucHV0Lmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIGlucHV0IGRldmljZXNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICBpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKTtcbiAgICBpbnN0YW5jZS5wcmV2aW91c01vdXNlU3RhdGUgPSB7XG4gICAgICBidXR0b246IGluc3RhbmNlLm1vdXNlU3RhdGUuYnV0dG9uLFxuICAgICAgcG9zaXRpb246IHZlYy5jcHkoaW5zdGFuY2UubW91c2VTdGF0ZS5wb3NpdGlvbiksXG4gICAgICB3aGVlbDogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEga2V5IGlzIGN1cnJlbnRseSBwcmVzc2VkIGRvd25cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMga2V5RG93bihrZXk/OiBLZXkpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbnkga2V5IGlzIGRvd25cbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgayBpbiBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2sgYXMgS2V5XSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhIWluc3RhbmNlLmtleWJvYXJkU3RhdGVba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGtleSBoYXMgYmVlbiBwcmVzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGtleVByZXNzZWQoa2V5PzogS2V5KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYW55IGtleSB3YXMgcHJlc3NlZFxuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrIGluIGluc3RhbmNlLmtleWJvYXJkU3RhdGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGluc3RhbmNlLmtleWJvYXJkU3RhdGVbayBhcyBLZXldICYmXG4gICAgICAgICAgKFxuICAgICAgICAgICAgIShrIGluIGluc3RhbmNlLnByZXZpb3VzS2V5Ym9hcmRTdGF0ZSkgfHxcbiAgICAgICAgICAgICFpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGVbayBhcyBLZXldXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gISFpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2tleV0gJiYgIWluc3RhbmNlLnByZXZpb3VzS2V5Ym9hcmRTdGF0ZVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEga2V5IGhhcyBiZWVuIHJlbGVhc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGtleVJlbGVhc2VkKGtleT86IEtleSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIENoZWNrIGlmIGFueSBrZXkgd2FzIHJlbGVhc2VkXG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWluc3RhbmNlLmtleWJvYXJkU3RhdGVbayBhcyBLZXldICYmXG4gICAgICAgICAgISFpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGVbayBhcyBLZXldXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrZXldICYmICEhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb3VzZSBidXR0b24gaXMgY3VycmVudGx5IHByZXNzZWQgZG93blxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtb3VzZURvd24oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuICAgIHJldHVybiAhIWluc3RhbmNlLm1vdXNlU3RhdGUuYnV0dG9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbW91c2UgYnV0dG9uIGhhcyBiZWVuIHByZXNzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VQcmVzc2VkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gISFpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbiAmJiAhaW5zdGFuY2UucHJldmlvdXNNb3VzZVN0YXRlLmJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG1vdXNlIGJ1dHRvbiBoYXMgYmVlbiByZWxlYXNlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtb3VzZVJlbGVhc2VkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gIWluc3RhbmNlLm1vdXNlU3RhdGUuYnV0dG9uICYmICEhaW5zdGFuY2UucHJldmlvdXNNb3VzZVN0YXRlLmJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgbW91c2V3aGVlbCBpcyBzY3JvbGxpbmcgdXBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VXaGVlbFVwKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gaW5zdGFuY2UubW91c2VTdGF0ZS53aGVlbCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG1vdXNld2hlZWwgaXMgc2Nyb2xsaW5nIGRvd25cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VXaGVlbERvd24oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuICAgIHJldHVybiBpbnN0YW5jZS5tb3VzZVN0YXRlLndoZWVsIDwgMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb24gaW4gc2NyZWVuLXNwYWNlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlUG9zaXRpb24oKTogdmVjIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlLm1vdXNlU3RhdGUucG9zaXRpb247XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZC1yYW5kb20nO1xuXG5leHBvcnQgdHlwZSBBY3RvckRhdGEgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBY3RvckRhdGFTY2hlbWEgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgfSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQWN0b3Ige1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaWQ6IHN0cmluZyB8IG51bGwsXG4gICAgbmFtZTogc3RyaW5nXG4gICkge1xuICAgIHRoaXMuaWQgPSBpZCA/PyB1dWlkKCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXJpYWxpemUoKTogQWN0b3JEYXRhIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgfTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IERFQlVHID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBTSU1VTEFURV9TTE9XX0xPQURJTkcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IEZQU19NSU4gPSAxIC8gMzA7XG4iLCJpbXBvcnQgSlNPTlNjaGVtYVZhbGlkYXRvciBmcm9tICdhanYnO1xuaW1wb3J0IHsgQWN0b3JEYXRhLCBBY3RvckRhdGFTY2hlbWEgfSBmcm9tICcuLi9hY3RvcnMvQWN0b3InO1xuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb250ZW50SXRlbUxvYWRlciB9IGZyb20gJy4vQ29udGVudCc7XG5pbXBvcnQgeyBKU09OTG9hZGVyIH0gZnJvbSAnLi9KU09OTG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IEFjdG9yRGF0YUxvYWRlcjogQ29udGVudEl0ZW1Mb2FkZXIgPSBhc3luYyAoXG4gIHVybDogc3RyaW5nXG4pOiBQcm9taXNlPGFueT4gPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgSlNPTkxvYWRlcjxBY3RvckRhdGE+KHVybCk7XG4gIGNvbnN0IHZhbGlkYXRlID0gbmV3IEpTT05TY2hlbWFWYWxpZGF0b3IoKS5jb21waWxlKEFjdG9yRGF0YVNjaGVtYSk7XG4gIGlmICghdmFsaWRhdGUoZGF0YSkpIHtcbiAgICBjb25zdGFudHMuREVCVUcgJiYgY29uc29sZS5sb2codmFsaWRhdGUuZXJyb3JzKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYWN0b3IgZGF0YTogJHt1cmx9YCk7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiaW1wb3J0IEpTT05TY2hlbWFWYWxpZGF0b3IgZnJvbSAnYWp2JztcbmltcG9ydCAqIGFzIF9jb250ZW50TWFuaWZlc3QgZnJvbSAnLi4vLi4vY29udGVudC9jb250ZW50Lmpzb24nO1xuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBY3RvckRhdGFMb2FkZXIsIEZvbnRMb2FkZXIsIEltYWdlTG9hZGVyLCBTb3VuZExvYWRlciB9IGZyb20gJy4uL2NvbnRlbnQnO1xuaW1wb3J0IHsgQ29udGVudEl0ZW1UeXBlIH0gZnJvbSAnLi4vZW51bXMnO1xuaW1wb3J0IHNsZWVwIGZyb20gJy4uL3V0aWxpdGllcy9zbGVlcCc7XG5cbnR5cGUgQ29udGVudEl0ZW0gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogQ29udGVudEl0ZW1UeXBlO1xuICBhcmdzOiBzdHJpbmdbXTtcbn07XG5cbnR5cGUgQ29udGVudE1hbmlmZXN0ID0ge1xuICBpdGVtczogQ29udGVudEl0ZW1bXTtcbn07XG5cbmV4cG9ydCB0eXBlIENvbnRlbnRJdGVtTG9hZGVyID0gPFQ+KC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiBQcm9taXNlPFQ+O1xuXG5jb25zdCBjb250ZW50SXRlbUxvYWRlcnM6IHtcbiAgW2tleSBpbiBDb250ZW50SXRlbVR5cGVdOiBDb250ZW50SXRlbUxvYWRlcjtcbn0gPSB7XG4gIFtDb250ZW50SXRlbVR5cGUuSW1hZ2VdOiBJbWFnZUxvYWRlcixcbiAgW0NvbnRlbnRJdGVtVHlwZS5Tb3VuZF06IFNvdW5kTG9hZGVyLFxuICBbQ29udGVudEl0ZW1UeXBlLkZvbnRdOiBGb250TG9hZGVyLFxuICBbQ29udGVudEl0ZW1UeXBlLkFjdG9yRGF0YV06IEFjdG9yRGF0YUxvYWRlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29udGVudDtcbiAgcHJpdmF0ZSBjb250ZW50OiBDb250ZW50SXRlbVtdO1xuICBwcml2YXRlIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzdGF0aWMgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihjb250ZW50OiBDb250ZW50SXRlbVtdKSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBjb250ZW50IG1hbmFnZXIgZm9yIGxvYWRpbmcgY29udGVudCBhc3NldHNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZW50TWFuaWZlc3QgPSBfY29udGVudE1hbmlmZXN0IGFzIENvbnRlbnRNYW5pZmVzdDtcbiAgICBjb25zdCB2YWxpZGF0ZSA9IG5ldyBKU09OU2NoZW1hVmFsaWRhdG9yKCkuY29tcGlsZSh7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZW51bTogT2JqZWN0LnZhbHVlcyhDb250ZW50SXRlbVR5cGUpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogWydzdHJpbmcnLCAnb2JqZWN0JywgJ2FycmF5J10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgfSk7XG4gICAgaWYgKCF2YWxpZGF0ZShjb250ZW50TWFuaWZlc3QpKSB7XG4gICAgICBjb25zdGFudHMuREVCVUcgJiYgY29uc29sZS5sb2codmFsaWRhdGUuZXJyb3JzKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250ZW50IG1hbmlmZXN0Jyk7XG4gICAgfVxuICAgIENvbnRlbnQuaW5zdGFuY2UgPSBuZXcgQ29udGVudChjb250ZW50TWFuaWZlc3QuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29udGVudCB7XG4gICAgaWYgKENvbnRlbnQuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IG1hbmFnZXIgbm90IHByb3Blcmx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBDb250ZW50Lmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGxvYWRpbmcgY29udGVudCBpdGVtcyBkZWZpbmVkIGluIHRoZSBjb250ZW50IG1hbmlmZXN0XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKENvbnRlbnQubG9hZGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgYWxyZWFkeSBsb2FkZWQnKTtcbiAgICB9XG4gICAgY29uc3QgaW5zdGFuY2UgPSBDb250ZW50LmdldEluc3RhbmNlKCk7XG4gICAgaWYgKGluc3RhbmNlLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbnRlbnQgaXRlbXMgdG8gbG9hZCcpO1xuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzc0RlbHRhID0gMSAvIGluc3RhbmNlLmNvbnRlbnQubGVuZ3RoO1xuICAgIGZvciAoY29uc3QgYyBvZiBpbnN0YW5jZS5jb250ZW50KSB7XG4gICAgICBpZiAoY29uc3RhbnRzLkRFQlVHICYmIGNvbnN0YW50cy5TSU1VTEFURV9TTE9XX0xPQURJTkcpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoTWF0aC5yYW5kb21CZXR3ZWVuKDEwMCwgMTAwMCkpO1xuICAgICAgfVxuICAgICAgaW5zdGFuY2UuaXRlbXNbYy5uYW1lXSA9IGF3YWl0IGNvbnRlbnRJdGVtTG9hZGVyc1tjLnR5cGVdKC4uLmMuYXJncyk7XG4gICAgICBDb250ZW50LnByb2dyZXNzID0gTWF0aC5jbGFtcChDb250ZW50LnByb2dyZXNzICsgcHJvZ3Jlc3NEZWx0YSwgMCwgMSk7XG4gICAgfVxuICAgIENvbnRlbnQubG9hZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhIGxvYWRlZCBjb250ZW50IGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0PFQ+KG5hbWU6IHN0cmluZyk6IFQge1xuICAgIGlmICghQ29udGVudC5sb2FkZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGVudCBub3QgbG9hZGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gQ29udGVudC5nZXRJbnN0YW5jZSgpO1xuICAgIGlmICghKG5hbWUgaW4gaW5zdGFuY2UuaXRlbXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbnRlbnQgaXRlbSBcIiR7bmFtZX1cIiBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlLml0ZW1zW25hbWVdIGFzIFQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IEZvbnRMb2FkZXI6IENvbnRlbnRJdGVtTG9hZGVyID0gYXN5bmMgKFxuICB1cmw6IHN0cmluZyxcbiAgZmFtaWx5OiBzdHJpbmdcbik6IFByb21pc2U8YW55PiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxGb250RmFjZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZvbnQgPSBuZXcgRm9udEZhY2UoZmFtaWx5LCBgdXJsKCR7dXJsfSlgKTtcbiAgICBmb250LmxvYWQoKVxuICAgICAgLnRoZW4oZm9udCA9PiB7XG4gICAgICAgIGRvY3VtZW50LmZvbnRzLmFkZChmb250KTtcbiAgICAgICAgcmVzb2x2ZShmb250IGFzIGFueSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBFcnJvciBsb2FkaW5nIGZvbnQgXCIke3VybH1cImApO1xuICAgICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IEltYWdlTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIDxIVE1MSW1hZ2VFbGVtZW50PihcbiAgdXJsOiBzdHJpbmdcbik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICByZXNvbHZlKGltYWdlIGFzIGFueSk7XG4gICAgfSk7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICByZWplY3QoYEVycm9yIGxvYWRpbmcgaW1hZ2UgXCIke3VybH1cImApO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBDb250ZW50SXRlbUxvYWRlciB9IGZyb20gJy4vQ29udGVudCc7XG5cbmV4cG9ydCBjb25zdCBKU09OTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIDxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4oXG4gIHVybE9yRGF0YTogYW55XG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB1cmxPckRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdpbmRvdy5mZXRjaCh1cmxPckRhdGEsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICByZXNvbHZlKGpzb24pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChgRXJyb3IgbG9hZGluZyBqc29uIFwiJHt1cmxPckRhdGF9XCJgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHVybE9yRGF0YSBhcyBUO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IFNvdW5kTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIChcbiAgdXJsOiBzdHJpbmdcbik6IFByb21pc2U8YW55PiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MQXVkaW9FbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc291bmQgPSBuZXcgQXVkaW8odXJsKTtcbiAgICBzb3VuZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgKCkgPT4ge1xuICAgICAgcmVzb2x2ZShzb3VuZCBhcyBhbnkpO1xuICAgIH0pO1xuICAgIHNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgcmVqZWN0KGBFcnJvciBsb2FkaW5nIHNvdW5kIFwiJHt1cmx9XCJgKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IHsgQWN0b3JEYXRhTG9hZGVyIH0gZnJvbSAnLi9BY3RvckRhdGFMb2FkZXInO1xuZXhwb3J0IHsgRm9udExvYWRlciB9IGZyb20gJy4vRm9udExvYWRlcic7XG5leHBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXInO1xuZXhwb3J0IHsgU291bmRMb2FkZXIgfSBmcm9tICcuL1NvdW5kTG9hZGVyJztcbiIsImV4cG9ydCBlbnVtIENvbnRlbnRJdGVtVHlwZSB7XG4gIEltYWdlID0gJ2ltYWdlJyxcbiAgU291bmQgPSAnc291bmQnLFxuICBGb250ID0gJ2ZvbnQnLFxuICBBY3RvckRhdGEgPSAnYWN0b3JEYXRhJyxcbn1cblxuZXhwb3J0IGVudW0gS2V5IHtcbiAgVXAgPSAnQXJyb3dVcCcsXG4gIERvd24gPSAnQXJyb3dEb3duJyxcbiAgTGVmdCA9ICdBcnJvd0xlZnQnLFxuICBSaWdodCA9ICdBcnJvd1JpZ2h0JyxcbiAgU3BhY2UgPSAnU3BhY2UnLFxuICBFbnRlciA9ICdFbnRlcicsXG4gIFNoaWZ0ID0gJ1NoaWZ0JyxcbiAgQ29udHJvbCA9ICdDb250cm9sJyxcbiAgRXNjYXBlID0gJ0VzY2FwZScsXG4gIERpZ2l0MCA9ICdEaWdpdDAnLFxuICBEaWdpdDEgPSAnRGlnaXQxJyxcbiAgRGlnaXQyID0gJ0RpZ2l0MicsXG4gIERpZ2l0MyA9ICdEaWdpdDMnLFxuICBEaWdpdDQgPSAnRGlnaXQ0JyxcbiAgRGlnaXQ1ID0gJ0RpZ2l0NScsXG4gIERpZ2l0NiA9ICdEaWdpdDYnLFxuICBEaWdpdDcgPSAnRGlnaXQ3JyxcbiAgRGlnaXQ4ID0gJ0RpZ2l0OCcsXG4gIERpZ2l0OSA9ICdEaWdpdDknLFxufVxuIiwiLyoqXG4gKiBQYXVzZSBleGVjdXRpb24gZm9yIHNvbWUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cbiIsIi8qKiBAbGljZW5zZSBVUkkuanMgdjQuNC4xIChjKSAyMDExIEdhcnkgQ291cnQuIExpY2Vuc2U6IGh0dHA6Ly9naXRodWIuY29tL2dhcnljb3VydC91cmktanMgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5VUkkgPSBnbG9iYWwuVVJJIHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc2V0cyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBzZXRzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmIChzZXRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgc2V0c1swXSA9IHNldHNbMF0uc2xpY2UoMCwgLTEpO1xuICAgICAgICB2YXIgeGwgPSBzZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAodmFyIHggPSAxOyB4IDwgeGw7ICsreCkge1xuICAgICAgICAgICAgc2V0c1t4XSA9IHNldHNbeF0uc2xpY2UoMSwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIHNldHNbeGxdID0gc2V0c1t4bF0uc2xpY2UoMSk7XG4gICAgICAgIHJldHVybiBzZXRzLmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXRzWzBdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YmV4cChzdHIpIHtcbiAgICByZXR1cm4gXCIoPzpcIiArIHN0ciArIFwiKVwiO1xufVxuZnVuY3Rpb24gdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gbyA9PT0gdW5kZWZpbmVkID8gXCJ1bmRlZmluZWRcIiA6IG8gPT09IG51bGwgPyBcIm51bGxcIiA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zcGxpdChcIiBcIikucG9wKCkuc3BsaXQoXCJdXCIpLnNoaWZ0KCkudG9Mb3dlckNhc2UoKTtcbn1cbmZ1bmN0aW9uIHRvVXBwZXJDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIudG9VcHBlckNhc2UoKTtcbn1cbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gbnVsbCA/IG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gb2JqIDogdHlwZW9mIG9iai5sZW5ndGggIT09IFwibnVtYmVyXCIgfHwgb2JqLnNwbGl0IHx8IG9iai5zZXRJbnRlcnZhbCB8fCBvYmouY2FsbCA/IFtvYmpdIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqKSA6IFtdO1xufVxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRhcmdldDtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gYnVpbGRFeHBzKGlzSVJJKSB7XG4gICAgdmFyIEFMUEhBJCQgPSBcIltBLVphLXpdXCIsXG4gICAgICAgIENSJCA9IFwiW1xcXFx4MERdXCIsXG4gICAgICAgIERJR0lUJCQgPSBcIlswLTldXCIsXG4gICAgICAgIERRVU9URSQkID0gXCJbXFxcXHgyMl1cIixcbiAgICAgICAgSEVYRElHJCQgPSBtZXJnZShESUdJVCQkLCBcIltBLUZhLWZdXCIpLFxuICAgICAgICAvL2Nhc2UtaW5zZW5zaXRpdmVcbiAgICBMRiQkID0gXCJbXFxcXHgwQV1cIixcbiAgICAgICAgU1AkJCA9IFwiW1xcXFx4MjBdXCIsXG4gICAgICAgIFBDVF9FTkNPREVEJCA9IHN1YmV4cChzdWJleHAoXCIlW0VGZWZdXCIgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkgKyBcInxcIiArIHN1YmV4cChcIiVbODlBLUZhLWZdXCIgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkgKyBcInxcIiArIHN1YmV4cChcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpKSxcbiAgICAgICAgLy9leHBhbmRlZFxuICAgIEdFTl9ERUxJTVMkJCA9IFwiW1xcXFw6XFxcXC9cXFxcP1xcXFwjXFxcXFtcXFxcXVxcXFxAXVwiLFxuICAgICAgICBTVUJfREVMSU1TJCQgPSBcIltcXFxcIVxcXFwkXFxcXCZcXFxcJ1xcXFwoXFxcXClcXFxcKlxcXFwrXFxcXCxcXFxcO1xcXFw9XVwiLFxuICAgICAgICBSRVNFUlZFRCQkID0gbWVyZ2UoR0VOX0RFTElNUyQkLCBTVUJfREVMSU1TJCQpLFxuICAgICAgICBVQ1NDSEFSJCQgPSBpc0lSSSA/IFwiW1xcXFx4QTAtXFxcXHUyMDBEXFxcXHUyMDEwLVxcXFx1MjAyOVxcXFx1MjAyRi1cXFxcdUQ3RkZcXFxcdUY5MDAtXFxcXHVGRENGXFxcXHVGREYwLVxcXFx1RkZFRl1cIiA6IFwiW11cIixcbiAgICAgICAgLy9zdWJzZXQsIGV4Y2x1ZGVzIGJpZGkgY29udHJvbCBjaGFyYWN0ZXJzXG4gICAgSVBSSVZBVEUkJCA9IGlzSVJJID8gXCJbXFxcXHVFMDAwLVxcXFx1RjhGRl1cIiA6IFwiW11cIixcbiAgICAgICAgLy9zdWJzZXRcbiAgICBVTlJFU0VSVkVEJCQgPSBtZXJnZShBTFBIQSQkLCBESUdJVCQkLCBcIltcXFxcLVxcXFwuXFxcXF9cXFxcfl1cIiwgVUNTQ0hBUiQkKSxcbiAgICAgICAgU0NIRU1FJCA9IHN1YmV4cChBTFBIQSQkICsgbWVyZ2UoQUxQSEEkJCwgRElHSVQkJCwgXCJbXFxcXCtcXFxcLVxcXFwuXVwiKSArIFwiKlwiKSxcbiAgICAgICAgVVNFUklORk8kID0gc3ViZXhwKHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOl1cIikpICsgXCIqXCIpLFxuICAgICAgICBERUNfT0NURVQkID0gc3ViZXhwKHN1YmV4cChcIjI1WzAtNV1cIikgKyBcInxcIiArIHN1YmV4cChcIjJbMC00XVwiICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIjFcIiArIERJR0lUJCQgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiWzEtOV1cIiArIERJR0lUJCQpICsgXCJ8XCIgKyBESUdJVCQkKSxcbiAgICAgICAgREVDX09DVEVUX1JFTEFYRUQkID0gc3ViZXhwKHN1YmV4cChcIjI1WzAtNV1cIikgKyBcInxcIiArIHN1YmV4cChcIjJbMC00XVwiICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIjFcIiArIERJR0lUJCQgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiMD9bMS05XVwiICsgRElHSVQkJCkgKyBcInwwPzA/XCIgKyBESUdJVCQkKSxcbiAgICAgICAgLy9yZWxheGVkIHBhcnNpbmcgcnVsZXNcbiAgICBJUFY0QUREUkVTUyQgPSBzdWJleHAoREVDX09DVEVUX1JFTEFYRUQkICsgXCJcXFxcLlwiICsgREVDX09DVEVUX1JFTEFYRUQkICsgXCJcXFxcLlwiICsgREVDX09DVEVUX1JFTEFYRUQkICsgXCJcXFxcLlwiICsgREVDX09DVEVUX1JFTEFYRUQkKSxcbiAgICAgICAgSDE2JCA9IHN1YmV4cChIRVhESUckJCArIFwiezEsNH1cIiksXG4gICAgICAgIExTMzIkID0gc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiICsgSDE2JCkgKyBcInxcIiArIElQVjRBRERSRVNTJCksXG4gICAgICAgIElQVjZBRERSRVNTMSQgPSBzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7Nn1cIiArIExTMzIkKSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICA2KCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1MyJCA9IHN1YmV4cChcIlxcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezV9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgIFwiOjpcIiA1KCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1MzJCA9IHN1YmV4cChzdWJleHAoSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcIns0fVwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgICAgICAgICAgICAgICBoMTYgXSBcIjo6XCIgNCggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTNCQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsMX1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7M31cIiArIExTMzIkKSxcbiAgICAgICAgLy9bICoxKCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgMyggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTNSQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsMn1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7Mn1cIiArIExTMzIkKSxcbiAgICAgICAgLy9bICoyKCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgMiggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTNiQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsM31cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgSDE2JCArIFwiXFxcXDpcIiArIExTMzIkKSxcbiAgICAgICAgLy9bICozKCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgICAgaDE2IFwiOlwiICAgbHMzMlxuICAgIElQVjZBRERSRVNTNyQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsNH1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjQoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAgICAgICAgICAgICAgbHMzMlxuICAgIElQVjZBRERSRVNTOCQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsNX1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgSDE2JCksXG4gICAgICAgIC8vWyAqNSggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiICAgICAgICAgICAgICBoMTZcbiAgICBJUFY2QUREUkVTUzkkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDZ9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiksXG4gICAgICAgIC8vWyAqNiggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiXG4gICAgSVBWNkFERFJFU1MkID0gc3ViZXhwKFtJUFY2QUREUkVTUzEkLCBJUFY2QUREUkVTUzIkLCBJUFY2QUREUkVTUzMkLCBJUFY2QUREUkVTUzQkLCBJUFY2QUREUkVTUzUkLCBJUFY2QUREUkVTUzYkLCBJUFY2QUREUkVTUzckLCBJUFY2QUREUkVTUzgkLCBJUFY2QUREUkVTUzkkXS5qb2luKFwifFwiKSksXG4gICAgICAgIFpPTkVJRCQgPSBzdWJleHAoc3ViZXhwKFVOUkVTRVJWRUQkJCArIFwifFwiICsgUENUX0VOQ09ERUQkKSArIFwiK1wiKSxcbiAgICAgICAgLy9SRkMgNjg3NFxuICAgIElQVjZBRERSWiQgPSBzdWJleHAoSVBWNkFERFJFU1MkICsgXCJcXFxcJTI1XCIgKyBaT05FSUQkKSxcbiAgICAgICAgLy9SRkMgNjg3NFxuICAgIElQVjZBRERSWl9SRUxBWEVEJCA9IHN1YmV4cChJUFY2QUREUkVTUyQgKyBzdWJleHAoXCJcXFxcJTI1fFxcXFwlKD8hXCIgKyBIRVhESUckJCArIFwiezJ9KVwiKSArIFpPTkVJRCQpLFxuICAgICAgICAvL1JGQyA2ODc0LCB3aXRoIHJlbGF4ZWQgcGFyc2luZyBydWxlc1xuICAgIElQVkZVVFVSRSQgPSBzdWJleHAoXCJbdlZdXCIgKyBIRVhESUckJCArIFwiK1xcXFwuXCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpdXCIpICsgXCIrXCIpLFxuICAgICAgICBJUF9MSVRFUkFMJCA9IHN1YmV4cChcIlxcXFxbXCIgKyBzdWJleHAoSVBWNkFERFJaX1JFTEFYRUQkICsgXCJ8XCIgKyBJUFY2QUREUkVTUyQgKyBcInxcIiArIElQVkZVVFVSRSQpICsgXCJcXFxcXVwiKSxcbiAgICAgICAgLy9SRkMgNjg3NFxuICAgIFJFR19OQU1FJCA9IHN1YmV4cChzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCkpICsgXCIqXCIpLFxuICAgICAgICBIT1NUJCA9IHN1YmV4cChJUF9MSVRFUkFMJCArIFwifFwiICsgSVBWNEFERFJFU1MkICsgXCIoPyFcIiArIFJFR19OQU1FJCArIFwiKVwiICsgXCJ8XCIgKyBSRUdfTkFNRSQpLFxuICAgICAgICBQT1JUJCA9IHN1YmV4cChESUdJVCQkICsgXCIqXCIpLFxuICAgICAgICBBVVRIT1JJVFkkID0gc3ViZXhwKHN1YmV4cChVU0VSSU5GTyQgKyBcIkBcIikgKyBcIj9cIiArIEhPU1QkICsgc3ViZXhwKFwiXFxcXDpcIiArIFBPUlQkKSArIFwiP1wiKSxcbiAgICAgICAgUENIQVIkID0gc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XFxcXEBdXCIpKSxcbiAgICAgICAgU0VHTUVOVCQgPSBzdWJleHAoUENIQVIkICsgXCIqXCIpLFxuICAgICAgICBTRUdNRU5UX05aJCA9IHN1YmV4cChQQ0hBUiQgKyBcIitcIiksXG4gICAgICAgIFNFR01FTlRfTlpfTkMkID0gc3ViZXhwKHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcQF1cIikpICsgXCIrXCIpLFxuICAgICAgICBQQVRIX0FCRU1QVFkkID0gc3ViZXhwKHN1YmV4cChcIlxcXFwvXCIgKyBTRUdNRU5UJCkgKyBcIipcIiksXG4gICAgICAgIFBBVEhfQUJTT0xVVEUkID0gc3ViZXhwKFwiXFxcXC9cIiArIHN1YmV4cChTRUdNRU5UX05aJCArIFBBVEhfQUJFTVBUWSQpICsgXCI/XCIpLFxuICAgICAgICAvL3NpbXBsaWZpZWRcbiAgICBQQVRIX05PU0NIRU1FJCA9IHN1YmV4cChTRUdNRU5UX05aX05DJCArIFBBVEhfQUJFTVBUWSQpLFxuICAgICAgICAvL3NpbXBsaWZpZWRcbiAgICBQQVRIX1JPT1RMRVNTJCA9IHN1YmV4cChTRUdNRU5UX05aJCArIFBBVEhfQUJFTVBUWSQpLFxuICAgICAgICAvL3NpbXBsaWZpZWRcbiAgICBQQVRIX0VNUFRZJCA9IFwiKD8hXCIgKyBQQ0hBUiQgKyBcIilcIixcbiAgICAgICAgUEFUSCQgPSBzdWJleHAoUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfTk9TQ0hFTUUkICsgXCJ8XCIgKyBQQVRIX1JPT1RMRVNTJCArIFwifFwiICsgUEFUSF9FTVBUWSQpLFxuICAgICAgICBRVUVSWSQgPSBzdWJleHAoc3ViZXhwKFBDSEFSJCArIFwifFwiICsgbWVyZ2UoXCJbXFxcXC9cXFxcP11cIiwgSVBSSVZBVEUkJCkpICsgXCIqXCIpLFxuICAgICAgICBGUkFHTUVOVCQgPSBzdWJleHAoc3ViZXhwKFBDSEFSJCArIFwifFtcXFxcL1xcXFw/XVwiKSArIFwiKlwiKSxcbiAgICAgICAgSElFUl9QQVJUJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvXCIgKyBBVVRIT1JJVFkkICsgUEFUSF9BQkVNUFRZJCkgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX1JPT1RMRVNTJCArIFwifFwiICsgUEFUSF9FTVBUWSQpLFxuICAgICAgICBVUkkkID0gc3ViZXhwKFNDSEVNRSQgKyBcIlxcXFw6XCIgKyBISUVSX1BBUlQkICsgc3ViZXhwKFwiXFxcXD9cIiArIFFVRVJZJCkgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjXCIgKyBGUkFHTUVOVCQpICsgXCI/XCIpLFxuICAgICAgICBSRUxBVElWRV9QQVJUJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvXCIgKyBBVVRIT1JJVFkkICsgUEFUSF9BQkVNUFRZJCkgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX05PU0NIRU1FJCArIFwifFwiICsgUEFUSF9FTVBUWSQpLFxuICAgICAgICBSRUxBVElWRSQgPSBzdWJleHAoUkVMQVRJVkVfUEFSVCQgKyBzdWJleHAoXCJcXFxcP1wiICsgUVVFUlkkKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCNcIiArIEZSQUdNRU5UJCkgKyBcIj9cIiksXG4gICAgICAgIFVSSV9SRUZFUkVOQ0UkID0gc3ViZXhwKFVSSSQgKyBcInxcIiArIFJFTEFUSVZFJCksXG4gICAgICAgIEFCU09MVVRFX1VSSSQgPSBzdWJleHAoU0NIRU1FJCArIFwiXFxcXDpcIiArIEhJRVJfUEFSVCQgKyBzdWJleHAoXCJcXFxcP1wiICsgUVVFUlkkKSArIFwiP1wiKSxcbiAgICAgICAgR0VORVJJQ19SRUYkID0gXCJeKFwiICsgU0NIRU1FJCArIFwiKVxcXFw6XCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcLyhcIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPylcIikgKyBcIj8oXCIgKyBQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkICsgXCIpXCIpICsgc3ViZXhwKFwiXFxcXD8oXCIgKyBRVUVSWSQgKyBcIilcIikgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjKFwiICsgRlJBR01FTlQkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBSRUxBVElWRV9SRUYkID0gXCJeKCl7MH1cIiArIHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvKFwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/KVwiKSArIFwiPyhcIiArIFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX05PU0NIRU1FJCArIFwifFwiICsgUEFUSF9FTVBUWSQgKyBcIilcIikgKyBzdWJleHAoXCJcXFxcPyhcIiArIFFVRVJZJCArIFwiKVwiKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCMoXCIgKyBGUkFHTUVOVCQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIEFCU09MVVRFX1JFRiQgPSBcIl4oXCIgKyBTQ0hFTUUkICsgXCIpXFxcXDpcIiArIHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvKFwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/KVwiKSArIFwiPyhcIiArIFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX1JPT1RMRVNTJCArIFwifFwiICsgUEFUSF9FTVBUWSQgKyBcIilcIikgKyBzdWJleHAoXCJcXFxcPyhcIiArIFFVRVJZJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgU0FNRURPQ19SRUYkID0gXCJeXCIgKyBzdWJleHAoXCJcXFxcIyhcIiArIEZSQUdNRU5UJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgQVVUSE9SSVRZX1JFRiQgPSBcIl5cIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPyRcIjtcbiAgICByZXR1cm4ge1xuICAgICAgICBOT1RfU0NIRU1FOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIEFMUEhBJCQsIERJR0lUJCQsIFwiW1xcXFwrXFxcXC1cXFxcLl1cIiksIFwiZ1wiKSxcbiAgICAgICAgTk9UX1VTRVJJTkZPOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFw6XVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX0hPU1Q6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXFxcXFtcXFxcXVxcXFw6XVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX1BBVEg6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXFxcXC9cXFxcOlxcXFxAXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX1BBVEhfTk9TQ0hFTUU6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXFxcXC9cXFxcQF1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9RVUVSWTogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOlxcXFxAXFxcXC9cXFxcP11cIiwgSVBSSVZBVEUkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX0ZSQUdNRU5UOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJV1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XFxcXEBcXFxcL1xcXFw/XVwiKSwgXCJnXCIpLFxuICAgICAgICBFU0NBUEU6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIFVOUkVTRVJWRUQ6IG5ldyBSZWdFeHAoVU5SRVNFUlZFRCQkLCBcImdcIiksXG4gICAgICAgIE9USEVSX0NIQVJTOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJV1cIiwgVU5SRVNFUlZFRCQkLCBSRVNFUlZFRCQkKSwgXCJnXCIpLFxuICAgICAgICBQQ1RfRU5DT0RFRDogbmV3IFJlZ0V4cChQQ1RfRU5DT0RFRCQsIFwiZ1wiKSxcbiAgICAgICAgSVBWNEFERFJFU1M6IG5ldyBSZWdFeHAoXCJeKFwiICsgSVBWNEFERFJFU1MkICsgXCIpJFwiKSxcbiAgICAgICAgSVBWNkFERFJFU1M6IG5ldyBSZWdFeHAoXCJeXFxcXFs/KFwiICsgSVBWNkFERFJFU1MkICsgXCIpXCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXCUyNXxcXFxcJSg/IVwiICsgSEVYRElHJCQgKyBcInsyfSlcIikgKyBcIihcIiArIFpPTkVJRCQgKyBcIilcIikgKyBcIj9cXFxcXT8kXCIpIC8vUkZDIDY4NzQsIHdpdGggcmVsYXhlZCBwYXJzaW5nIHJ1bGVzXG4gICAgfTtcbn1cbnZhciBVUklfUFJPVE9DT0wgPSBidWlsZEV4cHMoZmFsc2UpO1xuXG52YXIgSVJJX1BST1RPQ09MID0gYnVpbGRFeHBzKHRydWUpO1xuXG52YXIgc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIHRvQ29uc3VtYWJsZUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XG4gIH1cbn07XG5cbi8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblxudmFyIG1heEludCA9IDIxNDc0ODM2NDc7IC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuLyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xudmFyIGJhc2UgPSAzNjtcbnZhciB0TWluID0gMTtcbnZhciB0TWF4ID0gMjY7XG52YXIgc2tldyA9IDM4O1xudmFyIGRhbXAgPSA3MDA7XG52YXIgaW5pdGlhbEJpYXMgPSA3MjtcbnZhciBpbml0aWFsTiA9IDEyODsgLy8gMHg4MFxudmFyIGRlbGltaXRlciA9ICctJzsgLy8gJ1xceDJEJ1xuXG4vKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xudmFyIHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vO1xudmFyIHJlZ2V4Tm9uQVNDSUkgPSAvW15cXDAtXFx4N0VdLzsgLy8gbm9uLUFTQ0lJIGNoYXJzXG52YXIgcmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZzsgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG4vKiogRXJyb3IgbWVzc2FnZXMgKi9cbnZhciBlcnJvcnMgPSB7XG5cdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG59O1xuXG4vKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG52YXIgYmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gZXJyb3IkMSh0eXBlKSB7XG5cdHRocm93IG5ldyBSYW5nZUVycm9yKGVycm9yc1t0eXBlXSk7XG59XG5cbi8qKlxuICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuICogaXRlbS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcbiAqIGFkZHJlc3Nlcy5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG4gKiBjaGFyYWN0ZXIuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuICogZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdC8vIHRoZSBsb2NhbCBwYXJ0IChpLmUuIGV2ZXJ5dGhpbmcgdXAgdG8gYEBgKSBpbnRhY3QuXG5cdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdH1cblx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHR2YXIgbGFiZWxzID0gc3RyaW5nLnNwbGl0KCcuJyk7XG5cdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcbiAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuICogbWF0Y2hpbmcgVVRGLTE2LlxuICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG4gKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cbiAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG4gKiBAbmFtZSBkZWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG4gKi9cbmZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdHZhciBvdXRwdXQgPSBbXTtcblx0dmFyIGNvdW50ZXIgPSAwO1xuXHR2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHR2YXIgdmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdC8vIEl0J3MgYSBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXIuXG5cdFx0XHR2YXIgZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7XG5cdFx0XHRcdC8vIExvdyBzdXJyb2dhdGUuXG5cdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJdCdzIGFuIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZVxuXHRcdFx0XHQvLyBuZXh0IGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpci5cblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dHB1dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG4gKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcbiAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG4gKiBAbmFtZSBlbmNvZGVcbiAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG4gKi9cbnZhciB1Y3MyZW5jb2RlID0gZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRyZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQuYXBwbHkoU3RyaW5nLCB0b0NvbnN1bWFibGVBcnJheShhcnJheSkpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG4gKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cbiAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcbiAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuICovXG52YXIgYmFzaWNUb0RpZ2l0ID0gZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRpZiAoY29kZVBvaW50IC0gMHgzMCA8IDB4MEEpIHtcblx0XHRyZXR1cm4gY29kZVBvaW50IC0gMHgxNjtcblx0fVxuXHRpZiAoY29kZVBvaW50IC0gMHg0MSA8IDB4MUEpIHtcblx0XHRyZXR1cm4gY29kZVBvaW50IC0gMHg0MTtcblx0fVxuXHRpZiAoY29kZVBvaW50IC0gMHg2MSA8IDB4MUEpIHtcblx0XHRyZXR1cm4gY29kZVBvaW50IC0gMHg2MTtcblx0fVxuXHRyZXR1cm4gYmFzZTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG4gKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG4gKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cbiAqL1xudmFyIGRpZ2l0VG9CYXNpYyA9IGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcbn07XG5cbi8qKlxuICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgYWRhcHQgPSBmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0dmFyIGsgPSAwO1xuXHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdGZvciAoOyAvKiBubyBpbml0aWFsaXphdGlvbiAqL2RlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHR9XG5cdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuICogc3ltYm9scy5cbiAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuICovXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdC8vIERvbid0IHVzZSBVQ1MtMi5cblx0dmFyIG91dHB1dCA9IFtdO1xuXHR2YXIgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdHZhciBpID0gMDtcblx0dmFyIG4gPSBpbml0aWFsTjtcblx0dmFyIGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0dmFyIGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdGJhc2ljID0gMDtcblx0fVxuXG5cdGZvciAodmFyIGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdGVycm9yJDEoJ25vdC1iYXNpYycpO1xuXHRcdH1cblx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0fVxuXG5cdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRmb3IgKHZhciBpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7KSAvKiBubyBmaW5hbCBleHByZXNzaW9uICove1xuXG5cdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHR2YXIgb2xkaSA9IGk7XG5cdFx0Zm9yICh2YXIgdyA9IDEsIGsgPSBiYXNlOzsgLyogbm8gY29uZGl0aW9uICovayArPSBiYXNlKSB7XG5cblx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRlcnJvciQxKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdHZhciB0ID0gayA8PSBiaWFzID8gdE1pbiA6IGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXM7XG5cblx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblx0XHR9XG5cblx0XHR2YXIgb3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHR9XG5cblx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdGkgJT0gb3V0O1xuXG5cdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dC5cblx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cdH1cblxuXHRyZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQuYXBwbHkoU3RyaW5nLCBvdXRwdXQpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICovXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdHZhciBvdXRwdXQgPSBbXTtcblxuXHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBhbiBhcnJheSBvZiBVbmljb2RlIGNvZGUgcG9pbnRzLlxuXHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdC8vIENhY2hlIHRoZSBsZW5ndGguXG5cdHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZS5cblx0dmFyIG4gPSBpbml0aWFsTjtcblx0dmFyIGRlbHRhID0gMDtcblx0dmFyIGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzLlxuXHR2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG5cdHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuXHR2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cblx0dHJ5IHtcblx0XHRmb3IgKHZhciBfaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcblx0XHRcdHZhciBfY3VycmVudFZhbHVlMiA9IF9zdGVwLnZhbHVlO1xuXG5cdFx0XHRpZiAoX2N1cnJlbnRWYWx1ZTIgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShfY3VycmVudFZhbHVlMikpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0X2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuXHRcdF9pdGVyYXRvckVycm9yID0gZXJyO1xuXHR9IGZpbmFsbHkge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuXHRcdFx0XHRfaXRlcmF0b3IucmV0dXJuKCk7XG5cdFx0XHR9XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuXHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR2YXIgYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXHR2YXIgaGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aDtcblxuXHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIHdpdGggYSBkZWxpbWl0ZXIgdW5sZXNzIGl0J3MgZW1wdHkuXG5cdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdH1cblxuXHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHR2YXIgbSA9IG1heEludDtcblx0XHR2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuXHRcdHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcblx0XHR2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGZvciAodmFyIF9pdGVyYXRvcjIgPSBpbnB1dFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuXHRcdFx0XHR2YXIgY3VycmVudFZhbHVlID0gX3N0ZXAyLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvdy5cblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG5cdFx0XHRfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcblx0XHRcdFx0XHRfaXRlcmF0b3IyLnJldHVybigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG5cdFx0XHRcdFx0dGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHR9XG5cblx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdG4gPSBtO1xuXG5cdFx0dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcblx0XHR2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG5cdFx0dmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKHZhciBfaXRlcmF0b3IzID0gaW5wdXRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcblx0XHRcdFx0dmFyIF9jdXJyZW50VmFsdWUgPSBfc3RlcDMudmFsdWU7XG5cblx0XHRcdFx0aWYgKF9jdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChfY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlci5cblx0XHRcdFx0XHR2YXIgcSA9IGRlbHRhO1xuXHRcdFx0XHRcdGZvciAodmFyIGsgPSBiYXNlOzsgLyogbm8gY29uZGl0aW9uICovayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiBrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdHZhciBiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpKTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG5cdFx0XHRfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcblx0XHRcdFx0XHRfaXRlcmF0b3IzLnJldHVybigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG5cdFx0XHRcdFx0dGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0KytkZWx0YTtcblx0XHQrK247XG5cdH1cblx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuICogaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuXG4gKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cbiAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZWQgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0b1xuICogY29udmVydCB0byBVbmljb2RlLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG4gKiBzdHJpbmcuXG4gKi9cbnZhciB0b1VuaWNvZGUgPSBmdW5jdGlvbiB0b1VuaWNvZGUoaW5wdXQpIHtcblx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKSA/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSkgOiBzdHJpbmc7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cbiAqIFB1bnljb2RlLiBPbmx5IHRoZSBub24tQVNDSUkgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLFxuICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG4gKiBBU0NJSS5cbiAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcbiAqIFVuaWNvZGUgc3RyaW5nLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZSBvclxuICogZW1haWwgYWRkcmVzcy5cbiAqL1xudmFyIHRvQVNDSUkgPSBmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZykgPyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKSA6IHN0cmluZztcblx0fSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xudmFyIHB1bnljb2RlID0ge1xuXHQvKipcbiAgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG4gICogQG1lbWJlck9mIHB1bnljb2RlXG4gICogQHR5cGUgU3RyaW5nXG4gICovXG5cdCd2ZXJzaW9uJzogJzIuMS4wJyxcblx0LyoqXG4gICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcbiAgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuICAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuICAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICAqIEB0eXBlIE9iamVjdFxuICAqL1xuXHQndWNzMic6IHtcblx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHR9LFxuXHQnZGVjb2RlJzogZGVjb2RlLFxuXHQnZW5jb2RlJzogZW5jb2RlLFxuXHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcbn07XG5cbi8qKlxuICogVVJJLmpzXG4gKlxuICogQGZpbGVvdmVydmlldyBBbiBSRkMgMzk4NiBjb21wbGlhbnQsIHNjaGVtZSBleHRlbmRhYmxlIFVSSSBwYXJzaW5nL3ZhbGlkYXRpbmcvcmVzb2x2aW5nIGxpYnJhcnkgZm9yIEphdmFTY3JpcHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86Z2FyeS5jb3VydEBnbWFpbC5jb21cIj5HYXJ5IENvdXJ0PC9hPlxuICogQHNlZSBodHRwOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvdXJpLWpzXG4gKi9cbi8qKlxuICogQ29weXJpZ2h0IDIwMTEgR2FyeSBDb3VydC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBhcmVcbiAqIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqICAgIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mXG4gKiAgICAgICBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKlxuICogICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3RcbiAqICAgICAgIG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzXG4gKiAgICAgICBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBHQVJZIENPVVJUIGBgQVMgSVMnJyBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRFxuICogV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEdBUlkgQ09VUlQgT1JcbiAqIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SXG4gKiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG4gKiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HXG4gKiBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUZcbiAqIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqIFRoZSB2aWV3cyBhbmQgY29uY2x1c2lvbnMgY29udGFpbmVkIGluIHRoZSBzb2Z0d2FyZSBhbmQgZG9jdW1lbnRhdGlvbiBhcmUgdGhvc2Ugb2YgdGhlXG4gKiBhdXRob3JzIGFuZCBzaG91bGQgbm90IGJlIGludGVycHJldGVkIGFzIHJlcHJlc2VudGluZyBvZmZpY2lhbCBwb2xpY2llcywgZWl0aGVyIGV4cHJlc3NlZFxuICogb3IgaW1wbGllZCwgb2YgR2FyeSBDb3VydC5cbiAqL1xudmFyIFNDSEVNRVMgPSB7fTtcbmZ1bmN0aW9uIHBjdEVuY0NoYXIoY2hyKSB7XG4gICAgdmFyIGMgPSBjaHIuY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgZSA9IHZvaWQgMDtcbiAgICBpZiAoYyA8IDE2KSBlID0gXCIlMFwiICsgYy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtlbHNlIGlmIChjIDwgMTI4KSBlID0gXCIlXCIgKyBjLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO2Vsc2UgaWYgKGMgPCAyMDQ4KSBlID0gXCIlXCIgKyAoYyA+PiA2IHwgMTkyKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiJVwiICsgKGMgJiA2MyB8IDEyOCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7ZWxzZSBlID0gXCIlXCIgKyAoYyA+PiAxMiB8IDIyNCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIiVcIiArIChjID4+IDYgJiA2MyB8IDEyOCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIiVcIiArIChjICYgNjMgfCAxMjgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gcGN0RGVjQ2hhcnMoc3RyKSB7XG4gICAgdmFyIG5ld1N0ciA9IFwiXCI7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBpbCA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGkgPCBpbCkge1xuICAgICAgICB2YXIgYyA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDEsIDIpLCAxNik7XG4gICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgICBuZXdTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgfSBlbHNlIGlmIChjID49IDE5NCAmJiBjIDwgMjI0KSB7XG4gICAgICAgICAgICBpZiAoaWwgLSBpID49IDYpIHtcbiAgICAgICAgICAgICAgICB2YXIgYzIgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyA0LCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMzEpIDw8IDYgfCBjMiAmIDYzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IHN0ci5zdWJzdHIoaSwgNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDY7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA+PSAyMjQpIHtcbiAgICAgICAgICAgIGlmIChpbCAtIGkgPj0gOSkge1xuICAgICAgICAgICAgICAgIHZhciBfYyA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDQsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgdmFyIGMzID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgNywgMiksIDE2KTtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDE1KSA8PCAxMiB8IChfYyAmIDYzKSA8PCA2IHwgYzMgJiA2Myk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBzdHIuc3Vic3RyKGksIDkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSArPSA5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U3RyICs9IHN0ci5zdWJzdHIoaSwgMyk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0cjtcbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemVDb21wb25lbnRFbmNvZGluZyhjb21wb25lbnRzLCBwcm90b2NvbCkge1xuICAgIGZ1bmN0aW9uIGRlY29kZVVucmVzZXJ2ZWQoc3RyKSB7XG4gICAgICAgIHZhciBkZWNTdHIgPSBwY3REZWNDaGFycyhzdHIpO1xuICAgICAgICByZXR1cm4gIWRlY1N0ci5tYXRjaChwcm90b2NvbC5VTlJFU0VSVkVEKSA/IHN0ciA6IGRlY1N0cjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMuc2NoZW1lKSBjb21wb25lbnRzLnNjaGVtZSA9IFN0cmluZyhjb21wb25lbnRzLnNjaGVtZSkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKHByb3RvY29sLk5PVF9TQ0hFTUUsIFwiXCIpO1xuICAgIGlmIChjb21wb25lbnRzLnVzZXJpbmZvICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMudXNlcmluZm8gPSBTdHJpbmcoY29tcG9uZW50cy51c2VyaW5mbykucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShwcm90b2NvbC5OT1RfVVNFUklORk8sIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5ob3N0ICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMuaG9zdCA9IFN0cmluZyhjb21wb25lbnRzLmhvc3QpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnRvTG93ZXJDYXNlKCkucmVwbGFjZShwcm90b2NvbC5OT1RfSE9TVCwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLnBhdGggIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5wYXRoID0gU3RyaW5nKGNvbXBvbmVudHMucGF0aCkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShjb21wb25lbnRzLnNjaGVtZSA/IHByb3RvY29sLk5PVF9QQVRIIDogcHJvdG9jb2wuTk9UX1BBVEhfTk9TQ0hFTUUsIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5xdWVyeSAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLnF1ZXJ5ID0gU3RyaW5nKGNvbXBvbmVudHMucXVlcnkpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UocHJvdG9jb2wuTk9UX1FVRVJZLCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5mcmFnbWVudCA9IFN0cmluZyhjb21wb25lbnRzLmZyYWdtZW50KS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKHByb3RvY29sLk5PVF9GUkFHTUVOVCwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIHJldHVybiBjb21wb25lbnRzO1xufVxuXG5mdW5jdGlvbiBfc3RyaXBMZWFkaW5nWmVyb3Moc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eMCooLiopLywgXCIkMVwiKSB8fCBcIjBcIjtcbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemVJUHY0KGhvc3QsIHByb3RvY29sKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBob3N0Lm1hdGNoKHByb3RvY29sLklQVjRBRERSRVNTKSB8fCBbXTtcblxuICAgIHZhciBfbWF0Y2hlcyA9IHNsaWNlZFRvQXJyYXkobWF0Y2hlcywgMiksXG4gICAgICAgIGFkZHJlc3MgPSBfbWF0Y2hlc1sxXTtcblxuICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiBhZGRyZXNzLnNwbGl0KFwiLlwiKS5tYXAoX3N0cmlwTGVhZGluZ1plcm9zKS5qb2luKFwiLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplSVB2Nihob3N0LCBwcm90b2NvbCkge1xuICAgIHZhciBtYXRjaGVzID0gaG9zdC5tYXRjaChwcm90b2NvbC5JUFY2QUREUkVTUykgfHwgW107XG5cbiAgICB2YXIgX21hdGNoZXMyID0gc2xpY2VkVG9BcnJheShtYXRjaGVzLCAzKSxcbiAgICAgICAgYWRkcmVzcyA9IF9tYXRjaGVzMlsxXSxcbiAgICAgICAgem9uZSA9IF9tYXRjaGVzMlsyXTtcblxuICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgIHZhciBfYWRkcmVzcyR0b0xvd2VyQ2FzZSQgPSBhZGRyZXNzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJzo6JykucmV2ZXJzZSgpLFxuICAgICAgICAgICAgX2FkZHJlc3MkdG9Mb3dlckNhc2UkMiA9IHNsaWNlZFRvQXJyYXkoX2FkZHJlc3MkdG9Mb3dlckNhc2UkLCAyKSxcbiAgICAgICAgICAgIGxhc3QgPSBfYWRkcmVzcyR0b0xvd2VyQ2FzZSQyWzBdLFxuICAgICAgICAgICAgZmlyc3QgPSBfYWRkcmVzcyR0b0xvd2VyQ2FzZSQyWzFdO1xuXG4gICAgICAgIHZhciBmaXJzdEZpZWxkcyA9IGZpcnN0ID8gZmlyc3Quc3BsaXQoXCI6XCIpLm1hcChfc3RyaXBMZWFkaW5nWmVyb3MpIDogW107XG4gICAgICAgIHZhciBsYXN0RmllbGRzID0gbGFzdC5zcGxpdChcIjpcIikubWFwKF9zdHJpcExlYWRpbmdaZXJvcyk7XG4gICAgICAgIHZhciBpc0xhc3RGaWVsZElQdjRBZGRyZXNzID0gcHJvdG9jb2wuSVBWNEFERFJFU1MudGVzdChsYXN0RmllbGRzW2xhc3RGaWVsZHMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB2YXIgZmllbGRDb3VudCA9IGlzTGFzdEZpZWxkSVB2NEFkZHJlc3MgPyA3IDogODtcbiAgICAgICAgdmFyIGxhc3RGaWVsZHNTdGFydCA9IGxhc3RGaWVsZHMubGVuZ3RoIC0gZmllbGRDb3VudDtcbiAgICAgICAgdmFyIGZpZWxkcyA9IEFycmF5KGZpZWxkQ291bnQpO1xuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGZpZWxkQ291bnQ7ICsreCkge1xuICAgICAgICAgICAgZmllbGRzW3hdID0gZmlyc3RGaWVsZHNbeF0gfHwgbGFzdEZpZWxkc1tsYXN0RmllbGRzU3RhcnQgKyB4XSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNMYXN0RmllbGRJUHY0QWRkcmVzcykge1xuICAgICAgICAgICAgZmllbGRzW2ZpZWxkQ291bnQgLSAxXSA9IF9ub3JtYWxpemVJUHY0KGZpZWxkc1tmaWVsZENvdW50IC0gMV0sIHByb3RvY29sKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWxsWmVyb0ZpZWxkcyA9IGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWZpZWxkIHx8IGZpZWxkID09PSBcIjBcIikge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0TG9uZ2VzdCA9IGFjY1thY2MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RMb25nZXN0ICYmIGxhc3RMb25nZXN0LmluZGV4ICsgbGFzdExvbmdlc3QubGVuZ3RoID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0TG9uZ2VzdC5sZW5ndGgrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY2MucHVzaCh7IGluZGV4OiBpbmRleCwgbGVuZ3RoOiAxIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgdmFyIGxvbmdlc3RaZXJvRmllbGRzID0gYWxsWmVyb0ZpZWxkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfSlbMF07XG4gICAgICAgIHZhciBuZXdIb3N0ID0gdm9pZCAwO1xuICAgICAgICBpZiAobG9uZ2VzdFplcm9GaWVsZHMgJiYgbG9uZ2VzdFplcm9GaWVsZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIG5ld0ZpcnN0ID0gZmllbGRzLnNsaWNlKDAsIGxvbmdlc3RaZXJvRmllbGRzLmluZGV4KTtcbiAgICAgICAgICAgIHZhciBuZXdMYXN0ID0gZmllbGRzLnNsaWNlKGxvbmdlc3RaZXJvRmllbGRzLmluZGV4ICsgbG9uZ2VzdFplcm9GaWVsZHMubGVuZ3RoKTtcbiAgICAgICAgICAgIG5ld0hvc3QgPSBuZXdGaXJzdC5qb2luKFwiOlwiKSArIFwiOjpcIiArIG5ld0xhc3Quam9pbihcIjpcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIb3N0ID0gZmllbGRzLmpvaW4oXCI6XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh6b25lKSB7XG4gICAgICAgICAgICBuZXdIb3N0ICs9IFwiJVwiICsgem9uZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SG9zdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG59XG52YXIgVVJJX1BBUlNFID0gL14oPzooW146XFwvPyNdKyk6KT8oPzpcXC9cXC8oKD86KFteXFwvPyNAXSopQCk/KFxcW1teXFwvPyNcXF1dK1xcXXxbXlxcLz8jOl0qKSg/OlxcOihcXGQqKSk/KSk/KFtePyNdKikoPzpcXD8oW14jXSopKT8oPzojKCg/Oi58XFxufFxccikqKSk/L2k7XG52YXIgTk9fTUFUQ0hfSVNfVU5ERUZJTkVEID0gXCJcIi5tYXRjaCgvKCl7MH0vKVsxXSA9PT0gdW5kZWZpbmVkO1xuZnVuY3Rpb24gcGFyc2UodXJpU3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgdmFyIGNvbXBvbmVudHMgPSB7fTtcbiAgICB2YXIgcHJvdG9jb2wgPSBvcHRpb25zLmlyaSAhPT0gZmFsc2UgPyBJUklfUFJPVE9DT0wgOiBVUklfUFJPVE9DT0w7XG4gICAgaWYgKG9wdGlvbnMucmVmZXJlbmNlID09PSBcInN1ZmZpeFwiKSB1cmlTdHJpbmcgPSAob3B0aW9ucy5zY2hlbWUgPyBvcHRpb25zLnNjaGVtZSArIFwiOlwiIDogXCJcIikgKyBcIi8vXCIgKyB1cmlTdHJpbmc7XG4gICAgdmFyIG1hdGNoZXMgPSB1cmlTdHJpbmcubWF0Y2goVVJJX1BBUlNFKTtcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICBpZiAoTk9fTUFUQ0hfSVNfVU5ERUZJTkVEKSB7XG4gICAgICAgICAgICAvL3N0b3JlIGVhY2ggY29tcG9uZW50XG4gICAgICAgICAgICBjb21wb25lbnRzLnNjaGVtZSA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICBjb21wb25lbnRzLnVzZXJpbmZvID0gbWF0Y2hlc1szXTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IG1hdGNoZXNbNF07XG4gICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBwYXJzZUludChtYXRjaGVzWzVdLCAxMCk7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBhdGggPSBtYXRjaGVzWzZdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb21wb25lbnRzLnF1ZXJ5ID0gbWF0Y2hlc1s3XTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuZnJhZ21lbnQgPSBtYXRjaGVzWzhdO1xuICAgICAgICAgICAgLy9maXggcG9ydCBudW1iZXJcbiAgICAgICAgICAgIGlmIChpc05hTihjb21wb25lbnRzLnBvcnQpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gbWF0Y2hlc1s1XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vSUUgRklYIGZvciBpbXByb3BlciBSZWdFeHAgbWF0Y2hpbmdcbiAgICAgICAgICAgIC8vc3RvcmUgZWFjaCBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbXBvbmVudHMuc2NoZW1lID0gbWF0Y2hlc1sxXSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb21wb25lbnRzLnVzZXJpbmZvID0gdXJpU3RyaW5nLmluZGV4T2YoXCJAXCIpICE9PSAtMSA/IG1hdGNoZXNbM10gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSB1cmlTdHJpbmcuaW5kZXhPZihcIi8vXCIpICE9PSAtMSA/IG1hdGNoZXNbNF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBwYXJzZUludChtYXRjaGVzWzVdLCAxMCk7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBhdGggPSBtYXRjaGVzWzZdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb21wb25lbnRzLnF1ZXJ5ID0gdXJpU3RyaW5nLmluZGV4T2YoXCI/XCIpICE9PSAtMSA/IG1hdGNoZXNbN10gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb21wb25lbnRzLmZyYWdtZW50ID0gdXJpU3RyaW5nLmluZGV4T2YoXCIjXCIpICE9PSAtMSA/IG1hdGNoZXNbOF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAvL2ZpeCBwb3J0IG51bWJlclxuICAgICAgICAgICAgaWYgKGlzTmFOKGNvbXBvbmVudHMucG9ydCkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSB1cmlTdHJpbmcubWF0Y2goL1xcL1xcLyg/Oi58XFxuKSpcXDooPzpcXC98XFw/fFxcI3wkKS8pID8gbWF0Y2hlc1s0XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9uZW50cy5ob3N0KSB7XG4gICAgICAgICAgICAvL25vcm1hbGl6ZSBJUCBob3N0c1xuICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gX25vcm1hbGl6ZUlQdjYoX25vcm1hbGl6ZUlQdjQoY29tcG9uZW50cy5ob3N0LCBwcm90b2NvbCksIHByb3RvY29sKTtcbiAgICAgICAgfVxuICAgICAgICAvL2RldGVybWluZSByZWZlcmVuY2UgdHlwZVxuICAgICAgICBpZiAoY29tcG9uZW50cy5zY2hlbWUgPT09IHVuZGVmaW5lZCAmJiBjb21wb25lbnRzLnVzZXJpbmZvID09PSB1bmRlZmluZWQgJiYgY29tcG9uZW50cy5ob3N0ID09PSB1bmRlZmluZWQgJiYgY29tcG9uZW50cy5wb3J0ID09PSB1bmRlZmluZWQgJiYgIWNvbXBvbmVudHMucGF0aCAmJiBjb21wb25lbnRzLnF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJzYW1lLWRvY3VtZW50XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50cy5zY2hlbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50cy5mcmFnbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJ1cmlcIjtcbiAgICAgICAgfVxuICAgICAgICAvL2NoZWNrIGZvciByZWZlcmVuY2UgZXJyb3JzXG4gICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSAmJiBvcHRpb25zLnJlZmVyZW5jZSAhPT0gXCJzdWZmaXhcIiAmJiBvcHRpb25zLnJlZmVyZW5jZSAhPT0gY29tcG9uZW50cy5yZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiVVJJIGlzIG5vdCBhIFwiICsgb3B0aW9ucy5yZWZlcmVuY2UgKyBcIiByZWZlcmVuY2UuXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9maW5kIHNjaGVtZSBoYW5kbGVyXG4gICAgICAgIHZhciBzY2hlbWVIYW5kbGVyID0gU0NIRU1FU1sob3B0aW9ucy5zY2hlbWUgfHwgY29tcG9uZW50cy5zY2hlbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIC8vY2hlY2sgaWYgc2NoZW1lIGNhbid0IGhhbmRsZSBJUklzXG4gICAgICAgIGlmICghb3B0aW9ucy51bmljb2RlU3VwcG9ydCAmJiAoIXNjaGVtZUhhbmRsZXIgfHwgIXNjaGVtZUhhbmRsZXIudW5pY29kZVN1cHBvcnQpKSB7XG4gICAgICAgICAgICAvL2lmIGhvc3QgY29tcG9uZW50IGlzIGEgZG9tYWluIG5hbWVcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRzLmhvc3QgJiYgKG9wdGlvbnMuZG9tYWluSG9zdCB8fCBzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIuZG9tYWluSG9zdCkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgVW5pY29kZSBJRE4gLT4gQVNDSUkgSUROXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gcHVueWNvZGUudG9BU0NJSShjb21wb25lbnRzLmhvc3QucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgcGN0RGVjQ2hhcnMpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJIb3N0J3MgZG9tYWluIG5hbWUgY2FuIG5vdCBiZSBjb252ZXJ0ZWQgdG8gQVNDSUkgdmlhIHB1bnljb2RlOiBcIiArIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb252ZXJ0IElSSSAtPiBVUklcbiAgICAgICAgICAgIF9ub3JtYWxpemVDb21wb25lbnRFbmNvZGluZyhjb21wb25lbnRzLCBVUklfUFJPVE9DT0wpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9ub3JtYWxpemUgZW5jb2RpbmdzXG4gICAgICAgICAgICBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgICAgIC8vcGVyZm9ybSBzY2hlbWUgc3BlY2lmaWMgcGFyc2luZ1xuICAgICAgICBpZiAoc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLnBhcnNlKSB7XG4gICAgICAgICAgICBzY2hlbWVIYW5kbGVyLnBhcnNlKGNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJVUkkgY2FuIG5vdCBiZSBwYXJzZWQuXCI7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnRzO1xufVxuXG5mdW5jdGlvbiBfcmVjb21wb3NlQXV0aG9yaXR5KGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSBvcHRpb25zLmlyaSAhPT0gZmFsc2UgPyBJUklfUFJPVE9DT0wgOiBVUklfUFJPVE9DT0w7XG4gICAgdmFyIHVyaVRva2VucyA9IFtdO1xuICAgIGlmIChjb21wb25lbnRzLnVzZXJpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy51c2VyaW5mbyk7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiQFwiKTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vbm9ybWFsaXplIElQIGhvc3RzLCBhZGQgYnJhY2tldHMgYW5kIGVzY2FwZSB6b25lIHNlcGFyYXRvciBmb3IgSVB2NlxuICAgICAgICB1cmlUb2tlbnMucHVzaChfbm9ybWFsaXplSVB2Nihfbm9ybWFsaXplSVB2NChTdHJpbmcoY29tcG9uZW50cy5ob3N0KSwgcHJvdG9jb2wpLCBwcm90b2NvbCkucmVwbGFjZShwcm90b2NvbC5JUFY2QUREUkVTUywgZnVuY3Rpb24gKF8sICQxLCAkMikge1xuICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgJDEgKyAoJDIgPyBcIiUyNVwiICsgJDIgOiBcIlwiKSArIFwiXVwiO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29tcG9uZW50cy5wb3J0ID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiBjb21wb25lbnRzLnBvcnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCI6XCIpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChTdHJpbmcoY29tcG9uZW50cy5wb3J0KSk7XG4gICAgfVxuICAgIHJldHVybiB1cmlUb2tlbnMubGVuZ3RoID8gdXJpVG9rZW5zLmpvaW4oXCJcIikgOiB1bmRlZmluZWQ7XG59XG5cbnZhciBSRFMxID0gL15cXC5cXC4/XFwvLztcbnZhciBSRFMyID0gL15cXC9cXC4oXFwvfCQpLztcbnZhciBSRFMzID0gL15cXC9cXC5cXC4oXFwvfCQpLztcbnZhciBSRFM1ID0gL15cXC8/KD86LnxcXG4pKj8oPz1cXC98JCkvO1xuZnVuY3Rpb24gcmVtb3ZlRG90U2VnbWVudHMoaW5wdXQpIHtcbiAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgICBpZiAoaW5wdXQubWF0Y2goUkRTMSkpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShSRFMxLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5tYXRjaChSRFMyKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKFJEUzIsIFwiL1wiKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5tYXRjaChSRFMzKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKFJEUzMsIFwiL1wiKTtcbiAgICAgICAgICAgIG91dHB1dC5wb3AoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dCA9PT0gXCIuXCIgfHwgaW5wdXQgPT09IFwiLi5cIikge1xuICAgICAgICAgICAgaW5wdXQgPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGltID0gaW5wdXQubWF0Y2goUkRTNSk7XG4gICAgICAgICAgICBpZiAoaW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGltWzBdO1xuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2Uocy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGRvdCBzZWdtZW50IGNvbmRpdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIik7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShjb21wb25lbnRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5pcmkgPyBJUklfUFJPVE9DT0wgOiBVUklfUFJPVE9DT0w7XG4gICAgdmFyIHVyaVRva2VucyA9IFtdO1xuICAgIC8vZmluZCBzY2hlbWUgaGFuZGxlclxuICAgIHZhciBzY2hlbWVIYW5kbGVyID0gU0NIRU1FU1sob3B0aW9ucy5zY2hlbWUgfHwgY29tcG9uZW50cy5zY2hlbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKV07XG4gICAgLy9wZXJmb3JtIHNjaGVtZSBzcGVjaWZpYyBzZXJpYWxpemF0aW9uXG4gICAgaWYgKHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5zZXJpYWxpemUpIHNjaGVtZUhhbmRsZXIuc2VyaWFsaXplKGNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgIGlmIChjb21wb25lbnRzLmhvc3QpIHtcbiAgICAgICAgLy9pZiBob3N0IGNvbXBvbmVudCBpcyBhbiBJUHY2IGFkZHJlc3NcbiAgICAgICAgaWYgKHByb3RvY29sLklQVjZBRERSRVNTLnRlc3QoY29tcG9uZW50cy5ob3N0KSkge31cbiAgICAgICAgLy9UT0RPOiBub3JtYWxpemUgSVB2NiBhZGRyZXNzIGFzIHBlciBSRkMgNTk1MlxuXG4gICAgICAgIC8vaWYgaG9zdCBjb21wb25lbnQgaXMgYSBkb21haW4gbmFtZVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRvbWFpbkhvc3QgfHwgc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLmRvbWFpbkhvc3QpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgSUROIHZpYSBwdW55Y29kZVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9ICFvcHRpb25zLmlyaSA/IHB1bnljb2RlLnRvQVNDSUkoY29tcG9uZW50cy5ob3N0LnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHBjdERlY0NoYXJzKS50b0xvd2VyQ2FzZSgpKSA6IHB1bnljb2RlLnRvVW5pY29kZShjb21wb25lbnRzLmhvc3QpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJIb3N0J3MgZG9tYWluIG5hbWUgY2FuIG5vdCBiZSBjb252ZXJ0ZWQgdG8gXCIgKyAoIW9wdGlvbnMuaXJpID8gXCJBU0NJSVwiIDogXCJVbmljb2RlXCIpICsgXCIgdmlhIHB1bnljb2RlOiBcIiArIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH1cbiAgICAvL25vcm1hbGl6ZSBlbmNvZGluZ1xuICAgIF9ub3JtYWxpemVDb21wb25lbnRFbmNvZGluZyhjb21wb25lbnRzLCBwcm90b2NvbCk7XG4gICAgaWYgKG9wdGlvbnMucmVmZXJlbmNlICE9PSBcInN1ZmZpeFwiICYmIGNvbXBvbmVudHMuc2NoZW1lKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMuc2NoZW1lKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCI6XCIpO1xuICAgIH1cbiAgICB2YXIgYXV0aG9yaXR5ID0gX3JlY29tcG9zZUF1dGhvcml0eShjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgICBpZiAoYXV0aG9yaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmZXJlbmNlICE9PSBcInN1ZmZpeFwiKSB7XG4gICAgICAgICAgICB1cmlUb2tlbnMucHVzaChcIi8vXCIpO1xuICAgICAgICB9XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGF1dGhvcml0eSk7XG4gICAgICAgIGlmIChjb21wb25lbnRzLnBhdGggJiYgY29tcG9uZW50cy5wYXRoLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHVyaVRva2Vucy5wdXNoKFwiL1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5wYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHMgPSBjb21wb25lbnRzLnBhdGg7XG4gICAgICAgIGlmICghb3B0aW9ucy5hYnNvbHV0ZVBhdGggJiYgKCFzY2hlbWVIYW5kbGVyIHx8ICFzY2hlbWVIYW5kbGVyLmFic29sdXRlUGF0aCkpIHtcbiAgICAgICAgICAgIHMgPSByZW1vdmVEb3RTZWdtZW50cyhzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aG9yaXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoL15cXC9cXC8vLCBcIi8lMkZcIik7IC8vZG9uJ3QgYWxsb3cgdGhlIHBhdGggdG8gc3RhcnQgd2l0aCBcIi8vXCJcbiAgICAgICAgfVxuICAgICAgICB1cmlUb2tlbnMucHVzaChzKTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMucXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIj9cIik7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMucXVlcnkpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiI1wiKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy5mcmFnbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB1cmlUb2tlbnMuam9pbihcIlwiKTsgLy9tZXJnZSB0b2tlbnMgaW50byBhIHN0cmluZ1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29tcG9uZW50cyhiYXNlLCByZWxhdGl2ZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICB2YXIgc2tpcE5vcm1hbGl6YXRpb24gPSBhcmd1bWVudHNbM107XG5cbiAgICB2YXIgdGFyZ2V0ID0ge307XG4gICAgaWYgKCFza2lwTm9ybWFsaXphdGlvbikge1xuICAgICAgICBiYXNlID0gcGFyc2Uoc2VyaWFsaXplKGJhc2UsIG9wdGlvbnMpLCBvcHRpb25zKTsgLy9ub3JtYWxpemUgYmFzZSBjb21wb25lbnRzXG4gICAgICAgIHJlbGF0aXZlID0gcGFyc2Uoc2VyaWFsaXplKHJlbGF0aXZlLCBvcHRpb25zKSwgb3B0aW9ucyk7IC8vbm9ybWFsaXplIHJlbGF0aXZlIGNvbXBvbmVudHNcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLnRvbGVyYW50ICYmIHJlbGF0aXZlLnNjaGVtZSkge1xuICAgICAgICB0YXJnZXQuc2NoZW1lID0gcmVsYXRpdmUuc2NoZW1lO1xuICAgICAgICAvL3RhcmdldC5hdXRob3JpdHkgPSByZWxhdGl2ZS5hdXRob3JpdHk7XG4gICAgICAgIHRhcmdldC51c2VyaW5mbyA9IHJlbGF0aXZlLnVzZXJpbmZvO1xuICAgICAgICB0YXJnZXQuaG9zdCA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIHRhcmdldC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWxhdGl2ZS5wYXRoIHx8IFwiXCIpO1xuICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVsYXRpdmUudXNlcmluZm8gIT09IHVuZGVmaW5lZCB8fCByZWxhdGl2ZS5ob3N0ICE9PSB1bmRlZmluZWQgfHwgcmVsYXRpdmUucG9ydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL3RhcmdldC5hdXRob3JpdHkgPSByZWxhdGl2ZS5hdXRob3JpdHk7XG4gICAgICAgICAgICB0YXJnZXQudXNlcmluZm8gPSByZWxhdGl2ZS51c2VyaW5mbztcbiAgICAgICAgICAgIHRhcmdldC5ob3N0ID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgICAgIHRhcmdldC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVsYXRpdmUucGF0aCB8fCBcIlwiKTtcbiAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFyZWxhdGl2ZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSBiYXNlLnBhdGg7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlLnF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZS5wYXRoLmNoYXJBdCgwKSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWxhdGl2ZS5wYXRoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGJhc2UudXNlcmluZm8gIT09IHVuZGVmaW5lZCB8fCBiYXNlLmhvc3QgIT09IHVuZGVmaW5lZCB8fCBiYXNlLnBvcnQgIT09IHVuZGVmaW5lZCkgJiYgIWJhc2UucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSBcIi9cIiArIHJlbGF0aXZlLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWJhc2UucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZWxhdGl2ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSBiYXNlLnBhdGguc2xpY2UoMCwgYmFzZS5wYXRoLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpICsgcmVsYXRpdmUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHRhcmdldC5wYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RhcmdldC5hdXRob3JpdHkgPSBiYXNlLmF1dGhvcml0eTtcbiAgICAgICAgICAgIHRhcmdldC51c2VyaW5mbyA9IGJhc2UudXNlcmluZm87XG4gICAgICAgICAgICB0YXJnZXQuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHRhcmdldC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICB9XG4gICAgdGFyZ2V0LmZyYWdtZW50ID0gcmVsYXRpdmUuZnJhZ21lbnQ7XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShiYXNlVVJJLCByZWxhdGl2ZVVSSSwgb3B0aW9ucykge1xuICAgIHZhciBzY2hlbWVsZXNzT3B0aW9ucyA9IGFzc2lnbih7IHNjaGVtZTogJ251bGwnIH0sIG9wdGlvbnMpO1xuICAgIHJldHVybiBzZXJpYWxpemUocmVzb2x2ZUNvbXBvbmVudHMocGFyc2UoYmFzZVVSSSwgc2NoZW1lbGVzc09wdGlvbnMpLCBwYXJzZShyZWxhdGl2ZVVSSSwgc2NoZW1lbGVzc09wdGlvbnMpLCBzY2hlbWVsZXNzT3B0aW9ucywgdHJ1ZSksIHNjaGVtZWxlc3NPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHVyaSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaSA9IHNlcmlhbGl6ZShwYXJzZSh1cmksIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZih1cmkpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHVyaSA9IHBhcnNlKHNlcmlhbGl6ZSh1cmksIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaTtcbn1cblxuZnVuY3Rpb24gZXF1YWwodXJpQSwgdXJpQiwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgdXJpQSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmlBID0gc2VyaWFsaXplKHBhcnNlKHVyaUEsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZih1cmlBKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB1cmlBID0gc2VyaWFsaXplKHVyaUEsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHVyaUIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpQiA9IHNlcmlhbGl6ZShwYXJzZSh1cmlCLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlT2YodXJpQikgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdXJpQiA9IHNlcmlhbGl6ZSh1cmlCLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaUEgPT09IHVyaUI7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUNvbXBvbmVudChzdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gc3RyICYmIHN0ci50b1N0cmluZygpLnJlcGxhY2UoIW9wdGlvbnMgfHwgIW9wdGlvbnMuaXJpID8gVVJJX1BST1RPQ09MLkVTQ0FQRSA6IElSSV9QUk9UT0NPTC5FU0NBUEUsIHBjdEVuY0NoYXIpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZUNvbXBvbmVudChzdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gc3RyICYmIHN0ci50b1N0cmluZygpLnJlcGxhY2UoIW9wdGlvbnMgfHwgIW9wdGlvbnMuaXJpID8gVVJJX1BST1RPQ09MLlBDVF9FTkNPREVEIDogSVJJX1BST1RPQ09MLlBDVF9FTkNPREVELCBwY3REZWNDaGFycyk7XG59XG5cbnZhciBoYW5kbGVyID0ge1xuICAgIHNjaGVtZTogXCJodHRwXCIsXG4gICAgZG9tYWluSG9zdDogdHJ1ZSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICAvL3JlcG9ydCBtaXNzaW5nIGhvc3RcbiAgICAgICAgaWYgKCFjb21wb25lbnRzLmhvc3QpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiSFRUUCBVUklzIG11c3QgaGF2ZSBhIGhvc3QuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWN1cmUgPSBTdHJpbmcoY29tcG9uZW50cy5zY2hlbWUpLnRvTG93ZXJDYXNlKCkgPT09IFwiaHR0cHNcIjtcbiAgICAgICAgLy9ub3JtYWxpemUgdGhlIGRlZmF1bHQgcG9ydFxuICAgICAgICBpZiAoY29tcG9uZW50cy5wb3J0ID09PSAoc2VjdXJlID8gNDQzIDogODApIHx8IGNvbXBvbmVudHMucG9ydCA9PT0gXCJcIikge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vbm9ybWFsaXplIHRoZSBlbXB0eSBwYXRoXG4gICAgICAgIGlmICghY29tcG9uZW50cy5wYXRoKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBhdGggPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvL05PVEU6IFdlIGRvIG5vdCBwYXJzZSBxdWVyeSBzdHJpbmdzIGZvciBIVFRQIFVSSXNcbiAgICAgICAgLy9hcyBXV1cgRm9ybSBVcmwgRW5jb2RlZCBxdWVyeSBzdHJpbmdzIGFyZSBwYXJ0IG9mIHRoZSBIVE1MNCsgc3BlYyxcbiAgICAgICAgLy9hbmQgbm90IHRoZSBIVFRQIHNwZWMuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBoYW5kbGVyJDEgPSB7XG4gICAgc2NoZW1lOiBcImh0dHBzXCIsXG4gICAgZG9tYWluSG9zdDogaGFuZGxlci5kb21haW5Ib3N0LFxuICAgIHBhcnNlOiBoYW5kbGVyLnBhcnNlLFxuICAgIHNlcmlhbGl6ZTogaGFuZGxlci5zZXJpYWxpemVcbn07XG5cbmZ1bmN0aW9uIGlzU2VjdXJlKHdzQ29tcG9uZW50cykge1xuICAgIHJldHVybiB0eXBlb2Ygd3NDb21wb25lbnRzLnNlY3VyZSA9PT0gJ2Jvb2xlYW4nID8gd3NDb21wb25lbnRzLnNlY3VyZSA6IFN0cmluZyh3c0NvbXBvbmVudHMuc2NoZW1lKS50b0xvd2VyQ2FzZSgpID09PSBcIndzc1wiO1xufVxuLy9SRkMgNjQ1NVxudmFyIGhhbmRsZXIkMiA9IHtcbiAgICBzY2hlbWU6IFwid3NcIixcbiAgICBkb21haW5Ib3N0OiB0cnVlLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB3c0NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgICAgICAvL2luZGljYXRlIGlmIHRoZSBzZWN1cmUgZmxhZyBpcyBzZXRcbiAgICAgICAgd3NDb21wb25lbnRzLnNlY3VyZSA9IGlzU2VjdXJlKHdzQ29tcG9uZW50cyk7XG4gICAgICAgIC8vY29uc3RydWN0IHJlc291Y2UgbmFtZVxuICAgICAgICB3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lID0gKHdzQ29tcG9uZW50cy5wYXRoIHx8ICcvJykgKyAod3NDb21wb25lbnRzLnF1ZXJ5ID8gJz8nICsgd3NDb21wb25lbnRzLnF1ZXJ5IDogJycpO1xuICAgICAgICB3c0NvbXBvbmVudHMucGF0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgd3NDb21wb25lbnRzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gd3NDb21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUod3NDb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIC8vbm9ybWFsaXplIHRoZSBkZWZhdWx0IHBvcnRcbiAgICAgICAgaWYgKHdzQ29tcG9uZW50cy5wb3J0ID09PSAoaXNTZWN1cmUod3NDb21wb25lbnRzKSA/IDQ0MyA6IDgwKSB8fCB3c0NvbXBvbmVudHMucG9ydCA9PT0gXCJcIikge1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnBvcnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9lbnN1cmUgc2NoZW1lIG1hdGNoZXMgc2VjdXJlIGZsYWdcbiAgICAgICAgaWYgKHR5cGVvZiB3c0NvbXBvbmVudHMuc2VjdXJlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5zY2hlbWUgPSB3c0NvbXBvbmVudHMuc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnNlY3VyZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL3JlY29uc3RydWN0IHBhdGggZnJvbSByZXNvdXJjZSBuYW1lXG4gICAgICAgIGlmICh3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lKSB7XG4gICAgICAgICAgICB2YXIgX3dzQ29tcG9uZW50cyRyZXNvdXJjID0gd3NDb21wb25lbnRzLnJlc291cmNlTmFtZS5zcGxpdCgnPycpLFxuICAgICAgICAgICAgICAgIF93c0NvbXBvbmVudHMkcmVzb3VyYzIgPSBzbGljZWRUb0FycmF5KF93c0NvbXBvbmVudHMkcmVzb3VyYywgMiksXG4gICAgICAgICAgICAgICAgcGF0aCA9IF93c0NvbXBvbmVudHMkcmVzb3VyYzJbMF0sXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBfd3NDb21wb25lbnRzJHJlc291cmMyWzFdO1xuXG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucGF0aCA9IHBhdGggJiYgcGF0aCAhPT0gJy8nID8gcGF0aCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnJlc291cmNlTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL2ZvcmJpZCBmcmFnbWVudCBjb21wb25lbnRcbiAgICAgICAgd3NDb21wb25lbnRzLmZyYWdtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gd3NDb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBoYW5kbGVyJDMgPSB7XG4gICAgc2NoZW1lOiBcIndzc1wiLFxuICAgIGRvbWFpbkhvc3Q6IGhhbmRsZXIkMi5kb21haW5Ib3N0LFxuICAgIHBhcnNlOiBoYW5kbGVyJDIucGFyc2UsXG4gICAgc2VyaWFsaXplOiBoYW5kbGVyJDIuc2VyaWFsaXplXG59O1xuXG52YXIgTyA9IHt9O1xudmFyIGlzSVJJID0gdHJ1ZTtcbi8vUkZDIDM5ODZcbnZhciBVTlJFU0VSVkVEJCQgPSBcIltBLVphLXowLTlcXFxcLVxcXFwuXFxcXF9cXFxcflwiICsgKGlzSVJJID8gXCJcXFxceEEwLVxcXFx1MjAwRFxcXFx1MjAxMC1cXFxcdTIwMjlcXFxcdTIwMkYtXFxcXHVEN0ZGXFxcXHVGOTAwLVxcXFx1RkRDRlxcXFx1RkRGMC1cXFxcdUZGRUZcIiA6IFwiXCIpICsgXCJdXCI7XG52YXIgSEVYRElHJCQgPSBcIlswLTlBLUZhLWZdXCI7IC8vY2FzZS1pbnNlbnNpdGl2ZVxudmFyIFBDVF9FTkNPREVEJCA9IHN1YmV4cChzdWJleHAoXCIlW0VGZWZdXCIgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkgKyBcInxcIiArIHN1YmV4cChcIiVbODlBLUZhLWZdXCIgKyBIRVhESUckJCArIFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkgKyBcInxcIiArIHN1YmV4cChcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpKTsgLy9leHBhbmRlZFxuLy9SRkMgNTMyMiwgZXhjZXB0IHRoZXNlIHN5bWJvbHMgYXMgcGVyIFJGQyA2MDY4OiBAIDogLyA/ICMgWyBdICYgOyA9XG4vL2NvbnN0IEFURVhUJCQgPSBcIltBLVphLXowLTlcXFxcIVxcXFwjXFxcXCRcXFxcJVxcXFwmXFxcXCdcXFxcKlxcXFwrXFxcXC1cXFxcL1xcXFw9XFxcXD9cXFxcXlxcXFxfXFxcXGBcXFxce1xcXFx8XFxcXH1cXFxcfl1cIjtcbi8vY29uc3QgV1NQJCQgPSBcIltcXFxceDIwXFxcXHgwOV1cIjtcbi8vY29uc3QgT0JTX1FURVhUJCQgPSBcIltcXFxceDAxLVxcXFx4MDhcXFxceDBCXFxcXHgwQ1xcXFx4MEUtXFxcXHgxRlxcXFx4N0ZdXCI7ICAvLyglZDEtOCAvICVkMTEtMTIgLyAlZDE0LTMxIC8gJWQxMjcpXG4vL2NvbnN0IFFURVhUJCQgPSBtZXJnZShcIltcXFxceDIxXFxcXHgyMy1cXFxceDVCXFxcXHg1RC1cXFxceDdFXVwiLCBPQlNfUVRFWFQkJCk7ICAvLyVkMzMgLyAlZDM1LTkxIC8gJWQ5My0xMjYgLyBvYnMtcXRleHRcbi8vY29uc3QgVkNIQVIkJCA9IFwiW1xcXFx4MjEtXFxcXHg3RV1cIjtcbi8vY29uc3QgV1NQJCQgPSBcIltcXFxceDIwXFxcXHgwOV1cIjtcbi8vY29uc3QgT0JTX1FQJCA9IHN1YmV4cChcIlxcXFxcXFxcXCIgKyBtZXJnZShcIltcXFxceDAwXFxcXHgwRFxcXFx4MEFdXCIsIE9CU19RVEVYVCQkKSk7ICAvLyVkMCAvIENSIC8gTEYgLyBvYnMtcXRleHRcbi8vY29uc3QgRldTJCA9IHN1YmV4cChzdWJleHAoV1NQJCQgKyBcIipcIiArIFwiXFxcXHgwRFxcXFx4MEFcIikgKyBcIj9cIiArIFdTUCQkICsgXCIrXCIpO1xuLy9jb25zdCBRVU9URURfUEFJUiQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXFxcXFxcIiArIHN1YmV4cChWQ0hBUiQkICsgXCJ8XCIgKyBXU1AkJCkpICsgXCJ8XCIgKyBPQlNfUVAkKTtcbi8vY29uc3QgUVVPVEVEX1NUUklORyQgPSBzdWJleHAoJ1xcXFxcIicgKyBzdWJleHAoRldTJCArIFwiP1wiICsgUUNPTlRFTlQkKSArIFwiKlwiICsgRldTJCArIFwiP1wiICsgJ1xcXFxcIicpO1xudmFyIEFURVhUJCQgPSBcIltBLVphLXowLTlcXFxcIVxcXFwkXFxcXCVcXFxcJ1xcXFwqXFxcXCtcXFxcLVxcXFxeXFxcXF9cXFxcYFxcXFx7XFxcXHxcXFxcfVxcXFx+XVwiO1xudmFyIFFURVhUJCQgPSBcIltcXFxcIVxcXFwkXFxcXCVcXFxcJ1xcXFwoXFxcXClcXFxcKlxcXFwrXFxcXCxcXFxcLVxcXFwuMC05XFxcXDxcXFxcPkEtWlxcXFx4NUUtXFxcXHg3RV1cIjtcbnZhciBWQ0hBUiQkID0gbWVyZ2UoUVRFWFQkJCwgXCJbXFxcXFxcXCJcXFxcXFxcXF1cIik7XG52YXIgU09NRV9ERUxJTVMkJCA9IFwiW1xcXFwhXFxcXCRcXFxcJ1xcXFwoXFxcXClcXFxcKlxcXFwrXFxcXCxcXFxcO1xcXFw6XFxcXEBdXCI7XG52YXIgVU5SRVNFUlZFRCA9IG5ldyBSZWdFeHAoVU5SRVNFUlZFRCQkLCBcImdcIik7XG52YXIgUENUX0VOQ09ERUQgPSBuZXcgUmVnRXhwKFBDVF9FTkNPREVEJCwgXCJnXCIpO1xudmFyIE5PVF9MT0NBTF9QQVJUID0gbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBBVEVYVCQkLCBcIltcXFxcLl1cIiwgJ1tcXFxcXCJdJywgVkNIQVIkJCksIFwiZ1wiKTtcbnZhciBOT1RfSEZOQU1FID0gbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBVTlJFU0VSVkVEJCQsIFNPTUVfREVMSU1TJCQpLCBcImdcIik7XG52YXIgTk9UX0hGVkFMVUUgPSBOT1RfSEZOQU1FO1xuZnVuY3Rpb24gZGVjb2RlVW5yZXNlcnZlZChzdHIpIHtcbiAgICB2YXIgZGVjU3RyID0gcGN0RGVjQ2hhcnMoc3RyKTtcbiAgICByZXR1cm4gIWRlY1N0ci5tYXRjaChVTlJFU0VSVkVEKSA/IHN0ciA6IGRlY1N0cjtcbn1cbnZhciBoYW5kbGVyJDQgPSB7XG4gICAgc2NoZW1lOiBcIm1haWx0b1wiLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZSQkMShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtYWlsdG9Db21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgdmFyIHRvID0gbWFpbHRvQ29tcG9uZW50cy50byA9IG1haWx0b0NvbXBvbmVudHMucGF0aCA/IG1haWx0b0NvbXBvbmVudHMucGF0aC5zcGxpdChcIixcIikgOiBbXTtcbiAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5wYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAobWFpbHRvQ29tcG9uZW50cy5xdWVyeSkge1xuICAgICAgICAgICAgdmFyIHVua25vd25IZWFkZXJzID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgdmFyIGhmaWVsZHMgPSBtYWlsdG9Db21wb25lbnRzLnF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4bCA9IGhmaWVsZHMubGVuZ3RoOyB4IDwgeGw7ICsreCkge1xuICAgICAgICAgICAgICAgIHZhciBoZmllbGQgPSBoZmllbGRzW3hdLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGhmaWVsZFswXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidG9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b0FkZHJzID0gaGZpZWxkWzFdLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF94ID0gMCwgX3hsID0gdG9BZGRycy5sZW5ndGg7IF94IDwgX3hsOyArK194KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8ucHVzaCh0b0FkZHJzW194XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN1YmplY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWx0b0NvbXBvbmVudHMuc3ViamVjdCA9IHVuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFsxXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJvZHlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haWx0b0NvbXBvbmVudHMuYm9keSA9IHVuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFsxXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVua25vd25IZWFkZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzBdLCBvcHRpb25zKV0gPSB1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVua25vd25IZWFkZXJzKSBtYWlsdG9Db21wb25lbnRzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIG1haWx0b0NvbXBvbmVudHMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIF94MiA9IDAsIF94bDIgPSB0by5sZW5ndGg7IF94MiA8IF94bDI7ICsrX3gyKSB7XG4gICAgICAgICAgICB2YXIgYWRkciA9IHRvW194Ml0uc3BsaXQoXCJAXCIpO1xuICAgICAgICAgICAgYWRkclswXSA9IHVuZXNjYXBlQ29tcG9uZW50KGFkZHJbMF0pO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnVuaWNvZGVTdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IFVuaWNvZGUgSUROIC0+IEFTQ0lJIElETlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJbMV0gPSBwdW55Y29kZS50b0FTQ0lJKHVuZXNjYXBlQ29tcG9uZW50KGFkZHJbMV0sIG9wdGlvbnMpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5lcnJvciA9IG1haWx0b0NvbXBvbmVudHMuZXJyb3IgfHwgXCJFbWFpbCBhZGRyZXNzJ3MgZG9tYWluIG5hbWUgY2FuIG5vdCBiZSBjb252ZXJ0ZWQgdG8gQVNDSUkgdmlhIHB1bnljb2RlOiBcIiArIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRyWzFdID0gdW5lc2NhcGVDb21wb25lbnQoYWRkclsxXSwgb3B0aW9ucykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvW194Ml0gPSBhZGRyLmpvaW4oXCJAXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYWlsdG9Db21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUkJDEobWFpbHRvQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgY29tcG9uZW50cyA9IG1haWx0b0NvbXBvbmVudHM7XG4gICAgICAgIHZhciB0byA9IHRvQXJyYXkobWFpbHRvQ29tcG9uZW50cy50byk7XG4gICAgICAgIGlmICh0bykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIHhsID0gdG8ubGVuZ3RoOyB4IDwgeGw7ICsreCkge1xuICAgICAgICAgICAgICAgIHZhciB0b0FkZHIgPSBTdHJpbmcodG9beF0pO1xuICAgICAgICAgICAgICAgIHZhciBhdElkeCA9IHRvQWRkci5sYXN0SW5kZXhPZihcIkBcIik7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsUGFydCA9IHRvQWRkci5zbGljZSgwLCBhdElkeCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpLnJlcGxhY2UoTk9UX0xPQ0FMX1BBUlQsIHBjdEVuY0NoYXIpO1xuICAgICAgICAgICAgICAgIHZhciBkb21haW4gPSB0b0FkZHIuc2xpY2UoYXRJZHggKyAxKTtcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgSUROIHZpYSBwdW55Y29kZVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbiA9ICFvcHRpb25zLmlyaSA/IHB1bnljb2RlLnRvQVNDSUkodW5lc2NhcGVDb21wb25lbnQoZG9tYWluLCBvcHRpb25zKS50b0xvd2VyQ2FzZSgpKSA6IHB1bnljb2RlLnRvVW5pY29kZShkb21haW4pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJFbWFpbCBhZGRyZXNzJ3MgZG9tYWluIG5hbWUgY2FuIG5vdCBiZSBjb252ZXJ0ZWQgdG8gXCIgKyAoIW9wdGlvbnMuaXJpID8gXCJBU0NJSVwiIDogXCJVbmljb2RlXCIpICsgXCIgdmlhIHB1bnljb2RlOiBcIiArIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvW3hdID0gbG9jYWxQYXJ0ICsgXCJAXCIgKyBkb21haW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnRzLnBhdGggPSB0by5qb2luKFwiLFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGVhZGVycyA9IG1haWx0b0NvbXBvbmVudHMuaGVhZGVycyA9IG1haWx0b0NvbXBvbmVudHMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgaWYgKG1haWx0b0NvbXBvbmVudHMuc3ViamVjdCkgaGVhZGVyc1tcInN1YmplY3RcIl0gPSBtYWlsdG9Db21wb25lbnRzLnN1YmplY3Q7XG4gICAgICAgIGlmIChtYWlsdG9Db21wb25lbnRzLmJvZHkpIGhlYWRlcnNbXCJib2R5XCJdID0gbWFpbHRvQ29tcG9uZW50cy5ib2R5O1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gaGVhZGVycykge1xuICAgICAgICAgICAgaWYgKGhlYWRlcnNbbmFtZV0gIT09IE9bbmFtZV0pIHtcbiAgICAgICAgICAgICAgICBmaWVsZHMucHVzaChuYW1lLnJlcGxhY2UoUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKS5yZXBsYWNlKE5PVF9IRk5BTUUsIHBjdEVuY0NoYXIpICsgXCI9XCIgKyBoZWFkZXJzW25hbWVdLnJlcGxhY2UoUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKS5yZXBsYWNlKE5PVF9IRlZBTFVFLCBwY3RFbmNDaGFyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucXVlcnkgPSBmaWVsZHMuam9pbihcIiZcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIFVSTl9QQVJTRSA9IC9eKFteXFw6XSspXFw6KC4qKS87XG4vL1JGQyAyMTQxXG52YXIgaGFuZGxlciQ1ID0ge1xuICAgIHNjaGVtZTogXCJ1cm5cIixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UkJDEoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IGNvbXBvbmVudHMucGF0aCAmJiBjb21wb25lbnRzLnBhdGgubWF0Y2goVVJOX1BBUlNFKTtcbiAgICAgICAgdmFyIHVybkNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgdmFyIHNjaGVtZSA9IG9wdGlvbnMuc2NoZW1lIHx8IHVybkNvbXBvbmVudHMuc2NoZW1lIHx8IFwidXJuXCI7XG4gICAgICAgICAgICB2YXIgbmlkID0gbWF0Y2hlc1sxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG5zcyA9IG1hdGNoZXNbMl07XG4gICAgICAgICAgICB2YXIgdXJuU2NoZW1lID0gc2NoZW1lICsgXCI6XCIgKyAob3B0aW9ucy5uaWQgfHwgbmlkKTtcbiAgICAgICAgICAgIHZhciBzY2hlbWVIYW5kbGVyID0gU0NIRU1FU1t1cm5TY2hlbWVdO1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5uaWQgPSBuaWQ7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLm5zcyA9IG5zcztcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMucGF0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChzY2hlbWVIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdXJuQ29tcG9uZW50cyA9IHNjaGVtZUhhbmRsZXIucGFyc2UodXJuQ29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLmVycm9yID0gdXJuQ29tcG9uZW50cy5lcnJvciB8fCBcIlVSTiBjYW4gbm90IGJlIHBhcnNlZC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJuQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplJCQxKHVybkNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNjaGVtZSA9IG9wdGlvbnMuc2NoZW1lIHx8IHVybkNvbXBvbmVudHMuc2NoZW1lIHx8IFwidXJuXCI7XG4gICAgICAgIHZhciBuaWQgPSB1cm5Db21wb25lbnRzLm5pZDtcbiAgICAgICAgdmFyIHVyblNjaGVtZSA9IHNjaGVtZSArIFwiOlwiICsgKG9wdGlvbnMubmlkIHx8IG5pZCk7XG4gICAgICAgIHZhciBzY2hlbWVIYW5kbGVyID0gU0NIRU1FU1t1cm5TY2hlbWVdO1xuICAgICAgICBpZiAoc2NoZW1lSGFuZGxlcikge1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cyA9IHNjaGVtZUhhbmRsZXIuc2VyaWFsaXplKHVybkNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmlDb21wb25lbnRzID0gdXJuQ29tcG9uZW50cztcbiAgICAgICAgdmFyIG5zcyA9IHVybkNvbXBvbmVudHMubnNzO1xuICAgICAgICB1cmlDb21wb25lbnRzLnBhdGggPSAobmlkIHx8IG9wdGlvbnMubmlkKSArIFwiOlwiICsgbnNzO1xuICAgICAgICByZXR1cm4gdXJpQ29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgVVVJRCA9IC9eWzAtOUEtRmEtZl17OH0oPzpcXC1bMC05QS1GYS1mXXs0fSl7M31cXC1bMC05QS1GYS1mXXsxMn0kLztcbi8vUkZDIDQxMjJcbnZhciBoYW5kbGVyJDYgPSB7XG4gICAgc2NoZW1lOiBcInVybjp1dWlkXCIsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHVybkNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHV1aWRDb21wb25lbnRzID0gdXJuQ29tcG9uZW50cztcbiAgICAgICAgdXVpZENvbXBvbmVudHMudXVpZCA9IHV1aWRDb21wb25lbnRzLm5zcztcbiAgICAgICAgdXVpZENvbXBvbmVudHMubnNzID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIW9wdGlvbnMudG9sZXJhbnQgJiYgKCF1dWlkQ29tcG9uZW50cy51dWlkIHx8ICF1dWlkQ29tcG9uZW50cy51dWlkLm1hdGNoKFVVSUQpKSkge1xuICAgICAgICAgICAgdXVpZENvbXBvbmVudHMuZXJyb3IgPSB1dWlkQ29tcG9uZW50cy5lcnJvciB8fCBcIlVVSUQgaXMgbm90IHZhbGlkLlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1dWlkQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKHV1aWRDb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB1cm5Db21wb25lbnRzID0gdXVpZENvbXBvbmVudHM7XG4gICAgICAgIC8vbm9ybWFsaXplIFVVSURcbiAgICAgICAgdXJuQ29tcG9uZW50cy5uc3MgPSAodXVpZENvbXBvbmVudHMudXVpZCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gdXJuQ29tcG9uZW50cztcbiAgICB9XG59O1xuXG5TQ0hFTUVTW2hhbmRsZXIuc2NoZW1lXSA9IGhhbmRsZXI7XG5TQ0hFTUVTW2hhbmRsZXIkMS5zY2hlbWVdID0gaGFuZGxlciQxO1xuU0NIRU1FU1toYW5kbGVyJDIuc2NoZW1lXSA9IGhhbmRsZXIkMjtcblNDSEVNRVNbaGFuZGxlciQzLnNjaGVtZV0gPSBoYW5kbGVyJDM7XG5TQ0hFTUVTW2hhbmRsZXIkNC5zY2hlbWVdID0gaGFuZGxlciQ0O1xuU0NIRU1FU1toYW5kbGVyJDUuc2NoZW1lXSA9IGhhbmRsZXIkNTtcblNDSEVNRVNbaGFuZGxlciQ2LnNjaGVtZV0gPSBoYW5kbGVyJDY7XG5cbmV4cG9ydHMuU0NIRU1FUyA9IFNDSEVNRVM7XG5leHBvcnRzLnBjdEVuY0NoYXIgPSBwY3RFbmNDaGFyO1xuZXhwb3J0cy5wY3REZWNDaGFycyA9IHBjdERlY0NoYXJzO1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuZXhwb3J0cy5yZW1vdmVEb3RTZWdtZW50cyA9IHJlbW92ZURvdFNlZ21lbnRzO1xuZXhwb3J0cy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG5leHBvcnRzLnJlc29sdmVDb21wb25lbnRzID0gcmVzb2x2ZUNvbXBvbmVudHM7XG5leHBvcnRzLnJlc29sdmUgPSByZXNvbHZlO1xuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XG5leHBvcnRzLmVxdWFsID0gZXF1YWw7XG5leHBvcnRzLmVzY2FwZUNvbXBvbmVudCA9IGVzY2FwZUNvbXBvbmVudDtcbmV4cG9ydHMudW5lc2NhcGVDb21wb25lbnQgPSB1bmVzY2FwZUNvbXBvbmVudDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVyaS5hbGwuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCl7XG5cbiAgdmFyXG4gICAgYnVmLFxuICAgIGJ1ZklkeCA9IDAsXG4gICAgaGV4Qnl0ZXMgPSBbXSxcbiAgICBpXG4gIDtcblxuICAvLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbiAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgaGV4Qnl0ZXNbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICB9XG5cbiAgLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuICAvLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbiAgLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG4gIHV1aWQuQlVGRkVSX1NJWkUgPSA0MDk2O1xuXG4gIC8vIEJpbmFyeSB1dWlkc1xuICB1dWlkLmJpbiA9IHV1aWRCaW47XG5cbiAgLy8gQ2xlYXIgYnVmZmVyXG4gIHV1aWQuY2xlYXJCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICBidWYgPSBudWxsO1xuICAgIGJ1ZklkeCA9IDA7XG4gIH07XG5cbiAgLy8gVGVzdCBmb3IgdXVpZFxuICB1dWlkLnRlc3QgPSBmdW5jdGlvbih1dWlkKSB7XG4gICAgaWYgKHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tNFswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaS50ZXN0KHV1aWQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICB2YXIgY3J5cHQwO1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjcnlwdDAgPSBjcnlwdG87XG4gIH0gZWxzZSBpZiggKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHdpbmRvdy5tc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgY3J5cHQwID0gd2luZG93Lm1zQ3J5cHRvOyAvLyBJRTExXG4gIH1cblxuICBpZiAoKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgY3J5cHQwID0gY3J5cHQwIHx8IHJlcXVpcmUoJ2NyeXB0bycpO1xuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy51dWlkID0gdXVpZDtcbiAgfVxuXG4gIC8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG4gIC8vIEFsc28gZXhwb3NlIHRoaXMgc28geW91IGNhbiBvdmVycmlkZSBpdC5cbiAgdXVpZC5yYW5kb21CeXRlcyA9IChmdW5jdGlvbigpe1xuICAgIGlmIChjcnlwdDApIHtcbiAgICAgIGlmIChjcnlwdDAucmFuZG9tQnl0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0MC5yYW5kb21CeXRlcztcbiAgICAgIH1cbiAgICAgIGlmIChjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgICBjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGJ5dGVzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgY3J5cHQwLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgdmFyIGksIHIgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgfSkoKTtcblxuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGZ1bmN0aW9uIHJhbmRvbUJ5dGVzQnVmZmVyZWQobikge1xuICAgIGlmICghYnVmIHx8ICgoYnVmSWR4ICsgbikgPiB1dWlkLkJVRkZFUl9TSVpFKSkge1xuICAgICAgYnVmSWR4ID0gMDtcbiAgICAgIGJ1ZiA9IHV1aWQucmFuZG9tQnl0ZXModXVpZC5CVUZGRVJfU0laRSk7XG4gICAgfVxuICAgIHJldHVybiBidWYuc2xpY2UoYnVmSWR4LCBidWZJZHggKz0gbik7XG4gIH1cblxuICAvLyB1dWlkLmJpblxuICBmdW5jdGlvbiB1dWlkQmluKCkge1xuICAgIHZhciBiID0gcmFuZG9tQnl0ZXNCdWZmZXJlZCgxNik7XG4gICAgYls2XSA9IChiWzZdICYgMHgwZikgfCAweDQwO1xuICAgIGJbOF0gPSAoYls4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8vIFN0cmluZyBVVUlEdjQgKFJhbmRvbSlcbiAgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICB2YXIgYiA9IHV1aWRCaW4oKTtcbiAgICByZXR1cm4gaGV4Qnl0ZXNbYlswXV0gKyBoZXhCeXRlc1tiWzFdXSArXG4gICAgICBoZXhCeXRlc1tiWzJdXSArIGhleEJ5dGVzW2JbM11dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbNF1dICsgaGV4Qnl0ZXNbYls1XV0gKyAnLScgK1xuICAgICAgaGV4Qnl0ZXNbYls2XV0gKyBoZXhCeXRlc1tiWzddXSArICctJyArXG4gICAgICBoZXhCeXRlc1tiWzhdXSArIGhleEJ5dGVzW2JbOV1dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbMTBdXSArIGhleEJ5dGVzW2JbMTFdXSArXG4gICAgICBoZXhCeXRlc1tiWzEyXV0gKyBoZXhCeXRlc1tiWzEzXV0gK1xuICAgICAgaGV4Qnl0ZXNbYlsxNF1dICsgaGV4Qnl0ZXNbYlsxNV1dXG4gICAgO1xuICB9XG5cbn0pKCk7XG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJykpO1xuICBnYW1lLmluaXRpYWxpc2UoKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=