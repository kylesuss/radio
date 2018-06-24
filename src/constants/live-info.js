import modelLiveInfoLylRadio from 'models/live-info-lyl-radio'
import modelAirtimeV2LiveInfo from 'models/live-info-airtime-v2'
import modelNetilRadioLiveInfo from 'models/live-info-netil-radio'
import modelLeMellotronInfo from 'models/live-info-le-mellotron'
import modelRedLightRadioLiveInfo from 'models/live-info-red-light-radio'
import modelSohoRadioLiveInfo from 'models/live-info-soho-radio'
import modelNoodsRadioLiveInfo from 'models/live-info-noods-radio'
import modelWorldWideFmLiveInfo from 'models/live-info-worldwide-fm'
import {
  modelNTSRadioLiveInfoStream1,
  modelNTSRadioLiveInfoStream2
} from 'models/live-info-nts-radio'
import modelKmahRadioLiveInfo from 'models/live-info-kmah-radio'
import modelBassoRadioLiveInfo from 'models/live-info-basso-radio'
import modelRinseFmLiveInfo from 'models/live-info-rinse-fm'
import modelSeoulCommunityRadioLiveInfo from 'models/live-info-seoul-community-radio'
import modelTederFmLiveInfo from 'models/live-info-teder-fm'
import modelPinataRadioLiveInfo from 'models/live-info-pinata-radio'

export const LIVE_INFO_MODELS = {
  'balamii-1': modelAirtimeV2LiveInfo,
  'basso-radio-1': modelBassoRadioLiveInfo,
  'berlin-community-radio-1': modelAirtimeV2LiveInfo,
  'boxout-fm-1': modelAirtimeV2LiveInfo,
  'cashmere-radio-1': modelAirtimeV2LiveInfo,
  'frission-radio-1': modelAirtimeV2LiveInfo,
  'kmah-radio-1': modelKmahRadioLiveInfo,
  'le-mellotron-1': modelLeMellotronInfo,
  'lyl-radio-1': modelLiveInfoLylRadio,
  'n10as-radio-1': modelAirtimeV2LiveInfo,
  'netil-radio-1': modelNetilRadioLiveInfo,
  'no-fun-radio-1': modelAirtimeV2LiveInfo,
  'noods-radio-1': modelNoodsRadioLiveInfo,
  'nts-radio-1': modelNTSRadioLiveInfoStream1,
  'nts-radio-2': modelNTSRadioLiveInfoStream2,
  'pinata-radio-1': modelPinataRadioLiveInfo,
  'red-light-radio-1': modelRedLightRadioLiveInfo,
  'rinse-fm-1': modelRinseFmLiveInfo,
  'seoul-community-radio-1': modelSeoulCommunityRadioLiveInfo,
  'soho-radio-1': modelSohoRadioLiveInfo,
  'teder-fm-1': modelTederFmLiveInfo,
  'the-lot-radio-1': modelAirtimeV2LiveInfo,
  'worldwide-fm-1': modelWorldWideFmLiveInfo
}

export const LIVE_INFO_ACTIVE_STATUS = 'ACTIVE'
export const LIVE_INFO_INACTIVE_STATUS = 'INACTIVE'
export const LIVE_INFO_NO_DATA_STATUS = 'NO_DATA'
export const LIVE_INFO_CURRENT_KEY = 'current'
export const LIVE_INFO_STATUS_KEY = 'status'
