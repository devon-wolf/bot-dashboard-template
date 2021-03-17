import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js' 
import Header from './components/Header.js'
import LoginPage from './auth/LoginPage.js'
import ListPage from './list/ListPage.js'
import NewEntryPage from './new/NewEntryPage.js'
import { getToken, storeToken } from './utils/local-storage-utils.js'

export default class App extends Component {
  state = {
    token: getToken()
  }

  handleUserChange = (user) => {
    storeToken(user);
    this.setState({token: user.token})
  }

  handleLogoutClick = e => {
    localStorage.clear();
    this.setState({token: ''});
  }

  render() {

    return (
      <Router>

        <Header
        token={this.state.token}
        handleLogoutClick={this.handleLogoutClick}
        />

        <Switch>

          <Route 
            path="/login"
            exact
            render={(routerProps) => 
            <LoginPage 
            handleUserChange = {this.handleUserChange}
            {...routerProps} />}
          />

          <PrivateRoute 
            path="/"
            exact
            token={this.state.token}
            render={(routerProps) => <ListPage {...routerProps} />}
          />

          <PrivateRoute 
            path="/new"
            exact
            token={this.state.token}
            render={(routerProps) => <NewEntryPage {...routerProps} />}
          />

        </Switch>
        
      </Router>
    )
  }
}


