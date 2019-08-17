import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

import './GoogleMap.css';

class GoogleMap extends Component {

	state = {
		lat: null,
		lng: null
	}

	UNSAFE_componentWillMount() {
		const { userLocation } = this.props

		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=AIzaSyBVX147diKT9VWLIt-aqNveo7TzuC3Qsv8`
		const formatURL = url.replace(' ', '%20')

		axios.get(formatURL)
			.then(res => {
				const place = res.data.results[0]

				this.setState({
					lat: place.geometry.location.lat,
					lng: place.geometry.location.lng
				})
			})
	}


	render() {
		return (
			<div className="map-container">
				{this.state.lat !== null && this.state.lng !== null  ? (
					<Map
						google={this.props.google}
						zoom={8}
						style={mapStyles}
						initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
					>
						<Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
					</Map>
				) : (
						<div></div>
					)}
			</div>

		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBVX147diKT9VWLIt-aqNveo7TzuC3Qsv8'
})(GoogleMap);

const mapStyles = {
	width: '100%',
	height: '100%',
};


