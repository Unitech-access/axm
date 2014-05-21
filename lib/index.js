
var Events  = require('./events.js');
var Actions = require('./actions.js');

var util   = require('util');

var Export  = {};

/**
 * Flatten API
 */

util._extend(Export, Events);
util._extend(Export, Actions);

/**
 * Export
 */

module.exports = Export;
