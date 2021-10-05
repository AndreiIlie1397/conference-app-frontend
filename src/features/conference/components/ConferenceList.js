import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'
const ConferenceList = props => {
   
    const {conferences,onAttend, onWithdraw}= props
    return (
        <Grid container spacing={2}>
        {conferences?.map(conference => {
        return (
            <Grid item xs={12} lg={4} key={conference.id}>
                <ConferenceItem onAttend={onAttend}
                onWithdraw={onWithdraw}
                    conference={conference}
                />
            </Grid>
            
        )})}
    </Grid>
    )
}
ConferenceList.propTypes = {
    conferences: PropTypes.array,
    onAttend: PropTypes.func,
    onWithdraw: PropTypes.func
}
export default ConferenceList;