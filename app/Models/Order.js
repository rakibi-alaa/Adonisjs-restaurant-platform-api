'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  products(){
    return this.belongsToMany('App/Models/Product').withPivot(['pruduct_title','pruduct_quantity','pruduct_price']).withTimestamps();
  }

  restaurant(){
    return this.belongsTo('App/Models/Restaurant')
  }

  user(){
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Order
