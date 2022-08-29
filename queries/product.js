import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const productQuery = gql`
  query GetProduct($slug: String!) {
    produkties(filters: {slug:{eq:$slug}}) {
      data{
        id
        attributes{
          title
          price
          code
          slug
          content
          guid
          code
          stock
          support
          available
          images {
            data{
              attributes{
                url
              }
            }
          }
          relateds {
            data{
              attributes{
                title,
                slug,
                price,
                Variants {
                  price
                }
                brand {
                  data{
                    attributes{
                      title
                    }
                  }
                },
                images {
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          brand {
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
          Variants {
            nazev
            price
            id
          }
          meta{
            title
            description
          }
        }
      }
    }
    global {
      data{
        attributes{
          title_footer
          phone
          email
          address
          copyright
          endTitle
          support {
            title
            text
            articles {
              data{
                attributes{
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
          ${bannerQuery}
        }
      }
    }
    ${navQuery}
  }
`

export default productQuery
