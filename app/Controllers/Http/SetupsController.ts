import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Setup from 'App/Models/Setup'
import Application from "@ioc:Adonis/Core/Application"
import {v4 as uuidv4} from 'uuid'


export default class SetupsController {
private validationOptions = {
        types: ["image"],
        size: '2mb'
       }
    public async store({request, response}: HttpContextContract) {
       
       
        const body = request.body()
        const image = request.file('image', this.validationOptions)

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'),{
                name: imageName
            })

            body.image = imageName
        }

        const setup = await Setup.create(body)
        response.status(201)

        return{
            message: 'Setup criado com sucesso!',
            data: setup,
        }
    }
    public async index() {
        const setups = await Setup.query().preload('comments')

        return{
            data: setups,
        }
    }
    public async show({ params }: HttpContextContract) {
        const setup = await Setup.find(params.id)
    
        await setup?.load('comments')

        return {
          data: setup,
        }
      }

      public async destroy({params} : HttpContextContract){
        const setup = await Setup.findOrFail(params.id)
    
        await setup.delete()
    
        return {
          message: "setup excluído com sucesso",
          data: setup,
        }
      }

      public async update({params, request} : HttpContextContract){
        const body = request.body()
        const setup = await Setup.findOrFail(params.id)

        setup.title = body.title
        setup.description = body.description
        if(setup.image != body.image || !setup.image ){
        const image = request.file('image', this.validationOptions)

        if(image){

                const imageName = `${uuidv4()}.${image.extname}`
    
                await image.move(Application.tmpPath('uploads'),{
                    name: imageName
                })
            setup.image = imageName
        }

      }

      await setup.save()

      return{
        message: 'Setup atualizado com sucesso',
        data: setup
      }

}
      }
    
