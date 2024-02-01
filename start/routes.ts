// start/routes.ts

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.post("/setups/:setupId/comments", "CommentsController.store")

  Route.resource("/setups", "SetupsController").apiOnly()
}).prefix('/api')
