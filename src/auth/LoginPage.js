import React, { Component } from 'react'
import AuthForm from './AuthForm.js'

export default class LoginPage extends Component {

	handleFormSubmit = (user) => {
		this.props.handleUserChange(user);
		this.props.history.push('/');
	}

	render() {
		return (
			<main>
				<h2>Admin Login</h2>
				
				<AuthForm 
				handleFormSubmit={this.handleFormSubmit}/>
			</main>
		)
	}
}
