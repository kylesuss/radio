export default [
  {
    name: 'The Lot Radio',
    streamUrl: 'http://thelot.out.airtime.pro:8000/thelot_a',
    slug: 'the-lot-radio',
    city: 'Brooklyn',
    country: 'USA',
    twitterHandle: 'TheLotRadio',
    liveInfoUrl: 'https://thelot.airtime.pro/api/live-info-v2/',
    timezone: 'America/New_York',
    video: {
      type: 'iframe',
      url: 'https://livestream.com/accounts/25639407/events/7618785/player?width=640&height=360&enableInfoAndActivity=false&defaultDrawer=&autoPlay=true',
      mutedUrl: 'https://livestream.com/accounts/25639407/events/7618785/player?width=640&height=360&enableInfoAndActivity=false&defaultDrawer=&autoPlay=true&mute=true'
    },
    isActive: true,
    description: 'An independent online radio station live streaming 24/7 from a reclaimed shipping container on an empty lot in NYC.',
    web: {
      url: 'http://www.thelotradio.com/',
      display: 'thelotradio.com'
    },
    archives: [
      { url: 'https://www.mixcloud.com/thelotradio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/thelotradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'Frission Radio',
    streamUrl: 'http://frission.out.airtime.pro:8000/frission_a',
    slug: 'frission-radio',
    country: 'Worldwide',
    twitterHandle: 'frissionradio',
    liveInfoUrl: 'https://frission.airtime.pro/api/live-info-v2/',
    isActive: true,
    web: {
      url: 'https://frissionradio.com/',
      display: 'frissionradio.com'
    },
    description: 'Our global team of curators are on a mission to deliver the best in new and unearthed music for you to explore. We curate great music in all its unique forms.',
    archives: [
      { url: 'https://www.mixcloud.com/frission/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/frissionradioworldwide', display: 'SoundCloud' }
    ]
  }, {
    name: 'Le Mellotron',
    streamUrl: 'http://shouting.trinoma.net/stream/1/',
    slug: 'le-mellotron',
    city: 'Paris',
    country: 'France',
    twitterHandle: 'LeMellotron',
    liveInfoUrl: 'https://freshtransmission.com/live-info/le-mellotron',
    timezone: 'Europe/Paris',
    video: {
      type: 'stream',
      url: 'http://www.dailymotion.com/video/x2ek01k'
    },
    description: 'Global music radio streaming 24/7 from a bar in the heart of Paris.',
    isActive: true,
    web: {
      url: 'https://www.lemellotron.com/',
      display: 'lemellotron.com'
    },
    archives: [
      { url: 'https://www.mixcloud.com/LeMellotron/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/lemellotron', display: 'SoundCloud' }
    ]
  }, {
    name: 'LYL Radio',
    streamUrl: 'http://icecast.lyl.live/live',
    slug: 'lyl-radio',
    city: 'Lyon',
    country: 'France',
    twitterHandle: 'LYL_Radio',
    liveInfoUrl: 'https://freshtransmission.com/live-info/lyl-radio',
    timezone: 'Europe/Paris',
    isActive: true,
    web: {
      url: 'http://lyl.live/',
      display: 'lyl.live'
    },
    description: 'Independent live webradio with physical studios in Lyon and Paris & tangible contributors from all around the globe.',
    archives: [
      { url: 'https://www.mixcloud.com/lylradio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Soho Radio',
    streamUrl: 'https://streaming.radio.co/s57043ec0a/listen',
    slug: 'soho-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'sohoradio',
    liveInfoUrl: 'https://public.radio.co/stations/s57043ec0a/status',
    timezone: 'Europe/London',
    isActive: true,
    web: {
      url: 'http://www.sohoradiolondon.com/',
      display: 'sohoradiolondon.com'
    },
    description: 'Straight from the heart of world famous Soho, London. We\'ve got the best of everything Soho has to offer; an unrivalled mix of cultures, styles and genres. From pop to punk via reggae, soul and funk.',
    archives: [
      { url: 'https://www.mixcloud.com/sohoradio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Berlin Community Radio',
    streamUrl: 'http://berlincommunityradio.out.airtime.pro:8000/berlincommunityradio_a',
    slug: 'berlin-community-radio',
    city: 'Berlin',
    country: 'Germany',
    twitterHandle: 'BCR_Radio',
    liveInfoUrl: 'https://berlincommunityradio.airtime.pro/api/live-info-v2/',
    timezone: 'Europe/Berlin',
    isActive: true,
    web: {
      url: 'http://www.berlincommunityradio.com/',
      display: 'berlincommunityradio.com'
    },
    description: 'Berlin Community Radio is an online broadcasting platform presenting everything that is coming from, passing through or influencing the creative scene in Berlin.',
    archives: [
      { url: 'https://www.mixcloud.com/BCR_Radio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/berlincommunityradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'Balamii',
    streamUrl: 'http://balamii.out.airtime.pro:8000/balamii_a',
    slug: 'balamii',
    city: 'London',
    country: 'UK',
    twitterHandle: 'Balamii',
    liveInfoUrl: 'https://balamii.airtime.pro/api/live-info-v2/',
    timezone: 'Europe/London',
    description: 'Radio station broadcasting from Peckham, London & Downtown NYC',
    isActive: true,
    web: {
      url: 'http://player.balamii.com/',
      display: 'player.balamii.com'
    },
    archives: [
      { url: 'https://www.mixcloud.com/balamii/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/balamii', display: 'SoundCloud' }
    ]
  }, {
    name: 'Noods Radio',
    streamUrl: 'http://radio.citrus3.com:8862/;stream.mp3',
    slug: 'noods-radio',
    city: 'Bristol',
    country: 'UK',
    twitterHandle: 'noodsradio',
    liveInfoUrl: 'https://freshtransmission.com/live-info/noods-radio',
    timezone: 'Europe/London',
    isActive: true,
    web: {
      url: 'http://noodsradio.com/',
      display: 'noodsradio.com'
    },
    description: 'Bristol based independent radio.',
    archives: [
      { url: 'https://www.mixcloud.com/NoodsRadio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Worldwide FM',
    streamUrl: 'http://worldwidefm.out.airtime.pro:8000/worldwidefm_a',
    slug: 'worldwide-fm',
    country: 'Worldwide',
    twitterHandle: 'worldwidefm',
    liveInfoUrl: 'https://worldwidefm.airtime.pro/api/live-info-v2/',
    isActive: true,
    web: {
      url: 'https://worldwidefm.net/',
      display: 'worldwidefm.net'
    },
    description: 'A unique radio platform exploring arts, music and culture from London, Berlin, Tokyo, Kyoto, Los Angeles and beyond.',
    archives: [
      { url: 'https://www.mixcloud.com/worldwidefm/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/worldwide-fm', display: 'SoundCloud' }
    ]
  }, {
    name: 'Radar Radio',
    streamUrl: 'http://soho.wavestreamer.com:5831/1/;stream.mp3',
    slug: 'radar-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'RadarRadioLDN',
    liveInfoUrl: 'https://freshtransmission.com/live-info/radar-radio',
    timezone: 'Europe/London',
    isActive: false
  }, {
    name: 'NTS Radio',
    streamUrl: 'http://stream-relay-geo.ntslive.net/stream',
    slug: 'nts-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'NTSlive',
    liveInfoUrl: 'https://www.nts.live/api/v2/live',
    timezone: 'Europe/London',
    description: 'London based independent live radio and music platform, dedicated to championing new music and unearthing lost gems.',
    isActive: true,
    web: {
      url: 'https://www.nts.live/',
      display: 'nts.live'
    },
    archives: [
      { url: 'https://www.mixcloud.com/NTSRadio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/nts_live', display: 'SoundCloud' }
    ]
  }, {
    name: 'Basso Radio',
    streamUrl: 'http://stream.basso.fi:8000/stream',
    slug: 'basso-radio',
    city: 'Helsinki',
    country: 'Finland',
    twitterHandle: 'Bassomedia',
    liveInfoUrl: 'https://freshtransmission.com/live-info/basso-radio',
    timezone: 'Europe/Helsinki',
    isActive: true,
    web: {
      url: 'http://www.basso.fi/',
      display: 'basso.fi'
    },
    description: 'Basso Radio is a radio station focused on urban culture and contemporary dance music.',
    archives: [
      { url: 'https://soundcloud.com/bassoradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'Red Bull Radio',
    streamUrl: 'http://broadcast.rbmaradio.net/main',
    slug: 'red-bull-radio',
    country: 'Worldwide',
    twitterHandle: 'redbull_radio',
    isActive: true,
    web: {
      url: 'https://www.redbullradio.com/',
      display: 'redbullradio.com'
    },
    description: 'The best music selection on the web.',
    archives: [
      { url: 'https://www.mixcloud.com/redbullradio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Rinse FM',
    streamUrl: 'http://streamer.dgen.net:8000/rinseradio',
    slug: 'rinse-fm',
    city: 'London',
    country: 'UK',
    twitterHandle: 'RinseFM',
    liveInfoUrl: 'https://freshtransmission.com/live-info/rinse-fm',
    timezone: 'Europe/London',
    isActive: true,
    web: {
      url: 'http://rinse.fm/',
      display: 'rinse.fm'
    },
    description: 'Est.1994. Transmitting uncompromising and innovative music out of its East London heartland, it started life as a pirate station established by a group of friends wanting to share the music that inspired them.',
    archives: [
      { url: 'https://soundcloud.com/rinsefm', display: 'SoundCloud' }
    ]
  }, {
    name: 'TEDER.FM',
    streamUrl: 'http://server1.live1.co.il:8014/teder',
    slug: 'teder-fm',
    city: 'Tel Aviv',
    country: 'Israel',
    twitterHandle: 'teder_fm',
    liveInfoUrl: 'https://freshtransmission.com/live-info/teder-fm',
    timezone: 'Asia/Tel_Aviv',
    isActive: true,
    web: {
      url: 'http://teder.fm/',
      display: 'teder.fm'
    },
    description: 'Teder = radio + bar + shop + spaceship!',
    archives: [
      { url: 'https://www.mixcloud.com/tederfm/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Red Light Radio',
    streamUrl: 'http://www.michielgardner.nl:8000/redlightradio',
    slug: 'red-light-radio',
    city: 'Amsterdam',
    country: 'Netherlands',
    twitterHandle: 'Red_Light_Radio',
    liveInfoUrl: 'https://freshtransmission.com/live-info/red-light-radio',
    timezone: 'Europe/Amsterdam',
    video: {
      type: 'stream',
      url: 'https://cdn-hlm-1.streamnerd.nl/live/redlightradio/playlist.m3u8'
    },
    isActive: true,
    web: {
      url: 'http://redlightradio.net/',
      display: 'redlightradio.net'
    },
    description: 'Red Light Radio is an online radio station broadcasting from a former prostitution window in the red light district of Amsterdam. Red Light Radio brings you daily shows of local DJ’s, live performances and cool personalities doing a one time only radio show. You can expect shows full of afro beat or shows with black metal next to live acoustic performances or DJ sets by artists.',
    archives: [
      { url: 'https://www.mixcloud.com/RedLightRadio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/redlightradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'n10.as Radio',
    streamUrl: 'http://n10as.out.airtime.pro:8000/n10as_a',
    slug: 'n10as-radio',
    city: 'Montreal',
    country: 'Canada',
    twitterHandle: 'n10asradio',
    liveInfoUrl: 'https://n10as.airtime.pro/api/live-info-v2/',
    timezone: 'America/Montreal',
    isActive: true,
    web: {
      url: 'http://www.n10.as/',
      display: 'n10.as'
    },
    description: 'Montreal & Vancouver based online radio station.',
    archives: [
      { url: 'https://www.mixcloud.com/n10as/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Boxout.fm',
    streamUrl: 'http://boxoutfm.out.airtime.pro:8000/boxoutfm_a',
    slug: 'boxout-fm',
    city: 'New Delhi',
    country: 'India',
    twitterHandle: 'boxoutfm',
    liveInfoUrl: 'https://boxoutfm.airtime.pro/api/live-info-v2/',
    timezone: 'Asia/Kolkata',
    isActive: true,
    web: {
      url: 'http://boxout.fm/',
      display: 'boxout.fm'
    },
    description: 'Online Community Radio from India offering a carefully-mined perspective on India’s emergent musical and cultural scenes, both on and off the Internet.',
    archives: [
      { url: 'https://www.mixcloud.com/boxoutfm/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/boxoutfm', display: 'SoundCloud' }
    ]
  }, {
    name: 'Netil Radio',
    streamUrl: 'http://edge.mixlr.com/channel/otuyv',
    slug: 'netil-radio',
    city: 'London',
    country: 'UK',
    twitterHandle: 'NetilRadio',
    liveInfoUrl: 'https://api.mixlr.com/users/5498175?source=embed',
    timezone: 'Europe/London',
    isActive: true,
    web: {
      url: 'http://www.netilradio.com/',
      display: 'netilradio.com'
    },
    description: 'Broadcasting from a converted shipping container in Netil Market, in the heart of London Fields.',
    archives: [
      { url: 'https://www.mixcloud.com/NetilRadio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Radio Labici',
    streamUrl: 'http://stream.radiolabici.com:8000/stream',
    slug: 'radio-labici',
    city: 'Buenos Aires',
    country: 'Argentina',
    twitterHandle: 'radiolabici',
    timezone: 'America/Argentina/Buenos_Aires',
    isActive: true,
    web: {
      url: 'http://www.radiolabici.com/',
      display: 'radiolabici.com'
    },
    description: 'Estación de radio online e independiente que emite a todo el mundo, las 24hs.',
    archives: [
      { url: 'https://www.mixcloud.com/radiolabici/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Seoul Community Radio',
    streamUrl: 'http://seoulcommunityradio.out.airtime.pro:8000/seoulcommunityradio_a',
    slug: 'seoul-community-radio',
    city: 'Seoul',
    country: 'South Korea',
    twitterHandle: 'radio_scr',
    liveInfoUrl: 'https://seoulcommunityradio.airtime.pro/api/live-info-v2/',
    timezone: 'Asia/Seoul',
    description: 'Seoul Community Radio (SCR) is Korea’s first radio platform dedicated to underground music + culture. Local talent, Global vibes 24/7.',
    isActive: true,
    web: {
      url: 'http://www.seoulcommunityradio.com/',
      display: 'seoulcommunityradio.com'
    },
    archives: [
      { url: 'https://www.mixcloud.com/SCR_Radio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/seoulcommunityradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'KMAH Radio',
    streamUrl: 'http://soho.wavestreamer.com:4597/1/;stream/1',
    slug: 'kmah-radio',
    city: 'Leeds',
    country: 'UK',
    twitterHandle: 'KMAHRadio',
    liveInfoUrl: 'https://freshtransmission.com/live-info/kmah-radio',
    timezone: 'Europe/London',
    isActive: true,
    web: {
      url: 'http://kmah-radio.com/',
      display: 'kmah-radio.com'
    },
    description: 'Independent radio station broadcasting house, dub, funk, jazz, hip hop, soul, techno and more from the back streets of Leeds.',
    archives: [
      { url: 'https://www.mixcloud.com/kmahradio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/kmah-radio', display: 'SoundCloud' }
    ]
  }, {
    name: 'No Fun Radio',
    streamUrl: 'http://nofun.out.airtime.pro:8000/nofun_a',
    slug: 'no-fun-radio',
    city: 'Vancouver',
    country: 'Canada',
    twitterHandle: 'NoFunRadio',
    liveInfoUrl: 'https://nofun.airtime.pro/api/live-info-v2',
    timezone: 'America/Vancouver',
    isActive: true,
    web: {
      url: 'http://www.nofunradio.com/',
      display: 'nofunradio.com'
    },
    description: 'Transmitting live audio-visual pleasures from Vancouver\'s Downtown Eastside.',
    archives: [
      { url: 'https://www.mixcloud.com/nofunradio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/nofunradio', display: 'SoundCloud' }
    ]
  }, {
    name: 'Cashmere Radio',
    streamUrl: 'http://cashmereradio.out.airtime.pro:8000/cashmereradio_b',
    slug: 'cashmere-radio',
    city: 'Berlin',
    country: 'Germany',
    twitterHandle: 'cashmere_radio',
    liveInfoUrl: 'https://cashmereradio.airtime.pro/api/live-info-v2',
    timezone: 'Europe/Berlin',
    isActive: true,
    web: {
      url: 'https://cashmereradio.com/',
      display: 'cashmereradio.com'
    },
    description: 'Cashmere Radio is a not-for-profit community radio station based in Lichtenberg, Berlin.',
    archives: [
      { url: 'https://www.mixcloud.com/CashmereRadio/', display: 'Mixcloud' }
    ]
  }, {
    name: 'Piñata Radio',
    streamUrl: 'https://listen.radioking.com/radio/96031/stream/134656',
    slug: 'pinata-radio',
    city: 'Montpellier',
    country: 'France',
    twitterHandle: 'pinatamag',
    liveInfoUrl: 'https://www.radioking.com/widgets/currenttrack.php?radio=96031&format=json',
    timezone: 'Europe/Paris',
    isActive: true,
    web: {
      url: 'https://pinatamag.com/',
      display: 'pinatamag.com'
    },
    description: 'Piñata is a Radio & Magazine based in Montpellier, France. No genre bondaries, stricly good music.',
    archives: [
      { url: 'https://www.mixcloud.com/pinataradio/', display: 'Mixcloud' },
      { url: 'https://soundcloud.com/pinataradio', display: 'SoundCloud' }
    ]
  }
]
