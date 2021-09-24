import React from 'react'
import Welcome from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import EventIcon from '@material-ui/icons/Event'


const menuItems = [
  { icon: <Welcome />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome',  roles: [], rights: [] },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu', roles: [], rights: [] },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings', roles: [], rights: [] },
  { icon: <EventIcon />, text: 'NavBar.Conference', path: '/conferences', name: 'Conference', roles: [], rights: [] },
  { icon: <EventIcon />, text: 'NavBar.MyConference', path: '/myConferences', name: 'MyConference', roles: [], rights: [] }
]

export default menuItems
