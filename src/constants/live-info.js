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
import modelBassoRadioLiveInfo from 'models/live-info-basso-radio'
import modelRinseFmLiveInfo from 'models/live-info-rinse-fm'
import modelSeoulCommunityRadioLiveInfo from 'models/live-info-seoul-community-radio'
import modelTederFmLiveInfo from 'models/live-info-teder-fm'
import modelPinataRadioLiveInfo from 'models/live-info-pinata-radio'

export const LIVE_INFO_MODELS = {
  'balamii': modelAirtimeV2LiveInfo,
  'basso-radio': modelBassoRadioLiveInfo,
  'berlin-community-radio': modelAirtimeV2LiveInfo,
  'boxout-fm': modelAirtimeV2LiveInfo,
  'cashmere-radio': modelAirtimeV2LiveInfo,
  'frission-radio': modelAirtimeV2LiveInfo,
  'kmah-radio': modelKmahRadioLiveInfo,
  'le-mellotron': modelLeMellotronInfo,
  'lyl-radio': modelLiveInfoLylRadio,
  'n10as-radio': modelAirtimeV2LiveInfo,
  'netil-radio': modelNetilRadioLiveInfo,
  'no-fun-radio': modelAirtimeV2LiveInfo,
  'noods-radio': modelNoodsRadioLiveInfo,
  'nts-radio': modelNTSRadioLiveInfo,
  'pinata-radio': modelPinataRadioLiveInfo,
  'red-light-radio': modelRedLightRadioLiveInfo,
  'rinse-fm': modelRinseFmLiveInfo,
  'seoul-community-radio': modelSeoulCommunityRadioLiveInfo,
  'soho-radio': modelSohoRadioLiveInfo,
  'teder-fm': modelTederFmLiveInfo,
  'the-lot-radio': modelAirtimeV2LiveInfo,
  'worldwide-fm': modelWorldWideFmLiveInfo
}

export const LIVE_INFO_ACTIVE_STATUS = 'ACTIVE'
export const LIVE_INFO_INACTIVE_STATUS = 'INACTIVE'
export const LIVE_INFO_NO_DATA_STATUS = 'NO_DATA'
export const LIVE_INFO_CURRENT_KEY = 'current'
export const LIVE_INFO_STATUS_KEY = 'status'
