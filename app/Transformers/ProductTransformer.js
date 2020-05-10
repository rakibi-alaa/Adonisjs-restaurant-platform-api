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
  static get availableInclude() {
    return [
      'pictures'
    ]
  }

  transform (model) {
    return {
      id : model.id,
      title : model.title,
      description : model.description,
      price : model.price,
      created_by : model.user_id,
    }
  }

  includePictures(restaurant) {
    return this.collection(restaurant.getRelated('pictures'), picture => (
      picture.path
    ))
  }
}

module.exports = ProductTransformer
