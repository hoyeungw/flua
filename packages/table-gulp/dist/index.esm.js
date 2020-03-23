import gulp from 'gulp';
import { vinylize } from '@flua/vinylize';
import { esvar } from '@flua/utils';
import { ACCUM } from '@analys/enum-pivot-mode';
import { Verse } from '@spare/verse';
import '@analys/table';
import { snakeToPascal } from '@spare/phrasing';
import { Rename } from '@vect/rename';
import { says } from '@palett/says';
import { delogger } from '@spare/logger';

/**
 * @typedef {number|string} str
 */

/**
 *
 * @param {Object} options
 * @param {Table}  options.table
 * @param {string} options.key
 * @param {string} options.field
 * @param {number} [options.mode=ACCUM]
 * @param {Object} [options.config] - config for Verse.entries
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @return {Function}
 */

const TableChips = options => {
  var _tableChips$bind;

  return _tableChips$bind = tableChips.bind(options), Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))(_tableChips$bind);
};
const tableChips = function () {
  /** @type {Table} */
  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || ACCUM;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || snakeToPascal(`${key}-to-${field}`);
  config.read = config.read || Verse.vector;
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = vinylize(filename + '.js', esvar(filename), Verse.entries(chips, config));
  return dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
  ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
};

/**
 *
 * @param {Object} options
 * @param {Table}  options.table
 * @param {string} options.key
 * @param {string} options.field
 * @param {Object} [options.config] - config for Verse.entries
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @return {Function}
 */

const TableLookup = options => {
  var _tableLookup$bind;

  return _tableLookup$bind = tableLookup.bind(options), Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))(_tableLookup$bind);
};
const tableLookup = function () {
  var _objectify, _lookups, _Verse$object;

  /** @type {Table} */
  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {string} */

  const dest = this.dest;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const filename = this.filename || snakeToPascal(`${key}-to-${field}`);
  const {
    objectify
  } = config;
  const stringify = objectify ? Verse.object : Verse.entries;
  _objectify = objectify, delogger(_objectify);
  const lookups = table.lookupTable(key, field, !!objectify);
  _lookups = lookups, delogger(_lookups);
  _Verse$object = Verse.object(lookups), delogger(_Verse$object);
  const vinylBuffer = vinylize(filename + '.js', esvar(filename), stringify(lookups, config));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
};

export { TableChips, TableLookup };
