import React, { Component } from 'react';
import api from '../../services/api';

import './Login.css';


export default class Login extends Component {


    state = {
        userName: '',
        loading: false,
        error: ''
    };


    handleChange = event => {
        this.setState({ userName: event.target.value, error: '' });
    }


    handleSubmit = event => {
        event.preventDefault();

        this.setState({ loading: true })

        api.get(`/users/${this.state.userName}`)
            .then(res => {
                this.props.history.push('/main', { 'user': res.data });
            })
            .catch(err => {
                (err.response.status === 404) ?
                    this.setState({ error: 'Usuário não encontrado' }) :
                    this.setState({ error: 'Falha ao obter os dados' })
            })
            .finally(() => {
                this.setState({ loading: false });
            })

    }


    render() {
        const { loading, error, userName } = this.state

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <span className="logo">Github Search</span>
                    <input type="text"
                        placeholder="Digite o usuário do github"
                        value={this.state.userName}
                        onChange={this.handleChange} />

                    <button type="submit" disabled={loading || !userName}>
                        {loading && <span className="loading">Buscando</span>}
                        {!loading && <span>Buscar</span>}
                    </button>

                    {error && <span className="login-error">{error}</span>}
                </form>
            </div>
        );
    }
}
