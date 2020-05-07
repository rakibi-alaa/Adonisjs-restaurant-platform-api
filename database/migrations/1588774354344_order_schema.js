'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('customer_full_name');
      table.string('customer_email');
      table.string('customer_phone');
      table.integer('placed_by').unsigned().references('id').inTable('users');
      table.integer('restaurant_id').unsigned().references('id').inTable('restaurants');
      table.timestamps();
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
