import { gql } from "@apollo/client";

const payQuery = gql`
  query {
    platbies {
      title
      price
      type
      sale_from
    }
  }
`

export default payQuery
