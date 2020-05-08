'use strict'

const ProductService = use('App/Services/ProductService');

class ProductController {

  async index(ctx){
    const products = await ProductService.index(ctx);

    return ctx.transform.collection(products,'ProductTransformer');
  }

  async store(ctx){
    const restaurant = await ProductService.store(ctx);

    return ctx.response.json(restaurant);
  }

  async update(ctx){
    const restaurant = await ProductService.update(ctx);

    return ctx.response.json(restaurant);
  }

  async delete(ctx){
    const restaurant = await ProductService.delete(ctx);

    return ctx.response.json(restaurant);
  }
}

module.exports = ProductController
