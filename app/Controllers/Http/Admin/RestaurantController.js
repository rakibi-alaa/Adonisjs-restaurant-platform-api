'use strict'

const RestaurantService = use('App/Services/RestaurantService')

class RestaurantController {

  async index(ctx){
    const restaurant = await RestaurantService.adminRestaurant(ctx);
    return ctx.transform.item(restaurant,'RestaurantTransformer');
  }

  async update(ctx){
    const restaurant = await RestaurantService.update(ctx);
    return ctx.transform.item(restaurant,'RestaurantTransformer');
  }

}

module.exports = RestaurantController;
