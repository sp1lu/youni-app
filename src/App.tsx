/** Dependencies */
import { Outlet } from 'react-router'

/** Services */
import { useAuth } from './features/auth'

/** Style */
import './App.scss'

/** Component */
function App() {

  const { logout } = useAuth();

  return (
    <>
      <button type="button" onClick={logout}>LOGOUT</button>
      <Outlet />
    </>
  )
}

export default App