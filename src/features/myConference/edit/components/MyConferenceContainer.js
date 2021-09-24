import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import MyConference from 'features/myConference/edit/components/MyConference'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { types, categories, countries, counties, cities } from 'utils/mocks/conferenceDictionares';

const MyConferenceContainer = ()=>{
    const { t }=useTranslation()
    const [, setHeader] = useHeader()
   
    useEffect(() => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(()=> {setHeader(<MyConferenceHeader actions={<SaveButton title={t('General.Button.Save')}/>}/>)}, [setHeader, t])

const {data, loading} = {loading: false, data:{
    typeList: types,
    categoryList: categories,
    countryList: countries,
    countyList: counties,
    cityList: cities
}}


if(loading) return <LoadingFakeText lines={10}/>


return <MyConference
types={data?.typeList}
categories={data?.categoryList}
countries={data?.countryList}
counties={data?.countyList}
cities={data?.cityList}
/>
}
 export default MyConferenceContainer