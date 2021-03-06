import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'


const MyConferenceInfo = (props) => {
    const { t } = useTranslation()
    const { types, categories, conference, dispatch } = props
    const { name, startDate, endDate, type, category } = conference
    const handleChange = type => value => dispatch({type:type, payload: value})
    
    return (
        <Grid container spacing={3}>
            <Grid item container lg={9} spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField label={t('Conferences.Name')} fullWidth value={name} onChange={onTextBoxChange(handleChange('name'))}/>
                </Grid>
            </Grid>

            <Grid item container lg={12} spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <DateTime label={t('Conferences.StartDate')} showTime={true} value={startDate} onChange={handleChange('startDate')} views={['date', 'hours', 'minutes']}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <DateTime label={t('Conferences.EndDate')} showTime={true} value={endDate} onChange={handleChange('endDate')} views={['date', 'hours', 'minutes']}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Autocomplete isClearable label={t('Conferences.Type')} options={types} value={type} onChange={handleChange('type')}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Autocomplete isClearable label={t('Conferences.Category')} options={categories} value={category} onChange={handleChange('category')}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
MyConferenceInfo.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default MyConferenceInfo