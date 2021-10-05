import { gql } from '@apollo/client'
import ConferenceFragments from '../../../myConference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

const ATTEND_CONFERENCE = gql`
mutation attend($input: Attendee!){
  attend(input: $input){
    code
    suggestedConferences {
      ...conference
      location {
        ...location
        country {
          ...country
        }
        county {
          ...county
        }
        city {
          ...city
        }
      }
      type {
        ...type
      }
      category {
        ...category
      }
      speakers {
        ...speaker
      }
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
export default ATTEND_CONFERENCE