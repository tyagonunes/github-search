import React, { Component } from 'react';
import api from '../services/api';


export default class Starreds extends Component {
    state = {
        starreds: []
    }

    componentDidMount() {
        this.getStarredRepos(this.props.userLogin)
    }

    getStarredRepos = (userLogin) => {
        api.get(`/users/${userLogin}/starred`)
            .then(res => {
                console.log(res)
                this.setState({ starreds: res.data })
            })
    }


    render() {
        return (
            <div>
            {this.state.starreds.length ? (
					<ul>
						{this.state.starreds.map(star => (
							<li key={star.node_id}>
								<strong>{star.name}</strong>
								<p>{star.description}</p>
							</li>
						))}
					</ul>
				) : (
					<div>Sem starred</div>
				)}
            </div>
        );
    }
}
