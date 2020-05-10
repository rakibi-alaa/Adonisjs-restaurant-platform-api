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

  static async update({request}){
    const {id,title,description,price} = request.all();
    const product = await Product.find(id);

    try {
      product.title = title;
      product.description = description;
      product.price = price;
      await product.save();
      const picture = request.file('picture', {
        types: ['image'],
        size: '2mb'
      });
      if(picture){
        await MediaService.UpdateMedia(picture,product,'products');
      }

      return product;
    }catch (e) {
      console.log(e);
      return false;
    }


  }



  static async delete({request}){

    const product = await Product.find(request.all().id);
    try {
      await product.delete()
      return true;
    }catch (e) {
      console.log(e)
      return false
    }
  }

}

module.exports = ProductService
