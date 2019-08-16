import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

class GoogleMap extends Component {

	state = {
		lat: null,
		lng: null
	}

	componentDidMount() {
		console.log(this.props.userLocation)
		this.getLocationCoords(this.props.userLocation)
	}

	getLocationCoords = async (local) => {

		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=AIzaSyD5WewkaZ8aMW-0FtYw0mCVIRpemF-iu1A`
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
			<div>
				{this.state.lat !== null ? (
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
	height: '400px',
};


