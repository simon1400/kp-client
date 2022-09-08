import { gql } from "@apollo/client";
import navQuery from './nav'

const categoryQuery = gql`
  query GetCategory(
    $slug: String!
  ) {
    categories(filters: { slug: { eq:$slug } }) {
      data{
        id
        attributes{
          title
          add_title
          content
          sub(sort: "position:desc"){
            data{
              attributes{
                title
                slug
                icon {
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          filterCategories: brands {
            data{
              id
              attributes{
                title
              }
            }
          }
          parameters(sort: "position:desc") {
             data{
              id
              attributes{
                title
                values {
                  data{
                    id
                    attributes{
                      title
                    }
                  }
                }
              }
            }
          }
          meta{
            title
            description
          }
          image {
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
    brands(filters: {slug:{eq:$slug}}) {
      data{
        attributes{
          title
          add_title
          content
          filterCategories: categories {
            data{
              id
              attributes{
                title
              }
            }
          }
          parameters(sort: "position:desc") {
            data{
              id
              attributes{
                title
                values {
                  data{
                    id
                    attributes{
                      title
                    }
                  }
                }
              }
            }
          }
          meta{
            title
            description
          }
          image {
            data{
              attributes{
                url
              }
            }
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
          endTitle
          copyright
        }
      }
    }
    ${navQuery}
  }
`

export default categoryQuery
