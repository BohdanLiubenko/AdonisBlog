import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async create({ request, response }: HttpContextContract) {
    const { title, content } = request.all()

    const image = request.file('image', {
      extnames: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb',
    })!

    await Post.create({ title, content, image: Attachment.fromFile(image) })

    return response.redirect('/admin/panel/posts')
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { title, content } = request.all()
    const image = request.file('image', {
      extnames: ['jpg', 'png', 'jpeg', 'svg'],
      size: '2mb',
    })

    const post = await Post.findOrFail(params.id)
    image
      ? post.merge({ title, content, image: Attachment.fromFile(image) })
      : post.merge({ title, content })

    await post.save()
    return response.status(200)
  }

  public async delete({ params, response }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).firstOrFail()

    await post.delete()

    response.status(200)
  }

  public async renderAll({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const posts = await Post.query().orderBy('createdAt', 'desc').paginate(page, 9)
    if (request.matchesRoute('/blog')) {
      posts.baseUrl('/blog')

      return view.render('blog', { posts })
    } else if (request.matchesRoute('/admin/panel/posts')) {
      posts.baseUrl('/admin/panel/posts')

      return view.render('admin/posts', { posts })
    }
  }

  public async renderLatest({ view }: HttpContextContract) {
    const posts = await Post.query().orderBy('createdAt', 'desc').limit(3).exec()

    return view.render('index', { posts })
  }

  public async renderSingle({ request, params, view }: HttpContextContract) {
    const post = await Post.find(params.id)
    if (request.matchesRoute('/admin/panel/posts/edit/:id')) {
      return view.render('admin/edit', { post })
    } else {
      return view.render('single', { post })
    }
  }
}
