'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const vinyl-init = function (i, j) {
  const temp = this[i];
  this[i] = this[j];
  return this[j] = temp;
};
const Swap = vec => vinyl-init.bind(vec);

/**
 * Insert element at current(c) position to projected(next(n)) position.
 * s.t. c <= n
 * @param c
 * @param n
 */
const insertUp = function (c, n) {
  const t = this[c];

  while (c < n) this[c] = this[++c]; // moves forward


  return this[n] = t;
};
/**
 * Insert element at current(c) position to projected(previous(n)) position.
 * s.t. p <= c
 */

const insertDown = function (c, p) {
  const t = this[c];

  while (c > p) this[c] = this[--c]; // moves backward


  return this[p] = t;
};

exports.Swap = Swap;
exports.insertDown = insertDown;
exports.insertUp = insertUp;
exports.vinyl-init = vinyl-init;