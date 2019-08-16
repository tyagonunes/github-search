import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import Starreds from '../components/Starreds';
import './Home.css';

export default class Home extends Component {


	constructor(props) {
		super(props)

		this.state = {
			user: this.props.location.state.user,
		}
	}



	render() {
		return (
			<div className="main-container">

				<section className="container-profile">
					<img src={this.state.user.avatar_url} alt="" />
					<footer>
						<strong>{this.state.user.login}</strong>
						<p>{this.state.user.bio}</p>
						<p>{this.state.user.email}</p>
						<a href={this.state.user.html_url} target="blank">Link Github</a>
					</footer>
				</section>
				<section>
					<GoogleMap userLocation={this.state.user.location} />
				</section>
				<section>
					<Starreds userLogin={this.state.user.login} />
				</section>
			</div>
		);
	}
}
