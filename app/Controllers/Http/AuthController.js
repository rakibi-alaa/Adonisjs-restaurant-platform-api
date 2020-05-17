'use strict'

const User = use('App/Models/User');
const UserService = use('App/Services/UserService');
class AuthController {

  async login({request,response,auth,transform}) {
    const {email, password} = request.all();
    try {
      const token = await auth.withRefreshToken().attempt(email, password);
      const user = await User.findBy('email', email);
      const roles = await user.getRoles();
      return response.json({
        ...token,
        user : user,
        role : roles
      })
    }catch (e) {
      return response.json(e)
    }
  }


  async register(ctx){
    const customer = await UserService.registerCustomer(ctx);
    const token = await ctx.auth.withRefreshToken().attempt(customer.email, ctx.request.all().password);
    const roles = await customer.getRoles();
    return ctx.response.json({
      user : customer,
      ...token,
      role : roles
    })

  }

}

module.exports = AuthController
