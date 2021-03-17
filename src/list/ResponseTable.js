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
						<th>Trigger Word</th>
						<th>Images</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.props.data.map(item => 
						<ResponseRow 
							fullItem={item}
							id={item.id}
							trigger={item.regex}
							images={item.images}
							handleDeleteClick={e => this.props.handleDeleteClick(item.id)}
							token={this.props.token}
							updateFunction={this.props.updateFunction}
							key={item.id + item.regex}
						/>
					)}
				</tbody>
			</table>
		)
	}
}