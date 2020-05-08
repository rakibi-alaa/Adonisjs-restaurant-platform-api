'use strict'

class RestaurantController {
  async index({request,response,auth}){
    return response.json(await auth.user.restaurant().fetch())
  }
}

module.exports = RestaurantController
