'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const OrderService = use('App/Services/OrderService')
/**
 * OrderTransformer class
 *
 * @class OrderTransformer
 * @constructor
 */
class OrderTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  async transform (model) {
    return {
      id : model.id,
      customer_full_name : model.customer_full_name,
      customer_email : model.customer_email,
      customer_phone : model.customer_phone,
      placed_by : model.user_id,
      //total : await OrderService.getOrderTotal(model.id)
      total : await model.getOrderTotal()

    }
  }
}

module.exports = OrderTransformer;


