import React, { Component } from 'react';
import api from '../services/api';

import './Starreds.css';

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
            <div className="starreds-container">
            <h2>Repositórios com estrela</h2>
            {this.state.starreds.length ? (
					<ul>
						{this.state.starreds.map(star => (
							<li key={star.node_id}>
								<a href={star.html_url} target="blank">{star.name}</a>
                                <div><small>{star.description}</small></div>
								
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
