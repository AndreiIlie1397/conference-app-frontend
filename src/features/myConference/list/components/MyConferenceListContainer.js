import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'

const MyConferenceListContainer = () => {
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const { t } = useTranslation()
    const [, setHeader] = useHeader();
    const [, setFooter] = useFooter();
    const history = useHistory()
    const [email] = useEmail()

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: extractPager(pager),
            filters: { ...filters, organizerEmail: email },
            email
        },
        onCompleted: (result) => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })

    useEffect(() => {
        //did mount
        return () => {
            //will unmount 
            setHeader(null)
            setFooter(null)
        }

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddClick = useCallback(() => {
        history.push('myConferences/new')
    }, [history])

    useEffect(() => {
        setHeader(
            <MyConferenceHeader
                title={t('NavBar.MyConference')}
                actions={<AddButton key='addButton' title={t("Conferences.AddConference")} onClick={handleAddClick} />}
            />
        )

    }, [handleAddClick, setHeader, t])     // eslint-disable-line react-hooks/exhaustive-deps

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handlePageChange = useCallback((page) => {
        setPager(state => ({ ...state, page }))
    }, [])

    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 12, 24, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}
        />)
    }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])


    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    if (loading || !data)
        return <LoadingFakeText lines={10} />
    return (
        <>
            <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <MyConferenceList conferences={data?.conferenceList?.values} />
        </>
    )

}
export default MyConferenceListContainer