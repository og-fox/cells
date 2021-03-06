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


import ApiClient from '../ApiClient';
import ListSharedResourcesResponseSharedResource from './ListSharedResourcesResponseSharedResource';





/**
* The RestListSharedResourcesResponse model module.
* @module model/RestListSharedResourcesResponse
* @version 1.0
*/
export default class RestListSharedResourcesResponse {
    /**
    * Constructs a new <code>RestListSharedResourcesResponse</code>.
    * @alias module:model/RestListSharedResourcesResponse
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>RestListSharedResourcesResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestListSharedResourcesResponse} obj Optional instance to populate.
    * @return {module:model/RestListSharedResourcesResponse} The populated <code>RestListSharedResourcesResponse</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestListSharedResourcesResponse();

            
            
            

            if (data.hasOwnProperty('Resources')) {
                obj['Resources'] = ApiClient.convertToType(data['Resources'], [ListSharedResourcesResponseSharedResource]);
            }
            if (data.hasOwnProperty('Offset')) {
                obj['Offset'] = ApiClient.convertToType(data['Offset'], 'Number');
            }
            if (data.hasOwnProperty('Limit')) {
                obj['Limit'] = ApiClient.convertToType(data['Limit'], 'Number');
            }
            if (data.hasOwnProperty('Total')) {
                obj['Total'] = ApiClient.convertToType(data['Total'], 'Number');
            }
        }
        return obj;
    }

    /**
    * @member {Array.<module:model/ListSharedResourcesResponseSharedResource>} Resources
    */
    Resources = undefined;
    /**
    * @member {Number} Offset
    */
    Offset = undefined;
    /**
    * @member {Number} Limit
    */
    Limit = undefined;
    /**
    * @member {Number} Total
    */
    Total = undefined;








}


