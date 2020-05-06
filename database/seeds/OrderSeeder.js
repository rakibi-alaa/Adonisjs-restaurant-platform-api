'use strict'

/*
|--------------------------------------------------------------------------
| OrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Restaurant = use('App/Models/Restaurant')
const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const Database = use('Database')


class OrderSeeder {
  async run () {
    const user = await User.first();
    const restaurant = await Restaurant.first();

    const orders = await Factory.model('App/Models/Order').createMany(1,{user_id : user.id,restaurant_id : restaurant.id});

    const order = await Order.first();
    const product = await Product.first();



    await Database.table('order_product').where('order_id', order.id).where('product_id', product.id).update({
        product_title: product.title,
        product_quantity: 2,
        product_price : product.price
      })

  }
}

module.exports = OrderSeeder
