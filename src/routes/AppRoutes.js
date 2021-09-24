/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer'
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer'
import MyConferenceContainer from 'features/myConference/edit/components/MyConferenceContainer'

import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
//import identityUserRoles from 'constants/identityUserRoles'
//import permissions from 'constants/permissions'
import { useEmail } from 'hooks/useEmail'


//const { globalAdmin, admin, user } = identityUserRoles
//const { viewSettings } = permissions

export default function AppRoutes() {
  const [email] = useEmail()
  if (!email) {
    return (
      <Switch>
        <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
        <Redirect to='/welcome' />
      </Switch>
    )
  }

  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute isPrivate={false} exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path='/conferences' component={ConferenceListContainer} />
      
      <CustomRoute isPrivate={false} exact path='/myConferences' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myConferences/:id(new)' component={MyConferenceContainer}/>

      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )

}
