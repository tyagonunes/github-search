import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaGithub } from 'react-icons/fa';

import Starreds from '../../components/Starreds';
import GoogleMap from '../../components/GoogleMap';
import './Main.css';

export default class Main extends Component {

	state = {
		user: this.props.location.state.user,
	}


	render() {
		const { user } = this.state;

		return (
			<div className="main-container">

				<section className="container-profile">

					<figure>
						<img src={user.avatar_url} alt="avatar" />
					</figure>

					<div className="profile-details">
						<ul>
							<li><span className="profile-bio">{user.bio}</span></li>
							<li><FaUser />  <span className="profile-nickname">{user.login}</span></li>
							<li><span className="profile-email">{user.email}</span></li>
							<li><FaGithub /> <a className="profile-link" href={user.html_url} target="blank">{user.html_url}</a></li>
							<li><FaMapMarkerAlt />  <span className="profile-location">{user.location}</span></li>
						</ul>
						<GoogleMap userLocation={user.location} />
					</div>
					<div className="profile-logout">
						<Link to="/" className="btn-primary"> 
							Sair
						</Link>
					</div>
				</section>

				<section className="container-actions">
					<Starreds userLogin={user.login} />
				</section>
			</div>
		);
	}
}
