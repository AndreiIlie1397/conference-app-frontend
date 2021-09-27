import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import MyConference from 'features/myConference/edit/components/MyConference'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { initialConference, reducer } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { types, categories, countries, counties, cities } from 'utils/mocks/conferenceDictionares';
import {conference as mockConference} from 'utils/mocks/myConference'

const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()

    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    useEffect(()=>{
        if(!isNew){
            dispatch({type:'resetConference', payload: mockConference})
        }

   
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Button.Save')} />} />) }, [conference.name, setHeader, t])

    const { data, loading } = {
        loading: false, data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }


    if (loading) return <LoadingFakeText lines={10} />


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