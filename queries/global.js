import { gql } from "@apollo/client";

const globalQuery = gql`
  query GetGlobal {
    global {
      data{
        attributes{
          endTitle
          delivery{
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
          gdpr{
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
          terms{
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
      }
      
    }
  }
`

export default globalQuery
