'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CosmicJsSource = function () {
  (0, _createClass3.default)(CosmicJsSource, null, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        typeName: 'Cosmicjs',
        apiURL: 'https://api.cosmicjs.com/v1',
        bucketSlug: '',
        objectTypes: [],
        apiAccess: {}
      };
    }
  }]);

  function CosmicJsSource(api, options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, CosmicJsSource);

    this.options = options;
    api.loadSource(function (args) {
      return _this.fetchContent(args);
    });
  }

  (0, _createClass3.default)(CosmicJsSource, [{
    key: 'fetchContent',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(store) {
        var addContentType, _options, typeName, apiURL, bucketSlug, objectTypes, apiAccess, promises, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                addContentType = store.addContentType;
                _options = this.options, typeName = _options.typeName, apiURL = _options.apiURL, bucketSlug = _options.bucketSlug, objectTypes = _options.objectTypes, apiAccess = _options.apiAccess;
                promises = objectTypes.map(function (objectType) {
                  return (0, _fetch2.default)({
                    apiURL: apiURL,
                    bucketSlug: bucketSlug,
                    objectType: objectType,
                    apiAccess: apiAccess
                  });
                });
                _context.next = 5;
                return _promise2.default.all(promises);

              case 5:
                data = _context.sent;


                objectTypes.forEach(function (objectType, i) {
                  var contentType = addContentType({
                    typeName: '' + typeName + (0, _lodash.capitalize)(objectType)
                  });
                  var items = data[i];
                  items.forEach(function (item, index) {
                    var node = {
                      id: item._id,
                      title: item.title,
                      slug: item.slug || '',
                      date: item.created_at,
                      content: item.content,
                      path: objectType + '/' + item.slug,
                      fields: (0, _extends3.default)({
                        nextPath: index < items.length - 1 ? objectType + '/' + items[index + 1].slug : null,
                        prevPath: index > 0 ? objectType + '/' + items[index - 1].slug : null,
                        nextTitle: index < items.length - 1 ? '' + items[index + 1].title : null,
                        prevTitle: index > 0 ? '' + items[index - 1].title : null
                      }, item)
                    };
                    contentType.addNode(node);
                  });
                });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchContent(_x) {
        return _ref.apply(this, arguments);
      }

      return fetchContent;
    }()
  }]);
  return CosmicJsSource;
}();

module.exports = CosmicJsSource;