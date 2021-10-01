import { gql } from '@apollo/client'
import ConferenceFragments from './fragments'
import CommonFragments from 'features/common/fragments'

export const MY_CONFERENCE_QUERY = gql`
query conferenceById($id: ID!, $isNew: Boolean!) {
    conference(id: $id) @skip(if:$isNew){
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
  typeList {
    ...type
  }
  categoryList {
   ...category
  }
  countryList {
  ...country
  }
  countyList {
    ...county
  }
  cityList {
    ...city
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