import { gql } from '@apollo/client';

export const CATEGORY_PARAMETERS = gql`
  fragment CategoryParameters on Parameters {
    id
    title
    values {
      id
      title
    }
  }
`;

export const CATEGORY_PRODUCTS = gql`
  fragment CategoryProducts on Produkty {
    title
    slug
    price
    brand {
      title
    },
    images {
      url
    }
    values {
      id
    }
  }
`;

export const GLOBAL_SETTINGS = gql`
  fragment GlobalSettings on Global {
    title_footer
    phone
    email
    address
    copyright
  }
`;

// export const CATEGORY_BRANDS = gql`
//   fragment CategoryBrands on Brand {
//     title
//     id
//   }
// `;
