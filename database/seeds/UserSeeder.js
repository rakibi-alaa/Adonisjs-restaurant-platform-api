'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Role = use('Adonis/Acl/Role');


class UserSeeder {

  async run(){

  const adminRole = await Factory.model('Adonis/Acl/Role').create({ name: 'Admin' ,slug : 'admin',description : 'manage administration privileges'});
  const customerRole = await Factory.model('Adonis/Acl/Role').create({ name: 'Customer' ,slug : 'customer',description : 'manage customer privileges'});

  const admin = await Factory.model('App/Models/User').create({ username: 'Admin' ,email : 'admin@mail.com',password : 'admin@mail.com'});
  const customer = await Factory.model('App/Models/User').create({ username: 'Customer' ,email : 'customer@mail.com',password : 'customer@mail.com'});

  await admin.roles().attach([adminRole.id]);
  await customer.roles().attach([customerRole.id])

  }
}

module.exports = UserSeeder
