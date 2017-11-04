import logoBalamii from 'images/logo-balamii.jpg'
import profileBalamii from 'images/profile-balamii.jpeg'
import logoLYLRadio from 'images/logo-lyl-radio.jpg'
import profileLYLRadio from 'images/profile-lyl-radio.jpg'
import logoLeMellotron from 'images/logo-le-mellotron.jpg'
import profileLeMellotron from 'images/profile-le-mellotron.jpeg'
import logoBasso from 'images/logo-basso-radio.jpg'
import profileBasso from 'images/profile-basso-radio.png'
import logoBerlinCommunityRadio from 'images/logo-berlin-community-radio.png'
import profileBerlinCommunityRadio from 'images/profile-berlin-community-radio.jpeg'
import logoFrissionRadio from 'images/logo-frission-radio.jpg'
import profileFrissionRadio from 'images/profile-frission-radio.jpeg'
import logoNTS from 'images/logo-nts.jpg'
import profileNTS from 'images/profile-nts.jpeg'
import logoNoodsRadio from 'images/logo-noods-radio.jpg'
import profileNoodsRadio from 'images/profile-noods-radio.jpeg'
import logoRedBullRadio from 'images/logo-red-bull-radio.jpg'
import profileRedBullRadio from 'images/profile-red-bull-radio.jpg'
import logoRadarRadio from 'images/logo-radar-radio.jpg'
import profileRadarRadio from 'images/profile-radar-radio.jpeg'
import logoRinseFM from 'images/logo-rinse-fm.jpg'
import profileRinseFM from 'images/profile-rinse-fm.jpeg'
import logoSOHORadio from 'images/logo-soho-radio.jpeg'
import profileSOHORadio from 'images/profile-soho-radio.jpeg'
import logoTheLotRadio from 'images/logo-the-lot-radio.png'
import profileTheLotRadio from 'images/profile-the-lot-radio.jpeg'
import logoWorldwideFM from 'images/logo-worldwide-fm.jpg'
import profileWorldwideFM from 'images/profile-worldwide-fm.jpg'
import logoTederFM from 'images/logo-teder-fm.png'
import profileTederFM from 'images/profile-teder-fm.png'
import logoRedLightRadio from 'images/logo-red-light-radio.png'
import profileRedLightRadio from 'images/profile-red-light-radio.jpg'
import logoN10asRadio from 'images/logo-n10as-radio.jpg'
import profileN10asRadio from 'images/profile-n10as-radio.jpeg'
import logoBoxoutFM from 'images/logo-boxout-fm.png'
import profileBoxoutFM from 'images/profile-boxout-fm.jpeg'
import logoNetilRadio from 'images/logo-netil-radio.png'
import profileNetilRadio from 'images/profile-netil-radio.jpg'
import logoRadioLaBici from 'images/logo-radio-la-bici.png'
import profileRadioLaBici from 'images/profile-radio-la-bici.jpeg'
import logoSeoulCommunityRadio from 'images/logo-seoul-community-radio.jpg'
import profileSeoulCommunityRadio from 'images/profile-seoul-community-radio.jpeg'
import logoKmahRadio from 'images/logo-kmah-radio.jpeg'
import profileKmahRadio from 'images/profile-kmah-radio.jpeg'

