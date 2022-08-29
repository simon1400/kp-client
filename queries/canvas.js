import { gql } from "@apollo/client";

const canvasQuery = gql`
  query GetGlobal {
    global {
      data{
        attributes{
          basketInfo {
            title
            value
          }
        }
      }
    }
  }
`

export default canvasQuery
