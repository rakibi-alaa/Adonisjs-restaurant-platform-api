'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }
  static get traits () {
    return ['@provider:Morphable']
  }


  user(){
    return this.belongsTo('App/Models/User')
  }

  orders(){
    return this.belongsToMany('App/Models/Order').withPivot(['product_title','product_quantity','product_price']).withTimestamps();
  }

  restaurant(){
    return this.belongsTo('App/Models/Restaurant')
  }

  pictures(){
    return this.morphMany('App/Models/Media', 'id', 'mediable_id', 'mediable_type')
  }
}

module.exports = Product
