'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments();
      table.string('name');
      table.string('email', 254).notNullable().unique();
      table.string('description');
      table.string('address');
      table.string('phone');
      table.boolean('allow_ordering');
      table.boolean('allow_reserving');
      table.integer('created_by').unsigned().references('id').inTable('users');
      table.timestamps();
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
