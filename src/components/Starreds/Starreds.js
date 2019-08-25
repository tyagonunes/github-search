import React, { Component } from 'react';
import api, { dataAuth } from '../../services/api';
import ReactLoading from 'react-loading';
import { FaStar } from 'react-icons/fa';
import './Starreds.css';
import Snackbar from '@material-ui/core/Snackbar';

export default class Starreds extends Component {

    state = {
        starreds: [],
        loadingStarreds: false,
        error: '',
        userLogin: '',
        passwordLogin: '',
        snackbarOpen: false,
        snackbarMsg: ''
    }

    componentDidMount() {
        const { userLogin } = this.props

        this.setState({ loadingStarreds: true, userLogin: userLogin })

        api.get(`/users/${userLogin}/starred`)
            .then(res => this.setState({ starreds: res.data, loadingStarreds: false }))
            .catch(() => this.setState({ error: 'Falha em obter os dados do usuário', loadingStarreds: false }))
    }


    unstarRepo = async (owner, repo) => {
        if (!this.state.passwordLogin) {
            let password = await prompt('Coloque a senha desse usuário para que possamos autentica-lo')
            this.setState({ passwordLogin: password })
        }

        let auth = btoa(`${this.state.userLogin}:${this.state.passwordLogin}`)

        api.delete(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {
            headers: {
                'authorization': `Basic ${auth}`,
            }
        })
            .then((res) => { this.openSnackbar('Estrela removida com sucesso') })
            .catch((err) => {
                this.openSnackbar('Erro ao remover a estrela no repositório. Tente novamente com a senha correta.')
                this.setState({ passwordLogin: '' })
            })
    }


    starRepo = async (owner, repo) => {
        if (!this.state.passwordLogin) {
            let password = await prompt('Coloque a senha desse usuário para que possamos autentica-lo')
            this.setState({ passwordLogin: password })
        }

        let auth = btoa(`${this.state.userLogin}:${this.state.passwordLogin}`)

        api.put(`/user/starred/${owner}/${repo}?client_id=${dataAuth.client_id}&client_secret=${dataAuth.client_secret}`, {}, {
            headers: {
                'authorization': `Basic ${auth}`,
            }
        })
            .then((res) => { this.openSnackbar('Estrela adicionada com sucesso') })
            .catch((err) => {
                this.openSnackbar('Erro ao adicionar estrela no repositório. Tente novamente com a senha correta.')
                this.setState({ passwordLogin: '' })
            })
    }


    openSnackbar = (message) => {
        this.setState({ snackbarOpen: true, snackbarMsg: message })

        setTimeout(() => {
            this.setState({ snackbarOpen: false })
        }, 3000)
    }


    render() {
        const { loadingStarreds, starreds, error } = this.state;

        return (
            <div className="starreds-container show-slow">

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

                                            <footer>
                                                <button className="btn"
                                                    onClick={() => this.starRepo(star.owner.login, star.name)}>
                                                    <FaStar /> star
                                                </button>
                                                <button className="btn"
                                                    onClick={() => this.unstarRepo(star.owner.login, star.name)}>
                                                    <FaStar /> unstar
                                                </button>
                                            </footer>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                    <div className="starreds-message">Não há repositórios salvos como estrela para esse usuário.</div>
                                )}

                            {error && <div className="starreds-message">{error}</div>}
                        </div>
                    )}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                />
            </div>

        );
    }
}
