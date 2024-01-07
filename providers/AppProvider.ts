import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    const View = (await import('@ioc:Adonis/Core/View')).default
    const { default: ContentService } = await import('App/Service/ContentService')
    const Event = (await import('@ioc:Adonis/Core/Event')).default
    const contentService = new ContentService()
    contentService.fetch()

    Event.on('new:content', contentService.fetch.bind(contentService))
    View.global('content', (name: string) => {
      const content = contentService.getByName(name)
      console.log(`${name} ${content}`)
      return content ? content.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2') : ''
    })
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
