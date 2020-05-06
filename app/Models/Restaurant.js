'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Restaurant extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
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
}

module.exports = Restaurant
