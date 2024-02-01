 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Setup from 'App/Models/Setup'

export default class CommentsController {
    public async store({request, params, response}: HttpContextContract) {
        const body = request.body()
        const setupId = params.setupId

        await Setup.find(setupId)

        body.setupId = setupId

        const comment = await Comment.create(body)

        response.status(201)

        return{
            message: "Comentario adicionado",
            data: comment
        }
    }
}
