import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PostsController.renderLatest')

Route.group(() => {
  Route.get('', 'AuthController.renderLogin')
  Route.post('', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')

  Route.group(() => {
    Route.on('').render('admin/panel')

    Route.group(() => {
      Route.on('/create').render('admin/create')
      Route.get('/edit/:id', 'PostsController.renderSingle')
      Route.post('', 'PostsController.create')
      Route.get('', 'PostsController.renderAll')
      Route.put('/:id', 'PostsController.update')
      Route.delete('/:id', 'PostsController.delete')
    }).prefix('/posts')

    Route.group(() => {
      Route.on('/create').render('admin/content/create')
      Route.get('/edit/:id', 'ContentsController.renderSingle')
      Route.on('').render('admin/content/index')
      Route.get('/table', 'ContentsController.renderTable')
      Route.post('', 'ContentsController.create')
      Route.delete('/:id', 'ContentsController.delete')
      Route.put('/:id', 'ContentsController.update')
    }).prefix('/contents')
  })
    .prefix('/panel')
    .middleware('auth')
}).prefix('/admin')

Route.group(() => {
  Route.get('', 'PostsController.renderAll')
  Route.get('/:id', 'PostsController.renderSingle')
}).prefix('/blog')
