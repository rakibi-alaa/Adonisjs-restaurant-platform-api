'use strict'

/*
|--------------------------------------------------------------------------
| ProductService
|--------------------------------------------------------------------------
|
*/

const MediaService = use('App/Services/MediaService')
const Product = use('App/Models/Product');

class ProductService {

  static async restaurantProducts({auth}){
    const products = await auth.user.products().fetch();
    return products;
  }

  static async restaurantProduct(id){
    const product = await Product.find(id);
    return product;
  }

  static async store({request,auth}){
    const {title,description,price} = request.all();

    let product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    const picture = request.file('picture', {
      types: ['image'],
      size: '2mb'
    });
    try{
      await auth.user.products().save(product);
      //console.log(product)
      if(picture){
       const stored =  await MediaService.storeMedia(picture,product ,'products');
       console.log(stored)
      }
      return product;
    }catch (e) {
      console.log(e);
      return false;
    }
  }



}

module.exports = ProductService
