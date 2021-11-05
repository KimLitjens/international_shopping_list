import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import Homepage from './pages/homepage'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
      </Routes>
    </Router>
  )
}

export default App;
