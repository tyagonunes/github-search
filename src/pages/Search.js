import React, { Component } from 'react';
import api from '../services/api';

import './Search.css';


export default class Search extends Component {

    state = {
        userName: '',
        loading: false,
        error: ''
    };

    handleChange = event => {
        this.setState({ userName: event.target.value, error: '' });
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.state.userName) {
            
            this.setState({ loading: true })

            api.get(`/users/${this.state.userName}`)
                .then(res => {
                    this.setState({ loading: false })
                    this.props.history.push('/home', { 'user': res.data });
                })
                .catch(err => {
                    this.setState({ loading: false });

                    (err.response.status === 404) ?
                        this.setState({ error: 'Usuário não encontrado' }) :
                        this.setState({ error: 'Falha ao obter os dados' })
                })
        }
        else {
            this.setState({ error: 'O nickname é obrigatório' })
        }

    }



    render() {
        const { loading, error } = this.state

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <span className="logo">Github Search</span>
                    <input type="text"
                        placeholder="Digite o usuário do github"
                        value={this.state.userName}
                        onChange={this.handleChange} />

                    <button type="submit" disabled={loading}>
                        {loading && <span>Buscando...</span>}
                        {!loading && <span>Buscar</span>}
                    </button>

                    {error && <span className="login-error">{error}</span>}
                </form>
            </div>
        );
    }
}
