import React, { Component } from 'react'
import { getAllResponses, deleteResponse } from '../utils/server-utils.js'
import ResponseTable from './ResponseTable.js'

export default class ListPage extends Component {
	state = {
		entries: [],
		loading: false,
	}

	componentDidMount = async () => {
		await this.loadEntries();
	}

	loadEntries = async () => {
		this.setState({ entries: [], loading: true });
		const responses = await getAllResponses();
		this.setState({ entries: responses, loading: false });
	}

	removeEntry = async id => {
		await deleteResponse(id, this.props.token);
		await this.loadEntries();
	}
	
	render() {
		return (
			<main>
				<ResponseTable 
				data={this.state.entries}
				handleDeleteClick={this.removeEntry}
				token={this.props.token}
				updateFunction={this.loadEntries}
				/>
			</main>
		)
	}
}
