'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Drive = use('Drive')

class Media extends Model {
  static get traits () {
    return ['@provider:Morphable']
  }

  mediable(){
    return this.morphTo([
      'App/Models/Restaurant', 'App/Models/User','App/Models/Product'
    ], 'id', 'id', 'mediable_id', 'mediable_type')
  }

  async deleteMedia(){
    if(Drive.exists(this.path)){
      await Drive.delete(this.path);
      return true
    }
    return false;
  }
}

module.exports = Media
