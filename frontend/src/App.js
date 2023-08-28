import React from 'react'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Tabla from './views/Tabla'

import Navbar from './views/Navbar'
import registroactividad from './views/RegisterActividad'


function App() {

  return (
    <Router>
      <AuthProvider>
        < Navbar />
        <Switch>
          <PrivateRoute component={Tabla} path="/tabla" exact />

          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={registroactividad} path="/registeractividad" exact />

          <Route component={Tabla} path="/actividades" exact />

          <Route component={Homepage} path="/" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App