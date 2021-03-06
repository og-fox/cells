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

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

/**
* The RestCreateNodesRequest model module.
* @module model/RestCreateNodesRequest
* @version 1.0
*/

var RestCreateNodesRequest = (function () {
    /**
    * Constructs a new <code>RestCreateNodesRequest</code>.
    * @alias module:model/RestCreateNodesRequest
    * @class
    */

    function RestCreateNodesRequest() {
        _classCallCheck(this, RestCreateNodesRequest);

        this.Nodes = undefined;
        this.Recursive = undefined;
        this.TemplateUUID = undefined;
    }

    /**
    * Constructs a <code>RestCreateNodesRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestCreateNodesRequest} obj Optional instance to populate.
    * @return {module:model/RestCreateNodesRequest} The populated <code>RestCreateNodesRequest</code> instance.
    */

    RestCreateNodesRequest.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestCreateNodesRequest();

            if (data.hasOwnProperty('Nodes')) {
                obj['Nodes'] = _ApiClient2['default'].convertToType(data['Nodes'], [_TreeNode2['default']]);
            }
            if (data.hasOwnProperty('Recursive')) {
                obj['Recursive'] = _ApiClient2['default'].convertToType(data['Recursive'], 'Boolean');
            }
            if (data.hasOwnProperty('TemplateUUID')) {
                obj['TemplateUUID'] = _ApiClient2['default'].convertToType(data['TemplateUUID'], 'String');
            }
        }
        return obj;
    };

    /**
    * @member {Array.<module:model/TreeNode>} Nodes
    */
    return RestCreateNodesRequest;
})();

exports['default'] = RestCreateNodesRequest;
module.exports = exports['default'];

/**
* @member {Boolean} Recursive
*/

/**
* @member {String} TemplateUUID
*/
