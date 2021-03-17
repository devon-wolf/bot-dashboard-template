import React, { Component } from 'react'
import style from './ListPage.module.css'
import { editResponse } from '../utils/server-utils.js'

export default class ResponseRow extends Component {
	state = {
		editing: false,
		triggerInput: '',
		imageInput: '',
	}

	handleEditClick = e => {
		this.setState({
			editing: !this.state.editing,
			triggerInput: '',
			imageInput: ''
		});
	}

	// this does not at all handle the possibility of multiple images
	handleSubmitClick = async () => {
		const { id, trigger, images, token } = this.props;
		const { triggerInput, imageInput } = this.state;
		
		const editedObject = {};
		editedObject.images = [];
		triggerInput 
			? editedObject.regex = triggerInput 
			: editedObject.regex = trigger;
		imageInput 
			? editedObject.images.push(imageInput) 
			: editedObject.images = images;

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

				<td className={style.triggerCell}>
					{this.state.editing
						? <input 
							placeholder={this.props.trigger}
							onInput={e => this.setState({ triggerInput: e.target.value })}/>

						: <span>{this.props.trigger}</span>
					}
				</td>

				<td className={style.imageCell}>
					{this.props.images.map(image =>
						<div key={image}>
							<img 
							src={image} 
							alt="response" 
							/>
							{this.state.editing && 
							<input
							placeholder={image} 
							onInput={e => this.setState({ imageInput: e.target.value })}/>}
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