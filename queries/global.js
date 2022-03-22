import { gql } from "@apollo/client";

const globalQuery = gql`
  query GetGlobal {
    global {
      endTitle
      delivery{
        slug
        category{
          slug
        }
      }
      gdpr{
        slug
        category{
          slug
        }
      }
      terms{
        slug
        category{
          slug
        }
      }
    }
  }
`

export default globalQuery
