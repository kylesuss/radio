import modelLiveInfoLylRadio from 'models/live-info-lyl-radio'
import modelAirtimeV2LiveInfo from 'models/live-info-airtime-v2'
import modelNetilRadioLiveInfo from 'models/live-info-netil-radio'
import modelLeMellotronInfo from 'models/live-info-le-mellotron'
import modelRedLightRadioLiveInfo from 'models/live-info-red-light-radio'
import modelSohoRadioLiveInfo from 'models/live-info-soho-radio'
import modelNoodsRadioLiveInfo from 'models/live-info-noods-radio'
import modelWorldWideFmLiveInfo from 'models/live-info-worldwide-fm'
import modelNTSRadioLiveInfo from 'models/live-info-nts-radio'
import modelKmahRadioLiveInfo from 'models/live-info-kmah-radio'
import modelRadarRadioLiveInfo from 'models/live-info-radar-radio'
import modelBassoRadioLiveInfo from 'models/live-info-basso-radio'
import modelRinseFmLiveInfo from 'models/live-info-rinse-fm'
import modelSeoulCommunityRadioLiveInfo from 'models/live-info-seoul-community-radio'
import modelTederFmLiveInfo from 'models/live-info-teder-fm'
import modelBoxoutFmLiveInfo from 'models/live-info-boxout-fm'
import modelNoFunRadioLiveInfo from 'models/live-info-no-fun-radio'

const liveInfoModels = {
  'balamii': modelAirtimeV2LiveInfo,
  'basso-radio': modelBassoRadioLiveInfo,
  'berlin-community-radio': modelAirtimeV2LiveInfo,
  'boxout-fm': modelBoxoutFmLiveInfo,
  'frission-radio': modelAirtimeV2LiveInfo,
  'kmah-radio': modelKmahRadioLiveInfo,
  'le-mellotron': modelLeMellotronInfo,
  'lyl-radio': modelLiveInfoLylRadio,
  'n10as-radio': modelAirtimeV2LiveInfo,
  'netil-radio': modelNetilRadioLiveInfo,
  'no-fun-radio': modelNoFunRadioLiveInfo,
  'noods-radio': modelNoodsRadioLiveInfo,
  'nts-radio': modelNTSRadioLiveInfo,
  'radar-radio': modelRadarRadioLiveInfo,
  'red-light-radio': modelRedLightRadioLiveInfo,
  'rinse-fm': modelRinseFmLiveInfo,
  'seoul-community-radio': modelSeoulCommunityRadioLiveInfo,
  'soho-radio': modelSohoRadioLiveInfo,
  'teder-fm': modelTederFmLiveInfo,
  'the-lot-radio': modelAirtimeV2LiveInfo,
  'worldwide-fm': modelWorldWideFmLiveInfo
}

export default liveInfoModels
