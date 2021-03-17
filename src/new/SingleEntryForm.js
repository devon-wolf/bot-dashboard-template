import React, { Component } from 'react'
import { addNewResponse } from '../utils/server-utils.js'

export default class NewEntryForm extends Component {
	state = {
		responses: [],
		promptInput: '',
		options: [],
		optionInput: '',
	}

	handleSubmit = async e => {
		e.preventDefault();
		const { promptInput, responses } = this.state;
		if (promptInput) await this.addResponseObject();

		await responses.forEach(async response => await addNewResponse(response, this.props.token));

		this.props.returnToList();
	}

	addResponseObject = () => {
		const { promptInput, options, optionInput, responses } = this.state;
		if (optionInput) this.handleOptionAdd();

		const currentResponses = responses;
		currentResponses.push({ prompt: promptInput, options });

		this.props.addResponses(currentResponses);

		this.setState({
			responses: currentResponses,
			promptInput: '',
			options: []
		});
	}

	handleOptionAdd = () => {
		const { options, optionInput } = this.state
		const currentOptions = options;
		currentOptions.push(optionInput);
		this.setState({ 
			options: currentOptions,
			optionInput: ''
		 });
	}

	render() {
		const { promptInput, optionInput } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
					<label>
						<span>Prompt word</span>
						<input
						value={promptInput}
						onInput={e => this.setState({ promptInput: e.target.value})}
						/>
					</label>

					<label>
						<span>Response option(s)</span>
						<input
						value={optionInput}
						onInput={e => this.setState({ optionInput: e.target.value })}/>
						
						{/* Removed ability to add multiple options until it is better handled in the edit functionality */}
						{/* <button
						type="button"
						onClick={this.handleOptionAdd}>
							Add this option
						</button>

						<div>
							{options.map(option =>
								<img alt="added item" src={option} key={option} />)
							}
						</div> */}
						
					</label>
					
					<button
					type="button"
					onClick={this.addResponseObject}>
						Add another
					</button>

					<button>Submit</button>
			</form>
		)
	}
}