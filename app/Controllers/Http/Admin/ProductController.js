'use strict'

const ProductService = use('App/Services/ProductService');

class ProductController {

  async index(ctx){
    const products = await ProductService.restaurantProducts(ctx);

    return ctx.transform.include('pictures').collection(products,'ProductTransformer');
  }

  async store(ctx){
    const newProduct = await ProductService.store(ctx);

    return ctx.transform.include('pictures').item(newProduct,'ProductTransformer');
  }

  async update(ctx){
    const product = await ProductService.update(ctx);

    return ctx.transform.include('pictures').item(product,'ProductTransformer');
  }

  async delete(ctx){
    const restaurant = await ProductService.delete(ctx);

    return ctx.response.json(restaurant);
  }
}

module.exports = ProductController
