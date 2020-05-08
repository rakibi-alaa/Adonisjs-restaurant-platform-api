'use strict'

/*
|--------------------------------------------------------------------------
| ProductService
|--------------------------------------------------------------------------
|
*/


const Product = use('App/Models/Product');

class ProductService {

  static async index({auth}){
    const products = await auth.user.products().fetch();
    return products;
  }

  static async store({request}){

    return restaurant;
  }

  static async update({request,auth}){
    let restaurant = await auth.user.restaurant().fetch();
    try {
      restaurant.merge(request.all());
      await restaurant.save();
      return restaurant;
    }catch (e) {
      console.log(e)
    }
  }
  static async delete({request,auth}){
    let restaurant = await auth.user.restaurant().fetch();
    try {
      restaurant.merge(request.all());
      await restaurant.save();
      return restaurant;
    }catch (e) {
      console.log(e)
    }
  }

}

module.exports = ProductService
