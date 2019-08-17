import React, { Component } from 'react';
import api from '../services/api';
import ReactLoading from 'react-loading';
import './Starreds.css';

export default class Starreds extends Component {
   
    state = {
        starreds: [],
        loadingStarreds: false
    }

    componentDidMount() {
        this.getStarredRepos(this.props.userLogin)
    }

    getStarredRepos = (userLogin) => {
        this.setState({ loadingStarreds: true })

        api.get(`/users/${userLogin}/starred`)
            .then(res => {
                this.setState({ starreds: res.data })
            })
            .catch(err => {

            })
            .finally(() => {
                this.setState({ loadingStarreds: false })
            })
    }


    render() {
        const { loadingStarreds, starreds } = this.state;

        return (
            <div className="starreds-container">
                <h2>Repositórios salvos como estrela</h2>

                {loadingStarreds ? (
                    <div className="starreds-loading">
                        <ReactLoading type={'bubbles'} color={'#666666'} height={100} width={100} />
                    </div>
                ) : (
                        <div>
                            {starreds.length ? (
                                <ul>
                                    {starreds.map(star => (
                                        <li key={star.node_id}>
                                            <a href={star.html_url} target="blank">{star.name}</a>
                                            <div><small>{star.description}</small></div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                    <div className="starreds-empty">Não há repositórios salvos como estrela para esse usuário.</div>
                                )}
                        </div>
                    )}
            </div>

        );
    }
}
