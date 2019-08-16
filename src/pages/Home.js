import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import Starreds from '../components/Starreds';
import { Link } from 'react-router-dom';
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
			<div>
				<div className="main-header">
					<Link to="/">
						<span>Voltar</span>
					</Link>
				</div>
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
						</div>
					</section>

					<section className="container-actions">
						<Starreds userLogin={this.state.user.login} />
					</section>
				</div>
			</div>

		);
	}
}
