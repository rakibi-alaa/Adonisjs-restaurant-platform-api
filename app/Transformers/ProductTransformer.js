'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id : model.id,
      title : model.title,
      description : model.description,
      price : model.price,
      created_by : model.user_id,
    }
  }
}

module.exports = ProductTransformer
