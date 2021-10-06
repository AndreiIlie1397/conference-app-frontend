import React, { useEffect, useReducer } from 'react';
import Conference from './Conference'
import ConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import CancelButton from '@bit/totalsoft_oss.react-mui.cancel-button';
import { useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom";
import {  useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from 'features/myConference/gql/queries/ConferenceQuery';
import { useRouteMatch } from 'react-router'
import { initialConference, reducer } from 'features/myConference/edit/conferenceState'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'

const ConferencePage = () => {

    const [conference, dispatch] = useReducer(reducer, initialConference)
    const {name} = conference
    const match = useRouteMatch()
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const history = useHistory()

    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })

    

    useEffect(() => () => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(<ConferenceHeader title={name} actions={<CancelButton title={t('General.Button.Close')} onClick={history.goBack} />} />)
    }, [ history.goBack, t, setHeader, name])

    if (loadingConference)
    return <LoadingFakeText lines={10} />


    return(
        <Conference />
       )
    
}

export default ConferencePage