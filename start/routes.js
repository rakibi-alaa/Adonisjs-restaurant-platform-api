'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//middleware(['auth', 'is:(customer) && !admin'])



Route.post('/auth/login','AuthController.login');

Route.group(() => {
  Route.post('/register', 'AuthController.register').validator('StoreUser');
  Route.get('/restaurant', 'RestaurantController.index');
  Route.get('/orders', 'OrderController.index');
  Route.get('/products', 'ProductController.index');

}).namespace('Admin').prefix('admin').middleware(['auth', 'is:admin']);
