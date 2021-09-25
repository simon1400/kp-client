import { gql } from "@apollo/client";

export const registerQuery = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
      }
    }
  }
`

export const updateUserQuery = gql`
  mutation UpdateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user{
        id
        email
        phone
        name
        surname
        address
        city
        zip
        state
        anotherAddress {
          email
          phone
          name
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

export const getUserQuery = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      phone
      name
      surname
      address
      city
      zip
      state
      anotherAddress {
        email
        phone
        name
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
