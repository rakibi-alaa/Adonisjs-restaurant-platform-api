'use strict'

/*
|--------------------------------------------------------------------------
| OrderService
|--------------------------------------------------------------------------
|
*/

const MediaService = use('App/Services/MediaService')
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

  static async update({request}){
    const {id,title,description,price} = request.all();
    const order = await Order.find(id);

    try {
      const picture = request.file('picture', {
        types: ['image'],
        size: '2mb'
      });
      if(picture){
        //await MediaService.UpdateMedia(picture,product,'products');
      }
      return order
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
