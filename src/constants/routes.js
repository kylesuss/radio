import { DEFAULT_STREAM_NUMBER } from 'constants/player'

export const ROOT_PATH = '/'
export const STATION_PATH = '/:slug/stream/:streamNumber'
export const buildStationPath = (slug, streamNumber = DEFAULT_STREAM_NUMBER) => (
  `/${slug}/stream/${streamNumber}`
)
