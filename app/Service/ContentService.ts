import { inject } from '@adonisjs/core/build/standalone'
import Content from 'App/Models/Content'

@inject()
export default class ContentService {
  private dictionary = {}

  public async fetch() {
    const content = await Content.all()

    content.forEach((row) => {
      this.dictionary[row.name] = row.content
    })
  }

  public getByName(name) {
    return this.dictionary[name]
  }
}
