import { gql } from "@apollo/client";

const deliveryQuery = gql`
  query {
  	deliveries {
      data{
        attributes{
          title
          price
          sale_from
          state
          type
          guid
          code
          pays {
            data{
              attributes{
                title
              }
            }
          }
        }
      }
      
    }
  }
`

export default deliveryQuery
