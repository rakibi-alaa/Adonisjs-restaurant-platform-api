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
Route.post('/auth/register', 'AuthController.register').validator('StoreUser');
Route.post('/auth/refresh', 'AuthController.refreshToken');

Route.group(() => {
  /*
  * restaurant management routes for the admin
  * */
  Route.get('/restaurant', 'RestaurantController.index');
  Route.patch('/restaurant', 'RestaurantController.update');
  /*
  * orders management routes for the admin
  * */
  Route.get('/orders', 'OrderController.index');
  Route.post('/orders', 'OrderController.store');
  Route.patch('/orderstatus', 'OrderController.updateStatus');
  /*
  * Products management routes for the admin
  * */
  Route.get('/products', 'ProductController.index');
  Route.post('/products', 'ProductController.store');
  Route.patch('/product', 'ProductController.update');
  Route.delete('/product', 'ProductController.delete');

}).namespace('Admin').prefix('api/v1/admin').middleware(['auth', 'is:admin']);
