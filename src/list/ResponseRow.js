import React, { Component } from 'react'
import style from './ListPage.module.css'
import { editResponse } from '../utils/server-utils.js'

export default class ResponseRow extends Component {
	state = {
		editing: false,
		promptInput: '',
		optionInput: '',
	}

	handleEditClick = e => {
		this.setState({
			editing: !this.state.editing,
			promptInput: '',
			optionInput: ''
		});
	}

	// this does not at all handle the possibility of multiple options
	handleSubmitClick = async () => {
		const { id, prompt, options, token } = this.props;
		const { promptInput, optionInput } = this.state;
		
		const editedObject = {};
		editedObject.options = [];
		promptInput 
			? editedObject.prompt = promptInput 
			: editedObject.prompt = prompt;
		optionInput 
			? editedObject.options.push(optionInput) 
			: editedObject.options = options;

		await editResponse(id, editedObject, token);

		this.setState({ 
			editing: false,
		});

		this.props.updateFunction();
	}

	render() {
		return (
			<tr>
				<td className={style.idCell}>
					{this.props.id}
				</td>

				<td className={style.promptCell}>
					{this.state.editing
						? <input 
							placeholder={this.props.prompt}
							onInput={e => this.setState({ promptInput: e.target.value })}/>

						: <span>{this.props.prompt}</span>
					}
				</td>

				<td className={style.optionCell}>
					{this.props.options.map(option =>
						<div key={option}>
							<img 
							src={option} 
							alt="response" 
							/>
							{this.state.editing && 
							<input
							placeholder={option} 
							onInput={e => this.setState({ optionInput: e.target.value })}/>}
						</div>)}
				</td>

				<td>
					{this.state.editing
						?	<>
								<button
								onClick={this.handleSubmitClick}
								>
								Submit Changes
								</button>
								<button
								onClick={this.handleEditClick}>
									Cancel Edits
								</button>
							</>
							
						: 	<button
							value={this.props.id}
							onClick={this.handleEditClick}>
							Edit
							</button>
					}
					
					<button
					onClick={this.props.handleDeleteClick}>
						Remove
					</button>
				</td>
			</tr>
		)
	}
}