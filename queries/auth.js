import { gql } from "@apollo/client";

export const loginQuery = gql`
  mutation Login($input: UsersPermissionsLoginInput!){
    login(input: $input) {
      jwt,
      user {
        id
      }
    }
  }
`
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
  mutation UpdateUser($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data{
        id
        attributes{
          email
          phone
          firstname
          surname
          address
          city
          zip
          state
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
  }
`

export const getUserQuery = gql`
  query GetUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data{
        id
        attributes{
          email
          phone
          firstname
          surname
          address
          city
          zip
          state
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
  }
`

export const controlUser = gql`
  query ControlExistUser($email: String!) {
    usersPermissionsUsers(filters: {email: {eq: $email}}) {
      meta{
        pagination{
          total
        }
      }
    }
  }
`