'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * RestaurantTransformer class
 *
 * @class RestaurantTransformer
 * @constructor
 */
class RestaurantTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id : model.id,
      name : model.name,
      description : model.description,
      address : model.address,
      phone : model.phone,
      allow_ordering : model.allow_ordering,
      allow_reserving : model.allow_reserving,
      created_by : model.user_id
    }
  }
}

module.exports = RestaurantTransformer

