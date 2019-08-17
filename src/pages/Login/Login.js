import React, { Component } from 'react';
import api, { dataAuth } from '../../services/api';
import ReactLoading from 'react-loading';
import { FaGithub } from 'react-icons/fa';
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

        api.get(`/users/${this.state.userName}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/main', { 'user': res.data });
            })
            .catch(err => {
                this.setState({ loading: false });

                (err.response.status === 404) ?
                    this.setState({ error: 'Usuário não encontrado' }) :
                    this.setState({ error: 'Falha ao obter os dados do usuário' })
            })
    }


    render() {
        const { loading, error, userName } = this.state

        return (
            <div className="login-container show-slow">
                <div className="login-labels">
                    <span className="logo"><FaGithub /> Github Search</span>
                    <span className="slogan">Serviço de busca de informações de usuários do Github</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="Digite um nome ou apelido de usuário"
                        value={this.state.userName}
                        onChange={this.handleChange} />

                    <button type="submit" className="btn btn-primary" disabled={loading || !userName}>
                        {loading && <span>Buscando <ReactLoading type={'bubbles'} color={'#fff'} height={30} width={30} /> </span>}
                        {!loading && <span>Buscar</span>}
                    </button>

                    {error && <span className="login-error show-slow">{error}</span>}
                </form>
            </div>
        );
    }
}
