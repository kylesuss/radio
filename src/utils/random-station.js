import stationsFixtures from 'fixtures/stations'
import random from 'lodash/random'

const activeStations = stationsFixtures.filter(station => station.isActive)
const randomStationIndex = random(0, activeStations.length - 1)
const randomStation = activeStations[randomStationIndex]

export default randomStation
