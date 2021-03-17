import React, { Component } from 'react'
import { loginOrSignup } from '../utils/auth-utils.js'

export default class AuthForm extends Component {
	state = {
		username: '',
		password: ''
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		
		const { username, password } = this.state;
		const user = await loginOrSignup(username, password);
		
		this.props.handleFormSubmit(user);
	}

	render() {
		const { username, password } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<span>Username</span>
					<input 
						value={username}
						onInput={e => this.setState({username: e.target.value})}
					/>
				</label>

				<label>
					<span>Password</span>
					<input 
						type="password"
						value={password}
						onInput={e => this.setState({password: e.target.value})}
					/>
				</label>

				<button>Submit</button>
			</form>
		)
	}
}