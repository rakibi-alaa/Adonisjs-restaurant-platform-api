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
const Factory = use('Factory');
const User = use('App/Models/User');
const Restaurant = use('App/Models/Restaurant');
const Order = use('App/Models/Order');
const Product = use('App/Models/Product');


class OrderSeeder {
  async run () {
    const user = await User.first();
    const restaurant = await Restaurant.first();

    await Factory.model('App/Models/Order').createMany(15,{user_id : user.id,restaurant_id : restaurant.id});

    const order = await Order.last();
    const product = await Product.first();

    await order.products().attach(product.id,(order_product) => {
      order_product.product_title = product.title;
      order_product.product_quantity = 2;
      order_product.product_price = product.price;
    });

  }
}

module.exports = OrderSeeder
