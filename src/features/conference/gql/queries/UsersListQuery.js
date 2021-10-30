import { gql } from '@apollo/client'

export const USERS_LIST_QUERY = gql`
query users($id: ID!) {
  users(id: $id) {
    attendeeEmail
  }
}
 `