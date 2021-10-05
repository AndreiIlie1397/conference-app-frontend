import { gql } from '@apollo/client'
//import ConferenceFragments from '../../../myConference/gql/queries/fragments'
//import CommonFragments from 'features/common/fragments'

const WITHDRAW_CONFERENCE = gql`
mutation  withdraw ($input: Attendee!){
  withdraw(input: $input) 
}

`
export default WITHDRAW_CONFERENCE