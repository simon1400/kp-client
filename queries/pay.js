import { gql } from "@apollo/client";

const payQuery = gql`
  query Pays {
    pays {
      data{
        attributes{
          title
          price
          type
          sale_from
          state
          guid
          code
          deliveries {
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

export default payQuery
