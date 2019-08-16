import React, { Component } from 'react';
import api from '../services/api';

import './Search.css';


export default class Search extends Component {

    state = { userName: '' };

    handleChange = event => {
        this.setState({ userName: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();

        api.get(`/users/${this.state.userName}`)
            .then(res => {
                // console.log(res);
                this.props.history.push('/home', { 'user': res.data });
            })
            .catch(err => {
                console.log(err)
            })

    }



    render() {
        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="Digite o usuário do github"
                        value={this.state.userName}
                        onChange={this.handleChange} />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}
