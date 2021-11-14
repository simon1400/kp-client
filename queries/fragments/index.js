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
    Variants {
      price
    }
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

export const USER_INFO = gql`
  fragment UserInfo on User {
    email
    phone
    name
    surname
    address
    city
    zip
    state
  }
`;

// export const CATEGORY_BRANDS = gql`
//   fragment CategoryBrands on Brand {
//     title
//     id
//   }
// `;
