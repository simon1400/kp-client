import { gql } from "@apollo/client";

const deliveryQuery = gql`
  query {
  	dopravies {
      title
      price
      sale_from
      state
      type
      guid
      code
      pays {
        title
      }
    }
  }
`

export default deliveryQuery
