'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
//const User = use('App/Models/User')
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

  static get availableInclude() {
    return [
      'pictures'
    ]
  }

  async transform(model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      address: model.address,
      phone: model.phone,
      allow_ordering: model.allow_ordering,
      allow_reserving: model.allow_reserving,
      created_by: model.user_id
    }
  }

  includePictures(restaurant) {
    return this.collection(restaurant.getRelated('pictures'), picture => (
       picture.path
    ))
  }
}
module.exports = RestaurantTransformer;

