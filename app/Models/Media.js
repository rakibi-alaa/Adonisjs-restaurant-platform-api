'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Media extends Model {
  static get traits () {
    return ['@provider:Morphable']
  }

  mediable(){
    return this.morphTo([
      'App/Models/Restaurant', 'App/Models/User','App/Models/Restaurant'
    ], 'id', 'id', 'mediable_id', 'mediable_type')
  }
}

module.exports = Media
