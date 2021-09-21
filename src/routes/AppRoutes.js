/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Dashboard from 'features/dashboard/Dashboard'
import Settings from 'features/settings/Settings'
import HelloWorld from 'features/helloWorld/HelloWorld'

import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import identityUserRoles from 'constants/identityUserRoles'
import permissions from 'constants/permissions'


const { globalAdmin, admin, user } = identityUserRoles
const { viewSettings } = permissions

export default function AppRoutes() {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/dashboard' component={Dashboard} />
      <CustomRoute isPrivate={false} exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path='/helloWorld' component={HelloWorld} />
      <Redirect exact from='/' to='/dashboard' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
}
