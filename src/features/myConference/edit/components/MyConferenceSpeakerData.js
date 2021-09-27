import React, { useCallback } from 'react'
import { Td, Tr } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition'
import { onCheckBoxChange, onTextBoxChange } from 'utils/propertyChangeAdapters'

const MyConferenceSpeakerData = (props) => {
    const { speaker, dispatch } = props
    const { id, name, nationality, rating, isMainSpeaker } = speaker
    const { t } = useTranslation();
    const classes = useStyles();

    const handleDelete = useCallback(() => dispatch({ type: 'deleteSpeaker', payload: speaker.id }), [dispatch, speaker.id])
    //const handleDispatch = type => value => dispatch({ type, payload: { id, [type]: value } })
    //const handleNameChange = useCallback(event=>dispatch({type: 'speakerName', payload: { id, name: event.target.value } }),  [dispatch, id])

    const handleGeneralDispatch = (type, prop) => value => dispatch({ type, payload: { id, [prop]: value } })

    return (
        <Tr>
            <Td className={classes.tableContent}>
                <CustomTextField fullWidth value={name} onChange={onTextBoxChange(handleGeneralDispatch('speakerName', 'name'))} />
            </Td>
            <Td className={classes.tableContent}>
                <CustomTextField fullWidth value={nationality} onChange={onTextBoxChange(handleGeneralDispatch('nationality', 'nationality'))} />
            </Td>
            <Td className={classes.tableContent} >
                <CustomTextField fullWidth isNumeric  value={rating} onChange={handleGeneralDispatch('rating', 'rating')}/>
            </Td>
            <Td className={classes.tableContent} >
                <Checkbox color='secondary' checked={isMainSpeaker} onChange={onCheckBoxChange(handleGeneralDispatch('isMainSpeaker', 'isMainSpeaker'))}/>
            </Td>
            <Td className={classes.tableContent}>
                <DeleteButton title={t('General.Button.DeleteSpeaker')} size='small' onClick={handleDelete} />
            </Td>
        </Tr>
    )
}


MyConferenceSpeakerData.propTypes = {
    speaker: PropTypes.object,
    dispatch: PropTypes.func,
}
export default MyConferenceSpeakerData