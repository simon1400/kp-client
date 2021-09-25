import { gql } from "@apollo/client";

const filteredLabelQuery = gql`
  query GetFilteredLabel(
    $categoryId: [ID],
    $param: [ID],
    $brandId: [ID]
  ) {
    values(where: { id: $param }) {
      id,
      title
    }
    categoryLabel: categories(where: {id: $categoryId}) {
      id,
      title
    }
    brandLabel: brands(where: {id: $brandId}) {
      id,
      title
    }
  }
`

export default filteredLabelQuery
