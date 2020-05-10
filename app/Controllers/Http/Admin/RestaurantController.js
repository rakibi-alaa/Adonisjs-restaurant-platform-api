'use strict'

const RestaurantService = use('App/Services/RestaurantService')

class RestaurantController {

  async index(ctx){
    const restaurant = await RestaurantService.adminRestaurant(ctx);
    return ctx.transform.include('pictures').item(restaurant,'RestaurantTransformer');
  }

  async update(ctx){
    const restaurant = await RestaurantService.update(ctx);
    if(restaurant){
      return ctx.transform.include('pictures').item(restaurant,'RestaurantTransformer');
    }else{
      return ctx.response.json({
        error : {
          message : 'error while updating restaurant information :/ !!'
        }
      })
    }

  }

}

module.exports = RestaurantController;
