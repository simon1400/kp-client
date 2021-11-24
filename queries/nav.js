const navObj = `{
  name
  link
  image{
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
    category {
      slug
    }
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
      category{
        slug
      }
    }
  }
}`

const navQuery = `
  navigation {
    ${['left_nav', 'right_nav', 'footer_nav', 'soc_nav'].map(item => `${item} ${navObj}`)}
  }
`

export default navQuery
