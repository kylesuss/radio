import aws from 'aws-sdk'
import stations from '../fixtures/stations'

const TABLE_NAME = 'stations'
const REGION = 'us-east-1'
const REQUEST_ITEMS = 'RequestItems'

const buildWriteItemParams = (stations) => (
  stations.reduce((accumulator, station) => ({
    ...accumulator,
    [REQUEST_ITEMS]: {
      [TABLE_NAME]: accumulator[REQUEST_ITEMS][TABLE_NAME].concat({
        PutRequest: { Item: { ...station } }
      })
    }
  }), { [REQUEST_ITEMS]: { [TABLE_NAME]: [] } })
)

const dynamoDB = new aws.DynamoDB.DocumentClient({
  region: REGION
})

const writeParams = buildWriteItemParams(stations)

dynamoDB.batchWrite(writeParams, (err, data) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  }

  if (data) {
    console.log(`SUCCESS: ${JSON.stringify(data, null, 2)}`)
  }
})
