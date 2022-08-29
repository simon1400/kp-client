import { gql } from "@apollo/client";
import bannerQuery from './banner'
import navQuery from './nav'

const homepageQuery = gql`
  query GetHomepage {
    homepage {
      data{
        attributes{
          title,
          subtitle
          image {
            data{
              attributes{
                url
              }
            }
          },
          Button {
            text,
            link
          },
          products {
            brand,
            text,
            button {
              text
              link
            }
            products {
              data{
                attributes{
                  title,
                  slug,
                  price,
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
          }
          articles {
            title
            text
            articles {
              data{
                attributes{
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
          }
          logo_company {
            image {
              data{
                attributes{
                  url
                }
              }
            }
            brands {
              data{
                attributes{
                  slug  
                }
              }
            }
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
          banner {
            title
            image {
              data{
                attributes{
                  url
                }
              }
            }
            button {
              text
              link
            }
          }
        }
      } 
    }
    ${navQuery}
  }
`

export default homepageQuery
