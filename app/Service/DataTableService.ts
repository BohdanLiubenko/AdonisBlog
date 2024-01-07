import { LucidModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class DataTableService {
  constructor(
    protected queryBuilder: ModelQueryBuilderContract<LucidModel, any>,
    protected params: {
      draw: any
      order: any
      length: number
      start: number
      columns: any[]
      search: {
        value: string | null
      }
    }
  ) {}

  public async processTable() {
    const { draw, order, length, start, columns, search } = this.params

    const query = this.queryBuilder.clone()

    if (search.value) {
      columns.forEach((column) => {
        if (column.searchable !== 'true') {
          return
        }

        query.orWhereRaw(`LOWER((${column.name})::text) like ?`, [
          `%${search.value?.trim().toLowerCase()}%`,
        ])
      })
    }

    if (order) {
      query.orderBy(columns[order[0].column].data, order[0].dir)
    }

    const totalQuery = this.queryBuilder.clone()

    const totalResult = await totalQuery.count('* as total').first()
    const total = totalResult ? totalResult['$extras']['total'] : 0

    const list = await query.offset(start).limit(length)

    return {
      draw: draw,
      recordsTotal: total,
      recordsFiltered: total,
      data: list,
    }
  }
}
