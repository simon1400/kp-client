import { gql } from "@apollo/client";

const canvasQuery = gql`
  query GetGlobal {
    global {
      basketInfo {
        title
        value
      }
    }
  }
`

export default canvasQuery
