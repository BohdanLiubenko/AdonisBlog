import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
})

Route.group(() => {
  Route.on('').render('login')
  Route.post('', 'AuthController.login')
}).prefix('/admin')
