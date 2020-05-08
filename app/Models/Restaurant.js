'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Restaurant extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  static get traits () {
    return ['@provider:Morphable']
  }

  products(){
    return this.hasMany('App/Models/Product')
  }

  orders(){
    return this.belongsTo('App/Models/Order')
  }

  user(){
    return this.belongsTo('App/Models/User')
  }

  pictures(){
    return this.morphMany('App/Models/Media', 'id', 'mediable_id', 'mediable_type')
  }
}

module.exports = Restaurant
