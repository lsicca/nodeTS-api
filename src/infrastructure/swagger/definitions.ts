/**
 * @swagger
 * securityDefinitions:
 *  Bearer:
 *    name: Authorization
 *    type: apiKey
 *    in: header
 * tags:
 *   - name: Task
 *     description: Tasks's endpoints
 *   - name: Auth
 *     description: Authentification's endpoints
 * responses:
 *  204:
 *    description: Success with no result
 *  400:
 *    description: 'Bad request : syntax error in parameter'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *        reference:
 *          type: string
 *      example:
 *        message: A required field is missing
 *        status: 400
 *  401:
 *    description: 'Unauthorized access'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *      example:
 *        message: Inactive user
 *        status: 401
 *  403:
 *    description: 'Forbidden'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *      example:
 *        message: Access is forbidden
 *        status: 403
 *  404:
 *    description: 'Not found'
 *  409:
 *    description: 'Conflict with existing resource'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *        reference:
 *          type: string
 *      example:
 *        message: A conflict happened
 *        status: 409
 *        reference: email
 *  422:
 *    description: 'Bad request : semantic error in parameter'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *        reference:
 *          type: string
 *      example:
 *        message: A conflict happened
 *        status: 409
 *        reference: email
 *  500:
 *    description: 'Internal unknow error'
 *    schema:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: number
 *      example:
 *        message: An internal error happened
 *        status: 500
 * parameters:
 *  id:
 *    name: id
 *    description: Entity's unique Id
 *    in: path
 *    required: true
 *    type: string
 *  createdAt:
 *   name: Created at
 *   description: Creation date
 *   in: formData
 *   required: false
 *   type: string
 *  updatedAt:
 *   name: Updated at
 *   description: Update date
 *   in: formData
 *   required: false
 *   type: string
 */
