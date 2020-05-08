'use strict'

/*
|--------------------------------------------------------------------------
| RestaurantService
|--------------------------------------------------------------------------
|
*/

const Helpers = use('Helpers')
const Media = use('App/Models/Media');

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

    await profilePic.move(Helpers.publicPath('uploads/restaurant'), {
      name: 'custom-name.jpg',
      overwrite: true
    });

    const media = new Media();
    media.path = 'uploads/restaurant/custom-name.jpg';
    media.mediable().associate(restaurant);
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
