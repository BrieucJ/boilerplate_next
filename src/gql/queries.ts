import { gql } from '@apollo/client'

export const LOGIN_QUERY = gql`
  query LOGIN_QUERY($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`

export const RESEND_VERIFICATION_EMAIL = gql`
  query RESEND_VERIFICATION_EMAIL($input: TokenInput!) {
    resendConfirmationEmail(input: $input)
  }
`

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      username
      email
    }
  }
`
