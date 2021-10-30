import React, { useEffect, useReducer } from 'react';
import ConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import CancelButton from '@bit/totalsoft_oss.react-mui.cancel-button';
import { useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom";
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from 'features/myConference/gql/queries/ConferenceQuery';
import { USERS_LIST_QUERY } from '../gql/queries/UsersListQuery'
import { useRouteMatch } from 'react-router'
import { initialConference, reducer } from 'features/myConference/edit/conferenceState'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import Typography from '@bit/totalsoft_oss.react-mui.typography';
import { Grid } from '@material-ui/core';

const ConferencePage = () => {

    const [conference, dispatch] = useReducer(reducer, initialConference)
    const { name } = conference
    const match = useRouteMatch()
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const history = useHistory()
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';

    const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })

    const { data: userData } = useQueryWithErrorHandling(USERS_LIST_QUERY,
        {
            variables: {
                id: conferenceId
            },
        })

    useEffect(() => () => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(<ConferenceHeader title={name} actions={<CancelButton title={t('General.Button.Close')} onClick={history.goBack} />} />)
    }, [t, setHeader, name, history.goBack])

    if (loadingConference)
        return <LoadingFakeText lines={10} />

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={9} >
                <iframe src="https://www.youtube.com/embed/5aQhFul3FNk"
                    title="YouTube video player"
                    allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
                    width="100%"
                    height="450px"
                    aspectRatio={1} />
            </Grid>
            <Grid container item xs={3} direction="column">
                <Typography variant="h5" justifyContent="center">{t('General.Organizer')}</Typography>
                <Grid direction="column" spacing={2}>
                    <Typography>Name: {data?.conference?.name}</Typography>
                    <br></br>
                    <Typography>Organizer email: {data?.conference?.organizerEmail}</Typography>
                    <br></br>
                    <Typography>Start date: {data?.conference?.startDate}</Typography>
                    <br></br>
                    <Typography>End date: {data?.conference?.endDate}</Typography>
                    <br></br>
                    <Typography>Speakers: {data?.conference?.speakers?.map((element) =>
                        <Grid item key={element.id}>{element.name} </Grid>
                    )} </Typography>
                </Grid>
                <hr></hr>
                <Grid spacing={2}>
                    <Typography variant="h5" justifyContent="center">{t('General.Participants')}</Typography>

                    <Typography>{userData?.users?.map((element) =>
                        <Grid item key={userData.users.indexOf(element)}>{element.attendeeEmail}
                        </Grid>)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </>
    )
}

export default ConferencePage;