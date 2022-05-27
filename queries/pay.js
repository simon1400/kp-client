import { gql } from "@apollo/client";

const payQuery = gql`
  query {
    platbies {
      title
      price
      type
      sale_from
      state
      guid
      code
      deliveries {
        title
      }
    }
  }
`

export default payQuery
