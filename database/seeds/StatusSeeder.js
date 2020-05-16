'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class StatusSeeder {
  async run () {
    const data = [{status : 'pending' , color : '#eeba30'},{status : 'validated' , color : '#3bb44a'},{status : 'canceled' , color : '#ff0900'}];
    data.map(async (status)=>{
      await Factory.model('App/Models/Status').create({status : status.status,color : status.color});
    });
  }
}

module.exports = StatusSeeder;
