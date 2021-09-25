import { gql } from "@apollo/client";

const bannerQuery = `banner {
  title
  image {
    url
  }
  button {
    text
    link
  }
}`

export default bannerQuery
