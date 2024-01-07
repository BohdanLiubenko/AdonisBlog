import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import DataTableService from 'App/Service/DataTableService'
import Event from '@ioc:Adonis/Core/Event'

export default class ContentsController {
  public async create({ request, response }: HttpContextContract) {
    const { name, content } = request.all()

    await Content.create({ name, content })

    Event.emit('new:content', {})

    return response.redirect('/admin/panel/contents')
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { name, content } = request.all()

    await Content.query().where('id', params.id).update({ name, content })

    Event.emit('new:content', '')

    return response.status(200)
  }

  public async delete({ params, response }: HttpContextContract) {
    await Content.query().where('id', params.id).delete()

    Event.emit('new:content', {})

    return response.status(200)
  }

  public async renderTable({ request, response }) {
    const dataTable = new DataTableService(Content.query().select(), request.all())

    const result = await dataTable.processTable()

    return response.json(result)
  }

  public async renderSingle({ params, view }: HttpContextContract) {
    const content = await Content.find(params.id)

    return view.render('admin/content/edit', { content })
  }
}
