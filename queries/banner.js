import { gql } from "@apollo/client";

const bannerQuery = `banner {
  title
  image {
    hash
  }
  button {
    text
    link
  }
}`

export default bannerQuery
