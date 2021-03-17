import React, { Component } from 'react'
import { addNewResponse } from '../utils/server-utils.js'

export default class NewEntryForm extends Component {
	state = {
		responses: [],
		regexInput: '',
		images: [],
		imageInput: '',
	}

	handleSubmit = async e => {
		e.preventDefault();
		const { regexInput, responses } = this.state;
		if (regexInput) await this.addResponseObject();

		await responses.forEach(async response => await addNewResponse(response, this.props.token));

		this.props.returnToList();
	}

	addResponseObject = () => {
		const { regexInput, images, imageInput, responses } = this.state;
		if (imageInput) this.handleImageAdd();

		const currentResponses = responses;
		currentResponses.push({ regex: regexInput, images });

		this.props.addResponses(currentResponses);

		this.setState({
			responses: currentResponses,
			regexInput: '',
			images: []
		});
	}

	handleImageAdd = () => {
		const { images, imageInput } = this.state
		const currentImages = images;
		currentImages.push(imageInput);
		this.setState({ 
			images: currentImages,
			imageInput: ''
		 });
	}

	render() {
		const { regexInput, imageInput } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
					<label>
						<span>Trigger word</span>
						<input
						value={regexInput}
						onInput={e => this.setState({ regexInput: e.target.value})}
						/>
					</label>

					<label>
						<span>Link to image</span>
						<input
						value={imageInput}
						onInput={e => this.setState({ imageInput: e.target.value })}/>
						
						{/* Removed ability to add multiple images until it is better handled in the edit functionality */}
						{/* <button
						type="button"
						onClick={this.handleImageAdd}>
							Add this image
						</button>

						<div>
							{images.map(image =>
								<img alt="added item" src={image} key={image} />)
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