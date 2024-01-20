import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user)
  //if user is currently logged in then render the Outlet component which will render the Dashboard component
  //otherwise prompt user to sign in 
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}
