'use strict'

class StoreUser {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'phone': 'required|string',
      'password': 'required|confirmed',
      'password_confirmation': 'required',
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, the {{ field }} already exists',
      'confirmed' : 'Wait a second, the {{ field }} doesnt match the password_confirmation'
    }
  }

  async fails(error) {
    this.ctx.response.json(error);
  }
}

module.exports = StoreUser
