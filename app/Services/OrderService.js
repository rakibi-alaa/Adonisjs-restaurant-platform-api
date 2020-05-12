'use strict'

/*
|--------------------------------------------------------------------------
| OrderService
|--------------------------------------------------------------------------
|
*/

const Status = use('App/Models/Status')
const Order = use('App/Models/Order');

class OrderService {

  static async restaurantOrders({auth}){
    const orders = await auth.user.orders().fetch();
    return orders;
  }

  static async restaurantOrder(id){
    const order = await Order.find(id);
    return order;
  }

  static async store({request,auth}){
    const {products} = request.all();
    const user = await auth.user;
    try{
      const order = new Order();
      order.customer_full_name = user.username;
      order.customer_email = user.email;
      order.customer_phone = user.email;

      await order.restaurant().associate(await auth.user.restaurant().fetch());
      await order.user().associate(user);
      await order.status().associate(await Status.findBy('status','pending'));

      products.map(async (product) => {
        await order.products().attach(product.id,(order_product)=>{
          order_product.product_title = product.title;
          order_product.product_quantity = product.quantity;
          order_product.product_price = product.price;
        })
      });

      return this.restaurantOrder(order.id);
    }catch (e) {
      console.log(e);
      return false;
    }
  }

  static async updateOrderStatus({request}){
    const {order_id,status} = request.all();
    try {
      const order = await this.restaurantOrder(order_id);
      const ordserStatus = await Status.findBy('status',status);
      await order.status().associate(orderStatus);

      return order;
    }catch (e) {
      console.log(e);
      return false;
    }
  }



  static async delete({request}){

    const order = await Order.find(request.all().id);
    try {
      await order.delete()
      return true;
    }catch (e) {
      console.log(e)
      return false
    }
  }

}

module.exports = OrderService
