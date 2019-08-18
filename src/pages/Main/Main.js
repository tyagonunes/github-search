import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaGithub, FaEnvelope } from 'react-icons/fa';

import Starreds from '../../components/Starreds/Starreds';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import './Main.css';


export default class Main extends Component {

	state = {
		user: {}
	}

	componentDidMount() {
		
		// Protege a rota main
		(this.props.location.state && this.props.location.state.user) ?
			this.setState({ user: this.props.location.state.user }):
			this.props.history.push('/');
	}

	render() {
		const { user } = this.state;

		return (
			<div className="main-container">

				<section className="container-profile show-slow">

					<figure>
						<img src={user.avatar_url} alt="avatar" />
					</figure>

					<div className="profile-details">
						<ul>
							{user.bio && <li>{user.bio}</li>}
							{user.login && <li><FaUser /><span className="profile-nickname">{user.login}</span></li>}
							{user.email && <li><FaEnvelope /><span className="profile-email">{user.email}</span></li>}
							{user.html_url && <li><FaGithub /><a className="profile-link" href={user.html_url} target="blank">{user.html_url}</a></li>}
							{user.location && <li><FaMapMarkerAlt /><span className="profile-location">{user.location}</span></li>}
						</ul>
						{user.location && <GoogleMap userLocation={user.location} />}
					</div>
					<div className="profile-logout">
						<Link to="/" className="btn btn-primary">
							Pesquisar outro
						</Link>
					</div>
				</section>

				<section className="container-starreds">
					{user.login && <Starreds userLogin={user.login} />}
				</section>
			</div>
		);
	}
}
