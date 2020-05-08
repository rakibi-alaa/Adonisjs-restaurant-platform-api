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

  /*static get availableInclude () {
    return [
      'user'
    ]
  }*/

  async transform (model) {
    const pictures = await model.pictures().fetch();
    console.log(pictures.rows[0].path)
    return {
      id : model.id,
      name : model.name,
      description : model.description,
      address : model.address,
      phone : model.phone,
      allow_ordering : model.allow_ordering,
      allow_reserving : model.allow_reserving,
      created_by : model.user_id,
      picture : pictures.rows[0].path
    }
  }

  /*includeUser (restaurant) {
    return this.item(restaurant.getRelated('user'),  user => ({
      username : user.username,
    }))
  }*/
}

module.exports = RestaurantTransformer

