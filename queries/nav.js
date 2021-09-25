import { gql } from "@apollo/client";

const navObj = `{
  name
  link
  brand{
    title
    slug
  }
  category {
    title
    slug
  }
  blog {
    title
    slug
  }
  sub_nav_item{
    name
    link
    image {
      url
    }
    brand{
      title
      slug
    }
    category {
      title
      slug
    }
    blog {
      title
      slug
    }
  }
}`

const navQuery = `
  navigation {
    ${['left_nav', 'right_nav', 'footer_nav'].map(item => `${item} ${navObj}`)}
  }
`

export default navQuery
