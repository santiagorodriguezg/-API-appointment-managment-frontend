import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import Signup from './pages/signup/Signup'
import PasswordReset from './pages/password_reset/PasswordReset'
import PasswordResetDone from './pages/password_reset_done/PasswordResetDone'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/password-reset'>
          <PasswordReset />
        </Route>
        <Route path='/password-reset/done' component={PasswordResetDone} />
      </Switch>
    </Router>
  )
}

export default App