export default [
  {
    name: 'The Lot Radio',
    streamUrl: 'http://thelot.out.airtime.pro:8000/thelot_a',
    slug: 'the-lot-radio',
    city: 'Brooklyn',
    country: 'USA',
    twitterHandle: 'TheLotRadio',
    logo: logoTheLotRadio,
    profileImage: profileTheLotRadio,
    airtime: {
      liveInfoUrl: 'https://thelot.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Frission Radio',
    streamUrl: 'http://frission.out.airtime.pro:8000/frission_a',
    slug: 'frission-radio',
    country: 'Worldwide',
    twitterHandle: 'frissionradio',
    logo: logoFrissionRadio,
    profileImage: profileFrissionRadio,
    airtime: {
      liveInfoUrl: 'https://frission.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Le Mellotron',
    streamUrl: 'http://shouting.trinoma.net/stream/1/',
    slug: 'le-mellotron',
    city: 'Paris',
    country: 'France',
    twitterHandle: 'LeMellotron',
    logo: logoLeMellotron,
    profileImage: profileLeMellotron
  }, {
    name: 'LYL Radio',
    streamUrl: 'http://airtime.lyl.live:8000/live',
    slug: 'lyl-radio',
    city: 'Lyon',
    country: 'France',
    twitterHandle: 'lyl_radio',
    logo: logoLYLRadio,
    profileImage: profileLYLRadio
  }, {
    name: 'Soho Radio',
    streamUrl: 'http://streaming.radio.co/s57043ec0a/listen',
    slug: 'soho-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'sohoradio',
    logo: logoSOHORadio,
    profileImage: profileSOHORadio
  }, {
    name: 'Berlin Community Radio',
    streamUrl: 'http://berlincommunityradio.out.airtime.pro:8000/berlincommunityradio_a',
    slug: 'berlin-community-radio',
    city: 'Berlin',
    country: 'Germany',
    twitterHandle: 'BCR_Radio',
    logo: logoBerlinCommunityRadio,
    profileImage: profileBerlinCommunityRadio,
    airtime: {
      liveInfoUrl: 'https://berlincommunityradio.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Balamii',
    streamUrl: 'http://balamii.out.airtime.pro:8000/balamii_a',
    slug: 'balamii',
    city: 'London',
    country: 'UK',
    twitterHandle: 'Balamii',
    logo: logoBalamii,
    profileImage: profileBalamii,
    airtime: {
      liveInfoUrl: 'https://balamii.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Noods Radio',
    streamUrl: 'http://149.255.59.164:8051/live',
    slug: 'noods-radio',
    city: 'Bristol',
    country: 'UK',
    twitterHandle: 'noodsradio',
    logo: logoNoodsRadio,
    profileImage: profileNoodsRadio
  }, {
    name: 'Worldwide FM',
    streamUrl: 'http://worldwidefm.out.airtime.pro:8000/worldwidefm_a',
    slug: 'worldwide-fm',
    country: 'Worldwide',
    twitterHandle: 'worldwidefm',
    logo: logoWorldwideFM,
    profileImage: profileWorldwideFM,
    airtime: {
      liveInfoUrl: 'https://worldwidefm.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Radar Radio',
    streamUrl: 'http://soho.wavestreamer.com:5831/1/;stream.mp3',
    slug: 'radar-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'RadarRadioLDN',
    logo: logoRadarRadio,
    profileImage: profileRadarRadio
  }, {
    name: 'NTS LDN',
    streamUrl: 'http://stream-relay-geo.ntslive.net/stream',
    slug: 'nts-ldn',
    city: 'London',
    country: 'UK',
    twitterHandle: 'ntslive',
    logo: logoNTS,
    profileImage: profileNTS
  }, {
    name: 'NTS Worldwide',
    streamUrl: 'http://stream-relay-geo.ntslive.net/stream2',
    slug: 'nts-worldwide',
    city: 'Los Angeles',
    country: 'USA',
    twitterHandle: 'ntslive',
    logo: logoNTS,
    profileImage: profileNTS
  }, {
    name: 'Basso Radio',
    streamUrl: 'http://stream.basso.fi:8000/stream',
    slug: 'basso-radio',
    city: 'Helsinki',
    country: 'Finland',
    twitterHandle: 'bassomedia',
    logo: logoBasso,
    profileImage: profileBasso
  }, {
    name: 'Red Bull Radio',
    streamUrl: 'http://broadcast.rbmaradio.net/main',
    slug: 'red-bull-radio',
    country: 'Worldwide',
    twitterHandle: 'redbull_radio',
    logo: logoRedBullRadio,
    profileImage: profileRedBullRadio
  }, {
    name: 'Rinse FM',
    streamUrl: 'http://streamer.dgen.net:8000/rinseradio',
    slug: 'rinse-fm',
    city: 'London',
    country: 'UK',
    twitterHandle: 'RinseFM',
    logo: logoRinseFM,
    profileImage: profileRinseFM
  }, {
    name: 'TEDER.FM',
    streamUrl: 'http://server1.live1.co.il:8014/teder',
    slug: 'teder-fm',
    city: 'Tel Aviv',
    country: 'Israel',
    twitterHandle: 'teder_fm',
    logo: logoTederFM,
    profileImage: profileTederFM
  }, {
    name: 'Red Light Radio',
    streamUrl: 'http://www.michielgardner.nl:8000/redlightradio',
    slug: 'red-light-radio',
    city: 'Amsterdam',
    country: 'Netherlands',
    twitterHandle: 'Red_Light_Radio',
    logo: logoRedLightRadio,
    profileImage: profileRedLightRadio
  }, {
    name: 'n10.as Radio',
    streamUrl: 'http://n10as.out.airtime.pro:8000/n10as_a',
    slug: 'n10as-radio',
    city: 'Montreal',
    country: 'Canada',
    twitterHandle: 'n10asradio',
    logo: logoN10asRadio,
    profileImage: profileN10asRadio,
    airtime: {
      liveInfoUrl: 'https://n10as.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Boxout.fm',
    streamUrl: 'http://boxoutfm.out.airtime.pro:8000/boxoutfm_a',
    slug: 'boxout-fm',
    city: 'New Delhi',
    country: 'India',
    twitterHandle: 'boxoutfm',
    logo: logoBoxoutFM,
    profileImage: profileBoxoutFM,
    airtime: {
      liveInfoUrl: 'https://boxoutfm.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'Netil Radio',
    streamUrl: 'http://edge.mixlr.com/channel/otuyv',
    slug: 'netil-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'netilradio',
    logo: logoNetilRadio,
    profileImage: profileNetilRadio
  }, {
    name: 'Radio LaBici',
    streamUrl: 'http://stream.radiolabici.com:8000/stream',
    slug: 'radio-la-bici',
    city: 'Buenos Aires',
    country: 'Argentina',
    twitterHandle: 'radiolabici',
    logo: logoRadioLaBici,
    profileImage: profileRadioLaBici
  }, {
    name: 'Seoul Community Radio',
    streamUrl: 'http://seoulcommunityradio.out.airtime.pro:8000/seoulcommunityradio_a',
    slug: 'seoul-community-radio',
    city: 'Seoul',
    country: 'South Korea',
    twitterHandle: 'radio_scr',
    logo: logoSeoulCommunityRadio,
    profileImage: profileSeoulCommunityRadio,
    airtime: {
      liveInfoUrl: 'https://seoulcommunityradio.airtime.pro/api/live-info-v2/'
    }
  }, {
    name: 'KMAH Radio',
    streamUrl: 'http://66.55.143.200/proxy/kmahradi?mp=/;stream/1',
    slug: 'kmah-radio',
    city: 'Leeds',
    country: 'UK',
    twitterHandle: 'kmahradio',
    logo: logoKmahRadio,
    profileImage: profileKmahRadio
  }
]
