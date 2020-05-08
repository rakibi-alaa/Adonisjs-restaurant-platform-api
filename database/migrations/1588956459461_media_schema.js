'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaSchema extends Schema {
  up () {
    this.create('media', (table) => {
      table.increments()
      table.string('title');
      table.string('path');
      table.integer('mediable_id').unsigned().nullable();
      table.string('mediable_type').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('media')
  }
}

module.exports = MediaSchema
