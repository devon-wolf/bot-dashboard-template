import React, { Component } from 'react'
import SingleEntryForm from './SingleEntryForm.js'

export default class NewEntryPage extends Component {
	state = {
		responses: []
	}

	returnToList = () => this.props.history.push('/');

	addResponses = responses => {
		this.setState({ responses });
	}

	render() {
		console.log(this.state.responses);
		return (
			<main>
				<SingleEntryForm
				token={this.props.token}
				returnToList={this.returnToList}
				addResponses={this.addResponses}
				/>

				{this.state.responses.length > 0 &&
				<div>
					<p>Triggers to be added:</p>
					<ul>
						{this.state.responses.map(response =>
							<li key={response.regex}>{response.regex}</li>)}
					</ul>
				</div>}
			</main>
		)
	}
}
