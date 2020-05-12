'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

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
  static get availableInclude() {
    return [
      'products',
      'status'
    ]
  }

  async transform (model) {
    return {
      id : model.id,
      customer_full_name : model.customer_full_name,
      customer_email : model.customer_email,
      customer_phone : model.customer_phone,
      placed_by : model.user_id,
      total : await model.getOrderTotal()

    }
  }
  includeProducts(restaurant) {
    return this.collection(restaurant.getRelated('products'),'ProductTransformer')
  }
  includeStatus(restaurant) {
    return this.item(restaurant.getRelated('status'),status => ({
      status : status.status,
      color : status.color,
    }))
  }
}

module.exports = OrderTransformer;


