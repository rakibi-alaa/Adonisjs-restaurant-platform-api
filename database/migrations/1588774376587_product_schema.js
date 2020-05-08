'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('price');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.timestamps();
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
