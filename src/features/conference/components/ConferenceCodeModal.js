import React from 'react'
import qrCode from "assets/img/qrCode.png";
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from '@bit/totalsoft_oss.react-mui.typography';
import { isEmpty } from 'ramda';
import ConferenceItem from './ConferenceItem'

const ConferenceCodeModal = ({ code, suggestedConferences, onAttend }) => {
    const { t } = useTranslation()
    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item >
                    <img src={qrCode} alt='QR' style={{ maxHeight: '400px' }} />
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>{t('Conferences.QRCodeMessage', { code })}</Typography>
                </Grid>
            </Grid>
            {!isEmpty(suggestedConferences) && (
                <Grid container>
                    <Grid item lg={12}>
                        <Typography>{t('General.SuggestedConference')}</Typography>
                    </Grid>
                    {suggestedConferences.map(conference => (
                        <Grid item key={conference?.id}>
                            <ConferenceItem conference={conference} onAttend={onAttend} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}
ConferenceCodeModal.propTypes = {
    code: PropTypes.string,
    suggestedConferences: PropTypes.array,
    onAttend: PropTypes.func
}

export default ConferenceCodeModal