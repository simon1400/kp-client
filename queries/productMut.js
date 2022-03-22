import { gql } from "@apollo/client";

const createProduct = gql`
  mutation createProduct($input:createProduktyInput) {
    createProdukty(input: $input) {
      produkty {
				title
      }
    }
  }
`

export default createProduct
