import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import Signup from './pages/signup/Signup'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
