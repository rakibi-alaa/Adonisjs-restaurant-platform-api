'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments();
      table.string('status').notNullable().unique();
      table.string('color').notNullable().unique();
      table.timestamps();
      table.timestamp('deleted_at')

    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
