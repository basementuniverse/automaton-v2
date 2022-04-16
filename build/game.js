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
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
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
        this.id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
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

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NIL": () => (/* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "parse": () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "stringify": () => (/* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "v1": () => (/* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "v3": () => (/* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "v4": () => (/* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "v5": () => (/* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "validate": () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "version": () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/esm-browser/nil.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/esm-browser/version.js");
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");










/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/nil.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function parse(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DNS": () => (/* binding */ DNS),
/* harmony export */   "URL": () => (/* binding */ URL),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/version.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function version(uuid) {
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxTQUFTLEtBQUssV0FBVztBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFFBQVEsUUFBUSxHQUFHLFFBQVEsWUFBWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0csT0FBTztBQUN2RztBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxxRkFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsRUFBRTtBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FB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QTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsY0FBYyxHQUFHO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxhQUFhOztBQUU1RCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2w2Q3dDO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDUTtBQUNFO0FBQ0U7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BLGtFQUEwQjtBQUUxQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9AYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2Fqdi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2NvZGUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvY29kZWdlbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL3Njb3BlLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9uYW1lcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZWZfZXJyb3IuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS91dGlsLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2FwcGxpY2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvYm9vbFNjaGVtYS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9rZXl3b3JkLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL3N1YnNjaGVtYS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29yZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS9lcXVhbC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS91Y3MybGVuZ3RoLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3VyaS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS92YWxpZGF0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hZGRpdGlvbmFsSXRlbXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FkZGl0aW9uYWxQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbGxPZi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvYW55T2YuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2NvbnRhaW5zLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9kZXBlbmRlbmNpZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2lmLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaXRlbXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2l0ZW1zMjAyMC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3Ivbm90LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9vbmVPZi5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvcGF0dGVyblByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3ByZWZpeEl0ZW1zLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcm9wZXJ0eU5hbWVzLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci90aGVuRWxzZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvZGUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9jb3JlL2lkLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvcmVmLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZGlzY3JpbWluYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3IvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kcmFmdDcuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9mb3JtYXQvZm9ybWF0LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZm9ybWF0L2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2NvbnN0LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9lbnVtLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbGltaXRJdGVtcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbGltaXRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0TnVtYmVyLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL211bHRpcGxlT2YuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3BhdHRlcm4uanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3JlcXVpcmVkLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi91bmlxdWVJdGVtcy5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy9qc29uLXNjaGVtYS10cmF2ZXJzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvRGVidWcudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL0lucHV0LnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9hY3RvcnMvQWN0b3IudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29udGVudC9BY3RvckRhdGFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnRlbnQvQ29udGVudC50cyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9zcmMvY29udGVudC9Gb250TG9hZGVyLnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9jb250ZW50L0ltYWdlTG9hZGVyLnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9jb250ZW50L0pTT05Mb2FkZXIudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnRlbnQvU291bmRMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2NvbnRlbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vc3JjL2VudW1zLnRzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy91dGlsaXRpZXMvc2xlZXAudHMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3VyaS1qcy9kaXN0L2VzNS91cmkuYWxsLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9tZDUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc2hhMS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YxLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92MzUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y1LmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vYXV0b21hdG9uLXYyLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hdXRvbWF0b24tdjIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2F1dG9tYXRvbi12Mi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2F1dG9tYXRvbi12Mi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBvdmVydmlldyBBIGxpYnJhcnkgb2YgdXNlZnVsIGZ1bmN0aW9uc1xuICogQGF1dGhvciBHb3Jkb24gTGFycmlnYW5cbiAqIEB2ZXJzaW9uIDEuMi45XG4gKi9cblxuLyoqIEBjbGFzcyBNYXRoICovXG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWxcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIE51bWJlciBhXG4gKiBAcGFyYW0ge251bWJlcn0gYiBOdW1iZXIgYlxuICogQHBhcmFtIHtudW1iZXJ9IFtwPU51bWJlci5FUFNJTE9OXSBUaGUgcHJlY2lzaW9uIHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG51bWJlcnMgYSBhbmQgYiBhcmUgYXBwcm94aW1hdGVseSBlcXVhbFxuICovXG5NYXRoLmZsb2F0RXF1YWxzID0gKGEsIGIsIHAgPSBOdW1iZXIuRVBTSUxPTikgPT4gTWF0aC5hYnMoYSAtIGIpIDwgcDtcblxuLyoqXG4gKiBDbGFtcCBhIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbnVtYmVyIHRvIGNsYW1wXG4gKiBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBUaGUgbWluaW11bSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFttYXg9MV0gVGhlIG1heGltdW0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gQSBjbGFtcGVkIG51bWJlclxuICovXG5NYXRoLmNsYW1wID0gKGEsIG1pbiA9IDAsIG1heCA9IDEpID0+IGEgPCBtaW4gPyBtaW4gOiAoYSA+IG1heCA/IG1heCA6IGEpO1xuXG4vKipcbiAqIEdldCB0aGUgZnJhY3Rpb25hbCBwYXJ0IG9mIGEgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbnVtYmVyIGZyb20gd2hpY2ggdG8gZ2V0IHRoZSBmcmFjdGlvbmFsIHBhcnRcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGZyYWN0aW9uYWwgcGFydCBvZiB0aGUgbnVtYmVyXG4gKi9cbk1hdGguZnJhYyA9IGEgPT4gYSA+PSAwID8gYSAtIE1hdGguZmxvb3IoYSkgOiBhIC0gTWF0aC5jZWlsKGEpO1xuXG4vKipcbiAqIERvIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiBhIGFuZCBiXG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbWluaW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFRoZSBtYXhpbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIGludGVycG9sYXRpb24gdmFsdWUsIHNob3VsZCBiZSBpbiB0aGUgaW50ZXJ2YWwgWzAsIDFdXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW2EsIGJdXG4gKi9cbk1hdGgubGVycCA9IChhLCBiLCBpKSA9PiBhICsgKGIgLSBhKSAqIGk7XG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbiBvZiBpIGJldHdlZW4gYSBhbmQgYlxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgcG9zaXRpb24gb2YgaSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuTWF0aC51bmxlcnAgPSAoYSwgYiwgaSkgPT4gKGkgLSBhKSAvIChiIC0gYSk7XG5cbi8qKlxuICogRG8gYSBiaWxpbmVhciBpbnRlcnBvbGF0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gYzAwIFRvcC1sZWZ0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gYzEwIFRvcC1yaWdodCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGMwMSBCb3R0b20tbGVmdCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGMxMSBCb3R0b20tcmlnaHQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpeCBJbnRlcnBvbGF0aW9uIHZhbHVlIGFsb25nIHhcbiAqIEBwYXJhbSB7bnVtYmVyfSBpeSBJbnRlcnBvbGF0aW9uIHZhbHVlIGFsb25nIHlcbiAqIEByZXR1cm4ge251bWJlcn0gQSBiaWxpbmVhciBpbnRlcnBvbGF0ZWQgdmFsdWVcbiAqL1xuTWF0aC5ibGVycCA9IChjMDAsIGMxMCwgYzAxLCBjMTEsIGl4LCBpeSkgPT4gTWF0aC5sZXJwKE1hdGgubGVycChjMDAsIGMxMCwgaXgpLCBNYXRoLmxlcnAoYzAxLCBjMTEsIGl4KSwgaXkpO1xuXG4vKipcbiAqIFJlLW1hcCBhIG51bWJlciBpIGZyb20gcmFuZ2UgYTEuLi5hMiB0byBiMS4uLmIyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgbnVtYmVyIHRvIHJlLW1hcFxuICogQHBhcmFtIHtudW1iZXJ9IGExXG4gKiBAcGFyYW0ge251bWJlcn0gYTJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiMVxuICogQHBhcmFtIHtudW1iZXJ9IGIyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbk1hdGgucmVtYXAgPSAoaSwgYTEsIGEyLCBiMSwgYjIpID0+IGIxICsgKGkgLSBhMSkgKiAoYjIgLSBiMSkgLyAoYTIgLSBhMSk7XG5cbi8qKlxuICogRG8gYSBzbW9vdGggaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICovXG5NYXRoLnNtb290aHN0ZXAgPSAoYSwgYiwgaSkgPT4gTWF0aC5sZXJwKGEsIGIsIDMgKiBNYXRoLnBvdyhpLCAyKSAtIDIgKiBNYXRoLnBvdyhpLCAzKSk7XG5cbi8qKlxuICogR2V0IGFuIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzIFRoZSBhbmdsZSBpbiBkZWdyZWVzXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbk1hdGgucmFkaWFucyA9IGRlZ3JlZXMgPT4gKE1hdGguUEkgLyAxODApICogZGVncmVlcztcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gZGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqL1xuTWF0aC5kZWdyZWVzID0gcmFkaWFucyA9PiAoMTgwIC8gTWF0aC5QSSkgKiByYWRpYW5zO1xuXG4vKipcbiAqIEdldCBhIHJhbmRvbSBmbG9hdCBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBJbmNsdXNpdmUgbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IEV4Y2x1c2l2ZSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gQSByYW5kb20gZmxvYXQgaW4gdGhlIGludGVydmFsIFttaW4sIG1heClcbiAqL1xuTWF0aC5yYW5kb21CZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG5cbi8qKlxuICogR2V0IGEgcmFuZG9tIGludGVnZXIgaW4gdGhlIGludGVydmFsIFttaW4sIG1heF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gSW5jbHVzaXZlIG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBJbmNsdXNpdmUgbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgcmFuZG9tIGludGVnZXIgaW4gdGhlIGludGVydmFsIFttaW4sIG1heF1cbiAqL1xuTWF0aC5yYW5kb21JbnRCZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbXU9MC41XSBUaGUgbWVhbiB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFtzaWdtYT0wLjVdIFRoZSBzdGFuZGFyZCBkZXZpYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2FtcGxlcz0yXSBUaGUgbnVtYmVyIG9mIHNhbXBsZXNcbiAqIEByZXR1cm4ge251bWJlcn0gQSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gbnVtYmVyXG4gKi9cbk1hdGguY2x0UmFuZG9tID0gKG11ID0gMC41LCBzaWdtYSA9IDAuNSwgc2FtcGxlcyA9IDIpID0+IHtcbiAgbGV0IHRvdGFsID0gMDtcbiAgZm9yIChsZXQgaSA9IHNhbXBsZXM7IGktLTspIHtcbiAgICB0b3RhbCArPSBNYXRoLnJhbmRvbSgpO1xuICB9XG4gIHJldHVybiBtdSArICh0b3RhbCAtIHNhbXBsZXMgLyAyKSAvIChzYW1wbGVzIC8gMikgKiBzaWdtYTtcbn07XG5cbi8qKlxuICogR2V0IGEgbm9ybWFsbHktZGlzdHJpYnV0ZWQgcmFuZG9tIGludGVnZXIgaW4gdGhlIGludGVydmFsIFttaW4sIG1heF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gSW5jbHVzaXZlIG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBJbmNsdXNpdmUgbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgbm9ybWFsbHktZGlzdHJpYnV0ZWQgcmFuZG9tIGludGVnZXJcbiAqL1xuTWF0aC5jbHRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IobWluICsgTWF0aC5jbHRSYW5kb20oMC41LCAwLjUsIDIpICogKG1heCArIDEgLSBtaW4pKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB3ZWlnaHRlZCByYW5kb20gaW50ZWdlclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSB3IEFuIGFycmF5IG9mIHdlaWdodHNcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW5kZXggZnJvbSB3XG4gKi9cbk1hdGgud2VpZ2h0ZWRSYW5kb20gPSB3ID0+IHtcbiAgbGV0IHRvdGFsID0gdy5yZWR1Y2UoKGEsIGkpID0+IGEgKyBpLCAwKSwgbiA9IDA7XG4gIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogdG90YWw7XG4gIHdoaWxlICh0b3RhbCA+IHIpIHtcbiAgICB0b3RhbCAtPSB3W24rK107XG4gIH1cbiAgcmV0dXJuIG4gLSAxO1xufTtcblxuLyoqXG4gKiBBbiBpbnRlcnBvbGF0aW9uIGZ1bmN0aW9uXG4gKiBAY2FsbGJhY2sgaW50ZXJwb2xhdGlvbkNhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbWluaW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFRoZSBtYXhpbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIGludGVycG9sYXRpb24gdmFsdWUsIHNob3VsZCBiZSBpbiB0aGUgaW50ZXJ2YWwgWzAsIDFdXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICovXG5cbi8qKlxuICogUmV0dXJuIGFuIGludGVycG9sYXRlZCB2YWx1ZSBmcm9tIGFuIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGEgQW4gYXJyYXkgb2YgdmFsdWVzIGludGVycG9sYXRlXG4gKiBAcGFyYW0ge251bWJlcn0gaSBBIG51bWJlciBpbiB0aGUgaW50ZXJ2YWwgWzAsIDFdXG4gKiBAcGFyYW0ge2ludGVycG9sYXRpb25DYWxsYmFja30gW2Y9TWF0aC5sZXJwXSBUaGUgaW50ZXJwb2xhdGlvbiBmdW5jdGlvbiB0byB1c2VcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbbWluKGEpLCBtYXgoYSldXG4gKi9cbk1hdGgubGVycEFycmF5ID0gKGEsIGksIGYgPSBNYXRoLmxlcnApID0+IHtcbiAgY29uc3QgcyA9IGkgKiAoYS5sZW5ndGggLSAxKTtcbiAgY29uc3QgcCA9IE1hdGguY2xhbXAoTWF0aC50cnVuYyhzKSwgMCwgYS5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIGYoYVtwXSB8fCAwLCBhW3AgKyAxXSB8fCAwLCBNYXRoLmZyYWMocykpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWN0b3JzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYiBWZWN0b3IgYlxuICogQHJldHVybiB7bnVtYmVyfSBhIOKImSBiXG4gKi9cbk1hdGguZG90ID0gKGEsIGIpID0+IGEucmVkdWNlKChuLCB2LCBpKSA9PiBuICsgdiAqIGJbaV0sIDApO1xuXG4vKipcbiAqIEdldCB0aGUgZmFjdG9yaWFsIG9mIGEgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYVxuICogQHJldHVybiB7bnVtYmVyfSBhIVxuICovXG5NYXRoLmZhY3RvcmlhbCA9IGEgPT4ge1xuICBsZXQgcmVzdWx0ID0gMTtcbiAgZm9yIChsZXQgaSA9IDI7IGkgPD0gYTsgaSsrKSB7XG4gICAgcmVzdWx0ICo9IGk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBudW1iZXIgb2YgcGVybXV0YXRpb25zIG9mIHIgZWxlbWVudHMgZnJvbSBhIHNldCBvZiBuIGVsZW1lbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gblxuICogQHBhcmFtIHtudW1iZXJ9IHJcbiAqIEByZXR1cm4ge251bWJlcn0gblByXG4gKi9cbk1hdGgucGVybXV0YXRpb24gPSAobiwgcikgPT4gTWF0aC5mYWN0b3JpYWwobikgLyBNYXRoLmZhY3RvcmlhbChuIC0gcik7XG5cbi8qKlxuICogR2V0IHRoZSBudW1iZXIgb2YgY29tYmluYXRpb25zIG9mIHIgZWxlbWVudHMgZnJvbSBhIHNldCBvZiBuIGVsZW1lbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gblxuICogQHBhcmFtIHtudW1iZXJ9IHJcbiAqIEByZXR1cm4ge251bWJlcn0gbkNyXG4gKi9cbk1hdGguY29tYmluYXRpb24gPSAobiwgcikgPT4gTWF0aC5mYWN0b3JpYWwobikgLyAoTWF0aC5mYWN0b3JpYWwocikgKiBNYXRoLmZhY3RvcmlhbChuIC0gcikpO1xuXG4vKiogQGNsYXNzIEFycmF5ICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3IgZ2VuZXJhdGluZyBhcnJheSB2YWx1ZXNcbiAqIEBjYWxsYmFjayB0aW1lc0NhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgYXJyYXkgaW5kZXhcbiAqIEByZXR1cm4geyp9IFRoZSBhcnJheSB2YWx1ZVxuICovXG5cbi8qKlxuICogUmV0dXJuIGEgbmV3IGFycmF5IHdpdGggbGVuZ3RoIG4gYnkgY2FsbGluZyBmdW5jdGlvbiBmKGkpIG9uIGVhY2ggZWxlbWVudFxuICogQHBhcmFtIHt0aW1lc0NhbGxiYWNrfSBmXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PCo+fVxuICovXG5BcnJheS50aW1lcyA9IChmLCBuKSA9PiBBcnJheShuKS5maWxsKDApLm1hcCgoXywgaSkgPT4gZihpKSk7XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgbnVtYmVycyAwLT4obiAtIDEpXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IEFuIGFycmF5IG9mIGludGVnZXJzIDAtPihuIC0gMSlcbiAqL1xuQXJyYXkucmFuZ2UgPSBuID0+IEFycmF5LnRpbWVzKGkgPT4gaSwgbik7XG5cbi8qKlxuICogWmlwIDIgYXJyYXlzIHRvZ2V0aGVyLCBpLmUuIChbMSwgMiwgM10sIFthLCBiLCBjXSkgPT4gW1sxLCBhXSwgWzIsIGJdLCBbMywgY11dXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBiXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59XG4gKi9cbkFycmF5LnppcCA9IChhLCBiKSA9PiBhLm1hcCgoaywgaSkgPT4gW2ssIGJbaV1dKTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXlbaV0gd2l0aCBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgd3JhcHBpbmdcbiAqIEBuYW1lIGF0XG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBBcnJheS5wcm90b3R5cGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBwb3NpdGl2ZWx5L25lZ2F0aXZlbHkgd3JhcHBlZCBhcnJheSBpbmRleFxuICogQHJldHVybiB7Kn0gQW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnYXQnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbiAoaSkge1xuICAgIGNvbnN0IGwgPSB0aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gdGhpc1tpIDwgMCA/IGwgLSAoTWF0aC5hYnMoaSArIDEpICUgbCkgLSAxIDogaSAlIGxdO1xuICB9XG59KTtcblxuLyoqXG4gKiBDaG9wIGFuIGFycmF5IGludG8gY2h1bmtzIG9mIHNpemUgblxuICogQG5hbWUgY2h1bmtcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIEFycmF5LnByb3RvdHlwZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGNodW5rIHNpemVcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PCo+Pn0gQW4gYXJyYXkgb2YgYXJyYXkgY2h1bmtzXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdjaHVuaycsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIEFycmF5LnRpbWVzKGkgPT4gdGhpcy5zbGljZShpICogbiwgaSAqIG4gKyBuKSwgTWF0aC5jZWlsKHRoaXMubGVuZ3RoIC8gbikpO1xuICB9XG59KTtcblxuLyoqXG4gKiBSYW5kb21seSBzaHVmZmxlIGFuIGFycmF5IGluLXBsYWNlXG4gKiBAbmFtZSBzaHVmZmxlXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBBcnJheS5wcm90b3R5cGVcbiAqIEByZXR1cm4ge0FycmF5PCo+fSBUaGUgc2h1ZmZsZWQgYXJyYXlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3NodWZmbGUnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGEgPT4gW01hdGgucmFuZG9tKCksIGFdKS5zb3J0KChhLCBiKSA9PiBhWzBdIC0gYlswXSkubWFwKGEgPT4gYVsxXSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIEEgMmQgdmVjdG9yXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSB2ZWNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB4IFRoZSB4IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKiBAcHJvcGVydHkge251bWJlcn0geSBUaGUgeSBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHZlY3RvclxuICogQHBhcmFtIHtudW1iZXJ8dmVjfSBbeF0gVGhlIHggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IsIG9yIGEgdmVjdG9yIHRvIGNvcHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHkgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqIEByZXR1cm4ge3ZlY30gQSBuZXcgdmVjdG9yXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5WYXJpb3VzIHdheXMgdG8gaW5pdGlhbGlzZSBhIHZlY3RvcjwvY2FwdGlvbj5cbiAqIGxldCBhID0gdmVjKDMsIDIpOyAgLy8gKDMsIDIpXG4gKiBsZXQgYiA9IHZlYyg0KTsgICAgIC8vICg0LCA0KVxuICogbGV0IGMgPSB2ZWMoYSk7ICAgICAvLyAoMywgMilcbiAqIGxldCBkID0gdmVjKCk7ICAgICAgLy8gKDAsIDApXG4gKi9cbmNvbnN0IHZlYyA9ICh4LCB5KSA9PiAoIXggJiYgIXkgP1xuICB7IHg6IDAsIHk6IDAgfSA6ICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgP1xuICAgIHsgeDogeC54IHx8IDAsIHk6IHgueSB8fCAwIH0gOiAoeSA9PT0gbnVsbCB8fCB5ID09PSB1bmRlZmluZWQgP1xuICAgICAgeyB4OiB4LCB5OiB4IH0gOiB7IHg6IHgsIHk6IHkgfSlcbiAgKVxuKTtcblxuLyoqXG4gKiBHZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWN0b3IgYXMgYW4gYXJyYXlcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gZ2V0IGNvbXBvbmVudHMgZnJvbVxuICogQHJldHVybiB7QXJyYXk8bnVtYmVyPn0gVGhlIHZlY3RvciBjb21wb25lbnRzIGFzIGFuIGFycmF5XG4gKi9cbnZlYy5jb21wb25lbnRzID0gYSA9PiBbYS54LCBhLnldO1xuXG4vKipcbiAqIFJldHVybiBhIHVuaXQgdmVjdG9yICgxLCAwKVxuICogQHJldHVybiB7dmVjfSBBIHVuaXQgdmVjdG9yICgxLCAwKVxuICovXG52ZWMudXggPSAoKSA9PiB2ZWMoMSwgMCk7XG5cbi8qKlxuICogUmV0dXJuIGEgdW5pdCB2ZWN0b3IgKDAsIDEpXG4gKiBAcmV0dXJuIHt2ZWN9IEEgdW5pdCB2ZWN0b3IgKDAsIDEpXG4gKi9cbnZlYy51eSA9ICgpID0+IHZlYygwLCAxKTtcblxuLyoqXG4gKiBBZGQgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHt2ZWN9IGEgKyBiXG4gKi9cbnZlYy5hZGQgPSAoYSwgYikgPT4gKHsgeDogYS54ICsgYi54LCB5OiBhLnkgKyBiLnkgfSk7XG5cbi8qKlxuICogU2NhbGUgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge251bWJlcn0gYiBTY2FsYXIgYlxuICogQHJldHVybiB7dmVjfSBhICogYlxuICovXG52ZWMubXVsID0gKGEsIGIpID0+ICh7IHg6IGEueCAqIGIsIHk6IGEueSAqIGIgfSk7XG5cbi8qKlxuICogU3VidHJhY3QgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHt2ZWN9IGEgLSBiXG4gKi9cbnZlYy5zdWIgPSAoYSwgYikgPT4gKHsgeDogYS54IC0gYi54LCB5OiBhLnkgLSBiLnkgfSk7XG5cbi8qKlxuICogR2V0IHRoZSBsZW5ndGggb2YgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHxhfFxuICovXG52ZWMubGVuID0gYSA9PiBNYXRoLnNxcnQoYS54ICogYS54ICsgYS55ICogYS55KTtcblxuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiBhIHZlY3RvciB1c2luZyB0YXhpY2FiIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHJldHVybiB7bnVtYmVyfSB8YXxcbiAqL1xudmVjLm1hbmhhdHRhbiA9IGEgPT4gTWF0aC5hYnMoYS54KSArIE1hdGguYWJzKGEueSk7XG5cbi8qKlxuICogTm9ybWFsaXNlIGEgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlY30gYSBUaGUgdmVjdG9yIHRvIG5vcm1hbGlzZVxuICogQHJldHVybiB7dmVjfSBeYVxuICovXG52ZWMubm9yID0gYSA9PiB7XG4gIGxldCBsZW4gPSB2ZWMubGVuKGEpO1xuICByZXR1cm4gbGVuID8geyB4OiBhLnggLyBsZW4sIHk6IGEueSAvIGxlbiB9IDogdmVjKCk7XG59O1xuXG4vKipcbiAqIEdldCBhIGRvdCBwcm9kdWN0IG9mIHZlY3RvcnNcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge3ZlY30gYiBWZWN0b3IgYlxuICogQHJldHVybiB7bnVtYmVyfSBhIOKImSBiXG4gKi9cbnZlYy5kb3QgPSAoYSwgYikgPT4gYS54ICogYi54ICsgYS55ICogYi55O1xuXG4vKipcbiAqIFJvdGF0ZSBhIHZlY3RvciBieSByIHJhZGlhbnNcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gciBUaGUgYW5nbGUgdG8gcm90YXRlIGJ5LCBtZWFzdXJlZCBpbiByYWRpYW5zXG4gKiBAcmV0dXJuIHt2ZWN9IEEgcm90YXRlZCB2ZWN0b3JcbiAqL1xudmVjLnJvdCA9IChhLCByKSA9PiB7XG4gIGxldCBzID0gTWF0aC5zaW4ociksXG4gICAgYyA9IE1hdGguY29zKHIpO1xuICByZXR1cm4geyB4OiBjICogYS54IC0gcyAqIGEueSwgeTogcyAqIGEueCArIGMgKiBhLnkgfTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0d28gdmVjdG9ycyBhcmUgZXF1YWxcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge3ZlY30gYiBWZWN0b3IgYlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2ZWN0b3JzIGEgYW5kIGIgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xudmVjLmVxID0gKGEsIGIpID0+IGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55O1xuXG4vKipcbiAqIEdldCB0aGUgYW5nbGUgb2YgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBhbmdsZSBvZiB2ZWN0b3IgYSBpbiByYWRpYW5zXG4gKi9cbnZlYy5yYWQgPSBhID0+IE1hdGguYXRhbjIoYS55LCBhLngpO1xuXG4vKipcbiAqIENvcHkgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gY29weVxuICogQHJldHVybiB7dmVjfSBBIGNvcHkgb2YgdmVjdG9yIGFcbiAqL1xudmVjLmNweSA9IGEgPT4gdmVjKGEpO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGNvbXBvbmVudCBvZiBhIHZlY3RvclxuICogQGNhbGxiYWNrIHZlY3Rvck1hcENhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVGhlIGNvbXBvbmVudCB2YWx1ZVxuICogQHBhcmFtIHsneCcgfCAneSd9IGxhYmVsIFRoZSBjb21wb25lbnQgbGFiZWwgKHggb3IgeSlcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG1hcHBlZCBjb21wb25lbnRcbiAqL1xuXG4vKipcbiAqIENhbGwgYSBmdW5jdGlvbiBvbiBlYWNoIGNvbXBvbmVudCBvZiBhIHZlY3RvciBhbmQgYnVpbGQgYSBuZXcgdmVjdG9yIGZyb20gdGhlIHJlc3VsdHNcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge3ZlY3Rvck1hcENhbGxiYWNrfSBmIFRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqIEByZXR1cm4ge3ZlY30gVmVjdG9yIGEgbWFwcGVkIHRocm91Z2ggZlxuICovXG52ZWMubWFwID0gKGEsIGYpID0+ICh7IHg6IGYoYS54LCAneCcpLCB5OiBmKGEueSwgJ3knKSB9KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgdmVjdG9yIGludG8gYSBzdHJpbmdcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gY29udmVydFxuICogQHBhcmFtIHtzdHJpbmd9IFtzPScsICddIFRoZSBzZXBhcmF0b3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjLnN0ciA9IChhLCBzID0gJywgJykgPT4gYCR7YS54fSR7c30ke2EueX1gO1xuXG4vKipcbiAqIEEgbWF0cml4XG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBtYXRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtIFRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgbWF0cml4XG4gKiBAcHJvcGVydHkge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIG1hdHJpeFxuICogQHByb3BlcnR5IHtBcnJheTxudW1iZXI+fSBlbnRyaWVzIFRoZSBtYXRyaXggdmFsdWVzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgbWF0cml4XG4gKiBAcGFyYW0ge251bWJlcn0gW209NF0gVGhlIG51bWJlciBvZiByb3dzXG4gKiBAcGFyYW0ge251bWJlcn0gW249NF0gVGhlIG51bWJlciBvZiBjb2x1bW5zXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtlbnRyaWVzPVtdXSBNYXRyaXggdmFsdWVzIGluIHJlYWRpbmcgb3JkZXJcbiAqIEByZXR1cm4ge21hdH0gQSBuZXcgbWF0cml4XG4gKi9cbmNvbnN0IG1hdCA9IChtID0gNCwgbiA9IDQsIGVudHJpZXMgPSBbXSkgPT4gKHtcbiAgbSwgbixcbiAgZW50cmllczogZW50cmllcy5jb25jYXQoQXJyYXkobSAqIG4pLmZpbGwoMCkpLnNsaWNlKDAsIG0gKiBuKVxufSk7XG5cbi8qKlxuICogR2V0IGFuIGlkZW50aXR5IG1hdHJpeCBvZiBzaXplIG5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSBtYXRyaXhcbiAqIEByZXR1cm4ge21hdH0gQW4gaWRlbnRpdHkgbWF0cml4XG4gKi9cbm1hdC5pZGVudGl0eSA9IG4gPT4gbWF0KG4sIG4sIEFycmF5KG4gKiBuKS5maWxsKDApLm1hcCgodiwgaSkgPT4gKyhNYXRoLmZsb29yKGkgLyBuKSA9PT0gaSAlIG4pKSk7XG5cbi8qKlxuICogR2V0IGFuIGVudHJ5IGZyb20gYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcm93IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IGogVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIHZhbHVlIGF0IHBvc2l0aW9uIChpLCBqKSBpbiBtYXRyaXggYVxuICovXG5tYXQuZ2V0ID0gKGEsIGksIGopID0+IGEuZW50cmllc1soaiAtIDEpICsgKGkgLSAxKSAqIGEubl07XG5cbi8qKlxuICogU2V0IGFuIGVudHJ5IG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHJvdyBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gdiBUaGUgdmFsdWUgdG8gc2V0IGluIG1hdHJpeCBhXG4gKi9cbm1hdC5zZXQgPSAoYSwgaSwgaiwgdikgPT4geyBhLmVudHJpZXNbKGogLSAxKSArIChpIC0gMSkgKiBhLm5dID0gdjsgfTtcblxuLyoqXG4gKiBHZXQgYSByb3cgZnJvbSBhIG1hdHJpeCBhcyBhbiBhcnJheVxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBtIFRoZSByb3cgb2Zmc2V0XG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBSb3cgbSBmcm9tIG1hdHJpeCBhXG4gKi9cbm1hdC5yb3cgPSAoYSwgbSkgPT4ge1xuICBjb25zdCBzID0gKG0gLSAxKSAqIGEubjtcbiAgcmV0dXJuIGEuZW50cmllcy5zbGljZShzLCBzICsgYS5uKTtcbn07XG5cbi8qKlxuICogR2V0IGEgY29sdW1uIGZyb20gYSBtYXRyaXggYXMgYW4gYXJyYXlcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgY29sdW1uIG9mZnNldFxuICogQHJldHVybiB7QXJyYXk8bnVtYmVyPn0gQ29sdW1uIG4gZnJvbSBtYXRyaXggYVxuICovXG5tYXQuY29sID0gKGEsIG4pID0+IEFycmF5LnRpbWVzKGkgPT4gbWF0LmdldChhLCAoaSArIDEpLCBuKSwgYS5tKTtcblxuLyoqXG4gKiBBZGQgbWF0cmljZXNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7bWF0fSBhICsgYlxuICovXG5tYXQuYWRkID0gKGEsIGIpID0+IGEubSA9PT0gYi5tICYmIGEubiA9PT0gYi5uICYmIG1hdC5tYXAoYSwgKHYsIGkpID0+IHYgKyBiLmVudHJpZXNbaV0pO1xuXG4vKipcbiAqIFN1YnRyYWN0IG1hdHJpY2VzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge21hdH0gYSAtIGJcbiAqL1xubWF0LnN1YiA9IChhLCBiKSA9PiBhLm0gPT09IGIubSAmJiBhLm4gPT09IGIubiAmJiBtYXQubWFwKGEsICh2LCBpKSA9PiB2IC0gYi5lbnRyaWVzW2ldKTtcblxuLyoqXG4gKiBNdWx0aXBseSBtYXRyaWNlc1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gYWIgb3IgZmFsc2UgaWYgdGhlIG1hdHJpY2VzIGNhbm5vdCBiZSBtdWx0aXBsaWVkXG4gKi9cbm1hdC5tdWwgPSAoYSwgYikgPT4ge1xuICBpZiAoYS5uICE9PSBiLm0pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IHJlc3VsdCA9IG1hdChhLm0sIGIubik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IGEubTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gYi5uOyBqKyspIHtcbiAgICAgIG1hdC5zZXQocmVzdWx0LCBpLCBqLCBNYXRoLmRvdChtYXQucm93KGEsIGkpLCBtYXQuY29sKGIsIGopKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFNjYWxlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGIgU2NhbGFyIGJcbiAqIEByZXR1cm4ge21hdH0gYSAqIGJcbiAqL1xubWF0LnNjYWxlID0gKGEsIGIpID0+IG1hdC5tYXAoYSwgdiA9PiB2ICogYik7XG5cbi8qKlxuICogVHJhbnNwb3NlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIHRyYW5zcG9zZVxuICogQHJldHVybiB7bWF0fSBBIHRyYW5zcG9zZWQgbWF0cml4XG4gKi9cbm1hdC50cmFucyA9IGEgPT4gbWF0KGEubiwgYS5tLCBBcnJheS50aW1lcyhpID0+IG1hdC5jb2woYSwgKGkgKyAxKSksIGEubikuZmxhdCgpKTtcblxuLyoqXG4gKiBHZXQgdGhlIG1pbm9yIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHJvdyBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gVGhlIChpLCBqKSBtaW5vciBvZiBtYXRyaXggYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm1pbm9yID0gKGEsIGksIGopID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCBlbnRyaWVzID0gW107XG4gIGZvciAobGV0IGlpID0gMTsgaWkgPD0gYS5tOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpKSB7IGNvbnRpbnVlOyB9XG4gICAgZm9yIChsZXQgamogPSAxOyBqaiA8PSBhLm47IGpqKyspIHtcbiAgICAgIGlmIChqaiA9PT0gaikgeyBjb250aW51ZTsgfVxuICAgICAgZW50cmllcy5wdXNoKG1hdC5nZXQoYSwgaWksIGpqKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXQoYS5tIC0gMSwgYS5uIC0gMSwgZW50cmllcyk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcmV0dXJuIHtudW1iZXJ8Ym9vbGVhbn0gfGF8IG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaXMgbm90IHNxdWFyZVxuICovXG5tYXQuZGV0ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGEubSA9PT0gMSkge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF07XG4gIH1cbiAgaWYgKGEubSA9PT0gMikge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF0gKiBhLmVudHJpZXNbM10gLSBhLmVudHJpZXNbMV0gKiBhLmVudHJpZXNbMl07XG4gIH1cbiAgbGV0IHRvdGFsID0gMCwgc2lnbiA9IDE7XG4gIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgdG90YWwgKz0gc2lnbiAqIGEuZW50cmllc1tqIC0gMV0gKiBtYXQuZGV0KG1hdC5taW5vcihhLCAxLCBqKSk7XG4gICAgc2lnbiAqPSAtMTtcbiAgfVxuICByZXR1cm4gdG90YWw7XG59O1xuXG4vKipcbiAqIE5vcm1hbGlzZSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBub3JtYWxpc2VcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBeYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm5vciA9IGEgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IGQgPSBtYXQuZGV0KGEpO1xuICByZXR1cm4gbWF0Lm1hcChhLCBpID0+IGkgKiBkKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCBmcm9tIHdoaWNoIHRvIGdldCB0aGUgYWRqdWdhdGVcbiAqIEByZXR1cm4ge21hdH0gVGhlIGFkanVnYXRlIG9mIGFcbiAqL1xubWF0LmFkaiA9IGEgPT4ge1xuICBjb25zdCBtaW5vcnMgPSBtYXQoYS5tLCBhLm4pO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBhLm07IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgICBtYXQuc2V0KG1pbm9ycywgaSwgaiwgbWF0LmRldChtYXQubWlub3IoYSwgaSwgaikpKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY29mYWN0b3JzID0gbWF0Lm1hcChtaW5vcnMsICh2LCBpKSA9PiB2ICogKGkgJSAyID8gLTEgOiAxKSk7XG4gIHJldHVybiBtYXQudHJhbnMoY29mYWN0b3JzKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBpbnZlcnNlIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIGludmVydFxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IGFeLTEgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBoYXMgbm8gaW52ZXJzZVxuICovXG5tYXQuaW52ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgZCA9IG1hdC5kZXQoYSk7XG4gIGlmIChkID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gbWF0LnNjYWxlKG1hdC5hZGooYSksIDEgLyBkKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIG1hdHJpY2VzIGFyZSBlcXVhbFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1hdHJpY2VzIGEgYW5kIGIgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbm1hdC5lcSA9IChhLCBiKSA9PiBhLm0gPT09IGIubSAmJiBhLm4gPT09IGIubiAmJiBtYXQuc3RyKGEpID09PSBtYXQuc3RyKGIpO1xuXG4vKipcbiAqIENvcHkgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybiB7bWF0fSBBIGNvcHkgb2YgbWF0cml4IGFcbiAqL1xubWF0LmNweSA9IGEgPT4gbWF0KGEubSwgYS5uLCBbLi4uYS5lbnRyaWVzXSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBjYWxsYmFjayBtYXRyaXhNYXBDYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSBlbnRyeSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBlbnRyeSBpbmRleFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBlbnRyaWVzIFRoZSBhcnJheSBvZiBtYXRyaXggZW50cmllc1xuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGVudHJ5XG4gKi9cblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gb24gZWFjaCBlbnRyeSBvZiBhIG1hdHJpeCBhbmQgYnVpbGQgYSBuZXcgbWF0cml4IGZyb20gdGhlIHJlc3VsdHNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdHJpeE1hcENhbGxiYWNrfSBmIFRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBNYXRyaXggYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbm1hdC5tYXAgPSAoYSwgZikgPT4gbWF0KGEubSwgYS5uLCBhLmVudHJpZXMubWFwKGYpKTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgbWF0cml4IGludG8gYSBzdHJpbmdcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29udmVydFxuICogQHBhcmFtIHtzdHJpbmd9IFttcz0nLCAnXSBUaGUgc2VwYXJhdG9yIHN0cmluZyBmb3IgY29sdW1uc1xuICogQHBhcmFtIHtzdHJpbmd9IFtucz0nXFxuJ10gVGhlIHNlcGFyYXRvciBzdHJpbmcgZm9yIHJvd3NcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQuc3RyID0gKGEsIG1zID0gJywgJywgbnMgPSAnXFxuJykgPT4gYS5lbnRyaWVzLmNodW5rKGEubikubWFwKHIgPT4gci5qb2luKG1zKSkuam9pbihucyk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHsgdmVjLCBtYXQgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gdm9pZCAwO1xuY29uc3QgY29yZV8xID0gcmVxdWlyZShcIi4vY29yZVwiKTtcbmNvbnN0IGRyYWZ0N18xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL2RyYWZ0N1wiKTtcbmNvbnN0IGRpc2NyaW1pbmF0b3JfMSA9IHJlcXVpcmUoXCIuL3ZvY2FidWxhcmllcy9kaXNjcmltaW5hdG9yXCIpO1xuY29uc3QgZHJhZnQ3TWV0YVNjaGVtYSA9IHJlcXVpcmUoXCIuL3JlZnMvanNvbi1zY2hlbWEtZHJhZnQtMDcuanNvblwiKTtcbmNvbnN0IE1FVEFfU1VQUE9SVF9EQVRBID0gW1wiL3Byb3BlcnRpZXNcIl07XG5jb25zdCBNRVRBX1NDSEVNQV9JRCA9IFwiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWFcIjtcbmNsYXNzIEFqdiBleHRlbmRzIGNvcmVfMS5kZWZhdWx0IHtcbiAgICBfYWRkVm9jYWJ1bGFyaWVzKCkge1xuICAgICAgICBzdXBlci5fYWRkVm9jYWJ1bGFyaWVzKCk7XG4gICAgICAgIGRyYWZ0N18xLmRlZmF1bHQuZm9yRWFjaCgodikgPT4gdGhpcy5hZGRWb2NhYnVsYXJ5KHYpKTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5kaXNjcmltaW5hdG9yKVxuICAgICAgICAgICAgdGhpcy5hZGRLZXl3b3JkKGRpc2NyaW1pbmF0b3JfMS5kZWZhdWx0KTtcbiAgICB9XG4gICAgX2FkZERlZmF1bHRNZXRhU2NoZW1hKCkge1xuICAgICAgICBzdXBlci5fYWRkRGVmYXVsdE1ldGFTY2hlbWEoKTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdHMubWV0YSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbWV0YVNjaGVtYSA9IHRoaXMub3B0cy4kZGF0YVxuICAgICAgICAgICAgPyB0aGlzLiRkYXRhTWV0YVNjaGVtYShkcmFmdDdNZXRhU2NoZW1hLCBNRVRBX1NVUFBPUlRfREFUQSlcbiAgICAgICAgICAgIDogZHJhZnQ3TWV0YVNjaGVtYTtcbiAgICAgICAgdGhpcy5hZGRNZXRhU2NoZW1hKG1ldGFTY2hlbWEsIE1FVEFfU0NIRU1BX0lELCBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVmc1tcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvc2NoZW1hXCJdID0gTUVUQV9TQ0hFTUFfSUQ7XG4gICAgfVxuICAgIGRlZmF1bHRNZXRhKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0cy5kZWZhdWx0TWV0YSA9XG4gICAgICAgICAgICBzdXBlci5kZWZhdWx0TWV0YSgpIHx8ICh0aGlzLmdldFNjaGVtYShNRVRBX1NDSEVNQV9JRCkgPyBNRVRBX1NDSEVNQV9JRCA6IHVuZGVmaW5lZCkpO1xuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IEFqdjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFqdjtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIktleXdvcmRDeHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlXzEuS2V5d29yZEN4dDsgfSB9KTtcbnZhciBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cmluZ2lmeTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5OYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29kZUdlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLkNvZGVHZW47IH0gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hanYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlZ2V4cENvZGUgPSBleHBvcnRzLmdldEVzbUV4cG9ydE5hbWUgPSBleHBvcnRzLmdldFByb3BlcnR5ID0gZXhwb3J0cy5zYWZlU3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ckNvbmNhdCA9IGV4cG9ydHMuYWRkQ29kZUFyZyA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLl9Db2RlID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5JREVOVElGSUVSID0gZXhwb3J0cy5fQ29kZU9yTmFtZSA9IHZvaWQgMDtcbmNsYXNzIF9Db2RlT3JOYW1lIHtcbn1cbmV4cG9ydHMuX0NvZGVPck5hbWUgPSBfQ29kZU9yTmFtZTtcbmV4cG9ydHMuSURFTlRJRklFUiA9IC9eW2EteiRfXVthLXokXzAtOV0qJC9pO1xuY2xhc3MgTmFtZSBleHRlbmRzIF9Db2RlT3JOYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICghZXhwb3J0cy5JREVOVElGSUVSLnRlc3QocykpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2RlR2VuOiBuYW1lIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXCIpO1xuICAgICAgICB0aGlzLnN0ciA9IHM7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxuICAgIGVtcHR5U3RyKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHsgW3RoaXMuc3RyXTogMSB9O1xuICAgIH1cbn1cbmV4cG9ydHMuTmFtZSA9IE5hbWU7XG5jbGFzcyBfQ29kZSBleHRlbmRzIF9Db2RlT3JOYW1lIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gdHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIgPyBbY29kZV0gOiBjb2RlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbiAgICBlbXB0eVN0cigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9pdGVtc1swXTtcbiAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwiXCIgfHwgaXRlbSA9PT0gJ1wiXCInO1xuICAgIH1cbiAgICBnZXQgc3RyKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5fc3RyKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAodGhpcy5fc3RyID0gdGhpcy5faXRlbXMucmVkdWNlKChzLCBjKSA9PiBgJHtzfSR7Y31gLCBcIlwiKSkpO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLl9uYW1lcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKHRoaXMuX25hbWVzID0gdGhpcy5faXRlbXMucmVkdWNlKChuYW1lcywgYykgPT4ge1xuICAgICAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBOYW1lKVxuICAgICAgICAgICAgICAgIG5hbWVzW2Muc3RyXSA9IChuYW1lc1tjLnN0cl0gfHwgMCkgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgICAgICB9LCB7fSkpKTtcbiAgICB9XG59XG5leHBvcnRzLl9Db2RlID0gX0NvZGU7XG5leHBvcnRzLm5pbCA9IG5ldyBfQ29kZShcIlwiKTtcbmZ1bmN0aW9uIF8oc3RycywgLi4uYXJncykge1xuICAgIGNvbnN0IGNvZGUgPSBbc3Ryc1swXV07XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgYXJncy5sZW5ndGgpIHtcbiAgICAgICAgYWRkQ29kZUFyZyhjb2RlLCBhcmdzW2ldKTtcbiAgICAgICAgY29kZS5wdXNoKHN0cnNbKytpXSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgX0NvZGUoY29kZSk7XG59XG5leHBvcnRzLl8gPSBfO1xuY29uc3QgcGx1cyA9IG5ldyBfQ29kZShcIitcIik7XG5mdW5jdGlvbiBzdHIoc3RycywgLi4uYXJncykge1xuICAgIGNvbnN0IGV4cHIgPSBbc2FmZVN0cmluZ2lmeShzdHJzWzBdKV07XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgYXJncy5sZW5ndGgpIHtcbiAgICAgICAgZXhwci5wdXNoKHBsdXMpO1xuICAgICAgICBhZGRDb2RlQXJnKGV4cHIsIGFyZ3NbaV0pO1xuICAgICAgICBleHByLnB1c2gocGx1cywgc2FmZVN0cmluZ2lmeShzdHJzWysraV0pKTtcbiAgICB9XG4gICAgb3B0aW1pemUoZXhwcik7XG4gICAgcmV0dXJuIG5ldyBfQ29kZShleHByKTtcbn1cbmV4cG9ydHMuc3RyID0gc3RyO1xuZnVuY3Rpb24gYWRkQ29kZUFyZyhjb2RlLCBhcmcpIHtcbiAgICBpZiAoYXJnIGluc3RhbmNlb2YgX0NvZGUpXG4gICAgICAgIGNvZGUucHVzaCguLi5hcmcuX2l0ZW1zKTtcbiAgICBlbHNlIGlmIChhcmcgaW5zdGFuY2VvZiBOYW1lKVxuICAgICAgICBjb2RlLnB1c2goYXJnKTtcbiAgICBlbHNlXG4gICAgICAgIGNvZGUucHVzaChpbnRlcnBvbGF0ZShhcmcpKTtcbn1cbmV4cG9ydHMuYWRkQ29kZUFyZyA9IGFkZENvZGVBcmc7XG5mdW5jdGlvbiBvcHRpbWl6ZShleHByKSB7XG4gICAgbGV0IGkgPSAxO1xuICAgIHdoaWxlIChpIDwgZXhwci5sZW5ndGggLSAxKSB7XG4gICAgICAgIGlmIChleHByW2ldID09PSBwbHVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBtZXJnZUV4cHJJdGVtcyhleHByW2kgLSAxXSwgZXhwcltpICsgMV0pO1xuICAgICAgICAgICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZXhwci5zcGxpY2UoaSAtIDEsIDMsIHJlcyk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByW2krK10gPSBcIitcIjtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxufVxuZnVuY3Rpb24gbWVyZ2VFeHBySXRlbXMoYSwgYikge1xuICAgIGlmIChiID09PSAnXCJcIicpXG4gICAgICAgIHJldHVybiBhO1xuICAgIGlmIChhID09PSAnXCJcIicpXG4gICAgICAgIHJldHVybiBiO1xuICAgIGlmICh0eXBlb2YgYSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChiIGluc3RhbmNlb2YgTmFtZSB8fCBhW2EubGVuZ3RoIC0gMV0gIT09ICdcIicpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGAke2Euc2xpY2UoMCwgLTEpfSR7Yn1cImA7XG4gICAgICAgIGlmIChiWzBdID09PSAnXCInKVxuICAgICAgICAgICAgcmV0dXJuIGEuc2xpY2UoMCwgLTEpICsgYi5zbGljZSgxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGIgPT0gXCJzdHJpbmdcIiAmJiBiWzBdID09PSAnXCInICYmICEoYSBpbnN0YW5jZW9mIE5hbWUpKVxuICAgICAgICByZXR1cm4gYFwiJHthfSR7Yi5zbGljZSgxKX1gO1xuICAgIHJldHVybjtcbn1cbmZ1bmN0aW9uIHN0ckNvbmNhdChjMSwgYzIpIHtcbiAgICByZXR1cm4gYzIuZW1wdHlTdHIoKSA/IGMxIDogYzEuZW1wdHlTdHIoKSA/IGMyIDogc3RyIGAke2MxfSR7YzJ9YDtcbn1cbmV4cG9ydHMuc3RyQ29uY2F0ID0gc3RyQ29uY2F0O1xuLy8gVE9ETyBkbyBub3QgYWxsb3cgYXJyYXlzIGhlcmVcbmZ1bmN0aW9uIGludGVycG9sYXRlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgeCA9PSBcImJvb2xlYW5cIiB8fCB4ID09PSBudWxsXG4gICAgICAgID8geFxuICAgICAgICA6IHNhZmVTdHJpbmdpZnkoQXJyYXkuaXNBcnJheSh4KSA/IHguam9pbihcIixcIikgOiB4KTtcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeSh4KSB7XG4gICAgcmV0dXJuIG5ldyBfQ29kZShzYWZlU3RyaW5naWZ5KHgpKTtcbn1cbmV4cG9ydHMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5O1xuZnVuY3Rpb24gc2FmZVN0cmluZ2lmeSh4KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHgpXG4gICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxcXHUyMDI4XCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHUyMDI5L2csIFwiXFxcXHUyMDI5XCIpO1xufVxuZXhwb3J0cy5zYWZlU3RyaW5naWZ5ID0gc2FmZVN0cmluZ2lmeTtcbmZ1bmN0aW9uIGdldFByb3BlcnR5KGtleSkge1xuICAgIHJldHVybiB0eXBlb2Yga2V5ID09IFwic3RyaW5nXCIgJiYgZXhwb3J0cy5JREVOVElGSUVSLnRlc3Qoa2V5KSA/IG5ldyBfQ29kZShgLiR7a2V5fWApIDogXyBgWyR7a2V5fV1gO1xufVxuZXhwb3J0cy5nZXRQcm9wZXJ0eSA9IGdldFByb3BlcnR5O1xuLy9Eb2VzIGJlc3QgZWZmb3J0IHRvIGZvcm1hdCB0aGUgbmFtZSBwcm9wZXJseVxuZnVuY3Rpb24gZ2V0RXNtRXhwb3J0TmFtZShrZXkpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSBcInN0cmluZ1wiICYmIGV4cG9ydHMuSURFTlRJRklFUi50ZXN0KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfQ29kZShgJHtrZXl9YCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogaW52YWxpZCBleHBvcnQgbmFtZTogJHtrZXl9LCB1c2UgZXhwbGljaXQgJGlkIG5hbWUgbWFwcGluZ2ApO1xufVxuZXhwb3J0cy5nZXRFc21FeHBvcnROYW1lID0gZ2V0RXNtRXhwb3J0TmFtZTtcbmZ1bmN0aW9uIHJlZ2V4cENvZGUocngpIHtcbiAgICByZXR1cm4gbmV3IF9Db2RlKHJ4LnRvU3RyaW5nKCkpO1xufVxuZXhwb3J0cy5yZWdleHBDb2RlID0gcmVnZXhwQ29kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9yID0gZXhwb3J0cy5hbmQgPSBleHBvcnRzLm5vdCA9IGV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMub3BlcmF0b3JzID0gZXhwb3J0cy52YXJLaW5kcyA9IGV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBleHBvcnRzLlZhbHVlU2NvcGUgPSBleHBvcnRzLlNjb3BlID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5yZWdleHBDb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLmdldFByb3BlcnR5ID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0ckNvbmNhdCA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gdm9pZCAwO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4vY29kZVwiKTtcbmNvbnN0IHNjb3BlXzEgPSByZXF1aXJlKFwiLi9zY29wZVwiKTtcbnZhciBjb2RlXzIgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLl87IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJDb25jYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHJDb25jYXQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuaWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5uaWw7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRQcm9wZXJ0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLmdldFByb3BlcnR5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVnZXhwQ29kZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnJlZ2V4cENvZGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuTmFtZTsgfSB9KTtcbnZhciBzY29wZV8yID0gcmVxdWlyZShcIi4vc2NvcGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTY29wZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi5TY29wZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbHVlU2NvcGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIuVmFsdWVTY29wZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbHVlU2NvcGVOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLlZhbHVlU2NvcGVOYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFyS2luZHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIudmFyS2luZHM7IH0gfSk7XG5leHBvcnRzLm9wZXJhdG9ycyA9IHtcbiAgICBHVDogbmV3IGNvZGVfMS5fQ29kZShcIj5cIiksXG4gICAgR1RFOiBuZXcgY29kZV8xLl9Db2RlKFwiPj1cIiksXG4gICAgTFQ6IG5ldyBjb2RlXzEuX0NvZGUoXCI8XCIpLFxuICAgIExURTogbmV3IGNvZGVfMS5fQ29kZShcIjw9XCIpLFxuICAgIEVROiBuZXcgY29kZV8xLl9Db2RlKFwiPT09XCIpLFxuICAgIE5FUTogbmV3IGNvZGVfMS5fQ29kZShcIiE9PVwiKSxcbiAgICBOT1Q6IG5ldyBjb2RlXzEuX0NvZGUoXCIhXCIpLFxuICAgIE9SOiBuZXcgY29kZV8xLl9Db2RlKFwifHxcIiksXG4gICAgQU5EOiBuZXcgY29kZV8xLl9Db2RlKFwiJiZcIiksXG4gICAgQUREOiBuZXcgY29kZV8xLl9Db2RlKFwiK1wiKSxcbn07XG5jbGFzcyBOb2RlIHtcbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhfbmFtZXMsIF9jb25zdGFudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuY2xhc3MgRGVmIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IodmFyS2luZCwgbmFtZSwgcmhzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFyS2luZCA9IHZhcktpbmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucmhzID0gcmhzO1xuICAgIH1cbiAgICByZW5kZXIoeyBlczUsIF9uIH0pIHtcbiAgICAgICAgY29uc3QgdmFyS2luZCA9IGVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogdGhpcy52YXJLaW5kO1xuICAgICAgICBjb25zdCByaHMgPSB0aGlzLnJocyA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGAgPSAke3RoaXMucmhzfWA7XG4gICAgICAgIHJldHVybiBgJHt2YXJLaW5kfSAke3RoaXMubmFtZX0ke3Joc307YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKCFuYW1lc1t0aGlzLm5hbWUuc3RyXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucmhzKVxuICAgICAgICAgICAgdGhpcy5yaHMgPSBvcHRpbWl6ZUV4cHIodGhpcy5yaHMsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yaHMgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGVPck5hbWUgPyB0aGlzLnJocy5uYW1lcyA6IHt9O1xuICAgIH1cbn1cbmNsYXNzIEFzc2lnbiBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxocywgcmhzLCBzaWRlRWZmZWN0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxocyA9IGxocztcbiAgICAgICAgdGhpcy5yaHMgPSByaHM7XG4gICAgICAgIHRoaXMuc2lkZUVmZmVjdHMgPSBzaWRlRWZmZWN0cztcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5saHN9ID0gJHt0aGlzLnJoc307YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKHRoaXMubGhzIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgJiYgIW5hbWVzW3RoaXMubGhzLnN0cl0gJiYgIXRoaXMuc2lkZUVmZmVjdHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucmhzID0gb3B0aW1pemVFeHByKHRoaXMucmhzLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSB0aGlzLmxocyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8ge30gOiB7IC4uLnRoaXMubGhzLm5hbWVzIH07XG4gICAgICAgIHJldHVybiBhZGRFeHByTmFtZXMobmFtZXMsIHRoaXMucmhzKTtcbiAgICB9XG59XG5jbGFzcyBBc3NpZ25PcCBleHRlbmRzIEFzc2lnbiB7XG4gICAgY29uc3RydWN0b3IobGhzLCBvcCwgcmhzLCBzaWRlRWZmZWN0cykge1xuICAgICAgICBzdXBlcihsaHMsIHJocywgc2lkZUVmZmVjdHMpO1xuICAgICAgICB0aGlzLm9wID0gb3A7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGhzfSAke3RoaXMub3B9PSAke3RoaXMucmhzfTtgICsgX247XG4gICAgfVxufVxuY2xhc3MgTGFiZWwgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZXMgPSB7fTtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH06YCArIF9uO1xuICAgIH1cbn1cbmNsYXNzIEJyZWFrIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IobGFiZWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWVzID0ge307XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsID8gYCAke3RoaXMubGFiZWx9YCA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgYnJlYWske2xhYmVsfTtgICsgX247XG4gICAgfVxufVxuY2xhc3MgVGhyb3cgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGB0aHJvdyAke3RoaXMuZXJyb3J9O2AgKyBfbjtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvci5uYW1lcztcbiAgICB9XG59XG5jbGFzcyBBbnlDb2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvZGV9O2AgKyBfbjtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29kZX1gID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHRoaXMuY29kZSA9IG9wdGltaXplRXhwcih0aGlzLmNvZGUsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2RlIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlT3JOYW1lID8gdGhpcy5jb2RlLm5hbWVzIDoge307XG4gICAgfVxufVxuY2xhc3MgUGFyZW50Tm9kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5vZGVzID0gW10pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoKGNvZGUsIG4pID0+IGNvZGUgKyBuLnJlbmRlcihvcHRzKSwgXCJcIik7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBuID0gbm9kZXNbaV0ub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobikpXG4gICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEsIC4uLm4pO1xuICAgICAgICAgICAgZWxzZSBpZiAobilcbiAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IG47XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2Rlcy5sZW5ndGggPiAwID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAvLyBpdGVyYXRpbmcgYmFja3dhcmRzIGltcHJvdmVzIDEtcGFzcyBvcHRpbWl6YXRpb25cbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChuLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBzdWJ0cmFjdE5hbWVzKG5hbWVzLCBuLm5hbWVzKTtcbiAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZXMubGVuZ3RoID4gMCA/IHRoaXMgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMucmVkdWNlKChuYW1lcywgbikgPT4gYWRkTmFtZXMobmFtZXMsIG4ubmFtZXMpLCB7fSk7XG4gICAgfVxufVxuY2xhc3MgQmxvY2tOb2RlIGV4dGVuZHMgUGFyZW50Tm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIFwie1wiICsgb3B0cy5fbiArIHN1cGVyLnJlbmRlcihvcHRzKSArIFwifVwiICsgb3B0cy5fbjtcbiAgICB9XG59XG5jbGFzcyBSb290IGV4dGVuZHMgUGFyZW50Tm9kZSB7XG59XG5jbGFzcyBFbHNlIGV4dGVuZHMgQmxvY2tOb2RlIHtcbn1cbkVsc2Uua2luZCA9IFwiZWxzZVwiO1xuY2xhc3MgSWYgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmRpdGlvbiwgbm9kZXMpIHtcbiAgICAgICAgc3VwZXIobm9kZXMpO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBgaWYoJHt0aGlzLmNvbmRpdGlvbn0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuZWxzZSlcbiAgICAgICAgICAgIGNvZGUgKz0gXCJlbHNlIFwiICsgdGhpcy5lbHNlLnJlbmRlcihvcHRzKTtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgY29uc3QgY29uZCA9IHRoaXMuY29uZGl0aW9uO1xuICAgICAgICBpZiAoY29uZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzOyAvLyBlbHNlIGlzIGlnbm9yZWQgaGVyZVxuICAgICAgICBsZXQgZSA9IHRoaXMuZWxzZTtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5zID0gZS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICBlID0gdGhpcy5lbHNlID0gQXJyYXkuaXNBcnJheShucykgPyBuZXcgRWxzZShucykgOiBucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgaWYgKGNvbmQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgSWYgPyBlIDogZS5ub2RlcztcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBuZXcgSWYobm90KGNvbmQpLCBlIGluc3RhbmNlb2YgSWYgPyBbZV0gOiBlLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZCA9PT0gZmFsc2UgfHwgIXRoaXMubm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuZWxzZSA9IChfYSA9IHRoaXMuZWxzZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIGlmICghKHN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykgfHwgdGhpcy5lbHNlKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jb25kaXRpb24gPSBvcHRpbWl6ZUV4cHIodGhpcy5jb25kaXRpb24sIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHN1cGVyLm5hbWVzO1xuICAgICAgICBhZGRFeHByTmFtZXMobmFtZXMsIHRoaXMuY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuZWxzZSlcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmVsc2UubmFtZXMpO1xuICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgfVxufVxuSWYua2luZCA9IFwiaWZcIjtcbmNsYXNzIEZvciBleHRlbmRzIEJsb2NrTm9kZSB7XG59XG5Gb3Iua2luZCA9IFwiZm9yXCI7XG5jbGFzcyBGb3JMb29wIGV4dGVuZHMgRm9yIHtcbiAgICBjb25zdHJ1Y3RvcihpdGVyYXRpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pdGVyYXRpb24gPSBpdGVyYXRpb247XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dGhpcy5pdGVyYXRpb259KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIXN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXRlcmF0aW9uID0gb3B0aW1pemVFeHByKHRoaXMuaXRlcmF0aW9uLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGFkZE5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLml0ZXJhdGlvbi5uYW1lcyk7XG4gICAgfVxufVxuY2xhc3MgRm9yUmFuZ2UgZXh0ZW5kcyBGb3Ige1xuICAgIGNvbnN0cnVjdG9yKHZhcktpbmQsIG5hbWUsIGZyb20sIHRvKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFyS2luZCA9IHZhcktpbmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgICAgIHRoaXMudG8gPSB0bztcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgY29uc3QgdmFyS2luZCA9IG9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiB0aGlzLnZhcktpbmQ7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZnJvbSwgdG8gfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dmFyS2luZH0gJHtuYW1lfT0ke2Zyb219OyAke25hbWV9PCR7dG99OyAke25hbWV9KyspYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IGFkZEV4cHJOYW1lcyhzdXBlci5uYW1lcywgdGhpcy5mcm9tKTtcbiAgICAgICAgcmV0dXJuIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy50byk7XG4gICAgfVxufVxuY2xhc3MgRm9ySXRlciBleHRlbmRzIEZvciB7XG4gICAgY29uc3RydWN0b3IobG9vcCwgdmFyS2luZCwgbmFtZSwgaXRlcmFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pdGVyYWJsZSA9IGl0ZXJhYmxlO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gYGZvcigke3RoaXMudmFyS2luZH0gJHt0aGlzLm5hbWV9ICR7dGhpcy5sb29wfSAke3RoaXMuaXRlcmFibGV9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIXN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXRlcmFibGUgPSBvcHRpbWl6ZUV4cHIodGhpcy5pdGVyYWJsZSwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBhZGROYW1lcyhzdXBlci5uYW1lcywgdGhpcy5pdGVyYWJsZS5uYW1lcyk7XG4gICAgfVxufVxuY2xhc3MgRnVuYyBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYXJncywgYXN5bmMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgdGhpcy5hc3luYyA9IGFzeW5jO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBjb25zdCBfYXN5bmMgPSB0aGlzLmFzeW5jID8gXCJhc3luYyBcIiA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgJHtfYXN5bmN9ZnVuY3Rpb24gJHt0aGlzLm5hbWV9KCR7dGhpcy5hcmdzfSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cbkZ1bmMua2luZCA9IFwiZnVuY1wiO1xuY2xhc3MgUmV0dXJuIGV4dGVuZHMgUGFyZW50Tm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIFwicmV0dXJuIFwiICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cblJldHVybi5raW5kID0gXCJyZXR1cm5cIjtcbmNsYXNzIFRyeSBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBcInRyeVwiICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5jYXRjaClcbiAgICAgICAgICAgIGNvZGUgKz0gdGhpcy5jYXRjaC5yZW5kZXIob3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHkpXG4gICAgICAgICAgICBjb2RlICs9IHRoaXMuZmluYWxseS5yZW5kZXIob3B0cyk7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlci5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIChfYSA9IHRoaXMuY2F0Y2gpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIChfYiA9IHRoaXMuZmluYWxseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlci5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICAoX2EgPSB0aGlzLmNhdGNoKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgKF9iID0gdGhpcy5maW5hbGx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBzdXBlci5uYW1lcztcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2gpXG4gICAgICAgICAgICBhZGROYW1lcyhuYW1lcywgdGhpcy5jYXRjaC5uYW1lcyk7XG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHkpXG4gICAgICAgICAgICBhZGROYW1lcyhuYW1lcywgdGhpcy5maW5hbGx5Lm5hbWVzKTtcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgIH1cbn1cbmNsYXNzIENhdGNoIGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgY2F0Y2goJHt0aGlzLmVycm9yfSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cbkNhdGNoLmtpbmQgPSBcImNhdGNoXCI7XG5jbGFzcyBGaW5hbGx5IGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJmaW5hbGx5XCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuRmluYWxseS5raW5kID0gXCJmaW5hbGx5XCI7XG5jbGFzcyBDb2RlR2VuIHtcbiAgICBjb25zdHJ1Y3RvcihleHRTY29wZSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLl9ibG9ja1N0YXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jb25zdGFudHMgPSB7fTtcbiAgICAgICAgdGhpcy5vcHRzID0geyAuLi5vcHRzLCBfbjogb3B0cy5saW5lcyA/IFwiXFxuXCIgOiBcIlwiIH07XG4gICAgICAgIHRoaXMuX2V4dFNjb3BlID0gZXh0U2NvcGU7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbmV3IHNjb3BlXzEuU2NvcGUoeyBwYXJlbnQ6IGV4dFNjb3BlIH0pO1xuICAgICAgICB0aGlzLl9ub2RlcyA9IFtuZXcgUm9vdCgpXTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290LnJlbmRlcih0aGlzLm9wdHMpO1xuICAgIH1cbiAgICAvLyByZXR1cm5zIHVuaXF1ZSBuYW1lIGluIHRoZSBpbnRlcm5hbCBzY29wZVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZS5uYW1lKHByZWZpeCk7XG4gICAgfVxuICAgIC8vIHJlc2VydmVzIHVuaXF1ZSBuYW1lIGluIHRoZSBleHRlcm5hbCBzY29wZVxuICAgIHNjb3BlTmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLm5hbWUocHJlZml4KTtcbiAgICB9XG4gICAgLy8gcmVzZXJ2ZXMgdW5pcXVlIG5hbWUgaW4gdGhlIGV4dGVybmFsIHNjb3BlIGFuZCBhc3NpZ25zIHZhbHVlIHRvIGl0XG4gICAgc2NvcGVWYWx1ZShwcmVmaXhPck5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9leHRTY29wZS52YWx1ZShwcmVmaXhPck5hbWUsIHZhbHVlKTtcbiAgICAgICAgY29uc3QgdnMgPSB0aGlzLl92YWx1ZXNbbmFtZS5wcmVmaXhdIHx8ICh0aGlzLl92YWx1ZXNbbmFtZS5wcmVmaXhdID0gbmV3IFNldCgpKTtcbiAgICAgICAgdnMuYWRkKG5hbWUpO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgZ2V0U2NvcGVWYWx1ZShwcmVmaXgsIGtleU9yUmVmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRTY29wZS5nZXRWYWx1ZShwcmVmaXgsIGtleU9yUmVmKTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGNvZGUgdGhhdCBhc3NpZ25zIHZhbHVlcyBpbiB0aGUgZXh0ZXJuYWwgc2NvcGUgdG8gdGhlIG5hbWVzIHRoYXQgYXJlIHVzZWQgaW50ZXJuYWxseVxuICAgIC8vIChzYW1lIG5hbWVzIHRoYXQgd2VyZSByZXR1cm5lZCBieSBnZW4uc2NvcGVOYW1lIG9yIGdlbi5zY29wZVZhbHVlKVxuICAgIHNjb3BlUmVmcyhzY29wZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLnNjb3BlUmVmcyhzY29wZU5hbWUsIHRoaXMuX3ZhbHVlcyk7XG4gICAgfVxuICAgIHNjb3BlQ29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLnNjb3BlQ29kZSh0aGlzLl92YWx1ZXMpO1xuICAgIH1cbiAgICBfZGVmKHZhcktpbmQsIG5hbWVPclByZWZpeCwgcmhzLCBjb25zdGFudCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGlmIChyaHMgIT09IHVuZGVmaW5lZCAmJiBjb25zdGFudClcbiAgICAgICAgICAgIHRoaXMuX2NvbnN0YW50c1tuYW1lLnN0cl0gPSByaHM7XG4gICAgICAgIHRoaXMuX2xlYWZOb2RlKG5ldyBEZWYodmFyS2luZCwgbmFtZSwgcmhzKSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICAvLyBgY29uc3RgIGRlY2xhcmF0aW9uIChgdmFyYCBpbiBlczUgbW9kZSlcbiAgICBjb25zdChuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYoc2NvcGVfMS52YXJLaW5kcy5jb25zdCwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGBsZXRgIGRlY2xhcmF0aW9uIHdpdGggb3B0aW9uYWwgYXNzaWdubWVudCAoYHZhcmAgaW4gZXM1IG1vZGUpXG4gICAgbGV0KG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLmxldCwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGB2YXJgIGRlY2xhcmF0aW9uIHdpdGggb3B0aW9uYWwgYXNzaWdubWVudFxuICAgIHZhcihuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYoc2NvcGVfMS52YXJLaW5kcy52YXIsIG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpO1xuICAgIH1cbiAgICAvLyBhc3NpZ25tZW50IGNvZGVcbiAgICBhc3NpZ24obGhzLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgQXNzaWduKGxocywgcmhzLCBzaWRlRWZmZWN0cykpO1xuICAgIH1cbiAgICAvLyBgKz1gIGNvZGVcbiAgICBhZGQobGhzLCByaHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBBc3NpZ25PcChsaHMsIGV4cG9ydHMub3BlcmF0b3JzLkFERCwgcmhzKSk7XG4gICAgfVxuICAgIC8vIGFwcGVuZHMgcGFzc2VkIFNhZmVFeHByIHRvIGNvZGUgb3IgZXhlY3V0ZXMgQmxvY2tcbiAgICBjb2RlKGMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjID09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIGMoKTtcbiAgICAgICAgZWxzZSBpZiAoYyAhPT0gY29kZV8xLm5pbClcbiAgICAgICAgICAgIHRoaXMuX2xlYWZOb2RlKG5ldyBBbnlDb2RlKGMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIHJldHVybnMgY29kZSBmb3Igb2JqZWN0IGxpdGVyYWwgZm9yIHRoZSBwYXNzZWQgYXJndW1lbnQgbGlzdCBvZiBrZXktdmFsdWUgcGFpcnNcbiAgICBvYmplY3QoLi4ua2V5VmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBbXCJ7XCJdO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBrZXlWYWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChjb2RlLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgY29kZS5wdXNoKFwiLFwiKTtcbiAgICAgICAgICAgIGNvZGUucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdmFsdWUgfHwgdGhpcy5vcHRzLmVzNSkge1xuICAgICAgICAgICAgICAgIGNvZGUucHVzaChcIjpcIik7XG4gICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5hZGRDb2RlQXJnKShjb2RlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29kZS5wdXNoKFwifVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBjb2RlXzEuX0NvZGUoY29kZSk7XG4gICAgfVxuICAgIC8vIGBpZmAgY2xhdXNlIChvciBzdGF0ZW1lbnQgaWYgYHRoZW5Cb2R5YCBhbmQsIG9wdGlvbmFsbHksIGBlbHNlQm9keWAgYXJlIHBhc3NlZClcbiAgICBpZihjb25kaXRpb24sIHRoZW5Cb2R5LCBlbHNlQm9keSkge1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobmV3IElmKGNvbmRpdGlvbikpO1xuICAgICAgICBpZiAodGhlbkJvZHkgJiYgZWxzZUJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZSh0aGVuQm9keSkuZWxzZSgpLmNvZGUoZWxzZUJvZHkpLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhlbkJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZSh0aGVuQm9keSkuZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbHNlQm9keSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcImVsc2VcIiBib2R5IHdpdGhvdXQgXCJ0aGVuXCIgYm9keScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBgZWxzZSBpZmAgY2xhdXNlIC0gaW52YWxpZCB3aXRob3V0IGBpZmAgb3IgYWZ0ZXIgYGVsc2VgIGNsYXVzZXNcbiAgICBlbHNlSWYoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbHNlTm9kZShuZXcgSWYoY29uZGl0aW9uKSk7XG4gICAgfVxuICAgIC8vIGBlbHNlYCBjbGF1c2UgLSBvbmx5IHZhbGlkIGFmdGVyIGBpZmAgb3IgYGVsc2UgaWZgIGNsYXVzZXNcbiAgICBlbHNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxzZU5vZGUobmV3IEVsc2UoKSk7XG4gICAgfVxuICAgIC8vIGVuZCBgaWZgIHN0YXRlbWVudCAobmVlZGVkIGlmIGdlbi5pZiB3YXMgdXNlZCBvbmx5IHdpdGggY29uZGl0aW9uKVxuICAgIGVuZElmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKElmLCBFbHNlKTtcbiAgICB9XG4gICAgX2Zvcihub2RlLCBmb3JCb2R5KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgaWYgKGZvckJvZHkpXG4gICAgICAgICAgICB0aGlzLmNvZGUoZm9yQm9keSkuZW5kRm9yKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBhIGdlbmVyaWMgYGZvcmAgY2xhdXNlIChvciBzdGF0ZW1lbnQgaWYgYGZvckJvZHlgIGlzIHBhc3NlZClcbiAgICBmb3IoaXRlcmF0aW9uLCBmb3JCb2R5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvckxvb3AoaXRlcmF0aW9uKSwgZm9yQm9keSk7XG4gICAgfVxuICAgIC8vIGBmb3JgIHN0YXRlbWVudCBmb3IgYSByYW5nZSBvZiB2YWx1ZXNcbiAgICBmb3JSYW5nZShuYW1lT3JQcmVmaXgsIGZyb20sIHRvLCBmb3JCb2R5LCB2YXJLaW5kID0gdGhpcy5vcHRzLmVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogc2NvcGVfMS52YXJLaW5kcy5sZXQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JSYW5nZSh2YXJLaW5kLCBuYW1lLCBmcm9tLCB0byksICgpID0+IGZvckJvZHkobmFtZSkpO1xuICAgIH1cbiAgICAvLyBgZm9yLW9mYCBzdGF0ZW1lbnQgKGluIGVzNSBtb2RlIHJlcGxhY2Ugd2l0aCBhIG5vcm1hbCBmb3IgbG9vcClcbiAgICBmb3JPZihuYW1lT3JQcmVmaXgsIGl0ZXJhYmxlLCBmb3JCb2R5LCB2YXJLaW5kID0gc2NvcGVfMS52YXJLaW5kcy5jb25zdCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXM1KSB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBpdGVyYWJsZSBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8gaXRlcmFibGUgOiB0aGlzLnZhcihcIl9hcnJcIiwgaXRlcmFibGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yUmFuZ2UoXCJfaVwiLCAwLCAoMCwgY29kZV8xLl8pIGAke2Fycn0ubGVuZ3RoYCwgKGkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcihuYW1lLCAoMCwgY29kZV8xLl8pIGAke2Fycn1bJHtpfV1gKTtcbiAgICAgICAgICAgICAgICBmb3JCb2R5KG5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9ySXRlcihcIm9mXCIsIHZhcktpbmQsIG5hbWUsIGl0ZXJhYmxlKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGBmb3ItaW5gIHN0YXRlbWVudC5cbiAgICAvLyBXaXRoIG9wdGlvbiBgb3duUHJvcGVydGllc2AgcmVwbGFjZWQgd2l0aCBhIGBmb3Itb2ZgIGxvb3AgZm9yIG9iamVjdCBrZXlzXG4gICAgZm9ySW4obmFtZU9yUHJlZml4LCBvYmosIGZvckJvZHksIHZhcktpbmQgPSB0aGlzLm9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiBzY29wZV8xLnZhcktpbmRzLmNvbnN0KSB7XG4gICAgICAgIGlmICh0aGlzLm9wdHMub3duUHJvcGVydGllcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yT2YobmFtZU9yUHJlZml4LCAoMCwgY29kZV8xLl8pIGBPYmplY3Qua2V5cygke29ian0pYCwgZm9yQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JJdGVyKFwiaW5cIiwgdmFyS2luZCwgbmFtZSwgb2JqKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGVuZCBgZm9yYCBsb29wXG4gICAgZW5kRm9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKEZvcik7XG4gICAgfVxuICAgIC8vIGBsYWJlbGAgc3RhdGVtZW50XG4gICAgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBMYWJlbChsYWJlbCkpO1xuICAgIH1cbiAgICAvLyBgYnJlYWtgIHN0YXRlbWVudFxuICAgIGJyZWFrKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgQnJlYWsobGFiZWwpKTtcbiAgICB9XG4gICAgLy8gYHJldHVybmAgc3RhdGVtZW50XG4gICAgcmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgUmV0dXJuKCk7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgdGhpcy5jb2RlKHZhbHVlKTtcbiAgICAgICAgaWYgKG5vZGUubm9kZXMubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcInJldHVyblwiIHNob3VsZCBoYXZlIG9uZSBub2RlJyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoUmV0dXJuKTtcbiAgICB9XG4gICAgLy8gYHRyeWAgc3RhdGVtZW50XG4gICAgdHJ5KHRyeUJvZHksIGNhdGNoQ29kZSwgZmluYWxseUNvZGUpIHtcbiAgICAgICAgaWYgKCFjYXRjaENvZGUgJiYgIWZpbmFsbHlDb2RlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcInRyeVwiIHdpdGhvdXQgXCJjYXRjaFwiIGFuZCBcImZpbmFsbHlcIicpO1xuICAgICAgICBjb25zdCBub2RlID0gbmV3IFRyeSgpO1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobm9kZSk7XG4gICAgICAgIHRoaXMuY29kZSh0cnlCb2R5KTtcbiAgICAgICAgaWYgKGNhdGNoQ29kZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLm5hbWUoXCJlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3Vyck5vZGUgPSBub2RlLmNhdGNoID0gbmV3IENhdGNoKGVycm9yKTtcbiAgICAgICAgICAgIGNhdGNoQ29kZShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsbHlDb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG5vZGUuZmluYWxseSA9IG5ldyBGaW5hbGx5KCk7XG4gICAgICAgICAgICB0aGlzLmNvZGUoZmluYWxseUNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoQ2F0Y2gsIEZpbmFsbHkpO1xuICAgIH1cbiAgICAvLyBgdGhyb3dgIHN0YXRlbWVudFxuICAgIHRocm93KGVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgVGhyb3coZXJyb3IpKTtcbiAgICB9XG4gICAgLy8gc3RhcnQgc2VsZi1iYWxhbmNpbmcgYmxvY2tcbiAgICBibG9jayhib2R5LCBub2RlQ291bnQpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tTdGFydHMucHVzaCh0aGlzLl9ub2Rlcy5sZW5ndGgpO1xuICAgICAgICBpZiAoYm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShib2R5KS5lbmRCbG9jayhub2RlQ291bnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gZW5kIHRoZSBjdXJyZW50IHNlbGYtYmFsYW5jaW5nIGJsb2NrXG4gICAgZW5kQmxvY2sobm9kZUNvdW50KSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHRoaXMuX2Jsb2NrU3RhcnRzLnBvcCgpO1xuICAgICAgICBpZiAobGVuID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2RlR2VuOiBub3QgaW4gc2VsZi1iYWxhbmNpbmcgYmxvY2tcIik7XG4gICAgICAgIGNvbnN0IHRvQ2xvc2UgPSB0aGlzLl9ub2Rlcy5sZW5ndGggLSBsZW47XG4gICAgICAgIGlmICh0b0Nsb3NlIDwgMCB8fCAobm9kZUNvdW50ICE9PSB1bmRlZmluZWQgJiYgdG9DbG9zZSAhPT0gbm9kZUNvdW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiB3cm9uZyBudW1iZXIgb2Ygbm9kZXM6ICR7dG9DbG9zZX0gdnMgJHtub2RlQ291bnR9IGV4cGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZXMubGVuZ3RoID0gbGVuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gYGZ1bmN0aW9uYCBoZWFkaW5nIChvciBkZWZpbml0aW9uIGlmIGZ1bmNCb2R5IGlzIHBhc3NlZClcbiAgICBmdW5jKG5hbWUsIGFyZ3MgPSBjb2RlXzEubmlsLCBhc3luYywgZnVuY0JvZHkpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5ldyBGdW5jKG5hbWUsIGFyZ3MsIGFzeW5jKSk7XG4gICAgICAgIGlmIChmdW5jQm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShmdW5jQm9keSkuZW5kRnVuYygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gZW5kIGZ1bmN0aW9uIGRlZmluaXRpb25cbiAgICBlbmRGdW5jKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKEZ1bmMpO1xuICAgIH1cbiAgICBvcHRpbWl6ZShuID0gMSkge1xuICAgICAgICB3aGlsZSAobi0tID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdC5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICB0aGlzLl9yb290Lm9wdGltaXplTmFtZXModGhpcy5fcm9vdC5uYW1lcywgdGhpcy5fY29uc3RhbnRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfbGVhZk5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLl9jdXJyTm9kZS5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2Jsb2NrTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJOb2RlLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHRoaXMuX25vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICAgIF9lbmRCbG9ja05vZGUoTjEsIE4yKSB7XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLl9jdXJyTm9kZTtcbiAgICAgICAgaWYgKG4gaW5zdGFuY2VvZiBOMSB8fCAoTjIgJiYgbiBpbnN0YW5jZW9mIE4yKSkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMucG9wKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5vdCBpbiBibG9jayBcIiR7TjIgPyBgJHtOMS5raW5kfS8ke04yLmtpbmR9YCA6IE4xLmtpbmR9XCJgKTtcbiAgICB9XG4gICAgX2Vsc2VOb2RlKG5vZGUpIHtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuX2N1cnJOb2RlO1xuICAgICAgICBpZiAoIShuIGluc3RhbmNlb2YgSWYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwiZWxzZVwiIHdpdGhvdXQgXCJpZlwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3Vyck5vZGUgPSBuLmVsc2UgPSBub2RlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IF9yb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXNbMF07XG4gICAgfVxuICAgIGdldCBfY3Vyck5vZGUoKSB7XG4gICAgICAgIGNvbnN0IG5zID0gdGhpcy5fbm9kZXM7XG4gICAgICAgIHJldHVybiBuc1tucy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgc2V0IF9jdXJyTm9kZShub2RlKSB7XG4gICAgICAgIGNvbnN0IG5zID0gdGhpcy5fbm9kZXM7XG4gICAgICAgIG5zW25zLmxlbmd0aCAtIDFdID0gbm9kZTtcbiAgICB9XG59XG5leHBvcnRzLkNvZGVHZW4gPSBDb2RlR2VuO1xuZnVuY3Rpb24gYWRkTmFtZXMobmFtZXMsIGZyb20pIHtcbiAgICBmb3IgKGNvbnN0IG4gaW4gZnJvbSlcbiAgICAgICAgbmFtZXNbbl0gPSAobmFtZXNbbl0gfHwgMCkgKyAoZnJvbVtuXSB8fCAwKTtcbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBhZGRFeHByTmFtZXMobmFtZXMsIGZyb20pIHtcbiAgICByZXR1cm4gZnJvbSBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZU9yTmFtZSA/IGFkZE5hbWVzKG5hbWVzLCBmcm9tLm5hbWVzKSA6IG5hbWVzO1xufVxuZnVuY3Rpb24gb3B0aW1pemVFeHByKGV4cHIsIG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lKVxuICAgICAgICByZXR1cm4gcmVwbGFjZU5hbWUoZXhwcik7XG4gICAgaWYgKCFjYW5PcHRpbWl6ZShleHByKSlcbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgcmV0dXJuIG5ldyBjb2RlXzEuX0NvZGUoZXhwci5faXRlbXMucmVkdWNlKChpdGVtcywgYykgPT4ge1xuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lKVxuICAgICAgICAgICAgYyA9IHJlcGxhY2VOYW1lKGMpO1xuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZSlcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goLi4uYy5faXRlbXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGMpO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSwgW10pKTtcbiAgICBmdW5jdGlvbiByZXBsYWNlTmFtZShuKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjb25zdGFudHNbbi5zdHJdO1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkIHx8IG5hbWVzW24uc3RyXSAhPT0gMSlcbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICBkZWxldGUgbmFtZXNbbi5zdHJdO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuT3B0aW1pemUoZSkge1xuICAgICAgICByZXR1cm4gKGUgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGUgJiZcbiAgICAgICAgICAgIGUuX2l0ZW1zLnNvbWUoKGMpID0+IGMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSAmJiBuYW1lc1tjLnN0cl0gPT09IDEgJiYgY29uc3RhbnRzW2Muc3RyXSAhPT0gdW5kZWZpbmVkKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3VidHJhY3ROYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIGZvciAoY29uc3QgbiBpbiBmcm9tKVxuICAgICAgICBuYW1lc1tuXSA9IChuYW1lc1tuXSB8fCAwKSAtIChmcm9tW25dIHx8IDApO1xufVxuZnVuY3Rpb24gbm90KHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIHggPT0gXCJudW1iZXJcIiB8fCB4ID09PSBudWxsID8gIXggOiAoMCwgY29kZV8xLl8pIGAhJHtwYXIoeCl9YDtcbn1cbmV4cG9ydHMubm90ID0gbm90O1xuY29uc3QgYW5kQ29kZSA9IG1hcHBlbmQoZXhwb3J0cy5vcGVyYXRvcnMuQU5EKTtcbi8vIGJvb2xlYW4gQU5EICgmJikgZXhwcmVzc2lvbiB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXG5mdW5jdGlvbiBhbmQoLi4uYXJncykge1xuICAgIHJldHVybiBhcmdzLnJlZHVjZShhbmRDb2RlKTtcbn1cbmV4cG9ydHMuYW5kID0gYW5kO1xuY29uc3Qgb3JDb2RlID0gbWFwcGVuZChleHBvcnRzLm9wZXJhdG9ycy5PUik7XG4vLyBib29sZWFuIE9SICh8fCkgZXhwcmVzc2lvbiB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXG5mdW5jdGlvbiBvciguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKG9yQ29kZSk7XG59XG5leHBvcnRzLm9yID0gb3I7XG5mdW5jdGlvbiBtYXBwZW5kKG9wKSB7XG4gICAgcmV0dXJuICh4LCB5KSA9PiAoeCA9PT0gY29kZV8xLm5pbCA/IHkgOiB5ID09PSBjb2RlXzEubmlsID8geCA6ICgwLCBjb2RlXzEuXykgYCR7cGFyKHgpfSAke29wfSAke3Bhcih5KX1gKTtcbn1cbmZ1bmN0aW9uIHBhcih4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IHggOiAoMCwgY29kZV8xLl8pIGAoJHt4fSlgO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZhbHVlU2NvcGUgPSBleHBvcnRzLlZhbHVlU2NvcGVOYW1lID0gZXhwb3J0cy5TY29wZSA9IGV4cG9ydHMudmFyS2luZHMgPSBleHBvcnRzLlVzZWRWYWx1ZVN0YXRlID0gdm9pZCAwO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4vY29kZVwiKTtcbmNsYXNzIFZhbHVlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICBzdXBlcihgQ29kZUdlbjogXCJjb2RlXCIgZm9yICR7bmFtZX0gbm90IGRlZmluZWRgKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5hbWUudmFsdWU7XG4gICAgfVxufVxudmFyIFVzZWRWYWx1ZVN0YXRlO1xuKGZ1bmN0aW9uIChVc2VkVmFsdWVTdGF0ZSkge1xuICAgIFVzZWRWYWx1ZVN0YXRlW1VzZWRWYWx1ZVN0YXRlW1wiU3RhcnRlZFwiXSA9IDBdID0gXCJTdGFydGVkXCI7XG4gICAgVXNlZFZhbHVlU3RhdGVbVXNlZFZhbHVlU3RhdGVbXCJDb21wbGV0ZWRcIl0gPSAxXSA9IFwiQ29tcGxldGVkXCI7XG59KShVc2VkVmFsdWVTdGF0ZSA9IGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgfHwgKGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgPSB7fSkpO1xuZXhwb3J0cy52YXJLaW5kcyA9IHtcbiAgICBjb25zdDogbmV3IGNvZGVfMS5OYW1lKFwiY29uc3RcIiksXG4gICAgbGV0OiBuZXcgY29kZV8xLk5hbWUoXCJsZXRcIiksXG4gICAgdmFyOiBuZXcgY29kZV8xLk5hbWUoXCJ2YXJcIiksXG59O1xuY2xhc3MgU2NvcGUge1xuICAgIGNvbnN0cnVjdG9yKHsgcHJlZml4ZXMsIHBhcmVudCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fbmFtZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fcHJlZml4ZXMgPSBwcmVmaXhlcztcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIH1cbiAgICB0b05hbWUobmFtZU9yUHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuYW1lT3JQcmVmaXggaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IG5hbWVPclByZWZpeCA6IHRoaXMubmFtZShuYW1lT3JQcmVmaXgpO1xuICAgIH1cbiAgICBuYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gbmV3IGNvZGVfMS5OYW1lKHRoaXMuX25ld05hbWUocHJlZml4KSk7XG4gICAgfVxuICAgIF9uZXdOYW1lKHByZWZpeCkge1xuICAgICAgICBjb25zdCBuZyA9IHRoaXMuX25hbWVzW3ByZWZpeF0gfHwgdGhpcy5fbmFtZUdyb3VwKHByZWZpeCk7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtuZy5pbmRleCsrfWA7XG4gICAgfVxuICAgIF9uYW1lR3JvdXAocHJlZml4KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gdGhpcy5fcGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuX3ByZWZpeGVzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFzKHByZWZpeCkpIHx8ICh0aGlzLl9wcmVmaXhlcyAmJiAhdGhpcy5fcHJlZml4ZXMuaGFzKHByZWZpeCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IHByZWZpeCBcIiR7cHJlZml4fVwiIGlzIG5vdCBhbGxvd2VkIGluIHRoaXMgc2NvcGVgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX25hbWVzW3ByZWZpeF0gPSB7IHByZWZpeCwgaW5kZXg6IDAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TY29wZSA9IFNjb3BlO1xuY2xhc3MgVmFsdWVTY29wZU5hbWUgZXh0ZW5kcyBjb2RlXzEuTmFtZSB7XG4gICAgY29uc3RydWN0b3IocHJlZml4LCBuYW1lU3RyKSB7XG4gICAgICAgIHN1cGVyKG5hbWVTdHIpO1xuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUsIHsgcHJvcGVydHksIGl0ZW1JbmRleCB9KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zY29wZVBhdGggPSAoMCwgY29kZV8xLl8pIGAuJHtuZXcgY29kZV8xLk5hbWUocHJvcGVydHkpfVske2l0ZW1JbmRleH1dYDtcbiAgICB9XG59XG5leHBvcnRzLlZhbHVlU2NvcGVOYW1lID0gVmFsdWVTY29wZU5hbWU7XG5jb25zdCBsaW5lID0gKDAsIGNvZGVfMS5fKSBgXFxuYDtcbmNsYXNzIFZhbHVlU2NvcGUgZXh0ZW5kcyBTY29wZSB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX3Njb3BlID0gb3B0cy5zY29wZTtcbiAgICAgICAgdGhpcy5vcHRzID0geyAuLi5vcHRzLCBfbjogb3B0cy5saW5lcyA/IGxpbmUgOiBjb2RlXzEubmlsIH07XG4gICAgfVxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlO1xuICAgIH1cbiAgICBuYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gbmV3IFZhbHVlU2NvcGVOYW1lKHByZWZpeCwgdGhpcy5fbmV3TmFtZShwcmVmaXgpKTtcbiAgICB9XG4gICAgdmFsdWUobmFtZU9yUHJlZml4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2YWx1ZS5yZWYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IHJlZiBtdXN0IGJlIHBhc3NlZCBpbiB2YWx1ZVwiKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGNvbnN0IHsgcHJlZml4IH0gPSBuYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZUtleSA9IChfYSA9IHZhbHVlLmtleSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsdWUucmVmO1xuICAgICAgICBsZXQgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgaWYgKHZzKSB7XG4gICAgICAgICAgICBjb25zdCBfbmFtZSA9IHZzLmdldCh2YWx1ZUtleSk7XG4gICAgICAgICAgICBpZiAoX25hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XSA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICB2cy5zZXQodmFsdWVLZXksIG5hbWUpO1xuICAgICAgICBjb25zdCBzID0gdGhpcy5fc2NvcGVbcHJlZml4XSB8fCAodGhpcy5fc2NvcGVbcHJlZml4XSA9IFtdKTtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gcy5sZW5ndGg7XG4gICAgICAgIHNbaXRlbUluZGV4XSA9IHZhbHVlLnJlZjtcbiAgICAgICAgbmFtZS5zZXRWYWx1ZSh2YWx1ZSwgeyBwcm9wZXJ0eTogcHJlZml4LCBpdGVtSW5kZXggfSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcmVmaXgsIGtleU9yUmVmKSB7XG4gICAgICAgIGNvbnN0IHZzID0gdGhpcy5fdmFsdWVzW3ByZWZpeF07XG4gICAgICAgIGlmICghdnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiB2cy5nZXQoa2V5T3JSZWYpO1xuICAgIH1cbiAgICBzY29wZVJlZnMoc2NvcGVOYW1lLCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZHVjZVZhbHVlcyh2YWx1ZXMsIChuYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAobmFtZS5zY29wZVBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5hbWUgXCIke25hbWV9XCIgaGFzIG5vIHZhbHVlYCk7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVfMS5fKSBgJHtzY29wZU5hbWV9JHtuYW1lLnNjb3BlUGF0aH1gO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2NvcGVDb2RlKHZhbHVlcyA9IHRoaXMuX3ZhbHVlcywgdXNlZFZhbHVlcywgZ2V0Q29kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkdWNlVmFsdWVzKHZhbHVlcywgKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBuYW1lIFwiJHtuYW1lfVwiIGhhcyBubyB2YWx1ZWApO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUudmFsdWUuY29kZTtcbiAgICAgICAgfSwgdXNlZFZhbHVlcywgZ2V0Q29kZSk7XG4gICAgfVxuICAgIF9yZWR1Y2VWYWx1ZXModmFsdWVzLCB2YWx1ZUNvZGUsIHVzZWRWYWx1ZXMgPSB7fSwgZ2V0Q29kZSkge1xuICAgICAgICBsZXQgY29kZSA9IGNvZGVfMS5uaWw7XG4gICAgICAgIGZvciAoY29uc3QgcHJlZml4IGluIHZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgdnMgPSB2YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgICAgIGlmICghdnMpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBuYW1lU2V0ID0gKHVzZWRWYWx1ZXNbcHJlZml4XSA9IHVzZWRWYWx1ZXNbcHJlZml4XSB8fCBuZXcgTWFwKCkpO1xuICAgICAgICAgICAgdnMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lU2V0LmhhcyhuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG5hbWVTZXQuc2V0KG5hbWUsIFVzZWRWYWx1ZVN0YXRlLlN0YXJ0ZWQpO1xuICAgICAgICAgICAgICAgIGxldCBjID0gdmFsdWVDb2RlKG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZiA9IHRoaXMub3B0cy5lczUgPyBleHBvcnRzLnZhcktpbmRzLnZhciA6IGV4cG9ydHMudmFyS2luZHMuY29uc3Q7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoMCwgY29kZV8xLl8pIGAke2NvZGV9JHtkZWZ9ICR7bmFtZX0gPSAke2N9OyR7dGhpcy5vcHRzLl9ufWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChjID0gZ2V0Q29kZSA9PT0gbnVsbCB8fCBnZXRDb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZXRDb2RlKG5hbWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gKDAsIGNvZGVfMS5fKSBgJHtjb2RlfSR7Y30ke3RoaXMub3B0cy5fbn1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFZhbHVlRXJyb3IobmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVTZXQuc2V0KG5hbWUsIFVzZWRWYWx1ZVN0YXRlLkNvbXBsZXRlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLlZhbHVlU2NvcGUgPSBWYWx1ZVNjb3BlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NvcGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4dGVuZEVycm9ycyA9IGV4cG9ydHMucmVzZXRFcnJvcnNDb3VudCA9IGV4cG9ydHMucmVwb3J0RXh0cmFFcnJvciA9IGV4cG9ydHMucmVwb3J0RXJyb3IgPSBleHBvcnRzLmtleXdvcmQkRGF0YUVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi9uYW1lc1wiKTtcbmV4cG9ydHMua2V5d29yZEVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IGtleXdvcmQgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IHBhc3MgXCIke2tleXdvcmR9XCIga2V5d29yZCB2YWxpZGF0aW9uYCxcbn07XG5leHBvcnRzLmtleXdvcmQkRGF0YUVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IGtleXdvcmQsIHNjaGVtYVR5cGUgfSkgPT4gc2NoZW1hVHlwZVxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgXCIke2tleXdvcmR9XCIga2V5d29yZCBtdXN0IGJlICR7c2NoZW1hVHlwZX0gKCRkYXRhKWBcbiAgICAgICAgOiAoMCwgY29kZWdlbl8xLnN0cikgYFwiJHtrZXl3b3JkfVwiIGtleXdvcmQgaXMgaW52YWxpZCAoJGRhdGEpYCxcbn07XG5mdW5jdGlvbiByZXBvcnRFcnJvcihjeHQsIGVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IsIGVycm9yUGF0aHMsIG92ZXJyaWRlQWxsRXJyb3JzKSB7XG4gICAgY29uc3QgeyBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgZ2VuLCBjb21wb3NpdGVSdWxlLCBhbGxFcnJvcnMgfSA9IGl0O1xuICAgIGNvbnN0IGVyck9iaiA9IGVycm9yT2JqZWN0Q29kZShjeHQsIGVycm9yLCBlcnJvclBhdGhzKTtcbiAgICBpZiAob3ZlcnJpZGVBbGxFcnJvcnMgIT09IG51bGwgJiYgb3ZlcnJpZGVBbGxFcnJvcnMgIT09IHZvaWQgMCA/IG92ZXJyaWRlQWxsRXJyb3JzIDogKGNvbXBvc2l0ZVJ1bGUgfHwgYWxsRXJyb3JzKSkge1xuICAgICAgICBhZGRFcnJvcihnZW4sIGVyck9iaik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm5FcnJvcnMoaXQsICgwLCBjb2RlZ2VuXzEuXykgYFske2Vyck9ian1dYCk7XG4gICAgfVxufVxuZXhwb3J0cy5yZXBvcnRFcnJvciA9IHJlcG9ydEVycm9yO1xuZnVuY3Rpb24gcmVwb3J0RXh0cmFFcnJvcihjeHQsIGVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IsIGVycm9yUGF0aHMpIHtcbiAgICBjb25zdCB7IGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGFsbEVycm9ycyB9ID0gaXQ7XG4gICAgY29uc3QgZXJyT2JqID0gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIGFkZEVycm9yKGdlbiwgZXJyT2JqKTtcbiAgICBpZiAoIShjb21wb3NpdGVSdWxlIHx8IGFsbEVycm9ycykpIHtcbiAgICAgICAgcmV0dXJuRXJyb3JzKGl0LCBuYW1lc18xLmRlZmF1bHQudkVycm9ycyk7XG4gICAgfVxufVxuZXhwb3J0cy5yZXBvcnRFeHRyYUVycm9yID0gcmVwb3J0RXh0cmFFcnJvcjtcbmZ1bmN0aW9uIHJlc2V0RXJyb3JzQ291bnQoZ2VuLCBlcnJzQ291bnQpIHtcbiAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsIGVycnNDb3VudCk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9ICE9PSBudWxsYCwgKCkgPT4gZ2VuLmlmKGVycnNDb3VudCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgLCBlcnJzQ291bnQpLCAoKSA9PiBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCBudWxsKSkpO1xufVxuZXhwb3J0cy5yZXNldEVycm9yc0NvdW50ID0gcmVzZXRFcnJvcnNDb3VudDtcbmZ1bmN0aW9uIGV4dGVuZEVycm9ycyh7IGdlbiwga2V5d29yZCwgc2NoZW1hVmFsdWUsIGRhdGEsIGVycnNDb3VudCwgaXQsIH0pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZXJyc0NvdW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICBjb25zdCBlcnIgPSBnZW4ubmFtZShcImVyclwiKTtcbiAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIGVycnNDb3VudCwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKGkpID0+IHtcbiAgICAgICAgZ2VuLmNvbnN0KGVyciwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc31bJHtpfV1gKTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5pbnN0YW5jZVBhdGggPT09IHVuZGVmaW5lZGAsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9Lmluc3RhbmNlUGF0aGAsICgwLCBjb2RlZ2VuXzEuc3RyQ29uY2F0KShuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCBpdC5lcnJvclBhdGgpKSk7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LnNjaGVtYVBhdGhgLCAoMCwgY29kZWdlbl8xLnN0cikgYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWApO1xuICAgICAgICBpZiAoaXQub3B0cy52ZXJib3NlKSB7XG4gICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5zY2hlbWFgLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5kYXRhYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZXh0ZW5kRXJyb3JzID0gZXh0ZW5kRXJyb3JzO1xuZnVuY3Rpb24gYWRkRXJyb3IoZ2VuLCBlcnJPYmopIHtcbiAgICBjb25zdCBlcnIgPSBnZW4uY29uc3QoXCJlcnJcIiwgZXJyT2JqKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGxgLCAoKSA9PiBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtlcnJ9XWApLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5wdXNoKCR7ZXJyfSlgKTtcbiAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9KytgKTtcbn1cbmZ1bmN0aW9uIHJldHVybkVycm9ycyhpdCwgZXJycykge1xuICAgIGNvbnN0IHsgZ2VuLCB2YWxpZGF0ZU5hbWUsIHNjaGVtYUVudiB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYUVudi4kYXN5bmMpIHtcbiAgICAgICAgZ2VuLnRocm93KCgwLCBjb2RlZ2VuXzEuXykgYG5ldyAke2l0LlZhbGlkYXRpb25FcnJvcn0oJHtlcnJzfSlgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmVycm9yc2AsIGVycnMpO1xuICAgICAgICBnZW4ucmV0dXJuKGZhbHNlKTtcbiAgICB9XG59XG5jb25zdCBFID0ge1xuICAgIGtleXdvcmQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImtleXdvcmRcIiksXG4gICAgc2NoZW1hUGF0aDogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NoZW1hUGF0aFwiKSxcbiAgICBwYXJhbXM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmFtc1wiKSxcbiAgICBwcm9wZXJ0eU5hbWU6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInByb3BlcnR5TmFtZVwiKSxcbiAgICBtZXNzYWdlOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJtZXNzYWdlXCIpLFxuICAgIHNjaGVtYTogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NoZW1hXCIpLFxuICAgIHBhcmVudFNjaGVtYTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyZW50U2NoZW1hXCIpLFxufTtcbmZ1bmN0aW9uIGVycm9yT2JqZWN0Q29kZShjeHQsIGVycm9yLCBlcnJvclBhdGhzKSB7XG4gICAgY29uc3QgeyBjcmVhdGVFcnJvcnMgfSA9IGN4dC5pdDtcbiAgICBpZiAoY3JlYXRlRXJyb3JzID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYHt9YDtcbiAgICByZXR1cm4gZXJyb3JPYmplY3QoY3h0LCBlcnJvciwgZXJyb3JQYXRocyk7XG59XG5mdW5jdGlvbiBlcnJvck9iamVjdChjeHQsIGVycm9yLCBlcnJvclBhdGhzID0ge30pIHtcbiAgICBjb25zdCB7IGdlbiwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCBrZXlWYWx1ZXMgPSBbXG4gICAgICAgIGVycm9ySW5zdGFuY2VQYXRoKGl0LCBlcnJvclBhdGhzKSxcbiAgICAgICAgZXJyb3JTY2hlbWFQYXRoKGN4dCwgZXJyb3JQYXRocyksXG4gICAgXTtcbiAgICBleHRyYUVycm9yUHJvcHMoY3h0LCBlcnJvciwga2V5VmFsdWVzKTtcbiAgICByZXR1cm4gZ2VuLm9iamVjdCguLi5rZXlWYWx1ZXMpO1xufVxuZnVuY3Rpb24gZXJyb3JJbnN0YW5jZVBhdGgoeyBlcnJvclBhdGggfSwgeyBpbnN0YW5jZVBhdGggfSkge1xuICAgIGNvbnN0IGluc3RQYXRoID0gaW5zdGFuY2VQYXRoXG4gICAgICAgID8gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2Vycm9yUGF0aH0keygwLCB1dGlsXzEuZ2V0RXJyb3JQYXRoKShpbnN0YW5jZVBhdGgsIHV0aWxfMS5UeXBlLlN0cil9YFxuICAgICAgICA6IGVycm9yUGF0aDtcbiAgICByZXR1cm4gW25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsICgwLCBjb2RlZ2VuXzEuc3RyQ29uY2F0KShuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCBpbnN0UGF0aCldO1xufVxuZnVuY3Rpb24gZXJyb3JTY2hlbWFQYXRoKHsga2V5d29yZCwgaXQ6IHsgZXJyU2NoZW1hUGF0aCB9IH0sIHsgc2NoZW1hUGF0aCwgcGFyZW50U2NoZW1hIH0pIHtcbiAgICBsZXQgc2NoUGF0aCA9IHBhcmVudFNjaGVtYSA/IGVyclNjaGVtYVBhdGggOiAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWA7XG4gICAgaWYgKHNjaGVtYVBhdGgpIHtcbiAgICAgICAgc2NoUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtzY2hQYXRofSR7KDAsIHV0aWxfMS5nZXRFcnJvclBhdGgpKHNjaGVtYVBhdGgsIHV0aWxfMS5UeXBlLlN0cil9YDtcbiAgICB9XG4gICAgcmV0dXJuIFtFLnNjaGVtYVBhdGgsIHNjaFBhdGhdO1xufVxuZnVuY3Rpb24gZXh0cmFFcnJvclByb3BzKGN4dCwgeyBwYXJhbXMsIG1lc3NhZ2UgfSwga2V5VmFsdWVzKSB7XG4gICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFWYWx1ZSwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IG9wdHMsIHByb3BlcnR5TmFtZSwgdG9wU2NoZW1hUmVmLCBzY2hlbWFQYXRoIH0gPSBpdDtcbiAgICBrZXlWYWx1ZXMucHVzaChbRS5rZXl3b3JkLCBrZXl3b3JkXSwgW0UucGFyYW1zLCB0eXBlb2YgcGFyYW1zID09IFwiZnVuY3Rpb25cIiA/IHBhcmFtcyhjeHQpIDogcGFyYW1zIHx8ICgwLCBjb2RlZ2VuXzEuXykgYHt9YF0pO1xuICAgIGlmIChvcHRzLm1lc3NhZ2VzKSB7XG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLm1lc3NhZ2UsIHR5cGVvZiBtZXNzYWdlID09IFwiZnVuY3Rpb25cIiA/IG1lc3NhZ2UoY3h0KSA6IG1lc3NhZ2VdKTtcbiAgICB9XG4gICAgaWYgKG9wdHMudmVyYm9zZSkge1xuICAgICAgICBrZXlWYWx1ZXMucHVzaChbRS5zY2hlbWEsIHNjaGVtYVZhbHVlXSwgW0UucGFyZW50U2NoZW1hLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9YF0sIFtuYW1lc18xLmRlZmF1bHQuZGF0YSwgZGF0YV0pO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHlOYW1lKVxuICAgICAgICBrZXlWYWx1ZXMucHVzaChbRS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZV0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXNvbHZlU2NoZW1hID0gZXhwb3J0cy5nZXRDb21waWxpbmdTY2hlbWEgPSBleHBvcnRzLnJlc29sdmVSZWYgPSBleHBvcnRzLmNvbXBpbGVTY2hlbWEgPSBleHBvcnRzLlNjaGVtYUVudiA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS92YWxpZGF0aW9uX2Vycm9yXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVzXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vcmVzb2x2ZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGVcIik7XG5jbGFzcyBTY2hlbWFFbnYge1xuICAgIGNvbnN0cnVjdG9yKGVudikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLmR5bmFtaWNBbmNob3JzID0ge307XG4gICAgICAgIGxldCBzY2hlbWE7XG4gICAgICAgIGlmICh0eXBlb2YgZW52LnNjaGVtYSA9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgc2NoZW1hID0gZW52LnNjaGVtYTtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBlbnYuc2NoZW1hO1xuICAgICAgICB0aGlzLnNjaGVtYUlkID0gZW52LnNjaGVtYUlkO1xuICAgICAgICB0aGlzLnJvb3QgPSBlbnYucm9vdCB8fCB0aGlzO1xuICAgICAgICB0aGlzLmJhc2VJZCA9IChfYSA9IGVudi5iYXNlSWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKHNjaGVtYSA9PT0gbnVsbCB8fCBzY2hlbWEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaGVtYVtlbnYuc2NoZW1hSWQgfHwgXCIkaWRcIl0pO1xuICAgICAgICB0aGlzLnNjaGVtYVBhdGggPSBlbnYuc2NoZW1hUGF0aDtcbiAgICAgICAgdGhpcy5sb2NhbFJlZnMgPSBlbnYubG9jYWxSZWZzO1xuICAgICAgICB0aGlzLm1ldGEgPSBlbnYubWV0YTtcbiAgICAgICAgdGhpcy4kYXN5bmMgPSBzY2hlbWEgPT09IG51bGwgfHwgc2NoZW1hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hlbWEuJGFzeW5jO1xuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICB9XG59XG5leHBvcnRzLlNjaGVtYUVudiA9IFNjaGVtYUVudjtcbi8vIGxldCBjb2RlU2l6ZSA9IDBcbi8vIGxldCBub2RlQ291bnQgPSAwXG4vLyBDb21waWxlcyBzY2hlbWEgaW4gU2NoZW1hRW52XG5mdW5jdGlvbiBjb21waWxlU2NoZW1hKHNjaCkge1xuICAgIC8vIFRPRE8gcmVmYWN0b3IgLSByZW1vdmUgY29tcGlsYXRpb25zXG4gICAgY29uc3QgX3NjaCA9IGdldENvbXBpbGluZ1NjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG4gICAgaWYgKF9zY2gpXG4gICAgICAgIHJldHVybiBfc2NoO1xuICAgIGNvbnN0IHJvb3RJZCA9ICgwLCByZXNvbHZlXzEuZ2V0RnVsbFBhdGgpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgc2NoLnJvb3QuYmFzZUlkKTsgLy8gVE9ETyBpZiBnZXRGdWxsUGF0aCByZW1vdmVkIDEgdGVzdHMgZmFpbHNcbiAgICBjb25zdCB7IGVzNSwgbGluZXMgfSA9IHRoaXMub3B0cy5jb2RlO1xuICAgIGNvbnN0IHsgb3duUHJvcGVydGllcyB9ID0gdGhpcy5vcHRzO1xuICAgIGNvbnN0IGdlbiA9IG5ldyBjb2RlZ2VuXzEuQ29kZUdlbih0aGlzLnNjb3BlLCB7IGVzNSwgbGluZXMsIG93blByb3BlcnRpZXMgfSk7XG4gICAgbGV0IF9WYWxpZGF0aW9uRXJyb3I7XG4gICAgaWYgKHNjaC4kYXN5bmMpIHtcbiAgICAgICAgX1ZhbGlkYXRpb25FcnJvciA9IGdlbi5zY29wZVZhbHVlKFwiRXJyb3JcIiwge1xuICAgICAgICAgICAgcmVmOiB2YWxpZGF0aW9uX2Vycm9yXzEuZGVmYXVsdCxcbiAgICAgICAgICAgIGNvZGU6ICgwLCBjb2RlZ2VuXzEuXykgYHJlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIikuZGVmYXVsdGAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB2YWxpZGF0ZU5hbWUgPSBnZW4uc2NvcGVOYW1lKFwidmFsaWRhdGVcIik7XG4gICAgc2NoLnZhbGlkYXRlTmFtZSA9IHZhbGlkYXRlTmFtZTtcbiAgICBjb25zdCBzY2hlbWFDeHQgPSB7XG4gICAgICAgIGdlbixcbiAgICAgICAgYWxsRXJyb3JzOiB0aGlzLm9wdHMuYWxsRXJyb3JzLFxuICAgICAgICBkYXRhOiBuYW1lc18xLmRlZmF1bHQuZGF0YSxcbiAgICAgICAgcGFyZW50RGF0YTogbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsXG4gICAgICAgIHBhcmVudERhdGFQcm9wZXJ0eTogbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eSxcbiAgICAgICAgZGF0YU5hbWVzOiBbbmFtZXNfMS5kZWZhdWx0LmRhdGFdLFxuICAgICAgICBkYXRhUGF0aEFycjogW2NvZGVnZW5fMS5uaWxdLFxuICAgICAgICBkYXRhTGV2ZWw6IDAsXG4gICAgICAgIGRhdGFUeXBlczogW10sXG4gICAgICAgIGRlZmluZWRQcm9wZXJ0aWVzOiBuZXcgU2V0KCksXG4gICAgICAgIHRvcFNjaGVtYVJlZjogZ2VuLnNjb3BlVmFsdWUoXCJzY2hlbWFcIiwgdGhpcy5vcHRzLmNvZGUuc291cmNlID09PSB0cnVlXG4gICAgICAgICAgICA/IHsgcmVmOiBzY2guc2NoZW1hLCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkoc2NoLnNjaGVtYSkgfVxuICAgICAgICAgICAgOiB7IHJlZjogc2NoLnNjaGVtYSB9KSxcbiAgICAgICAgdmFsaWRhdGVOYW1lLFxuICAgICAgICBWYWxpZGF0aW9uRXJyb3I6IF9WYWxpZGF0aW9uRXJyb3IsXG4gICAgICAgIHNjaGVtYTogc2NoLnNjaGVtYSxcbiAgICAgICAgc2NoZW1hRW52OiBzY2gsXG4gICAgICAgIHJvb3RJZCxcbiAgICAgICAgYmFzZUlkOiBzY2guYmFzZUlkIHx8IHJvb3RJZCxcbiAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgZXJyU2NoZW1hUGF0aDogc2NoLnNjaGVtYVBhdGggfHwgKHRoaXMub3B0cy5qdGQgPyBcIlwiIDogXCIjXCIpLFxuICAgICAgICBlcnJvclBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYFwiXCJgLFxuICAgICAgICBvcHRzOiB0aGlzLm9wdHMsXG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgfTtcbiAgICBsZXQgc291cmNlQ29kZTtcbiAgICB0cnkge1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMuYWRkKHNjaCk7XG4gICAgICAgICgwLCB2YWxpZGF0ZV8xLnZhbGlkYXRlRnVuY3Rpb25Db2RlKShzY2hlbWFDeHQpO1xuICAgICAgICBnZW4ub3B0aW1pemUodGhpcy5vcHRzLmNvZGUub3B0aW1pemUpO1xuICAgICAgICAvLyBnZW4ub3B0aW1pemUoMSlcbiAgICAgICAgY29uc3QgdmFsaWRhdGVDb2RlID0gZ2VuLnRvU3RyaW5nKCk7XG4gICAgICAgIHNvdXJjZUNvZGUgPSBgJHtnZW4uc2NvcGVSZWZzKG5hbWVzXzEuZGVmYXVsdC5zY29wZSl9cmV0dXJuICR7dmFsaWRhdGVDb2RlfWA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKChjb2RlU2l6ZSArPSBzb3VyY2VDb2RlLmxlbmd0aCksIChub2RlQ291bnQgKz0gZ2VuLm5vZGVDb3VudCkpXG4gICAgICAgIGlmICh0aGlzLm9wdHMuY29kZS5wcm9jZXNzKVxuICAgICAgICAgICAgc291cmNlQ29kZSA9IHRoaXMub3B0cy5jb2RlLnByb2Nlc3Moc291cmNlQ29kZSwgc2NoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJcXG5cXG5cXG4gKioqIFxcblwiLCBzb3VyY2VDb2RlKVxuICAgICAgICBjb25zdCBtYWtlVmFsaWRhdGUgPSBuZXcgRnVuY3Rpb24oYCR7bmFtZXNfMS5kZWZhdWx0LnNlbGZ9YCwgYCR7bmFtZXNfMS5kZWZhdWx0LnNjb3BlfWAsIHNvdXJjZUNvZGUpO1xuICAgICAgICBjb25zdCB2YWxpZGF0ZSA9IG1ha2VWYWxpZGF0ZSh0aGlzLCB0aGlzLnNjb3BlLmdldCgpKTtcbiAgICAgICAgdGhpcy5zY29wZS52YWx1ZSh2YWxpZGF0ZU5hbWUsIHsgcmVmOiB2YWxpZGF0ZSB9KTtcbiAgICAgICAgdmFsaWRhdGUuZXJyb3JzID0gbnVsbDtcbiAgICAgICAgdmFsaWRhdGUuc2NoZW1hID0gc2NoLnNjaGVtYTtcbiAgICAgICAgdmFsaWRhdGUuc2NoZW1hRW52ID0gc2NoO1xuICAgICAgICBpZiAoc2NoLiRhc3luYylcbiAgICAgICAgICAgIHZhbGlkYXRlLiRhc3luYyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuY29kZS5zb3VyY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlLnNvdXJjZSA9IHsgdmFsaWRhdGVOYW1lLCB2YWxpZGF0ZUNvZGUsIHNjb3BlVmFsdWVzOiBnZW4uX3ZhbHVlcyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdHMudW5ldmFsdWF0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJvcHMsIGl0ZW1zIH0gPSBzY2hlbWFDeHQ7XG4gICAgICAgICAgICB2YWxpZGF0ZS5ldmFsdWF0ZWQgPSB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyB1bmRlZmluZWQgOiBwcm9wcyxcbiAgICAgICAgICAgICAgICBpdGVtczogaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSA/IHVuZGVmaW5lZCA6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGR5bmFtaWNQcm9wczogcHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSxcbiAgICAgICAgICAgICAgICBkeW5hbWljSXRlbXM6IGl0ZW1zIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRlLnNvdXJjZSlcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZS5zb3VyY2UuZXZhbHVhdGVkID0gKDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKHZhbGlkYXRlLmV2YWx1YXRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoLnZhbGlkYXRlID0gdmFsaWRhdGU7XG4gICAgICAgIHJldHVybiBzY2g7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGRlbGV0ZSBzY2gudmFsaWRhdGU7XG4gICAgICAgIGRlbGV0ZSBzY2gudmFsaWRhdGVOYW1lO1xuICAgICAgICBpZiAoc291cmNlQ29kZSlcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiRXJyb3IgY29tcGlsaW5nIHNjaGVtYSwgZnVuY3Rpb24gY29kZTpcIiwgc291cmNlQ29kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiXFxuXFxuXFxuICoqKiBcXG5cIiwgc291cmNlQ29kZSwgdGhpcy5vcHRzKVxuICAgICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5fY29tcGlsYXRpb25zLmRlbGV0ZShzY2gpO1xuICAgIH1cbn1cbmV4cG9ydHMuY29tcGlsZVNjaGVtYSA9IGNvbXBpbGVTY2hlbWE7XG5mdW5jdGlvbiByZXNvbHZlUmVmKHJvb3QsIGJhc2VJZCwgcmVmKSB7XG4gICAgdmFyIF9hO1xuICAgIHJlZiA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsIHJlZik7XG4gICAgY29uc3Qgc2NoT3JGdW5jID0gcm9vdC5yZWZzW3JlZl07XG4gICAgaWYgKHNjaE9yRnVuYylcbiAgICAgICAgcmV0dXJuIHNjaE9yRnVuYztcbiAgICBsZXQgX3NjaCA9IHJlc29sdmUuY2FsbCh0aGlzLCByb290LCByZWYpO1xuICAgIGlmIChfc2NoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gKF9hID0gcm9vdC5sb2NhbFJlZnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtyZWZdOyAvLyBUT0RPIG1heWJlIGxvY2FsUmVmcyBzaG91bGQgaG9sZCBTY2hlbWFFbnZcbiAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBpZiAoc2NoZW1hKVxuICAgICAgICAgICAgX3NjaCA9IG5ldyBTY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCByb290LCBiYXNlSWQgfSk7XG4gICAgfVxuICAgIGlmIChfc2NoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gKHJvb3QucmVmc1tyZWZdID0gaW5saW5lT3JDb21waWxlLmNhbGwodGhpcywgX3NjaCkpO1xufVxuZXhwb3J0cy5yZXNvbHZlUmVmID0gcmVzb2x2ZVJlZjtcbmZ1bmN0aW9uIGlubGluZU9yQ29tcGlsZShzY2gpIHtcbiAgICBpZiAoKDAsIHJlc29sdmVfMS5pbmxpbmVSZWYpKHNjaC5zY2hlbWEsIHRoaXMub3B0cy5pbmxpbmVSZWZzKSlcbiAgICAgICAgcmV0dXJuIHNjaC5zY2hlbWE7XG4gICAgcmV0dXJuIHNjaC52YWxpZGF0ZSA/IHNjaCA6IGNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xufVxuLy8gSW5kZXggb2Ygc2NoZW1hIGNvbXBpbGF0aW9uIGluIHRoZSBjdXJyZW50bHkgY29tcGlsZWQgbGlzdFxuZnVuY3Rpb24gZ2V0Q29tcGlsaW5nU2NoZW1hKHNjaEVudikge1xuICAgIGZvciAoY29uc3Qgc2NoIG9mIHRoaXMuX2NvbXBpbGF0aW9ucykge1xuICAgICAgICBpZiAoc2FtZVNjaGVtYUVudihzY2gsIHNjaEVudikpXG4gICAgICAgICAgICByZXR1cm4gc2NoO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcGlsaW5nU2NoZW1hID0gZ2V0Q29tcGlsaW5nU2NoZW1hO1xuZnVuY3Rpb24gc2FtZVNjaGVtYUVudihzMSwgczIpIHtcbiAgICByZXR1cm4gczEuc2NoZW1hID09PSBzMi5zY2hlbWEgJiYgczEucm9vdCA9PT0gczIucm9vdCAmJiBzMS5iYXNlSWQgPT09IHMyLmJhc2VJZDtcbn1cbi8vIHJlc29sdmUgYW5kIGNvbXBpbGUgdGhlIHJlZmVyZW5jZXMgKCRyZWYpXG4vLyBUT0RPIHJldHVybnMgQW55U2NoZW1hT2JqZWN0IChpZiB0aGUgc2NoZW1hIGNhbiBiZSBpbmxpbmVkKSBvciB2YWxpZGF0aW9uIGZ1bmN0aW9uXG5mdW5jdGlvbiByZXNvbHZlKHJvb3QsIC8vIGluZm9ybWF0aW9uIGFib3V0IHRoZSByb290IHNjaGVtYSBmb3IgdGhlIGN1cnJlbnQgc2NoZW1hXG5yZWYgLy8gcmVmZXJlbmNlIHRvIHJlc29sdmVcbikge1xuICAgIGxldCBzY2g7XG4gICAgd2hpbGUgKHR5cGVvZiAoc2NoID0gdGhpcy5yZWZzW3JlZl0pID09IFwic3RyaW5nXCIpXG4gICAgICAgIHJlZiA9IHNjaDtcbiAgICByZXR1cm4gc2NoIHx8IHRoaXMuc2NoZW1hc1tyZWZdIHx8IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCByZWYpO1xufVxuLy8gUmVzb2x2ZSBzY2hlbWEsIGl0cyByb290IGFuZCBiYXNlSWRcbmZ1bmN0aW9uIHJlc29sdmVTY2hlbWEocm9vdCwgLy8gcm9vdCBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHNjaGVtYSwgcmVmcyBUT0RPIGJlbG93IFNjaGVtYUVudiBpcyBhc3NpZ25lZCB0byBpdFxucmVmIC8vIHJlZmVyZW5jZSB0byByZXNvbHZlXG4pIHtcbiAgICBjb25zdCBwID0gdGhpcy5vcHRzLnVyaVJlc29sdmVyLnBhcnNlKHJlZik7XG4gICAgY29uc3QgcmVmUGF0aCA9ICgwLCByZXNvbHZlXzEuX2dldEZ1bGxQYXRoKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIHApO1xuICAgIGxldCBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLmdldEZ1bGxQYXRoKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIHJvb3QuYmFzZUlkLCB1bmRlZmluZWQpO1xuICAgIC8vIFRPRE8gYE9iamVjdC5rZXlzKHJvb3Quc2NoZW1hKS5sZW5ndGggPiAwYCBzaG91bGQgbm90IGJlIG5lZWRlZCAtIGJ1dCByZW1vdmluZyBicmVha3MgMiB0ZXN0c1xuICAgIGlmIChPYmplY3Qua2V5cyhyb290LnNjaGVtYSkubGVuZ3RoID4gMCAmJiByZWZQYXRoID09PSBiYXNlSWQpIHtcbiAgICAgICAgcmV0dXJuIGdldEpzb25Qb2ludGVyLmNhbGwodGhpcywgcCwgcm9vdCk7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkocmVmUGF0aCk7XG4gICAgY29uc3Qgc2NoT3JSZWYgPSB0aGlzLnJlZnNbaWRdIHx8IHRoaXMuc2NoZW1hc1tpZF07XG4gICAgaWYgKHR5cGVvZiBzY2hPclJlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCBzY2hPclJlZik7XG4gICAgICAgIGlmICh0eXBlb2YgKHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC5zY2hlbWEpICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCBzY2gpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChzY2hPclJlZiA9PT0gbnVsbCB8fCBzY2hPclJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoT3JSZWYuc2NoZW1hKSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghc2NoT3JSZWYudmFsaWRhdGUpXG4gICAgICAgIGNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2hPclJlZik7XG4gICAgaWYgKGlkID09PSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShyZWYpKSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hIH0gPSBzY2hPclJlZjtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBjb25zdCBzY2hJZCA9IHNjaGVtYVtzY2hlbWFJZF07XG4gICAgICAgIGlmIChzY2hJZClcbiAgICAgICAgICAgIGJhc2VJZCA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsIHNjaElkKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCByb290LCBiYXNlSWQgfSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRKc29uUG9pbnRlci5jYWxsKHRoaXMsIHAsIHNjaE9yUmVmKTtcbn1cbmV4cG9ydHMucmVzb2x2ZVNjaGVtYSA9IHJlc29sdmVTY2hlbWE7XG5jb25zdCBQUkVWRU5UX1NDT1BFX0NIQU5HRSA9IG5ldyBTZXQoW1xuICAgIFwicHJvcGVydGllc1wiLFxuICAgIFwicGF0dGVyblByb3BlcnRpZXNcIixcbiAgICBcImVudW1cIixcbiAgICBcImRlcGVuZGVuY2llc1wiLFxuICAgIFwiZGVmaW5pdGlvbnNcIixcbl0pO1xuZnVuY3Rpb24gZ2V0SnNvblBvaW50ZXIocGFyc2VkUmVmLCB7IGJhc2VJZCwgc2NoZW1hLCByb290IH0pIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCgoX2EgPSBwYXJzZWRSZWYuZnJhZ21lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgIT09IFwiL1wiKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnNlZFJlZi5mcmFnbWVudC5zbGljZSgxKS5zcGxpdChcIi9cIikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYXJ0U2NoZW1hID0gc2NoZW1hWygwLCB1dGlsXzEudW5lc2NhcGVGcmFnbWVudCkocGFydCldO1xuICAgICAgICBpZiAocGFydFNjaGVtYSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzY2hlbWEgPSBwYXJ0U2NoZW1hO1xuICAgICAgICAvLyBUT0RPIFBSRVZFTlRfU0NPUEVfQ0hBTkdFIGNvdWxkIGJlIGRlZmluZWQgaW4ga2V5d29yZCBkZWY/XG4gICAgICAgIGNvbnN0IHNjaElkID0gdHlwZW9mIHNjaGVtYSA9PT0gXCJvYmplY3RcIiAmJiBzY2hlbWFbdGhpcy5vcHRzLnNjaGVtYUlkXTtcbiAgICAgICAgaWYgKCFQUkVWRU5UX1NDT1BFX0NIQU5HRS5oYXMocGFydCkgJiYgc2NoSWQpIHtcbiAgICAgICAgICAgIGJhc2VJZCA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsIHNjaElkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZW52O1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9IFwiYm9vbGVhblwiICYmIHNjaGVtYS4kcmVmICYmICEoMCwgdXRpbF8xLnNjaGVtYUhhc1J1bGVzQnV0UmVmKShzY2hlbWEsIHRoaXMuUlVMRVMpKSB7XG4gICAgICAgIGNvbnN0ICRyZWYgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgYmFzZUlkLCBzY2hlbWEuJHJlZik7XG4gICAgICAgIGVudiA9IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCAkcmVmKTtcbiAgICB9XG4gICAgLy8gZXZlbiB0aG91Z2ggcmVzb2x1dGlvbiBmYWlsZWQgd2UgbmVlZCB0byByZXR1cm4gU2NoZW1hRW52IHRvIHRocm93IGV4Y2VwdGlvblxuICAgIC8vIHNvIHRoYXQgY29tcGlsZUFzeW5jIGxvYWRzIG1pc3Npbmcgc2NoZW1hLlxuICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICBlbnYgPSBlbnYgfHwgbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICBpZiAoZW52LnNjaGVtYSAhPT0gZW52LnJvb3Quc2NoZW1hKVxuICAgICAgICByZXR1cm4gZW52O1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lcyA9IHtcbiAgICAvLyB2YWxpZGF0aW9uIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgIGRhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImRhdGFcIiksXG4gICAgLy8gYXJncyBwYXNzZWQgZnJvbSByZWZlcmVuY2luZyBzY2hlbWFcbiAgICB2YWxDeHQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInZhbEN4dFwiKSxcbiAgICBpbnN0YW5jZVBhdGg6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImluc3RhbmNlUGF0aFwiKSxcbiAgICBwYXJlbnREYXRhOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnREYXRhXCIpLFxuICAgIHBhcmVudERhdGFQcm9wZXJ0eTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyZW50RGF0YVByb3BlcnR5XCIpLFxuICAgIHJvb3REYXRhOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJyb290RGF0YVwiKSxcbiAgICBkeW5hbWljQW5jaG9yczogbmV3IGNvZGVnZW5fMS5OYW1lKFwiZHluYW1pY0FuY2hvcnNcIiksXG4gICAgLy8gZnVuY3Rpb24gc2NvcGVkIHZhcmlhYmxlc1xuICAgIHZFcnJvcnM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInZFcnJvcnNcIiksXG4gICAgZXJyb3JzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJlcnJvcnNcIiksXG4gICAgdGhpczogbmV3IGNvZGVnZW5fMS5OYW1lKFwidGhpc1wiKSxcbiAgICAvLyBcImdsb2JhbHNcIlxuICAgIHNlbGY6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNlbGZcIiksXG4gICAgc2NvcGU6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNjb3BlXCIpLFxuICAgIC8vIEpURCBzZXJpYWxpemUvcGFyc2UgbmFtZSBmb3IgSlNPTiBzdHJpbmcgYW5kIHBvc2l0aW9uXG4gICAganNvbjogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvblwiKSxcbiAgICBqc29uUG9zOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uUG9zXCIpLFxuICAgIGpzb25MZW46IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25MZW5cIiksXG4gICAganNvblBhcnQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25QYXJ0XCIpLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IG5hbWVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9yZXNvbHZlXCIpO1xuY2xhc3MgTWlzc2luZ1JlZkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlc29sdmVyLCBiYXNlSWQsIHJlZiwgbXNnKSB7XG4gICAgICAgIHN1cGVyKG1zZyB8fCBgY2FuJ3QgcmVzb2x2ZSByZWZlcmVuY2UgJHtyZWZ9IGZyb20gaWQgJHtiYXNlSWR9YCk7XG4gICAgICAgIHRoaXMubWlzc2luZ1JlZiA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkocmVzb2x2ZXIsIGJhc2VJZCwgcmVmKTtcbiAgICAgICAgdGhpcy5taXNzaW5nU2NoZW1hID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoKDAsIHJlc29sdmVfMS5nZXRGdWxsUGF0aCkocmVzb2x2ZXIsIHRoaXMubWlzc2luZ1JlZikpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1pc3NpbmdSZWZFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZl9lcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0U2NoZW1hUmVmcyA9IGV4cG9ydHMucmVzb2x2ZVVybCA9IGV4cG9ydHMubm9ybWFsaXplSWQgPSBleHBvcnRzLl9nZXRGdWxsUGF0aCA9IGV4cG9ydHMuZ2V0RnVsbFBhdGggPSBleHBvcnRzLmlubGluZVJlZiA9IHZvaWQgMDtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBlcXVhbCA9IHJlcXVpcmUoXCJmYXN0LWRlZXAtZXF1YWxcIik7XG5jb25zdCB0cmF2ZXJzZSA9IHJlcXVpcmUoXCJqc29uLXNjaGVtYS10cmF2ZXJzZVwiKTtcbi8vIFRPRE8gcmVmYWN0b3IgdG8gdXNlIGtleXdvcmQgZGVmaW5pdGlvbnNcbmNvbnN0IFNJTVBMRV9JTkxJTkVEID0gbmV3IFNldChbXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJmb3JtYXRcIixcbiAgICBcInBhdHRlcm5cIixcbiAgICBcIm1heExlbmd0aFwiLFxuICAgIFwibWluTGVuZ3RoXCIsXG4gICAgXCJtYXhQcm9wZXJ0aWVzXCIsXG4gICAgXCJtaW5Qcm9wZXJ0aWVzXCIsXG4gICAgXCJtYXhJdGVtc1wiLFxuICAgIFwibWluSXRlbXNcIixcbiAgICBcIm1heGltdW1cIixcbiAgICBcIm1pbmltdW1cIixcbiAgICBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgXCJtdWx0aXBsZU9mXCIsXG4gICAgXCJyZXF1aXJlZFwiLFxuICAgIFwiZW51bVwiLFxuICAgIFwiY29uc3RcIixcbl0pO1xuZnVuY3Rpb24gaW5saW5lUmVmKHNjaGVtYSwgbGltaXQgPSB0cnVlKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChsaW1pdCA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuICFoYXNSZWYoc2NoZW1hKTtcbiAgICBpZiAoIWxpbWl0KVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGNvdW50S2V5cyhzY2hlbWEpIDw9IGxpbWl0O1xufVxuZXhwb3J0cy5pbmxpbmVSZWYgPSBpbmxpbmVSZWY7XG5jb25zdCBSRUZfS0VZV09SRFMgPSBuZXcgU2V0KFtcbiAgICBcIiRyZWZcIixcbiAgICBcIiRyZWN1cnNpdmVSZWZcIixcbiAgICBcIiRyZWN1cnNpdmVBbmNob3JcIixcbiAgICBcIiRkeW5hbWljUmVmXCIsXG4gICAgXCIkZHluYW1pY0FuY2hvclwiLFxuXSk7XG5mdW5jdGlvbiBoYXNSZWYoc2NoZW1hKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChSRUZfS0VZV09SRFMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaCkgJiYgc2NoLnNvbWUoaGFzUmVmKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIHNjaCA9PSBcIm9iamVjdFwiICYmIGhhc1JlZihzY2gpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNvdW50S2V5cyhzY2hlbWEpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcIiRyZWZcIilcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgaWYgKFNJTVBMRV9JTkxJTkVELmhhcyhrZXkpKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hW2tleV0gPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5lYWNoSXRlbSkoc2NoZW1hW2tleV0sIChzY2gpID0+IChjb3VudCArPSBjb3VudEtleXMoc2NoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpXG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbn1cbmZ1bmN0aW9uIGdldEZ1bGxQYXRoKHJlc29sdmVyLCBpZCA9IFwiXCIsIG5vcm1hbGl6ZSkge1xuICAgIGlmIChub3JtYWxpemUgIT09IGZhbHNlKVxuICAgICAgICBpZCA9IG5vcm1hbGl6ZUlkKGlkKTtcbiAgICBjb25zdCBwID0gcmVzb2x2ZXIucGFyc2UoaWQpO1xuICAgIHJldHVybiBfZ2V0RnVsbFBhdGgocmVzb2x2ZXIsIHApO1xufVxuZXhwb3J0cy5nZXRGdWxsUGF0aCA9IGdldEZ1bGxQYXRoO1xuZnVuY3Rpb24gX2dldEZ1bGxQYXRoKHJlc29sdmVyLCBwKSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZCA9IHJlc29sdmVyLnNlcmlhbGl6ZShwKTtcbiAgICByZXR1cm4gc2VyaWFsaXplZC5zcGxpdChcIiNcIilbMF0gKyBcIiNcIjtcbn1cbmV4cG9ydHMuX2dldEZ1bGxQYXRoID0gX2dldEZ1bGxQYXRoO1xuY29uc3QgVFJBSUxJTkdfU0xBU0hfSEFTSCA9IC8jXFwvPyQvO1xuZnVuY3Rpb24gbm9ybWFsaXplSWQoaWQpIHtcbiAgICByZXR1cm4gaWQgPyBpZC5yZXBsYWNlKFRSQUlMSU5HX1NMQVNIX0hBU0gsIFwiXCIpIDogXCJcIjtcbn1cbmV4cG9ydHMubm9ybWFsaXplSWQgPSBub3JtYWxpemVJZDtcbmZ1bmN0aW9uIHJlc29sdmVVcmwocmVzb2x2ZXIsIGJhc2VJZCwgaWQpIHtcbiAgICBpZCA9IG5vcm1hbGl6ZUlkKGlkKTtcbiAgICByZXR1cm4gcmVzb2x2ZXIucmVzb2x2ZShiYXNlSWQsIGlkKTtcbn1cbmV4cG9ydHMucmVzb2x2ZVVybCA9IHJlc29sdmVVcmw7XG5jb25zdCBBTkNIT1IgPSAvXlthLXpfXVstYS16MC05Ll9dKiQvaTtcbmZ1bmN0aW9uIGdldFNjaGVtYVJlZnMoc2NoZW1hLCBiYXNlSWQpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHsgc2NoZW1hSWQsIHVyaVJlc29sdmVyIH0gPSB0aGlzLm9wdHM7XG4gICAgY29uc3Qgc2NoSWQgPSBub3JtYWxpemVJZChzY2hlbWFbc2NoZW1hSWRdIHx8IGJhc2VJZCk7XG4gICAgY29uc3QgYmFzZUlkcyA9IHsgXCJcIjogc2NoSWQgfTtcbiAgICBjb25zdCBwYXRoUHJlZml4ID0gZ2V0RnVsbFBhdGgodXJpUmVzb2x2ZXIsIHNjaElkLCBmYWxzZSk7XG4gICAgY29uc3QgbG9jYWxSZWZzID0ge307XG4gICAgY29uc3Qgc2NoZW1hUmVmcyA9IG5ldyBTZXQoKTtcbiAgICB0cmF2ZXJzZShzY2hlbWEsIHsgYWxsS2V5czogdHJ1ZSB9LCAoc2NoLCBqc29uUHRyLCBfLCBwYXJlbnRKc29uUHRyKSA9PiB7XG4gICAgICAgIGlmIChwYXJlbnRKc29uUHRyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gcGF0aFByZWZpeCArIGpzb25QdHI7XG4gICAgICAgIGxldCBiYXNlSWQgPSBiYXNlSWRzW3BhcmVudEpzb25QdHJdO1xuICAgICAgICBpZiAodHlwZW9mIHNjaFtzY2hlbWFJZF0gPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGJhc2VJZCA9IGFkZFJlZi5jYWxsKHRoaXMsIHNjaFtzY2hlbWFJZF0pO1xuICAgICAgICBhZGRBbmNob3IuY2FsbCh0aGlzLCBzY2guJGFuY2hvcik7XG4gICAgICAgIGFkZEFuY2hvci5jYWxsKHRoaXMsIHNjaC4kZHluYW1pY0FuY2hvcik7XG4gICAgICAgIGJhc2VJZHNbanNvblB0cl0gPSBiYXNlSWQ7XG4gICAgICAgIGZ1bmN0aW9uIGFkZFJlZihyZWYpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2RcbiAgICAgICAgICAgIGNvbnN0IF9yZXNvbHZlID0gdGhpcy5vcHRzLnVyaVJlc29sdmVyLnJlc29sdmU7XG4gICAgICAgICAgICByZWYgPSBub3JtYWxpemVJZChiYXNlSWQgPyBfcmVzb2x2ZShiYXNlSWQsIHJlZikgOiByZWYpO1xuICAgICAgICAgICAgaWYgKHNjaGVtYVJlZnMuaGFzKHJlZikpXG4gICAgICAgICAgICAgICAgdGhyb3cgYW1iaWd1b3MocmVmKTtcbiAgICAgICAgICAgIHNjaGVtYVJlZnMuYWRkKHJlZik7XG4gICAgICAgICAgICBsZXQgc2NoT3JSZWYgPSB0aGlzLnJlZnNbcmVmXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoT3JSZWYgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBzY2hPclJlZiA9IHRoaXMucmVmc1tzY2hPclJlZl07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaE9yUmVmID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBjaGVja0FtYmlndW9zUmVmKHNjaCwgc2NoT3JSZWYuc2NoZW1hLCByZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVmICE9PSBub3JtYWxpemVJZChmdWxsUGF0aCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVmWzBdID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0FtYmlndW9zUmVmKHNjaCwgbG9jYWxSZWZzW3JlZl0sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsUmVmc1tyZWZdID0gc2NoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzW3JlZl0gPSBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFkZEFuY2hvcihhbmNob3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYW5jaG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFOQ0hPUi50ZXN0KGFuY2hvcikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBhbmNob3IgXCIke2FuY2hvcn1cImApO1xuICAgICAgICAgICAgICAgIGFkZFJlZi5jYWxsKHRoaXMsIGAjJHthbmNob3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbG9jYWxSZWZzO1xuICAgIGZ1bmN0aW9uIGNoZWNrQW1iaWd1b3NSZWYoc2NoMSwgc2NoMiwgcmVmKSB7XG4gICAgICAgIGlmIChzY2gyICE9PSB1bmRlZmluZWQgJiYgIWVxdWFsKHNjaDEsIHNjaDIpKVxuICAgICAgICAgICAgdGhyb3cgYW1iaWd1b3MocmVmKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYW1iaWd1b3MocmVmKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlZmVyZW5jZSBcIiR7cmVmfVwiIHJlc29sdmVzIHRvIG1vcmUgdGhhbiBvbmUgc2NoZW1hYCk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTY2hlbWFSZWZzID0gZ2V0U2NoZW1hUmVmcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc29sdmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFJ1bGVzID0gZXhwb3J0cy5pc0pTT05UeXBlID0gdm9pZCAwO1xuY29uc3QgX2pzb25UeXBlcyA9IFtcInN0cmluZ1wiLCBcIm51bWJlclwiLCBcImludGVnZXJcIiwgXCJib29sZWFuXCIsIFwibnVsbFwiLCBcIm9iamVjdFwiLCBcImFycmF5XCJdO1xuY29uc3QganNvblR5cGVzID0gbmV3IFNldChfanNvblR5cGVzKTtcbmZ1bmN0aW9uIGlzSlNPTlR5cGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcInN0cmluZ1wiICYmIGpzb25UeXBlcy5oYXMoeCk7XG59XG5leHBvcnRzLmlzSlNPTlR5cGUgPSBpc0pTT05UeXBlO1xuZnVuY3Rpb24gZ2V0UnVsZXMoKSB7XG4gICAgY29uc3QgZ3JvdXBzID0ge1xuICAgICAgICBudW1iZXI6IHsgdHlwZTogXCJudW1iZXJcIiwgcnVsZXM6IFtdIH0sXG4gICAgICAgIHN0cmluZzogeyB0eXBlOiBcInN0cmluZ1wiLCBydWxlczogW10gfSxcbiAgICAgICAgYXJyYXk6IHsgdHlwZTogXCJhcnJheVwiLCBydWxlczogW10gfSxcbiAgICAgICAgb2JqZWN0OiB7IHR5cGU6IFwib2JqZWN0XCIsIHJ1bGVzOiBbXSB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZXM6IHsgLi4uZ3JvdXBzLCBpbnRlZ2VyOiB0cnVlLCBib29sZWFuOiB0cnVlLCBudWxsOiB0cnVlIH0sXG4gICAgICAgIHJ1bGVzOiBbeyBydWxlczogW10gfSwgZ3JvdXBzLm51bWJlciwgZ3JvdXBzLnN0cmluZywgZ3JvdXBzLmFycmF5LCBncm91cHMub2JqZWN0XSxcbiAgICAgICAgcG9zdDogeyBydWxlczogW10gfSxcbiAgICAgICAgYWxsOiB7fSxcbiAgICAgICAga2V5d29yZHM6IHt9LFxuICAgIH07XG59XG5leHBvcnRzLmdldFJ1bGVzID0gZ2V0UnVsZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ydWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2hlY2tTdHJpY3RNb2RlID0gZXhwb3J0cy5nZXRFcnJvclBhdGggPSBleHBvcnRzLlR5cGUgPSBleHBvcnRzLnVzZUZ1bmMgPSBleHBvcnRzLnNldEV2YWx1YXRlZCA9IGV4cG9ydHMuZXZhbHVhdGVkUHJvcHNUb05hbWUgPSBleHBvcnRzLm1lcmdlRXZhbHVhdGVkID0gZXhwb3J0cy5lYWNoSXRlbSA9IGV4cG9ydHMudW5lc2NhcGVKc29uUG9pbnRlciA9IGV4cG9ydHMuZXNjYXBlSnNvblBvaW50ZXIgPSBleHBvcnRzLmVzY2FwZUZyYWdtZW50ID0gZXhwb3J0cy51bmVzY2FwZUZyYWdtZW50ID0gZXhwb3J0cy5zY2hlbWFSZWZPclZhbCA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXNCdXRSZWYgPSBleHBvcnRzLnNjaGVtYUhhc1J1bGVzID0gZXhwb3J0cy5jaGVja1Vua25vd25SdWxlcyA9IGV4cG9ydHMuYWx3YXlzVmFsaWRTY2hlbWEgPSBleHBvcnRzLnRvSGFzaCA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuL2NvZGVcIik7XG4vLyBUT0RPIHJlZmFjdG9yIHRvIHVzZSBTZXRcbmZ1bmN0aW9uIHRvSGFzaChhcnIpIHtcbiAgICBjb25zdCBoYXNoID0ge307XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGFycilcbiAgICAgICAgaGFzaFtpdGVtXSA9IHRydWU7XG4gICAgcmV0dXJuIGhhc2g7XG59XG5leHBvcnRzLnRvSGFzaCA9IHRvSGFzaDtcbmZ1bmN0aW9uIGFsd2F5c1ZhbGlkU2NoZW1hKGl0LCBzY2hlbWEpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGNoZWNrVW5rbm93blJ1bGVzKGl0LCBzY2hlbWEpO1xuICAgIHJldHVybiAhc2NoZW1hSGFzUnVsZXMoc2NoZW1hLCBpdC5zZWxmLlJVTEVTLmFsbCk7XG59XG5leHBvcnRzLmFsd2F5c1ZhbGlkU2NoZW1hID0gYWx3YXlzVmFsaWRTY2hlbWE7XG5mdW5jdGlvbiBjaGVja1Vua25vd25SdWxlcyhpdCwgc2NoZW1hID0gaXQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBpZiAoIW9wdHMuc3RyaWN0U2NoZW1hKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcnVsZXMgPSBzZWxmLlJVTEVTLmtleXdvcmRzO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoIXJ1bGVzW2tleV0pXG4gICAgICAgICAgICBjaGVja1N0cmljdE1vZGUoaXQsIGB1bmtub3duIGtleXdvcmQ6IFwiJHtrZXl9XCJgKTtcbiAgICB9XG59XG5leHBvcnRzLmNoZWNrVW5rbm93blJ1bGVzID0gY2hlY2tVbmtub3duUnVsZXM7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlcyhzY2hlbWEsIHJ1bGVzKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKHJ1bGVzW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzID0gc2NoZW1hSGFzUnVsZXM7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlc0J1dFJlZihzY2hlbWEsIFJVTEVTKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKGtleSAhPT0gXCIkcmVmXCIgJiYgUlVMRVMuYWxsW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzQnV0UmVmID0gc2NoZW1hSGFzUnVsZXNCdXRSZWY7XG5mdW5jdGlvbiBzY2hlbWFSZWZPclZhbCh7IHRvcFNjaGVtYVJlZiwgc2NoZW1hUGF0aCB9LCBzY2hlbWEsIGtleXdvcmQsICRkYXRhKSB7XG4gICAgaWYgKCEkZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hfWA7XG4gICAgfVxuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShrZXl3b3JkKX1gO1xufVxuZXhwb3J0cy5zY2hlbWFSZWZPclZhbCA9IHNjaGVtYVJlZk9yVmFsO1xuZnVuY3Rpb24gdW5lc2NhcGVGcmFnbWVudChzdHIpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVKc29uUG9pbnRlcihkZWNvZGVVUklDb21wb25lbnQoc3RyKSk7XG59XG5leHBvcnRzLnVuZXNjYXBlRnJhZ21lbnQgPSB1bmVzY2FwZUZyYWdtZW50O1xuZnVuY3Rpb24gZXNjYXBlRnJhZ21lbnQoc3RyKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChlc2NhcGVKc29uUG9pbnRlcihzdHIpKTtcbn1cbmV4cG9ydHMuZXNjYXBlRnJhZ21lbnQgPSBlc2NhcGVGcmFnbWVudDtcbmZ1bmN0aW9uIGVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyID09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBgJHtzdHJ9YDtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL34vZywgXCJ+MFwiKS5yZXBsYWNlKC9cXC8vZywgXCJ+MVwiKTtcbn1cbmV4cG9ydHMuZXNjYXBlSnNvblBvaW50ZXIgPSBlc2NhcGVKc29uUG9pbnRlcjtcbmZ1bmN0aW9uIHVuZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9+MS9nLCBcIi9cIikucmVwbGFjZSgvfjAvZywgXCJ+XCIpO1xufVxuZXhwb3J0cy51bmVzY2FwZUpzb25Qb2ludGVyID0gdW5lc2NhcGVKc29uUG9pbnRlcjtcbmZ1bmN0aW9uIGVhY2hJdGVtKHhzLCBmKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoeHMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgeCBvZiB4cylcbiAgICAgICAgICAgIGYoeCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmKHhzKTtcbiAgICB9XG59XG5leHBvcnRzLmVhY2hJdGVtID0gZWFjaEl0ZW07XG5mdW5jdGlvbiBtYWtlTWVyZ2VFdmFsdWF0ZWQoeyBtZXJnZU5hbWVzLCBtZXJnZVRvTmFtZSwgbWVyZ2VWYWx1ZXMsIHJlc3VsdFRvTmFtZSwgfSkge1xuICAgIHJldHVybiAoZ2VuLCBmcm9tLCB0bywgdG9OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRvID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gZnJvbVxuICAgICAgICAgICAgOiB0byBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lXG4gICAgICAgICAgICAgICAgPyAoZnJvbSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gbWVyZ2VOYW1lcyhnZW4sIGZyb20sIHRvKSA6IG1lcmdlVG9OYW1lKGdlbiwgZnJvbSwgdG8pLCB0bylcbiAgICAgICAgICAgICAgICA6IGZyb20gaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IChtZXJnZVRvTmFtZShnZW4sIHRvLCBmcm9tKSwgZnJvbSlcbiAgICAgICAgICAgICAgICAgICAgOiBtZXJnZVZhbHVlcyhmcm9tLCB0byk7XG4gICAgICAgIHJldHVybiB0b05hbWUgPT09IGNvZGVnZW5fMS5OYW1lICYmICEocmVzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpID8gcmVzdWx0VG9OYW1lKGdlbiwgcmVzKSA6IHJlcztcbiAgICB9O1xufVxuZXhwb3J0cy5tZXJnZUV2YWx1YXRlZCA9IHtcbiAgICBwcm9wczogbWFrZU1lcmdlRXZhbHVhdGVkKHtcbiAgICAgICAgbWVyZ2VOYW1lczogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZSAmJiAke2Zyb219ICE9PSB1bmRlZmluZWRgLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtmcm9tfSA9PT0gdHJ1ZWAsICgpID0+IGdlbi5hc3NpZ24odG8sIHRydWUpLCAoKSA9PiBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSB8fCB7fWApLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LmFzc2lnbigke3RvfSwgJHtmcm9tfSlgKSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtZXJnZVRvTmFtZTogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZWAsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChmcm9tID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih0bywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSB8fCB7fWApO1xuICAgICAgICAgICAgICAgIHNldEV2YWx1YXRlZChnZW4sIHRvLCBmcm9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG1lcmdlVmFsdWVzOiAoZnJvbSwgdG8pID0+IChmcm9tID09PSB0cnVlID8gdHJ1ZSA6IHsgLi4uZnJvbSwgLi4udG8gfSksXG4gICAgICAgIHJlc3VsdFRvTmFtZTogZXZhbHVhdGVkUHJvcHNUb05hbWUsXG4gICAgfSksXG4gICAgaXRlbXM6IG1ha2VNZXJnZUV2YWx1YXRlZCh7XG4gICAgICAgIG1lcmdlTmFtZXM6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWUgJiYgJHtmcm9tfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgKDAsIGNvZGVnZW5fMS5fKSBgJHtmcm9tfSA9PT0gdHJ1ZSA/IHRydWUgOiAke3RvfSA+ICR7ZnJvbX0gPyAke3RvfSA6ICR7ZnJvbX1gKSksXG4gICAgICAgIG1lcmdlVG9OYW1lOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgZnJvbSA9PT0gdHJ1ZSA/IHRydWUgOiAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSA+ICR7ZnJvbX0gPyAke3RvfSA6ICR7ZnJvbX1gKSksXG4gICAgICAgIG1lcmdlVmFsdWVzOiAoZnJvbSwgdG8pID0+IChmcm9tID09PSB0cnVlID8gdHJ1ZSA6IE1hdGgubWF4KGZyb20sIHRvKSksXG4gICAgICAgIHJlc3VsdFRvTmFtZTogKGdlbiwgaXRlbXMpID0+IGdlbi52YXIoXCJpdGVtc1wiLCBpdGVtcyksXG4gICAgfSksXG59O1xuZnVuY3Rpb24gZXZhbHVhdGVkUHJvcHNUb05hbWUoZ2VuLCBwcykge1xuICAgIGlmIChwcyA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIGdlbi52YXIoXCJwcm9wc1wiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9wcyA9IGdlbi52YXIoXCJwcm9wc1wiLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgIGlmIChwcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzZXRFdmFsdWF0ZWQoZ2VuLCBwcm9wcywgcHMpO1xuICAgIHJldHVybiBwcm9wcztcbn1cbmV4cG9ydHMuZXZhbHVhdGVkUHJvcHNUb05hbWUgPSBldmFsdWF0ZWRQcm9wc1RvTmFtZTtcbmZ1bmN0aW9uIHNldEV2YWx1YXRlZChnZW4sIHByb3BzLCBwcykge1xuICAgIE9iamVjdC5rZXlzKHBzKS5mb3JFYWNoKChwKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcHN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwKX1gLCB0cnVlKSk7XG59XG5leHBvcnRzLnNldEV2YWx1YXRlZCA9IHNldEV2YWx1YXRlZDtcbmNvbnN0IHNuaXBwZXRzID0ge307XG5mdW5jdGlvbiB1c2VGdW5jKGdlbiwgZikge1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImZ1bmNcIiwge1xuICAgICAgICByZWY6IGYsXG4gICAgICAgIGNvZGU6IHNuaXBwZXRzW2YuY29kZV0gfHwgKHNuaXBwZXRzW2YuY29kZV0gPSBuZXcgY29kZV8xLl9Db2RlKGYuY29kZSkpLFxuICAgIH0pO1xufVxuZXhwb3J0cy51c2VGdW5jID0gdXNlRnVuYztcbnZhciBUeXBlO1xuKGZ1bmN0aW9uIChUeXBlKSB7XG4gICAgVHlwZVtUeXBlW1wiTnVtXCJdID0gMF0gPSBcIk51bVwiO1xuICAgIFR5cGVbVHlwZVtcIlN0clwiXSA9IDFdID0gXCJTdHJcIjtcbn0pKFR5cGUgPSBleHBvcnRzLlR5cGUgfHwgKGV4cG9ydHMuVHlwZSA9IHt9KSk7XG5mdW5jdGlvbiBnZXRFcnJvclBhdGgoZGF0YVByb3AsIGRhdGFQcm9wVHlwZSwganNQcm9wZXJ0eVN5bnRheCkge1xuICAgIC8vIGxldCBwYXRoXG4gICAgaWYgKGRhdGFQcm9wIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpIHtcbiAgICAgICAgY29uc3QgaXNOdW1iZXIgPSBkYXRhUHJvcFR5cGUgPT09IFR5cGUuTnVtO1xuICAgICAgICByZXR1cm4ganNQcm9wZXJ0eVN5bnRheFxuICAgICAgICAgICAgPyBpc051bWJlclxuICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgXCJbXCIgKyAke2RhdGFQcm9wfSArIFwiXVwiYFxuICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgXCJbJ1wiICsgJHtkYXRhUHJvcH0gKyBcIiddXCJgXG4gICAgICAgICAgICA6IGlzTnVtYmVyXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGBcIi9cIiArICR7ZGF0YVByb3B9YFxuICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgXCIvXCIgKyAke2RhdGFQcm9wfS5yZXBsYWNlKC9+L2csIFwifjBcIikucmVwbGFjZSgvXFxcXC8vZywgXCJ+MVwiKWA7IC8vIFRPRE8gbWF5YmUgdXNlIGdsb2JhbCBlc2NhcGVQb2ludGVyXG4gICAgfVxuICAgIHJldHVybiBqc1Byb3BlcnR5U3ludGF4ID8gKDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoZGF0YVByb3ApLnRvU3RyaW5nKCkgOiBcIi9cIiArIGVzY2FwZUpzb25Qb2ludGVyKGRhdGFQcm9wKTtcbn1cbmV4cG9ydHMuZ2V0RXJyb3JQYXRoID0gZ2V0RXJyb3JQYXRoO1xuZnVuY3Rpb24gY2hlY2tTdHJpY3RNb2RlKGl0LCBtc2csIG1vZGUgPSBpdC5vcHRzLnN0cmljdFNjaGVtYSkge1xuICAgIGlmICghbW9kZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIG1zZyA9IGBzdHJpY3QgbW9kZTogJHttc2d9YDtcbiAgICBpZiAobW9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgaXQuc2VsZi5sb2dnZXIud2Fybihtc2cpO1xufVxuZXhwb3J0cy5jaGVja1N0cmljdE1vZGUgPSBjaGVja1N0cmljdE1vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaG91bGRVc2VSdWxlID0gZXhwb3J0cy5zaG91bGRVc2VHcm91cCA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXNGb3JUeXBlID0gdm9pZCAwO1xuZnVuY3Rpb24gc2NoZW1hSGFzUnVsZXNGb3JUeXBlKHsgc2NoZW1hLCBzZWxmIH0sIHR5cGUpIHtcbiAgICBjb25zdCBncm91cCA9IHNlbGYuUlVMRVMudHlwZXNbdHlwZV07XG4gICAgcmV0dXJuIGdyb3VwICYmIGdyb3VwICE9PSB0cnVlICYmIHNob3VsZFVzZUdyb3VwKHNjaGVtYSwgZ3JvdXApO1xufVxuZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0ZvclR5cGUgPSBzY2hlbWFIYXNSdWxlc0ZvclR5cGU7XG5mdW5jdGlvbiBzaG91bGRVc2VHcm91cChzY2hlbWEsIGdyb3VwKSB7XG4gICAgcmV0dXJuIGdyb3VwLnJ1bGVzLnNvbWUoKHJ1bGUpID0+IHNob3VsZFVzZVJ1bGUoc2NoZW1hLCBydWxlKSk7XG59XG5leHBvcnRzLnNob3VsZFVzZUdyb3VwID0gc2hvdWxkVXNlR3JvdXA7XG5mdW5jdGlvbiBzaG91bGRVc2VSdWxlKHNjaGVtYSwgcnVsZSkge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKHNjaGVtYVtydWxlLmtleXdvcmRdICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgKChfYSA9IHJ1bGUuZGVmaW5pdGlvbi5pbXBsZW1lbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc29tZSgoa3dkKSA9PiBzY2hlbWFba3dkXSAhPT0gdW5kZWZpbmVkKSkpO1xufVxuZXhwb3J0cy5zaG91bGRVc2VSdWxlID0gc2hvdWxkVXNlUnVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGxpY2FiaWxpdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJvb2xPckVtcHR5U2NoZW1hID0gZXhwb3J0cy50b3BCb29sT3JFbXB0eVNjaGVtYSA9IHZvaWQgMDtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9uYW1lc1wiKTtcbmNvbnN0IGJvb2xFcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcImJvb2xlYW4gc2NoZW1hIGlzIGZhbHNlXCIsXG59O1xuZnVuY3Rpb24gdG9wQm9vbE9yRW1wdHlTY2hlbWEoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCB2YWxpZGF0ZU5hbWUgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGZhbHNlU2NoZW1hRXJyb3IoaXQsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmIHNjaGVtYS4kYXN5bmMgPT09IHRydWUpIHtcbiAgICAgICAgZ2VuLnJldHVybihuYW1lc18xLmRlZmF1bHQuZGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5lcnJvcnNgLCBudWxsKTtcbiAgICAgICAgZ2VuLnJldHVybih0cnVlKTtcbiAgICB9XG59XG5leHBvcnRzLnRvcEJvb2xPckVtcHR5U2NoZW1hID0gdG9wQm9vbE9yRW1wdHlTY2hlbWE7XG5mdW5jdGlvbiBib29sT3JFbXB0eVNjaGVtYShpdCwgdmFsaWQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICBnZW4udmFyKHZhbGlkLCBmYWxzZSk7IC8vIFRPRE8gdmFyXG4gICAgICAgIGZhbHNlU2NoZW1hRXJyb3IoaXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLnZhcih2YWxpZCwgdHJ1ZSk7IC8vIFRPRE8gdmFyXG4gICAgfVxufVxuZXhwb3J0cy5ib29sT3JFbXB0eVNjaGVtYSA9IGJvb2xPckVtcHR5U2NoZW1hO1xuZnVuY3Rpb24gZmFsc2VTY2hlbWFFcnJvcihpdCwgb3ZlcnJpZGVBbGxFcnJvcnMpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSB9ID0gaXQ7XG4gICAgLy8gVE9ETyBtYXliZSBzb21lIG90aGVyIGludGVyZmFjZSBzaG91bGQgYmUgdXNlZCBmb3Igbm9uLWtleXdvcmQgdmFsaWRhdGlvbiBlcnJvcnMuLi5cbiAgICBjb25zdCBjeHQgPSB7XG4gICAgICAgIGdlbixcbiAgICAgICAga2V5d29yZDogXCJmYWxzZSBzY2hlbWFcIixcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc2NoZW1hOiBmYWxzZSxcbiAgICAgICAgc2NoZW1hQ29kZTogZmFsc2UsXG4gICAgICAgIHNjaGVtYVZhbHVlOiBmYWxzZSxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgaXQsXG4gICAgfTtcbiAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKGN4dCwgYm9vbEVycm9yLCB1bmRlZmluZWQsIG92ZXJyaWRlQWxsRXJyb3JzKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb2xTY2hlbWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlcG9ydFR5cGVFcnJvciA9IGV4cG9ydHMuY2hlY2tEYXRhVHlwZXMgPSBleHBvcnRzLmNoZWNrRGF0YVR5cGUgPSBleHBvcnRzLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUgPSBleHBvcnRzLmdldEpTT05UeXBlcyA9IGV4cG9ydHMuZ2V0U2NoZW1hVHlwZXMgPSBleHBvcnRzLkRhdGFUeXBlID0gdm9pZCAwO1xuY29uc3QgcnVsZXNfMSA9IHJlcXVpcmUoXCIuLi9ydWxlc1wiKTtcbmNvbnN0IGFwcGxpY2FiaWxpdHlfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2FiaWxpdHlcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIERhdGFUeXBlO1xuKGZ1bmN0aW9uIChEYXRhVHlwZSkge1xuICAgIERhdGFUeXBlW0RhdGFUeXBlW1wiQ29ycmVjdFwiXSA9IDBdID0gXCJDb3JyZWN0XCI7XG4gICAgRGF0YVR5cGVbRGF0YVR5cGVbXCJXcm9uZ1wiXSA9IDFdID0gXCJXcm9uZ1wiO1xufSkoRGF0YVR5cGUgPSBleHBvcnRzLkRhdGFUeXBlIHx8IChleHBvcnRzLkRhdGFUeXBlID0ge30pKTtcbmZ1bmN0aW9uIGdldFNjaGVtYVR5cGVzKHNjaGVtYSkge1xuICAgIGNvbnN0IHR5cGVzID0gZ2V0SlNPTlR5cGVzKHNjaGVtYS50eXBlKTtcbiAgICBjb25zdCBoYXNOdWxsID0gdHlwZXMuaW5jbHVkZXMoXCJudWxsXCIpO1xuICAgIGlmIChoYXNOdWxsKSB7XG4gICAgICAgIGlmIChzY2hlbWEubnVsbGFibGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZTogbnVsbCBjb250cmFkaWN0cyBudWxsYWJsZTogZmFsc2VcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIXR5cGVzLmxlbmd0aCAmJiBzY2hlbWEubnVsbGFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIm51bGxhYmxlXCIgY2Fubm90IGJlIHVzZWQgd2l0aG91dCBcInR5cGVcIicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlbWEubnVsbGFibGUgPT09IHRydWUpXG4gICAgICAgICAgICB0eXBlcy5wdXNoKFwibnVsbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzO1xufVxuZXhwb3J0cy5nZXRTY2hlbWFUeXBlcyA9IGdldFNjaGVtYVR5cGVzO1xuZnVuY3Rpb24gZ2V0SlNPTlR5cGVzKHRzKSB7XG4gICAgY29uc3QgdHlwZXMgPSBBcnJheS5pc0FycmF5KHRzKSA/IHRzIDogdHMgPyBbdHNdIDogW107XG4gICAgaWYgKHR5cGVzLmV2ZXJ5KHJ1bGVzXzEuaXNKU09OVHlwZSkpXG4gICAgICAgIHJldHVybiB0eXBlcztcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlIG11c3QgYmUgSlNPTlR5cGUgb3IgSlNPTlR5cGVbXTogXCIgKyB0eXBlcy5qb2luKFwiLFwiKSk7XG59XG5leHBvcnRzLmdldEpTT05UeXBlcyA9IGdldEpTT05UeXBlcztcbmZ1bmN0aW9uIGNvZXJjZUFuZENoZWNrRGF0YVR5cGUoaXQsIHR5cGVzKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IGNvZXJjZVRvID0gY29lcmNlVG9UeXBlcyh0eXBlcywgb3B0cy5jb2VyY2VUeXBlcyk7XG4gICAgY29uc3QgY2hlY2tUeXBlcyA9IHR5cGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgIShjb2VyY2VUby5sZW5ndGggPT09IDAgJiYgdHlwZXMubGVuZ3RoID09PSAxICYmICgwLCBhcHBsaWNhYmlsaXR5XzEuc2NoZW1hSGFzUnVsZXNGb3JUeXBlKShpdCwgdHlwZXNbMF0pKTtcbiAgICBpZiAoY2hlY2tUeXBlcykge1xuICAgICAgICBjb25zdCB3cm9uZ1R5cGUgPSBjaGVja0RhdGFUeXBlcyh0eXBlcywgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzLCBEYXRhVHlwZS5Xcm9uZyk7XG4gICAgICAgIGdlbi5pZih3cm9uZ1R5cGUsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2VyY2VUby5sZW5ndGgpXG4gICAgICAgICAgICAgICAgY29lcmNlRGF0YShpdCwgdHlwZXMsIGNvZXJjZVRvKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXBvcnRUeXBlRXJyb3IoaXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrVHlwZXM7XG59XG5leHBvcnRzLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUgPSBjb2VyY2VBbmRDaGVja0RhdGFUeXBlO1xuY29uc3QgQ09FUkNJQkxFID0gbmV3IFNldChbXCJzdHJpbmdcIiwgXCJudW1iZXJcIiwgXCJpbnRlZ2VyXCIsIFwiYm9vbGVhblwiLCBcIm51bGxcIl0pO1xuZnVuY3Rpb24gY29lcmNlVG9UeXBlcyh0eXBlcywgY29lcmNlVHlwZXMpIHtcbiAgICByZXR1cm4gY29lcmNlVHlwZXNcbiAgICAgICAgPyB0eXBlcy5maWx0ZXIoKHQpID0+IENPRVJDSUJMRS5oYXModCkgfHwgKGNvZXJjZVR5cGVzID09PSBcImFycmF5XCIgJiYgdCA9PT0gXCJhcnJheVwiKSlcbiAgICAgICAgOiBbXTtcbn1cbmZ1bmN0aW9uIGNvZXJjZURhdGEoaXQsIHR5cGVzLCBjb2VyY2VUbykge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBvcHRzIH0gPSBpdDtcbiAgICBjb25zdCBkYXRhVHlwZSA9IGdlbi5sZXQoXCJkYXRhVHlwZVwiLCAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfWApO1xuICAgIGNvbnN0IGNvZXJjZWQgPSBnZW4ubGV0KFwiY29lcmNlZFwiLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICBpZiAob3B0cy5jb2VyY2VUeXBlcyA9PT0gXCJhcnJheVwiKSB7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KCR7ZGF0YX0pICYmICR7ZGF0YX0ubGVuZ3RoID09IDFgLCAoKSA9PiBnZW5cbiAgICAgICAgICAgIC5hc3NpZ24oZGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfVswXWApXG4gICAgICAgICAgICAuYXNzaWduKGRhdGFUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfWApXG4gICAgICAgICAgICAuaWYoY2hlY2tEYXRhVHlwZXModHlwZXMsIGRhdGEsIG9wdHMuc3RyaWN0TnVtYmVycyksICgpID0+IGdlbi5hc3NpZ24oY29lcmNlZCwgZGF0YSkpKTtcbiAgICB9XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y29lcmNlZH0gIT09IHVuZGVmaW5lZGApO1xuICAgIGZvciAoY29uc3QgdCBvZiBjb2VyY2VUbykge1xuICAgICAgICBpZiAoQ09FUkNJQkxFLmhhcyh0KSB8fCAodCA9PT0gXCJhcnJheVwiICYmIG9wdHMuY29lcmNlVHlwZXMgPT09IFwiYXJyYXlcIikpIHtcbiAgICAgICAgICAgIGNvZXJjZVNwZWNpZmljVHlwZSh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW4uZWxzZSgpO1xuICAgIHJlcG9ydFR5cGVFcnJvcihpdCk7XG4gICAgZ2VuLmVuZElmKCk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y29lcmNlZH0gIT09IHVuZGVmaW5lZGAsICgpID0+IHtcbiAgICAgICAgZ2VuLmFzc2lnbihkYXRhLCBjb2VyY2VkKTtcbiAgICAgICAgYXNzaWduUGFyZW50RGF0YShpdCwgY29lcmNlZCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY29lcmNlU3BlY2lmaWNUeXBlKHQpIHtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT0gXCJudW1iZXJcIiB8fCAke2RhdGFUeXBlfSA9PSBcImJvb2xlYW5cImApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcIiArICR7ZGF0YX1gKVxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IG51bGxgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYFwiXCJgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbFxuICAgICAgICAgICAgICB8fCAoJHtkYXRhVHlwZX0gPT0gXCJzdHJpbmdcIiAmJiAke2RhdGF9ICYmICR7ZGF0YX0gPT0gKyR7ZGF0YX0pYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGArJHtkYXRhfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT09IFwiYm9vbGVhblwiIHx8ICR7ZGF0YX0gPT09IG51bGxcbiAgICAgICAgICAgICAgfHwgKCR7ZGF0YVR5cGV9ID09PSBcInN0cmluZ1wiICYmICR7ZGF0YX0gJiYgJHtkYXRhfSA9PSArJHtkYXRhfSAmJiAhKCR7ZGF0YX0gJSAxKSlgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYCske2RhdGF9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcImZhbHNlXCIgfHwgJHtkYXRhfSA9PT0gMCB8fCAke2RhdGF9ID09PSBudWxsYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcInRydWVcIiB8fCAke2RhdGF9ID09PSAxYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgICAgIGdlbi5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gXCJcIiB8fCAke2RhdGF9ID09PSAwIHx8ICR7ZGF0YX0gPT09IGZhbHNlYCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihjb2VyY2VkLCBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PT0gXCJzdHJpbmdcIiB8fCAke2RhdGFUeXBlfSA9PT0gXCJudW1iZXJcIlxuICAgICAgICAgICAgICB8fCAke2RhdGFUeXBlfSA9PT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbGApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgWyR7ZGF0YX1dYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBhc3NpZ25QYXJlbnREYXRhKHsgZ2VuLCBwYXJlbnREYXRhLCBwYXJlbnREYXRhUHJvcGVydHkgfSwgZXhwcikge1xuICAgIC8vIFRPRE8gdXNlIGdlbi5wcm9wZXJ0eVxuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3BhcmVudERhdGF9ICE9PSB1bmRlZmluZWRgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cGFyZW50RGF0YX1bJHtwYXJlbnREYXRhUHJvcGVydHl9XWAsIGV4cHIpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrRGF0YVR5cGUoZGF0YVR5cGUsIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QgPSBEYXRhVHlwZS5Db3JyZWN0KSB7XG4gICAgY29uc3QgRVEgPSBjb3JyZWN0ID09PSBEYXRhVHlwZS5Db3JyZWN0ID8gY29kZWdlbl8xLm9wZXJhdG9ycy5FUSA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTkVRO1xuICAgIGxldCBjb25kO1xuICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICAgICAgY2FzZSBcIm51bGxcIjpcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICR7RVF9IG51bGxgO1xuICAgICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGBBcnJheS5pc0FycmF5KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSAmJiB0eXBlb2YgJHtkYXRhfSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxuICAgICAgICAgICAgY29uZCA9IG51bUNvbmQoKDAsIGNvZGVnZW5fMS5fKSBgISgke2RhdGF9ICUgMSkgJiYgIWlzTmFOKCR7ZGF0YX0pYCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgY29uZCA9IG51bUNvbmQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9ICR7RVF9ICR7ZGF0YVR5cGV9YDtcbiAgICB9XG4gICAgcmV0dXJuIGNvcnJlY3QgPT09IERhdGFUeXBlLkNvcnJlY3QgPyBjb25kIDogKDAsIGNvZGVnZW5fMS5ub3QpKGNvbmQpO1xuICAgIGZ1bmN0aW9uIG51bUNvbmQoX2NvbmQgPSBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLmFuZCkoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX0gPT0gXCJudW1iZXJcImAsIF9jb25kLCBzdHJpY3ROdW1zID8gKDAsIGNvZGVnZW5fMS5fKSBgaXNGaW5pdGUoJHtkYXRhfSlgIDogY29kZWdlbl8xLm5pbCk7XG4gICAgfVxufVxuZXhwb3J0cy5jaGVja0RhdGFUeXBlID0gY2hlY2tEYXRhVHlwZTtcbmZ1bmN0aW9uIGNoZWNrRGF0YVR5cGVzKGRhdGFUeXBlcywgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCkge1xuICAgIGlmIChkYXRhVHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBjaGVja0RhdGFUeXBlKGRhdGFUeXBlc1swXSwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCk7XG4gICAgfVxuICAgIGxldCBjb25kO1xuICAgIGNvbnN0IHR5cGVzID0gKDAsIHV0aWxfMS50b0hhc2gpKGRhdGFUeXBlcyk7XG4gICAgaWYgKHR5cGVzLmFycmF5ICYmIHR5cGVzLm9iamVjdCkge1xuICAgICAgICBjb25zdCBub3RPYmogPSAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfSAhPSBcIm9iamVjdFwiYDtcbiAgICAgICAgY29uZCA9IHR5cGVzLm51bGwgPyBub3RPYmogOiAoMCwgY29kZWdlbl8xLl8pIGAhJHtkYXRhfSB8fCAke25vdE9ian1gO1xuICAgICAgICBkZWxldGUgdHlwZXMubnVsbDtcbiAgICAgICAgZGVsZXRlIHR5cGVzLmFycmF5O1xuICAgICAgICBkZWxldGUgdHlwZXMub2JqZWN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uZCA9IGNvZGVnZW5fMS5uaWw7XG4gICAgfVxuICAgIGlmICh0eXBlcy5udW1iZXIpXG4gICAgICAgIGRlbGV0ZSB0eXBlcy5pbnRlZ2VyO1xuICAgIGZvciAoY29uc3QgdCBpbiB0eXBlcylcbiAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuYW5kKShjb25kLCBjaGVja0RhdGFUeXBlKHQsIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QpKTtcbiAgICByZXR1cm4gY29uZDtcbn1cbmV4cG9ydHMuY2hlY2tEYXRhVHlwZXMgPSBjaGVja0RhdGFUeXBlcztcbmNvbnN0IHR5cGVFcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWEgfSkgPT4gYG11c3QgYmUgJHtzY2hlbWF9YCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYSwgc2NoZW1hVmFsdWUgfSkgPT4gdHlwZW9mIHNjaGVtYSA9PSBcInN0cmluZ1wiID8gKDAsIGNvZGVnZW5fMS5fKSBge3R5cGU6ICR7c2NoZW1hfX1gIDogKDAsIGNvZGVnZW5fMS5fKSBge3R5cGU6ICR7c2NoZW1hVmFsdWV9fWAsXG59O1xuZnVuY3Rpb24gcmVwb3J0VHlwZUVycm9yKGl0KSB7XG4gICAgY29uc3QgY3h0ID0gZ2V0VHlwZUVycm9yQ29udGV4dChpdCk7XG4gICAgKDAsIGVycm9yc18xLnJlcG9ydEVycm9yKShjeHQsIHR5cGVFcnJvcik7XG59XG5leHBvcnRzLnJlcG9ydFR5cGVFcnJvciA9IHJlcG9ydFR5cGVFcnJvcjtcbmZ1bmN0aW9uIGdldFR5cGVFcnJvckNvbnRleHQoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgc2NoZW1hIH0gPSBpdDtcbiAgICBjb25zdCBzY2hlbWFDb2RlID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHNjaGVtYSwgXCJ0eXBlXCIpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdlbixcbiAgICAgICAga2V5d29yZDogXCJ0eXBlXCIsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHNjaGVtYTogc2NoZW1hLnR5cGUsXG4gICAgICAgIHNjaGVtYUNvZGUsXG4gICAgICAgIHNjaGVtYVZhbHVlOiBzY2hlbWFDb2RlLFxuICAgICAgICBwYXJlbnRTY2hlbWE6IHNjaGVtYSxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgaXQsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFUeXBlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc3NpZ25EZWZhdWx0cyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0cyhpdCwgdHkpIHtcbiAgICBjb25zdCB7IHByb3BlcnRpZXMsIGl0ZW1zIH0gPSBpdC5zY2hlbWE7XG4gICAgaWYgKHR5ID09PSBcIm9iamVjdFwiICYmIHByb3BlcnRpZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgYXNzaWduRGVmYXVsdChpdCwga2V5LCBwcm9wZXJ0aWVzW2tleV0uZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHkgPT09IFwiYXJyYXlcIiAmJiBBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChzY2gsIGkpID0+IGFzc2lnbkRlZmF1bHQoaXQsIGksIHNjaC5kZWZhdWx0KSk7XG4gICAgfVxufVxuZXhwb3J0cy5hc3NpZ25EZWZhdWx0cyA9IGFzc2lnbkRlZmF1bHRzO1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdChpdCwgcHJvcCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGNoaWxkRGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHByb3ApfWA7XG4gICAgaWYgKGNvbXBvc2l0ZVJ1bGUpIHtcbiAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgZGVmYXVsdCBpcyBpZ25vcmVkIGZvcjogJHtjaGlsZERhdGF9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGNvbmRpdGlvbiA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y2hpbGREYXRhfSA9PT0gdW5kZWZpbmVkYDtcbiAgICBpZiAob3B0cy51c2VEZWZhdWx0cyA9PT0gXCJlbXB0eVwiKSB7XG4gICAgICAgIGNvbmRpdGlvbiA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y29uZGl0aW9ufSB8fCAke2NoaWxkRGF0YX0gPT09IG51bGwgfHwgJHtjaGlsZERhdGF9ID09PSBcIlwiYDtcbiAgICB9XG4gICAgLy8gYCR7Y2hpbGREYXRhfSA9PT0gdW5kZWZpbmVkYCArXG4gICAgLy8gKG9wdHMudXNlRGVmYXVsdHMgPT09IFwiZW1wdHlcIiA/IGAgfHwgJHtjaGlsZERhdGF9ID09PSBudWxsIHx8ICR7Y2hpbGREYXRhfSA9PT0gXCJcImAgOiBcIlwiKVxuICAgIGdlbi5pZihjb25kaXRpb24sICgwLCBjb2RlZ2VuXzEuXykgYCR7Y2hpbGREYXRhfSA9ICR7KDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKGRlZmF1bHRWYWx1ZSl9YCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RGF0YSA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IGV4cG9ydHMudmFsaWRhdGVGdW5jdGlvbkNvZGUgPSB2b2lkIDA7XG5jb25zdCBib29sU2NoZW1hXzEgPSByZXF1aXJlKFwiLi9ib29sU2NoZW1hXCIpO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuL2RhdGFUeXBlXCIpO1xuY29uc3QgYXBwbGljYWJpbGl0eV8xID0gcmVxdWlyZShcIi4vYXBwbGljYWJpbGl0eVwiKTtcbmNvbnN0IGRhdGFUeXBlXzIgPSByZXF1aXJlKFwiLi9kYXRhVHlwZVwiKTtcbmNvbnN0IGRlZmF1bHRzXzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0c1wiKTtcbmNvbnN0IGtleXdvcmRfMSA9IHJlcXVpcmUoXCIuL2tleXdvcmRcIik7XG5jb25zdCBzdWJzY2hlbWFfMSA9IHJlcXVpcmUoXCIuL3N1YnNjaGVtYVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9uYW1lc1wiKTtcbmNvbnN0IHJlc29sdmVfMSA9IHJlcXVpcmUoXCIuLi9yZXNvbHZlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG4vLyBzY2hlbWEgY29tcGlsYXRpb24gLSBnZW5lcmF0ZXMgdmFsaWRhdGlvbiBmdW5jdGlvbiwgc3Vic2NoZW1hQ29kZSAoYmVsb3cpIGlzIHVzZWQgZm9yIHN1YnNjaGVtYXNcbmZ1bmN0aW9uIHZhbGlkYXRlRnVuY3Rpb25Db2RlKGl0KSB7XG4gICAgaWYgKGlzU2NoZW1hT2JqKGl0KSkge1xuICAgICAgICBjaGVja0tleXdvcmRzKGl0KTtcbiAgICAgICAgaWYgKHNjaGVtYUN4dEhhc1J1bGVzKGl0KSkge1xuICAgICAgICAgICAgdG9wU2NoZW1hT2JqQ29kZShpdCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVGdW5jdGlvbihpdCwgKCkgPT4gKDAsIGJvb2xTY2hlbWFfMS50b3BCb29sT3JFbXB0eVNjaGVtYSkoaXQpKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVGdW5jdGlvbkNvZGUgPSB2YWxpZGF0ZUZ1bmN0aW9uQ29kZTtcbmZ1bmN0aW9uIHZhbGlkYXRlRnVuY3Rpb24oeyBnZW4sIHZhbGlkYXRlTmFtZSwgc2NoZW1hLCBzY2hlbWFFbnYsIG9wdHMgfSwgYm9keSkge1xuICAgIGlmIChvcHRzLmNvZGUuZXM1KSB7XG4gICAgICAgIGdlbi5mdW5jKHZhbGlkYXRlTmFtZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZGF0YX0sICR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH1gLCBzY2hlbWFFbnYuJGFzeW5jLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGBcInVzZSBzdHJpY3RcIjsgJHtmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cyl9YCk7XG4gICAgICAgICAgICBkZXN0cnVjdHVyZVZhbEN4dEVTNShnZW4sIG9wdHMpO1xuICAgICAgICAgICAgZ2VuLmNvZGUoYm9keSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmZ1bmModmFsaWRhdGVOYW1lLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5kYXRhfSwgJHtkZXN0cnVjdHVyZVZhbEN4dChvcHRzKX1gLCBzY2hlbWFFbnYuJGFzeW5jLCAoKSA9PiBnZW4uY29kZShmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cykpLmNvZGUoYm9keSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlc3RydWN0dXJlVmFsQ3h0KG9wdHMpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgeyR7bmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aH09XCJcIiwgJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YX0sICR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eX0sICR7bmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhfT0ke25hbWVzXzEuZGVmYXVsdC5kYXRhfSR7b3B0cy5keW5hbWljUmVmID8gKDAsIGNvZGVnZW5fMS5fKSBgLCAke25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc309e31gIDogY29kZWdlbl8xLm5pbH19PXt9YDtcbn1cbmZ1bmN0aW9uIGRlc3RydWN0dXJlVmFsQ3h0RVM1KGdlbiwgb3B0cykge1xuICAgIGdlbi5pZihuYW1lc18xLmRlZmF1bHQudmFsQ3h0LCAoKSA9PiB7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGh9YCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YX1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eX1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucm9vdERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucm9vdERhdGF9YCk7XG4gICAgICAgIGlmIChvcHRzLmR5bmFtaWNSZWYpXG4gICAgICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc31gKTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcImApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucm9vdERhdGEsIG5hbWVzXzEuZGVmYXVsdC5kYXRhKTtcbiAgICAgICAgaWYgKG9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdG9wU2NoZW1hT2JqQ29kZShpdCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBvcHRzLCBnZW4gfSA9IGl0O1xuICAgIHZhbGlkYXRlRnVuY3Rpb24oaXQsICgpID0+IHtcbiAgICAgICAgaWYgKG9wdHMuJGNvbW1lbnQgJiYgc2NoZW1hLiRjb21tZW50KVxuICAgICAgICAgICAgY29tbWVudEtleXdvcmQoaXQpO1xuICAgICAgICBjaGVja05vRGVmYXVsdChpdCk7XG4gICAgICAgIGdlbi5sZXQobmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsIG51bGwpO1xuICAgICAgICBnZW4ubGV0KG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsIDApO1xuICAgICAgICBpZiAob3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIHJlc2V0RXZhbHVhdGVkKGl0KTtcbiAgICAgICAgdHlwZUFuZEtleXdvcmRzKGl0KTtcbiAgICAgICAgcmV0dXJuUmVzdWx0cyhpdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gcmVzZXRFdmFsdWF0ZWQoaXQpIHtcbiAgICAvLyBUT0RPIG1heWJlIHNvbWUgaG9vayB0byBleGVjdXRlIGl0IGluIHRoZSBlbmQgdG8gY2hlY2sgd2hldGhlciBwcm9wcy9pdGVtcyBhcmUgTmFtZSwgYXMgaW4gYXNzaWduRXZhbHVhdGVkXG4gICAgY29uc3QgeyBnZW4sIHZhbGlkYXRlTmFtZSB9ID0gaXQ7XG4gICAgaXQuZXZhbHVhdGVkID0gZ2VuLmNvbnN0KFwiZXZhbHVhdGVkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5ldmFsdWF0ZWRgKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9LmR5bmFtaWNQcm9wc2AsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9LnByb3BzYCwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCkpO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uZHluYW1pY0l0ZW1zYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uaXRlbXNgLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKSk7XG59XG5mdW5jdGlvbiBmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cykge1xuICAgIGNvbnN0IHNjaElkID0gdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmIHNjaGVtYVtvcHRzLnNjaGVtYUlkXTtcbiAgICByZXR1cm4gc2NoSWQgJiYgKG9wdHMuY29kZS5zb3VyY2UgfHwgb3B0cy5jb2RlLnByb2Nlc3MpID8gKDAsIGNvZGVnZW5fMS5fKSBgLyojIHNvdXJjZVVSTD0ke3NjaElkfSAqL2AgOiBjb2RlZ2VuXzEubmlsO1xufVxuLy8gc2NoZW1hIGNvbXBpbGF0aW9uIC0gdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHJlY3Vyc2l2ZWx5IHRvIGdlbmVyYXRlIGNvZGUgZm9yIHN1Yi1zY2hlbWFzXG5mdW5jdGlvbiBzdWJzY2hlbWFDb2RlKGl0LCB2YWxpZCkge1xuICAgIGlmIChpc1NjaGVtYU9iaihpdCkpIHtcbiAgICAgICAgY2hlY2tLZXl3b3JkcyhpdCk7XG4gICAgICAgIGlmIChzY2hlbWFDeHRIYXNSdWxlcyhpdCkpIHtcbiAgICAgICAgICAgIHN1YlNjaGVtYU9iakNvZGUoaXQsIHZhbGlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAoMCwgYm9vbFNjaGVtYV8xLmJvb2xPckVtcHR5U2NoZW1hKShpdCwgdmFsaWQpO1xufVxuZnVuY3Rpb24gc2NoZW1hQ3h0SGFzUnVsZXMoeyBzY2hlbWEsIHNlbGYgfSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gIXNjaGVtYTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpXG4gICAgICAgIGlmIChzZWxmLlJVTEVTLmFsbFtrZXldKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNTY2hlbWFPYmooaXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGl0LnNjaGVtYSAhPSBcImJvb2xlYW5cIjtcbn1cbmZ1bmN0aW9uIHN1YlNjaGVtYU9iakNvZGUoaXQsIHZhbGlkKSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIGdlbiwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKG9wdHMuJGNvbW1lbnQgJiYgc2NoZW1hLiRjb21tZW50KVxuICAgICAgICBjb21tZW50S2V5d29yZChpdCk7XG4gICAgdXBkYXRlQ29udGV4dChpdCk7XG4gICAgY2hlY2tBc3luY1NjaGVtYShpdCk7XG4gICAgY29uc3QgZXJyc0NvdW50ID0gZ2VuLmNvbnN0KFwiX2VycnNcIiwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycyk7XG4gICAgdHlwZUFuZEtleXdvcmRzKGl0LCBlcnJzQ291bnQpO1xuICAgIC8vIFRPRE8gdmFyXG4gICAgZ2VuLnZhcih2YWxpZCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG59XG5mdW5jdGlvbiBjaGVja0tleXdvcmRzKGl0KSB7XG4gICAgKDAsIHV0aWxfMS5jaGVja1Vua25vd25SdWxlcykoaXQpO1xuICAgIGNoZWNrUmVmc0FuZEtleXdvcmRzKGl0KTtcbn1cbmZ1bmN0aW9uIHR5cGVBbmRLZXl3b3JkcyhpdCwgZXJyc0NvdW50KSB7XG4gICAgaWYgKGl0Lm9wdHMuanRkKVxuICAgICAgICByZXR1cm4gc2NoZW1hS2V5d29yZHMoaXQsIFtdLCBmYWxzZSwgZXJyc0NvdW50KTtcbiAgICBjb25zdCB0eXBlcyA9ICgwLCBkYXRhVHlwZV8xLmdldFNjaGVtYVR5cGVzKShpdC5zY2hlbWEpO1xuICAgIGNvbnN0IGNoZWNrZWRUeXBlcyA9ICgwLCBkYXRhVHlwZV8xLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUpKGl0LCB0eXBlcyk7XG4gICAgc2NoZW1hS2V5d29yZHMoaXQsIHR5cGVzLCAhY2hlY2tlZFR5cGVzLCBlcnJzQ291bnQpO1xufVxuZnVuY3Rpb24gY2hlY2tSZWZzQW5kS2V5d29yZHMoaXQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgZXJyU2NoZW1hUGF0aCwgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYS4kcmVmICYmIG9wdHMuaWdub3JlS2V5d29yZHNXaXRoUmVmICYmICgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgc2VsZi5SVUxFUykpIHtcbiAgICAgICAgc2VsZi5sb2dnZXIud2FybihgJHJlZjoga2V5d29yZHMgaWdub3JlZCBpbiBzY2hlbWEgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cImApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNoZWNrTm9EZWZhdWx0KGl0KSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIG9wdHMgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIG9wdHMudXNlRGVmYXVsdHMgJiYgb3B0cy5zdHJpY3RTY2hlbWEpIHtcbiAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBcImRlZmF1bHQgaXMgaWdub3JlZCBpbiB0aGUgc2NoZW1hIHJvb3RcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ29udGV4dChpdCkge1xuICAgIGNvbnN0IHNjaElkID0gaXQuc2NoZW1hW2l0Lm9wdHMuc2NoZW1hSWRdO1xuICAgIGlmIChzY2hJZClcbiAgICAgICAgaXQuYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShpdC5vcHRzLnVyaVJlc29sdmVyLCBpdC5iYXNlSWQsIHNjaElkKTtcbn1cbmZ1bmN0aW9uIGNoZWNrQXN5bmNTY2hlbWEoaXQpIHtcbiAgICBpZiAoaXQuc2NoZW1hLiRhc3luYyAmJiAhaXQuc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMgc2NoZW1hIGluIHN5bmMgc2NoZW1hXCIpO1xufVxuZnVuY3Rpb24gY29tbWVudEtleXdvcmQoeyBnZW4sIHNjaGVtYUVudiwgc2NoZW1hLCBlcnJTY2hlbWFQYXRoLCBvcHRzIH0pIHtcbiAgICBjb25zdCBtc2cgPSBzY2hlbWEuJGNvbW1lbnQ7XG4gICAgaWYgKG9wdHMuJGNvbW1lbnQgPT09IHRydWUpIHtcbiAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn0ubG9nZ2VyLmxvZygke21zZ30pYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzLiRjb21tZW50ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb25zdCBzY2hlbWFQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2VyclNjaGVtYVBhdGh9LyRjb21tZW50YDtcbiAgICAgICAgY29uc3Qgcm9vdE5hbWUgPSBnZW4uc2NvcGVWYWx1ZShcInJvb3RcIiwgeyByZWY6IHNjaGVtYUVudi5yb290IH0pO1xuICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5zZWxmfS5vcHRzLiRjb21tZW50KCR7bXNnfSwgJHtzY2hlbWFQYXRofSwgJHtyb290TmFtZX0uc2NoZW1hKWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJldHVyblJlc3VsdHMoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hRW52LCB2YWxpZGF0ZU5hbWUsIFZhbGlkYXRpb25FcnJvciwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYUVudi4kYXN5bmMpIHtcbiAgICAgICAgLy8gVE9ETyBhc3NpZ24gdW5ldmFsdWF0ZWRcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30gPT09IDBgLCAoKSA9PiBnZW4ucmV0dXJuKG5hbWVzXzEuZGVmYXVsdC5kYXRhKSwgKCkgPT4gZ2VuLnRocm93KCgwLCBjb2RlZ2VuXzEuXykgYG5ldyAke1ZhbGlkYXRpb25FcnJvcn0oJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30pYCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXJyb3JzYCwgbmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMpO1xuICAgICAgICBpZiAob3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIGFzc2lnbkV2YWx1YXRlZChpdCk7XG4gICAgICAgIGdlbi5yZXR1cm4oKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gMGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2lnbkV2YWx1YXRlZCh7IGdlbiwgZXZhbHVhdGVkLCBwcm9wcywgaXRlbXMgfSkge1xuICAgIGlmIChwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKVxuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXZhbHVhdGVkfS5wcm9wc2AsIHByb3BzKTtcbiAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSlcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2V2YWx1YXRlZH0uaXRlbXNgLCBpdGVtcyk7XG59XG5mdW5jdGlvbiBzY2hlbWFLZXl3b3JkcyhpdCwgdHlwZXMsIHR5cGVFcnJvcnMsIGVycnNDb3VudCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGFsbEVycm9ycywgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgY29uc3QgeyBSVUxFUyB9ID0gc2VsZjtcbiAgICBpZiAoc2NoZW1hLiRyZWYgJiYgKG9wdHMuaWdub3JlS2V5d29yZHNXaXRoUmVmIHx8ICEoMCwgdXRpbF8xLnNjaGVtYUhhc1J1bGVzQnV0UmVmKShzY2hlbWEsIFJVTEVTKSkpIHtcbiAgICAgICAgZ2VuLmJsb2NrKCgpID0+IGtleXdvcmRDb2RlKGl0LCBcIiRyZWZcIiwgUlVMRVMuYWxsLiRyZWYuZGVmaW5pdGlvbikpOyAvLyBUT0RPIHR5cGVjYXN0XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFvcHRzLmp0ZClcbiAgICAgICAgY2hlY2tTdHJpY3RUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgUlVMRVMucnVsZXMpXG4gICAgICAgICAgICBncm91cEtleXdvcmRzKGdyb3VwKTtcbiAgICAgICAgZ3JvdXBLZXl3b3JkcyhSVUxFUy5wb3N0KTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBncm91cEtleXdvcmRzKGdyb3VwKSB7XG4gICAgICAgIGlmICghKDAsIGFwcGxpY2FiaWxpdHlfMS5zaG91bGRVc2VHcm91cCkoc2NoZW1hLCBncm91cCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChncm91cC50eXBlKSB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGRhdGFUeXBlXzIuY2hlY2tEYXRhVHlwZSkoZ3JvdXAudHlwZSwgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzKSk7XG4gICAgICAgICAgICBpdGVyYXRlS2V5d29yZHMoaXQsIGdyb3VwKTtcbiAgICAgICAgICAgIGlmICh0eXBlcy5sZW5ndGggPT09IDEgJiYgdHlwZXNbMF0gPT09IGdyb3VwLnR5cGUgJiYgdHlwZUVycm9ycykge1xuICAgICAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICAgICAgKDAsIGRhdGFUeXBlXzIucmVwb3J0VHlwZUVycm9yKShpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW4uZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gbWFrZSBpdCBcIm9rXCIgY2FsbD9cbiAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gJHtlcnJzQ291bnQgfHwgMH1gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpdGVyYXRlS2V5d29yZHMoaXQsIGdyb3VwKSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgb3B0czogeyB1c2VEZWZhdWx0cyB9LCB9ID0gaXQ7XG4gICAgaWYgKHVzZURlZmF1bHRzKVxuICAgICAgICAoMCwgZGVmYXVsdHNfMS5hc3NpZ25EZWZhdWx0cykoaXQsIGdyb3VwLnR5cGUpO1xuICAgIGdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBncm91cC5ydWxlcykge1xuICAgICAgICAgICAgaWYgKCgwLCBhcHBsaWNhYmlsaXR5XzEuc2hvdWxkVXNlUnVsZSkoc2NoZW1hLCBydWxlKSkge1xuICAgICAgICAgICAgICAgIGtleXdvcmRDb2RlKGl0LCBydWxlLmtleXdvcmQsIHJ1bGUuZGVmaW5pdGlvbiwgZ3JvdXAudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNoZWNrU3RyaWN0VHlwZXMoaXQsIHR5cGVzKSB7XG4gICAgaWYgKGl0LnNjaGVtYUVudi5tZXRhIHx8ICFpdC5vcHRzLnN0cmljdFR5cGVzKVxuICAgICAgICByZXR1cm47XG4gICAgY2hlY2tDb250ZXh0VHlwZXMoaXQsIHR5cGVzKTtcbiAgICBpZiAoIWl0Lm9wdHMuYWxsb3dVbmlvblR5cGVzKVxuICAgICAgICBjaGVja011bHRpcGxlVHlwZXMoaXQsIHR5cGVzKTtcbiAgICBjaGVja0tleXdvcmRUeXBlcyhpdCwgaXQuZGF0YVR5cGVzKTtcbn1cbmZ1bmN0aW9uIGNoZWNrQ29udGV4dFR5cGVzKGl0LCB0eXBlcykge1xuICAgIGlmICghdHlwZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFpdC5kYXRhVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIGl0LmRhdGFUeXBlcyA9IHR5cGVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKCFpbmNsdWRlc1R5cGUoaXQuZGF0YVR5cGVzLCB0KSkge1xuICAgICAgICAgICAgc3RyaWN0VHlwZXNFcnJvcihpdCwgYHR5cGUgXCIke3R9XCIgbm90IGFsbG93ZWQgYnkgY29udGV4dCBcIiR7aXQuZGF0YVR5cGVzLmpvaW4oXCIsXCIpfVwiYCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpdC5kYXRhVHlwZXMgPSBpdC5kYXRhVHlwZXMuZmlsdGVyKCh0KSA9PiBpbmNsdWRlc1R5cGUodHlwZXMsIHQpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrTXVsdGlwbGVUeXBlcyhpdCwgdHMpIHtcbiAgICBpZiAodHMubGVuZ3RoID4gMSAmJiAhKHRzLmxlbmd0aCA9PT0gMiAmJiB0cy5pbmNsdWRlcyhcIm51bGxcIikpKSB7XG4gICAgICAgIHN0cmljdFR5cGVzRXJyb3IoaXQsIFwidXNlIGFsbG93VW5pb25UeXBlcyB0byBhbGxvdyB1bmlvbiB0eXBlIGtleXdvcmRcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tLZXl3b3JkVHlwZXMoaXQsIHRzKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpdC5zZWxmLlJVTEVTLmFsbDtcbiAgICBmb3IgKGNvbnN0IGtleXdvcmQgaW4gcnVsZXMpIHtcbiAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleXdvcmRdO1xuICAgICAgICBpZiAodHlwZW9mIHJ1bGUgPT0gXCJvYmplY3RcIiAmJiAoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZVJ1bGUpKGl0LnNjaGVtYSwgcnVsZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gcnVsZS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgaWYgKHR5cGUubGVuZ3RoICYmICF0eXBlLnNvbWUoKHQpID0+IGhhc0FwcGxpY2FibGVUeXBlKHRzLCB0KSkpIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBgbWlzc2luZyB0eXBlIFwiJHt0eXBlLmpvaW4oXCIsXCIpfVwiIGZvciBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYXNBcHBsaWNhYmxlVHlwZShzY2hUcywga3dkVCkge1xuICAgIHJldHVybiBzY2hUcy5pbmNsdWRlcyhrd2RUKSB8fCAoa3dkVCA9PT0gXCJudW1iZXJcIiAmJiBzY2hUcy5pbmNsdWRlcyhcImludGVnZXJcIikpO1xufVxuZnVuY3Rpb24gaW5jbHVkZXNUeXBlKHRzLCB0KSB7XG4gICAgcmV0dXJuIHRzLmluY2x1ZGVzKHQpIHx8ICh0ID09PSBcImludGVnZXJcIiAmJiB0cy5pbmNsdWRlcyhcIm51bWJlclwiKSk7XG59XG5mdW5jdGlvbiBzdHJpY3RUeXBlc0Vycm9yKGl0LCBtc2cpIHtcbiAgICBjb25zdCBzY2hlbWFQYXRoID0gaXQuc2NoZW1hRW52LmJhc2VJZCArIGl0LmVyclNjaGVtYVBhdGg7XG4gICAgbXNnICs9IGAgYXQgXCIke3NjaGVtYVBhdGh9XCIgKHN0cmljdFR5cGVzKWA7XG4gICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIGl0Lm9wdHMuc3RyaWN0VHlwZXMpO1xufVxuY2xhc3MgS2V5d29yZEN4dCB7XG4gICAgY29uc3RydWN0b3IoaXQsIGRlZiwga2V5d29yZCkge1xuICAgICAgICAoMCwga2V5d29yZF8xLnZhbGlkYXRlS2V5d29yZFVzYWdlKShpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICAgICAgdGhpcy5nZW4gPSBpdC5nZW47XG4gICAgICAgIHRoaXMuYWxsRXJyb3JzID0gaXQuYWxsRXJyb3JzO1xuICAgICAgICB0aGlzLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICB0aGlzLmRhdGEgPSBpdC5kYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICAgICAgdGhpcy4kZGF0YSA9IGRlZi4kZGF0YSAmJiBpdC5vcHRzLiRkYXRhICYmIHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hLiRkYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYVZhbHVlID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHRoaXMuc2NoZW1hLCBrZXl3b3JkLCB0aGlzLiRkYXRhKTtcbiAgICAgICAgdGhpcy5zY2hlbWFUeXBlID0gZGVmLnNjaGVtYVR5cGU7XG4gICAgICAgIHRoaXMucGFyZW50U2NoZW1hID0gaXQuc2NoZW1hO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHt9O1xuICAgICAgICB0aGlzLml0ID0gaXQ7XG4gICAgICAgIHRoaXMuZGVmID0gZGVmO1xuICAgICAgICBpZiAodGhpcy4kZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFDb2RlID0gaXQuZ2VuLmNvbnN0KFwidlNjaGVtYVwiLCBnZXREYXRhKHRoaXMuJGRhdGEsIGl0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYUNvZGUgPSB0aGlzLnNjaGVtYVZhbHVlO1xuICAgICAgICAgICAgaWYgKCEoMCwga2V5d29yZF8xLnZhbGlkU2NoZW1hVHlwZSkodGhpcy5zY2hlbWEsIGRlZi5zY2hlbWFUeXBlLCBkZWYuYWxsb3dVbmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2tleXdvcmR9IHZhbHVlIG11c3QgYmUgJHtKU09OLnN0cmluZ2lmeShkZWYuc2NoZW1hVHlwZSl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY29kZVwiIGluIGRlZiA/IGRlZi50cmFja0Vycm9ycyA6IGRlZi5lcnJvcnMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmVycnNDb3VudCA9IGl0Lmdlbi5jb25zdChcIl9lcnJzXCIsIG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWlsUmVzdWx0KCgwLCBjb2RlZ2VuXzEubm90KShjb25kaXRpb24pLCBzdWNjZXNzQWN0aW9uLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbFJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5nZW4uaWYoY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKGZhaWxBY3Rpb24pXG4gICAgICAgICAgICBmYWlsQWN0aW9uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3NBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NBY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICB0aGlzLmdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmVuZElmKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhc3MoY29uZGl0aW9uLCBmYWlsQWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZmFpbFJlc3VsdCgoMCwgY29kZWdlbl8xLm5vdCkoY29uZGl0aW9uKSwgdW5kZWZpbmVkLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbChjb25kaXRpb24pIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmlmKGZhbHNlKTsgLy8gdGhpcyBicmFuY2ggd2lsbCBiZSByZW1vdmVkIGJ5IGdlbi5vcHRpbWl6ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuLmlmKGNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgdGhpcy5nZW4uZW5kSWYoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgIH1cbiAgICBmYWlsJGRhdGEoY29uZGl0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy4kZGF0YSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWwoY29uZGl0aW9uKTtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFDb2RlIH0gPSB0aGlzO1xuICAgICAgICB0aGlzLmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSAhPT0gdW5kZWZpbmVkICYmICgkeygwLCBjb2RlZ2VuXzEub3IpKHRoaXMuaW52YWxpZCRkYXRhKCksIGNvbmRpdGlvbil9KWApO1xuICAgIH1cbiAgICBlcnJvcihhcHBlbmQsIGVycm9yUGFyYW1zLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIGlmIChlcnJvclBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbXMoZXJyb3JQYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1zKHt9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICBfZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIDtcbiAgICAgICAgKGFwcGVuZCA/IGVycm9yc18xLnJlcG9ydEV4dHJhRXJyb3IgOiBlcnJvcnNfMS5yZXBvcnRFcnJvcikodGhpcywgdGhpcy5kZWYuZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICAkZGF0YUVycm9yKCkge1xuICAgICAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKHRoaXMsIHRoaXMuZGVmLiRkYXRhRXJyb3IgfHwgZXJyb3JzXzEua2V5d29yZCREYXRhRXJyb3IpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyc0NvdW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZCBcInRyYWNrRXJyb3JzXCIgdG8ga2V5d29yZCBkZWZpbml0aW9uJyk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5yZXNldEVycm9yc0NvdW50KSh0aGlzLmdlbiwgdGhpcy5lcnJzQ291bnQpO1xuICAgIH1cbiAgICBvayhjb25kKSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmdlbi5pZihjb25kKTtcbiAgICB9XG4gICAgc2V0UGFyYW1zKG9iaiwgYXNzaWduKSB7XG4gICAgICAgIGlmIChhc3NpZ24pXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGFyYW1zLCBvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IG9iajtcbiAgICB9XG4gICAgYmxvY2skZGF0YSh2YWxpZCwgY29kZUJsb2NrLCAkZGF0YVZhbGlkID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICB0aGlzLmdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrJGRhdGEodmFsaWQsICRkYXRhVmFsaWQpO1xuICAgICAgICAgICAgY29kZUJsb2NrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVjayRkYXRhKHZhbGlkID0gY29kZWdlbl8xLm5pbCwgJGRhdGFWYWxpZCA9IGNvZGVnZW5fMS5uaWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRkYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hQ29kZSwgc2NoZW1hVHlwZSwgZGVmIH0gPSB0aGlzO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5vcikoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSA9PT0gdW5kZWZpbmVkYCwgJGRhdGFWYWxpZCkpO1xuICAgICAgICBpZiAodmFsaWQgIT09IGNvZGVnZW5fMS5uaWwpXG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgaWYgKHNjaGVtYVR5cGUubGVuZ3RoIHx8IGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgZ2VuLmVsc2VJZih0aGlzLmludmFsaWQkZGF0YSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGFFcnJvcigpO1xuICAgICAgICAgICAgaWYgKHZhbGlkICE9PSBjb2RlZ2VuXzEubmlsKVxuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBnZW4uZWxzZSgpO1xuICAgIH1cbiAgICBpbnZhbGlkJGRhdGEoKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFDb2RlLCBzY2hlbWFUeXBlLCBkZWYsIGl0IH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5vcikod3JvbmckRGF0YVR5cGUoKSwgaW52YWxpZCREYXRhU2NoZW1hKCkpO1xuICAgICAgICBmdW5jdGlvbiB3cm9uZyREYXRhVHlwZSgpIHtcbiAgICAgICAgICAgIGlmIChzY2hlbWFUeXBlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgICAgIGlmICghKHNjaGVtYUNvZGUgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hVHlwZSkgPyBzY2hlbWFUeXBlIDogW3NjaGVtYVR5cGVdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBkYXRhVHlwZV8yLmNoZWNrRGF0YVR5cGVzKShzdCwgc2NoZW1hQ29kZSwgaXQub3B0cy5zdHJpY3ROdW1iZXJzLCBkYXRhVHlwZV8yLkRhdGFUeXBlLldyb25nKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW52YWxpZCREYXRhU2NoZW1hKCkge1xuICAgICAgICAgICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlU2NoZW1hUmVmID0gZ2VuLnNjb3BlVmFsdWUoXCJ2YWxpZGF0ZSRkYXRhXCIsIHsgcmVmOiBkZWYudmFsaWRhdGVTY2hlbWEgfSk7IC8vIFRPRE8gdmFsdWUuY29kZSBmb3Igc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAhJHt2YWxpZGF0ZVNjaGVtYVJlZn0oJHtzY2hlbWFDb2RlfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3Vic2NoZW1hKGFwcGwsIHZhbGlkKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9ICgwLCBzdWJzY2hlbWFfMS5nZXRTdWJzY2hlbWEpKHRoaXMuaXQsIGFwcGwpO1xuICAgICAgICAoMCwgc3Vic2NoZW1hXzEuZXh0ZW5kU3Vic2NoZW1hRGF0YSkoc3Vic2NoZW1hLCB0aGlzLml0LCBhcHBsKTtcbiAgICAgICAgKDAsIHN1YnNjaGVtYV8xLmV4dGVuZFN1YnNjaGVtYU1vZGUpKHN1YnNjaGVtYSwgYXBwbCk7XG4gICAgICAgIGNvbnN0IG5leHRDb250ZXh0ID0geyAuLi50aGlzLml0LCAuLi5zdWJzY2hlbWEsIGl0ZW1zOiB1bmRlZmluZWQsIHByb3BzOiB1bmRlZmluZWQgfTtcbiAgICAgICAgc3Vic2NoZW1hQ29kZShuZXh0Q29udGV4dCwgdmFsaWQpO1xuICAgICAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gICAgfVxuICAgIG1lcmdlRXZhbHVhdGVkKHNjaGVtYUN4dCwgdG9OYW1lKSB7XG4gICAgICAgIGNvbnN0IHsgaXQsIGdlbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUgJiYgc2NoZW1hQ3h0LnByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgc2NoZW1hQ3h0LnByb3BzLCBpdC5wcm9wcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQuaXRlbXMgIT09IHRydWUgJiYgc2NoZW1hQ3h0Lml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgc2NoZW1hQ3h0Lml0ZW1zLCBpdC5pdGVtcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtZXJnZVZhbGlkRXZhbHVhdGVkKHNjaGVtYUN4dCwgdmFsaWQpIHtcbiAgICAgICAgY29uc3QgeyBpdCwgZ2VuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiAoaXQucHJvcHMgIT09IHRydWUgfHwgaXQuaXRlbXMgIT09IHRydWUpKSB7XG4gICAgICAgICAgICBnZW4uaWYodmFsaWQsICgpID0+IHRoaXMubWVyZ2VFdmFsdWF0ZWQoc2NoZW1hQ3h0LCBjb2RlZ2VuXzEuTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLktleXdvcmRDeHQgPSBLZXl3b3JkQ3h0O1xuZnVuY3Rpb24ga2V5d29yZENvZGUoaXQsIGtleXdvcmQsIGRlZiwgcnVsZVR5cGUpIHtcbiAgICBjb25zdCBjeHQgPSBuZXcgS2V5d29yZEN4dChpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICBpZiAoXCJjb2RlXCIgaW4gZGVmKSB7XG4gICAgICAgIGRlZi5jb2RlKGN4dCwgcnVsZVR5cGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjeHQuJGRhdGEgJiYgZGVmLnZhbGlkYXRlKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEuZnVuY0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKFwibWFjcm9cIiBpbiBkZWYpIHtcbiAgICAgICAgKDAsIGtleXdvcmRfMS5tYWNyb0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRlZi5jb21waWxlIHx8IGRlZi52YWxpZGF0ZSkge1xuICAgICAgICAoMCwga2V5d29yZF8xLmZ1bmNLZXl3b3JkQ29kZSkoY3h0LCBkZWYpO1xuICAgIH1cbn1cbmNvbnN0IEpTT05fUE9JTlRFUiA9IC9eXFwvKD86W15+XXx+MHx+MSkqJC87XG5jb25zdCBSRUxBVElWRV9KU09OX1BPSU5URVIgPSAvXihbMC05XSspKCN8XFwvKD86W15+XXx+MHx+MSkqKT8kLztcbmZ1bmN0aW9uIGdldERhdGEoJGRhdGEsIHsgZGF0YUxldmVsLCBkYXRhTmFtZXMsIGRhdGFQYXRoQXJyIH0pIHtcbiAgICBsZXQganNvblBvaW50ZXI7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKCRkYXRhID09PSBcIlwiKVxuICAgICAgICByZXR1cm4gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIGlmICgkZGF0YVswXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgaWYgKCFKU09OX1BPSU5URVIudGVzdCgkZGF0YSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSlNPTi1wb2ludGVyOiAkeyRkYXRhfWApO1xuICAgICAgICBqc29uUG9pbnRlciA9ICRkYXRhO1xuICAgICAgICBkYXRhID0gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFJFTEFUSVZFX0pTT05fUE9JTlRFUi5leGVjKCRkYXRhKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEpTT04tcG9pbnRlcjogJHskZGF0YX1gKTtcbiAgICAgICAgY29uc3QgdXAgPSArbWF0Y2hlc1sxXTtcbiAgICAgICAganNvblBvaW50ZXIgPSBtYXRjaGVzWzJdO1xuICAgICAgICBpZiAoanNvblBvaW50ZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAodXAgPj0gZGF0YUxldmVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcInByb3BlcnR5L2luZGV4XCIsIHVwKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVBhdGhBcnJbZGF0YUxldmVsIC0gdXBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cCA+IGRhdGFMZXZlbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcImRhdGFcIiwgdXApKTtcbiAgICAgICAgZGF0YSA9IGRhdGFOYW1lc1tkYXRhTGV2ZWwgLSB1cF07XG4gICAgICAgIGlmICghanNvblBvaW50ZXIpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgbGV0IGV4cHIgPSBkYXRhO1xuICAgIGNvbnN0IHNlZ21lbnRzID0ganNvblBvaW50ZXIuc3BsaXQoXCIvXCIpO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICAgICAgZGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKCgwLCB1dGlsXzEudW5lc2NhcGVKc29uUG9pbnRlcikoc2VnbWVudCkpfWA7XG4gICAgICAgICAgICBleHByID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtleHByfSAmJiAke2RhdGF9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhwcjtcbiAgICBmdW5jdGlvbiBlcnJvck1zZyhwb2ludGVyVHlwZSwgdXApIHtcbiAgICAgICAgcmV0dXJuIGBDYW5ub3QgYWNjZXNzICR7cG9pbnRlclR5cGV9ICR7dXB9IGxldmVscyB1cCwgY3VycmVudCBsZXZlbCBpcyAke2RhdGFMZXZlbH1gO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVLZXl3b3JkVXNhZ2UgPSBleHBvcnRzLnZhbGlkU2NoZW1hVHlwZSA9IGV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZXhwb3J0cy5tYWNyb0tleXdvcmRDb2RlID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uLy4uL3ZvY2FidWxhcmllcy9jb2RlXCIpO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuZnVuY3Rpb24gbWFjcm9LZXl3b3JkQ29kZShjeHQsIGRlZikge1xuICAgIGNvbnN0IHsgZ2VuLCBrZXl3b3JkLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCBtYWNyb1NjaGVtYSA9IGRlZi5tYWNyby5jYWxsKGl0LnNlbGYsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCk7XG4gICAgY29uc3Qgc2NoZW1hUmVmID0gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIG1hY3JvU2NoZW1hKTtcbiAgICBpZiAoaXQub3B0cy52YWxpZGF0ZVNjaGVtYSAhPT0gZmFsc2UpXG4gICAgICAgIGl0LnNlbGYudmFsaWRhdGVTY2hlbWEobWFjcm9TY2hlbWEsIHRydWUpO1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgc2NoZW1hOiBtYWNyb1NjaGVtYSxcbiAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgIHRvcFNjaGVtYVJlZjogc2NoZW1hUmVmLFxuICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgIH0sIHZhbGlkKTtcbiAgICBjeHQucGFzcyh2YWxpZCwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbn1cbmV4cG9ydHMubWFjcm9LZXl3b3JkQ29kZSA9IG1hY3JvS2V5d29yZENvZGU7XG5mdW5jdGlvbiBmdW5jS2V5d29yZENvZGUoY3h0LCBkZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCAkZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBjaGVja0FzeW5jS2V5d29yZChpdCwgZGVmKTtcbiAgICBjb25zdCB2YWxpZGF0ZSA9ICEkZGF0YSAmJiBkZWYuY29tcGlsZSA/IGRlZi5jb21waWxlLmNhbGwoaXQuc2VsZiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0KSA6IGRlZi52YWxpZGF0ZTtcbiAgICBjb25zdCB2YWxpZGF0ZVJlZiA9IHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCB2YWxpZGF0ZSk7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIHZhbGlkYXRlS2V5d29yZCk7XG4gICAgY3h0Lm9rKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpO1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlS2V5d29yZCgpIHtcbiAgICAgICAgaWYgKGRlZi5lcnJvcnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc3NpZ25WYWxpZCgpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBydWxlRXJycyA9IGRlZi5hc3luYyA/IHZhbGlkYXRlQXN5bmMoKSA6IHZhbGlkYXRlU3luYygpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBhZGRFcnJzKGN4dCwgcnVsZUVycnMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFzeW5jKCkge1xuICAgICAgICBjb25zdCBydWxlRXJycyA9IGdlbi5sZXQoXCJydWxlRXJyc1wiLCBudWxsKTtcbiAgICAgICAgZ2VuLnRyeSgoKSA9PiBhc3NpZ25WYWxpZCgoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgKSwgKGUpID0+IGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5pZigoMCwgY29kZWdlbl8xLl8pIGAke2V9IGluc3RhbmNlb2YgJHtpdC5WYWxpZGF0aW9uRXJyb3J9YCwgKCkgPT4gZ2VuLmFzc2lnbihydWxlRXJycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtlfS5lcnJvcnNgKSwgKCkgPT4gZ2VuLnRocm93KGUpKSk7XG4gICAgICAgIHJldHVybiBydWxlRXJycztcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTeW5jKCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycnMgPSAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlUmVmfS5lcnJvcnNgO1xuICAgICAgICBnZW4uYXNzaWduKHZhbGlkYXRlRXJycywgbnVsbCk7XG4gICAgICAgIGFzc2lnblZhbGlkKGNvZGVnZW5fMS5uaWwpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVFcnJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhc3NpZ25WYWxpZChfYXdhaXQgPSBkZWYuYXN5bmMgPyAoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgIDogY29kZWdlbl8xLm5pbCkge1xuICAgICAgICBjb25zdCBwYXNzQ3h0ID0gaXQub3B0cy5wYXNzQ29udGV4dCA/IG5hbWVzXzEuZGVmYXVsdC50aGlzIDogbmFtZXNfMS5kZWZhdWx0LnNlbGY7XG4gICAgICAgIGNvbnN0IHBhc3NTY2hlbWEgPSAhKChcImNvbXBpbGVcIiBpbiBkZWYgJiYgISRkYXRhKSB8fCBkZWYuc2NoZW1hID09PSBmYWxzZSk7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7X2F3YWl0fSR7KDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHZhbGlkYXRlUmVmLCBwYXNzQ3h0LCBwYXNzU2NoZW1hKX1gLCBkZWYubW9kaWZ5aW5nKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwb3J0RXJycyhlcnJvcnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpLCBlcnJvcnMpO1xuICAgIH1cbn1cbmV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZnVuY0tleXdvcmRDb2RlO1xuZnVuY3Rpb24gbW9kaWZ5RGF0YShjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBnZW4uaWYoaXQucGFyZW50RGF0YSwgKCkgPT4gZ2VuLmFzc2lnbihkYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnBhcmVudERhdGF9WyR7aXQucGFyZW50RGF0YVByb3BlcnR5fV1gKSk7XG59XG5mdW5jdGlvbiBhZGRFcnJzKGN4dCwgZXJycykge1xuICAgIGNvbnN0IHsgZ2VuIH0gPSBjeHQ7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYEFycmF5LmlzQXJyYXkoJHtlcnJzfSlgLCAoKSA9PiB7XG4gICAgICAgIGdlblxuICAgICAgICAgICAgLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGwgPyAke2VycnN9IDogJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30uY29uY2F0KCR7ZXJyc30pYClcbiAgICAgICAgICAgIC5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ubGVuZ3RoYCk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5leHRlbmRFcnJvcnMpKGN4dCk7XG4gICAgfSwgKCkgPT4gY3h0LmVycm9yKCkpO1xufVxuZnVuY3Rpb24gY2hlY2tBc3luY0tleXdvcmQoeyBzY2hlbWFFbnYgfSwgZGVmKSB7XG4gICAgaWYgKGRlZi5hc3luYyAmJiAhc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMga2V5d29yZCBpbiBzeW5jIHNjaGVtYVwiKTtcbn1cbmZ1bmN0aW9uIHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCByZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihga2V5d29yZCBcIiR7a2V5d29yZH1cIiBmYWlsZWQgdG8gY29tcGlsZWApO1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImtleXdvcmRcIiwgdHlwZW9mIHJlc3VsdCA9PSBcImZ1bmN0aW9uXCIgPyB7IHJlZjogcmVzdWx0IH0gOiB7IHJlZjogcmVzdWx0LCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkocmVzdWx0KSB9KTtcbn1cbmZ1bmN0aW9uIHZhbGlkU2NoZW1hVHlwZShzY2hlbWEsIHNjaGVtYVR5cGUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAvLyBUT0RPIGFkZCB0ZXN0c1xuICAgIHJldHVybiAoIXNjaGVtYVR5cGUubGVuZ3RoIHx8XG4gICAgICAgIHNjaGVtYVR5cGUuc29tZSgoc3QpID0+IHN0ID09PSBcImFycmF5XCJcbiAgICAgICAgICAgID8gQXJyYXkuaXNBcnJheShzY2hlbWEpXG4gICAgICAgICAgICA6IHN0ID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgPyBzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSlcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBzY2hlbWEgPT0gc3QgfHwgKGFsbG93VW5kZWZpbmVkICYmIHR5cGVvZiBzY2hlbWEgPT0gXCJ1bmRlZmluZWRcIikpKTtcbn1cbmV4cG9ydHMudmFsaWRTY2hlbWFUeXBlID0gdmFsaWRTY2hlbWFUeXBlO1xuZnVuY3Rpb24gdmFsaWRhdGVLZXl3b3JkVXNhZ2UoeyBzY2hlbWEsIG9wdHMsIHNlbGYsIGVyclNjaGVtYVBhdGggfSwgZGVmLCBrZXl3b3JkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmLmtleXdvcmQpID8gIWRlZi5rZXl3b3JkLmluY2x1ZGVzKGtleXdvcmQpIDogZGVmLmtleXdvcmQgIT09IGtleXdvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIH1cbiAgICBjb25zdCBkZXBzID0gZGVmLmRlcGVuZGVuY2llcztcbiAgICBpZiAoZGVwcyA9PT0gbnVsbCB8fCBkZXBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZXBzLnNvbWUoKGt3ZCkgPT4gIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzY2hlbWEsIGt3ZCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyZW50IHNjaGVtYSBtdXN0IGhhdmUgZGVwZW5kZW5jaWVzIG9mICR7a2V5d29yZH06ICR7ZGVwcy5qb2luKFwiLFwiKX1gKTtcbiAgICB9XG4gICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGRlZi52YWxpZGF0ZVNjaGVtYShzY2hlbWFba2V5d29yZF0pO1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBga2V5d29yZCBcIiR7a2V5d29yZH1cIiB2YWx1ZSBpcyBpbnZhbGlkIGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCI6IGAgK1xuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JzVGV4dChkZWYudmFsaWRhdGVTY2hlbWEuZXJyb3JzKTtcbiAgICAgICAgICAgIGlmIChvcHRzLnZhbGlkYXRlU2NoZW1hID09PSBcImxvZ1wiKVxuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmVycm9yKG1zZyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlS2V5d29yZFVzYWdlID0gdmFsaWRhdGVLZXl3b3JkVXNhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXl3b3JkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFEYXRhID0gZXhwb3J0cy5nZXRTdWJzY2hlbWEgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuZnVuY3Rpb24gZ2V0U3Vic2NoZW1hKGl0LCB7IGtleXdvcmQsIHNjaGVtYVByb3AsIHNjaGVtYSwgc2NoZW1hUGF0aCwgZXJyU2NoZW1hUGF0aCwgdG9wU2NoZW1hUmVmIH0pIHtcbiAgICBpZiAoa2V5d29yZCAhPT0gdW5kZWZpbmVkICYmIHNjaGVtYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYm90aCBcImtleXdvcmRcIiBhbmQgXCJzY2hlbWFcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgaWYgKGtleXdvcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzY2ggPSBpdC5zY2hlbWFba2V5d29yZF07XG4gICAgICAgIHJldHVybiBzY2hlbWFQcm9wID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuc2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaFtzY2hlbWFQcm9wXSxcbiAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnNjaGVtYVBhdGh9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShrZXl3b3JkKX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfS8keygwLCB1dGlsXzEuZXNjYXBlRnJhZ21lbnQpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoc2NoZW1hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNjaGVtYVBhdGggPT09IHVuZGVmaW5lZCB8fCBlcnJTY2hlbWFQYXRoID09PSB1bmRlZmluZWQgfHwgdG9wU2NoZW1hUmVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJzY2hlbWFQYXRoXCIsIFwiZXJyU2NoZW1hUGF0aFwiIGFuZCBcInRvcFNjaGVtYVJlZlwiIGFyZSByZXF1aXJlZCB3aXRoIFwic2NoZW1hXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgc2NoZW1hUGF0aCxcbiAgICAgICAgICAgIHRvcFNjaGVtYVJlZixcbiAgICAgICAgICAgIGVyclNjaGVtYVBhdGgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignZWl0aGVyIFwia2V5d29yZFwiIG9yIFwic2NoZW1hXCIgbXVzdCBiZSBwYXNzZWQnKTtcbn1cbmV4cG9ydHMuZ2V0U3Vic2NoZW1hID0gZ2V0U3Vic2NoZW1hO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hRGF0YShzdWJzY2hlbWEsIGl0LCB7IGRhdGFQcm9wLCBkYXRhUHJvcFR5cGU6IGRwVHlwZSwgZGF0YSwgZGF0YVR5cGVzLCBwcm9wZXJ0eU5hbWUgfSkge1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YVByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JvdGggXCJkYXRhXCIgYW5kIFwiZGF0YVByb3BcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgeyBnZW4gfSA9IGl0O1xuICAgIGlmIChkYXRhUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHsgZXJyb3JQYXRoLCBkYXRhUGF0aEFyciwgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZ2VuLmxldChcImRhdGFcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5kYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoZGF0YVByb3ApfWAsIHRydWUpO1xuICAgICAgICBkYXRhQ29udGV4dFByb3BzKG5leHREYXRhKTtcbiAgICAgICAgc3Vic2NoZW1hLmVycm9yUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJvclBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoZGF0YVByb3AsIGRwVHlwZSwgb3B0cy5qc1Byb3BlcnR5U3ludGF4KX1gO1xuICAgICAgICBzdWJzY2hlbWEucGFyZW50RGF0YVByb3BlcnR5ID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhUHJvcH1gO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YVBhdGhBcnIgPSBbLi4uZGF0YVBhdGhBcnIsIHN1YnNjaGVtYS5wYXJlbnREYXRhUHJvcGVydHldO1xuICAgIH1cbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZGF0YSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gZGF0YSA6IGdlbi5sZXQoXCJkYXRhXCIsIGRhdGEsIHRydWUpOyAvLyByZXBsYWNlYWJsZSBpZiB1c2VkIG9uY2U/XG4gICAgICAgIGRhdGFDb250ZXh0UHJvcHMobmV4dERhdGEpO1xuICAgICAgICBpZiAocHJvcGVydHlOYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdWJzY2hlbWEucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAvLyBUT0RPIHNvbWV0aGluZyBpcyBwb3NzaWJseSB3cm9uZyBoZXJlIHdpdGggbm90IGNoYW5naW5nIHBhcmVudERhdGFQcm9wZXJ0eSBhbmQgbm90IGFwcGVuZGluZyBkYXRhUGF0aEFyclxuICAgIH1cbiAgICBpZiAoZGF0YVR5cGVzKVxuICAgICAgICBzdWJzY2hlbWEuZGF0YVR5cGVzID0gZGF0YVR5cGVzO1xuICAgIGZ1bmN0aW9uIGRhdGFDb250ZXh0UHJvcHMoX25leHREYXRhKSB7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhID0gX25leHREYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YUxldmVsID0gaXQuZGF0YUxldmVsICsgMTtcbiAgICAgICAgc3Vic2NoZW1hLmRhdGFUeXBlcyA9IFtdO1xuICAgICAgICBpdC5kZWZpbmVkUHJvcGVydGllcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgc3Vic2NoZW1hLnBhcmVudERhdGEgPSBpdC5kYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YU5hbWVzID0gWy4uLml0LmRhdGFOYW1lcywgX25leHREYXRhXTtcbiAgICB9XG59XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYURhdGEgPSBleHRlbmRTdWJzY2hlbWFEYXRhO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hTW9kZShzdWJzY2hlbWEsIHsganRkRGlzY3JpbWluYXRvciwganRkTWV0YWRhdGEsIGNvbXBvc2l0ZVJ1bGUsIGNyZWF0ZUVycm9ycywgYWxsRXJyb3JzIH0pIHtcbiAgICBpZiAoY29tcG9zaXRlUnVsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY29tcG9zaXRlUnVsZSA9IGNvbXBvc2l0ZVJ1bGU7XG4gICAgaWYgKGNyZWF0ZUVycm9ycyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY3JlYXRlRXJyb3JzID0gY3JlYXRlRXJyb3JzO1xuICAgIGlmIChhbGxFcnJvcnMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgc3Vic2NoZW1hLmFsbEVycm9ycyA9IGFsbEVycm9ycztcbiAgICBzdWJzY2hlbWEuanRkRGlzY3JpbWluYXRvciA9IGp0ZERpc2NyaW1pbmF0b3I7IC8vIG5vdCBpbmhlcml0ZWRcbiAgICBzdWJzY2hlbWEuanRkTWV0YWRhdGEgPSBqdGRNZXRhZGF0YTsgLy8gbm90IGluaGVyaXRlZFxufVxuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXh0ZW5kU3Vic2NoZW1hTW9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjaGVtYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IHZvaWQgMDtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIktleXdvcmRDeHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlXzEuS2V5d29yZEN4dDsgfSB9KTtcbnZhciBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cmluZ2lmeTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5OYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29kZUdlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLkNvZGVHZW47IH0gfSk7XG5jb25zdCB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5jb25zdCByZWZfZXJyb3JfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcmVmX2Vycm9yXCIpO1xuY29uc3QgcnVsZXNfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcnVsZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlXCIpO1xuY29uc3QgY29kZWdlbl8yID0gcmVxdWlyZShcIi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZXNvbHZlXCIpO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCAkZGF0YVJlZlNjaGVtYSA9IHJlcXVpcmUoXCIuL3JlZnMvZGF0YS5qc29uXCIpO1xuY29uc3QgdXJpXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3VyaVwiKTtcbmNvbnN0IGRlZmF1bHRSZWdFeHAgPSAoc3RyLCBmbGFncykgPT4gbmV3IFJlZ0V4cChzdHIsIGZsYWdzKTtcbmRlZmF1bHRSZWdFeHAuY29kZSA9IFwibmV3IFJlZ0V4cFwiO1xuY29uc3QgTUVUQV9JR05PUkVfT1BUSU9OUyA9IFtcInJlbW92ZUFkZGl0aW9uYWxcIiwgXCJ1c2VEZWZhdWx0c1wiLCBcImNvZXJjZVR5cGVzXCJdO1xuY29uc3QgRVhUX1NDT1BFX05BTUVTID0gbmV3IFNldChbXG4gICAgXCJ2YWxpZGF0ZVwiLFxuICAgIFwic2VyaWFsaXplXCIsXG4gICAgXCJwYXJzZVwiLFxuICAgIFwid3JhcHBlclwiLFxuICAgIFwicm9vdFwiLFxuICAgIFwic2NoZW1hXCIsXG4gICAgXCJrZXl3b3JkXCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJmb3JtYXRzXCIsXG4gICAgXCJ2YWxpZGF0ZSRkYXRhXCIsXG4gICAgXCJmdW5jXCIsXG4gICAgXCJvYmpcIixcbiAgICBcIkVycm9yXCIsXG5dKTtcbmNvbnN0IHJlbW92ZWRPcHRpb25zID0ge1xuICAgIGVycm9yRGF0YVBhdGg6IFwiXCIsXG4gICAgZm9ybWF0OiBcImB2YWxpZGF0ZUZvcm1hdHM6IGZhbHNlYCBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG51bGxhYmxlOiAnXCJudWxsYWJsZVwiIGtleXdvcmQgaXMgc3VwcG9ydGVkIGJ5IGRlZmF1bHQuJyxcbiAgICBqc29uUG9pbnRlcnM6IFwiRGVwcmVjYXRlZCBqc1Byb3BlcnR5U3ludGF4IGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgZXh0ZW5kUmVmczogXCJEZXByZWNhdGVkIGlnbm9yZUtleXdvcmRzV2l0aFJlZiBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG1pc3NpbmdSZWZzOiBcIlBhc3MgZW1wdHkgc2NoZW1hIHdpdGggJGlkIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQgdG8gYWp2LmFkZFNjaGVtYS5cIixcbiAgICBwcm9jZXNzQ29kZTogXCJVc2Ugb3B0aW9uIGBjb2RlOiB7cHJvY2VzczogKGNvZGUsIHNjaGVtYUVudjogb2JqZWN0KSA9PiBzdHJpbmd9YFwiLFxuICAgIHNvdXJjZUNvZGU6IFwiVXNlIG9wdGlvbiBgY29kZToge3NvdXJjZTogdHJ1ZX1gXCIsXG4gICAgc3RyaWN0RGVmYXVsdHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgc3RyaWN0S2V5d29yZHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgdW5pcXVlSXRlbXM6ICdcInVuaXF1ZUl0ZW1zXCIga2V5d29yZCBpcyBhbHdheXMgdmFsaWRhdGVkLicsXG4gICAgdW5rbm93bkZvcm1hdHM6IFwiRGlzYWJsZSBzdHJpY3QgbW9kZSBvciBwYXNzIGB0cnVlYCB0byBgYWp2LmFkZEZvcm1hdGAgKG9yIGBmb3JtYXRzYCBvcHRpb24pLlwiLFxuICAgIGNhY2hlOiBcIk1hcCBpcyB1c2VkIGFzIGNhY2hlLCBzY2hlbWEgb2JqZWN0IGFzIGtleS5cIixcbiAgICBzZXJpYWxpemU6IFwiTWFwIGlzIHVzZWQgYXMgY2FjaGUsIHNjaGVtYSBvYmplY3QgYXMga2V5LlwiLFxuICAgIGFqdkVycm9yczogXCJJdCBpcyBkZWZhdWx0IG5vdy5cIixcbn07XG5jb25zdCBkZXByZWNhdGVkT3B0aW9ucyA9IHtcbiAgICBpZ25vcmVLZXl3b3Jkc1dpdGhSZWY6IFwiXCIsXG4gICAganNQcm9wZXJ0eVN5bnRheDogXCJcIixcbiAgICB1bmljb2RlOiAnXCJtaW5MZW5ndGhcIi9cIm1heExlbmd0aFwiIGFjY291bnQgZm9yIHVuaWNvZGUgY2hhcmFjdGVycyBieSBkZWZhdWx0LicsXG59O1xuY29uc3QgTUFYX0VYUFJFU1NJT04gPSAyMDA7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gcmVxdWlyZWRPcHRpb25zKG8pIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3UsIF92LCBfdywgX3gsIF95LCBfeiwgXzA7XG4gICAgY29uc3QgcyA9IG8uc3RyaWN0O1xuICAgIGNvbnN0IF9vcHR6ID0gKF9hID0gby5jb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemU7XG4gICAgY29uc3Qgb3B0aW1pemUgPSBfb3B0eiA9PT0gdHJ1ZSB8fCBfb3B0eiA9PT0gdW5kZWZpbmVkID8gMSA6IF9vcHR6IHx8IDA7XG4gICAgY29uc3QgcmVnRXhwID0gKF9jID0gKF9iID0gby5jb2RlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVnRXhwKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkZWZhdWx0UmVnRXhwO1xuICAgIGNvbnN0IHVyaVJlc29sdmVyID0gKF9kID0gby51cmlSZXNvbHZlcikgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogdXJpXzEuZGVmYXVsdDtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdHJpY3RTY2hlbWE6IChfZiA9IChfZSA9IG8uc3RyaWN0U2NoZW1hKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiBzKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiB0cnVlLFxuICAgICAgICBzdHJpY3ROdW1iZXJzOiAoX2ggPSAoX2cgPSBvLnN0cmljdE51bWJlcnMpICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IHMpICE9PSBudWxsICYmIF9oICE9PSB2b2lkIDAgPyBfaCA6IHRydWUsXG4gICAgICAgIHN0cmljdFR5cGVzOiAoX2sgPSAoX2ogPSBvLnN0cmljdFR5cGVzKSAhPT0gbnVsbCAmJiBfaiAhPT0gdm9pZCAwID8gX2ogOiBzKSAhPT0gbnVsbCAmJiBfayAhPT0gdm9pZCAwID8gX2sgOiBcImxvZ1wiLFxuICAgICAgICBzdHJpY3RUdXBsZXM6IChfbSA9IChfbCA9IG8uc3RyaWN0VHVwbGVzKSAhPT0gbnVsbCAmJiBfbCAhPT0gdm9pZCAwID8gX2wgOiBzKSAhPT0gbnVsbCAmJiBfbSAhPT0gdm9pZCAwID8gX20gOiBcImxvZ1wiLFxuICAgICAgICBzdHJpY3RSZXF1aXJlZDogKF9wID0gKF9vID0gby5zdHJpY3RSZXF1aXJlZCkgIT09IG51bGwgJiYgX28gIT09IHZvaWQgMCA/IF9vIDogcykgIT09IG51bGwgJiYgX3AgIT09IHZvaWQgMCA/IF9wIDogZmFsc2UsXG4gICAgICAgIGNvZGU6IG8uY29kZSA/IHsgLi4uby5jb2RlLCBvcHRpbWl6ZSwgcmVnRXhwIH0gOiB7IG9wdGltaXplLCByZWdFeHAgfSxcbiAgICAgICAgbG9vcFJlcXVpcmVkOiAoX3EgPSBvLmxvb3BSZXF1aXJlZCkgIT09IG51bGwgJiYgX3EgIT09IHZvaWQgMCA/IF9xIDogTUFYX0VYUFJFU1NJT04sXG4gICAgICAgIGxvb3BFbnVtOiAoX3IgPSBvLmxvb3BFbnVtKSAhPT0gbnVsbCAmJiBfciAhPT0gdm9pZCAwID8gX3IgOiBNQVhfRVhQUkVTU0lPTixcbiAgICAgICAgbWV0YTogKF9zID0gby5tZXRhKSAhPT0gbnVsbCAmJiBfcyAhPT0gdm9pZCAwID8gX3MgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlczogKF90ID0gby5tZXNzYWdlcykgIT09IG51bGwgJiYgX3QgIT09IHZvaWQgMCA/IF90IDogdHJ1ZSxcbiAgICAgICAgaW5saW5lUmVmczogKF91ID0gby5pbmxpbmVSZWZzKSAhPT0gbnVsbCAmJiBfdSAhPT0gdm9pZCAwID8gX3UgOiB0cnVlLFxuICAgICAgICBzY2hlbWFJZDogKF92ID0gby5zY2hlbWFJZCkgIT09IG51bGwgJiYgX3YgIT09IHZvaWQgMCA/IF92IDogXCIkaWRcIixcbiAgICAgICAgYWRkVXNlZFNjaGVtYTogKF93ID0gby5hZGRVc2VkU2NoZW1hKSAhPT0gbnVsbCAmJiBfdyAhPT0gdm9pZCAwID8gX3cgOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZVNjaGVtYTogKF94ID0gby52YWxpZGF0ZVNjaGVtYSkgIT09IG51bGwgJiYgX3ggIT09IHZvaWQgMCA/IF94IDogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGVGb3JtYXRzOiAoX3kgPSBvLnZhbGlkYXRlRm9ybWF0cykgIT09IG51bGwgJiYgX3kgIT09IHZvaWQgMCA/IF95IDogdHJ1ZSxcbiAgICAgICAgdW5pY29kZVJlZ0V4cDogKF96ID0gby51bmljb2RlUmVnRXhwKSAhPT0gbnVsbCAmJiBfeiAhPT0gdm9pZCAwID8gX3ogOiB0cnVlLFxuICAgICAgICBpbnQzMnJhbmdlOiAoXzAgPSBvLmludDMycmFuZ2UpICE9PSBudWxsICYmIF8wICE9PSB2b2lkIDAgPyBfMCA6IHRydWUsXG4gICAgICAgIHVyaVJlc29sdmVyOiB1cmlSZXNvbHZlcixcbiAgICB9O1xufVxuY2xhc3MgQWp2IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbiAgICAgICAgdGhpcy5zY2hlbWFzID0ge307XG4gICAgICAgIHRoaXMucmVmcyA9IHt9O1xuICAgICAgICB0aGlzLmZvcm1hdHMgPSB7fTtcbiAgICAgICAgdGhpcy5fY29tcGlsYXRpb25zID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0ge307XG4gICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICBvcHRzID0gdGhpcy5vcHRzID0geyAuLi5vcHRzLCAuLi5yZXF1aXJlZE9wdGlvbnMob3B0cykgfTtcbiAgICAgICAgY29uc3QgeyBlczUsIGxpbmVzIH0gPSB0aGlzLm9wdHMuY29kZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IG5ldyBjb2RlZ2VuXzIuVmFsdWVTY29wZSh7IHNjb3BlOiB7fSwgcHJlZml4ZXM6IEVYVF9TQ09QRV9OQU1FUywgZXM1LCBsaW5lcyB9KTtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIob3B0cy5sb2dnZXIpO1xuICAgICAgICBjb25zdCBmb3JtYXRPcHQgPSBvcHRzLnZhbGlkYXRlRm9ybWF0cztcbiAgICAgICAgb3B0cy52YWxpZGF0ZUZvcm1hdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5SVUxFUyA9ICgwLCBydWxlc18xLmdldFJ1bGVzKSgpO1xuICAgICAgICBjaGVja09wdGlvbnMuY2FsbCh0aGlzLCByZW1vdmVkT3B0aW9ucywgb3B0cywgXCJOT1QgU1VQUE9SVEVEXCIpO1xuICAgICAgICBjaGVja09wdGlvbnMuY2FsbCh0aGlzLCBkZXByZWNhdGVkT3B0aW9ucywgb3B0cywgXCJERVBSRUNBVEVEXCIsIFwid2FyblwiKTtcbiAgICAgICAgdGhpcy5fbWV0YU9wdHMgPSBnZXRNZXRhU2NoZW1hT3B0aW9ucy5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAob3B0cy5mb3JtYXRzKVxuICAgICAgICAgICAgYWRkSW5pdGlhbEZvcm1hdHMuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkVm9jYWJ1bGFyaWVzKCk7XG4gICAgICAgIHRoaXMuX2FkZERlZmF1bHRNZXRhU2NoZW1hKCk7XG4gICAgICAgIGlmIChvcHRzLmtleXdvcmRzKVxuICAgICAgICAgICAgYWRkSW5pdGlhbEtleXdvcmRzLmNhbGwodGhpcywgb3B0cy5rZXl3b3Jkcyk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5tZXRhID09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB0aGlzLmFkZE1ldGFTY2hlbWEob3B0cy5tZXRhKTtcbiAgICAgICAgYWRkSW5pdGlhbFNjaGVtYXMuY2FsbCh0aGlzKTtcbiAgICAgICAgb3B0cy52YWxpZGF0ZUZvcm1hdHMgPSBmb3JtYXRPcHQ7XG4gICAgfVxuICAgIF9hZGRWb2NhYnVsYXJpZXMoKSB7XG4gICAgICAgIHRoaXMuYWRkS2V5d29yZChcIiRhc3luY1wiKTtcbiAgICB9XG4gICAgX2FkZERlZmF1bHRNZXRhU2NoZW1hKCkge1xuICAgICAgICBjb25zdCB7ICRkYXRhLCBtZXRhLCBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBsZXQgX2RhdGFSZWZTY2hlbWEgPSAkZGF0YVJlZlNjaGVtYTtcbiAgICAgICAgaWYgKHNjaGVtYUlkID09PSBcImlkXCIpIHtcbiAgICAgICAgICAgIF9kYXRhUmVmU2NoZW1hID0geyAuLi4kZGF0YVJlZlNjaGVtYSB9O1xuICAgICAgICAgICAgX2RhdGFSZWZTY2hlbWEuaWQgPSBfZGF0YVJlZlNjaGVtYS4kaWQ7XG4gICAgICAgICAgICBkZWxldGUgX2RhdGFSZWZTY2hlbWEuJGlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRhICYmICRkYXRhKVxuICAgICAgICAgICAgdGhpcy5hZGRNZXRhU2NoZW1hKF9kYXRhUmVmU2NoZW1hLCBfZGF0YVJlZlNjaGVtYVtzY2hlbWFJZF0sIGZhbHNlKTtcbiAgICB9XG4gICAgZGVmYXVsdE1ldGEoKSB7XG4gICAgICAgIGNvbnN0IHsgbWV0YSwgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdHMuZGVmYXVsdE1ldGEgPSB0eXBlb2YgbWV0YSA9PSBcIm9iamVjdFwiID8gbWV0YVtzY2hlbWFJZF0gfHwgbWV0YSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHZhbGlkYXRlKHNjaGVtYUtleVJlZiwgLy8ga2V5LCByZWYgb3Igc2NoZW1hIG9iamVjdFxuICAgIGRhdGEgLy8gdG8gYmUgdmFsaWRhdGVkXG4gICAgKSB7XG4gICAgICAgIGxldCB2O1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYUtleVJlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5nZXRTY2hlbWEoc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIGlmICghdilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIHNjaGVtYSB3aXRoIGtleSBvciByZWYgXCIke3NjaGVtYUtleVJlZn1cImApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdiA9IHRoaXMuY29tcGlsZShzY2hlbWFLZXlSZWYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkID0gdihkYXRhKTtcbiAgICAgICAgaWYgKCEoXCIkYXN5bmNcIiBpbiB2KSlcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gdi5lcnJvcnM7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgY29tcGlsZShzY2hlbWEsIF9tZXRhKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IHRoaXMuX2FkZFNjaGVtYShzY2hlbWEsIF9tZXRhKTtcbiAgICAgICAgcmV0dXJuIChzY2gudmFsaWRhdGUgfHwgdGhpcy5fY29tcGlsZVNjaGVtYUVudihzY2gpKTtcbiAgICB9XG4gICAgY29tcGlsZUFzeW5jKHNjaGVtYSwgbWV0YSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5sb2FkU2NoZW1hICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy5sb2FkU2NoZW1hIHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbG9hZFNjaGVtYSB9ID0gdGhpcy5vcHRzO1xuICAgICAgICByZXR1cm4gcnVuQ29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoZW1hLCBtZXRhKTtcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gcnVuQ29tcGlsZUFzeW5jKF9zY2hlbWEsIF9tZXRhKSB7XG4gICAgICAgICAgICBhd2FpdCBsb2FkTWV0YVNjaGVtYS5jYWxsKHRoaXMsIF9zY2hlbWEuJHNjaGVtYSk7XG4gICAgICAgICAgICBjb25zdCBzY2ggPSB0aGlzLl9hZGRTY2hlbWEoX3NjaGVtYSwgX21ldGEpO1xuICAgICAgICAgICAgcmV0dXJuIHNjaC52YWxpZGF0ZSB8fCBfY29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBsb2FkTWV0YVNjaGVtYSgkcmVmKSB7XG4gICAgICAgICAgICBpZiAoJHJlZiAmJiAhdGhpcy5nZXRTY2hlbWEoJHJlZikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBydW5Db21waWxlQXN5bmMuY2FsbCh0aGlzLCB7ICRyZWYgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gX2NvbXBpbGVBc3luYyhzY2gpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVTY2hlbWFFbnYoc2NoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIHJlZl9lcnJvcl8xLmRlZmF1bHQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIGNoZWNrTG9hZGVkLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgbG9hZE1pc3NpbmdTY2hlbWEuY2FsbCh0aGlzLCBlLm1pc3NpbmdTY2hlbWEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29tcGlsZUFzeW5jLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xvYWRlZCh7IG1pc3NpbmdTY2hlbWE6IHJlZiwgbWlzc2luZ1JlZiB9KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWZzW3JlZl0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFueVNjaGVtYSAke3JlZn0gaXMgbG9hZGVkIGJ1dCAke21pc3NpbmdSZWZ9IGNhbm5vdCBiZSByZXNvbHZlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRNaXNzaW5nU2NoZW1hKHJlZikge1xuICAgICAgICAgICAgY29uc3QgX3NjaGVtYSA9IGF3YWl0IF9sb2FkU2NoZW1hLmNhbGwodGhpcywgcmVmKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWZzW3JlZl0pXG4gICAgICAgICAgICAgICAgYXdhaXQgbG9hZE1ldGFTY2hlbWEuY2FsbCh0aGlzLCBfc2NoZW1hLiRzY2hlbWEpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlZnNbcmVmXSlcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjaGVtYShfc2NoZW1hLCByZWYsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIF9sb2FkU2NoZW1hKHJlZikge1xuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuX2xvYWRpbmdbcmVmXTtcbiAgICAgICAgICAgIGlmIChwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKHRoaXMuX2xvYWRpbmdbcmVmXSA9IGxvYWRTY2hlbWEocmVmKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbG9hZGluZ1tyZWZdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFkZHMgc2NoZW1hIHRvIHRoZSBpbnN0YW5jZVxuICAgIGFkZFNjaGVtYShzY2hlbWEsIC8vIElmIGFycmF5IGlzIHBhc3NlZCwgYGtleWAgd2lsbCBiZSBpZ25vcmVkXG4gICAga2V5LCAvLyBPcHRpb25hbCBzY2hlbWEga2V5LiBDYW4gYmUgcGFzc2VkIHRvIGB2YWxpZGF0ZWAgbWV0aG9kIGluc3RlYWQgb2Ygc2NoZW1hIG9iamVjdCBvciBpZC9yZWYuIE9uZSBzY2hlbWEgcGVyIGluc3RhbmNlIGNhbiBoYXZlIGVtcHR5IGBpZGAgYW5kIGBrZXlgLlxuICAgIF9tZXRhLCAvLyB0cnVlIGlmIHNjaGVtYSBpcyBhIG1ldGEtc2NoZW1hLiBVc2VkIGludGVybmFsbHksIGFkZE1ldGFTY2hlbWEgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICBfdmFsaWRhdGVTY2hlbWEgPSB0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgLy8gZmFsc2UgdG8gc2tpcCBzY2hlbWEgdmFsaWRhdGlvbi4gVXNlZCBpbnRlcm5hbGx5LCBvcHRpb24gdmFsaWRhdGVTY2hlbWEgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICApIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY2ggb2Ygc2NoZW1hKVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKHNjaCwgdW5kZWZpbmVkLCBfbWV0YSwgX3ZhbGlkYXRlU2NoZW1hKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpZDtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIGlkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBpZCAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzY2hlbWEgJHtzY2hlbWFJZH0gbXVzdCBiZSBzdHJpbmdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXkgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShrZXkgfHwgaWQpO1xuICAgICAgICB0aGlzLl9jaGVja1VuaXF1ZShrZXkpO1xuICAgICAgICB0aGlzLnNjaGVtYXNba2V5XSA9IHRoaXMuX2FkZFNjaGVtYShzY2hlbWEsIF9tZXRhLCBrZXksIF92YWxpZGF0ZVNjaGVtYSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBBZGQgc2NoZW1hIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIG90aGVyIHNjaGVtYXNcbiAgICAvLyBvcHRpb25zIGluIE1FVEFfSUdOT1JFX09QVElPTlMgYXJlIGFsd2F5IHNldCB0byBmYWxzZVxuICAgIGFkZE1ldGFTY2hlbWEoc2NoZW1hLCBrZXksIC8vIHNjaGVtYSBrZXlcbiAgICBfdmFsaWRhdGVTY2hlbWEgPSB0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgLy8gZmFsc2UgdG8gc2tpcCBzY2hlbWEgdmFsaWRhdGlvbiwgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdmFsaWRhdGVTY2hlbWEgb3B0aW9uIGZvciBtZXRhLXNjaGVtYVxuICAgICkge1xuICAgICAgICB0aGlzLmFkZFNjaGVtYShzY2hlbWEsIGtleSwgdHJ1ZSwgX3ZhbGlkYXRlU2NoZW1hKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vICBWYWxpZGF0ZSBzY2hlbWEgYWdhaW5zdCBpdHMgbWV0YS1zY2hlbWFcbiAgICB2YWxpZGF0ZVNjaGVtYShzY2hlbWEsIHRocm93T3JMb2dFcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBsZXQgJHNjaGVtYTtcbiAgICAgICAgJHNjaGVtYSA9IHNjaGVtYS4kc2NoZW1hO1xuICAgICAgICBpZiAoJHNjaGVtYSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiAkc2NoZW1hICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIiRzY2hlbWEgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICAkc2NoZW1hID0gJHNjaGVtYSB8fCB0aGlzLm9wdHMuZGVmYXVsdE1ldGEgfHwgdGhpcy5kZWZhdWx0TWV0YSgpO1xuICAgICAgICBpZiAoISRzY2hlbWEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJtZXRhLXNjaGVtYSBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLnZhbGlkYXRlKCRzY2hlbWEsIHNjaGVtYSk7XG4gICAgICAgIGlmICghdmFsaWQgJiYgdGhyb3dPckxvZ0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gXCJzY2hlbWEgaXMgaW52YWxpZDogXCIgKyB0aGlzLmVycm9yc1RleHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEgPT09IFwibG9nXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgLy8gR2V0IGNvbXBpbGVkIHNjaGVtYSBieSBga2V5YCBvciBgcmVmYC5cbiAgICAvLyAoYGtleWAgdGhhdCB3YXMgcGFzc2VkIHRvIGBhZGRTY2hlbWFgIG9yIGZ1bGwgc2NoZW1hIHJlZmVyZW5jZSAtIGBzY2hlbWEuJGlkYCBvciByZXNvbHZlZCBpZClcbiAgICBnZXRTY2hlbWEoa2V5UmVmKSB7XG4gICAgICAgIGxldCBzY2g7XG4gICAgICAgIHdoaWxlICh0eXBlb2YgKHNjaCA9IGdldFNjaEVudi5jYWxsKHRoaXMsIGtleVJlZikpID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBrZXlSZWYgPSBzY2g7XG4gICAgICAgIGlmIChzY2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBjb21waWxlXzEuU2NoZW1hRW52KHsgc2NoZW1hOiB7fSwgc2NoZW1hSWQgfSk7XG4gICAgICAgICAgICBzY2ggPSBjb21waWxlXzEucmVzb2x2ZVNjaGVtYS5jYWxsKHRoaXMsIHJvb3QsIGtleVJlZik7XG4gICAgICAgICAgICBpZiAoIXNjaClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlZnNba2V5UmVmXSA9IHNjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHNjaC52YWxpZGF0ZSB8fCB0aGlzLl9jb21waWxlU2NoZW1hRW52KHNjaCkpO1xuICAgIH1cbiAgICAvLyBSZW1vdmUgY2FjaGVkIHNjaGVtYShzKS5cbiAgICAvLyBJZiBubyBwYXJhbWV0ZXIgaXMgcGFzc2VkIGFsbCBzY2hlbWFzIGJ1dCBtZXRhLXNjaGVtYXMgYXJlIHJlbW92ZWQuXG4gICAgLy8gSWYgUmVnRXhwIGlzIHBhc3NlZCBhbGwgc2NoZW1hcyB3aXRoIGtleS9pZCBtYXRjaGluZyBwYXR0ZXJuIGJ1dCBtZXRhLXNjaGVtYXMgYXJlIHJlbW92ZWQuXG4gICAgLy8gRXZlbiBpZiBzY2hlbWEgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBzY2hlbWFzIGl0IHN0aWxsIGNhbiBiZSByZW1vdmVkIGFzIG90aGVyIHNjaGVtYXMgaGF2ZSBsb2NhbCByZWZlcmVuY2VzLlxuICAgIHJlbW92ZVNjaGVtYShzY2hlbWFLZXlSZWYpIHtcbiAgICAgICAgaWYgKHNjaGVtYUtleVJlZiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnNjaGVtYXMsIHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMucmVmcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHNjaGVtYUtleVJlZikge1xuICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5zY2hlbWFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMucmVmcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaCA9IGdldFNjaEVudi5jYWxsKHRoaXMsIHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2ggPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKHNjaC5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNjaGVtYXNbc2NoZW1hS2V5UmVmXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZzW3NjaGVtYUtleVJlZl07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IHNjaGVtYUtleVJlZjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoY2FjaGVLZXkpO1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHNjaGVtYUtleVJlZlt0aGlzLm9wdHMuc2NoZW1hSWRdO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZCA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hc1tpZF07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlZnNbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2LnJlbW92ZVNjaGVtYTogaW52YWxpZCBwYXJhbWV0ZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIFwidm9jYWJ1bGFyeVwiIC0gYSBjb2xsZWN0aW9uIG9mIGtleXdvcmRzXG4gICAgYWRkVm9jYWJ1bGFyeShkZWZpbml0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IGRlZiBvZiBkZWZpbml0aW9ucylcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5d29yZChkZWYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkS2V5d29yZChrd2RPckRlZiwgZGVmIC8vIGRlcHJlY2F0ZWRcbiAgICApIHtcbiAgICAgICAgbGV0IGtleXdvcmQ7XG4gICAgICAgIGlmICh0eXBlb2Yga3dkT3JEZWYgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAga2V5d29yZCA9IGt3ZE9yRGVmO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWYgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJ0aGVzZSBwYXJhbWV0ZXJzIGFyZSBkZXByZWNhdGVkLCBzZWUgZG9jcyBmb3IgYWRkS2V5d29yZFwiKTtcbiAgICAgICAgICAgICAgICBkZWYua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGt3ZE9yRGVmID09IFwib2JqZWN0XCIgJiYgZGVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlZiA9IGt3ZE9yRGVmO1xuICAgICAgICAgICAga2V5d29yZCA9IGRlZi5rZXl3b3JkO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5d29yZCkgJiYgIWtleXdvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWRkS2V5d29yZHM6IGtleXdvcmQgbXVzdCBiZSBzdHJpbmcgb3Igbm9uLWVtcHR5IGFycmF5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBhZGRLZXl3b3JkcyBwYXJhbWV0ZXJzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrS2V5d29yZC5jYWxsKHRoaXMsIGtleXdvcmQsIGRlZik7XG4gICAgICAgIGlmICghZGVmKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShrZXl3b3JkLCAoa3dkKSA9PiBhZGRSdWxlLmNhbGwodGhpcywga3dkKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBrZXl3b3JkTWV0YXNjaGVtYS5jYWxsKHRoaXMsIGRlZik7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSB7XG4gICAgICAgICAgICAuLi5kZWYsXG4gICAgICAgICAgICB0eXBlOiAoMCwgZGF0YVR5cGVfMS5nZXRKU09OVHlwZXMpKGRlZi50eXBlKSxcbiAgICAgICAgICAgIHNjaGVtYVR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmLnNjaGVtYVR5cGUpLFxuICAgICAgICB9O1xuICAgICAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShrZXl3b3JkLCBkZWZpbml0aW9uLnR5cGUubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IChrKSA9PiBhZGRSdWxlLmNhbGwodGhpcywgaywgZGVmaW5pdGlvbilcbiAgICAgICAgICAgIDogKGspID0+IGRlZmluaXRpb24udHlwZS5mb3JFYWNoKCh0KSA9PiBhZGRSdWxlLmNhbGwodGhpcywgaywgZGVmaW5pdGlvbiwgdCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEtleXdvcmQoa2V5d29yZCkge1xuICAgICAgICBjb25zdCBydWxlID0gdGhpcy5SVUxFUy5hbGxba2V5d29yZF07XG4gICAgICAgIHJldHVybiB0eXBlb2YgcnVsZSA9PSBcIm9iamVjdFwiID8gcnVsZS5kZWZpbml0aW9uIDogISFydWxlO1xuICAgIH1cbiAgICAvLyBSZW1vdmUga2V5d29yZFxuICAgIHJlbW92ZUtleXdvcmQoa2V5d29yZCkge1xuICAgICAgICAvLyBUT0RPIHJldHVybiB0eXBlIHNob3VsZCBiZSBBanZcbiAgICAgICAgY29uc3QgeyBSVUxFUyB9ID0gdGhpcztcbiAgICAgICAgZGVsZXRlIFJVTEVTLmtleXdvcmRzW2tleXdvcmRdO1xuICAgICAgICBkZWxldGUgUlVMRVMuYWxsW2tleXdvcmRdO1xuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIFJVTEVTLnJ1bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gZ3JvdXAucnVsZXMuZmluZEluZGV4KChydWxlKSA9PiBydWxlLmtleXdvcmQgPT09IGtleXdvcmQpO1xuICAgICAgICAgICAgaWYgKGkgPj0gMClcbiAgICAgICAgICAgICAgICBncm91cC5ydWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIEFkZCBmb3JtYXRcbiAgICBhZGRGb3JtYXQobmFtZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBmb3JtYXQgPSBuZXcgUmVnRXhwKGZvcm1hdCk7XG4gICAgICAgIHRoaXMuZm9ybWF0c1tuYW1lXSA9IGZvcm1hdDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVycm9yc1RleHQoZXJyb3JzID0gdGhpcy5lcnJvcnMsIC8vIG9wdGlvbmFsIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgeyBzZXBhcmF0b3IgPSBcIiwgXCIsIGRhdGFWYXIgPSBcImRhdGFcIiB9ID0ge30gLy8gb3B0aW9uYWwgb3B0aW9ucyB3aXRoIHByb3BlcnRpZXMgYHNlcGFyYXRvcmAgYW5kIGBkYXRhVmFyYFxuICAgICkge1xuICAgICAgICBpZiAoIWVycm9ycyB8fCBlcnJvcnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFwiTm8gZXJyb3JzXCI7XG4gICAgICAgIHJldHVybiBlcnJvcnNcbiAgICAgICAgICAgIC5tYXAoKGUpID0+IGAke2RhdGFWYXJ9JHtlLmluc3RhbmNlUGF0aH0gJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHRleHQsIG1zZykgPT4gdGV4dCArIHNlcGFyYXRvciArIG1zZyk7XG4gICAgfVxuICAgICRkYXRhTWV0YVNjaGVtYShtZXRhU2NoZW1hLCBrZXl3b3Jkc0pzb25Qb2ludGVycykge1xuICAgICAgICBjb25zdCBydWxlcyA9IHRoaXMuUlVMRVMuYWxsO1xuICAgICAgICBtZXRhU2NoZW1hID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXRhU2NoZW1hKSk7XG4gICAgICAgIGZvciAoY29uc3QganNvblBvaW50ZXIgb2Yga2V5d29yZHNKc29uUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0ganNvblBvaW50ZXIuc3BsaXQoXCIvXCIpLnNsaWNlKDEpOyAvLyBmaXJzdCBzZWdtZW50IGlzIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgbGV0IGtleXdvcmRzID0gbWV0YVNjaGVtYTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnIG9mIHNlZ21lbnRzKVxuICAgICAgICAgICAgICAgIGtleXdvcmRzID0ga2V5d29yZHNbc2VnXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBydWxlICE9IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgJGRhdGEgfSA9IHJ1bGUuZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWEgPSBrZXl3b3Jkc1trZXldO1xuICAgICAgICAgICAgICAgIGlmICgkZGF0YSAmJiBzY2hlbWEpXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmRzW2tleV0gPSBzY2hlbWFPckRhdGEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0YVNjaGVtYTtcbiAgICB9XG4gICAgX3JlbW92ZUFsbFNjaGVtYXMoc2NoZW1hcywgcmVnZXgpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXlSZWYgaW4gc2NoZW1hcykge1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hc1trZXlSZWZdO1xuICAgICAgICAgICAgaWYgKCFyZWdleCB8fCByZWdleC50ZXN0KGtleVJlZikpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjaCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjaCAmJiAhc2NoLm1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKHNjaC5zY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2NoZW1hc1trZXlSZWZdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkU2NoZW1hKHNjaGVtYSwgbWV0YSwgYmFzZUlkLCB2YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSwgYWRkU2NoZW1hID0gdGhpcy5vcHRzLmFkZFVzZWRTY2hlbWEpIHtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlkID0gc2NoZW1hW3NjaGVtYUlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuanRkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNjaGVtYSBtdXN0IGJlIG9iamVjdFwiKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgIT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIG11c3QgYmUgb2JqZWN0IG9yIGJvb2xlYW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjaCA9IHRoaXMuX2NhY2hlLmdldChzY2hlbWEpO1xuICAgICAgICBpZiAoc2NoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gc2NoO1xuICAgICAgICBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShpZCB8fCBiYXNlSWQpO1xuICAgICAgICBjb25zdCBsb2NhbFJlZnMgPSByZXNvbHZlXzEuZ2V0U2NoZW1hUmVmcy5jYWxsKHRoaXMsIHNjaGVtYSwgYmFzZUlkKTtcbiAgICAgICAgc2NoID0gbmV3IGNvbXBpbGVfMS5TY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCBtZXRhLCBiYXNlSWQsIGxvY2FsUmVmcyB9KTtcbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KHNjaC5zY2hlbWEsIHNjaCk7XG4gICAgICAgIGlmIChhZGRTY2hlbWEgJiYgIWJhc2VJZC5zdGFydHNXaXRoKFwiI1wiKSkge1xuICAgICAgICAgICAgLy8gVE9ETyBhdG0gaXQgaXMgYWxsb3dlZCB0byBvdmVyd3JpdGUgc2NoZW1hcyB3aXRob3V0IGlkIChpbnN0ZWFkIG9mIG5vdCBhZGRpbmcgdGhlbSlcbiAgICAgICAgICAgIGlmIChiYXNlSWQpXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tVbmlxdWUoYmFzZUlkKTtcbiAgICAgICAgICAgIHRoaXMucmVmc1tiYXNlSWRdID0gc2NoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZVNjaGVtYSlcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVTY2hlbWEoc2NoZW1hLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG4gICAgX2NoZWNrVW5pcXVlKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVtYXNbaWRdIHx8IHRoaXMucmVmc1tpZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc2NoZW1hIHdpdGgga2V5IG9yIGlkIFwiJHtpZH1cIiBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jb21waWxlU2NoZW1hRW52KHNjaCkge1xuICAgICAgICBpZiAoc2NoLm1ldGEpXG4gICAgICAgICAgICB0aGlzLl9jb21waWxlTWV0YVNjaGVtYShzY2gpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb21waWxlXzEuY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIXNjaC52YWxpZGF0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgcmV0dXJuIHNjaC52YWxpZGF0ZTtcbiAgICB9XG4gICAgX2NvbXBpbGVNZXRhU2NoZW1hKHNjaCkge1xuICAgICAgICBjb25zdCBjdXJyZW50T3B0cyA9IHRoaXMub3B0cztcbiAgICAgICAgdGhpcy5vcHRzID0gdGhpcy5fbWV0YU9wdHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb21waWxlXzEuY29tcGlsZVNjaGVtYS5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMgPSBjdXJyZW50T3B0cztcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEFqdjtcbkFqdi5WYWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0aW9uX2Vycm9yXzEuZGVmYXVsdDtcbkFqdi5NaXNzaW5nUmVmRXJyb3IgPSByZWZfZXJyb3JfMS5kZWZhdWx0O1xuZnVuY3Rpb24gY2hlY2tPcHRpb25zKGNoZWNrT3B0cywgb3B0aW9ucywgbXNnLCBsb2cgPSBcImVycm9yXCIpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGVja09wdHMpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0ga2V5O1xuICAgICAgICBpZiAob3B0IGluIG9wdGlvbnMpXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcltsb2ddKGAke21zZ306IG9wdGlvbiAke2tleX0uICR7Y2hlY2tPcHRzW29wdF19YCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0U2NoRW52KGtleVJlZikge1xuICAgIGtleVJlZiA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGtleVJlZik7IC8vIFRPRE8gdGVzdHMgZmFpbCB3aXRob3V0IHRoaXMgbGluZVxuICAgIHJldHVybiB0aGlzLnNjaGVtYXNba2V5UmVmXSB8fCB0aGlzLnJlZnNba2V5UmVmXTtcbn1cbmZ1bmN0aW9uIGFkZEluaXRpYWxTY2hlbWFzKCkge1xuICAgIGNvbnN0IG9wdHNTY2hlbWFzID0gdGhpcy5vcHRzLnNjaGVtYXM7XG4gICAgaWYgKCFvcHRzU2NoZW1hcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdHNTY2hlbWFzKSlcbiAgICAgICAgdGhpcy5hZGRTY2hlbWEob3B0c1NjaGVtYXMpO1xuICAgIGVsc2VcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0c1NjaGVtYXMpXG4gICAgICAgICAgICB0aGlzLmFkZFNjaGVtYShvcHRzU2NoZW1hc1trZXldLCBrZXkpO1xufVxuZnVuY3Rpb24gYWRkSW5pdGlhbEZvcm1hdHMoKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMub3B0cy5mb3JtYXRzKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMub3B0cy5mb3JtYXRzW25hbWVdO1xuICAgICAgICBpZiAoZm9ybWF0KVxuICAgICAgICAgICAgdGhpcy5hZGRGb3JtYXQobmFtZSwgZm9ybWF0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRJbml0aWFsS2V5d29yZHMoZGVmcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRlZnMpKSB7XG4gICAgICAgIHRoaXMuYWRkVm9jYWJ1bGFyeShkZWZzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvZ2dlci53YXJuKFwia2V5d29yZHMgb3B0aW9uIGFzIG1hcCBpcyBkZXByZWNhdGVkLCBwYXNzIGFycmF5XCIpO1xuICAgIGZvciAoY29uc3Qga2V5d29yZCBpbiBkZWZzKSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnNba2V5d29yZF07XG4gICAgICAgIGlmICghZGVmLmtleXdvcmQpXG4gICAgICAgICAgICBkZWYua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgIHRoaXMuYWRkS2V5d29yZChkZWYpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1ldGFTY2hlbWFPcHRpb25zKCkge1xuICAgIGNvbnN0IG1ldGFPcHRzID0geyAuLi50aGlzLm9wdHMgfTtcbiAgICBmb3IgKGNvbnN0IG9wdCBvZiBNRVRBX0lHTk9SRV9PUFRJT05TKVxuICAgICAgICBkZWxldGUgbWV0YU9wdHNbb3B0XTtcbiAgICByZXR1cm4gbWV0YU9wdHM7XG59XG5jb25zdCBub0xvZ3MgPSB7IGxvZygpIHsgfSwgd2FybigpIHsgfSwgZXJyb3IoKSB7IH0gfTtcbmZ1bmN0aW9uIGdldExvZ2dlcihsb2dnZXIpIHtcbiAgICBpZiAobG9nZ2VyID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuIG5vTG9ncztcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBjb25zb2xlO1xuICAgIGlmIChsb2dnZXIubG9nICYmIGxvZ2dlci53YXJuICYmIGxvZ2dlci5lcnJvcilcbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJsb2dnZXIgbXVzdCBpbXBsZW1lbnQgbG9nLCB3YXJuIGFuZCBlcnJvciBtZXRob2RzXCIpO1xufVxuY29uc3QgS0VZV09SRF9OQU1FID0gL15bYS16XyRdW2EtejAtOV8kOi1dKiQvaTtcbmZ1bmN0aW9uIGNoZWNrS2V5d29yZChrZXl3b3JkLCBkZWYpIHtcbiAgICBjb25zdCB7IFJVTEVTIH0gPSB0aGlzO1xuICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIChrd2QpID0+IHtcbiAgICAgICAgaWYgKFJVTEVTLmtleXdvcmRzW2t3ZF0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEtleXdvcmQgJHtrd2R9IGlzIGFscmVhZHkgZGVmaW5lZGApO1xuICAgICAgICBpZiAoIUtFWVdPUkRfTkFNRS50ZXN0KGt3ZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEtleXdvcmQgJHtrd2R9IGhhcyBpbnZhbGlkIG5hbWVgKTtcbiAgICB9KTtcbiAgICBpZiAoIWRlZilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkZWYuJGRhdGEgJiYgIShcImNvZGVcIiBpbiBkZWYgfHwgXCJ2YWxpZGF0ZVwiIGluIGRlZikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCckZGF0YSBrZXl3b3JkIG11c3QgaGF2ZSBcImNvZGVcIiBvciBcInZhbGlkYXRlXCIgZnVuY3Rpb24nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRSdWxlKGtleXdvcmQsIGRlZmluaXRpb24sIGRhdGFUeXBlKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHBvc3QgPSBkZWZpbml0aW9uID09PSBudWxsIHx8IGRlZmluaXRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlZmluaXRpb24ucG9zdDtcbiAgICBpZiAoZGF0YVR5cGUgJiYgcG9zdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZXl3b3JkIHdpdGggXCJwb3N0XCIgZmxhZyBjYW5ub3QgaGF2ZSBcInR5cGVcIicpO1xuICAgIGNvbnN0IHsgUlVMRVMgfSA9IHRoaXM7XG4gICAgbGV0IHJ1bGVHcm91cCA9IHBvc3QgPyBSVUxFUy5wb3N0IDogUlVMRVMucnVsZXMuZmluZCgoeyB0eXBlOiB0IH0pID0+IHQgPT09IGRhdGFUeXBlKTtcbiAgICBpZiAoIXJ1bGVHcm91cCkge1xuICAgICAgICBydWxlR3JvdXAgPSB7IHR5cGU6IGRhdGFUeXBlLCBydWxlczogW10gfTtcbiAgICAgICAgUlVMRVMucnVsZXMucHVzaChydWxlR3JvdXApO1xuICAgIH1cbiAgICBSVUxFUy5rZXl3b3Jkc1trZXl3b3JkXSA9IHRydWU7XG4gICAgaWYgKCFkZWZpbml0aW9uKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcnVsZSA9IHtcbiAgICAgICAga2V5d29yZCxcbiAgICAgICAgZGVmaW5pdGlvbjoge1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIHR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmaW5pdGlvbi50eXBlKSxcbiAgICAgICAgICAgIHNjaGVtYVR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmaW5pdGlvbi5zY2hlbWFUeXBlKSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChkZWZpbml0aW9uLmJlZm9yZSlcbiAgICAgICAgYWRkQmVmb3JlUnVsZS5jYWxsKHRoaXMsIHJ1bGVHcm91cCwgcnVsZSwgZGVmaW5pdGlvbi5iZWZvcmUpO1xuICAgIGVsc2VcbiAgICAgICAgcnVsZUdyb3VwLnJ1bGVzLnB1c2gocnVsZSk7XG4gICAgUlVMRVMuYWxsW2tleXdvcmRdID0gcnVsZTtcbiAgICAoX2EgPSBkZWZpbml0aW9uLmltcGxlbWVudHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKChrd2QpID0+IHRoaXMuYWRkS2V5d29yZChrd2QpKTtcbn1cbmZ1bmN0aW9uIGFkZEJlZm9yZVJ1bGUocnVsZUdyb3VwLCBydWxlLCBiZWZvcmUpIHtcbiAgICBjb25zdCBpID0gcnVsZUdyb3VwLnJ1bGVzLmZpbmRJbmRleCgoX3J1bGUpID0+IF9ydWxlLmtleXdvcmQgPT09IGJlZm9yZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICBydWxlR3JvdXAucnVsZXMuc3BsaWNlKGksIDAsIHJ1bGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcnVsZUdyb3VwLnJ1bGVzLnB1c2gocnVsZSk7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYHJ1bGUgJHtiZWZvcmV9IGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgfVxufVxuZnVuY3Rpb24ga2V5d29yZE1ldGFzY2hlbWEoZGVmKSB7XG4gICAgbGV0IHsgbWV0YVNjaGVtYSB9ID0gZGVmO1xuICAgIGlmIChtZXRhU2NoZW1hID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZGVmLiRkYXRhICYmIHRoaXMub3B0cy4kZGF0YSlcbiAgICAgICAgbWV0YVNjaGVtYSA9IHNjaGVtYU9yRGF0YShtZXRhU2NoZW1hKTtcbiAgICBkZWYudmFsaWRhdGVTY2hlbWEgPSB0aGlzLmNvbXBpbGUobWV0YVNjaGVtYSwgdHJ1ZSk7XG59XG5jb25zdCAkZGF0YVJlZiA9IHtcbiAgICAkcmVmOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9tYXN0ZXIvbGliL3JlZnMvZGF0YS5qc29uI1wiLFxufTtcbmZ1bmN0aW9uIHNjaGVtYU9yRGF0YShzY2hlbWEpIHtcbiAgICByZXR1cm4geyBhbnlPZjogW3NjaGVtYSwgJGRhdGFSZWZdIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Fqdi12YWxpZGF0b3IvYWp2L2lzc3Vlcy84ODlcbmNvbnN0IGVxdWFsID0gcmVxdWlyZShcImZhc3QtZGVlcC1lcXVhbFwiKTtcbmVxdWFsLmNvZGUgPSAncmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvZXF1YWxcIikuZGVmYXVsdCc7XG5leHBvcnRzLmRlZmF1bHQgPSBlcXVhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVxdWFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9wdW55Y29kZS5qcyAtIHB1bnljb2RlLnVjczIuZGVjb2RlXG5mdW5jdGlvbiB1Y3MybGVuZ3RoKHN0cikge1xuICAgIGNvbnN0IGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IHBvcyA9IDA7XG4gICAgbGV0IHZhbHVlO1xuICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgIHZhbHVlID0gc3RyLmNoYXJDb2RlQXQocG9zKyspO1xuICAgICAgICBpZiAodmFsdWUgPj0gMHhkODAwICYmIHZhbHVlIDw9IDB4ZGJmZiAmJiBwb3MgPCBsZW4pIHtcbiAgICAgICAgICAgIC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgdmFsdWUgPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICAgICAgaWYgKCh2YWx1ZSAmIDB4ZmMwMCkgPT09IDB4ZGMwMClcbiAgICAgICAgICAgICAgICBwb3MrKzsgLy8gbG93IHN1cnJvZ2F0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG59XG5leHBvcnRzLmRlZmF1bHQgPSB1Y3MybGVuZ3RoO1xudWNzMmxlbmd0aC5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL3VjczJsZW5ndGhcIikuZGVmYXVsdCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11Y3MybGVuZ3RoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXJpID0gcmVxdWlyZShcInVyaS1qc1wiKTtcbnVyaS5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL3VyaVwiKS5kZWZhdWx0JztcbmV4cG9ydHMuZGVmYXVsdCA9IHVyaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVyaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcnMpIHtcbiAgICAgICAgc3VwZXIoXCJ2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIHRoaXMuYWp2ID0gdGhpcy52YWxpZGF0aW9uID0gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWYWxpZGF0aW9uRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uX2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSBtb3JlIHRoYW4gJHtsZW59IGl0ZW1zYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7bGVufX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgJ1wiYWRkaXRpb25hbEl0ZW1zXCIgaXMgaWdub3JlZCB3aGVuIFwiaXRlbXNcIiBpcyBub3QgYW4gYXJyYXkgb2Ygc2NoZW1hcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zKGN4dCwgaXRlbXMpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMoY3h0LCBpdGVtcykge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBsZW46IGl0ZW1zLmxlbmd0aCB9KTtcbiAgICAgICAgY3h0LnBhc3MoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59IDw9ICR7aXRlbXMubGVuZ3RofWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLnZhcihcInZhbGlkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA8PSAke2l0ZW1zLmxlbmd0aH1gKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHZhbGlkYXRlSXRlbXModmFsaWQpKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyh2YWxpZCkge1xuICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIGl0ZW1zLmxlbmd0aCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQsIGRhdGFQcm9wOiBpLCBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSB9LCB2YWxpZCk7XG4gICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zID0gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXM7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsSXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IE5PVCBoYXZlIGFkZGl0aW9uYWwgcHJvcGVydGllc1wiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHthZGRpdGlvbmFsUHJvcGVydHk6ICR7cGFyYW1zLmFkZGl0aW9uYWxQcm9wZXJ0eX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFtcIm9iamVjdFwiXSxcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGFsbG93VW5kZWZpbmVkOiB0cnVlLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgZXJyc0NvdW50LCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFlcnJzQ291bnQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHsgYWxsRXJyb3JzLCBvcHRzIH0gPSBpdDtcbiAgICAgICAgaXQucHJvcHMgPSB0cnVlO1xuICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICE9PSBcImFsbFwiICYmICgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnByb3BlcnRpZXMpO1xuICAgICAgICBjb25zdCBwYXRQcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKTtcbiAgICAgICAgY2hlY2tBZGRpdGlvbmFsUHJvcGVydGllcygpO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWRkaXRpb25hbFByb3BlcnRpZXMoKSB7XG4gICAgICAgICAgICBnZW4uZm9ySW4oXCJrZXlcIiwgZGF0YSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJvcHMubGVuZ3RoICYmICFwYXRQcm9wcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0eUNvZGUoa2V5KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZihpc0FkZGl0aW9uYWwoa2V5KSwgKCkgPT4gYWRkaXRpb25hbFByb3BlcnR5Q29kZShrZXkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGxldCBkZWZpbmVkUHJvcDtcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiA4KSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBtYXliZSBhbiBvcHRpb24gaW5zdGVhZCBvZiBoYXJkLWNvZGVkIDg/XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHNTY2hlbWEgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgcGFyZW50U2NoZW1hLnByb3BlcnRpZXMsIFwicHJvcGVydGllc1wiKTtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9ICgwLCBjb2RlXzEuaXNPd25Qcm9wZXJ0eSkoZ2VuLCBwcm9wc1NjaGVtYSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gKDAsIGNvZGVnZW5fMS5vcikoLi4ucHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAke2tleX0gPT09ICR7cH1gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9IGNvZGVnZW5fMS5uaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0UHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSAoMCwgY29kZWdlbl8xLm9yKShkZWZpbmVkUHJvcCwgLi4ucGF0UHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBwKX0udGVzdCgke2tleX0pYCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEubm90KShkZWZpbmVkUHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYGRlbGV0ZSAke2RhdGF9WyR7a2V5fV1gKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhZGRpdGlvbmFsUHJvcGVydHlDb2RlKGtleSkge1xuICAgICAgICAgICAgaWYgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJhbGxcIiB8fCAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICYmIHNjaGVtYSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlQWRkaXRpb25hbChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGFkZGl0aW9uYWxQcm9wZXJ0eToga2V5IH0pO1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImZhaWxpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUFkZGl0aW9uYWxTY2hlbWEoa2V5LCB2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3h0LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVBZGRpdGlvbmFsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlBZGRpdGlvbmFsU2NoZW1hKGtleSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5QWRkaXRpb25hbFNjaGVtYShrZXksIHZhbGlkLCBlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLlN0cixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZXJyb3JzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3Vic2NoZW1hLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHN1YnNjaGVtYSwgdmFsaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbGxPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgc2NoZW1hLmZvckVhY2goKHNjaCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcImFsbE9mXCIsIHNjaGVtYVByb3A6IGkgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFsbE9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbnlPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBjb2RlOiBjb2RlXzEudmFsaWRhdGVVbmlvbixcbiAgICBlcnJvcjogeyBtZXNzYWdlOiBcIm11c3QgbWF0Y2ggYSBzY2hlbWEgaW4gYW55T2ZcIiB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFueU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbWluLCBtYXggfSB9KSA9PiBtYXggPT09IHVuZGVmaW5lZFxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSB2YWxpZCBpdGVtKHMpYFxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSBhbmQgbm8gbW9yZSB0aGFuICR7bWF4fSB2YWxpZCBpdGVtKHMpYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBtaW4sIG1heCB9IH0pID0+IG1heCA9PT0gdW5kZWZpbmVkID8gKDAsIGNvZGVnZW5fMS5fKSBge21pbkNvbnRhaW5zOiAke21pbn19YCA6ICgwLCBjb2RlZ2VuXzEuXykgYHttaW5Db250YWluczogJHttaW59LCBtYXhDb250YWluczogJHttYXh9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29udGFpbnNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGNvbnN0IHsgbWluQ29udGFpbnMsIG1heENvbnRhaW5zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmIChpdC5vcHRzLm5leHQpIHtcbiAgICAgICAgICAgIG1pbiA9IG1pbkNvbnRhaW5zID09PSB1bmRlZmluZWQgPyAxIDogbWluQ29udGFpbnM7XG4gICAgICAgICAgICBtYXggPSBtYXhDb250YWlucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1pbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaW4sIG1heCB9KTtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkICYmIG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgXCJtaW5Db250YWluc1wiID09IDAgd2l0aG91dCBcIm1heENvbnRhaW5zXCI6IFwiY29udGFpbnNcIiBrZXl3b3JkIGlnbm9yZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQgJiYgbWluID4gbWF4KSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIm1pbkNvbnRhaW5zXCIgPiBcIm1heENvbnRhaW5zXCIgaXMgYWx3YXlzIGludmFsaWRgKTtcbiAgICAgICAgICAgIGN4dC5mYWlsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBsZXQgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA+PSAke21pbn1gO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2NvbmR9ICYmICR7bGVufSA8PSAke21heH1gO1xuICAgICAgICAgICAgY3h0LnBhc3MoY29uZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCAmJiBtaW4gPT09IDEpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXModmFsaWQsICgpID0+IGdlbi5pZih2YWxpZCwgKCkgPT4gZ2VuLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtaW4gPT09IDApIHtcbiAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aCA+IDBgLCB2YWxpZGF0ZUl0ZW1zV2l0aENvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXNXaXRoQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjeHQucmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXNXaXRoQ291bnQoKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBnZW4ubGV0KFwiY291bnRcIiwgMCk7XG4gICAgICAgICAgICB2YWxpZGF0ZUl0ZW1zKHNjaFZhbGlkLCAoKSA9PiBnZW4uaWYoc2NoVmFsaWQsICgpID0+IGNoZWNrTGltaXRzKGNvdW50KSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXMoX3ZhbGlkLCBibG9jaykge1xuICAgICAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCAwLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwiY29udGFpbnNcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtLFxuICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIF92YWxpZCk7XG4gICAgICAgICAgICAgICAgYmxvY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTGltaXRzKGNvdW50KSB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke2NvdW50fSsrYCk7XG4gICAgICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPj0gJHttaW59YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSkuYnJlYWsoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPiAke21heH1gLCAoKSA9PiBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSkuYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0gPj0gJHttaW59YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250YWlucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVTY2hlbWFEZXBzID0gZXhwb3J0cy52YWxpZGF0ZVByb3BlcnR5RGVwcyA9IGV4cG9ydHMuZXJyb3IgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuZXhwb3J0cy5lcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgcHJvcGVydHksIGRlcHNDb3VudCwgZGVwcyB9IH0pID0+IHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlfaWVzID0gZGVwc0NvdW50ID09PSAxID8gXCJwcm9wZXJ0eVwiIDogXCJwcm9wZXJ0aWVzXCI7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgaGF2ZSAke3Byb3BlcnR5X2llc30gJHtkZXBzfSB3aGVuIHByb3BlcnR5ICR7cHJvcGVydHl9IGlzIHByZXNlbnRgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgcHJvcGVydHksIGRlcHNDb3VudCwgZGVwcywgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Byb3BlcnR5OiAke3Byb3BlcnR5fSxcbiAgICBtaXNzaW5nUHJvcGVydHk6ICR7bWlzc2luZ1Byb3BlcnR5fSxcbiAgICBkZXBzQ291bnQ6ICR7ZGVwc0NvdW50fSxcbiAgICBkZXBzOiAke2RlcHN9fWAsIC8vIFRPRE8gY2hhbmdlIHRvIHJlZmVyZW5jZVxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImRlcGVuZGVuY2llc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBlcnJvcjogZXhwb3J0cy5lcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCBbcHJvcERlcHMsIHNjaERlcHNdID0gc3BsaXREZXBlbmRlbmNpZXMoY3h0KTtcbiAgICAgICAgdmFsaWRhdGVQcm9wZXJ0eURlcHMoY3h0LCBwcm9wRGVwcyk7XG4gICAgICAgIHZhbGlkYXRlU2NoZW1hRGVwcyhjeHQsIHNjaERlcHMpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gc3BsaXREZXBlbmRlbmNpZXMoeyBzY2hlbWEgfSkge1xuICAgIGNvbnN0IHByb3BlcnR5RGVwcyA9IHt9O1xuICAgIGNvbnN0IHNjaGVtYURlcHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJfX3Byb3RvX19cIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBkZXBzID0gQXJyYXkuaXNBcnJheShzY2hlbWFba2V5XSkgPyBwcm9wZXJ0eURlcHMgOiBzY2hlbWFEZXBzO1xuICAgICAgICBkZXBzW2tleV0gPSBzY2hlbWFba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIFtwcm9wZXJ0eURlcHMsIHNjaGVtYURlcHNdO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0eURlcHMoY3h0LCBwcm9wZXJ0eURlcHMgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnR5RGVwcykubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgbWlzc2luZyA9IGdlbi5sZXQoXCJtaXNzaW5nXCIpO1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wZXJ0eURlcHMpIHtcbiAgICAgICAgY29uc3QgZGVwcyA9IHByb3BlcnR5RGVwc1twcm9wXTtcbiAgICAgICAgaWYgKGRlcHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGhhc1Byb3BlcnR5ID0gKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpO1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHtcbiAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLFxuICAgICAgICAgICAgZGVwc0NvdW50OiBkZXBzLmxlbmd0aCxcbiAgICAgICAgICAgIGRlcHM6IGRlcHMuam9pbihcIiwgXCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICAgICAgZ2VuLmlmKGhhc1Byb3BlcnR5LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBQcm9wIG9mIGRlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5jaGVja1JlcG9ydE1pc3NpbmdQcm9wKShjeHQsIGRlcFByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aGFzUHJvcGVydHl9ICYmICgkeygwLCBjb2RlXzEuY2hlY2tNaXNzaW5nUHJvcCkoY3h0LCBkZXBzLCBtaXNzaW5nKX0pYCk7XG4gICAgICAgICAgICAoMCwgY29kZV8xLnJlcG9ydE1pc3NpbmdQcm9wKShjeHQsIG1pc3NpbmcpO1xuICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVQcm9wZXJ0eURlcHMgPSB2YWxpZGF0ZVByb3BlcnR5RGVwcztcbmZ1bmN0aW9uIHZhbGlkYXRlU2NoZW1hRGVwcyhjeHQsIHNjaGVtYURlcHMgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzY2hlbWFEZXBzKSB7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hRGVwc1twcm9wXSkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQsIHNjaGVtYVByb3A6IHByb3AgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoQ3h0LCB2YWxpZCk7XG4gICAgICAgIH0sICgpID0+IGdlbi52YXIodmFsaWQsIHRydWUpIC8vIFRPRE8gdmFyXG4gICAgICAgICk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVNjaGVtYURlcHMgPSB2YWxpZGF0ZVNjaGVtYURlcHM7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZXBlbmRlbmNpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgbWF0Y2ggXCIke3BhcmFtcy5pZkNsYXVzZX1cIiBzY2hlbWFgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtmYWlsaW5nS2V5d29yZDogJHtwYXJhbXMuaWZDbGF1c2V9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaWZcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmIChwYXJlbnRTY2hlbWEudGhlbiA9PT0gdW5kZWZpbmVkICYmIHBhcmVudFNjaGVtYS5lbHNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgJ1wiaWZcIiB3aXRob3V0IFwidGhlblwiIGFuZCBcImVsc2VcIiBpcyBpZ25vcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzVGhlbiA9IGhhc1NjaGVtYShpdCwgXCJ0aGVuXCIpO1xuICAgICAgICBjb25zdCBoYXNFbHNlID0gaGFzU2NoZW1hKGl0LCBcImVsc2VcIik7XG4gICAgICAgIGlmICghaGFzVGhlbiAmJiAhaGFzRWxzZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgICAgIHZhbGlkYXRlSWYoKTtcbiAgICAgICAgY3h0LnJlc2V0KCk7XG4gICAgICAgIGlmIChoYXNUaGVuICYmIGhhc0Vsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGlmQ2xhdXNlID0gZ2VuLmxldChcImlmQ2xhdXNlXCIpO1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGlmQ2xhdXNlIH0pO1xuICAgICAgICAgICAgZ2VuLmlmKHNjaFZhbGlkLCB2YWxpZGF0ZUNsYXVzZShcInRoZW5cIiwgaWZDbGF1c2UpLCB2YWxpZGF0ZUNsYXVzZShcImVsc2VcIiwgaWZDbGF1c2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNUaGVuKSB7XG4gICAgICAgICAgICBnZW4uaWYoc2NoVmFsaWQsIHZhbGlkYXRlQ2xhdXNlKFwidGhlblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHNjaFZhbGlkKSwgdmFsaWRhdGVDbGF1c2UoXCJlbHNlXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjeHQucGFzcyh2YWxpZCwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVJZigpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwiaWZcIixcbiAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWxsRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sIHNjaFZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlQ2xhdXNlKGtleXdvcmQsIGlmQ2xhdXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkIH0sIHNjaFZhbGlkKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBzY2hWYWxpZCk7XG4gICAgICAgICAgICAgICAgY3h0Lm1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoQ3h0LCB2YWxpZCk7XG4gICAgICAgICAgICAgICAgaWYgKGlmQ2xhdXNlKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKGlmQ2xhdXNlLCAoMCwgY29kZWdlbl8xLl8pIGAke2tleXdvcmR9YCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgaWZDbGF1c2U6IGtleXdvcmQgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBoYXNTY2hlbWEoaXQsIGtleXdvcmQpIHtcbiAgICBjb25zdCBzY2hlbWEgPSBpdC5zY2hlbWFba2V5d29yZF07XG4gICAgcmV0dXJuIHNjaGVtYSAhPT0gdW5kZWZpbmVkICYmICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWRkaXRpb25hbEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsSXRlbXNcIik7XG5jb25zdCBwcmVmaXhJdGVtc18xID0gcmVxdWlyZShcIi4vcHJlZml4SXRlbXNcIik7XG5jb25zdCBpdGVtc18xID0gcmVxdWlyZShcIi4vaXRlbXNcIik7XG5jb25zdCBpdGVtczIwMjBfMSA9IHJlcXVpcmUoXCIuL2l0ZW1zMjAyMFwiKTtcbmNvbnN0IGNvbnRhaW5zXzEgPSByZXF1aXJlKFwiLi9jb250YWluc1wiKTtcbmNvbnN0IGRlcGVuZGVuY2llc18xID0gcmVxdWlyZShcIi4vZGVwZW5kZW5jaWVzXCIpO1xuY29uc3QgcHJvcGVydHlOYW1lc18xID0gcmVxdWlyZShcIi4vcHJvcGVydHlOYW1lc1wiKTtcbmNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsUHJvcGVydGllc1wiKTtcbmNvbnN0IHByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnRpZXNcIik7XG5jb25zdCBwYXR0ZXJuUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vcGF0dGVyblByb3BlcnRpZXNcIik7XG5jb25zdCBub3RfMSA9IHJlcXVpcmUoXCIuL25vdFwiKTtcbmNvbnN0IGFueU9mXzEgPSByZXF1aXJlKFwiLi9hbnlPZlwiKTtcbmNvbnN0IG9uZU9mXzEgPSByZXF1aXJlKFwiLi9vbmVPZlwiKTtcbmNvbnN0IGFsbE9mXzEgPSByZXF1aXJlKFwiLi9hbGxPZlwiKTtcbmNvbnN0IGlmXzEgPSByZXF1aXJlKFwiLi9pZlwiKTtcbmNvbnN0IHRoZW5FbHNlXzEgPSByZXF1aXJlKFwiLi90aGVuRWxzZVwiKTtcbmZ1bmN0aW9uIGdldEFwcGxpY2F0b3IoZHJhZnQyMDIwID0gZmFsc2UpIHtcbiAgICBjb25zdCBhcHBsaWNhdG9yID0gW1xuICAgICAgICAvLyBhbnlcbiAgICAgICAgbm90XzEuZGVmYXVsdCxcbiAgICAgICAgYW55T2ZfMS5kZWZhdWx0LFxuICAgICAgICBvbmVPZl8xLmRlZmF1bHQsXG4gICAgICAgIGFsbE9mXzEuZGVmYXVsdCxcbiAgICAgICAgaWZfMS5kZWZhdWx0LFxuICAgICAgICB0aGVuRWxzZV8xLmRlZmF1bHQsXG4gICAgICAgIC8vIG9iamVjdFxuICAgICAgICBwcm9wZXJ0eU5hbWVzXzEuZGVmYXVsdCxcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXNfMS5kZWZhdWx0LFxuICAgICAgICBkZXBlbmRlbmNpZXNfMS5kZWZhdWx0LFxuICAgICAgICBwcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICAgICAgcGF0dGVyblByb3BlcnRpZXNfMS5kZWZhdWx0LFxuICAgIF07XG4gICAgLy8gYXJyYXlcbiAgICBpZiAoZHJhZnQyMDIwKVxuICAgICAgICBhcHBsaWNhdG9yLnB1c2gocHJlZml4SXRlbXNfMS5kZWZhdWx0LCBpdGVtczIwMjBfMS5kZWZhdWx0KTtcbiAgICBlbHNlXG4gICAgICAgIGFwcGxpY2F0b3IucHVzaChhZGRpdGlvbmFsSXRlbXNfMS5kZWZhdWx0LCBpdGVtc18xLmRlZmF1bHQpO1xuICAgIGFwcGxpY2F0b3IucHVzaChjb250YWluc18xLmRlZmF1bHQpO1xuICAgIHJldHVybiBhcHBsaWNhdG9yO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0QXBwbGljYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZVR1cGxlID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIml0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImFycmF5XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IHNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZVR1cGxlKGN4dCwgXCJhZGRpdGlvbmFsSXRlbXNcIiwgc2NoZW1hKTtcbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN4dC5vaygoMCwgY29kZV8xLnZhbGlkYXRlQXJyYXkpKGN4dCkpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVUdXBsZShjeHQsIGV4dHJhSXRlbXMsIHNjaEFyciA9IGN4dC5zY2hlbWEpIHtcbiAgICBjb25zdCB7IGdlbiwgcGFyZW50U2NoZW1hLCBkYXRhLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGNoZWNrU3RyaWN0VHVwbGUocGFyZW50U2NoZW1hKTtcbiAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiBzY2hBcnIubGVuZ3RoICYmIGl0Lml0ZW1zICE9PSB0cnVlKSB7XG4gICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgc2NoQXJyLmxlbmd0aCwgaXQuaXRlbXMpO1xuICAgIH1cbiAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgc2NoQXJyLmZvckVhY2goKHNjaCwgaSkgPT4ge1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPiAke2l9YCwgKCkgPT4gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICBrZXl3b3JkLFxuICAgICAgICAgICAgc2NoZW1hUHJvcDogaSxcbiAgICAgICAgICAgIGRhdGFQcm9wOiBpLFxuICAgICAgICB9LCB2YWxpZCkpO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGNoZWNrU3RyaWN0VHVwbGUoc2NoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0cywgZXJyU2NoZW1hUGF0aCB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IGwgPSBzY2hBcnIubGVuZ3RoO1xuICAgICAgICBjb25zdCBmdWxsVHVwbGUgPSBsID09PSBzY2gubWluSXRlbXMgJiYgKGwgPT09IHNjaC5tYXhJdGVtcyB8fCBzY2hbZXh0cmFJdGVtc10gPT09IGZhbHNlKTtcbiAgICAgICAgaWYgKG9wdHMuc3RyaWN0VHVwbGVzICYmICFmdWxsVHVwbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGBcIiR7a2V5d29yZH1cIiBpcyAke2x9LXR1cGxlLCBidXQgbWluSXRlbXMgb3IgbWF4SXRlbXMvJHtleHRyYUl0ZW1zfSBhcmUgbm90IHNwZWNpZmllZCBvciBkaWZmZXJlbnQgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cImA7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIG1zZywgb3B0cy5zdHJpY3RUdXBsZXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVR1cGxlID0gdmFsaWRhdGVUdXBsZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZW1zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGFkZGl0aW9uYWxJdGVtc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbEl0ZW1zXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSBtb3JlIHRoYW4gJHtsZW59IGl0ZW1zYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7bGVufX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIml0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBwcmVmaXhJdGVtcyB9ID0gcGFyZW50U2NoZW1hO1xuICAgICAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHByZWZpeEl0ZW1zKVxuICAgICAgICAgICAgKDAsIGFkZGl0aW9uYWxJdGVtc18xLnZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zKShjeHQsIHByZWZpeEl0ZW1zKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY3h0Lm9rKCgwLCBjb2RlXzEudmFsaWRhdGVBcnJheSkoY3h0KSk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVtczIwMjAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwibm90XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgICAgIGN4dC5mYWlsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgIGtleXdvcmQ6IFwibm90XCIsXG4gICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgY3JlYXRlRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgY3h0LmZhaWxSZXN1bHQodmFsaWQsICgpID0+IGN4dC5yZXNldCgpLCAoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgfSxcbiAgICBlcnJvcjogeyBtZXNzYWdlOiBcIm11c3QgTk9UIGJlIHZhbGlkXCIgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBtYXRjaCBleGFjdGx5IG9uZSBzY2hlbWEgaW4gb25lT2ZcIixcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cGFzc2luZ1NjaGVtYXM6ICR7cGFyYW1zLnBhc3Npbmd9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwib25lT2ZcIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGlmIChpdC5vcHRzLmRpc2NyaW1pbmF0b3IgJiYgcGFyZW50U2NoZW1hLmRpc2NyaW1pbmF0b3IpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHNjaEFyciA9IHNjaGVtYTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgICAgICBjb25zdCBwYXNzaW5nID0gZ2VuLmxldChcInBhc3NpbmdcIiwgbnVsbCk7XG4gICAgICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBwYXNzaW5nIH0pO1xuICAgICAgICAvLyBUT0RPIHBvc3NpYmx5IGZhaWwgc3RyYWlnaHQgYXdheSAod2l0aCB3YXJuaW5nIG9yIGV4Y2VwdGlvbikgaWYgdGhlcmUgYXJlIHR3byBlbXB0eSBhbHdheXMgdmFsaWQgc2NoZW1hc1xuICAgICAgICBnZW4uYmxvY2sodmFsaWRhdGVPbmVPZik7XG4gICAgICAgIGN4dC5yZXN1bHQodmFsaWQsICgpID0+IGN4dC5yZXNldCgpLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZU9uZU9mKCkge1xuICAgICAgICAgICAgc2NoQXJyLmZvckVhY2goKHNjaCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzY2hDeHQ7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi52YXIoc2NoVmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcIm9uZU9mXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFQcm9wOiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgICAgICAuaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hWYWxpZH0gJiYgJHt2YWxpZH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFzc2lnbih2YWxpZCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXNzaWduKHBhc3NpbmcsICgwLCBjb2RlZ2VuXzEuXykgYFske3Bhc3Npbmd9LCAke2l9XWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZWxzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZW4uaWYoc2NoVmFsaWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24ocGFzc2luZywgaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hDeHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0LCBjb2RlZ2VuXzEuTmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b25lT2YuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInBhdHRlcm5Qcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvcHRzIH0gPSBpdDtcbiAgICAgICAgY29uc3QgcGF0dGVybnMgPSAoMCwgY29kZV8xLmFsbFNjaGVtYVByb3BlcnRpZXMpKHNjaGVtYSk7XG4gICAgICAgIGNvbnN0IGFsd2F5c1ZhbGlkUGF0dGVybnMgPSBwYXR0ZXJucy5maWx0ZXIoKHApID0+ICgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWFbcF0pKTtcbiAgICAgICAgaWYgKHBhdHRlcm5zLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgKGFsd2F5c1ZhbGlkUGF0dGVybnMubGVuZ3RoID09PSBwYXR0ZXJucy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAoIWl0Lm9wdHMudW5ldmFsdWF0ZWQgfHwgaXQucHJvcHMgPT09IHRydWUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoZWNrUHJvcGVydGllcyA9IG9wdHMuc3RyaWN0U2NoZW1hICYmICFvcHRzLmFsbG93TWF0Y2hpbmdQcm9wZXJ0aWVzICYmIHBhcmVudFNjaGVtYS5wcm9wZXJ0aWVzO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGlmIChpdC5wcm9wcyAhPT0gdHJ1ZSAmJiAhKGl0LnByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpKSB7XG4gICAgICAgICAgICBpdC5wcm9wcyA9ICgwLCB1dGlsXzIuZXZhbHVhdGVkUHJvcHNUb05hbWUpKGdlbiwgaXQucHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgcHJvcHMgfSA9IGl0O1xuICAgICAgICB2YWxpZGF0ZVBhdHRlcm5Qcm9wZXJ0aWVzKCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlUGF0dGVyblByb3BlcnRpZXMoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhdCBvZiBwYXR0ZXJucykge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja1Byb3BlcnRpZXMpXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrTWF0Y2hpbmdQcm9wZXJ0aWVzKHBhdCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByb3BlcnRpZXMocGF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi52YXIodmFsaWQsIHRydWUpOyAvLyBUT0RPIHZhclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByb3BlcnRpZXMocGF0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKHZhbGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tNYXRjaGluZ1Byb3BlcnRpZXMocGF0KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gY2hlY2tQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAocGF0KS50ZXN0KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYHByb3BlcnR5ICR7cHJvcH0gbWF0Y2hlcyBwYXR0ZXJuICR7cGF0fSAodXNlIGFsbG93TWF0Y2hpbmdQcm9wZXJ0aWVzKWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnRpZXMocGF0KSB7XG4gICAgICAgICAgICBnZW4uZm9ySW4oXCJrZXlcIiwgZGF0YSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBwYXQpfS50ZXN0KCR7a2V5fSlgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsd2F5c1ZhbGlkID0gYWx3YXlzVmFsaWRQYXR0ZXJucy5pbmNsdWRlcyhwYXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsd2F5c1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcInBhdHRlcm5Qcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hUHJvcDogcGF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzIuVHlwZS5TdHIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0Lm9wdHMudW5ldmFsdWF0ZWQgJiYgcHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtwcm9wc31bJHtrZXl9XWAsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFhbHdheXNWYWxpZCAmJiAhaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4gc2hvcnQtY2lyY3VpdCBpZiBgdW5ldmFsdWF0ZWRQcm9wZXJ0aWVzYCBpcyBub3Qgc3VwcG9ydGVkIChvcHRzLm5leHQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3IgaWYgYWxsIHByb3BlcnRpZXMgd2VyZSBldmFsdWF0ZWQgKHByb3BzID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IGdlbi5icmVhaygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdHRlcm5Qcm9wZXJ0aWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaXRlbXNfMSA9IHJlcXVpcmUoXCIuL2l0ZW1zXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicHJlZml4SXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wiYXJyYXlcIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgY29kZTogKGN4dCkgPT4gKDAsIGl0ZW1zXzEudmFsaWRhdGVUdXBsZSkoY3h0LCBcIml0ZW1zXCIpLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWZpeEl0ZW1zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgYWRkaXRpb25hbFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmIChpdC5vcHRzLnJlbW92ZUFkZGl0aW9uYWwgPT09IFwiYWxsXCIgJiYgcGFyZW50U2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEuZGVmYXVsdC5jb2RlKG5ldyB2YWxpZGF0ZV8xLktleXdvcmRDeHQoaXQsIGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEuZGVmYXVsdCwgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsUHJvcHMgPSAoMCwgY29kZV8xLmFsbFNjaGVtYVByb3BlcnRpZXMpKHNjaGVtYSk7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBhbGxQcm9wcykge1xuICAgICAgICAgICAgaXQuZGVmaW5lZFByb3BlcnRpZXMuYWRkKHByb3ApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIGFsbFByb3BzLmxlbmd0aCAmJiBpdC5wcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCAoMCwgdXRpbF8xLnRvSGFzaCkoYWxsUHJvcHMpLCBpdC5wcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IGFsbFByb3BzLmZpbHRlcigocCkgPT4gISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWFbcF0pKTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAoaGFzRGVmYXVsdChwcm9wKSkge1xuICAgICAgICAgICAgICAgIGFwcGx5UHJvcGVydHlTY2hlbWEocHJvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICBhcHBseVByb3BlcnR5U2NoZW1hKHByb3ApO1xuICAgICAgICAgICAgICAgIGlmICghaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uZWxzZSgpLnZhcih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZ2VuLmVuZElmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjeHQuaXQuZGVmaW5lZFByb3BlcnRpZXMuYWRkKHByb3ApO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYXNEZWZhdWx0KHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBpdC5vcHRzLnVzZURlZmF1bHRzICYmICFpdC5jb21wb3NpdGVSdWxlICYmIHNjaGVtYVtwcm9wXS5kZWZhdWx0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXBwbHlQcm9wZXJ0eVNjaGVtYShwcm9wKSB7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcInByb3BlcnRpZXNcIixcbiAgICAgICAgICAgICAgICBzY2hlbWFQcm9wOiBwcm9wLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBwcm9wLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wZXJ0aWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcInByb3BlcnR5IG5hbWUgbXVzdCBiZSB2YWxpZFwiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwcm9wZXJ0eU5hbWU6ICR7cGFyYW1zLnByb3BlcnR5TmFtZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwcm9wZXJ0eU5hbWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBnZW4uZm9ySW4oXCJrZXlcIiwgZGF0YSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IHByb3BlcnR5TmFtZToga2V5IH0pO1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJwcm9wZXJ0eU5hbWVzXCIsXG4gICAgICAgICAgICAgICAgZGF0YToga2V5LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlczogW1wic3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZToga2V5LFxuICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcih0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmJyZWFrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wZXJ0eU5hbWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJ0aGVuXCIsIFwiZWxzZVwiXSxcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIGNvZGUoeyBrZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGl0IH0pIHtcbiAgICAgICAgaWYgKHBhcmVudFNjaGVtYS5pZiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgXCIke2tleXdvcmR9XCIgd2l0aG91dCBcImlmXCIgaXMgaWdub3JlZGApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbkVsc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlVW5pb24gPSBleHBvcnRzLnZhbGlkYXRlQXJyYXkgPSBleHBvcnRzLnVzZVBhdHRlcm4gPSBleHBvcnRzLmNhbGxWYWxpZGF0ZUNvZGUgPSBleHBvcnRzLnNjaGVtYVByb3BlcnRpZXMgPSBleHBvcnRzLmFsbFNjaGVtYVByb3BlcnRpZXMgPSBleHBvcnRzLm5vUHJvcGVydHlJbkRhdGEgPSBleHBvcnRzLnByb3BlcnR5SW5EYXRhID0gZXhwb3J0cy5pc093blByb3BlcnR5ID0gZXhwb3J0cy5oYXNQcm9wRnVuYyA9IGV4cG9ydHMucmVwb3J0TWlzc2luZ1Byb3AgPSBleHBvcnRzLmNoZWNrTWlzc2luZ1Byb3AgPSBleHBvcnRzLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3AgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IHV0aWxfMiA9IHJlcXVpcmUoXCIuLi9jb21waWxlL3V0aWxcIik7XG5mdW5jdGlvbiBjaGVja1JlcG9ydE1pc3NpbmdQcm9wKGN4dCwgcHJvcCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGdlbi5pZihub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4ge1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiAoMCwgY29kZWdlbl8xLl8pIGAke3Byb3B9YCB9LCB0cnVlKTtcbiAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3AgPSBjaGVja1JlcG9ydE1pc3NpbmdQcm9wO1xuZnVuY3Rpb24gY2hlY2tNaXNzaW5nUHJvcCh7IGdlbiwgZGF0YSwgaXQ6IHsgb3B0cyB9IH0sIHByb3BlcnRpZXMsIG1pc3NpbmcpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5vcikoLi4ucHJvcGVydGllcy5tYXAoKHByb3ApID0+ICgwLCBjb2RlZ2VuXzEuYW5kKShub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcCwgb3B0cy5vd25Qcm9wZXJ0aWVzKSwgKDAsIGNvZGVnZW5fMS5fKSBgJHttaXNzaW5nfSA9ICR7cHJvcH1gKSkpO1xufVxuZXhwb3J0cy5jaGVja01pc3NpbmdQcm9wID0gY2hlY2tNaXNzaW5nUHJvcDtcbmZ1bmN0aW9uIHJlcG9ydE1pc3NpbmdQcm9wKGN4dCwgbWlzc2luZykge1xuICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6IG1pc3NpbmcgfSwgdHJ1ZSk7XG4gICAgY3h0LmVycm9yKCk7XG59XG5leHBvcnRzLnJlcG9ydE1pc3NpbmdQcm9wID0gcmVwb3J0TWlzc2luZ1Byb3A7XG5mdW5jdGlvbiBoYXNQcm9wRnVuYyhnZW4pIHtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJmdW5jXCIsIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmJvdW5kLW1ldGhvZFxuICAgICAgICByZWY6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGNvZGU6ICgwLCBjb2RlZ2VuXzEuXykgYE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlgLFxuICAgIH0pO1xufVxuZXhwb3J0cy5oYXNQcm9wRnVuYyA9IGhhc1Byb3BGdW5jO1xuZnVuY3Rpb24gaXNPd25Qcm9wZXJ0eShnZW4sIGRhdGEsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7aGFzUHJvcEZ1bmMoZ2VuKX0uY2FsbCgke2RhdGF9LCAke3Byb3BlcnR5fSlgO1xufVxuZXhwb3J0cy5pc093blByb3BlcnR5ID0gaXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIHByb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcGVydHksIG93blByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcGVydHkpfSAhPT0gdW5kZWZpbmVkYDtcbiAgICByZXR1cm4gb3duUHJvcGVydGllcyA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y29uZH0gJiYgJHtpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpfWAgOiBjb25kO1xufVxuZXhwb3J0cy5wcm9wZXJ0eUluRGF0YSA9IHByb3BlcnR5SW5EYXRhO1xuZnVuY3Rpb24gbm9Qcm9wZXJ0eUluRGF0YShnZW4sIGRhdGEsIHByb3BlcnR5LCBvd25Qcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHByb3BlcnR5KX0gPT09IHVuZGVmaW5lZGA7XG4gICAgcmV0dXJuIG93blByb3BlcnRpZXMgPyAoMCwgY29kZWdlbl8xLm9yKShjb25kLCAoMCwgY29kZWdlbl8xLm5vdCkoaXNPd25Qcm9wZXJ0eShnZW4sIGRhdGEsIHByb3BlcnR5KSkpIDogY29uZDtcbn1cbmV4cG9ydHMubm9Qcm9wZXJ0eUluRGF0YSA9IG5vUHJvcGVydHlJbkRhdGE7XG5mdW5jdGlvbiBhbGxTY2hlbWFQcm9wZXJ0aWVzKHNjaGVtYU1hcCkge1xuICAgIHJldHVybiBzY2hlbWFNYXAgPyBPYmplY3Qua2V5cyhzY2hlbWFNYXApLmZpbHRlcigocCkgPT4gcCAhPT0gXCJfX3Byb3RvX19cIikgOiBbXTtcbn1cbmV4cG9ydHMuYWxsU2NoZW1hUHJvcGVydGllcyA9IGFsbFNjaGVtYVByb3BlcnRpZXM7XG5mdW5jdGlvbiBzY2hlbWFQcm9wZXJ0aWVzKGl0LCBzY2hlbWFNYXApIHtcbiAgICByZXR1cm4gYWxsU2NoZW1hUHJvcGVydGllcyhzY2hlbWFNYXApLmZpbHRlcigocCkgPT4gISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWFNYXBbcF0pKTtcbn1cbmV4cG9ydHMuc2NoZW1hUHJvcGVydGllcyA9IHNjaGVtYVByb3BlcnRpZXM7XG5mdW5jdGlvbiBjYWxsVmFsaWRhdGVDb2RlKHsgc2NoZW1hQ29kZSwgZGF0YSwgaXQ6IHsgZ2VuLCB0b3BTY2hlbWFSZWYsIHNjaGVtYVBhdGgsIGVycm9yUGF0aCB9LCBpdCB9LCBmdW5jLCBjb250ZXh0LCBwYXNzU2NoZW1hKSB7XG4gICAgY29uc3QgZGF0YUFuZFNjaGVtYSA9IHBhc3NTY2hlbWEgPyAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9LCAke2RhdGF9LCAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9YCA6IGRhdGE7XG4gICAgY29uc3QgdmFsQ3h0ID0gW1xuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGVycm9yUGF0aCldLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsIGl0LnBhcmVudERhdGFdLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eSwgaXQucGFyZW50RGF0YVByb3BlcnR5XSxcbiAgICAgICAgW25hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhXSxcbiAgICBdO1xuICAgIGlmIChpdC5vcHRzLmR5bmFtaWNSZWYpXG4gICAgICAgIHZhbEN4dC5wdXNoKFtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnMsIG5hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc10pO1xuICAgIGNvbnN0IGFyZ3MgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFBbmRTY2hlbWF9LCAke2dlbi5vYmplY3QoLi4udmFsQ3h0KX1gO1xuICAgIHJldHVybiBjb250ZXh0ICE9PSBjb2RlZ2VuXzEubmlsID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtmdW5jfS5jYWxsKCR7Y29udGV4dH0sICR7YXJnc30pYCA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZnVuY30oJHthcmdzfSlgO1xufVxuZXhwb3J0cy5jYWxsVmFsaWRhdGVDb2RlID0gY2FsbFZhbGlkYXRlQ29kZTtcbmNvbnN0IG5ld1JlZ0V4cCA9ICgwLCBjb2RlZ2VuXzEuXykgYG5ldyBSZWdFeHBgO1xuZnVuY3Rpb24gdXNlUGF0dGVybih7IGdlbiwgaXQ6IHsgb3B0cyB9IH0sIHBhdHRlcm4pIHtcbiAgICBjb25zdCB1ID0gb3B0cy51bmljb2RlUmVnRXhwID8gXCJ1XCIgOiBcIlwiO1xuICAgIGNvbnN0IHsgcmVnRXhwIH0gPSBvcHRzLmNvZGU7XG4gICAgY29uc3QgcnggPSByZWdFeHAocGF0dGVybiwgdSk7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwicGF0dGVyblwiLCB7XG4gICAgICAgIGtleTogcngudG9TdHJpbmcoKSxcbiAgICAgICAgcmVmOiByeCxcbiAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgJHtyZWdFeHAuY29kZSA9PT0gXCJuZXcgUmVnRXhwXCIgPyBuZXdSZWdFeHAgOiAoMCwgdXRpbF8yLnVzZUZ1bmMpKGdlbiwgcmVnRXhwKX0oJHtwYXR0ZXJufSwgJHt1fSlgLFxuICAgIH0pO1xufVxuZXhwb3J0cy51c2VQYXR0ZXJuID0gdXNlUGF0dGVybjtcbmZ1bmN0aW9uIHZhbGlkYXRlQXJyYXkoY3h0KSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRBcnIgPSBnZW4ubGV0KFwidmFsaWRcIiwgdHJ1ZSk7XG4gICAgICAgIHZhbGlkYXRlSXRlbXMoKCkgPT4gZ2VuLmFzc2lnbih2YWxpZEFyciwgZmFsc2UpKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkQXJyO1xuICAgIH1cbiAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTtcbiAgICB2YWxpZGF0ZUl0ZW1zKCgpID0+IGdlbi5icmVhaygpKTtcbiAgICByZXR1cm4gdmFsaWQ7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyhub3RWYWxpZCkge1xuICAgICAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCAwLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBpLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksIG5vdFZhbGlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZUFycmF5ID0gdmFsaWRhdGVBcnJheTtcbmZ1bmN0aW9uIHZhbGlkYXRlVW5pb24oY3h0KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIGNvbnN0IGFsd2F5c1ZhbGlkID0gc2NoZW1hLnNvbWUoKHNjaCkgPT4gKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpO1xuICAgIGlmIChhbHdheXNWYWxpZCAmJiAhaXQub3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIGZhbHNlKTtcbiAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgIGdlbi5ibG9jaygoKSA9PiBzY2hlbWEuZm9yRWFjaCgoX3NjaCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICBzY2hlbWFQcm9wOiBpLFxuICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgfSwgc2NoVmFsaWQpO1xuICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkfSB8fCAke3NjaFZhbGlkfWApO1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBjeHQubWVyZ2VWYWxpZEV2YWx1YXRlZChzY2hDeHQsIHNjaFZhbGlkKTtcbiAgICAgICAgLy8gY2FuIHNob3J0LWNpcmN1aXQgaWYgYHVuZXZhbHVhdGVkUHJvcGVydGllcy9JdGVtc2Agbm90IHN1cHBvcnRlZCAob3B0cy51bmV2YWx1YXRlZCAhPT0gdHJ1ZSlcbiAgICAgICAgLy8gb3IgaWYgYWxsIHByb3BlcnRpZXMgYW5kIGl0ZW1zIHdlcmUgZXZhbHVhdGVkIChpdC5wcm9wcyA9PT0gdHJ1ZSAmJiBpdC5pdGVtcyA9PT0gdHJ1ZSlcbiAgICAgICAgaWYgKCFtZXJnZWQpXG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSk7XG4gICAgfSkpO1xuICAgIGN4dC5yZXN1bHQodmFsaWQsICgpID0+IGN4dC5yZXNldCgpLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xufVxuZXhwb3J0cy52YWxpZGF0ZVVuaW9uID0gdmFsaWRhdGVVbmlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpZFwiLFxuICAgIGNvZGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIFNVUFBPUlRFRDoga2V5d29yZCBcImlkXCIsIHVzZSBcIiRpZFwiIGZvciBzY2hlbWEgSUQnKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaWRfMSA9IHJlcXVpcmUoXCIuL2lkXCIpO1xuY29uc3QgcmVmXzEgPSByZXF1aXJlKFwiLi9yZWZcIik7XG5jb25zdCBjb3JlID0gW1xuICAgIFwiJHNjaGVtYVwiLFxuICAgIFwiJGlkXCIsXG4gICAgXCIkZGVmc1wiLFxuICAgIFwiJHZvY2FidWxhcnlcIixcbiAgICB7IGtleXdvcmQ6IFwiJGNvbW1lbnRcIiB9LFxuICAgIFwiZGVmaW5pdGlvbnNcIixcbiAgICBpZF8xLmRlZmF1bHQsXG4gICAgcmVmXzEuZGVmYXVsdCxcbl07XG5leHBvcnRzLmRlZmF1bHQgPSBjb3JlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNhbGxSZWYgPSBleHBvcnRzLmdldFZhbGlkYXRlID0gdm9pZCAwO1xuY29uc3QgcmVmX2Vycm9yXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCIkcmVmXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hOiAkcmVmLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IGJhc2VJZCwgc2NoZW1hRW52OiBlbnYsIHZhbGlkYXRlTmFtZSwgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IHsgcm9vdCB9ID0gZW52O1xuICAgICAgICBpZiAoKCRyZWYgPT09IFwiI1wiIHx8ICRyZWYgPT09IFwiIy9cIikgJiYgYmFzZUlkID09PSByb290LmJhc2VJZClcbiAgICAgICAgICAgIHJldHVybiBjYWxsUm9vdFJlZigpO1xuICAgICAgICBjb25zdCBzY2hPckVudiA9IGNvbXBpbGVfMS5yZXNvbHZlUmVmLmNhbGwoc2VsZiwgcm9vdCwgYmFzZUlkLCAkcmVmKTtcbiAgICAgICAgaWYgKHNjaE9yRW52ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgcmVmX2Vycm9yXzEuZGVmYXVsdChpdC5vcHRzLnVyaVJlc29sdmVyLCBiYXNlSWQsICRyZWYpO1xuICAgICAgICBpZiAoc2NoT3JFbnYgaW5zdGFuY2VvZiBjb21waWxlXzEuU2NoZW1hRW52KVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxWYWxpZGF0ZShzY2hPckVudik7XG4gICAgICAgIHJldHVybiBpbmxpbmVSZWZTY2hlbWEoc2NoT3JFbnYpO1xuICAgICAgICBmdW5jdGlvbiBjYWxsUm9vdFJlZigpIHtcbiAgICAgICAgICAgIGlmIChlbnYgPT09IHJvb3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxSZWYoY3h0LCB2YWxpZGF0ZU5hbWUsIGVudiwgZW52LiRhc3luYyk7XG4gICAgICAgICAgICBjb25zdCByb290TmFtZSA9IGdlbi5zY29wZVZhbHVlKFwicm9vdFwiLCB7IHJlZjogcm9vdCB9KTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsUmVmKGN4dCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtyb290TmFtZX0udmFsaWRhdGVgLCByb290LCByb290LiRhc3luYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FsbFZhbGlkYXRlKHNjaCkge1xuICAgICAgICAgICAgY29uc3QgdiA9IGdldFZhbGlkYXRlKGN4dCwgc2NoKTtcbiAgICAgICAgICAgIGNhbGxSZWYoY3h0LCB2LCBzY2gsIHNjaC4kYXN5bmMpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlubGluZVJlZlNjaGVtYShzY2gpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaE5hbWUgPSBnZW4uc2NvcGVWYWx1ZShcInNjaGVtYVwiLCBvcHRzLmNvZGUuc291cmNlID09PSB0cnVlID8geyByZWY6IHNjaCwgY29kZTogKDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKHNjaCkgfSA6IHsgcmVmOiBzY2ggfSk7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZXM6IFtdLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6IGNvZGVnZW5fMS5uaWwsXG4gICAgICAgICAgICAgICAgdG9wU2NoZW1hUmVmOiBzY2hOYW1lLFxuICAgICAgICAgICAgICAgIGVyclNjaGVtYVBhdGg6ICRyZWYsXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0KTtcbiAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmZ1bmN0aW9uIGdldFZhbGlkYXRlKGN4dCwgc2NoKSB7XG4gICAgY29uc3QgeyBnZW4gfSA9IGN4dDtcbiAgICByZXR1cm4gc2NoLnZhbGlkYXRlXG4gICAgICAgID8gZ2VuLnNjb3BlVmFsdWUoXCJ2YWxpZGF0ZVwiLCB7IHJlZjogc2NoLnZhbGlkYXRlIH0pXG4gICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtnZW4uc2NvcGVWYWx1ZShcIndyYXBwZXJcIiwgeyByZWY6IHNjaCB9KX0udmFsaWRhdGVgO1xufVxuZXhwb3J0cy5nZXRWYWxpZGF0ZSA9IGdldFZhbGlkYXRlO1xuZnVuY3Rpb24gY2FsbFJlZihjeHQsIHYsIHNjaCwgJGFzeW5jKSB7XG4gICAgY29uc3QgeyBnZW4sIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBhbGxFcnJvcnMsIHNjaGVtYUVudjogZW52LCBvcHRzIH0gPSBpdDtcbiAgICBjb25zdCBwYXNzQ3h0ID0gb3B0cy5wYXNzQ29udGV4dCA/IG5hbWVzXzEuZGVmYXVsdC50aGlzIDogY29kZWdlbl8xLm5pbDtcbiAgICBpZiAoJGFzeW5jKVxuICAgICAgICBjYWxsQXN5bmNSZWYoKTtcbiAgICBlbHNlXG4gICAgICAgIGNhbGxTeW5jUmVmKCk7XG4gICAgZnVuY3Rpb24gY2FsbEFzeW5jUmVmKCkge1xuICAgICAgICBpZiAoIWVudi4kYXN5bmMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBzY2hlbWEgcmVmZXJlbmNlZCBieSBzeW5jIHNjaGVtYVwiKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgICAgIGdlbi50cnkoKCkgPT4ge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgYXdhaXQgJHsoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdiwgcGFzc0N4dCl9YCk7XG4gICAgICAgICAgICBhZGRFdmFsdWF0ZWRGcm9tKHYpOyAvLyBUT0RPIHdpbGwgbm90IHdvcmsgd2l0aCBhc3luYywgaXQgaGFzIHRvIGJlIHJldHVybmVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgISgke2V9IGluc3RhbmNlb2YgJHtpdC5WYWxpZGF0aW9uRXJyb3J9KWAsICgpID0+IGdlbi50aHJvdyhlKSk7XG4gICAgICAgICAgICBhZGRFcnJvcnNGcm9tKGUpO1xuICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsbFN5bmNSZWYoKSB7XG4gICAgICAgIGN4dC5yZXN1bHQoKDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHYsIHBhc3NDeHQpLCAoKSA9PiBhZGRFdmFsdWF0ZWRGcm9tKHYpLCAoKSA9PiBhZGRFcnJvcnNGcm9tKHYpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRXJyb3JzRnJvbShzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgZXJycyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5lcnJvcnNgO1xuICAgICAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbCA/ICR7ZXJyc30gOiAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5jb25jYXQoJHtlcnJzfSlgKTsgLy8gVE9ETyB0YWdnZWRcbiAgICAgICAgZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRXZhbHVhdGVkRnJvbShzb3VyY2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWl0Lm9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHNjaEV2YWx1YXRlZCA9IChfYSA9IHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC52YWxpZGF0ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2YWx1YXRlZDtcbiAgICAgICAgLy8gVE9ETyByZWZhY3RvclxuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQgJiYgIXNjaEV2YWx1YXRlZC5keW5hbWljUHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkLnByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBzY2hFdmFsdWF0ZWQucHJvcHMsIGl0LnByb3BzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IGdlbi52YXIoXCJwcm9wc1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke3NvdXJjZX0uZXZhbHVhdGVkLnByb3BzYCk7XG4gICAgICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBwcm9wcywgaXQucHJvcHMsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQuaXRlbXMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQgJiYgIXNjaEV2YWx1YXRlZC5keW5hbWljSXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hFdmFsdWF0ZWQuaXRlbXMsIGl0Lml0ZW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdlbi52YXIoXCJpdGVtc1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke3NvdXJjZX0uZXZhbHVhdGVkLml0ZW1zYCk7XG4gICAgICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBpdGVtcywgaXQuaXRlbXMsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2FsbFJlZiA9IGNhbGxSZWY7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9kaXNjcmltaW5hdG9yL3R5cGVzXCIpO1xuY29uc3QgY29tcGlsZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGRpc2NyRXJyb3IsIHRhZ05hbWUgfSB9KSA9PiBkaXNjckVycm9yID09PSB0eXBlc18xLkRpc2NyRXJyb3IuVGFnXG4gICAgICAgID8gYHRhZyBcIiR7dGFnTmFtZX1cIiBtdXN0IGJlIHN0cmluZ2BcbiAgICAgICAgOiBgdmFsdWUgb2YgdGFnIFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgaW4gb25lT2ZgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGRpc2NyRXJyb3IsIHRhZywgdGFnTmFtZSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtlcnJvcjogJHtkaXNjckVycm9yfSwgdGFnOiAke3RhZ05hbWV9LCB0YWdWYWx1ZTogJHt0YWd9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZGlzY3JpbWluYXRvclwiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb25lT2YgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaWYgKCFpdC5vcHRzLmRpc2NyaW1pbmF0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IHJlcXVpcmVzIGRpc2NyaW1pbmF0b3Igb3B0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBzY2hlbWEucHJvcGVydHlOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIHRhZ05hbWUgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IHJlcXVpcmVzIHByb3BlcnR5TmFtZVwiKTtcbiAgICAgICAgaWYgKHNjaGVtYS5tYXBwaW5nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogbWFwcGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICBpZiAoIW9uZU9mKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgb25lT2Yga2V5d29yZFwiKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgICAgICBjb25zdCB0YWcgPSBnZW4uY29uc3QoXCJ0YWdcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkodGFnTmFtZSl9YCk7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHt0YWd9ID09IFwic3RyaW5nXCJgLCAoKSA9PiB2YWxpZGF0ZU1hcHBpbmcoKSwgKCkgPT4gY3h0LmVycm9yKGZhbHNlLCB7IGRpc2NyRXJyb3I6IHR5cGVzXzEuRGlzY3JFcnJvci5UYWcsIHRhZywgdGFnTmFtZSB9KSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlTWFwcGluZygpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBnZXRNYXBwaW5nKCk7XG4gICAgICAgICAgICBnZW4uaWYoZmFsc2UpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0YWdWYWx1ZSBpbiBtYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke3RhZ30gPT09ICR7dGFnVmFsdWV9YCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgYXBwbHlUYWdTY2hlbWEobWFwcGluZ1t0YWdWYWx1ZV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICBjeHQuZXJyb3IoZmFsc2UsIHsgZGlzY3JFcnJvcjogdHlwZXNfMS5EaXNjckVycm9yLk1hcHBpbmcsIHRhZywgdGFnTmFtZSB9KTtcbiAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5VGFnU2NoZW1hKHNjaGVtYVByb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IF92YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZDogXCJvbmVPZlwiLCBzY2hlbWFQcm9wIH0sIF92YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0LCBjb2RlZ2VuXzEuTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gX3ZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE1hcHBpbmcoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBvbmVPZk1hcHBpbmcgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IHRvcFJlcXVpcmVkID0gaGFzUmVxdWlyZWQocGFyZW50U2NoZW1hKTtcbiAgICAgICAgICAgIGxldCB0YWdSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZU9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjaCA9IG9uZU9mW2ldO1xuICAgICAgICAgICAgICAgIGlmICgoc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLiRyZWYpICYmICEoMCwgdXRpbF8xLnNjaGVtYUhhc1J1bGVzQnV0UmVmKShzY2gsIGl0LnNlbGYuUlVMRVMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaCA9IGNvbXBpbGVfMS5yZXNvbHZlUmVmLmNhbGwoaXQuc2VsZiwgaXQuc2NoZW1hRW52LnJvb3QsIGl0LmJhc2VJZCwgc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLiRyZWYpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoIGluc3RhbmNlb2YgY29tcGlsZV8xLlNjaGVtYUVudilcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaCA9IHNjaC5zY2hlbWE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BTY2ggPSAoX2EgPSBzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2gucHJvcGVydGllcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RhZ05hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcFNjaCAhPSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogb25lT2Ygc3Vic2NoZW1hcyAob3IgcmVmZXJlbmNlZCBzY2hlbWFzKSBtdXN0IGhhdmUgXCJwcm9wZXJ0aWVzLyR7dGFnTmFtZX1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWdSZXF1aXJlZCA9IHRhZ1JlcXVpcmVkICYmICh0b3BSZXF1aXJlZCB8fCBoYXNSZXF1aXJlZChzY2gpKTtcbiAgICAgICAgICAgICAgICBhZGRNYXBwaW5ncyhwcm9wU2NoLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGFnUmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBcIiR7dGFnTmFtZX1cIiBtdXN0IGJlIHJlcXVpcmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gb25lT2ZNYXBwaW5nO1xuICAgICAgICAgICAgZnVuY3Rpb24gaGFzUmVxdWlyZWQoeyByZXF1aXJlZCB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmVxdWlyZWQpICYmIHJlcXVpcmVkLmluY2x1ZGVzKHRhZ05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTWFwcGluZ3Moc2NoLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjaC5jb25zdCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRNYXBwaW5nKHNjaC5jb25zdCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjaC5lbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFnVmFsdWUgb2Ygc2NoLmVudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE1hcHBpbmcodGFnVmFsdWUsIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IFwicHJvcGVydGllcy8ke3RhZ05hbWV9XCIgbXVzdCBoYXZlIFwiY29uc3RcIiBvciBcImVudW1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE1hcHBpbmcodGFnVmFsdWUsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhZ1ZhbHVlICE9IFwic3RyaW5nXCIgfHwgdGFnVmFsdWUgaW4gb25lT2ZNYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogXCIke3RhZ05hbWV9XCIgdmFsdWVzIG11c3QgYmUgdW5pcXVlIHN0cmluZ3NgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb25lT2ZNYXBwaW5nW3RhZ1ZhbHVlXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaXNjckVycm9yID0gdm9pZCAwO1xudmFyIERpc2NyRXJyb3I7XG4oZnVuY3Rpb24gKERpc2NyRXJyb3IpIHtcbiAgICBEaXNjckVycm9yW1wiVGFnXCJdID0gXCJ0YWdcIjtcbiAgICBEaXNjckVycm9yW1wiTWFwcGluZ1wiXSA9IFwibWFwcGluZ1wiO1xufSkoRGlzY3JFcnJvciA9IGV4cG9ydHMuRGlzY3JFcnJvciB8fCAoZXhwb3J0cy5EaXNjckVycm9yID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29yZV8xID0gcmVxdWlyZShcIi4vY29yZVwiKTtcbmNvbnN0IHZhbGlkYXRpb25fMSA9IHJlcXVpcmUoXCIuL3ZhbGlkYXRpb25cIik7XG5jb25zdCBhcHBsaWNhdG9yXzEgPSByZXF1aXJlKFwiLi9hcHBsaWNhdG9yXCIpO1xuY29uc3QgZm9ybWF0XzEgPSByZXF1aXJlKFwiLi9mb3JtYXRcIik7XG5jb25zdCBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG5jb25zdCBkcmFmdDdWb2NhYnVsYXJpZXMgPSBbXG4gICAgY29yZV8xLmRlZmF1bHQsXG4gICAgdmFsaWRhdGlvbl8xLmRlZmF1bHQsXG4gICAgKDAsIGFwcGxpY2F0b3JfMS5kZWZhdWx0KSgpLFxuICAgIGZvcm1hdF8xLmRlZmF1bHQsXG4gICAgbWV0YWRhdGFfMS5tZXRhZGF0YVZvY2FidWxhcnksXG4gICAgbWV0YWRhdGFfMS5jb250ZW50Vm9jYWJ1bGFyeSxcbl07XG5leHBvcnRzLmRlZmF1bHQgPSBkcmFmdDdWb2NhYnVsYXJpZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcmFmdDcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgbWF0Y2ggZm9ybWF0IFwiJHtzY2hlbWFDb2RlfVwiYCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2Zvcm1hdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImZvcm1hdFwiLFxuICAgIHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSxcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0LCBydWxlVHlwZSkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvcHRzLCBlcnJTY2hlbWFQYXRoLCBzY2hlbWFFbnYsIHNlbGYgfSA9IGl0O1xuICAgICAgICBpZiAoIW9wdHMudmFsaWRhdGVGb3JtYXRzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoJGRhdGEpXG4gICAgICAgICAgICB2YWxpZGF0ZSREYXRhRm9ybWF0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHZhbGlkYXRlRm9ybWF0KCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlJERhdGFGb3JtYXQoKSB7XG4gICAgICAgICAgICBjb25zdCBmbXRzID0gZ2VuLnNjb3BlVmFsdWUoXCJmb3JtYXRzXCIsIHtcbiAgICAgICAgICAgICAgICByZWY6IHNlbGYuZm9ybWF0cyxcbiAgICAgICAgICAgICAgICBjb2RlOiBvcHRzLmNvZGUuZm9ybWF0cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZkRlZiA9IGdlbi5jb25zdChcImZEZWZcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXRzfVske3NjaGVtYUNvZGV9XWApO1xuICAgICAgICAgICAgY29uc3QgZlR5cGUgPSBnZW4ubGV0KFwiZlR5cGVcIik7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBnZW4ubGV0KFwiZm9ybWF0XCIpO1xuICAgICAgICAgICAgLy8gVE9ETyBzaW1wbGlmeVxuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2ZEZWZ9ID09IFwib2JqZWN0XCIgJiYgISgke2ZEZWZ9IGluc3RhbmNlb2YgUmVnRXhwKWAsICgpID0+IGdlbi5hc3NpZ24oZlR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZkRlZn0udHlwZSB8fCBcInN0cmluZ1wiYCkuYXNzaWduKGZvcm1hdCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmRGVmfS52YWxpZGF0ZWApLCAoKSA9PiBnZW4uYXNzaWduKGZUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGBcInN0cmluZ1wiYCkuYXNzaWduKGZvcm1hdCwgZkRlZikpO1xuICAgICAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLm9yKSh1bmtub3duRm10KCksIGludmFsaWRGbXQoKSkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gdW5rbm93bkZtdCgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5zdHJpY3RTY2hlbWEgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSAmJiAhJHtmb3JtYXR9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGludmFsaWRGbXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbEZvcm1hdCA9IHNjaGVtYUVudi4kYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGAoJHtmRGVmfS5hc3luYyA/IGF3YWl0ICR7Zm9ybWF0fSgke2RhdGF9KSA6ICR7Zm9ybWF0fSgke2RhdGF9KSlgXG4gICAgICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtmb3JtYXR9KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZERhdGEgPSAoMCwgY29kZWdlbl8xLl8pIGAodHlwZW9mICR7Zm9ybWF0fSA9PSBcImZ1bmN0aW9uXCIgPyAke2NhbGxGb3JtYXR9IDogJHtmb3JtYXR9LnRlc3QoJHtkYXRhfSkpYDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtmb3JtYXR9ICYmICR7Zm9ybWF0fSAhPT0gdHJ1ZSAmJiAke2ZUeXBlfSA9PT0gJHtydWxlVHlwZX0gJiYgISR7dmFsaWREYXRhfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXREZWYgPSBzZWxmLmZvcm1hdHNbc2NoZW1hXTtcbiAgICAgICAgICAgIGlmICghZm9ybWF0RGVmKSB7XG4gICAgICAgICAgICAgICAgdW5rbm93bkZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXREZWYgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgW2ZtdFR5cGUsIGZvcm1hdCwgZm10UmVmXSA9IGdldEZvcm1hdChmb3JtYXREZWYpO1xuICAgICAgICAgICAgaWYgKGZtdFR5cGUgPT09IHJ1bGVUeXBlKVxuICAgICAgICAgICAgICAgIGN4dC5wYXNzKHZhbGlkQ29uZGl0aW9uKCkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gdW5rbm93bkZvcm1hdCgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5zdHJpY3RTY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4odW5rbm93bk1zZygpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodW5rbm93bk1zZygpKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duTXNnKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHVua25vd24gZm9ybWF0IFwiJHtzY2hlbWF9XCIgaWdub3JlZCBpbiBzY2hlbWEgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cImA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybWF0KGZtdERlZikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBmbXREZWYgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLnJlZ2V4cENvZGUpKGZtdERlZilcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRzLmNvZGUuZm9ybWF0c1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGAke29wdHMuY29kZS5mb3JtYXRzfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoc2NoZW1hKX1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmbXQgPSBnZW4uc2NvcGVWYWx1ZShcImZvcm1hdHNcIiwgeyBrZXk6IHNjaGVtYSwgcmVmOiBmbXREZWYsIGNvZGUgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmbXREZWYgPT0gXCJvYmplY3RcIiAmJiAhKGZtdERlZiBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtmbXREZWYudHlwZSB8fCBcInN0cmluZ1wiLCBmbXREZWYudmFsaWRhdGUsICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10fS52YWxpZGF0ZWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW1wic3RyaW5nXCIsIGZtdERlZiwgZm10XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHZhbGlkQ29uZGl0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybWF0RGVmID09IFwib2JqZWN0XCIgJiYgIShmb3JtYXREZWYgaW5zdGFuY2VvZiBSZWdFeHApICYmIGZvcm1hdERlZi5hc3luYykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNjaGVtYUVudi4kYXN5bmMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBmb3JtYXQgaW4gc3luYyBzY2hlbWFcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCAke2ZtdFJlZn0oJHtkYXRhfSlgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGZvcm1hdCA9PSBcImZ1bmN0aW9uXCIgPyAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdFJlZn0oJHtkYXRhfSlgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXRSZWZ9LnRlc3QoJHtkYXRhfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JtYXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmb3JtYXRfMSA9IHJlcXVpcmUoXCIuL2Zvcm1hdFwiKTtcbmNvbnN0IGZvcm1hdCA9IFtmb3JtYXRfMS5kZWZhdWx0XTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZvcm1hdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb250ZW50Vm9jYWJ1bGFyeSA9IGV4cG9ydHMubWV0YWRhdGFWb2NhYnVsYXJ5ID0gdm9pZCAwO1xuZXhwb3J0cy5tZXRhZGF0YVZvY2FidWxhcnkgPSBbXG4gICAgXCJ0aXRsZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImRlZmF1bHRcIixcbiAgICBcImRlcHJlY2F0ZWRcIixcbiAgICBcInJlYWRPbmx5XCIsXG4gICAgXCJ3cml0ZU9ubHlcIixcbiAgICBcImV4YW1wbGVzXCIsXG5dO1xuZXhwb3J0cy5jb250ZW50Vm9jYWJ1bGFyeSA9IFtcbiAgICBcImNvbnRlbnRNZWRpYVR5cGVcIixcbiAgICBcImNvbnRlbnRFbmNvZGluZ1wiLFxuICAgIFwiY29udGVudFNjaGVtYVwiLFxuXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1ldGFkYXRhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcXVhbF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvZXF1YWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgYmUgZXF1YWwgdG8gY29uc3RhbnRcIixcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2FsbG93ZWRWYWx1ZTogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImNvbnN0XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWFDb2RlLCBzY2hlbWEgfSA9IGN4dDtcbiAgICAgICAgaWYgKCRkYXRhIHx8IChzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiKSkge1xuICAgICAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAhJHsoMCwgdXRpbF8xLnVzZUZ1bmMpKGdlbiwgZXF1YWxfMS5kZWZhdWx0KX0oJHtkYXRhfSwgJHtzY2hlbWFDb2RlfSlgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN4dC5mYWlsKCgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hfSAhPT0gJHtkYXRhfWApO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXF1YWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2VxdWFsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IGJlIGVxdWFsIHRvIG9uZSBvZiB0aGUgYWxsb3dlZCB2YWx1ZXNcIixcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2FsbG93ZWRWYWx1ZXM6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJlbnVtXCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoISRkYXRhICYmIHNjaGVtYS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlbnVtIG11c3QgaGF2ZSBub24tZW1wdHkgYXJyYXlcIik7XG4gICAgICAgIGNvbnN0IHVzZUxvb3AgPSBzY2hlbWEubGVuZ3RoID49IGl0Lm9wdHMubG9vcEVudW07XG4gICAgICAgIGxldCBlcWw7XG4gICAgICAgIGNvbnN0IGdldEVxbCA9ICgpID0+IChlcWwgIT09IG51bGwgJiYgZXFsICE9PSB2b2lkIDAgPyBlcWwgOiAoZXFsID0gKDAsIHV0aWxfMS51c2VGdW5jKShnZW4sIGVxdWFsXzEuZGVmYXVsdCkpKTtcbiAgICAgICAgbGV0IHZhbGlkO1xuICAgICAgICBpZiAodXNlTG9vcCB8fCAkZGF0YSkge1xuICAgICAgICAgICAgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgICAgICAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgbG9vcEVudW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgICAgICBjb25zdCB2U2NoZW1hID0gZ2VuLmNvbnN0KFwidlNjaGVtYVwiLCBzY2hlbWFDb2RlKTtcbiAgICAgICAgICAgIHZhbGlkID0gKDAsIGNvZGVnZW5fMS5vcikoLi4uc2NoZW1hLm1hcCgoX3gsIGkpID0+IGVxdWFsQ29kZSh2U2NoZW1hLCBpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGN4dC5wYXNzKHZhbGlkKTtcbiAgICAgICAgZnVuY3Rpb24gbG9vcEVudW0oKSB7XG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSk7XG4gICAgICAgICAgICBnZW4uZm9yT2YoXCJ2XCIsIHNjaGVtYUNvZGUsICh2KSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtnZXRFcWwoKX0oJHtkYXRhfSwgJHt2fSlgLCAoKSA9PiBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKS5icmVhaygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZXF1YWxDb2RlKHZTY2hlbWEsIGkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaCA9IHNjaGVtYVtpXTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygc2NoID09PSBcIm9iamVjdFwiICYmIHNjaCAhPT0gbnVsbFxuICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtnZXRFcWwoKX0oJHtkYXRhfSwgJHt2U2NoZW1hfVske2l9XSlgXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSAke3NjaH1gO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnVtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbGltaXROdW1iZXJfMSA9IHJlcXVpcmUoXCIuL2xpbWl0TnVtYmVyXCIpO1xuY29uc3QgbXVsdGlwbGVPZl8xID0gcmVxdWlyZShcIi4vbXVsdGlwbGVPZlwiKTtcbmNvbnN0IGxpbWl0TGVuZ3RoXzEgPSByZXF1aXJlKFwiLi9saW1pdExlbmd0aFwiKTtcbmNvbnN0IHBhdHRlcm5fMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5cIik7XG5jb25zdCBsaW1pdFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2xpbWl0UHJvcGVydGllc1wiKTtcbmNvbnN0IHJlcXVpcmVkXzEgPSByZXF1aXJlKFwiLi9yZXF1aXJlZFwiKTtcbmNvbnN0IGxpbWl0SXRlbXNfMSA9IHJlcXVpcmUoXCIuL2xpbWl0SXRlbXNcIik7XG5jb25zdCB1bmlxdWVJdGVtc18xID0gcmVxdWlyZShcIi4vdW5pcXVlSXRlbXNcIik7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jb25zdCBlbnVtXzEgPSByZXF1aXJlKFwiLi9lbnVtXCIpO1xuY29uc3QgdmFsaWRhdGlvbiA9IFtcbiAgICAvLyBudW1iZXJcbiAgICBsaW1pdE51bWJlcl8xLmRlZmF1bHQsXG4gICAgbXVsdGlwbGVPZl8xLmRlZmF1bHQsXG4gICAgLy8gc3RyaW5nXG4gICAgbGltaXRMZW5ndGhfMS5kZWZhdWx0LFxuICAgIHBhdHRlcm5fMS5kZWZhdWx0LFxuICAgIC8vIG9iamVjdFxuICAgIGxpbWl0UHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgcmVxdWlyZWRfMS5kZWZhdWx0LFxuICAgIC8vIGFycmF5XG4gICAgbGltaXRJdGVtc18xLmRlZmF1bHQsXG4gICAgdW5pcXVlSXRlbXNfMS5kZWZhdWx0LFxuICAgIC8vIGFueVxuICAgIHsga2V5d29yZDogXCJ0eXBlXCIsIHNjaGVtYVR5cGU6IFtcInN0cmluZ1wiLCBcImFycmF5XCJdIH0sXG4gICAgeyBrZXl3b3JkOiBcIm51bGxhYmxlXCIsIHNjaGVtYVR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgY29uc3RfMS5kZWZhdWx0LFxuICAgIGVudW1fMS5kZWZhdWx0LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heEl0ZW1zXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBpdGVtc2A7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heEl0ZW1zXCIsIFwibWluSXRlbXNcIl0sXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhJdGVtc1wiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGggJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgdWNzMmxlbmd0aF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvdWNzMmxlbmd0aFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2UoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pIHtcbiAgICAgICAgY29uc3QgY29tcCA9IGtleXdvcmQgPT09IFwibWF4TGVuZ3RoXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBjaGFyYWN0ZXJzYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4TGVuZ3RoXCIsIFwibWluTGVuZ3RoXCJdLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhMZW5ndGhcIiA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuR1QgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLkxUO1xuICAgICAgICBjb25zdCBsZW4gPSBpdC5vcHRzLnVuaWNvZGUgPT09IGZhbHNlID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgdXRpbF8xLnVzZUZ1bmMpKGN4dC5nZW4sIHVjczJsZW5ndGhfMS5kZWZhdWx0KX0oJHtkYXRhfSlgO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSAke29wfSAke3NjaGVtYUNvZGV9YCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdExlbmd0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBvcHMgPSBjb2RlZ2VuXzEub3BlcmF0b3JzO1xuY29uc3QgS1dEcyA9IHtcbiAgICBtYXhpbXVtOiB7IG9rU3RyOiBcIjw9XCIsIG9rOiBvcHMuTFRFLCBmYWlsOiBvcHMuR1QgfSxcbiAgICBtaW5pbXVtOiB7IG9rU3RyOiBcIj49XCIsIG9rOiBvcHMuR1RFLCBmYWlsOiBvcHMuTFQgfSxcbiAgICBleGNsdXNpdmVNYXhpbXVtOiB7IG9rU3RyOiBcIjxcIiwgb2s6IG9wcy5MVCwgZmFpbDogb3BzLkdURSB9LFxuICAgIGV4Y2x1c2l2ZU1pbmltdW06IHsgb2tTdHI6IFwiPlwiLCBvazogb3BzLkdULCBmYWlsOiBvcHMuTFRFIH0sXG59O1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgYmUgJHtLV0RzW2tleXdvcmRdLm9rU3RyfSAke3NjaGVtYUNvZGV9YCxcbiAgICBwYXJhbXM6ICh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2NvbXBhcmlzb246ICR7S1dEc1trZXl3b3JkXS5va1N0cn0sIGxpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IE9iamVjdC5rZXlzKEtXRHMpLFxuICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUgfSA9IGN4dDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICR7S1dEc1trZXl3b3JkXS5mYWlsfSAke3NjaGVtYUNvZGV9IHx8IGlzTmFOKCR7ZGF0YX0pYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdE51bWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heFByb3BlcnRpZXNcIiA/IFwibW9yZVwiIDogXCJmZXdlclwiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlICR7Y29tcH0gdGhhbiAke3NjaGVtYUNvZGV9IHByb3BlcnRpZXNgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJtYXhQcm9wZXJ0aWVzXCIsIFwibWluUHJvcGVydGllc1wiXSxcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhQcm9wZXJ0aWVzXCIgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkdUIDogY29kZWdlbl8xLm9wZXJhdG9ycy5MVDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGBPYmplY3Qua2V5cygke2RhdGF9KS5sZW5ndGggJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRQcm9wZXJ0aWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGJlIG11bHRpcGxlIG9mICR7c2NoZW1hQ29kZX1gLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bXVsdGlwbGVPZjogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm11bHRpcGxlT2ZcIixcbiAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8vIGNvbnN0IGJkdCA9IGJhZCREYXRhVHlwZShzY2hlbWFDb2RlLCA8c3RyaW5nPmRlZi5zY2hlbWFUeXBlLCAkZGF0YSlcbiAgICAgICAgY29uc3QgcHJlYyA9IGl0Lm9wdHMubXVsdGlwbGVPZlByZWNpc2lvbjtcbiAgICAgICAgY29uc3QgcmVzID0gZ2VuLmxldChcInJlc1wiKTtcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHByZWNcbiAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgTWF0aC5hYnMoTWF0aC5yb3VuZCgke3Jlc30pIC0gJHtyZXN9KSA+IDFlLSR7cHJlY31gXG4gICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7cmVzfSAhPT0gcGFyc2VJbnQoJHtyZXN9KWA7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgKCR7c2NoZW1hQ29kZX0gPT09IDAgfHwgKCR7cmVzfSA9ICR7ZGF0YX0vJHtzY2hlbWFDb2RlfSwgJHtpbnZhbGlkfSkpYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aXBsZU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgbWF0Y2ggcGF0dGVybiBcIiR7c2NoZW1hQ29kZX1cImAsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwYXR0ZXJuOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicGF0dGVyblwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8vIFRPRE8gcmVnZXhwIHNob3VsZCBiZSB3cmFwcGVkIGluIHRyeS9jYXRjaHNcbiAgICAgICAgY29uc3QgdSA9IGl0Lm9wdHMudW5pY29kZVJlZ0V4cCA/IFwidVwiIDogXCJcIjtcbiAgICAgICAgY29uc3QgcmVnRXhwID0gJGRhdGEgPyAoMCwgY29kZWdlbl8xLl8pIGAobmV3IFJlZ0V4cCgke3NjaGVtYUNvZGV9LCAke3V9KSlgIDogKDAsIGNvZGVfMS51c2VQYXR0ZXJuKShjeHQsIHNjaGVtYSk7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgISR7cmVnRXhwfS50ZXN0KCR7ZGF0YX0pYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXR0ZXJuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBtaXNzaW5nUHJvcGVydHkgfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgaGF2ZSByZXF1aXJlZCBwcm9wZXJ0eSAnJHttaXNzaW5nUHJvcGVydHl9J2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge21pc3NpbmdQcm9wZXJ0eTogJHttaXNzaW5nUHJvcGVydHl9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicmVxdWlyZWRcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBzY2hlbWFDb2RlLCBkYXRhLCAkZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvcHRzIH0gPSBpdDtcbiAgICAgICAgaWYgKCEkZGF0YSAmJiBzY2hlbWEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB1c2VMb29wID0gc2NoZW1hLmxlbmd0aCA+PSBvcHRzLmxvb3BSZXF1aXJlZDtcbiAgICAgICAgaWYgKGl0LmFsbEVycm9ycylcbiAgICAgICAgICAgIGFsbEVycm9yc01vZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZXhpdE9uRXJyb3JNb2RlKCk7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdFJlcXVpcmVkKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IGN4dC5wYXJlbnRTY2hlbWEucHJvcGVydGllcztcbiAgICAgICAgICAgIGNvbnN0IHsgZGVmaW5lZFByb3BlcnRpZXMgfSA9IGN4dC5pdDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVxdWlyZWRLZXkgb2Ygc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgaWYgKChwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHNbcmVxdWlyZWRLZXldKSA9PT0gdW5kZWZpbmVkICYmICFkZWZpbmVkUHJvcGVydGllcy5oYXMocmVxdWlyZWRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVBhdGggPSBpdC5zY2hlbWFFbnYuYmFzZUlkICsgaXQuZXJyU2NoZW1hUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXNnID0gYHJlcXVpcmVkIHByb3BlcnR5IFwiJHtyZXF1aXJlZEtleX1cIiBpcyBub3QgZGVmaW5lZCBhdCBcIiR7c2NoZW1hUGF0aH1cIiAoc3RyaWN0UmVxdWlyZWQpYDtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIGl0Lm9wdHMuc3RyaWN0UmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhbGxFcnJvcnNNb2RlKCkge1xuICAgICAgICAgICAgaWYgKHVzZUxvb3AgfHwgJGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjeHQuYmxvY2skZGF0YShjb2RlZ2VuXzEubmlsLCBsb29wQWxsUmVxdWlyZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgY29kZV8xLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3ApKGN4dCwgcHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGV4aXRPbkVycm9yTW9kZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pc3NpbmcgPSBnZW4ubGV0KFwibWlzc2luZ1wiKTtcbiAgICAgICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsICgpID0+IGxvb3BVbnRpbE1pc3NpbmcobWlzc2luZywgdmFsaWQpKTtcbiAgICAgICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEuY2hlY2tNaXNzaW5nUHJvcCkoY3h0LCBzY2hlbWEsIG1pc3NpbmcpKTtcbiAgICAgICAgICAgICAgICAoMCwgY29kZV8xLnJlcG9ydE1pc3NpbmdQcm9wKShjeHQsIG1pc3NpbmcpO1xuICAgICAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcEFsbFJlcXVpcmVkKCkge1xuICAgICAgICAgICAgZ2VuLmZvck9mKFwicHJvcFwiLCBzY2hlbWFDb2RlLCAocHJvcCkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6IHByb3AgfSk7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEubm9Qcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBwcm9wLCBvcHRzLm93blByb3BlcnRpZXMpLCAoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wVW50aWxNaXNzaW5nKG1pc3NpbmcsIHZhbGlkKSB7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiBtaXNzaW5nIH0pO1xuICAgICAgICAgICAgZ2VuLmZvck9mKG1pc3NpbmcsIHNjaGVtYUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCAoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIG1pc3NpbmcsIG9wdHMub3duUHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGNvZGVnZW5fMS5uaWwpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1aXJlZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRhdGFUeXBlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXF1YWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2VxdWFsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGksIGogfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgZHVwbGljYXRlIGl0ZW1zIChpdGVtcyAjIyAke2p9IGFuZCAke2l9IGFyZSBpZGVudGljYWwpYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBpLCBqIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2k6ICR7aX0sIGo6ICR7an19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBcImJvb2xlYW5cIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoISRkYXRhICYmICFzY2hlbWEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIpO1xuICAgICAgICBjb25zdCBpdGVtVHlwZXMgPSBwYXJlbnRTY2hlbWEuaXRlbXMgPyAoMCwgZGF0YVR5cGVfMS5nZXRTY2hlbWFUeXBlcykocGFyZW50U2NoZW1hLml0ZW1zKSA6IFtdO1xuICAgICAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgdmFsaWRhdGVVbmlxdWVJdGVtcywgKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSA9PT0gZmFsc2VgKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVVbmlxdWVJdGVtcygpIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBnZW4ubGV0KFwiaVwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICAgICAgY29uc3QgaiA9IGdlbi5sZXQoXCJqXCIpO1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGksIGogfSk7XG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l9ID4gMWAsICgpID0+IChjYW5PcHRpbWl6ZSgpID8gbG9vcE4gOiBsb29wTjIpKGksIGopKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYW5PcHRpbWl6ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtVHlwZXMubGVuZ3RoID4gMCAmJiAhaXRlbVR5cGVzLnNvbWUoKHQpID0+IHQgPT09IFwib2JqZWN0XCIgfHwgdCA9PT0gXCJhcnJheVwiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wTihpLCBqKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZ2VuLm5hbWUoXCJpdGVtXCIpO1xuICAgICAgICAgICAgY29uc3Qgd3JvbmdUeXBlID0gKDAsIGRhdGFUeXBlXzEuY2hlY2tEYXRhVHlwZXMpKGl0ZW1UeXBlcywgaXRlbSwgaXQub3B0cy5zdHJpY3ROdW1iZXJzLCBkYXRhVHlwZV8xLkRhdGFUeXBlLldyb25nKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSBnZW4uY29uc3QoXCJpbmRpY2VzXCIsICgwLCBjb2RlZ2VuXzEuXykgYHt9YCk7XG4gICAgICAgICAgICBnZW4uZm9yKCgwLCBjb2RlZ2VuXzEuXykgYDske2l9LS07YCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbi5sZXQoaXRlbSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfVske2l9XWApO1xuICAgICAgICAgICAgICAgIGdlbi5pZih3cm9uZ1R5cGUsICgwLCBjb2RlZ2VuXzEuXykgYGNvbnRpbnVlYCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1UeXBlcy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7aXRlbX0gPT0gXCJzdHJpbmdcImAsICgwLCBjb2RlZ2VuXzEuXykgYCR7aXRlbX0gKz0gXCJfXCJgKTtcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2luZGljZXN9WyR7aXRlbX1dID09IFwibnVtYmVyXCJgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oaiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpbmRpY2VzfVske2l0ZW19XWApO1xuICAgICAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtpbmRpY2VzfVske2l0ZW19XSA9ICR7aX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BOMihpLCBqKSB7XG4gICAgICAgICAgICBjb25zdCBlcWwgPSAoMCwgdXRpbF8xLnVzZUZ1bmMpKGdlbiwgZXF1YWxfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IG91dGVyID0gZ2VuLm5hbWUoXCJvdXRlclwiKTtcbiAgICAgICAgICAgIGdlbi5sYWJlbChvdXRlcikuZm9yKCgwLCBjb2RlZ2VuXzEuXykgYDske2l9LS07YCwgKCkgPT4gZ2VuLmZvcigoMCwgY29kZWdlbl8xLl8pIGAke2p9ID0gJHtpfTsgJHtqfS0tO2AsICgpID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2VxbH0oJHtkYXRhfVske2l9XSwgJHtkYXRhfVske2p9XSlgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKG91dGVyKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuaXF1ZUl0ZW1zLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuLy8gZG8gbm90IGVkaXQgLmpzIGZpbGVzIGRpcmVjdGx5IC0gZWRpdCBzcmMvaW5kZXguanN0XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICBpZiAoYS5jb25zdHJ1Y3RvciAhPT0gYi5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGxlbmd0aCwgaSwga2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbiAgICBpZiAoYS5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwKSByZXR1cm4gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3M7XG4gICAgaWYgKGEudmFsdWVPZiAhPT0gT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mKSByZXR1cm4gYS52YWx1ZU9mKCkgPT09IGIudmFsdWVPZigpO1xuICAgIGlmIChhLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSByZXR1cm4gYS50b1N0cmluZygpID09PSBiLnRvU3RyaW5nKCk7XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIHRydWUgaWYgYm90aCBOYU4sIGZhbHNlIG90aGVyd2lzZVxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhdmVyc2UgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzY2hlbWEsIG9wdHMsIGNiKSB7XG4gIC8vIExlZ2FjeSBzdXBwb3J0IGZvciB2MC4zLjEgYW5kIGVhcmxpZXIuXG4gIGlmICh0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfVxuXG4gIGNiID0gb3B0cy5jYiB8fCBjYjtcbiAgdmFyIHByZSA9ICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJykgPyBjYiA6IGNiLnByZSB8fCBmdW5jdGlvbigpIHt9O1xuICB2YXIgcG9zdCA9IGNiLnBvc3QgfHwgZnVuY3Rpb24oKSB7fTtcblxuICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hlbWEsICcnLCBzY2hlbWEpO1xufTtcblxuXG50cmF2ZXJzZS5rZXl3b3JkcyA9IHtcbiAgYWRkaXRpb25hbEl0ZW1zOiB0cnVlLFxuICBpdGVtczogdHJ1ZSxcbiAgY29udGFpbnM6IHRydWUsXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICBwcm9wZXJ0eU5hbWVzOiB0cnVlLFxuICBub3Q6IHRydWUsXG4gIGlmOiB0cnVlLFxuICB0aGVuOiB0cnVlLFxuICBlbHNlOiB0cnVlXG59O1xuXG50cmF2ZXJzZS5hcnJheUtleXdvcmRzID0ge1xuICBpdGVtczogdHJ1ZSxcbiAgYWxsT2Y6IHRydWUsXG4gIGFueU9mOiB0cnVlLFxuICBvbmVPZjogdHJ1ZVxufTtcblxudHJhdmVyc2UucHJvcHNLZXl3b3JkcyA9IHtcbiAgJGRlZnM6IHRydWUsXG4gIGRlZmluaXRpb25zOiB0cnVlLFxuICBwcm9wZXJ0aWVzOiB0cnVlLFxuICBwYXR0ZXJuUHJvcGVydGllczogdHJ1ZSxcbiAgZGVwZW5kZW5jaWVzOiB0cnVlXG59O1xuXG50cmF2ZXJzZS5za2lwS2V5d29yZHMgPSB7XG4gIGRlZmF1bHQ6IHRydWUsXG4gIGVudW06IHRydWUsXG4gIGNvbnN0OiB0cnVlLFxuICByZXF1aXJlZDogdHJ1ZSxcbiAgbWF4aW11bTogdHJ1ZSxcbiAgbWluaW11bTogdHJ1ZSxcbiAgZXhjbHVzaXZlTWF4aW11bTogdHJ1ZSxcbiAgZXhjbHVzaXZlTWluaW11bTogdHJ1ZSxcbiAgbXVsdGlwbGVPZjogdHJ1ZSxcbiAgbWF4TGVuZ3RoOiB0cnVlLFxuICBtaW5MZW5ndGg6IHRydWUsXG4gIHBhdHRlcm46IHRydWUsXG4gIGZvcm1hdDogdHJ1ZSxcbiAgbWF4SXRlbXM6IHRydWUsXG4gIG1pbkl0ZW1zOiB0cnVlLFxuICB1bmlxdWVJdGVtczogdHJ1ZSxcbiAgbWF4UHJvcGVydGllczogdHJ1ZSxcbiAgbWluUHJvcGVydGllczogdHJ1ZVxufTtcblxuXG5mdW5jdGlvbiBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hlbWEsIGpzb25QdHIsIHJvb3RTY2hlbWEsIHBhcmVudEpzb25QdHIsIHBhcmVudEtleXdvcmQsIHBhcmVudFNjaGVtYSwga2V5SW5kZXgpIHtcbiAgaWYgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICBwcmUoc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KTtcbiAgICBmb3IgKHZhciBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICB2YXIgc2NoID0gc2NoZW1hW2tleV07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2gpKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdHJhdmVyc2UuYXJyYXlLZXl3b3Jkcykge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzY2gubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hbaV0sIGpzb25QdHIgKyAnLycgKyBrZXkgKyAnLycgKyBpLCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5IGluIHRyYXZlcnNlLnByb3BzS2V5d29yZHMpIHtcbiAgICAgICAgaWYgKHNjaCAmJiB0eXBlb2Ygc2NoID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzY2gpXG4gICAgICAgICAgICBfdHJhdmVyc2Uob3B0cywgcHJlLCBwb3N0LCBzY2hbcHJvcF0sIGpzb25QdHIgKyAnLycgKyBrZXkgKyAnLycgKyBlc2NhcGVKc29uUHRyKHByb3ApLCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSwgcHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5IGluIHRyYXZlcnNlLmtleXdvcmRzIHx8IChvcHRzLmFsbEtleXMgJiYgIShrZXkgaW4gdHJhdmVyc2Uuc2tpcEtleXdvcmRzKSkpIHtcbiAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoLCBqc29uUHRyICsgJy8nICsga2V5LCByb290U2NoZW1hLCBqc29uUHRyLCBrZXksIHNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIHBvc3Qoc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUpzb25QdHIoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XG59XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5cbnR5cGUgRGVidWdPcHRpb25zID0ge1xuICBtYXJnaW46IG51bWJlcixcbiAgcGFkZGluZzogbnVtYmVyLFxuICBmb250OiBzdHJpbmcsXG4gIGxpbmVIZWlnaHQ6IG51bWJlcixcbiAgZm9yZWdyb3VuZENvbG91cjogQ29sb3VyLFxuICBiYWNrZ3JvdW5kQ29sb3VyOiBDb2xvdXIsXG4gIGRlZmF1bHRWYWx1ZTogRGVidWdWYWx1ZSxcbiAgZGVmYXVsdE1hcmtlcjogRGVidWdNYXJrZXJcbn07XG5cbnR5cGUgRGVidWdWYWx1ZSA9IHtcbiAgbGFiZWw/OiBzdHJpbmcsXG4gIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nLFxuICBhbGlnbjogJ2xlZnQnIHwgJ3JpZ2h0JyxcbiAgc2hvd0xhYmVsOiBib29sZWFuLFxuICBwYWRkaW5nPzogbnVtYmVyLFxuICBmb250Pzogc3RyaW5nLFxuICBmb3JlZ3JvdW5kQ29sb3VyPzogQ29sb3VyLFxuICBiYWNrZ3JvdW5kQ29sb3VyPzogQ29sb3VyXG59O1xuXG50eXBlIERlYnVnTWFya2VyID0ge1xuICBsYWJlbD86IHN0cmluZyxcbiAgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcsXG4gIHBvc2l0aW9uPzogdmVjLFxuICBzaG93TGFiZWw6IGJvb2xlYW4sXG4gIHNob3dWYWx1ZTogYm9vbGVhbixcbiAgc2hvd01hcmtlcjogYm9vbGVhbixcbiAgbWFya2VyU2l6ZTogbnVtYmVyLFxuICBtYXJrZXJTdHlsZTogJ3gnIHwgJysnIHwgJy4nLFxuICBtYXJrZXJDb2xvdXI6IENvbG91cixcbiAgc3BhY2U6ICd3b3JsZCcgfCAnc2NyZWVuJyxcbiAgcGFkZGluZz86IG51bWJlcixcbiAgZm9udD86IHN0cmluZyxcbiAgbGFiZWxPZmZzZXQ6IHZlYyxcbiAgZm9yZWdyb3VuZENvbG91cj86IENvbG91cixcbiAgYmFja2dyb3VuZENvbG91cj86IENvbG91clxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVidWcge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRGVidWc7XG4gIHByaXZhdGUgdmFsdWVzOiBNYXA8c3RyaW5nLCBEZWJ1Z1ZhbHVlPjtcbiAgcHJpdmF0ZSBtYXJrZXJzOiBNYXA8c3RyaW5nLCBEZWJ1Z01hcmtlcj47XG4gIHByaXZhdGUgb3B0aW9uczogRGVidWdPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRPcHRpb25zOiBEZWJ1Z09wdGlvbnMgPSB7XG4gICAgbWFyZ2luOiAxMCxcbiAgICBwYWRkaW5nOiA0LFxuICAgIGZvbnQ6ICcxMHB0IEx1Y2lkYSBDb25zb2xlLCBtb25vc3BhY2UnLFxuICAgIGxpbmVIZWlnaHQ6IDEyLFxuICAgIGZvcmVncm91bmRDb2xvdXI6ICcjZmZmJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3VyOiAnIzMzMzgnLFxuICAgIGRlZmF1bHRWYWx1ZToge1xuICAgICAgYWxpZ246ICdsZWZ0JyxcbiAgICAgIHNob3dMYWJlbDogdHJ1ZSxcbiAgICB9LFxuICAgIGRlZmF1bHRNYXJrZXI6IHtcbiAgICAgIHNob3dMYWJlbDogdHJ1ZSxcbiAgICAgIHNob3dWYWx1ZTogdHJ1ZSxcbiAgICAgIHNob3dNYXJrZXI6IHRydWUsXG4gICAgICBtYXJrZXJTaXplOiA2LFxuICAgICAgbWFya2VyU3R5bGU6ICd4JyxcbiAgICAgIG1hcmtlckNvbG91cjogJyNjY2MnLFxuICAgICAgc3BhY2U6ICd3b3JsZCcsXG4gICAgICBsYWJlbE9mZnNldDogdmVjKDEwKSxcbiAgICB9LFxuICB9O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Iob3B0aW9uczogUGFydGlhbDxEZWJ1Z09wdGlvbnM+ID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLnZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBEZWJ1Z1ZhbHVlPigpO1xuICAgIHRoaXMubWFya2VycyA9IG5ldyBNYXA8c3RyaW5nLCBEZWJ1Z01hcmtlcj4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBkZWJ1ZyByZW5kZXJlciBmb3IgZGlzcGxheWluZyB2YWx1ZXMgYW5kIG1hcmtlcnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZShvcHRpb25zOiBQYXJ0aWFsPERlYnVnT3B0aW9ucz4gPSB7fSk6IHZvaWQge1xuICAgIERlYnVnLmluc3RhbmNlID0gbmV3IERlYnVnKG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRGVidWcge1xuICAgIGlmIChEZWJ1Zy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBEZWJ1Zy5pbml0aWFsaXNlKCk7XG4gICAgfVxuICAgIHJldHVybiBEZWJ1Zy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGEgZGVidWcgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdmFsdWUobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciwgb3B0aW9uczogUGFydGlhbDxEZWJ1Z1ZhbHVlPiA9IHt9KTogdm9pZCB7XG4gICAgY29uc3QgZGVidWcgPSBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xuICAgIGRlYnVnLnZhbHVlcy5zZXQobGFiZWwsIE9iamVjdC5hc3NpZ24oXG4gICAgICB7IGxhYmVsLCB2YWx1ZSB9LFxuICAgICAgZGVidWcuZGVmYXVsdE9wdGlvbnMuZGVmYXVsdFZhbHVlLFxuICAgICAgb3B0aW9uc1xuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgYSBtYXJrZXIgaW4gd29ybGQgb3Igc2NyZWVuIHNwYWNlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1hcmtlcihsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBwb3NpdGlvbjogdmVjLCBvcHRpb25zOiBQYXJ0aWFsPERlYnVnTWFya2VyPiA9IHt9KTogdm9pZCB7XG4gICAgY29uc3QgZGVidWcgPSBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xuICAgIGRlYnVnLm1hcmtlcnMuc2V0KGxhYmVsLCBPYmplY3QuYXNzaWduKFxuICAgICAgeyBsYWJlbCwgdmFsdWUsIHBvc2l0aW9uIH0sXG4gICAgICBkZWJ1Zy5kZWZhdWx0T3B0aW9ucy5kZWZhdWx0TWFya2VyLFxuICAgICAgb3B0aW9uc1xuICAgICkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGNvbnN0IGRlYnVnID0gRGVidWcuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIERyYXcgd29ybGQtc3BhY2UgbWFya2Vyc1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGRlYnVnLm1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgaWYgKG1hcmtlci5zcGFjZSA9PT0gJ3dvcmxkJykge1xuICAgICAgICBkZWJ1Zy5kcmF3TWFya2VyKGNvbnRleHQsIG1hcmtlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAvLyBEcmF3IHZhbHVlcyBhbmQgc2NyZWVuLXNwYWNlIG1hcmtlcnNcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBsZXQgcG9zaXRpb246IHZlYztcbiAgICBsZXQgbGVmdFkgPSBkZWJ1Zy5vcHRpb25zLm1hcmdpbjtcbiAgICBsZXQgcmlnaHRZID0gZGVidWcub3B0aW9ucy5tYXJnaW47XG4gICAgY29uc3QgbGluZUhlaWdodCA9IChkZWJ1Zy5vcHRpb25zLmxpbmVIZWlnaHQgKyBkZWJ1Zy5vcHRpb25zLnBhZGRpbmcgKiAyKTtcbiAgICBkZWJ1Zy52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBzd2l0Y2ggKHZhbHVlLmFsaWduKSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHBvc2l0aW9uID0gdmVjKGRlYnVnLm9wdGlvbnMubWFyZ2luLCBsZWZ0WSk7XG4gICAgICAgICAgbGVmdFkgKz0gbGluZUhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHBvc2l0aW9uID0gdmVjKGNvbnRleHQuY2FudmFzLmNsaWVudFdpZHRoIC0gZGVidWcub3B0aW9ucy5tYXJnaW4sIHJpZ2h0WSk7XG4gICAgICAgICAgcmlnaHRZICs9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWJ1Zy5kcmF3TGFiZWwoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgICh2YWx1ZS5zaG93TGFiZWwgPyBgJHt2YWx1ZS5sYWJlbH06IGAgOiAnJykgKyBgJHt2YWx1ZS52YWx1ZX1gLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgdmFsdWUuYWxpZ24sXG4gICAgICAgIHZhbHVlLnBhZGRpbmcgPz8gZGVidWcub3B0aW9ucy5wYWRkaW5nLFxuICAgICAgICB2YWx1ZS5mb250ID8/IGRlYnVnLm9wdGlvbnMuZm9udCxcbiAgICAgICAgdmFsdWUuZm9yZWdyb3VuZENvbG91ciA/PyBkZWJ1Zy5vcHRpb25zLmZvcmVncm91bmRDb2xvdXIsXG4gICAgICAgIHZhbHVlLmJhY2tncm91bmRDb2xvdXIgPz8gZGVidWcub3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3VyXG4gICAgICApO1xuICAgIH0pO1xuICAgIGRlYnVnLm1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgaWYgKG1hcmtlci5zcGFjZSA9PT0gJ3NjcmVlbicpIHtcbiAgICAgICAgZGVidWcuZHJhd01hcmtlcihjb250ZXh0LCBtYXJrZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgLy8gQ2xlYXIgdmFsdWVzIGFuZCBtYXJrZXJzIHJlYWR5IGZvciBuZXh0IGZyYW1lXG4gICAgZGVidWcudmFsdWVzLmNsZWFyKCk7XG4gICAgZGVidWcubWFya2Vycy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TWFya2VyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbWFya2VyOiBEZWJ1Z01hcmtlcik6IHZvaWQge1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gbWFya2VyLnBvc2l0aW9uID8/IHZlYygpO1xuICAgIGlmIChtYXJrZXIuc2hvd0xhYmVsIHx8IG1hcmtlci5zaG93VmFsdWUpIHtcbiAgICAgIHRoaXMuZHJhd0xhYmVsKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICAobWFya2VyLnNob3dMYWJlbCA/IGAke21hcmtlci5sYWJlbH06IGAgOiAnJykgKyAobWFya2VyLnNob3dWYWx1ZSA/IGAke21hcmtlci52YWx1ZX1gIDogJycpLFxuICAgICAgICB2ZWMuYWRkKHBvc2l0aW9uID8/IHZlYygpLCBtYXJrZXIubGFiZWxPZmZzZXQpLFxuICAgICAgICAnbGVmdCcsXG4gICAgICAgIG1hcmtlci5wYWRkaW5nID8/IHRoaXMub3B0aW9ucy5wYWRkaW5nLFxuICAgICAgICBtYXJrZXIuZm9udCA/PyB0aGlzLm9wdGlvbnMuZm9udCxcbiAgICAgICAgbWFya2VyLmZvcmVncm91bmRDb2xvdXIgPz8gdGhpcy5vcHRpb25zLmZvcmVncm91bmRDb2xvdXIsXG4gICAgICAgIG1hcmtlci5iYWNrZ3JvdW5kQ29sb3VyID8/IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3VyXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWFya2VyLnNob3dNYXJrZXIpIHtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gMjtcbiAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb250ZXh0LmZpbGxTdHlsZSA9IG1hcmtlci5tYXJrZXJDb2xvdXI7XG4gICAgICBzd2l0Y2ggKG1hcmtlci5tYXJrZXJTdHlsZSkge1xuICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICB0aGlzLmRyYXdDcm9zcyhjb250ZXh0LCBwb3NpdGlvbiwgbWFya2VyLm1hcmtlclNpemUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICB0aGlzLmRyYXdQbHVzKGNvbnRleHQsIHBvc2l0aW9uLCBtYXJrZXIubWFya2VyU2l6ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgIHRoaXMuZHJhd0RvdChjb250ZXh0LCBwb3NpdGlvbiwgbWFya2VyLm1hcmtlclNpemUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0xhYmVsKFxuICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgcG9zaXRpb246IHZlYyxcbiAgICBhbGlnbjogJ2xlZnQnIHwgJ3JpZ2h0JyxcbiAgICBwYWRkaW5nOiBudW1iZXIsXG4gICAgZm9udDogc3RyaW5nLFxuICAgIGZvcmVncm91bmRDb2xvdXI6IENvbG91cixcbiAgICBiYWNrZ3JvdW5kQ29sb3VyOiBDb2xvdXJcbiAgKTogdm9pZCB7XG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgY29udGV4dC5mb250ID0gZm9udDtcbiAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgIGNvbnN0IGJhY2tncm91bmRTaXplID0ge1xuICAgICAgd2lkdGg6IGNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGggKyBwYWRkaW5nICogMixcbiAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmxpbmVIZWlnaHQgKyBwYWRkaW5nICogMixcbiAgICB9O1xuICAgIGNvbnN0IHggPSBhbGlnbiA9PT0gJ3JpZ2h0JyA/IChwb3NpdGlvbi54IC0gYmFja2dyb3VuZFNpemUud2lkdGgpIDogcG9zaXRpb24ueDtcblxuICAgIC8vIERyYXcgYmFja2dyb3VuZFxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG91cjtcbiAgICBjb250ZXh0LmZpbGxSZWN0KFxuICAgICAgeCAtIHBhZGRpbmcsXG4gICAgICBwb3NpdGlvbi55IC0gcGFkZGluZyxcbiAgICAgIGJhY2tncm91bmRTaXplLndpZHRoLFxuICAgICAgYmFja2dyb3VuZFNpemUuaGVpZ2h0XG4gICAgKTtcblxuICAgIC8vIERyYXcgdGV4dFxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZm9yZWdyb3VuZENvbG91cjtcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHBvc2l0aW9uLnkpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3Q3Jvc3MoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBwb3NpdGlvbjogdmVjLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnN0IGhhbGZTaXplID0gc2l6ZSAvIDI7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9zaXRpb24ueCAtIGhhbGZTaXplLCBwb3NpdGlvbi55IC0gaGFsZlNpemUpO1xuICAgIGNvbnRleHQubGluZVRvKHBvc2l0aW9uLnggKyBoYWxmU2l6ZSwgcG9zaXRpb24ueSArIGhhbGZTaXplKTtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb3NpdGlvbi54IC0gaGFsZlNpemUsIHBvc2l0aW9uLnkgKyBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIGhhbGZTaXplLCBwb3NpdGlvbi55IC0gaGFsZlNpemUpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdQbHVzKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcG9zaXRpb246IHZlYywgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb25zdCBoYWxmU2l6ZSA9IHNpemUgLyAyO1xuICAgIGNvbnRleHQubW92ZVRvKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkgLSBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSArIGhhbGZTaXplKTtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb3NpdGlvbi54IC0gaGFsZlNpemUsIHBvc2l0aW9uLnkpO1xuICAgIGNvbnRleHQubGluZVRvKHBvc2l0aW9uLnggKyBoYWxmU2l6ZSwgcG9zaXRpb24ueSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0RvdChjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHBvc2l0aW9uOiB2ZWMsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmMocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgc2l6ZSAvIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzb24nO1xuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBDb250ZW50IGZyb20gJy4vY29udGVudC9Db250ZW50JztcbmltcG9ydCBEZWJ1ZyBmcm9tICcuL0RlYnVnJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgbGFzdEZyYW1lVGltZTogbnVtYmVyO1xuICBwcml2YXRlIGxhc3RGcmFtZUNvdW50VGltZTogbnVtYmVyO1xuICBwcml2YXRlIGZyYW1lUmF0ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBmcmFtZUNvdW50OiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBzdGF0aWMgc2NyZWVuOiB2ZWM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsKSB7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHZhbGlkIGNvbnRhaW5lciBlbGVtZW50IG11c3QgYmUgc3BlY2lmaWVkLicpO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2NhbnZhcycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGVsZW1lbnQgbXVzdCBiZSBhIGNhbnZhcy4nKTtcbiAgICB9XG4gICAgdGhpcy5jYW52YXMgPSBjb250YWluZXIgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAvLyBHZXQgYSAyZCBjb250ZXh0XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGNvbnRleHQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGdldCBhIDJkIGNvbnRleHQuXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSByZXNpemVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIC8vIERpc2FibGUgaW1hZ2Ugc21vb3RoaW5nIGZvciBwaXhlbGF0ZWQgZ3JhcGhpY3NcbiAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgZ2FtZSBhbmQgc3RhcnQgcGxheWluZ1xuICAgKi9cbiAgcHVibGljIGluaXRpYWxpc2UoKTogdm9pZCB7XG5cbiAgICAvLyBJbml0aWFsaXNlIHN1YnN5c3RlbXNcbiAgICBEZWJ1Zy5pbml0aWFsaXNlKCk7XG4gICAgSW5wdXQuaW5pdGlhbGlzZSgpO1xuICAgIENvbnRlbnQuaW5pdGlhbGlzZSgpO1xuXG4gICAgLy8gU3RhcnQgZ2FtZSBsb29wXG4gICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gdGhpcy5sYXN0RnJhbWVDb3VudFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmxvb3AoKTtcblxuICAgIC8vIFRPRE8gc3RhcnQgdGhlIGdhbWUuLi5cbiAgfVxuXG4gIHByaXZhdGUgbG9vcCgpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IE1hdGgubWluKG5vdyAtIHRoaXMubGFzdEZyYW1lVGltZSwgY29uc3RhbnRzLkZQU19NSU4pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGZyYW1lcmF0ZVxuICAgIGlmIChub3cgLSB0aGlzLmxhc3RGcmFtZUNvdW50VGltZSA+PSAxMDAwKSB7XG4gICAgICB0aGlzLmxhc3RGcmFtZUNvdW50VGltZSA9IG5vdztcbiAgICAgIHRoaXMuZnJhbWVSYXRlID0gdGhpcy5mcmFtZUNvdW50O1xuICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB9XG4gICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gbm93O1xuICAgIGlmIChjb25maWcuc2hvd0ZQUykge1xuICAgICAgRGVidWcudmFsdWUoJ0ZQUycsIHRoaXMuZnJhbWVSYXRlLCB7IGFsaWduOiAncmlnaHQnIH0pO1xuICAgIH1cblxuICAgIC8vIERvIGdhbWUgbG9vcFxuICAgIHRoaXMudXBkYXRlKGVsYXBzZWRUaW1lKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgcHJpdmF0ZSB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIEdhbWUuc2NyZWVuID0gdmVjKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgLy8gVE9ETyB1cGRhdGUgdGhlIGdhbWUuLi5cblxuICAgIElucHV0LnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcblxuICAgIC8vIFRPRE8gcmVuZGVyIHRoZSBnYW1lLi4uXG5cbiAgICBEZWJ1Zy5kcmF3KHRoaXMuY29udGV4dCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4vZW51bXMnO1xuXG50eXBlIE1vdXNlU3RhdGUgPSB7XG4gIGJ1dHRvbjogYm9vbGVhbixcbiAgcG9zaXRpb246IHZlYyxcbiAgd2hlZWw6IG51bWJlclxufTtcblxudHlwZSBLZXlib2FyZFN0YXRlID0ge1xuICBba2V5IGluIEtleV0/OiBib29sZWFuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBJbnB1dDtcbiAgcHJpdmF0ZSBrZXlib2FyZFN0YXRlOiBLZXlib2FyZFN0YXRlID0ge307XG4gIHByaXZhdGUgcHJldmlvdXNLZXlib2FyZFN0YXRlOiBLZXlib2FyZFN0YXRlID0ge307XG4gIHByaXZhdGUgbW91c2VTdGF0ZTogTW91c2VTdGF0ZSA9IHsgYnV0dG9uOiBmYWxzZSwgcG9zaXRpb246IHZlYygpLCB3aGVlbDogMCB9O1xuICBwcml2YXRlIHByZXZpb3VzTW91c2VTdGF0ZTogTW91c2VTdGF0ZSA9IHsgYnV0dG9uOiBmYWxzZSwgcG9zaXRpb246IHZlYygpLCB3aGVlbDogMCB9O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS5idXR0b24gPSB0cnVlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IHRydWU7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS5wb3NpdGlvbi54ID0gZS5vZmZzZXRYO1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLnBvc2l0aW9uLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIHRoaXMua2V5Ym9hcmRTdGF0ZVtlLmNvZGUgYXMgS2V5XSA9IHRydWU7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gICAgICB0aGlzLmtleWJvYXJkU3RhdGVbZS5jb2RlIGFzIEtleV0gPSBmYWxzZTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBlID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS53aGVlbCA9IGUuZGVsdGFZID4gMCA/IDEgOiAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBpbnB1dCBtYW5hZ2VyIGZvciBtYW5hZ2luZyBtb3VzZSBhbmQga2V5Ym9hcmQgaW5wdXRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICBJbnB1dC5pbnN0YW5jZSA9IG5ldyBJbnB1dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSW5wdXQge1xuICAgIGlmIChJbnB1dC5pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IG1hbmFnZXIgbm90IHByb3Blcmx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBJbnB1dC5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBpbnB1dCBkZXZpY2VzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZSk7XG4gICAgaW5zdGFuY2UucHJldmlvdXNNb3VzZVN0YXRlID0ge1xuICAgICAgYnV0dG9uOiBpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbixcbiAgICAgIHBvc2l0aW9uOiB2ZWMuY3B5KGluc3RhbmNlLm1vdXNlU3RhdGUucG9zaXRpb24pLFxuICAgICAgd2hlZWw6IDAsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGtleSBpcyBjdXJyZW50bHkgcHJlc3NlZCBkb3duXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGtleURvd24oa2V5PzogS2V5KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYW55IGtleSBpcyBkb3duXG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZSkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrIGFzIEtleV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gISFpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBrZXkgaGFzIGJlZW4gcHJlc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBrZXlQcmVzc2VkKGtleT86IEtleSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIENoZWNrIGlmIGFueSBrZXkgd2FzIHByZXNzZWRcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgayBpbiBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2sgYXMgS2V5XSAmJlxuICAgICAgICAgIChcbiAgICAgICAgICAgICEoayBpbiBpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGUpIHx8XG4gICAgICAgICAgICAhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2sgYXMgS2V5XVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICEhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrZXldICYmICFpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGVba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGtleSBoYXMgYmVlbiByZWxlYXNlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBrZXlSZWxlYXNlZChrZXk/OiBLZXkpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbnkga2V5IHdhcyByZWxlYXNlZFxuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrIGluIGluc3RhbmNlLmtleWJvYXJkU3RhdGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2sgYXMgS2V5XSAmJlxuICAgICAgICAgICEhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2sgYXMgS2V5XVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIWluc3RhbmNlLmtleWJvYXJkU3RhdGVba2V5XSAmJiAhIWluc3RhbmNlLnByZXZpb3VzS2V5Ym9hcmRTdGF0ZVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbW91c2UgYnV0dG9uIGlzIGN1cnJlbnRseSBwcmVzc2VkIGRvd25cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VEb3duKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gISFpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG1vdXNlIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlUHJlc3NlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuICEhaW5zdGFuY2UubW91c2VTdGF0ZS5idXR0b24gJiYgIWluc3RhbmNlLnByZXZpb3VzTW91c2VTdGF0ZS5idXR0b247XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb3VzZSBidXR0b24gaGFzIGJlZW4gcmVsZWFzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VSZWxlYXNlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuICFpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbiAmJiAhIWluc3RhbmNlLnByZXZpb3VzTW91c2VTdGF0ZS5idXR0b247XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG1vdXNld2hlZWwgaXMgc2Nyb2xsaW5nIHVwXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlV2hlZWxVcCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlLm1vdXNlU3RhdGUud2hlZWwgPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBtb3VzZXdoZWVsIGlzIHNjcm9sbGluZyBkb3duXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlV2hlZWxEb3duKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gaW5zdGFuY2UubW91c2VTdGF0ZS53aGVlbCA8IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uIGluIHNjcmVlbi1zcGFjZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtb3VzZVBvc2l0aW9uKCk6IHZlYyB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuICAgIHJldHVybiBpbnN0YW5jZS5tb3VzZVN0YXRlLnBvc2l0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIEFjdG9yRGF0YSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IEFjdG9yRGF0YVNjaGVtYSA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICBpZDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICB9LFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBY3RvciB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBpZDogc3RyaW5nIHwgbnVsbCxcbiAgICBuYW1lOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkID8/IHV1aWQoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBBY3RvckRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICB9O1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFNJTVVMQVRFX1NMT1dfTE9BRElORyA9IHRydWU7XG5leHBvcnQgY29uc3QgRlBTX01JTiA9IDEgLyAzMDtcbiIsImltcG9ydCBKU09OU2NoZW1hVmFsaWRhdG9yIGZyb20gJ2Fqdic7XG5pbXBvcnQgeyBBY3RvckRhdGEsIEFjdG9yRGF0YVNjaGVtYSB9IGZyb20gJy4uL2FjdG9ycy9BY3Rvcic7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcbmltcG9ydCB7IEpTT05Mb2FkZXIgfSBmcm9tICcuL0pTT05Mb2FkZXInO1xuXG5leHBvcnQgY29uc3QgQWN0b3JEYXRhTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIChcbiAgdXJsOiBzdHJpbmdcbik6IFByb21pc2U8YW55PiA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBKU09OTG9hZGVyPEFjdG9yRGF0YT4odXJsKTtcbiAgY29uc3QgdmFsaWRhdGUgPSBuZXcgSlNPTlNjaGVtYVZhbGlkYXRvcigpLmNvbXBpbGUoQWN0b3JEYXRhU2NoZW1hKTtcbiAgaWYgKCF2YWxpZGF0ZShkYXRhKSkge1xuICAgIGNvbnN0YW50cy5ERUJVRyAmJiBjb25zb2xlLmxvZyh2YWxpZGF0ZS5lcnJvcnMpO1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhY3RvciBkYXRhOiAke3VybH1gKTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn07XG4iLCJpbXBvcnQgSlNPTlNjaGVtYVZhbGlkYXRvciBmcm9tICdhanYnO1xuaW1wb3J0ICogYXMgX2NvbnRlbnRNYW5pZmVzdCBmcm9tICcuLi8uLi9jb250ZW50L2NvbnRlbnQuanNvbic7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEFjdG9yRGF0YUxvYWRlciwgRm9udExvYWRlciwgSW1hZ2VMb2FkZXIsIFNvdW5kTG9hZGVyIH0gZnJvbSAnLi4vY29udGVudCc7XG5pbXBvcnQgeyBDb250ZW50SXRlbVR5cGUgfSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQgc2xlZXAgZnJvbSAnLi4vdXRpbGl0aWVzL3NsZWVwJztcblxudHlwZSBDb250ZW50SXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBDb250ZW50SXRlbVR5cGU7XG4gIGFyZ3M6IHN0cmluZ1tdO1xufTtcblxudHlwZSBDb250ZW50TWFuaWZlc3QgPSB7XG4gIGl0ZW1zOiBDb250ZW50SXRlbVtdO1xufTtcblxuZXhwb3J0IHR5cGUgQ29udGVudEl0ZW1Mb2FkZXIgPSA8VD4oLi4uYXJnczogc3RyaW5nW10pID0+IFByb21pc2U8VD47XG5cbmNvbnN0IGNvbnRlbnRJdGVtTG9hZGVyczoge1xuICBba2V5IGluIENvbnRlbnRJdGVtVHlwZV06IENvbnRlbnRJdGVtTG9hZGVyO1xufSA9IHtcbiAgW0NvbnRlbnRJdGVtVHlwZS5JbWFnZV06IEltYWdlTG9hZGVyLFxuICBbQ29udGVudEl0ZW1UeXBlLlNvdW5kXTogU291bmRMb2FkZXIsXG4gIFtDb250ZW50SXRlbVR5cGUuRm9udF06IEZvbnRMb2FkZXIsXG4gIFtDb250ZW50SXRlbVR5cGUuQWN0b3JEYXRhXTogQWN0b3JEYXRhTG9hZGVyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudCB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb250ZW50O1xuICBwcml2YXRlIGNvbnRlbnQ6IENvbnRlbnRJdGVtW107XG4gIHByaXZhdGUgaXRlbXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcbiAgcHVibGljIHN0YXRpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAgcHVibGljIHN0YXRpYyBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IENvbnRlbnRJdGVtW10pIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIGNvbnRlbnQgbWFuYWdlciBmb3IgbG9hZGluZyBjb250ZW50IGFzc2V0c1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXNlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRlbnRNYW5pZmVzdCA9IF9jb250ZW50TWFuaWZlc3QgYXMgQ29udGVudE1hbmlmZXN0O1xuICAgIGNvbnN0IHZhbGlkYXRlID0gbmV3IEpTT05TY2hlbWFWYWxpZGF0b3IoKS5jb21waWxlKHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpdGVtczoge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICBlbnVtOiBPYmplY3QudmFsdWVzKENvbnRlbnRJdGVtVHlwZSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBbJ3N0cmluZycsICdvYmplY3QnLCAnYXJyYXknXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICB9KTtcbiAgICBpZiAoIXZhbGlkYXRlKGNvbnRlbnRNYW5pZmVzdCkpIHtcbiAgICAgIGNvbnN0YW50cy5ERUJVRyAmJiBjb25zb2xlLmxvZyh2YWxpZGF0ZS5lcnJvcnMpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbnRlbnQgbWFuaWZlc3QnKTtcbiAgICB9XG4gICAgQ29udGVudC5pbnN0YW5jZSA9IG5ldyBDb250ZW50KGNvbnRlbnRNYW5pZmVzdC5pdGVtcyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDb250ZW50IHtcbiAgICBpZiAoQ29udGVudC5pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgbWFuYWdlciBub3QgcHJvcGVybHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIENvbnRlbnQuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgbG9hZGluZyBjb250ZW50IGl0ZW1zIGRlZmluZWQgaW4gdGhlIGNvbnRlbnQgbWFuaWZlc3RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoQ29udGVudC5sb2FkZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGVudCBhbHJlYWR5IGxvYWRlZCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnN0YW5jZSA9IENvbnRlbnQuZ2V0SW5zdGFuY2UoKTtcbiAgICBpZiAoaW5zdGFuY2UuY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29udGVudCBpdGVtcyB0byBsb2FkJyk7XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzRGVsdGEgPSAxIC8gaW5zdGFuY2UuY29udGVudC5sZW5ndGg7XG4gICAgZm9yIChjb25zdCBjIG9mIGluc3RhbmNlLmNvbnRlbnQpIHtcbiAgICAgIGlmIChjb25zdGFudHMuREVCVUcgJiYgY29uc3RhbnRzLlNJTVVMQVRFX1NMT1dfTE9BRElORykge1xuICAgICAgICBhd2FpdCBzbGVlcChNYXRoLnJhbmRvbUJldHdlZW4oMTAwLCAxMDAwKSk7XG4gICAgICB9XG4gICAgICBpbnN0YW5jZS5pdGVtc1tjLm5hbWVdID0gYXdhaXQgY29udGVudEl0ZW1Mb2FkZXJzW2MudHlwZV0oLi4uYy5hcmdzKTtcbiAgICAgIENvbnRlbnQucHJvZ3Jlc3MgPSBNYXRoLmNsYW1wKENvbnRlbnQucHJvZ3Jlc3MgKyBwcm9ncmVzc0RlbHRhLCAwLCAxKTtcbiAgICB9XG4gICAgQ29udGVudC5sb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGEgbG9hZGVkIGNvbnRlbnQgaXRlbVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQ8VD4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgaWYgKCFDb250ZW50LmxvYWRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IG5vdCBsb2FkZWQnKTtcbiAgICB9XG4gICAgY29uc3QgaW5zdGFuY2UgPSBDb250ZW50LmdldEluc3RhbmNlKCk7XG4gICAgaWYgKCEobmFtZSBpbiBpbnN0YW5jZS5pdGVtcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29udGVudCBpdGVtIFwiJHtuYW1lfVwiIG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2UuaXRlbXNbbmFtZV0gYXMgVDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29udGVudEl0ZW1Mb2FkZXIgfSBmcm9tICcuL0NvbnRlbnQnO1xuXG5leHBvcnQgY29uc3QgRm9udExvYWRlcjogQ29udGVudEl0ZW1Mb2FkZXIgPSBhc3luYyAoXG4gIHVybDogc3RyaW5nLFxuICBmYW1pbHk6IHN0cmluZ1xuKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPEZvbnRGYWNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZm9udCA9IG5ldyBGb250RmFjZShmYW1pbHksIGB1cmwoJHt1cmx9KWApO1xuICAgIGZvbnQubG9hZCgpXG4gICAgICAudGhlbihmb250ID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZm9udHMuYWRkKGZvbnQpO1xuICAgICAgICByZXNvbHZlKGZvbnQgYXMgYW55KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZWplY3QoYEVycm9yIGxvYWRpbmcgZm9udCBcIiR7dXJsfVwiYCk7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgQ29udGVudEl0ZW1Mb2FkZXIgfSBmcm9tICcuL0NvbnRlbnQnO1xuXG5leHBvcnQgY29uc3QgSW1hZ2VMb2FkZXI6IENvbnRlbnRJdGVtTG9hZGVyID0gYXN5bmMgPEhUTUxJbWFnZUVsZW1lbnQ+KFxuICB1cmw6IHN0cmluZ1xuKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5zcmMgPSB1cmw7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIHJlc29sdmUoaW1hZ2UgYXMgYW55KTtcbiAgICB9KTtcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgIHJlamVjdChgRXJyb3IgbG9hZGluZyBpbWFnZSBcIiR7dXJsfVwiYCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IEpTT05Mb2FkZXI6IENvbnRlbnRJdGVtTG9hZGVyID0gYXN5bmMgPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PihcbiAgdXJsT3JEYXRhOiBhbnlcbik6IFByb21pc2U8VD4gPT4ge1xuICBpZiAodHlwZW9mIHVybE9yRGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd2luZG93LmZldGNoKHVybE9yRGF0YSwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUoanNvbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGBFcnJvciBsb2FkaW5nIGpzb24gXCIke3VybE9yRGF0YX1cImApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdXJsT3JEYXRhIGFzIFQ7XG59O1xuIiwiaW1wb3J0IHsgQ29udGVudEl0ZW1Mb2FkZXIgfSBmcm9tICcuL0NvbnRlbnQnO1xuXG5leHBvcnQgY29uc3QgU291bmRMb2FkZXI6IENvbnRlbnRJdGVtTG9hZGVyID0gYXN5bmMgKFxuICB1cmw6IHN0cmluZ1xuKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxBdWRpb0VsZW1lbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzb3VuZCA9IG5ldyBBdWRpbyh1cmwpO1xuICAgIHNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCAoKSA9PiB7XG4gICAgICByZXNvbHZlKHNvdW5kIGFzIGFueSk7XG4gICAgfSk7XG4gICAgc291bmQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICByZWplY3QoYEVycm9yIGxvYWRpbmcgc291bmQgXCIke3VybH1cImApO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCJleHBvcnQgeyBBY3RvckRhdGFMb2FkZXIgfSBmcm9tICcuL0FjdG9yRGF0YUxvYWRlcic7XG5leHBvcnQgeyBGb250TG9hZGVyIH0gZnJvbSAnLi9Gb250TG9hZGVyJztcbmV4cG9ydCB7IEltYWdlTG9hZGVyIH0gZnJvbSAnLi9JbWFnZUxvYWRlcic7XG5leHBvcnQgeyBTb3VuZExvYWRlciB9IGZyb20gJy4vU291bmRMb2FkZXInO1xuIiwiZXhwb3J0IGVudW0gQ29udGVudEl0ZW1UeXBlIHtcbiAgSW1hZ2UgPSAnaW1hZ2UnLFxuICBTb3VuZCA9ICdzb3VuZCcsXG4gIEZvbnQgPSAnZm9udCcsXG4gIEFjdG9yRGF0YSA9ICdhY3RvckRhdGEnLFxufVxuXG5leHBvcnQgZW51bSBLZXkge1xuICBVcCA9ICdBcnJvd1VwJyxcbiAgRG93biA9ICdBcnJvd0Rvd24nLFxuICBMZWZ0ID0gJ0Fycm93TGVmdCcsXG4gIFJpZ2h0ID0gJ0Fycm93UmlnaHQnLFxuICBTcGFjZSA9ICdTcGFjZScsXG4gIEVudGVyID0gJ0VudGVyJyxcbiAgU2hpZnQgPSAnU2hpZnQnLFxuICBDb250cm9sID0gJ0NvbnRyb2wnLFxuICBFc2NhcGUgPSAnRXNjYXBlJyxcbiAgRGlnaXQwID0gJ0RpZ2l0MCcsXG4gIERpZ2l0MSA9ICdEaWdpdDEnLFxuICBEaWdpdDIgPSAnRGlnaXQyJyxcbiAgRGlnaXQzID0gJ0RpZ2l0MycsXG4gIERpZ2l0NCA9ICdEaWdpdDQnLFxuICBEaWdpdDUgPSAnRGlnaXQ1JyxcbiAgRGlnaXQ2ID0gJ0RpZ2l0NicsXG4gIERpZ2l0NyA9ICdEaWdpdDcnLFxuICBEaWdpdDggPSAnRGlnaXQ4JyxcbiAgRGlnaXQ5ID0gJ0RpZ2l0OScsXG59XG4iLCIvKipcbiAqIFBhdXNlIGV4ZWN1dGlvbiBmb3Igc29tZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNsZWVwKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIiwiLyoqIEBsaWNlbnNlIFVSSS5qcyB2NC40LjEgKGMpIDIwMTEgR2FyeSBDb3VydC4gTGljZW5zZTogaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L3VyaS1qcyAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLlVSSSA9IGdsb2JhbC5VUkkgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG1lcmdlKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzZXRzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHNldHNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKHNldHMubGVuZ3RoID4gMSkge1xuICAgICAgICBzZXRzWzBdID0gc2V0c1swXS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHZhciB4bCA9IHNldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICBzZXRzW3hdID0gc2V0c1t4XS5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0c1t4bF0gPSBzZXRzW3hsXS5zbGljZSgxKTtcbiAgICAgICAgcmV0dXJuIHNldHMuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldHNbMF07XG4gICAgfVxufVxuZnVuY3Rpb24gc3ViZXhwKHN0cikge1xuICAgIHJldHVybiBcIig/OlwiICsgc3RyICsgXCIpXCI7XG59XG5mdW5jdGlvbiB0eXBlT2Yobykge1xuICAgIHJldHVybiBvID09PSB1bmRlZmluZWQgPyBcInVuZGVmaW5lZFwiIDogbyA9PT0gbnVsbCA/IFwibnVsbFwiIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNwbGl0KFwiIFwiKS5wb3AoKS5zcGxpdChcIl1cIikuc2hpZnQoKS50b0xvd2VyQ2FzZSgpO1xufVxuZnVuY3Rpb24gdG9VcHBlckNhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50b1VwcGVyQ2FzZSgpO1xufVxuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsID8gb2JqIGluc3RhbmNlb2YgQXJyYXkgPyBvYmogOiB0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gXCJudW1iZXJcIiB8fCBvYmouc3BsaXQgfHwgb2JqLnNldEludGVydmFsIHx8IG9iai5jYWxsID8gW29ial0gOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmopIDogW107XG59XG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGFyZ2V0O1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBidWlsZEV4cHMoaXNJUkkpIHtcbiAgICB2YXIgQUxQSEEkJCA9IFwiW0EtWmEtel1cIixcbiAgICAgICAgQ1IkID0gXCJbXFxcXHgwRF1cIixcbiAgICAgICAgRElHSVQkJCA9IFwiWzAtOV1cIixcbiAgICAgICAgRFFVT1RFJCQgPSBcIltcXFxceDIyXVwiLFxuICAgICAgICBIRVhESUckJCA9IG1lcmdlKERJR0lUJCQsIFwiW0EtRmEtZl1cIiksXG4gICAgICAgIC8vY2FzZS1pbnNlbnNpdGl2ZVxuICAgIExGJCQgPSBcIltcXFxceDBBXVwiLFxuICAgICAgICBTUCQkID0gXCJbXFxcXHgyMF1cIixcbiAgICAgICAgUENUX0VOQ09ERUQkID0gc3ViZXhwKHN1YmV4cChcIiVbRUZlZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVs4OUEtRmEtZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkpLFxuICAgICAgICAvL2V4cGFuZGVkXG4gICAgR0VOX0RFTElNUyQkID0gXCJbXFxcXDpcXFxcL1xcXFw/XFxcXCNcXFxcW1xcXFxdXFxcXEBdXCIsXG4gICAgICAgIFNVQl9ERUxJTVMkJCA9IFwiW1xcXFwhXFxcXCRcXFxcJlxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFw7XFxcXD1dXCIsXG4gICAgICAgIFJFU0VSVkVEJCQgPSBtZXJnZShHRU5fREVMSU1TJCQsIFNVQl9ERUxJTVMkJCksXG4gICAgICAgIFVDU0NIQVIkJCA9IGlzSVJJID8gXCJbXFxcXHhBMC1cXFxcdTIwMERcXFxcdTIwMTAtXFxcXHUyMDI5XFxcXHUyMDJGLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkVGXVwiIDogXCJbXVwiLFxuICAgICAgICAvL3N1YnNldCwgZXhjbHVkZXMgYmlkaSBjb250cm9sIGNoYXJhY3RlcnNcbiAgICBJUFJJVkFURSQkID0gaXNJUkkgPyBcIltcXFxcdUUwMDAtXFxcXHVGOEZGXVwiIDogXCJbXVwiLFxuICAgICAgICAvL3N1YnNldFxuICAgIFVOUkVTRVJWRUQkJCA9IG1lcmdlKEFMUEhBJCQsIERJR0lUJCQsIFwiW1xcXFwtXFxcXC5cXFxcX1xcXFx+XVwiLCBVQ1NDSEFSJCQpLFxuICAgICAgICBTQ0hFTUUkID0gc3ViZXhwKEFMUEhBJCQgKyBtZXJnZShBTFBIQSQkLCBESUdJVCQkLCBcIltcXFxcK1xcXFwtXFxcXC5dXCIpICsgXCIqXCIpLFxuICAgICAgICBVU0VSSU5GTyQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XVwiKSkgKyBcIipcIiksXG4gICAgICAgIERFQ19PQ1RFVCQgPSBzdWJleHAoc3ViZXhwKFwiMjVbMC01XVwiKSArIFwifFwiICsgc3ViZXhwKFwiMlswLTRdXCIgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiMVwiICsgRElHSVQkJCArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCJbMS05XVwiICsgRElHSVQkJCkgKyBcInxcIiArIERJR0lUJCQpLFxuICAgICAgICBERUNfT0NURVRfUkVMQVhFRCQgPSBzdWJleHAoc3ViZXhwKFwiMjVbMC01XVwiKSArIFwifFwiICsgc3ViZXhwKFwiMlswLTRdXCIgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiMVwiICsgRElHSVQkJCArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIwP1sxLTldXCIgKyBESUdJVCQkKSArIFwifDA/MD9cIiArIERJR0lUJCQpLFxuICAgICAgICAvL3JlbGF4ZWQgcGFyc2luZyBydWxlc1xuICAgIElQVjRBRERSRVNTJCA9IHN1YmV4cChERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQpLFxuICAgICAgICBIMTYkID0gc3ViZXhwKEhFWERJRyQkICsgXCJ7MSw0fVwiKSxcbiAgICAgICAgTFMzMiQgPSBzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIgKyBIMTYkKSArIFwifFwiICsgSVBWNEFERFJFU1MkKSxcbiAgICAgICAgSVBWNkFERFJFU1MxJCA9IHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcIns2fVwiICsgTFMzMiQpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIDYoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzIkID0gc3ViZXhwKFwiXFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7NX1cIiArIExTMzIkKSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgXCI6OlwiIDUoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzMkID0gc3ViZXhwKHN1YmV4cChIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezR9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAgICAgICAgICAgICAgIGgxNiBdIFwiOjpcIiA0KCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M0JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwxfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInszfVwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjEoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAzKCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M1JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwyfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInsyfVwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjIoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAyKCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M2JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwzfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBIMTYkICsgXCJcXFxcOlwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjMoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAgICBoMTYgXCI6XCIgICBsczMyXG4gICAgSVBWNkFERFJFU1M3JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw0fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqNCggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiICAgICAgICAgICAgICBsczMyXG4gICAgSVBWNkFERFJFU1M4JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw1fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBIMTYkKSxcbiAgICAgICAgLy9bICo1KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgICAgICAgICAgICAgIGgxNlxuICAgIElQVjZBRERSRVNTOSQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsNn1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiKSxcbiAgICAgICAgLy9bICo2KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCJcbiAgICBJUFY2QUREUkVTUyQgPSBzdWJleHAoW0lQVjZBRERSRVNTMSQsIElQVjZBRERSRVNTMiQsIElQVjZBRERSRVNTMyQsIElQVjZBRERSRVNTNCQsIElQVjZBRERSRVNTNSQsIElQVjZBRERSRVNTNiQsIElQVjZBRERSRVNTNyQsIElQVjZBRERSRVNTOCQsIElQVjZBRERSRVNTOSRdLmpvaW4oXCJ8XCIpKSxcbiAgICAgICAgWk9ORUlEJCA9IHN1YmV4cChzdWJleHAoVU5SRVNFUlZFRCQkICsgXCJ8XCIgKyBQQ1RfRU5DT0RFRCQpICsgXCIrXCIpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgSVBWNkFERFJaJCA9IHN1YmV4cChJUFY2QUREUkVTUyQgKyBcIlxcXFwlMjVcIiArIFpPTkVJRCQpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgSVBWNkFERFJaX1JFTEFYRUQkID0gc3ViZXhwKElQVjZBRERSRVNTJCArIHN1YmV4cChcIlxcXFwlMjV8XFxcXCUoPyFcIiArIEhFWERJRyQkICsgXCJ7Mn0pXCIpICsgWk9ORUlEJCksXG4gICAgICAgIC8vUkZDIDY4NzQsIHdpdGggcmVsYXhlZCBwYXJzaW5nIHJ1bGVzXG4gICAgSVBWRlVUVVJFJCA9IHN1YmV4cChcIlt2Vl1cIiArIEhFWERJRyQkICsgXCIrXFxcXC5cIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOl1cIikgKyBcIitcIiksXG4gICAgICAgIElQX0xJVEVSQUwkID0gc3ViZXhwKFwiXFxcXFtcIiArIHN1YmV4cChJUFY2QUREUlpfUkVMQVhFRCQgKyBcInxcIiArIElQVjZBRERSRVNTJCArIFwifFwiICsgSVBWRlVUVVJFJCkgKyBcIlxcXFxdXCIpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgUkVHX05BTUUkID0gc3ViZXhwKHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSkgKyBcIipcIiksXG4gICAgICAgIEhPU1QkID0gc3ViZXhwKElQX0xJVEVSQUwkICsgXCJ8XCIgKyBJUFY0QUREUkVTUyQgKyBcIig/IVwiICsgUkVHX05BTUUkICsgXCIpXCIgKyBcInxcIiArIFJFR19OQU1FJCksXG4gICAgICAgIFBPUlQkID0gc3ViZXhwKERJR0lUJCQgKyBcIipcIiksXG4gICAgICAgIEFVVEhPUklUWSQgPSBzdWJleHAoc3ViZXhwKFVTRVJJTkZPJCArIFwiQFwiKSArIFwiP1wiICsgSE9TVCQgKyBzdWJleHAoXCJcXFxcOlwiICsgUE9SVCQpICsgXCI/XCIpLFxuICAgICAgICBQQ0hBUiQgPSBzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQF1cIikpLFxuICAgICAgICBTRUdNRU5UJCA9IHN1YmV4cChQQ0hBUiQgKyBcIipcIiksXG4gICAgICAgIFNFR01FTlRfTlokID0gc3ViZXhwKFBDSEFSJCArIFwiK1wiKSxcbiAgICAgICAgU0VHTUVOVF9OWl9OQyQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFxAXVwiKSkgKyBcIitcIiksXG4gICAgICAgIFBBVEhfQUJFTVBUWSQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cIiArIFNFR01FTlQkKSArIFwiKlwiKSxcbiAgICAgICAgUEFUSF9BQlNPTFVURSQgPSBzdWJleHAoXCJcXFxcL1wiICsgc3ViZXhwKFNFR01FTlRfTlokICsgUEFUSF9BQkVNUFRZJCkgKyBcIj9cIiksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfTk9TQ0hFTUUkID0gc3ViZXhwKFNFR01FTlRfTlpfTkMkICsgUEFUSF9BQkVNUFRZJCksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfUk9PVExFU1MkID0gc3ViZXhwKFNFR01FTlRfTlokICsgUEFUSF9BQkVNUFRZJCksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfRU1QVFkkID0gXCIoPyFcIiArIFBDSEFSJCArIFwiKVwiLFxuICAgICAgICBQQVRIJCA9IHN1YmV4cChQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFFVRVJZJCA9IHN1YmV4cChzdWJleHAoUENIQVIkICsgXCJ8XCIgKyBtZXJnZShcIltcXFxcL1xcXFw/XVwiLCBJUFJJVkFURSQkKSkgKyBcIipcIiksXG4gICAgICAgIEZSQUdNRU5UJCA9IHN1YmV4cChzdWJleHAoUENIQVIkICsgXCJ8W1xcXFwvXFxcXD9dXCIpICsgXCIqXCIpLFxuICAgICAgICBISUVSX1BBUlQkID0gc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC9cIiArIEFVVEhPUklUWSQgKyBQQVRIX0FCRU1QVFkkKSArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFVSSSQgPSBzdWJleHAoU0NIRU1FJCArIFwiXFxcXDpcIiArIEhJRVJfUEFSVCQgKyBzdWJleHAoXCJcXFxcP1wiICsgUVVFUlkkKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCNcIiArIEZSQUdNRU5UJCkgKyBcIj9cIiksXG4gICAgICAgIFJFTEFUSVZFX1BBUlQkID0gc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC9cIiArIEFVVEhPUklUWSQgKyBQQVRIX0FCRU1QVFkkKSArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfTk9TQ0hFTUUkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFJFTEFUSVZFJCA9IHN1YmV4cChSRUxBVElWRV9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcI1wiICsgRlJBR01FTlQkKSArIFwiP1wiKSxcbiAgICAgICAgVVJJX1JFRkVSRU5DRSQgPSBzdWJleHAoVVJJJCArIFwifFwiICsgUkVMQVRJVkUkKSxcbiAgICAgICAgQUJTT0xVVEVfVVJJJCA9IHN1YmV4cChTQ0hFTUUkICsgXCJcXFxcOlwiICsgSElFUl9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIpLFxuICAgICAgICBHRU5FUklDX1JFRiQgPSBcIl4oXCIgKyBTQ0hFTUUkICsgXCIpXFxcXDpcIiArIHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvKFwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/KVwiKSArIFwiPyhcIiArIFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX1JPT1RMRVNTJCArIFwifFwiICsgUEFUSF9FTVBUWSQgKyBcIilcIikgKyBzdWJleHAoXCJcXFxcPyhcIiArIFFVRVJZJCArIFwiKVwiKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCMoXCIgKyBGUkFHTUVOVCQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIFJFTEFUSVZFX1JFRiQgPSBcIl4oKXswfVwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfTk9TQ0hFTUUkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcIyhcIiArIEZSQUdNRU5UJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgQUJTT0xVVEVfUkVGJCA9IFwiXihcIiArIFNDSEVNRSQgKyBcIilcXFxcOlwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBTQU1FRE9DX1JFRiQgPSBcIl5cIiArIHN1YmV4cChcIlxcXFwjKFwiICsgRlJBR01FTlQkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBBVVRIT1JJVFlfUkVGJCA9IFwiXlwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/JFwiO1xuICAgIHJldHVybiB7XG4gICAgICAgIE5PVF9TQ0hFTUU6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgQUxQSEEkJCwgRElHSVQkJCwgXCJbXFxcXCtcXFxcLVxcXFwuXVwiKSwgXCJnXCIpLFxuICAgICAgICBOT1RfVVNFUklORk86IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXFxcXDpdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfSE9TVDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcW1xcXFxdXFxcXDpdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUEFUSDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcL1xcXFw6XFxcXEBdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUEFUSF9OT1NDSEVNRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcL1xcXFxAXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX1FVRVJZOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJV1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XFxcXEBcXFxcL1xcXFw/XVwiLCBJUFJJVkFURSQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfRlJBR01FTlQ6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQFxcXFwvXFxcXD9dXCIpLCBcImdcIiksXG4gICAgICAgIEVTQ0FQRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgVU5SRVNFUlZFRDogbmV3IFJlZ0V4cChVTlJFU0VSVkVEJCQsIFwiZ1wiKSxcbiAgICAgICAgT1RIRVJfQ0hBUlM6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFJFU0VSVkVEJCQpLCBcImdcIiksXG4gICAgICAgIFBDVF9FTkNPREVEOiBuZXcgUmVnRXhwKFBDVF9FTkNPREVEJCwgXCJnXCIpLFxuICAgICAgICBJUFY0QUREUkVTUzogbmV3IFJlZ0V4cChcIl4oXCIgKyBJUFY0QUREUkVTUyQgKyBcIikkXCIpLFxuICAgICAgICBJUFY2QUREUkVTUzogbmV3IFJlZ0V4cChcIl5cXFxcWz8oXCIgKyBJUFY2QUREUkVTUyQgKyBcIilcIiArIHN1YmV4cChzdWJleHAoXCJcXFxcJTI1fFxcXFwlKD8hXCIgKyBIRVhESUckJCArIFwiezJ9KVwiKSArIFwiKFwiICsgWk9ORUlEJCArIFwiKVwiKSArIFwiP1xcXFxdPyRcIikgLy9SRkMgNjg3NCwgd2l0aCByZWxheGVkIHBhcnNpbmcgcnVsZXNcbiAgICB9O1xufVxudmFyIFVSSV9QUk9UT0NPTCA9IGJ1aWxkRXhwcyhmYWxzZSk7XG5cbnZhciBJUklfUFJPVE9DT0wgPSBidWlsZEV4cHModHJ1ZSk7XG5cbnZhciBzbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxuLyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXG52YXIgbWF4SW50ID0gMjE0NzQ4MzY0NzsgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG4vKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG52YXIgYmFzZSA9IDM2O1xudmFyIHRNaW4gPSAxO1xudmFyIHRNYXggPSAyNjtcbnZhciBza2V3ID0gMzg7XG52YXIgZGFtcCA9IDcwMDtcbnZhciBpbml0aWFsQmlhcyA9IDcyO1xudmFyIGluaXRpYWxOID0gMTI4OyAvLyAweDgwXG52YXIgZGVsaW1pdGVyID0gJy0nOyAvLyAnXFx4MkQnXG5cbi8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG52YXIgcmVnZXhQdW55Y29kZSA9IC9eeG4tLS87XG52YXIgcmVnZXhOb25BU0NJSSA9IC9bXlxcMC1cXHg3RV0vOyAvLyBub24tQVNDSUkgY2hhcnNcbnZhciByZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nOyAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cbi8qKiBFcnJvciBtZXNzYWdlcyAqL1xudmFyIGVycm9ycyA9IHtcblx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcbn07XG5cbi8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cbnZhciBiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBlcnJvciQxKHR5cGUpIHtcblx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcbn1cblxuLyoqXG4gKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG4gKiBpdGVtLlxuICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncyBvciBlbWFpbFxuICogYWRkcmVzc2VzLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcbiAqIGNoYXJhY3Rlci5cbiAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcblx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRyZXN1bHQgPSBwYXJ0c1swXSArICdAJztcblx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0fVxuXHQvLyBBdm9pZCBgc3BsaXQocmVnZXgpYCBmb3IgSUU4IGNvbXBhdGliaWxpdHkuIFNlZSAjMTcuXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0dmFyIGVuY29kZWQgPSBtYXAobGFiZWxzLCBmbikuam9pbignLicpO1xuXHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG4gKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG4gKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG4gKiBtYXRjaGluZyBVVEYtMTYuXG4gKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcbiAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcbiAqIEBuYW1lIGRlY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXHR2YXIgY291bnRlciA9IDA7XG5cdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdHZhciB2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cblx0XHRcdHZhciBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHtcblx0XHRcdFx0Ly8gTG93IHN1cnJvZ2F0ZS5cblx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG5cdFx0XHRcdC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cbiAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcbiAqIEBuYW1lIGVuY29kZVxuICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cbiAqL1xudmFyIHVjczJlbmNvZGUgPSBmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludC5hcHBseShTdHJpbmcsIHRvQ29uc3VtYWJsZUFycmF5KGFycmF5KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cbiAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG4gKi9cbnZhciBiYXNpY1RvRGlnaXQgPSBmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdGlmIChjb2RlUG9pbnQgLSAweDMwIDwgMHgwQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDE2O1xuXHR9XG5cdGlmIChjb2RlUG9pbnQgLSAweDQxIDwgMHgxQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDQxO1xuXHR9XG5cdGlmIChjb2RlUG9pbnQgLSAweDYxIDwgMHgxQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDYxO1xuXHR9XG5cdHJldHVybiBiYXNlO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3JcbiAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG4gKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcbiAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG4gKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuICovXG52YXIgZGlnaXRUb0Jhc2ljID0gZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xufTtcblxuLyoqXG4gKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBhZGFwdCA9IGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHR2YXIgayA9IDA7XG5cdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0Zm9yICg7IC8qIG5vIGluaXRpYWxpemF0aW9uICovZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdH1cblx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG4gKiBzeW1ib2xzLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKi9cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0Ly8gRG9uJ3QgdXNlIFVDUy0yLlxuXHR2YXIgb3V0cHV0ID0gW107XG5cdHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0dmFyIGkgPSAwO1xuXHR2YXIgbiA9IGluaXRpYWxOO1xuXHR2YXIgYmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHR2YXIgYmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0YmFzaWMgPSAwO1xuXHR9XG5cblx0Zm9yICh2YXIgaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0ZXJyb3IkMSgnbm90LWJhc2ljJyk7XG5cdFx0fVxuXHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHR9XG5cblx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdGZvciAodmFyIGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDspIC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi97XG5cblx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdHZhciBvbGRpID0gaTtcblx0XHRmb3IgKHZhciB3ID0gMSwgayA9IGJhc2U7OyAvKiBubyBjb25kaXRpb24gKi9rICs9IGJhc2UpIHtcblxuXHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdGVycm9yJDEoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0dmFyIHQgPSBrIDw9IGJpYXMgPyB0TWluIDogayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcztcblxuXHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXHRcdH1cblxuXHRcdHZhciBvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdH1cblxuXHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0aSAlPSBvdXQ7XG5cblx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0LlxuXHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblx0fVxuXG5cdHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludC5hcHBseShTdHJpbmcsIG91dHB1dCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG4gKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKi9cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXG5cdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIGFuIGFycmF5IG9mIFVuaWNvZGUgY29kZSBwb2ludHMuXG5cdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0Ly8gQ2FjaGUgdGhlIGxlbmd0aC5cblx0dmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlLlxuXHR2YXIgbiA9IGluaXRpYWxOO1xuXHR2YXIgZGVsdGEgPSAwO1xuXHR2YXIgYmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHMuXG5cdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0dmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG5cdHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuXHR0cnkge1xuXHRcdGZvciAodmFyIF9pdGVyYXRvciA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuXHRcdFx0dmFyIF9jdXJyZW50VmFsdWUyID0gX3N0ZXAudmFsdWU7XG5cblx0XHRcdGlmIChfY3VycmVudFZhbHVlMiA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKF9jdXJyZW50VmFsdWUyKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG5cdFx0X2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG5cdH0gZmluYWxseSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG5cdFx0XHRcdF9pdGVyYXRvci5yZXR1cm4oKTtcblx0XHRcdH1cblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG5cdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHZhciBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cdHZhciBoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoO1xuXG5cdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgd2l0aCBhIGRlbGltaXRlciB1bmxlc3MgaXQncyBlbXB0eS5cblx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0fVxuXG5cdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdHZhciBtID0gbWF4SW50O1xuXHRcdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG5cdFx0dmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuXHRcdHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cblx0XHR0cnkge1xuXHRcdFx0Zm9yICh2YXIgX2l0ZXJhdG9yMiA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG5cdFx0XHRcdHZhciBjdXJyZW50VmFsdWUgPSBfc3RlcDIudmFsdWU7XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93LlxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcblx0XHRcdF9pdGVyYXRvckVycm9yMiA9IGVycjtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuXHRcdFx0XHRcdF9pdGVyYXRvcjIucmV0dXJuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcblx0XHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgaGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdH1cblxuXHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0biA9IG07XG5cblx0XHR2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuXHRcdHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcblx0XHR2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGZvciAodmFyIF9pdGVyYXRvcjMgPSBpbnB1dFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuXHRcdFx0XHR2YXIgX2N1cnJlbnRWYWx1ZSA9IF9zdGVwMy52YWx1ZTtcblxuXHRcdFx0XHRpZiAoX2N1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF9jdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxuXHRcdFx0XHRcdHZhciBxID0gZGVsdGE7XG5cdFx0XHRcdFx0Zm9yICh2YXIgayA9IGJhc2U7OyAvKiBubyBjb25kaXRpb24gKi9rICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gayA8PSBiaWFzID8gdE1pbiA6IGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXM7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgcU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0dmFyIGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSkpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcblx0XHRcdF9pdGVyYXRvckVycm9yMyA9IGVycjtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge1xuXHRcdFx0XHRcdF9pdGVyYXRvcjMucmV0dXJuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcblx0XHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQrK2RlbHRhO1xuXHRcdCsrbjtcblx0fVxuXHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG4gKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG4gKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cbiAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG4gKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcbiAqIHN0cmluZy5cbiAqL1xudmFyIHRvVW5pY29kZSA9IGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpID8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKSA6IHN0cmluZztcblx0fSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG4gKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cbiAqIEFTQ0lJLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuICogVW5pY29kZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG4gKiBlbWFpbCBhZGRyZXNzLlxuICovXG52YXIgdG9BU0NJSSA9IGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKSA/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpIDogc3RyaW5nO1xuXHR9KTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG52YXIgcHVueWNvZGUgPSB7XG5cdC8qKlxuICAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cbiAgKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAgKiBAdHlwZSBTdHJpbmdcbiAgKi9cblx0J3ZlcnNpb24nOiAnMi4xLjAnLFxuXHQvKipcbiAgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuICAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG4gICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG4gICogQG1lbWJlck9mIHB1bnljb2RlXG4gICogQHR5cGUgT2JqZWN0XG4gICovXG5cdCd1Y3MyJzoge1xuXHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdH0sXG5cdCdkZWNvZGUnOiBkZWNvZGUsXG5cdCdlbmNvZGUnOiBlbmNvZGUsXG5cdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxufTtcblxuLyoqXG4gKiBVUkkuanNcbiAqXG4gKiBAZmlsZW92ZXJ2aWV3IEFuIFJGQyAzOTg2IGNvbXBsaWFudCwgc2NoZW1lIGV4dGVuZGFibGUgVVJJIHBhcnNpbmcvdmFsaWRhdGluZy9yZXNvbHZpbmcgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpnYXJ5LmNvdXJ0QGdtYWlsLmNvbVwiPkdhcnkgQ291cnQ8L2E+XG4gKiBAc2VlIGh0dHA6Ly9naXRodWIuY29tL2dhcnljb3VydC91cmktanNcbiAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMSBHYXJ5IENvdXJ0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sIGFyZVxuICogcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogICAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2ZcbiAqICAgICAgIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqXG4gKiAgICAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdFxuICogICAgICAgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHNcbiAqICAgICAgIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIEdBUlkgQ09VUlQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEXG4gKiBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgR0FSWSBDT1VSVCBPUlxuICogQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1JcbiAqIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbiAqIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAqIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRlxuICogQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICogVGhlIHZpZXdzIGFuZCBjb25jbHVzaW9ucyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFuZCBkb2N1bWVudGF0aW9uIGFyZSB0aG9zZSBvZiB0aGVcbiAqIGF1dGhvcnMgYW5kIHNob3VsZCBub3QgYmUgaW50ZXJwcmV0ZWQgYXMgcmVwcmVzZW50aW5nIG9mZmljaWFsIHBvbGljaWVzLCBlaXRoZXIgZXhwcmVzc2VkXG4gKiBvciBpbXBsaWVkLCBvZiBHYXJ5IENvdXJ0LlxuICovXG52YXIgU0NIRU1FUyA9IHt9O1xuZnVuY3Rpb24gcGN0RW5jQ2hhcihjaHIpIHtcbiAgICB2YXIgYyA9IGNoci5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBlID0gdm9pZCAwO1xuICAgIGlmIChjIDwgMTYpIGUgPSBcIiUwXCIgKyBjLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO2Vsc2UgaWYgKGMgPCAxMjgpIGUgPSBcIiVcIiArIGMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7ZWxzZSBpZiAoYyA8IDIwNDgpIGUgPSBcIiVcIiArIChjID4+IDYgfCAxOTIpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtlbHNlIGUgPSBcIiVcIiArIChjID4+IDEyIHwgMjI0KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiJVwiICsgKGMgPj4gNiAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiJVwiICsgKGMgJiA2MyB8IDEyOCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBwY3REZWNDaGFycyhzdHIpIHtcbiAgICB2YXIgbmV3U3RyID0gXCJcIjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGlsID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGlsKSB7XG4gICAgICAgIHZhciBjID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgMSwgMiksIDE2KTtcbiAgICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgICAgIG5ld1N0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPj0gMTk0ICYmIGMgPCAyMjQpIHtcbiAgICAgICAgICAgIGlmIChpbCAtIGkgPj0gNikge1xuICAgICAgICAgICAgICAgIHZhciBjMiA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDQsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IGMyICYgNjMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCA2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gNjtcbiAgICAgICAgfSBlbHNlIGlmIChjID49IDIyNCkge1xuICAgICAgICAgICAgaWYgKGlsIC0gaSA+PSA5KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9jID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICB2YXIgYzMgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyA3LCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMTUpIDw8IDEyIHwgKF9jICYgNjMpIDw8IDYgfCBjMyAmIDYzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IHN0ci5zdWJzdHIoaSwgOSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCAzKTtcbiAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3U3RyO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKSB7XG4gICAgZnVuY3Rpb24gZGVjb2RlVW5yZXNlcnZlZChzdHIpIHtcbiAgICAgICAgdmFyIGRlY1N0ciA9IHBjdERlY0NoYXJzKHN0cik7XG4gICAgICAgIHJldHVybiAhZGVjU3RyLm1hdGNoKHByb3RvY29sLlVOUkVTRVJWRUQpID8gc3RyIDogZGVjU3RyO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5zY2hlbWUpIGNvbXBvbmVudHMuc2NoZW1lID0gU3RyaW5nKGNvbXBvbmVudHMuc2NoZW1lKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UocHJvdG9jb2wuTk9UX1NDSEVNRSwgXCJcIik7XG4gICAgaWYgKGNvbXBvbmVudHMudXNlcmluZm8gIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy51c2VyaW5mbyA9IFN0cmluZyhjb21wb25lbnRzLnVzZXJpbmZvKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKHByb3RvY29sLk5PVF9VU0VSSU5GTywgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLmhvc3QgIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5ob3N0ID0gU3RyaW5nKGNvbXBvbmVudHMuaG9zdCkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKHByb3RvY29sLk5PVF9IT1NULCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMucGF0aCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLnBhdGggPSBTdHJpbmcoY29tcG9uZW50cy5wYXRoKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKGNvbXBvbmVudHMuc2NoZW1lID8gcHJvdG9jb2wuTk9UX1BBVEggOiBwcm90b2NvbC5OT1RfUEFUSF9OT1NDSEVNRSwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLnF1ZXJ5ICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMucXVlcnkgPSBTdHJpbmcoY29tcG9uZW50cy5xdWVyeSkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShwcm90b2NvbC5OT1RfUVVFUlksIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLmZyYWdtZW50ID0gU3RyaW5nKGNvbXBvbmVudHMuZnJhZ21lbnQpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UocHJvdG9jb2wuTk9UX0ZSQUdNRU5ULCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG59XG5cbmZ1bmN0aW9uIF9zdHJpcExlYWRpbmdaZXJvcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL14wKiguKikvLCBcIiQxXCIpIHx8IFwiMFwiO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUlQdjQoaG9zdCwgcHJvdG9jb2wpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGhvc3QubWF0Y2gocHJvdG9jb2wuSVBWNEFERFJFU1MpIHx8IFtdO1xuXG4gICAgdmFyIF9tYXRjaGVzID0gc2xpY2VkVG9BcnJheShtYXRjaGVzLCAyKSxcbiAgICAgICAgYWRkcmVzcyA9IF9tYXRjaGVzWzFdO1xuXG4gICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIGFkZHJlc3Muc3BsaXQoXCIuXCIpLm1hcChfc3RyaXBMZWFkaW5nWmVyb3MpLmpvaW4oXCIuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBob3N0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemVJUHY2KGhvc3QsIHByb3RvY29sKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBob3N0Lm1hdGNoKHByb3RvY29sLklQVjZBRERSRVNTKSB8fCBbXTtcblxuICAgIHZhciBfbWF0Y2hlczIgPSBzbGljZWRUb0FycmF5KG1hdGNoZXMsIDMpLFxuICAgICAgICBhZGRyZXNzID0gX21hdGNoZXMyWzFdLFxuICAgICAgICB6b25lID0gX21hdGNoZXMyWzJdO1xuXG4gICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgICAgdmFyIF9hZGRyZXNzJHRvTG93ZXJDYXNlJCA9IGFkZHJlc3MudG9Mb3dlckNhc2UoKS5zcGxpdCgnOjonKS5yZXZlcnNlKCksXG4gICAgICAgICAgICBfYWRkcmVzcyR0b0xvd2VyQ2FzZSQyID0gc2xpY2VkVG9BcnJheShfYWRkcmVzcyR0b0xvd2VyQ2FzZSQsIDIpLFxuICAgICAgICAgICAgbGFzdCA9IF9hZGRyZXNzJHRvTG93ZXJDYXNlJDJbMF0sXG4gICAgICAgICAgICBmaXJzdCA9IF9hZGRyZXNzJHRvTG93ZXJDYXNlJDJbMV07XG5cbiAgICAgICAgdmFyIGZpcnN0RmllbGRzID0gZmlyc3QgPyBmaXJzdC5zcGxpdChcIjpcIikubWFwKF9zdHJpcExlYWRpbmdaZXJvcykgOiBbXTtcbiAgICAgICAgdmFyIGxhc3RGaWVsZHMgPSBsYXN0LnNwbGl0KFwiOlwiKS5tYXAoX3N0cmlwTGVhZGluZ1plcm9zKTtcbiAgICAgICAgdmFyIGlzTGFzdEZpZWxkSVB2NEFkZHJlc3MgPSBwcm90b2NvbC5JUFY0QUREUkVTUy50ZXN0KGxhc3RGaWVsZHNbbGFzdEZpZWxkcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBmaWVsZENvdW50ID0gaXNMYXN0RmllbGRJUHY0QWRkcmVzcyA/IDcgOiA4O1xuICAgICAgICB2YXIgbGFzdEZpZWxkc1N0YXJ0ID0gbGFzdEZpZWxkcy5sZW5ndGggLSBmaWVsZENvdW50O1xuICAgICAgICB2YXIgZmllbGRzID0gQXJyYXkoZmllbGRDb3VudCk7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgZmllbGRDb3VudDsgKyt4KSB7XG4gICAgICAgICAgICBmaWVsZHNbeF0gPSBmaXJzdEZpZWxkc1t4XSB8fCBsYXN0RmllbGRzW2xhc3RGaWVsZHNTdGFydCArIHhdIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0xhc3RGaWVsZElQdjRBZGRyZXNzKSB7XG4gICAgICAgICAgICBmaWVsZHNbZmllbGRDb3VudCAtIDFdID0gX25vcm1hbGl6ZUlQdjQoZmllbGRzW2ZpZWxkQ291bnQgLSAxXSwgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbGxaZXJvRmllbGRzID0gZmllbGRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghZmllbGQgfHwgZmllbGQgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RMb25nZXN0ID0gYWNjW2FjYy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdExvbmdlc3QgJiYgbGFzdExvbmdlc3QuaW5kZXggKyBsYXN0TG9uZ2VzdC5sZW5ndGggPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb25nZXN0Lmxlbmd0aCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKHsgaW5kZXg6IGluZGV4LCBsZW5ndGg6IDEgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB2YXIgbG9uZ2VzdFplcm9GaWVsZHMgPSBhbGxaZXJvRmllbGRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9KVswXTtcbiAgICAgICAgdmFyIG5ld0hvc3QgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsb25nZXN0WmVyb0ZpZWxkcyAmJiBsb25nZXN0WmVyb0ZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgbmV3Rmlyc3QgPSBmaWVsZHMuc2xpY2UoMCwgbG9uZ2VzdFplcm9GaWVsZHMuaW5kZXgpO1xuICAgICAgICAgICAgdmFyIG5ld0xhc3QgPSBmaWVsZHMuc2xpY2UobG9uZ2VzdFplcm9GaWVsZHMuaW5kZXggKyBsb25nZXN0WmVyb0ZpZWxkcy5sZW5ndGgpO1xuICAgICAgICAgICAgbmV3SG9zdCA9IG5ld0ZpcnN0LmpvaW4oXCI6XCIpICsgXCI6OlwiICsgbmV3TGFzdC5qb2luKFwiOlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0hvc3QgPSBmaWVsZHMuam9pbihcIjpcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHpvbmUpIHtcbiAgICAgICAgICAgIG5ld0hvc3QgKz0gXCIlXCIgKyB6b25lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdIb3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBob3N0O1xuICAgIH1cbn1cbnZhciBVUklfUEFSU0UgPSAvXig/OihbXjpcXC8/I10rKTopPyg/OlxcL1xcLygoPzooW15cXC8/I0BdKilAKT8oXFxbW15cXC8/I1xcXV0rXFxdfFteXFwvPyM6XSopKD86XFw6KFxcZCopKT8pKT8oW14/I10qKSg/OlxcPyhbXiNdKikpPyg/OiMoKD86LnxcXG58XFxyKSopKT8vaTtcbnZhciBOT19NQVRDSF9JU19VTkRFRklORUQgPSBcIlwiLm1hdGNoKC8oKXswfS8pWzFdID09PSB1bmRlZmluZWQ7XG5mdW5jdGlvbiBwYXJzZSh1cmlTdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpICE9PSBmYWxzZSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgPT09IFwic3VmZml4XCIpIHVyaVN0cmluZyA9IChvcHRpb25zLnNjaGVtZSA/IG9wdGlvbnMuc2NoZW1lICsgXCI6XCIgOiBcIlwiKSArIFwiLy9cIiArIHVyaVN0cmluZztcbiAgICB2YXIgbWF0Y2hlcyA9IHVyaVN0cmluZy5tYXRjaChVUklfUEFSU0UpO1xuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGlmIChOT19NQVRDSF9JU19VTkRFRklORUQpIHtcbiAgICAgICAgICAgIC8vc3RvcmUgZWFjaCBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbXBvbmVudHMuc2NoZW1lID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMudXNlcmluZm8gPSBtYXRjaGVzWzNdO1xuICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gbWF0Y2hlc1s0XTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHBhcnNlSW50KG1hdGNoZXNbNV0sIDEwKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IG1hdGNoZXNbNl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucXVlcnkgPSBtYXRjaGVzWzddO1xuICAgICAgICAgICAgY29tcG9uZW50cy5mcmFnbWVudCA9IG1hdGNoZXNbOF07XG4gICAgICAgICAgICAvL2ZpeCBwb3J0IG51bWJlclxuICAgICAgICAgICAgaWYgKGlzTmFOKGNvbXBvbmVudHMucG9ydCkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBtYXRjaGVzWzVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JRSBGSVggZm9yIGltcHJvcGVyIFJlZ0V4cCBtYXRjaGluZ1xuICAgICAgICAgICAgLy9zdG9yZSBlYWNoIGNvbXBvbmVudFxuICAgICAgICAgICAgY29tcG9uZW50cy5zY2hlbWUgPSBtYXRjaGVzWzFdIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMudXNlcmluZm8gPSB1cmlTdHJpbmcuaW5kZXhPZihcIkBcIikgIT09IC0xID8gbWF0Y2hlc1szXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IHVyaVN0cmluZy5pbmRleE9mKFwiLy9cIikgIT09IC0xID8gbWF0Y2hlc1s0XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHBhcnNlSW50KG1hdGNoZXNbNV0sIDEwKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IG1hdGNoZXNbNl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucXVlcnkgPSB1cmlTdHJpbmcuaW5kZXhPZihcIj9cIikgIT09IC0xID8gbWF0Y2hlc1s3XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuZnJhZ21lbnQgPSB1cmlTdHJpbmcuaW5kZXhPZihcIiNcIikgIT09IC0xID8gbWF0Y2hlc1s4XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIC8vZml4IHBvcnQgbnVtYmVyXG4gICAgICAgICAgICBpZiAoaXNOYU4oY29tcG9uZW50cy5wb3J0KSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHVyaVN0cmluZy5tYXRjaCgvXFwvXFwvKD86LnxcXG4pKlxcOig/OlxcL3xcXD98XFwjfCQpLykgPyBtYXRjaGVzWzRdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnRzLmhvc3QpIHtcbiAgICAgICAgICAgIC8vbm9ybWFsaXplIElQIGhvc3RzXG4gICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBfbm9ybWFsaXplSVB2Nihfbm9ybWFsaXplSVB2NChjb21wb25lbnRzLmhvc3QsIHByb3RvY29sKSwgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgICAgIC8vZGV0ZXJtaW5lIHJlZmVyZW5jZSB0eXBlXG4gICAgICAgIGlmIChjb21wb25lbnRzLnNjaGVtZSA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMudXNlcmluZm8gPT09IHVuZGVmaW5lZCAmJiBjb21wb25lbnRzLmhvc3QgPT09IHVuZGVmaW5lZCAmJiBjb21wb25lbnRzLnBvcnQgPT09IHVuZGVmaW5lZCAmJiAhY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcInNhbWUtZG9jdW1lbnRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRzLnNjaGVtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRzLmZyYWdtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcInVyaVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vY2hlY2sgZm9yIHJlZmVyZW5jZSBlcnJvcnNcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmZXJlbmNlICYmIG9wdGlvbnMucmVmZXJlbmNlICE9PSBcInN1ZmZpeFwiICYmIG9wdGlvbnMucmVmZXJlbmNlICE9PSBjb21wb25lbnRzLnJlZmVyZW5jZSkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJVUkkgaXMgbm90IGEgXCIgKyBvcHRpb25zLnJlZmVyZW5jZSArIFwiIHJlZmVyZW5jZS5cIjtcbiAgICAgICAgfVxuICAgICAgICAvL2ZpbmQgc2NoZW1lIGhhbmRsZXJcbiAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTWyhvcHRpb25zLnNjaGVtZSB8fCBjb21wb25lbnRzLnNjaGVtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgLy9jaGVjayBpZiBzY2hlbWUgY2FuJ3QgaGFuZGxlIElSSXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnVuaWNvZGVTdXBwb3J0ICYmICghc2NoZW1lSGFuZGxlciB8fCAhc2NoZW1lSGFuZGxlci51bmljb2RlU3VwcG9ydCkpIHtcbiAgICAgICAgICAgIC8vaWYgaG9zdCBjb21wb25lbnQgaXMgYSBkb21haW4gbmFtZVxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMuaG9zdCAmJiAob3B0aW9ucy5kb21haW5Ib3N0IHx8IHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5kb21haW5Ib3N0KSkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBVbmljb2RlIElETiAtPiBBU0NJSSBJRE5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBwdW55Y29kZS50b0FTQ0lJKGNvbXBvbmVudHMuaG9zdC5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBwY3REZWNDaGFycykudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhvc3QncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBBU0NJSSB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnZlcnQgSVJJIC0+IFVSSVxuICAgICAgICAgICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIFVSSV9QUk9UT0NPTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL25vcm1hbGl6ZSBlbmNvZGluZ3NcbiAgICAgICAgICAgIF9ub3JtYWxpemVDb21wb25lbnRFbmNvZGluZyhjb21wb25lbnRzLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9wZXJmb3JtIHNjaGVtZSBzcGVjaWZpYyBwYXJzaW5nXG4gICAgICAgIGlmIChzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIucGFyc2UpIHtcbiAgICAgICAgICAgIHNjaGVtZUhhbmRsZXIucGFyc2UoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIlVSSSBjYW4gbm90IGJlIHBhcnNlZC5cIjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG59XG5cbmZ1bmN0aW9uIF9yZWNvbXBvc2VBdXRob3JpdHkoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpICE9PSBmYWxzZSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICB2YXIgdXJpVG9rZW5zID0gW107XG4gICAgaWYgKGNvbXBvbmVudHMudXNlcmluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnVzZXJpbmZvKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCJAXCIpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5ob3N0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy9ub3JtYWxpemUgSVAgaG9zdHMsIGFkZCBicmFja2V0cyBhbmQgZXNjYXBlIHpvbmUgc2VwYXJhdG9yIGZvciBJUHY2XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKF9ub3JtYWxpemVJUHY2KF9ub3JtYWxpemVJUHY0KFN0cmluZyhjb21wb25lbnRzLmhvc3QpLCBwcm90b2NvbCksIHByb3RvY29sKS5yZXBsYWNlKHByb3RvY29sLklQVjZBRERSRVNTLCBmdW5jdGlvbiAoXywgJDEsICQyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJbXCIgKyAkMSArICgkMiA/IFwiJTI1XCIgKyAkMiA6IFwiXCIpICsgXCJdXCI7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnRzLnBvcnQgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIGNvbXBvbmVudHMucG9ydCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIjpcIik7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFN0cmluZyhjb21wb25lbnRzLnBvcnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaVRva2Vucy5sZW5ndGggPyB1cmlUb2tlbnMuam9pbihcIlwiKSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIFJEUzEgPSAvXlxcLlxcLj9cXC8vO1xudmFyIFJEUzIgPSAvXlxcL1xcLihcXC98JCkvO1xudmFyIFJEUzMgPSAvXlxcL1xcLlxcLihcXC98JCkvO1xudmFyIFJEUzUgPSAvXlxcLz8oPzoufFxcbikqPyg/PVxcL3wkKS87XG5mdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyhpbnB1dCkge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIGlmIChpbnB1dC5tYXRjaChSRFMxKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKFJEUzEsIFwiXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0Lm1hdGNoKFJEUzIpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMiwgXCIvXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0Lm1hdGNoKFJEUzMpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMywgXCIvXCIpO1xuICAgICAgICAgICAgb3V0cHV0LnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0ID09PSBcIi5cIiB8fCBpbnB1dCA9PT0gXCIuLlwiKSB7XG4gICAgICAgICAgICBpbnB1dCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaW0gPSBpbnB1dC5tYXRjaChSRFM1KTtcbiAgICAgICAgICAgIGlmIChpbSkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gaW1bMF07XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zbGljZShzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2gocyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgZG90IHNlZ21lbnQgY29uZGl0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQuam9pbihcIlwiKTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKGNvbXBvbmVudHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB2YXIgcHJvdG9jb2wgPSBvcHRpb25zLmlyaSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICB2YXIgdXJpVG9rZW5zID0gW107XG4gICAgLy9maW5kIHNjaGVtZSBoYW5kbGVyXG4gICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTWyhvcHRpb25zLnNjaGVtZSB8fCBjb21wb25lbnRzLnNjaGVtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXTtcbiAgICAvL3BlcmZvcm0gc2NoZW1lIHNwZWNpZmljIHNlcmlhbGl6YXRpb25cbiAgICBpZiAoc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZSkgc2NoZW1lSGFuZGxlci5zZXJpYWxpemUoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAvL2lmIGhvc3QgY29tcG9uZW50IGlzIGFuIElQdjYgYWRkcmVzc1xuICAgICAgICBpZiAocHJvdG9jb2wuSVBWNkFERFJFU1MudGVzdChjb21wb25lbnRzLmhvc3QpKSB7fVxuICAgICAgICAvL1RPRE86IG5vcm1hbGl6ZSBJUHY2IGFkZHJlc3MgYXMgcGVyIFJGQyA1OTUyXG5cbiAgICAgICAgLy9pZiBob3N0IGNvbXBvbmVudCBpcyBhIGRvbWFpbiBuYW1lXG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZG9tYWluSG9zdCB8fCBzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIuZG9tYWluSG9zdCkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBJRE4gdmlhIHB1bnljb2RlXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gIW9wdGlvbnMuaXJpID8gcHVueWNvZGUudG9BU0NJSShjb21wb25lbnRzLmhvc3QucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgcGN0RGVjQ2hhcnMpLnRvTG93ZXJDYXNlKCkpIDogcHVueWNvZGUudG9Vbmljb2RlKGNvbXBvbmVudHMuaG9zdCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhvc3QncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBcIiArICghb3B0aW9ucy5pcmkgPyBcIkFTQ0lJXCIgOiBcIlVuaWNvZGVcIikgKyBcIiB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIC8vbm9ybWFsaXplIGVuY29kaW5nXG4gICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKTtcbiAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIgJiYgY29tcG9uZW50cy5zY2hlbWUpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy5zY2hlbWUpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIjpcIik7XG4gICAgfVxuICAgIHZhciBhdXRob3JpdHkgPSBfcmVjb21wb3NlQXV0aG9yaXR5KGNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgIGlmIChhdXRob3JpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIpIHtcbiAgICAgICAgICAgIHVyaVRva2Vucy5wdXNoKFwiLy9cIik7XG4gICAgICAgIH1cbiAgICAgICAgdXJpVG9rZW5zLnB1c2goYXV0aG9yaXR5KTtcbiAgICAgICAgaWYgKGNvbXBvbmVudHMucGF0aCAmJiBjb21wb25lbnRzLnBhdGguY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIvXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcyA9IGNvbXBvbmVudHMucGF0aDtcbiAgICAgICAgaWYgKCFvcHRpb25zLmFic29sdXRlUGF0aCAmJiAoIXNjaGVtZUhhbmRsZXIgfHwgIXNjaGVtZUhhbmRsZXIuYWJzb2x1dGVQYXRoKSkge1xuICAgICAgICAgICAgcyA9IHJlbW92ZURvdFNlZ21lbnRzKHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdXRob3JpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcyA9IHMucmVwbGFjZSgvXlxcL1xcLy8sIFwiLyUyRlwiKTsgLy9kb24ndCBhbGxvdyB0aGUgcGF0aCB0byBzdGFydCB3aXRoIFwiLy9cIlxuICAgICAgICB9XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKHMpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5xdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiP1wiKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy5xdWVyeSk7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIjXCIpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLmZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaVRva2Vucy5qb2luKFwiXCIpOyAvL21lcmdlIHRva2VucyBpbnRvIGEgc3RyaW5nXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb21wb25lbnRzKGJhc2UsIHJlbGF0aXZlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIHZhciBza2lwTm9ybWFsaXphdGlvbiA9IGFyZ3VtZW50c1szXTtcblxuICAgIHZhciB0YXJnZXQgPSB7fTtcbiAgICBpZiAoIXNraXBOb3JtYWxpemF0aW9uKSB7XG4gICAgICAgIGJhc2UgPSBwYXJzZShzZXJpYWxpemUoYmFzZSwgb3B0aW9ucyksIG9wdGlvbnMpOyAvL25vcm1hbGl6ZSBiYXNlIGNvbXBvbmVudHNcbiAgICAgICAgcmVsYXRpdmUgPSBwYXJzZShzZXJpYWxpemUocmVsYXRpdmUsIG9wdGlvbnMpLCBvcHRpb25zKTsgLy9ub3JtYWxpemUgcmVsYXRpdmUgY29tcG9uZW50c1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMudG9sZXJhbnQgJiYgcmVsYXRpdmUuc2NoZW1lKSB7XG4gICAgICAgIHRhcmdldC5zY2hlbWUgPSByZWxhdGl2ZS5zY2hlbWU7XG4gICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IHJlbGF0aXZlLmF1dGhvcml0eTtcbiAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gcmVsYXRpdmUudXNlcmluZm87XG4gICAgICAgIHRhcmdldC5ob3N0ID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgdGFyZ2V0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGggfHwgXCJcIik7XG4gICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZWxhdGl2ZS51c2VyaW5mbyAhPT0gdW5kZWZpbmVkIHx8IHJlbGF0aXZlLmhvc3QgIT09IHVuZGVmaW5lZCB8fCByZWxhdGl2ZS5wb3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IHJlbGF0aXZlLmF1dGhvcml0eTtcbiAgICAgICAgICAgIHRhcmdldC51c2VyaW5mbyA9IHJlbGF0aXZlLnVzZXJpbmZvO1xuICAgICAgICAgICAgdGFyZ2V0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICAgICAgdGFyZ2V0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWxhdGl2ZS5wYXRoIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXJlbGF0aXZlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IGJhc2UucGF0aDtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUucXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlLnBhdGguY2hhckF0KDApID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoYmFzZS51c2VyaW5mbyAhPT0gdW5kZWZpbmVkIHx8IGJhc2UuaG9zdCAhPT0gdW5kZWZpbmVkIHx8IGJhc2UucG9ydCAhPT0gdW5kZWZpbmVkKSAmJiAhYmFzZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IFwiL1wiICsgcmVsYXRpdmUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghYmFzZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbGF0aXZlLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IGJhc2UucGF0aC5zbGljZSgwLCBiYXNlLnBhdGgubGFzdEluZGV4T2YoXCIvXCIpICsgMSkgKyByZWxhdGl2ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHModGFyZ2V0LnBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IGJhc2UuYXV0aG9yaXR5O1xuICAgICAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gYmFzZS51c2VyaW5mbztcbiAgICAgICAgICAgIHRhcmdldC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdGFyZ2V0LnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LnNjaGVtZSA9IGJhc2Uuc2NoZW1lO1xuICAgIH1cbiAgICB0YXJnZXQuZnJhZ21lbnQgPSByZWxhdGl2ZS5mcmFnbWVudDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGJhc2VVUkksIHJlbGF0aXZlVVJJLCBvcHRpb25zKSB7XG4gICAgdmFyIHNjaGVtZWxlc3NPcHRpb25zID0gYXNzaWduKHsgc2NoZW1lOiAnbnVsbCcgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZShyZXNvbHZlQ29tcG9uZW50cyhwYXJzZShiYXNlVVJJLCBzY2hlbWVsZXNzT3B0aW9ucyksIHBhcnNlKHJlbGF0aXZlVVJJLCBzY2hlbWVsZXNzT3B0aW9ucyksIHNjaGVtZWxlc3NPcHRpb25zLCB0cnVlKSwgc2NoZW1lbGVzc09wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodXJpLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpID0gc2VyaWFsaXplKHBhcnNlKHVyaSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdXJpID0gcGFyc2Uoc2VyaWFsaXplKHVyaSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpO1xufVxuXG5mdW5jdGlvbiBlcXVhbCh1cmlBLCB1cmlCLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1cmlBID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaUEgPSBzZXJpYWxpemUocGFyc2UodXJpQSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaUEpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHVyaUEgPSBzZXJpYWxpemUodXJpQSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdXJpQiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmlCID0gc2VyaWFsaXplKHBhcnNlKHVyaUIsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZih1cmlCKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB1cmlCID0gc2VyaWFsaXplKHVyaUIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpQSA9PT0gdXJpQjtcbn1cblxuZnVuY3Rpb24gZXNjYXBlQ29tcG9uZW50KHN0ciwgb3B0aW9ucykge1xuICAgIHJldHVybiBzdHIgJiYgc3RyLnRvU3RyaW5nKCkucmVwbGFjZSghb3B0aW9ucyB8fCAhb3B0aW9ucy5pcmkgPyBVUklfUFJPVE9DT0wuRVNDQVBFIDogSVJJX1BST1RPQ09MLkVTQ0FQRSwgcGN0RW5jQ2hhcik7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlQ29tcG9uZW50KHN0ciwgb3B0aW9ucykge1xuICAgIHJldHVybiBzdHIgJiYgc3RyLnRvU3RyaW5nKCkucmVwbGFjZSghb3B0aW9ucyB8fCAhb3B0aW9ucy5pcmkgPyBVUklfUFJPVE9DT0wuUENUX0VOQ09ERUQgOiBJUklfUFJPVE9DT0wuUENUX0VOQ09ERUQsIHBjdERlY0NoYXJzKTtcbn1cblxudmFyIGhhbmRsZXIgPSB7XG4gICAgc2NoZW1lOiBcImh0dHBcIixcbiAgICBkb21haW5Ib3N0OiB0cnVlLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIC8vcmVwb3J0IG1pc3NpbmcgaG9zdFxuICAgICAgICBpZiAoIWNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJIVFRQIFVSSXMgbXVzdCBoYXZlIGEgaG9zdC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlY3VyZSA9IFN0cmluZyhjb21wb25lbnRzLnNjaGVtZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJodHRwc1wiO1xuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZGVmYXVsdCBwb3J0XG4gICAgICAgIGlmIChjb21wb25lbnRzLnBvcnQgPT09IChzZWN1cmUgPyA0NDMgOiA4MCkgfHwgY29tcG9uZW50cy5wb3J0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9ub3JtYWxpemUgdGhlIGVtcHR5IHBhdGhcbiAgICAgICAgaWYgKCFjb21wb25lbnRzLnBhdGgpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vTk9URTogV2UgZG8gbm90IHBhcnNlIHF1ZXJ5IHN0cmluZ3MgZm9yIEhUVFAgVVJJc1xuICAgICAgICAvL2FzIFdXVyBGb3JtIFVybCBFbmNvZGVkIHF1ZXJ5IHN0cmluZ3MgYXJlIHBhcnQgb2YgdGhlIEhUTUw0KyBzcGVjLFxuICAgICAgICAvL2FuZCBub3QgdGhlIEhUVFAgc3BlYy5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIGhhbmRsZXIkMSA9IHtcbiAgICBzY2hlbWU6IFwiaHR0cHNcIixcbiAgICBkb21haW5Ib3N0OiBoYW5kbGVyLmRvbWFpbkhvc3QsXG4gICAgcGFyc2U6IGhhbmRsZXIucGFyc2UsXG4gICAgc2VyaWFsaXplOiBoYW5kbGVyLnNlcmlhbGl6ZVxufTtcblxuZnVuY3Rpb24gaXNTZWN1cmUod3NDb21wb25lbnRzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3c0NvbXBvbmVudHMuc2VjdXJlID09PSAnYm9vbGVhbicgPyB3c0NvbXBvbmVudHMuc2VjdXJlIDogU3RyaW5nKHdzQ29tcG9uZW50cy5zY2hlbWUpLnRvTG93ZXJDYXNlKCkgPT09IFwid3NzXCI7XG59XG4vL1JGQyA2NDU1XG52YXIgaGFuZGxlciQyID0ge1xuICAgIHNjaGVtZTogXCJ3c1wiLFxuICAgIGRvbWFpbkhvc3Q6IHRydWUsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHdzQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIC8vaW5kaWNhdGUgaWYgdGhlIHNlY3VyZSBmbGFnIGlzIHNldFxuICAgICAgICB3c0NvbXBvbmVudHMuc2VjdXJlID0gaXNTZWN1cmUod3NDb21wb25lbnRzKTtcbiAgICAgICAgLy9jb25zdHJ1Y3QgcmVzb3VjZSBuYW1lXG4gICAgICAgIHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUgPSAod3NDb21wb25lbnRzLnBhdGggfHwgJy8nKSArICh3c0NvbXBvbmVudHMucXVlcnkgPyAnPycgKyB3c0NvbXBvbmVudHMucXVlcnkgOiAnJyk7XG4gICAgICAgIHdzQ29tcG9uZW50cy5wYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB3c0NvbXBvbmVudHMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB3c0NvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSh3c0NvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy9ub3JtYWxpemUgdGhlIGRlZmF1bHQgcG9ydFxuICAgICAgICBpZiAod3NDb21wb25lbnRzLnBvcnQgPT09IChpc1NlY3VyZSh3c0NvbXBvbmVudHMpID8gNDQzIDogODApIHx8IHdzQ29tcG9uZW50cy5wb3J0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL2Vuc3VyZSBzY2hlbWUgbWF0Y2hlcyBzZWN1cmUgZmxhZ1xuICAgICAgICBpZiAodHlwZW9mIHdzQ29tcG9uZW50cy5zZWN1cmUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnNjaGVtZSA9IHdzQ29tcG9uZW50cy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMuc2VjdXJlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vcmVjb25zdHJ1Y3QgcGF0aCBmcm9tIHJlc291cmNlIG5hbWVcbiAgICAgICAgaWYgKHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBfd3NDb21wb25lbnRzJHJlc291cmMgPSB3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lLnNwbGl0KCc/JyksXG4gICAgICAgICAgICAgICAgX3dzQ29tcG9uZW50cyRyZXNvdXJjMiA9IHNsaWNlZFRvQXJyYXkoX3dzQ29tcG9uZW50cyRyZXNvdXJjLCAyKSxcbiAgICAgICAgICAgICAgICBwYXRoID0gX3dzQ29tcG9uZW50cyRyZXNvdXJjMlswXSxcbiAgICAgICAgICAgICAgICBxdWVyeSA9IF93c0NvbXBvbmVudHMkcmVzb3VyYzJbMV07XG5cbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5wYXRoID0gcGF0aCAmJiBwYXRoICE9PSAnLycgPyBwYXRoIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vZm9yYmlkIGZyYWdtZW50IGNvbXBvbmVudFxuICAgICAgICB3c0NvbXBvbmVudHMuZnJhZ21lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB3c0NvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIGhhbmRsZXIkMyA9IHtcbiAgICBzY2hlbWU6IFwid3NzXCIsXG4gICAgZG9tYWluSG9zdDogaGFuZGxlciQyLmRvbWFpbkhvc3QsXG4gICAgcGFyc2U6IGhhbmRsZXIkMi5wYXJzZSxcbiAgICBzZXJpYWxpemU6IGhhbmRsZXIkMi5zZXJpYWxpemVcbn07XG5cbnZhciBPID0ge307XG52YXIgaXNJUkkgPSB0cnVlO1xuLy9SRkMgMzk4NlxudmFyIFVOUkVTRVJWRUQkJCA9IFwiW0EtWmEtejAtOVxcXFwtXFxcXC5cXFxcX1xcXFx+XCIgKyAoaXNJUkkgPyBcIlxcXFx4QTAtXFxcXHUyMDBEXFxcXHUyMDEwLVxcXFx1MjAyOVxcXFx1MjAyRi1cXFxcdUQ3RkZcXFxcdUY5MDAtXFxcXHVGRENGXFxcXHVGREYwLVxcXFx1RkZFRlwiIDogXCJcIikgKyBcIl1cIjtcbnZhciBIRVhESUckJCA9IFwiWzAtOUEtRmEtZl1cIjsgLy9jYXNlLWluc2Vuc2l0aXZlXG52YXIgUENUX0VOQ09ERUQkID0gc3ViZXhwKHN1YmV4cChcIiVbRUZlZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVs4OUEtRmEtZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkpOyAvL2V4cGFuZGVkXG4vL1JGQyA1MzIyLCBleGNlcHQgdGhlc2Ugc3ltYm9scyBhcyBwZXIgUkZDIDYwNjg6IEAgOiAvID8gIyBbIF0gJiA7ID1cbi8vY29uc3QgQVRFWFQkJCA9IFwiW0EtWmEtejAtOVxcXFwhXFxcXCNcXFxcJFxcXFwlXFxcXCZcXFxcJ1xcXFwqXFxcXCtcXFxcLVxcXFwvXFxcXD1cXFxcP1xcXFxeXFxcXF9cXFxcYFxcXFx7XFxcXHxcXFxcfVxcXFx+XVwiO1xuLy9jb25zdCBXU1AkJCA9IFwiW1xcXFx4MjBcXFxceDA5XVwiO1xuLy9jb25zdCBPQlNfUVRFWFQkJCA9IFwiW1xcXFx4MDEtXFxcXHgwOFxcXFx4MEJcXFxceDBDXFxcXHgwRS1cXFxceDFGXFxcXHg3Rl1cIjsgIC8vKCVkMS04IC8gJWQxMS0xMiAvICVkMTQtMzEgLyAlZDEyNylcbi8vY29uc3QgUVRFWFQkJCA9IG1lcmdlKFwiW1xcXFx4MjFcXFxceDIzLVxcXFx4NUJcXFxceDVELVxcXFx4N0VdXCIsIE9CU19RVEVYVCQkKTsgIC8vJWQzMyAvICVkMzUtOTEgLyAlZDkzLTEyNiAvIG9icy1xdGV4dFxuLy9jb25zdCBWQ0hBUiQkID0gXCJbXFxcXHgyMS1cXFxceDdFXVwiO1xuLy9jb25zdCBXU1AkJCA9IFwiW1xcXFx4MjBcXFxceDA5XVwiO1xuLy9jb25zdCBPQlNfUVAkID0gc3ViZXhwKFwiXFxcXFxcXFxcIiArIG1lcmdlKFwiW1xcXFx4MDBcXFxceDBEXFxcXHgwQV1cIiwgT0JTX1FURVhUJCQpKTsgIC8vJWQwIC8gQ1IgLyBMRiAvIG9icy1xdGV4dFxuLy9jb25zdCBGV1MkID0gc3ViZXhwKHN1YmV4cChXU1AkJCArIFwiKlwiICsgXCJcXFxceDBEXFxcXHgwQVwiKSArIFwiP1wiICsgV1NQJCQgKyBcIitcIik7XG4vL2NvbnN0IFFVT1RFRF9QQUlSJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcXFxcXFwiICsgc3ViZXhwKFZDSEFSJCQgKyBcInxcIiArIFdTUCQkKSkgKyBcInxcIiArIE9CU19RUCQpO1xuLy9jb25zdCBRVU9URURfU1RSSU5HJCA9IHN1YmV4cCgnXFxcXFwiJyArIHN1YmV4cChGV1MkICsgXCI/XCIgKyBRQ09OVEVOVCQpICsgXCIqXCIgKyBGV1MkICsgXCI/XCIgKyAnXFxcXFwiJyk7XG52YXIgQVRFWFQkJCA9IFwiW0EtWmEtejAtOVxcXFwhXFxcXCRcXFxcJVxcXFwnXFxcXCpcXFxcK1xcXFwtXFxcXF5cXFxcX1xcXFxgXFxcXHtcXFxcfFxcXFx9XFxcXH5dXCI7XG52YXIgUVRFWFQkJCA9IFwiW1xcXFwhXFxcXCRcXFxcJVxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFwtXFxcXC4wLTlcXFxcPFxcXFw+QS1aXFxcXHg1RS1cXFxceDdFXVwiO1xudmFyIFZDSEFSJCQgPSBtZXJnZShRVEVYVCQkLCBcIltcXFxcXFxcIlxcXFxcXFxcXVwiKTtcbnZhciBTT01FX0RFTElNUyQkID0gXCJbXFxcXCFcXFxcJFxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFw7XFxcXDpcXFxcQF1cIjtcbnZhciBVTlJFU0VSVkVEID0gbmV3IFJlZ0V4cChVTlJFU0VSVkVEJCQsIFwiZ1wiKTtcbnZhciBQQ1RfRU5DT0RFRCA9IG5ldyBSZWdFeHAoUENUX0VOQ09ERUQkLCBcImdcIik7XG52YXIgTk9UX0xPQ0FMX1BBUlQgPSBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIEFURVhUJCQsIFwiW1xcXFwuXVwiLCAnW1xcXFxcIl0nLCBWQ0hBUiQkKSwgXCJnXCIpO1xudmFyIE5PVF9IRk5BTUUgPSBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIFVOUkVTRVJWRUQkJCwgU09NRV9ERUxJTVMkJCksIFwiZ1wiKTtcbnZhciBOT1RfSEZWQUxVRSA9IE5PVF9IRk5BTUU7XG5mdW5jdGlvbiBkZWNvZGVVbnJlc2VydmVkKHN0cikge1xuICAgIHZhciBkZWNTdHIgPSBwY3REZWNDaGFycyhzdHIpO1xuICAgIHJldHVybiAhZGVjU3RyLm1hdGNoKFVOUkVTRVJWRUQpID8gc3RyIDogZGVjU3RyO1xufVxudmFyIGhhbmRsZXIkNCA9IHtcbiAgICBzY2hlbWU6IFwibWFpbHRvXCIsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlJCQxKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1haWx0b0NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgICAgICB2YXIgdG8gPSBtYWlsdG9Db21wb25lbnRzLnRvID0gbWFpbHRvQ29tcG9uZW50cy5wYXRoID8gbWFpbHRvQ29tcG9uZW50cy5wYXRoLnNwbGl0KFwiLFwiKSA6IFtdO1xuICAgICAgICBtYWlsdG9Db21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChtYWlsdG9Db21wb25lbnRzLnF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgdW5rbm93bkhlYWRlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge307XG4gICAgICAgICAgICB2YXIgaGZpZWxkcyA9IG1haWx0b0NvbXBvbmVudHMucXVlcnkuc3BsaXQoXCImXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIHhsID0gaGZpZWxkcy5sZW5ndGg7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgdmFyIGhmaWVsZCA9IGhmaWVsZHNbeF0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaGZpZWxkWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvQWRkcnMgPSBoZmllbGRbMV0uc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX3ggPSAwLCBfeGwgPSB0b0FkZHJzLmxlbmd0aDsgX3ggPCBfeGw7ICsrX3gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0by5wdXNoKHRvQWRkcnNbX3hdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3ViamVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0ID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYm9keVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5ib2R5ID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdW5rbm93bkhlYWRlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1t1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMF0sIG9wdGlvbnMpXSA9IHVuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFsxXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5rbm93bkhlYWRlcnMpIG1haWx0b0NvbXBvbmVudHMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgX3gyID0gMCwgX3hsMiA9IHRvLmxlbmd0aDsgX3gyIDwgX3hsMjsgKytfeDIpIHtcbiAgICAgICAgICAgIHZhciBhZGRyID0gdG9bX3gyXS5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICBhZGRyWzBdID0gdW5lc2NhcGVDb21wb25lbnQoYWRkclswXSk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudW5pY29kZVN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgVW5pY29kZSBJRE4gLT4gQVNDSUkgSUROXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWRkclsxXSA9IHB1bnljb2RlLnRvQVNDSUkodW5lc2NhcGVDb21wb25lbnQoYWRkclsxXSwgb3B0aW9ucykudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLmVycm9yID0gbWFpbHRvQ29tcG9uZW50cy5lcnJvciB8fCBcIkVtYWlsIGFkZHJlc3MncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBBU0NJSSB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZHJbMV0gPSB1bmVzY2FwZUNvbXBvbmVudChhZGRyWzFdLCBvcHRpb25zKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9bX3gyXSA9IGFkZHIuam9pbihcIkBcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1haWx0b0NvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSQkMShtYWlsdG9Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBjb21wb25lbnRzID0gbWFpbHRvQ29tcG9uZW50cztcbiAgICAgICAgdmFyIHRvID0gdG9BcnJheShtYWlsdG9Db21wb25lbnRzLnRvKTtcbiAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeGwgPSB0by5sZW5ndGg7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkciA9IFN0cmluZyh0b1t4XSk7XG4gICAgICAgICAgICAgICAgdmFyIGF0SWR4ID0gdG9BZGRyLmxhc3RJbmRleE9mKFwiQFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxQYXJ0ID0gdG9BZGRyLnNsaWNlKDAsIGF0SWR4KS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfTE9DQUxfUEFSVCwgcGN0RW5jQ2hhcik7XG4gICAgICAgICAgICAgICAgdmFyIGRvbWFpbiA9IHRvQWRkci5zbGljZShhdElkeCArIDEpO1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBJRE4gdmlhIHB1bnljb2RlXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluID0gIW9wdGlvbnMuaXJpID8gcHVueWNvZGUudG9BU0NJSSh1bmVzY2FwZUNvbXBvbmVudChkb21haW4sIG9wdGlvbnMpLnRvTG93ZXJDYXNlKCkpIDogcHVueWNvZGUudG9Vbmljb2RlKGRvbWFpbik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkVtYWlsIGFkZHJlc3MncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBcIiArICghb3B0aW9ucy5pcmkgPyBcIkFTQ0lJXCIgOiBcIlVuaWNvZGVcIikgKyBcIiB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9beF0gPSBsb2NhbFBhcnQgKyBcIkBcIiArIGRvbWFpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IHRvLmpvaW4oXCIsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoZWFkZXJzID0gbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzID0gbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICBpZiAobWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0KSBoZWFkZXJzW1wic3ViamVjdFwiXSA9IG1haWx0b0NvbXBvbmVudHMuc3ViamVjdDtcbiAgICAgICAgaWYgKG1haWx0b0NvbXBvbmVudHMuYm9keSkgaGVhZGVyc1tcImJvZHlcIl0gPSBtYWlsdG9Db21wb25lbnRzLmJvZHk7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVyc1tuYW1lXSAhPT0gT1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKG5hbWUucmVwbGFjZShQQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpLnJlcGxhY2UoTk9UX0hGTkFNRSwgcGN0RW5jQ2hhcikgKyBcIj1cIiArIGhlYWRlcnNbbmFtZV0ucmVwbGFjZShQQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpLnJlcGxhY2UoTk9UX0hGVkFMVUUsIHBjdEVuY0NoYXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IGZpZWxkcy5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgVVJOX1BBUlNFID0gL14oW15cXDpdKylcXDooLiopLztcbi8vUkZDIDIxNDFcbnZhciBoYW5kbGVyJDUgPSB7XG4gICAgc2NoZW1lOiBcInVyblwiLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZSQkMShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucGF0aC5tYXRjaChVUk5fUEFSU0UpO1xuICAgICAgICB2YXIgdXJuQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICB2YXIgc2NoZW1lID0gb3B0aW9ucy5zY2hlbWUgfHwgdXJuQ29tcG9uZW50cy5zY2hlbWUgfHwgXCJ1cm5cIjtcbiAgICAgICAgICAgIHZhciBuaWQgPSBtYXRjaGVzWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgbnNzID0gbWF0Y2hlc1syXTtcbiAgICAgICAgICAgIHZhciB1cm5TY2hlbWUgPSBzY2hlbWUgKyBcIjpcIiArIChvcHRpb25zLm5pZCB8fCBuaWQpO1xuICAgICAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTW3VyblNjaGVtZV07XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLm5pZCA9IG5pZDtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMubnNzID0gbnNzO1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5wYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB1cm5Db21wb25lbnRzID0gc2NoZW1lSGFuZGxlci5wYXJzZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMuZXJyb3IgPSB1cm5Db21wb25lbnRzLmVycm9yIHx8IFwiVVJOIGNhbiBub3QgYmUgcGFyc2VkLlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cm5Db21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUkJDEodXJuQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2NoZW1lID0gb3B0aW9ucy5zY2hlbWUgfHwgdXJuQ29tcG9uZW50cy5zY2hlbWUgfHwgXCJ1cm5cIjtcbiAgICAgICAgdmFyIG5pZCA9IHVybkNvbXBvbmVudHMubmlkO1xuICAgICAgICB2YXIgdXJuU2NoZW1lID0gc2NoZW1lICsgXCI6XCIgKyAob3B0aW9ucy5uaWQgfHwgbmlkKTtcbiAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTW3VyblNjaGVtZV07XG4gICAgICAgIGlmIChzY2hlbWVIYW5kbGVyKSB7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzID0gc2NoZW1lSGFuZGxlci5zZXJpYWxpemUodXJuQ29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVyaUNvbXBvbmVudHMgPSB1cm5Db21wb25lbnRzO1xuICAgICAgICB2YXIgbnNzID0gdXJuQ29tcG9uZW50cy5uc3M7XG4gICAgICAgIHVyaUNvbXBvbmVudHMucGF0aCA9IChuaWQgfHwgb3B0aW9ucy5uaWQpICsgXCI6XCIgKyBuc3M7XG4gICAgICAgIHJldHVybiB1cmlDb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBVVUlEID0gL15bMC05QS1GYS1mXXs4fSg/OlxcLVswLTlBLUZhLWZdezR9KXszfVxcLVswLTlBLUZhLWZdezEyfSQvO1xuLy9SRkMgNDEyMlxudmFyIGhhbmRsZXIkNiA9IHtcbiAgICBzY2hlbWU6IFwidXJuOnV1aWRcIixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UodXJuQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgdXVpZENvbXBvbmVudHMgPSB1cm5Db21wb25lbnRzO1xuICAgICAgICB1dWlkQ29tcG9uZW50cy51dWlkID0gdXVpZENvbXBvbmVudHMubnNzO1xuICAgICAgICB1dWlkQ29tcG9uZW50cy5uc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghb3B0aW9ucy50b2xlcmFudCAmJiAoIXV1aWRDb21wb25lbnRzLnV1aWQgfHwgIXV1aWRDb21wb25lbnRzLnV1aWQubWF0Y2goVVVJRCkpKSB7XG4gICAgICAgICAgICB1dWlkQ29tcG9uZW50cy5lcnJvciA9IHV1aWRDb21wb25lbnRzLmVycm9yIHx8IFwiVVVJRCBpcyBub3QgdmFsaWQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHV1aWRDb21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUodXVpZENvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHVybkNvbXBvbmVudHMgPSB1dWlkQ29tcG9uZW50cztcbiAgICAgICAgLy9ub3JtYWxpemUgVVVJRFxuICAgICAgICB1cm5Db21wb25lbnRzLm5zcyA9ICh1dWlkQ29tcG9uZW50cy51dWlkIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB1cm5Db21wb25lbnRzO1xuICAgIH1cbn07XG5cblNDSEVNRVNbaGFuZGxlci5zY2hlbWVdID0gaGFuZGxlcjtcblNDSEVNRVNbaGFuZGxlciQxLnNjaGVtZV0gPSBoYW5kbGVyJDE7XG5TQ0hFTUVTW2hhbmRsZXIkMi5zY2hlbWVdID0gaGFuZGxlciQyO1xuU0NIRU1FU1toYW5kbGVyJDMuc2NoZW1lXSA9IGhhbmRsZXIkMztcblNDSEVNRVNbaGFuZGxlciQ0LnNjaGVtZV0gPSBoYW5kbGVyJDQ7XG5TQ0hFTUVTW2hhbmRsZXIkNS5zY2hlbWVdID0gaGFuZGxlciQ1O1xuU0NIRU1FU1toYW5kbGVyJDYuc2NoZW1lXSA9IGhhbmRsZXIkNjtcblxuZXhwb3J0cy5TQ0hFTUVTID0gU0NIRU1FUztcbmV4cG9ydHMucGN0RW5jQ2hhciA9IHBjdEVuY0NoYXI7XG5leHBvcnRzLnBjdERlY0NoYXJzID0gcGN0RGVjQ2hhcnM7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5leHBvcnRzLnJlbW92ZURvdFNlZ21lbnRzID0gcmVtb3ZlRG90U2VnbWVudHM7XG5leHBvcnRzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbmV4cG9ydHMucmVzb2x2ZUNvbXBvbmVudHMgPSByZXNvbHZlQ29tcG9uZW50cztcbmV4cG9ydHMucmVzb2x2ZSA9IHJlc29sdmU7XG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcbmV4cG9ydHMuZXF1YWwgPSBlcXVhbDtcbmV4cG9ydHMuZXNjYXBlQ29tcG9uZW50ID0gZXNjYXBlQ29tcG9uZW50O1xuZXhwb3J0cy51bmVzY2FwZUNvbXBvbmVudCA9IHVuZXNjYXBlQ29tcG9uZW50O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXJpLmFsbC5qcy5tYXBcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdjEgfSBmcm9tICcuL3YxLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjMgfSBmcm9tICcuL3YzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjQgfSBmcm9tICcuL3Y0LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdjUgfSBmcm9tICcuL3Y1LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTklMIH0gZnJvbSAnLi9uaWwuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdmFsaWRhdGUgfSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZSB9IGZyb20gJy4vcGFyc2UuanMnOyIsIi8qXG4gKiBCcm93c2VyLWNvbXBhdGlibGUgSmF2YVNjcmlwdCBNRDVcbiAqXG4gKiBNb2RpZmljYXRpb24gb2YgSmF2YVNjcmlwdCBNRDVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cbmZ1bmN0aW9uIG1kNShieXRlcykge1xuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyO1xuICB2YXIgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIHZhciB4ID0gaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyICYgMHhmZjtcbiAgICB2YXIgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldE91dHB1dExlbmd0aChpbnB1dExlbmd0aDgpIHtcbiAgcmV0dXJuIChpbnB1dExlbmd0aDggKyA2NCA+Pj4gOSA8PCA0KSArIDE0ICsgMTtcbn1cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICovXG5cblxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICB2YXIgYSA9IDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAyNzE3MzM4Nzg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBsZW5ndGg4ID0gaW5wdXQubGVuZ3RoICogODtcbiAgdmFyIG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgobGVuZ3RoOCkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0W2kgLyA4XSAmIDB4ZmYpIDw8IGkgJSAzMjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHNhZmVBZGQoeCwgeSkge1xuICB2YXIgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiBtc3cgPDwgMTYgfCBsc3cgJiAweGZmZmY7XG59XG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5cblxuZnVuY3Rpb24gYml0Um90YXRlTGVmdChudW0sIGNudCkge1xuICByZXR1cm4gbnVtIDw8IGNudCB8IG51bSA+Pj4gMzIgLSBjbnQ7XG59XG4vKlxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpO1xufVxuXG5mdW5jdGlvbiBtZDVmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiAmIGMgfCB+YiAmIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVnZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiAmIGQgfCBjICYgfmQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGMgXiAoYiB8IH5kKSwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1kNTsiLCJleHBvcnQgZGVmYXVsdCAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJzsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBVVUlEJyk7XG4gIH1cblxuICB2YXIgdjtcbiAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJzZTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgdmFyIEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIHZhciBIID0gWzB4Njc0NTIzMDEsIDB4ZWZjZGFiODksIDB4OThiYWRjZmUsIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjBdO1xuXG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICB2YXIgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICB2YXIgTiA9IE1hdGguY2VpbChsIC8gMTYpO1xuICB2YXIgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgTjsgKytfaSkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuXG4gICAgTVtfaV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yICh2YXIgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtfaTJdW3RdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF90ID0gMTY7IF90IDwgODA7ICsrX3QpIHtcbiAgICAgIFdbX3RdID0gUk9UTChXW190IC0gM10gXiBXW190IC0gOF0gXiBXW190IC0gMTRdIF4gV1tfdCAtIDE2XSwgMSk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcblxuICAgIGZvciAodmFyIF90MiA9IDA7IF90MiA8IDgwOyArK190Mikge1xuICAgICAgdmFyIHMgPSBNYXRoLmZsb29yKF90MiAvIDIwKTtcbiAgICAgIHZhciBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbX3QyXSA+Pj4gMDtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gUk9UTChiLCAzMCkgPj4+IDA7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSBUO1xuICAgIH1cblxuICAgIEhbMF0gPSBIWzBdICsgYSA+Pj4gMDtcbiAgICBIWzFdID0gSFsxXSArIGIgPj4+IDA7XG4gICAgSFsyXSA9IEhbMl0gKyBjID4+PiAwO1xuICAgIEhbM10gPSBIWzNdICsgZCA+Pj4gMDtcbiAgICBIWzRdID0gSFs0XSArIGUgPj4+IDA7XG4gIH1cblxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaGExOyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHZhciB1dWlkID0gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7IC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG5cbnZhciBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgdmFyIGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIHZhciB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHN0cmluZ2lmeShiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjE7IiwiaW1wb3J0IHYzNSBmcm9tICcuL3YzNS5qcyc7XG5pbXBvcnQgbWQ1IGZyb20gJy4vbWQ1LmpzJztcbnZhciB2MyA9IHYzNSgndjMnLCAweDMwLCBtZDUpO1xuZXhwb3J0IGRlZmF1bHQgdjM7IiwiaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZS5qcyc7XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyKSB7XG4gIHN0ciA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTsgLy8gVVRGOCBlc2NhcGVcblxuICB2YXIgYnl0ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVzO1xufVxuXG5leHBvcnQgdmFyIEROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0IHZhciBVUkwgPSAnNmJhN2I4MTEtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBzdHJpbmdUb0J5dGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWVzcGFjZSA9IHBhcnNlKG5hbWVzcGFjZSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggIT09IDE2KSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ05hbWVzcGFjZSBtdXN0IGJlIGFycmF5LWxpa2UgKDE2IGl0ZXJhYmxlIGludGVnZXIgdmFsdWVzLCAwLTI1NSknKTtcbiAgICB9IC8vIENvbXB1dGUgaGFzaCBvZiBuYW1lc3BhY2UgYW5kIHZhbHVlLCBQZXIgNC4zXG4gICAgLy8gRnV0dXJlOiBVc2Ugc3ByZWFkIHN5bnRheCB3aGVuIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLCBlLmcuIGBieXRlcyA9XG4gICAgLy8gaGFzaGZ1bmMoWy4uLm5hbWVzcGFjZSwgLi4uIHZhbHVlXSlgXG5cblxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2ICsgdmFsdWUubGVuZ3RoKTtcbiAgICBieXRlcy5zZXQobmFtZXNwYWNlKTtcbiAgICBieXRlcy5zZXQodmFsdWUsIG5hbWVzcGFjZS5sZW5ndGgpO1xuICAgIGJ5dGVzID0gaGFzaGZ1bmMoYnl0ZXMpO1xuICAgIGJ5dGVzWzZdID0gYnl0ZXNbNl0gJiAweDBmIHwgdmVyc2lvbjtcbiAgICBieXRlc1s4XSA9IGJ5dGVzWzhdICYgMHgzZiB8IDB4ODA7XG5cbiAgICBpZiAoYnVmKSB7XG4gICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVzW2ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmdpZnkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IHNoYTEgZnJvbSAnLi9zaGExLmpzJztcbnZhciB2NSA9IHYzNSgndjUnLCAweDUwLCBzaGExKTtcbmV4cG9ydCBkZWZhdWx0IHY1OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc3Vic3RyKDE0LCAxKSwgMTYpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJykpO1xuICBnYW1lLmluaXRpYWxpc2UoKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=