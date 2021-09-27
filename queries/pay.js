import { gql } from "@apollo/client";

const payQuery = gql`
  query {
    platbies {
      title
      price
      sale_from
    }
  }
`

export default payQuery
