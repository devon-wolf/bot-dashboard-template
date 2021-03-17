import React, { Component } from 'react'
import ResponseRow from './ResponseRow.js'
import style from './ListPage.module.css'

export default class ResponseTable extends Component {

	render() {
		return (
			<table className={style.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Prompt</th>
						<th>Options</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.props.data.map(item => 
						<ResponseRow 
							fullItem={item}
							id={item.id}
							prompt={item.prompt}
							options={item.options}
							handleDeleteClick={e => this.props.handleDeleteClick(item.id)}
							token={this.props.token}
							updateFunction={this.props.updateFunction}
							key={item.id + item.prompt}
						/>
					)}
				</tbody>
			</table>
		)
	}
}