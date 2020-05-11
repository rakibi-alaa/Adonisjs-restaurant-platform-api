'use strict'

const OrderService = use('App/Services/OrderService');

class OrderController {
  async index(ctx){
    const orders = await OrderService.restaurantOrders(ctx);
    return ctx.transform.collection(orders,'OrderTransformer')
  }
}

module.exports = OrderController;
