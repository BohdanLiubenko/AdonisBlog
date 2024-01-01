import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public truncate_content: string

  @attachment({ preComputeUrl: true })
  public image: AttachmentContract

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @beforeSave()
  public static async truncateContent(post: Post) {
    if (post.content) {
      post.truncate_content =
        post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '')
    }
  }
}
