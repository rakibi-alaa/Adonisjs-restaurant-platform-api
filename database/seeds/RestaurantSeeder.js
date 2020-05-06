'use strict'

/*
|--------------------------------------------------------------------------
| RestaurantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class RestaurantSeeder {
  async run () {
    let user = await User.first();
    user = await user.toJSON();
    const restaurant = await Factory.model('App/Models/Restaurant').create({user_id : user.id});
  }
}

module.exports = RestaurantSeeder
