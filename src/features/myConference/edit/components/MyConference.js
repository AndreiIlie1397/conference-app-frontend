import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import { Face, Info, LocationOn } from '@material-ui/icons'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'

import MyConferenceInfo from 'features/myConference/edit/components/MyConferenceInfo'
import MyConferenceLocation from 'features/myConference/edit/components/MyConferenceLocation'
import MyConferenceSpeakers from 'features/myConference/edit/components/MyConferenceSpeakers'

const MyConference = (props) => {
    const { types, categories, countries, counties, cities, conference, dispatch } = props
    const { location, speakers } = conference
    const { t } = useTranslation()
    const handleAddSpeaker = useCallback(() => dispatch({ type: 'addSpeaker' }), [dispatch])

    return (<>

        <IconCard icon={Info} title={t('Conferences.Info')} content={<MyConferenceInfo types={types} categories={categories} conference={conference} dispatch={dispatch} />} />
        <IconCard icon={LocationOn} title={t('Conferences.Location')} content={<MyConferenceLocation dispatch={dispatch} location={location} countries={countries} counties={counties} cities={cities} />} />
        <IconCard icon={Face} title={<CardTitle title={t('Conferences.Speaker')} actions={[
            <AddButton key='addButton' title={t("General.Button.AddSpeaker")} onClick={handleAddSpeaker} />]} />} content={<MyConferenceSpeakers dispatch={dispatch} speakers={speakers} />} />
    </>)
}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default MyConference