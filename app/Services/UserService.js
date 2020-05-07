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

  static async registerAdmin({request}){
    const adminRole = await Role.find(1);
    const {username,email,password} = request.all();

    try {
      const admin = new User();
      admin.username = username;
      admin.email = email;
      admin.password = password;
      await admin.save();
      await admin.roles().attach([adminRole.id]);
      return admin.toJSON();
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
