import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response, session }: HttpContextContract) {
    const { email, password, rememberMe } = request.all()
    const user = await User.query().where('email', email).first()

    if (!user) {
      session.flash({ emailError: 'No user with such email' })
      return response.redirect().back()
    } else if (!(await Hash.verify(user.password, password))) {
      console.log('bad')

      session.flash({ passwordError: 'Password not right' })
      return response.redirect().back()
    }

    await auth.login(user, rememberMe)

    if (auth.isLoggedIn) {
      return response.redirect('/admin/panel')
    }
  }
}
