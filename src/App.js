import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import SignUp from './pages/signup/Signup'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
