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
    const {title,description,price} = request.all();


    const picture = request.file('picture', {
      types: ['image'],
      size: '2mb'
    });
    try{
      //await auth.user.products().save(product);

      if(picture){
        const stored =  await MediaService.storeMedia(picture,product ,'products');
        console.log(stored)
      }
      return product;
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
