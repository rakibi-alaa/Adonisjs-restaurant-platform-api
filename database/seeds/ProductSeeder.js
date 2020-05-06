'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class ProductSeeder {
  async run () {
    let user = await User.first();

    const products = await Factory.model('App/Models/Product').createMany(16,{user_id : user.id});
  }
}

module.exports = ProductSeeder
