'use strict'

/*
|--------------------------------------------------------------------------
| UserService
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


const User = use('App/Models/User');
const Role = use('Adonis/Acl/Role');

class UserService {

  static async registerCustomer({request}){
    console.log('123456789');
    const customerRole = await Role.find(1);
    const {username,email,password,phone} = request.all();

    try {
      const customer = new User();
      customer.username = username;
      customer.email = email;
      customer.password = password;
      customer.phone = phone;
      await customer.save();
      await customer.roles().attach([customerRole.id]);
      return customer.toJSON();
    }catch (error) {
      console.log(error);
      return {
        error : true,
        errorDetail : error
      }
    }
  }
}

module.exports = UserService
