import { gql } from "@apollo/client";

const saleQuery = gql`
  query Sale($code: String!) {
    saleCodes(filters: {code:{eq:$code}}) {
      data{
        attributes{
          value
          type
          minValue
        }
      }
  	}
  }
`

export default saleQuery
