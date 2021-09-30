import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import conferences from 'utils/mocks/attendeeList.js'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'

const MyConferenceListContainer = () => {
    const [filters, setFilters] = useState(generateDefaultFilters())

    const { data, loading } = { data: conferences, loading: false }

    const { t } = useTranslation()
    const [, setHeader] = useHeader();
const history = useHistory()

    useEffect(() => {
        //did mount
        return () => {
             //will unmount 
            setHeader(null)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

const handleAddClick = useCallback(()=>{
    history.push('myConferences/new')
}, [history])

    useEffect(() => {
        setHeader(
            <MyConferenceHeader
                title={t('NavBar.MyConference')}
                actions={<AddButton key='addButton' title={t("Conferences.AddConference")} onClick={handleAddClick}/>}
            />
        )

    }, [setHeader, t])     // eslint-disable-line react-hooks/exhaustive-deps

    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    if (loading) return <LoadingFakeText lines={10} />
    return (
        <>
            <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <MyConferenceList conferences={data}  />
        </>
    )

}
export default MyConferenceListContainer