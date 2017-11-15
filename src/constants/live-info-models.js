import modelAirtimeV1LiveInfo from 'models/live-info-airtime-v1'
import modelAirtimeV2LiveInfo from 'models/live-info-airtime-v2'
import modelMixlrLiveInfo from 'models/live-info-mixlr'
import modelLeMellotronInfo from 'models/live-info-le-mellotron'
import modelRedLightRadioLiveInfo from 'models/live-info-red-light-radio'
import modelRadioCoLiveInfo from 'models/live-info-radio-co'
import modelNoodsRadioLiveInfo from 'models/live-info-noods-radio'
import modelWorldWideFmLiveInfo from 'models/live-info-worldwide-fm'
import modelNTSRadioLiveInfo from 'models/live-info-nts-radio'
import modelKmahRadioLiveInfo from 'models/live-info-kmah-radio'

const liveInfoModels = {
  'balamii': modelAirtimeV2LiveInfo,
  'berlin-community-radio': modelAirtimeV2LiveInfo,
  'boxout-fm': modelAirtimeV2LiveInfo,
  'frission-radio': modelAirtimeV2LiveInfo,
  'kmah-radio': modelKmahRadioLiveInfo,
  'le-mellotron': modelLeMellotronInfo,
  'lyl-radio': modelAirtimeV1LiveInfo,
  'n10as-radio': modelAirtimeV2LiveInfo,
  'netil-radio': modelMixlrLiveInfo,
  'noods-radio': modelNoodsRadioLiveInfo,
  'nts-radio': modelNTSRadioLiveInfo,
  'red-light-radio': modelRedLightRadioLiveInfo,
  'seoul-community-radio': modelAirtimeV2LiveInfo,
  'soho-radio': modelRadioCoLiveInfo,
  'the-lot-radio': modelAirtimeV2LiveInfo,
  'worldwide-fm': modelWorldWideFmLiveInfo
}

export default liveInfoModels
