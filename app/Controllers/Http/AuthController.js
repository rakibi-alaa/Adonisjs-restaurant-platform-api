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
      response.cookie('__refr_t__', token.refreshToken,{httpOnly: true,sameSite: 'None'})
      return response.json({
        ...token,
        user : user,
        roles : roles
      })
    }catch (e) {
      return response.json(e)
    }
  }
  async refreshToken({request,response,auth}){
    console.log(request.cookies())
    const {refresh_token} = request.all();
    const token = await auth.generateForRefreshToken(request.cookies().__refr_t__);
    const uid = await auth._verifyToken(token.token);
    const user = await User.find(uid.uid);
    let userJson = user.toJSON();
    delete userJson.password;
    response.cookie('__refr_t__', token.refreshToken,{httpOnly: true,sameSite: 'None'})
    return response.json({
      user : userJson,
      ...token,
    })

  }

  async register(ctx){
    const customer = await UserService.registerCustomer(ctx);
    const token = await ctx.auth.withRefreshToken().attempt(customer.email, ctx.request.all().password);
    const roles = await customer.getRoles();
    return ctx.response.json({
      user : customer,
      ...token,
      roles : roles
    })

  }

}

module.exports = AuthController
