'use strict'

const User = use('App/Models/User');

class AuthController {

  async login({request,response,auth}) {
    const {email, password} = request.all();
    try {
      const token = await auth.withRefreshToken().attempt(email, password);
      const user = await User.findBy('email', email);
      const roles = await user.getRoles();
      return response.json({
        ...token,
        user : user.toJSON(),
        role : roles
      })
    }catch (e) {
      return response.json(e)
    }
  }


  async register({reauest,response}){

  }

}

module.exports = AuthController
