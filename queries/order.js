import { gql } from "@apollo/client";

export const UpdateOrder = gql`
  mutation UpdateOrder($input: updateOrderInput) {
    updateOrder(input: $input) {
      order {
        status
        sendMail
      }
    }
  }
`

export const CreateOrder = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order{
        id
        email
        phone
        name
        surname
        address
        city
        zip
        state
        description
        sum
        payOnline
        sendMail
        status
        delivery {
          name
          value
          type
          guid
          code
        }
        payment {
          name
          value
          type
          guid
          code
        }
        basketItem {
          variant
          brand
          price
          slug
          count
          imageUrl
          idProduct
          title
          guid
          code
        }
        anotherAddress {
          email
          phone
          firstname
          surname
          address
          city
          zip
          state
        }
        firmInfo {
          nameCompany
          ico
          dic
        }
      }
    }
  }
`

export const GetOrder = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      email
      phone
      name
      surname
      address
      city
      zip
      state
      description
      sum
      payOnline
      sendMail
      status
      delivery {
        name
        value
        type
        guid
        code
      }
      payment {
        name
        value
        type
        guid
        code
      }
      basketItem {
        variant
        brand
        price
        slug
        count
        idProduct
        title
        guid
        code
      }
      anotherAddress {
        email
        phone
        firstname
        surname
        address
        city
        zip
        state
      }
      firmInfo {
        nameCompany
        ico
        dic
      }
    }
  }
`
