import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class DataTablesProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('App/Services/DataTables', () => {
      return import('./DataTableService')
    })
  }
}
