import stationsFixtures from 'fixtures/stations'
import random from 'lodash/random'

const randomStationIndex = random(0, stationsFixtures.length - 1)
const randomStation = stationsFixtures[randomStationIndex]

export default randomStation
