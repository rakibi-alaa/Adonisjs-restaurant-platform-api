'use strict'

/*
|--------------------------------------------------------------------------
| RestaurantService
|--------------------------------------------------------------------------
|
*/


//const Restaurant = use('App/Models/Restaurant');

class RestaurantService {

  static async adminRestaurant({auth}){
    const restaurant = await auth.user.restaurant().fetch();
    return restaurant;
  }

  static async update({request,auth}){
    let restaurant = await auth.user.restaurant().fetch();
    try {
      restaurant.merge(request.all());
      await restaurant.save();
      return restaurant;
    }catch (e) {
      console.log(e)
    }
  }

}

module.exports = RestaurantService
