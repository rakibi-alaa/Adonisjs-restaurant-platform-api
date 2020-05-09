'use strict'

/*
|--------------------------------------------------------------------------
| RestaurantService
|--------------------------------------------------------------------------
|
*/

const Helpers = use('Helpers');
const MediaService = use('App/Services/MediaService')


class RestaurantService {

  static async adminRestaurant({auth}){
    const restaurant = await auth.user.restaurant().fetch();
    return restaurant;
  }

  static async update({request,auth}){
    let restaurant = await auth.user.restaurant().fetch();
    const profilePic = request.file('restaurant_pic', {
      types: ['image'],
      size: '2mb'
    });
    await MediaService.UpdateMedia(profilePic,restaurant,'restaurant');



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
