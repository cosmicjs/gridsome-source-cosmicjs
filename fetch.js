'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var apiURL = _ref2.apiURL,
        bucketSlug = _ref2.bucketSlug,
        objectType = _ref2.objectType,
        apiAccess = _ref2.apiAccess;
    var apiEndpoint, documents;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.time('Fetch Cosmic JS data');
            console.log('Starting to fetch data from Cosmic JS (' + objectType + ')');

            // Define API endpoint.
            apiEndpoint = apiURL + '/' + bucketSlug + '/objects?type=' + objectType;


            if (apiAccess.hasOwnProperty('read_key') && apiAccess.read_key.length !== 0) {
              apiEndpoint = apiEndpoint + ('&read_key=' + apiAccess.read_key);
            }
            // Make API request.
            _context.next = 6;
            return (0, _axios2.default)(apiEndpoint);

          case 6:
            documents = _context.sent;


            // Query all data from endpoint
            console.timeEnd('Fetch Cosmic JS data');

            // Map and clean data.

            if (!documents.data.objects) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', documents.data.objects.map(function (item) {
              return clean(item);
            }));

          case 12:
            return _context.abrupt('return', []);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Remove fields starting with `_` symbol.
 *
 * @param {object} item - Entry needing clean
 * @returns {object} output - Object cleaned
 */
var clean = function clean(item) {
  (0, _lodash.forEach)(item, function (value, key) {
    if ((0, _lodash.startsWith)(key, '__')) {
      delete item[key];
    } else if ((0, _lodash.isObject)(value)) {
      item[key] = clean(value);
    }
  });

  return item;
};