import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import PrivateRoute from './containers/private-route'
import Homepage from './pages/homepage'
import LogIn from './pages/log-in'
import SignUp from './pages/sign-up'
import { ProvideAuth } from './utils/hooks/useAuth'

function App() {
  return (
    <Router>
      <ProvideAuth>
        <Routes>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.LOG_IN} element={<LogIn />} />
          <Route path={ROUTES.HOMEPAGE} element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
          />
        </Routes>
      </ ProvideAuth>
    </Router>
  )
}

export default App;
