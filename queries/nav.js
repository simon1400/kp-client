const navObj = `{
  name
  link
  image{
    data{
      attributes{
        url
      }
    }
  }
  brand{
    data{
      attributes{
        title
        slug
      }
    }
  }
  category {
    data{
      attributes{
        title
        slug
      }
    }
  }
  blog {
    data{
      attributes{
        title
        slug
        category {
          data{
            attributes{
              slug
            }
          }
        }
      }
    }
  }
  sub_nav_item{
    name
    link
    image {
      data{
        attributes{
          url
        }
      }
    }
    brand{
      data{
        attributes{
          title
          slug
        }
      }
    }
    category {
      data{
        attributes{
          title
          slug
        }
      }
    }
    blog {
      data{
        attributes{
          title
          slug
          category{
            data{
              attributes{
                slug
              }
            }
          }
        }
      }
    }
  }
}`

const navQuery = `
  navigation {
    data{
      attributes{
        ${['left_nav', 'right_nav', 'footer_nav', 'soc_nav'].map(item => `${item} ${navObj}`)}
      }
    }
  }
`

export default navQuery
