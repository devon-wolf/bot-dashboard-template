import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import style from './Header.module.css' 

export default class Header extends Component {
	render() {
		return (
			<header className={style.header}>
				<h2>Bot Dashboard</h2>

				{this.props.token
						?	<nav>
							<NavLink 
								exact 
								activeClassName={style.current} 
								className={style.navItem} 
								to="/">
								List
							</NavLink>

							<NavLink 
								exact 
								activeClassName={style.current} 
								className={style.navItem} 
								to="/new">
								New Entry
							</NavLink>

							<span className={style.logout} onClick={this.props.handleLogoutClick}>Logout</span>
							</nav>

						:	<nav>
							<NavLink 
								exact 
								activeClassName={style.current} 
								className={style.navItem} 
								to="/login">
								Login
							</NavLink>
							</nav>
					
					}
				<div className={style.clearBar}></div>
			</header>
		)
	}
}
