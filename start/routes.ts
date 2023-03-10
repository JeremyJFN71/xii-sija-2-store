/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home', {
    title: 'Home'
  })
})

Route.get('/item', async ({ view }) => {
  return view.render('item', {
    title: 'Product'
  })
})

Route.get('/product', 'ProductsController.index')
Route.get('/product/:slug', 'ProductsController.show')

Route.get('/admin/logout', 'admin/LoginController.logout').as('logout')

// No login Required
Route.group(()=>{
  Route.get('/admin/login', 'admin/LoginController.index')
  Route.post('/admin/login', 'admin/LoginController.authenticate')
}).middleware('guest')

// Login Required
Route.group(()=>{
  Route.resource('/admin', 'admin/AdminsController').as('admin')
}).middleware('auth:web')
