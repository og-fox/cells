/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

var _AuthToken = require('./AuthToken');

var _AuthToken2 = _interopRequireDefault(_AuthToken);

/**
* The RestFrontSessionGetResponse model module.
* @module model/RestFrontSessionGetResponse
* @version 1.0
*/

var RestFrontSessionGetResponse = (function () {
    /**
    * Constructs a new <code>RestFrontSessionGetResponse</code>.
    * @alias module:model/RestFrontSessionGetResponse
    * @class
    */

    function RestFrontSessionGetResponse() {
        _classCallCheck(this, RestFrontSessionGetResponse);

        this.Token = undefined;
    }

    /**
    * Constructs a <code>RestFrontSessionGetResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestFrontSessionGetResponse} obj Optional instance to populate.
    * @return {module:model/RestFrontSessionGetResponse} The populated <code>RestFrontSessionGetResponse</code> instance.
    */

    RestFrontSessionGetResponse.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestFrontSessionGetResponse();

            if (data.hasOwnProperty('Token')) {
                obj['Token'] = _AuthToken2['default'].constructFromObject(data['Token']);
            }
        }
        return obj;
    };

    /**
    * @member {module:model/AuthToken} Token
    */
    return RestFrontSessionGetResponse;
})();

exports['default'] = RestFrontSessionGetResponse;
module.exports = exports['default'];
