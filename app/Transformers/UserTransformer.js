'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get availableInclude() {
    return [
      'roles'
    ]
  }

  transform (model) {
    return {
      id: model.id,
      username : model.username,
      email : model.email,
      phone:model.phone,
      created_at : model.created_at
    }
  }
  includeRoles(restaurant) {
    return this.collection(restaurant.getRelated('roles'), role => (
      role.name
    ))
  }
}

module.exports = UserTransformer
