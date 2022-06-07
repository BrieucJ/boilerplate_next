import { GraphQLError } from 'graphql'
import { ErrorType } from './types'

export const handleErrors = (errors: any): ErrorType[] => {
  if (errors === undefined || errors === null) return []
  if (errors.graphQLErrors) {
    return errors.graphQLErrors.map((err: GraphQLError) => {
      return {
        message: err.message,
        code: err.extensions.code,
      }
    })
  }
  return []
}
