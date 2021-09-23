import React, { useCallback, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import conferences from 'utils/mocks/attendeeList.js'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceListContainer = () => {
    const [filters, setFilters] = useState(generateDefaultFilters())
    
    const { data, loading } = { data: conferences, loading: false }
    
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    if (loading) return <LoadingFakeText lines={10} />
    return (
        <>
          <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <ConferenceList conferences={conferences} />
        </>
    )

}
export default ConferenceListContainer