import { gql } from '@apollo/client'
import ConferenceFragments from '../queries/fragments'
import CommonFragments from '../../../common/fragments'

export const UPDATE_CONFERENCE = gql`
mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input){
        ...conference
        type {
            ...type
        }
        category {
            ...category
        }
        location {
            ...location
            city {
                ...city
            }
            county {
                ...county
            }
            country {
                ...country
            }
        }
        speakers {
            ...speaker
        }
    }
}
    ${ConferenceFragments.conference}
    ${ConferenceFragments.location}
    ${ConferenceFragments.speaker}

    ${CommonFragments.country}
    ${CommonFragments.county}
    ${CommonFragments.city}
    ${CommonFragments.type}
    ${CommonFragments.category}
`

export default UPDATE_CONFERENCE