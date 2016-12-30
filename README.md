Fresh Transmission
------------

##### Installation

```shell
npm install
npm start # Start the dev server
npm run build # Build for production
```

##### Backstory

I've started to notice more internet radio stations that I enjoy. I don't feel the need to create a TuneIn or iHeartRadio account to hear all of the radio stations in the world, but I would like a place to collect and listen to a curated list of my favorite stations. On top of that, many stations are using Twitter to communicate with listeners regarding which DJs or shows are playing during the day so it's important to have that context easily available when listening.

With all of these different stations and services, there's a lot of jumping around to listen to each station, see what's playing, and transition between stations when the vibe changes. Fresh Transmission is a response to that. It's a small project that scratched a personal itch and an opportunity to practice React & Redux in an open source environment.

##### Current state

* List of stations w/ their corresponding broadcast locations
* Individual station page routing with associated Twitter Feeds
* Music player w/ various loading states
* LocalStorage for the music player state

![Fresh Transmission](http://i.imgur.com/6hHlWGe.png)

The design could use some thought, but I wanted to get a prototype out before focusing too much on that.

##### Non goals (for now)
I mostly listen while working on a desktop environment so certain things were not important to me when building:

* Responsive styles
* Volume control
