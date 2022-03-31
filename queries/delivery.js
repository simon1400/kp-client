import { gql } from "@apollo/client";

const deliveryQuery = gql`
  query {
  	dopravies {
      title
      price
      sale_from
      type
      pays {
        title
      }
    }
  }
`

export default deliveryQuery
