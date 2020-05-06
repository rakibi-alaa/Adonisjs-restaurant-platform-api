'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_product', (table) => {
      table.increments();
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('SET NULL');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('SET NULL');
      table.string('pruduct_title');
      table.string('pruduct_quantity');
      table.string('pruduct_price');
      table.timestamps()
    })
  }

  down () {
    this.drop('order_product')
  }
}

module.exports = OrderProductSchema
