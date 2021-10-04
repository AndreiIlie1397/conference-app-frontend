import React from 'react'
import qrCode from "assets/img/qrCode.png";
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import Typography from '@bit/totalsoft_oss.react-mui.typography';

const ConferenceCodeModal = ({ code }) => {
    const { t } = useTranslation()
    return <Grid container justifyContent = {'center'}>
        <Grid item >
            <img src={qrCode} alt='QR' style={{maxHeight:'400px'}} />
        </Grid>
        <Grid item>
            <Typography variant='subtitle1'>{t('Conferences.QRCodeMessage', { code })}</Typography>
        </Grid>

    </Grid>
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string
}

export default ConferenceCodeModal