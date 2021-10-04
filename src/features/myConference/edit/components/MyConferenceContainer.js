import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import MyConference from 'features/myConference/edit/components/MyConference'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { initialConference, reducer } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { MY_CONFERENCE_QUERY } from 'features/myConference/gql/queries/MyConferenceQuery'

const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()

    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const {data, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })

    useEffect(() => ()=>setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Button.Save')} />} />) }, [conference.name, setHeader, t])

    if (loadingConference) return <LoadingFakeText lines={10} />

    return <MyConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />
}
export default MyConferenceContainer