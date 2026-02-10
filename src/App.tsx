/** Dependencies */
import { Outlet } from 'react-router'

/** Style */
import './App.scss'
import { useAuth } from './features/auth'

/** Component */
function App() {
  const { logout } = useAuth();

  return (
    <>
      <Outlet />
      <button type='button' onClick={logout}>LOGOUT</button>
    </>
  )
}

export default App