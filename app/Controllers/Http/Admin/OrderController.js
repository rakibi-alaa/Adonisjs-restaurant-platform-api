'use strict'

const OrderService = use('App/Services/OrderService');

class OrderController {
  async index(ctx){
    const orders = await OrderService.restaurantOrders(ctx);
    return ctx.transform.include(['status','products']).collection(orders,'OrderTransformer');
  }

  async store(ctx){
    const order = await OrderService.store(ctx);
    if(order){
      return ctx.transform.item(order,'OrderTransformer');
    }else{
      return ctx.response.json({
        error : {
          message : 'Something happened when placing your order :/ !!'
        }
      })
    }

  }

  async updateStatus(ctx){
    const order = await OrderService.updateOrderStatus(ctx);
    if(order){
      return ctx.transform.include(['status','products']).item(order,'OrderTransformer');
    }else{
      return ctx.response.json({
        error : {
          message : 'Something happened when placing your order :/ !!'
        }
      })
    }

  }
}

module.exports = OrderController;
