import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Starreds from '../../components/Starreds';
import GoogleMap from '../../components/GoogleMap';
import './Main.css';

export default class Main extends Component {

	constructor(props) {
		super(props)

		this.state = {
			user: this.props.location.state.user,
		}

		console.log(this.state.user)
	}



	render() {
		return (
			<div className="main-container">

				<section className="container-profile">

					<figure>
						<img src={this.state.user.avatar_url} alt="avatar" />
					</figure>

					<div className="profile-details">
						<ul>
							<li><span className="profile-nickname">{this.state.user.login}</span></li>
							<li><span className="profile-bio">{this.state.user.bio}</span></li>
							<li><span className="profile-email">{this.state.user.email}</span></li>
							<li><a className="profile-link" href={this.state.user.html_url} target="blank">{this.state.user.html_url}</a></li>
						</ul>
						<GoogleMap userLocation={this.state.user.location} />

						<div className="main-logout">
							<Link to="/">
								<span>Sair</span>
							</Link>
						</div>
					</div>
				</section>

				<section className="container-actions">
					<Starreds userLogin={this.state.user.login} />
				</section>
			</div>
		);
	}
}
