import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`

export const CONFIRM_MUTATION = gql`
  mutation CONFIRM_MUTATION($input: TokenInput!) {
    confirm(input: $input) {
      accessToken
      refreshToken
    }
  }
`
