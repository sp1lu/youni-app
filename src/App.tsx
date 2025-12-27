/** Dependencies */
import { Outlet, useNavigate } from 'react-router'

/** Services */
import { useAuth } from './features/auth'

/** Style */
import './App.scss'

/** Component */
function App() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout().then(() => navigate('/landing'))
  }

  return (
    <>
      {/* <button type="button" onClick={onLogout}>LOGOUT</button> */}
      <Outlet />
    </>
  )
}

export default App