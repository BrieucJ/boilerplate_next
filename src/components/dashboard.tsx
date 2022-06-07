import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME_QUERY } from '../gql/queries'
import { useAppContext } from 'src/utils/context'
import { meQuery } from '../utils/types'

const Dashboard = () => {
  const { setUser, user } = useAppContext()
  const { loading, error, data } = useQuery<meQuery>(ME_QUERY)

  useEffect(() => {
    setUser(data?.me)
  }, [loading, error, data, setUser])

  return (
    <>
      <div>Dashboard</div>
      <div>{user?.username}</div>
    </>
  )
}

export default Dashboard
