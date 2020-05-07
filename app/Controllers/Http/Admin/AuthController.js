'use strict'

const User = use('App/Models/User');

class AuthController {




  async register({request,response}){


    return response.json({
      request : request.all()
    })
  }

}

module.exports = AuthController
