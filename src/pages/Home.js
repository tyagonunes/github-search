import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {


	constructor(props) {
		super(props)

		this.state = { user: this.props.location.state.user }

		console.log(this.state.user)
	}


	render() {
		return (
			<div className="main-container">

				<section className="container-profile">
					<img src={this.state.user.avatar_url} alt="" />
					<footer>
						<strong>{this.state.user.name}</strong>
						<p>{this.state.user.bio}</p>
						<p>{this.state.user.email}</p>
						<a href={this.state.user.html_url} target="blank">{this.state.user.html_url}</a>
					</footer>
				</section>
			</div>
		);
	}
}
