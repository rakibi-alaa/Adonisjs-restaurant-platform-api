'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  products(){
    return this.belongsToMany('App/Models/Product').withPivot(['product_title','product_quantity','product_price']).withTimestamps();
  }

  restaurant(){
    return this.belongsTo('App/Models/Restaurant')
  }

  user(){
    return this.belongsTo('App/Models/User')
  }

  status(){
    return this.belongsTo('App/Models/Status');
  }

  async getOrderTotal(){

    let total = 0;

    let orderProducts = await this.products().fetch();

    if(orderProducts.rows.length > 0){
      orderProducts.rows.map((orderProduct,index)=>{
        orderProduct = orderProduct.toJSON();
        total += ( orderProduct.pivot.product_price * orderProduct.pivot.product_quantity);
      });
    }
    return total;
  }
}

module.exports = Order
