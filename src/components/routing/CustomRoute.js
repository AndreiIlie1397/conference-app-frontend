import React, { useMemo } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useReactOidc, withOidcSecure } from '@axa-fr/react-oidc-context'
import { emptyArray } from 'utils/constants'
import { isEmpty } from 'ramda'
import { useUserData } from 'hooks/rights'
import { LoadingFakeText, Forbidden } from '@bit/totalsoft_oss.react-mui.kit.core'
import { intersect } from 'utils/functions'

function PrivateRoute({ component: Component, roles, rights, exact, path }) {
  const SecuredComponent = useMemo(() => withOidcSecure(Component), [Component])

  const { oidcUser } = useReactOidc()
  const userRoles = oidcUser?.profile?.role || emptyArray
  const { userData, loading } = useUserData()
  const userRights = userData?.rights || emptyArray

  let allow = false
  if (isEmpty(rights) && isEmpty(roles) && oidcUser) {
    allow = true
  } else {
    allow = isEmpty(rights)
      ? intersect(userRoles, roles) || !oidcUser
      : (intersect(userRights, rights) && intersect(userRoles, roles)) || !oidcUser
  }

  return useMemo(() => {
    if (loading) {
      return <LoadingFakeText lines={10} />
    }

    return <Route exact={exact} path={path} component={allow ? SecuredComponent : Forbidden} />
  }, [loading, exact, path, allow, SecuredComponent])
}

PrivateRoute.defaultProps = {
  roles: emptyArray,
  rights: emptyArray
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  roles: PropTypes.array,
  rights: PropTypes.array,
  exact: PropTypes.bool,
  path: PropTypes.string
}

import { makeStyles } from '@material-ui/core'
import mainStyle from 'assets/jss/components/mainStyle'

const useStyles = makeStyles(mainStyle)

function CustomRoute({ isPrivate, fullWidth, ...props }) {
  const classes = useStyles({ fullWidth })
  return <div className={classes.container}>{isPrivate ? <PrivateRoute {...props} /> : <Route {...props} />}</div>
}

CustomRoute.defaultProps = {
  roles: emptyArray,
  rights: emptyArray,
  isPrivate: true,
  fullWidth: false
}

CustomRoute.propTypes = {
  component: PropTypes.func,

  roles: PropTypes.array,
  rights: PropTypes.array,
  exact: PropTypes.bool,
  isPrivate: PropTypes.bool,
  fullWidth: PropTypes.bool,
  path: PropTypes.string
}

export default CustomRoute
