import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  enabled: true,

  dotFiles: 'ignore',

  etag: true,

  lastModified: true,

  immutable: false,
}

export default staticConfig
