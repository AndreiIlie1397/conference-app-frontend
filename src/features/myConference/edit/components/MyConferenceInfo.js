import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'

const MyConferenceInfo = (props) => {
    const { t } = useTranslation()
    const { types, categories } = props
    return (
        <Grid container spacing={3}>
            <Grid item container lg={9} spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField label={t('Conferences.Name')} fullWidth />
                </Grid>
            </Grid>

            <Grid item container lg={12} spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <DateTime label={t('Conferences.StartDate')} showTime={true} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <DateTime label={t('Conferences.EndDate')} showTime={true} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Autocomplete isClearable label={t('Conferences.Type')} options={types} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Autocomplete isClearable label={t('Conferences.Categories')} options={categories} />
                </Grid>
            </Grid>
        </Grid>
    )
}
MyConferenceInfo.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array
}

export default MyConferenceInfo