'use strict'


const UserService = use('App/Services/UserService');

class AuthController {

  async register(ctx){

    const data = await UserService.registerAdmin(ctx);
    if(data.error){
      return ctx.response.json({
        error : data.errorDetail
      })
    }else{
      return ctx.response.json({
        admin : data
      })
    }

  }

}

module.exports = AuthController
