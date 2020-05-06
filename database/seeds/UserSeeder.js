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

  /*const roleAdmin = new Role()
  roleAdmin.name = 'Admin'
  roleAdmin.slug = 'admin'
  roleAdmin.description = 'manage administration privileges'
  await roleAdmin.save()

  const roleCustomer = new Role()
  roleCustomer.name = 'Customer'
  roleCustomer.slug = 'customer'
  roleCustomer.description = 'manage customer privileges'
  await roleCustomer.save()

  const admin = new User()
  admin.username = 'Admin'
  admin.email = 'admin@mail.com'
  admin.password = 'admin@mail.com'
  await admin.save()

  const customer = new User()
  customer.username = 'Customer'
  customer.email = 'customer@mail.com'
  customer.password = 'customer@mail.com'
  await customer.save()

  await admin.roles().attach([roleAdmin.id])
  await customer.roles().attach([roleCustomer.id])*/


  }
}

module.exports = UserSeeder
